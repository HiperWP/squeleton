/**
 * Content Change Detection System
 * Determines if user is editing existing content vs. pasting new content
 */

/**
 * Generates a simple hash of content
 * @param {string} html
 * @param {string} css
 * @param {string} js
 * @returns {string} - Hash representing content signature
 */
export function generateContentHash(html, css, js) {
  const combined = `${html}${css}${js}`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36);
}

/**
 * Calculate similarity ratio between two strings (0-1)
 * Uses Levenshtein-like approach optimized for large strings
 */
function calculateSimilarity(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;

  // If either string is empty
  if (len1 === 0 || len2 === 0) return 0;

  // Sample strings for performance (take every 10th char if very long)
  const sample1 = len1 > 1000 ? sampleString(str1, 100) : str1;
  const sample2 = len2 > 1000 ? sampleString(str2, 100) : str2;

  // Count matching characters in relative positions
  const minLen = Math.min(sample1.length, sample2.length);
  let matches = 0;

  for (let i = 0; i < minLen; i++) {
    if (sample1[i] === sample2[i]) matches++;
  }

  return matches / Math.max(sample1.length, sample2.length);
}

/**
 * Sample string by taking every nth character
 */
function sampleString(str, targetLength) {
  const step = Math.floor(str.length / targetLength);
  let result = '';
  for (let i = 0; i < str.length; i += step) {
    result += str[i];
  }
  return result;
}

/**
 * Main detection function
 * @returns {Object} { isNewContent: boolean, confidence: number }
 */
export function detectContentChange(state, currentHtml, currentCss, currentJs) {
  // CASE 1: First time running - definitely new
  if (!state.activeContentHash) {
    return {
      isNewContent: true,
      confidence: 1.0,
      reason: 'First run'
    };
  }

  // CASE 2: Manual lock enabled - never treat as new
  if (state.dependenciesLocked) {
    return {
      isNewContent: false,
      confidence: 1.0,
      reason: 'Dependencies manually locked'
    };
  }

  // CASE 3: Check if it's a full HTML page
  const isFullPage = currentHtml.trim().toLowerCase().includes('<html') ||
                     currentHtml.trim().toLowerCase().includes('<!doctype') ||
                     currentHtml.trim().toLowerCase().includes('<head');

  // If NOT a full page, it's likely editing (unless it's the first run)
  if (!isFullPage && state.lastFullPageParse && state.originalFullPageHtml) {
    return {
      isNewContent: false,
      confidence: 0.9,
      reason: 'Not a full page, likely editing'
    };
  }

  // CASE 4: Compare current content with stored original
  if (state.originalFullPageHtml) {
    // Extract body content from original for fair comparison if current is not full page
    let originalForComparison = state.originalFullPageHtml;
    if (!isFullPage && state.originalFullPageHtml.includes('<body>')) {
      const bodyMatch = state.originalFullPageHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      if (bodyMatch) {
        originalForComparison = bodyMatch[1].trim();
      }
    }

    const similarity = calculateSimilarity(
      originalForComparison,
      currentHtml
    );

    console.log('📊 Content Similarity:', similarity);

    // If >50% similar, treat as edit (lowered threshold for better detection)
    if (similarity > 0.5) {
      return {
        isNewContent: false,
        confidence: similarity,
        reason: `High similarity (${(similarity * 100).toFixed(1)}%)`
      };
    }

    // If <20% similar, definitely new content (lowered threshold)
    if (similarity < 0.2) {
      return {
        isNewContent: true,
        confidence: 1 - similarity,
        reason: `Low similarity (${(similarity * 100).toFixed(1)}%)`
      };
    }

    // 20-50% similarity: ambiguous zone
    // Check if dependencies exist in new content
    const hasSameDependencies = checkDependencyOverlap(
      state.dependencies,
      currentHtml
    );

    if (hasSameDependencies > 0.3) { // Lowered threshold
      return {
        isNewContent: false,
        confidence: 0.7,
        reason: 'Similar dependencies detected'
      };
    }
  }

  // CASE 5: Significant structural changes
  const currentHash = generateContentHash(currentHtml, currentCss, currentJs);

  if (currentHash !== state.activeContentHash) {
    // Hash changed - but is it a minor edit or major change?
    // Only compare structural changes if we have original content
    if (state.originalFullPageHtml) {
      const structuralChanges = detectStructuralChanges(
        state.originalFullPageHtml,
        currentHtml
      );

      if (structuralChanges < 0.5) { // Increased threshold for better detection
        return {
          isNewContent: false,
          confidence: 0.8,
          reason: 'Minor structural changes'
        };
      }

      return {
        isNewContent: true,
        confidence: structuralChanges,
        reason: `Significant structural changes (${(structuralChanges * 100).toFixed(1)}%)`
      };
    }
  }

  // Default: not new content
  return {
    isNewContent: false,
    confidence: 0.5,
    reason: 'No significant changes detected'
  };
}

/**
 * Check how many of the existing dependencies are still in the HTML
 */
function checkDependencyOverlap(existingDeps, newHtml) {
  if (!existingDeps || existingDeps.length === 0) return 0;

  let matches = 0;
  existingDeps.forEach(dep => {
    if (newHtml.includes(dep.url)) {
      matches++;
    }
  });

  return matches / existingDeps.length;
}

/**
 * Detect structural changes between two HTML strings
 * Returns 0-1 representing degree of change
 */
function detectStructuralChanges(oldHtml, newHtml) {
  // Count major structural elements
  const oldTags = extractMajorTags(oldHtml);
  const newTags = extractMajorTags(newHtml);

  const oldCount = oldTags.length;
  const newCount = newTags.length;

  if (oldCount === 0) return 1.0; // Can't compare

  // Calculate tag difference ratio
  const countDiff = Math.abs(oldCount - newCount) / Math.max(oldCount, newCount);

  // Calculate tag type differences
  const oldSet = new Set(oldTags);
  const newSet = new Set(newTags);
  const intersection = new Set([...oldSet].filter(x => newSet.has(x)));
  const union = new Set([...oldSet, ...newSet]);

  const tagSimilarity = intersection.size / union.size;

  return 1 - ((tagSimilarity + (1 - countDiff)) / 2);
}

/**
 * Extract major HTML tags for structural comparison
 */
function extractMajorTags(html) {
  const majorTags = ['section', 'div', 'header', 'footer', 'nav', 'article', 'aside', 'main'];
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
