/**
 * Dependency Detection
 * Identifies external CSS and JS dependencies
 */

/**
 * Detects external stylesheets from HTML
 * @param {string} html - HTML string
 * @returns {Array<Object>} [{ type: 'css', url: string, raw: string }]
 */
export function detectExternalStylesheets(html) {
  // Use DOMParser to properly parse full HTML documents
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const links = doc.querySelectorAll('link[rel="stylesheet"]');

  return Array.from(links).map(link => {
    const url = link.getAttribute('href');
    return {
      type: 'css',
      url: url,
      raw: link.outerHTML,
      library: identifyLibrary(url),
      name: extractLibraryName(url, 'css')
    };
  });
}

/**
 * Detects external scripts from HTML
 * @param {string} html - HTML string
 * @returns {Array<Object>} [{ type: 'js', url: string, raw: string, library: string|null }]
 */
export function detectExternalScripts(html) {
  // Use DOMParser to properly parse full HTML documents
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const scripts = Array.from(doc.querySelectorAll('script[src]'));

  return scripts.map(script => ({
    type: 'js',
    url: script.getAttribute('src'),
    raw: script.outerHTML,
    library: identifyLibrary(script.getAttribute('src')),
    name: extractLibraryName(script.getAttribute('src'), 'js')
  }));
}

/**
 * Attempts to identify library name from URL
 * @param {string} url - Script URL
 * @returns {string|null} - Library name or null
 */
export function identifyLibrary(url) {
  const libraryPatterns = {
    'gsap': /gsap/i,
    'three.js': /three(?:\.min)?\.js/i,
    'anime.js': /anime(?:\.min)?\.js/i,
    'animate.css': /animate\.css/i,
    'lenis': /lenis/i,
    'locomotive-scroll': /locomotive-scroll/i,
    'swiper': /swiper/i,
    'aos': /aos/i,
    'particles.js': /particles/i,
    'chart.js': /chart(?:\.min)?\.js/i,
    'jquery': /jquery/i,
    'bootstrap': /bootstrap/i,
    'tailwind': /tailwind/i,
    'alpine.js': /alpine/i,
  };

  for (const [name, pattern] of Object.entries(libraryPatterns)) {
    if (pattern.test(url)) {
      return name;
    }
  }

  return null;
}

/**
 * Extracts meaningful name from URL
 * @param {string} url - URL to extract name from
 * @param {string} type - 'css' or 'js'
 * @returns {string} - Library name
 */
function extractLibraryName(url, type) {
  // Try to get meaningful name from URL
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  const nameWithoutExt = filename.replace(/\.(css|js|min\.css|min\.js)$/i, '');

  // If we identified the library, use that
  const identified = identifyLibrary(url);
  if (identified) return identified;

  // Otherwise use cleaned filename
  return nameWithoutExt || `External ${type.toUpperCase()}`;
}

/**
 * Main function to detect all dependencies
 * @param {string} html - HTML string
 * @returns {Array<Object>} - Array of all dependencies
 */
export function detectDependencies(html) {
  const stylesheets = detectExternalStylesheets(html);
  const scripts = detectExternalScripts(html);

  return [...stylesheets, ...scripts];
}
