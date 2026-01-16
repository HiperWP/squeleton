/**
 * Full Page Parser
 * Detects and splits full HTML pages into components
 */

/**
 * Detects if HTML content is a full page (contains html/head/body tags)
 * @param {string} html - HTML string to check
 * @returns {boolean}
 */
export function isFullPage(html) {
  const trimmed = html.trim().toLowerCase();
  return trimmed.includes('<html') ||
         trimmed.includes('<!doctype') ||
         trimmed.includes('<head') ||
         (trimmed.includes('<style') && trimmed.includes('<script'));
}

/**
 * Extracts inline styles from HTML
 * @param {string} html - Full HTML string
 * @returns {string} - Combined CSS from all <style> tags
 */
export function extractInlineStyles(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;

  const styleTags = temp.querySelectorAll('style');
  const styles = Array.from(styleTags)
    .map(tag => tag.textContent.trim())
    .filter(content => content.length > 0)
    .join('\n\n');

  return styles;
}

/**
 * Extracts inline scripts from HTML
 * @param {string} html - Full HTML string
 * @returns {string} - Combined JS from all inline <script> tags (not src)
 */
export function extractInlineScripts(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;

  // Only get scripts WITHOUT src attribute (inline scripts)
  const scriptTags = Array.from(temp.querySelectorAll('script'))
    .filter(tag => !tag.hasAttribute('src'));

  const scripts = scriptTags
    .map(tag => tag.textContent.trim())
    .filter(content => content.length > 0)
    .join('\n\n');

  return scripts;
}

/**
 * Extracts external stylesheet links from HTML
 * These need to be included in the preview iframe head
 * @param {string} html - Full HTML string
 * @returns {string} - Combined external link tags
 */
export function extractExternalStylesheets(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;

  const linkTags = temp.querySelectorAll('link[rel="stylesheet"]');
  const links = Array.from(linkTags)
    .map(link => link.outerHTML)
    .join('\n');

  return links;
}

/**
 * Extracts external script tags from HTML
 * These need to be included in the preview iframe body
 * @param {string} html - Full HTML string
 * @returns {string} - Combined external script tags
 */
export function extractExternalScripts(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;

  const scriptTags = temp.querySelectorAll('script[src]');
  const scripts = Array.from(scriptTags)
    .map(script => script.outerHTML)
    .join('\n');

  return scripts;
}

/**
 * Extracts body content only (strips head, meta, etc.)
 * IMPORTANT: Removes ALL external dependencies AND inline code
 * @param {string} html - Full HTML string
 * @returns {string} - Clean body HTML without any dependencies or inline code
 */
export function extractBodyContent(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;

  // Try to find body tag
  let bodyEl = temp.querySelector('body');
  if (bodyEl) {
    bodyEl = bodyEl.cloneNode(true);

    // ✅ STEP 1: Remove ALL <link> tags (including external stylesheets)
    bodyEl.querySelectorAll('link').forEach(el => el.remove());

    // ✅ STEP 2: Remove ALL <style> tags (inline styles)
    bodyEl.querySelectorAll('style').forEach(el => el.remove());

    // ✅ STEP 3: Remove ALL <script> tags (both inline and external)
    bodyEl.querySelectorAll('script').forEach(el => el.remove());

    return bodyEl.innerHTML.trim();
  }

  // If no body tag, remove everything except content
  const clone = temp.cloneNode(true);

  // ✅ Remove ALL dependencies and inline code
  clone.querySelectorAll('head, meta, link, title, style, script').forEach(el => el.remove());

  return clone.innerHTML.trim();
}

/**
 * Main parser that orchestrates the splitting
 * @param {string} html - Full HTML string
 * @returns {Object} { html: string, css: string, js: string, externalCSS: string, externalJS: string, isFullPage: boolean }
 */
export function parseFullPage(html) {
  if (!isFullPage(html)) {
    return { html, css: '', js: '', externalCSS: '', externalJS: '', isFullPage: false };
  }

  return {
    html: extractBodyContent(html),
    css: extractInlineStyles(html),
    js: extractInlineScripts(html),
    externalCSS: extractExternalStylesheets(html),
    externalJS: extractExternalScripts(html), // NEW
    isFullPage: true
  };
}
