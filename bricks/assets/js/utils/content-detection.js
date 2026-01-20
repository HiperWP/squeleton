/**
 * Smart Content Detection System
 * Determines if HTML represents NEW content vs editing existing content
 * Uses MULTI-FACTOR ANALYSIS for accurate detection
 */

/**
 * Main detection function - uses multiple heuristics
 * @param {Object} state - Global state
 * @param {string} html - Current HTML
 * @param {Array} newDependencies - Detected dependencies
 * @returns {boolean} - true if NEW content, false if EDITING
 */
export function determineIfNewContent(state, html, newDependencies) {
  // ============================================
  // CASE 1: Manual lock - NEVER new (HIGHEST PRIORITY)
  // ============================================
  if (state.dependenciesLocked) {
    console.log('🔒 Manual lock active - treating as EDIT');
    return false;
  }

  // ============================================
  // CASE 2: First run - always NEW
  // ============================================
  if (!state.activeContentHash) {
    console.log('✨ First run detected');
    return true;
  }

  // ============================================
  // CASE 3: Check if full page
  // ============================================
  const isFullPage = html.trim().toLowerCase().includes('<html') ||
                     html.trim().toLowerCase().includes('<!doctype') ||
                     html.trim().toLowerCase().includes('<head');

  if (!isFullPage) {
    console.log('🧩 Partial HTML detected - treating as EDIT');
    return false;
  }

  // ============================================
  // CASE 4: Dependency comparison (PRIMARY CHECK)
  // ============================================
  const oldDeps = state.dependencies || [];
  const oldDepUrls = new Set(oldDeps.map(d => d.url));
  const newDepUrls = new Set(newDependencies.map(d => d.url));

  // Check if dependencies are identical
  const depsMatch =
    oldDepUrls.size === newDepUrls.size &&
    [...oldDepUrls].every(url => newDepUrls.has(url));

  if (!depsMatch) {
    console.log('🔄 Dependencies changed:');
    console.log('  Old URLs:', [...oldDepUrls]);
    console.log('  New URLs:', [...newDepUrls]);
    console.log('  → Conclusion: NEW CONTENT');
    return true;
  }

  // ============================================
  // CASE 5: Content similarity check
  // ============================================
  if (!state.originalFullPageHtml) {
    console.log('🆕 No previous content - treating as NEW');
    return true;
  }

  // Extract body content for comparison
  const extractBody = (htmlStr) => {
    const bodyMatch = htmlStr.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    return bodyMatch ? bodyMatch[1].trim() : htmlStr;
  };

  const oldBody = extractBody(state.originalFullPageHtml);
  const newBody = extractBody(html);

  // Calculate simple length-based similarity
  const lengthDiff = Math.abs(oldBody.length - newBody.length);
  const avgLength = (oldBody.length + newBody.length) / 2;
  const lengthSimilarity = avgLength > 0 ? 1 - (lengthDiff / avgLength) : 0;

  console.log('📊 Content similarity:', (lengthSimilarity * 100).toFixed(1) + '%');

  // ============================================
  // DECISION LOGIC
  // ============================================

  // Same dependencies + similar content = EDITING
  if (lengthSimilarity > 0.5) {
    console.log('✏️ Similar content with same dependencies - treating as EDIT');
    return false;
  }

  // Same dependencies + very different content = NEW CONTENT
  if (lengthSimilarity < 0.3) {
    console.log('🔄 Very different content detected - treating as NEW');
    return true;
  }

  // Ambiguous case - check structural changes
  const structuralChanges = detectStructuralChanges(oldBody, newBody);
  console.log('🗂️ Structural changes:', (structuralChanges * 100).toFixed(1) + '%');

  if (structuralChanges > 0.6) {
    console.log('🔄 Major structural changes - treating as NEW');
    return true;
  }

  console.log('✏️ Minor changes detected - treating as EDIT');
  return false;
}

/**
 * Detect structural changes between two HTML strings
 * @returns {number} - 0-1 representing degree of change
 */
function detectStructuralChanges(oldHtml, newHtml) {
  // Count major structural elements
  const oldTags = extractMajorTags(oldHtml);
  const newTags = extractMajorTags(newHtml);

  const oldCount = oldTags.length;
  const newCount = newTags.length;

  if (oldCount === 0 && newCount === 0) return 0;
  if (oldCount === 0 || newCount === 0) return 1;

  // Calculate tag difference ratio
  const countDiff = Math.abs(oldCount - newCount) / Math.max(oldCount, newCount);

  // Calculate tag type differences
  const oldSet = new Set(oldTags);
  const newSet = new Set(newTags);
  const intersection = new Set([...oldSet].filter(x => newSet.has(x)));
  const union = new Set([...oldSet, ...newSet]);

  const tagSimilarity = union.size > 0 ? intersection.size / union.size : 0;

  return 1 - ((tagSimilarity + (1 - countDiff)) / 2);
}

/**
 * Extract major HTML tags for structural comparison
 */
function extractMajorTags(html) {
  const majorTags = ['section', 'div', 'header', 'footer', 'nav', 'article', 'aside', 'main', 'form', 'table'];
  const tags = [];

  majorTags.forEach(tag => {
    const regex = new RegExp(`<${tag}[^>]*>`, 'gi');
    const matches = html.match(regex);
    if (matches) {
      tags.push(...matches.map(() => tag));
    }
  });

  return tags;
}
