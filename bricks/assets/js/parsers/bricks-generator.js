/**
 * Bricks JSON generation logic
 */

import {
  deepParse,
  collectRulesForLayer,
  buildGlobalCss,
  canonicalKey,
} from "./css-parser.js";
import {
  STYLE_MAP,
  DIV_STANDARD_TAGS,
  TEXT_BASIC_STANDARD_TAGS,
} from "../constants/style-map.js";
import { generateId, parseCssText, stripDataC2bId } from "../utils/helpers.js";
import { getInitialLayerLabel } from "./html-parser.js";

export function generateBricksJson(layersToProcess, state, cssText, jsText) {
  const IS_CONFLICT_MODE =
    state.cssStyleMode === "gui" && state.cssMode === "element";
  if (IS_CONFLICT_MODE) {
    return null;
  }

  const isElementCustomCssMode =
    state.cssStyleMode === "custom" && state.cssMode === "element";

  const isFullPageCopy = layersToProcess === state.layers;

  const rules = deepParse(cssText);
  const rootRules = rules.filter((r) => !r.parent);
  const atRulesMap = new Map();

  rules
    .filter((r) => r.parent)
    .forEach((r) => {
      if (!atRulesMap.has(r.parent)) atRulesMap.set(r.parent, []);
      atRulesMap.get(r.parent).push(r);
    });

  state.cssRules = {};
  rootRules.forEach((r) => {
    state.cssRules[r.selector] = r.body;
  });
  atRulesMap.forEach((inner, parent) => {
    inner.forEach((r) => {
      state.cssRules[`${parent} ${r.selector}`] = r.body;
    });
  });
  state.globalCss = "";

  const flatLayerList = [];

  function flatten(layers) {
    for (const layer of layers) {
      flatLayerList.push(layer);
      flatten(layer.children);
    }
  }
  flatten(layersToProcess);

  const canonicalUsageCount = new Map();
  const consumedRawCss = new Set();

  for (const layer of flatLayerList) {
    const rulesForLayer = collectRulesForLayer(layer, cssText, state.layers);
    const seenKeysForLayer = new Set();

    for (const rule of rulesForLayer) {
      const key = canonicalKey(rule.selector);
      if (!seenKeysForLayer.has(key)) {
        canonicalUsageCount.set(key, (canonicalUsageCount.get(key) || 0) + 1);
        seenKeysForLayer.add(key);
      }
    }
  }

  const globalClassCssMap = new Map();

  if (state.cssMode === "global") {
    // --- START: REPLACED GLOBAL CLASS LOGIC (FROM KIMI'S DOC) ---

    // Step 1: Create entries for every class that exists on the page
    flatLayerList.forEach(layer =>
      layer.classes.forEach(cls => {
        if (!globalClassCssMap.has(cls)) globalClassCssMap.set(cls, []);
      })
    );

    // Step 2: Collect every rule whose selector **starts with** a known class
    rules.forEach(rule => {
      const selector = rule.selector.trim();
      for (const cls of globalClassCssMap.keys()) {
        const classPrefix = `.${cls}`;
        // Check if the selector is the class itself, or a descendant/pseudo-class
        if (selector.startsWith(classPrefix)) {
          // Check for a valid separator after the class name to avoid false positives (e.g., .card matching .card-header)
          const nextChar = selector[classPrefix.length];
          if (nextChar === undefined || [' ', ':', '>', '+', '~', '[', '.'].includes(nextChar)) {
             globalClassCssMap.get(cls).push(rule);
             consumedRawCss.add(rule.raw); // Mark as claimed
          }
        }
      }
    });

    // Step 3: Build the per-class CSS strings from the collected rules
    for (const [cls, ruleList] of globalClassCssMap.entries()) {
      if (!ruleList.length) {
        globalClassCssMap.set(cls, ""); // Ensure it's an empty string if no rules
        continue;
      }

      let css = "";
      const byParent = new Map();

      ruleList.forEach(r => {
        const key = r.parent || "ROOT";
        if (!byParent.has(key)) byParent.set(key, []);
        byParent.get(key).push(r);
      });

      byParent.forEach((arr, parent) => {
        const body = arr.map(r => `  ${r.selector} {\n    ${r.body}\n  }`).join("\n");
        css += parent === "ROOT" ? `${body}\n\n` : `${parent} {\n${body}\n}\n\n`;
      });

      globalClassCssMap.set(cls, stripDataC2bId(css.trim()));
    }
    // --- END: REPLACED GLOBAL CLASS LOGIC ---
  }

  const bricksContent = [];
  const globalClasses = [];
  const usedSelectors = new Set();
  const processedSelectors = new Set();

  for (const layer of flatLayerList) {
    const element = {
      id: layer.id,
      name: layer.bricksName,
      parent: layer.parentId,
      children: layer.children.map((child) => child.id),
      settings: {},
    };

    const defaultLabel = getInitialLayerLabel(null, layer.bricksName, layer);
    const isCustomLabel = layer.label !== defaultLabel;
    const isMeaningfulDefault =
      layer.label.startsWith("#") || layer.label.startsWith(".");

    if (isCustomLabel || isMeaningfulDefault) {
      element.label = layer.label;
    }

    if (layer.attributes.id) {
      element.settings._cssId = layer.attributes.id;
      const idSelector = `#${layer.attributes.id}`;
      if (state.cssRules[idSelector]) {
        usedSelectors.add(idSelector);
      }
    }

    applyBricksSettings(element, layer);

    if (layer.bricksName === "code") {
      let cssForCodeBlock = "";
      for (const selector in state.cssRules) {
        const tempElement = document.createElement(layer.tag);
        if (layer.attributes.id) tempElement.id = layer.attributes.id;
        layer.classes.forEach((c) => tempElement.classList.add(c));

        const baseSelector = selector.replace(/:[:\w-]+(\(.*?\))?/g, "");
        try {
          if (tempElement.matches(baseSelector)) {
            const declarations = state.cssRules[selector];
            cssForCodeBlock += `${selector} {\n  ${declarations}\n}\n\n`;
            usedSelectors.add(selector);
          }
        } catch (e) {
          /* Ignore invalid selectors */
        }
      }
      if (cssForCodeBlock) {
        element.settings.cssCode = stripDataC2bId(cssForCodeBlock.trim());
      }
      element.settings.code = stripDataC2bId(layer.content);
      bricksContent.push(element);
      continue;
    }

    const attributesArray = Object.entries(layer.attributes)
      .filter(([key]) => !["id", "href", "src", "target", "alt"].includes(key))
      .map(([name, value]) => ({ id: generateId(), name, value }));

    if (layer.bricksName !== "svg" && attributesArray.length > 0) {
      element.settings._attributes = attributesArray;
    }

    if (state.cssMode === "global") {
      if (layer.classes.length > 0) {
        element.settings._cssGlobalClasses = [];
        for (const className of layer.classes) {
          let globalClass = globalClasses.find((gc) => gc.name === className);
          if (!globalClass) {
            const preBuiltCss = globalClassCssMap.get(className) || "";
            globalClass = {
              id: generateId(),
              name: className,
              settings: preBuiltCss ? { _cssCustom: preBuiltCss } : {},
            };
            globalClasses.push(globalClass);
          }
          element.settings._cssGlobalClasses.push(globalClass.id);
        }
      }
    } else {
      if (layer.classes.length > 0) {
        element.settings._cssClasses = layer.classes.join(" ");
      }

      const rulesForLayer = collectRulesForLayer(
        layer,
        cssText,
        state.layers
      );

      let newRulesToAttach;
      if (isElementCustomCssMode) {
        newRulesToAttach = rulesForLayer.filter(
          (rule) => !processedSelectors.has(rule.selector)
        );
      } else {
        newRulesToAttach = rulesForLayer;
      }

      if (newRulesToAttach.length) {
        let css = "";
        const byParent = new Map();

        newRulesToAttach.forEach((r) => {
          if (isElementCustomCssMode) {
            processedSelectors.add(r.selector);
          }
          usedSelectors.add(r.selector);
          consumedRawCss.add(r.raw);
          const key = r.parent || "ROOT";
          if (!byParent.has(key)) byParent.set(key, []);
          byParent.get(key).push(r);
        });

        byParent.forEach((arr, parent) => {
          const body = arr
            .map((r) => {
              const key = canonicalKey(r.selector);
              const totalCount = canonicalUsageCount.get(key) || 1;
              let comment = "";

              if (totalCount > 1) {
                const otherCount = totalCount - 1;
                comment = `/* This style rule also applies to ${otherCount} other element${
                  otherCount > 1 ? "s" : ""
                } */\n`;
                comment = stripDataC2bId(comment);
              }

              return `${comment}  ${r.selector} {\n    ${r.body}\n  }`;
            })
            .join("\n");
          css +=
            parent === "ROOT" ? `${body}\n\n` : `${parent} {\n${body}\n}\n\n`;
        });

        if (css.trim()) {
          element.settings._cssCustom = stripDataC2bId(css.trim());
        }
      }
    }

    bricksContent.push(element);
  }

  if (isFullPageCopy) {
    const allRules = deepParse(cssText);
    const globalCssString = buildGlobalCss(allRules, consumedRawCss);

    if (globalCssString) {
      const codeEl = {
        id: generateId(),
        name: "code",
        parent: 0,
        children: [],
        settings: {
          executeCode: true,
          css: globalCssString,
          cssCode: globalCssString,
        },
        label: "Global CSS",
      };
      bricksContent.unshift(codeEl);
    }

    const jsCode = jsText.trim();
    if (jsCode) {
      const jsCodeElement = {
        id: generateId(),
        name: "code",
        parent: 0,
        children: [],
        settings: {
          javascriptCode: jsCode,
          executeCode: true,
        },
        label: "Custom JavaScript",
      };
      bricksContent.unshift(jsCodeElement);
    }
  }

  return {
    content: bricksContent,
    source: "bricksCopiedElements",
    sourceUrl: "https://squeleton.dev",
    version: "1.12.4",
    globalClasses,
    globalElements: [],
  };
}

