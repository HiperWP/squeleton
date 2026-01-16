/**
 * CSS parsing and rule collection logic
 */

import { findLayerById } from '../utils/layer-search.js';

/**
 * Returns flat array of rule objects:
 * {
 *   selector: '.foo .bar',
 *   body:     'color:red;',
 *   parent:   '@media (min-width: 768px)' | null
 * }
 * Handles unlimited nesting.
 */
export function deepParse(cssText) {
  const src = cssText.replace(/\/\*[\s\S]*?\*\//g, ""); // strip comments
  const rules = [];

  function walk(str, parentRule = null, start = 0) {
    let i = start;
    while (i < str.length) {
      const open = str.indexOf("{", i);
      if (open === -1) break;

      let selectorBlock = str.slice(i, open).trim();
      let close = open + 1;
      let depth = 1;

      while (close < str.length && depth > 0) {
        if (str[close] === "{") depth++;
        else if (str[close] === "}") depth--;
        close++;
      }
      if (depth !== 0) break;

      const body = str.slice(open + 1, close - 1).trim();
      const fullRule = str.slice(i, close).trim();

      if (selectorBlock.startsWith("@")) {
        // Special handling for @keyframes - treat as single entity
        if (selectorBlock.startsWith("@keyframes")) {
          rules.push({
            selector: selectorBlock,
            body,
            parent: parentRule,
            raw: fullRule,
            isKeyframes: true,
          });
        } else {
          // Other at-rules: recurse into their body
          walk(body, selectorBlock, 0);
        }
      } else {
        // regular rule
        selectorBlock.split(",").forEach((sel) => {
          const s = sel.trim();
          if (s) {
            rules.push({
              selector: s,
              body,
              parent: parentRule,
              raw: parentRule
                ? `${parentRule} {\n  ${s} {\n    ${body}\n  }\n}`
                : `${s} {\n  ${body}\n}`,
            });
          }
        });
      }
      i = close;
    }
  }
  walk(src);
  return rules;
}

// builds array of CSS selector strings that should match this layer
export function buildMatcherList(layer) {
  const tokens = [];
  // 1. id
  if (layer.attributes.id) tokens.push(`#${layer.attributes.id}`);
  // 2. classes
  layer.classes.forEach((c) => tokens.push(`.${c}`));
  // 3. tag itself
  tokens.push(layer.tag);
  // 4. data-* attributes
  Object.entries(layer.attributes)
    .filter(([k]) => k.startsWith("data-"))
    .forEach(([k, v]) => tokens.push(`[${k}="${v}"]`));
  return tokens;
}

export function getLegalBaseSelectors(layer) {
  return buildMatcherList(layer);
}

/**
 * Returns ONLY the CSS rules that currently target the given layer.
 * Does a live selector match against a reconstructed DOM path.
 */
export function getRelevantCss(layer, cssText, layers) {
  const rules = deepParse(cssText);

  // 1. Build a minimal shadow DOM fragment
  const shadowRoot = document.createElement("div");
  // Walk from root → layer (breadth-first to keep order)
  const path = [];
  let current = layer;
  while (current) {
    path.unshift(current); // root first
    // Find parent in layers
    current = current.parentId
      ? findLayerById(layers, current.parentId)
      : null;
  }

  // Build nested elements
  let parentEl = shadowRoot;
  for (const l of path) {
    const el = document.createElement(l.tag);
    if (l.attributes.id) el.id = l.attributes.id;
    l.classes.forEach((c) => el.classList.add(c));
    Object.entries(l.attributes).forEach(([k, v]) => {
      if (k !== "id") el.setAttribute(k, v);
    });
    parentEl.appendChild(el);
    parentEl = el;
  }
  const leafElement = parentEl; // the layer itself

  // 2. Filter rules
  const matched = [];
  for (const rule of rules) {
    // selector might be inside @media; we test the pure selector part
    const selector = rule.selector;
    try {
      // 1. create a *clean* version for the test
      const testSelector = selector.replace(/:[::\w-]+(\([^)]*\))?/g, ""); // remove :hover, ::before, etc.

      // 2. test against the clean version
      if (leafElement.matches(testSelector)) {
        // 3. keep the original, untouched rule
        matched.push(rule);
      }
    } catch (_) {
      // Invalid selector, ignore silently
    }
  }

  // 3. Re-assemble CSS string (same structure as before)
  const byParent = new Map();
  matched.forEach((r) => {
    const key = r.parent || "ROOT";
    if (!byParent.has(key)) byParent.set(key, []);
    byParent.get(key).push(r);
  });

  let css = "";
  byParent.forEach((rules, parent) => {
    const body = rules
      .map((r) => `  ${r.selector} {\n    ${r.body}\n  }`)
      .join("\n");
    if (parent === "ROOT") {
      css += body + "\n\n";
    } else {
      css += `${parent} {\n${body}\n}\n\n`;
    }
  });

  return css.trim();
}