export function generateStructuralBricksJson(layersToProcess, state) {
  const flatLayerList = [];

  function flatten(layers) {
    for (const layer of layers) {
      flatLayerList.push(layer);
      flatten(layer.children);
    }
  }
  flatten(layersToProcess);

  const bricksContent = [];
  const globalClasses = [];

  for (const layer of flatLayerList) {
    const element = {
      id: layer.id,
      name: layer.bricksName,
      parent: layer.parentId,
      children: layer.children.map((child) => child.id),
      settings: {},
    };

    const defaultLabel = getInitialLayerLabel(null, layer.bricksName, layer);
    const isCustomLabel = layer.label !== defaultLabel;
    const isMeaningfulDefault =
      layer.label.startsWith("#") || layer.label.startsWith(".");
    if (isCustomLabel || isMeaningfulDefault) {
      element.label = layer.label;
    }

    if (layer.attributes.id) {
      element.settings._cssId = layer.attributes.id;
    }

    applyBricksSettings(element, layer);

    const attributesArray = Object.entries(layer.attributes)
      .filter(([key]) => !["id", "href", "src", "target", "alt"].includes(key))
      .map(([name, value]) => ({ id: generateId(), name, value }));
    if (layer.bricksName !== "svg" && attributesArray.length > 0) {
      element.settings._attributes = attributesArray;
    }

    if (layer.classes.length > 0) {
      if (state.cssMode === "global") {
        element.settings._cssGlobalClasses = [];
        for (const className of layer.classes) {
          let globalClass = globalClasses.find((gc) => gc.name === className);
          if (!globalClass) {
            globalClass = { id: generateId(), name: className, settings: {} };
            globalClasses.push(globalClass);
          }
          element.settings._cssGlobalClasses.push(globalClass.id);
        }
      } else {
        element.settings._cssClasses = layer.classes.join(" ");
      }
    }
    bricksContent.push(element);
  }

  return {
    content: bricksContent,
    source: "bricksCopiedElements",
    sourceUrl: "https://squeleton.dev",
    version: "1.12.4",
    globalClasses,
    globalElements: [],
  };
}