/**
 * Returns every CSS rule that should live on **this layer or any descendant**.
 * The rule is returned only if the layer itself *contains* every element
 * matched by the selector (i.e. it is the *closest ancestral scope*).
 */
export function collectRulesForLayer(layer, cssText, layers) {
  const allRules = deepParse(cssText);

  // Build the DOM path for this layer
  const path = [];
  let cur = layer;
  while (cur) {
    path.unshift(cur);
    cur = cur.parentId ? findLayerById(layers, cur.parentId) : null;
  }

  // Build a shadow DOM fragment
  const root = document.createElement("div");
  let parentEl = root;
  for (const l of path) {
    const el = document.createElement(l.tag);
    if (l.attributes.id) el.id = l.attributes.id;
    l.classes.forEach((c) => el.classList.add(c));
    Object.entries(l.attributes).forEach(([k, v]) => {
      if (k !== "id") el.setAttribute(k, v);
    });
    parentEl.appendChild(el);
    parentEl = el;
  }

  // Flat list of all descendants (including self)
  const descendants = [parentEl, ...parentEl.querySelectorAll("*")];

  // Rules we will return
  const rulesForLayer = [];

  // Map raw → rule to avoid duplicates
  const seenRaw = new Set();

  for (const rule of allRules) {
    // Skip :root – handled globally
    if (rule.selector.trim() === ":root") continue;

    const cleanSel = rule.selector
      .replace(/:[::\w-]+(\([^)]*\))?/g, "")
      .trim();
    if (!cleanSel) continue;

    try {
      const matches = descendants.filter((el) => el.matches(cleanSel));
      if (matches.length === 0) continue;

      // Ensure this layer is the *closest* ancestor that owns all matches
      const common = matches.reduce((acc, el) => {
        while (el && el !== root && !acc.contains(el)) {
          el = el.parentElement;
        }
        return el === root ? null : el;
      }, root);

      if (common === parentEl) {
        const rawKey = rule.raw;
        if (!seenRaw.has(rawKey)) {
          seenRaw.add(rawKey);
          rulesForLayer.push(rule);
        }
      }
    } catch (_) {
      // Invalid selector – ignore
    }
  }

  return rulesForLayer;
}

/**
 * Build global CSS from rules that have **never** been attached to any layer.
 * :root is always global.
 */
export function buildGlobalCss(allRules, consumedRaw) {
  let css = "";

  // :root is always global
  const rootRule = allRules.find((r) => r.selector.trim() === ":root");
  if (rootRule && !consumedRaw.has(rootRule.raw)) {
    css += rootRule.raw + "\n\n";
  }

  // Everything else that is unconsumed
  const unconsumed = allRules.filter(
    (r) => !consumedRaw.has(r.raw) && r.selector.trim() !== ":root"
  );
  css += unconsumed.map((r) => r.raw).join("\n\n");

  return css.trim();
}

/**
 * Validates that every selector in the user-edited CSS matches the layer.
 */
export function validateCss(cssText, layer, layers) {
  const rules = deepParse(cssText);
  const shadowRoot = document.createElement("div");

  // Build ancestor chain → leaf
  const path = [];
  let cur = layer;
  while (cur) {
    path.unshift(cur);
    cur = cur.parentId ? findLayerById(layers, cur.parentId) : null;
  }

  let parentEl = shadowRoot;
  for (const l of path) {
    const el = document.createElement(l.tag);
    if (l.attributes.id) el.id = l.attributes.id;
    l.classes.forEach((c) => el.classList.add(c));
    Object.entries(l.attributes).forEach(([k, v]) => {
      if (k !== "id") el.setAttribute(k, v);
    });
    parentEl.appendChild(el);
    parentEl = el;
  }
  const leaf = parentEl;

  // Use canonical key for validation – identical to collectRulesForLayer
  return rules.every((r) => {
    try {
      const test = r.selector.replace(/:[::\w-]+(\([^)]*\))?/g, "").trim();
      return leaf.matches(test);
    } catch {
      return false; // invalid selector
    }
  });
}

export function canonicalKey(sel) {
  return sel.replace(/:[::\w-]+(\([^)]*\))?/g, "").trim();
}