function applyBricksSettings(element, layer) {
  const { bricksName, tag, content, attributes } = layer;
  const settings = element.settings;

  switch (bricksName) {
    case "heading":
      settings.tag = tag;
      settings.text = content;
      break;
    case "text-link":
      settings.text = content;
      if (attributes.href) {
        settings.link = {
          type: "external",
          url: attributes.href,
          target: attributes.target || "",
        };
      }
      break;
    case "text-basic":
      settings.text = content;
      if (TEXT_BASIC_STANDARD_TAGS.includes(tag)) {
        settings.tag = tag;
      } else {
        settings.tag = "custom";
        settings.customTag = tag;
      }
      break;
    case "button":
      settings.text = content;
      settings.tag = "button";
      settings.fetchType = "post";
      break;
    case "div":
      if (DIV_STANDARD_TAGS.includes(tag) || tag === "a" || tag === "button") {
        settings.tag = tag;
      } else if (tag !== "div") {
        settings.tag = "custom";
        settings.customTag = tag;
      }
      if (tag === "a" && attributes.href) {
        settings.link = {
          type: "external",
          url: attributes.href,
          target: attributes.target || "",
        };
      }
      break;
    case "image":
      const src = attributes.src || "";
      settings.image = {
        url: src,
        external: true,
        filename: src.split("/").pop(),
      };
      if (attributes.alt) {
        settings.altText = attributes.alt;
      }
      break;
    case "svg":
      const attrsString = Object.entries(layer.attributes)
        .map(([key, value]) => `${key}="${value}"`)
        .join(" ");
      settings.source = "code";
      settings.code = `<svg ${attrsString}>${layer.content}</svg>`;
      break;
    case "code":
      settings.executeCode = true;
      settings.code = content; // outerHTML
      break;
  }
}
