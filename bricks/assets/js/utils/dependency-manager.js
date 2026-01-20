/**
 * Dependency Manager
 * Manages dependency state
 */

/**
 * Updates dependencies in state
 * @param {Array} dependencies - Detected dependencies
 * @param {Object} state - Global state
 */
export function updateDependencies(dependencies, state) {
  state.dependencies = dependencies;
  state.hasDismissedDependencyBadge = false;
}

/**
 * Dismisses the dependency badge
 * @param {Object} state - Global state
 */
export function dismissDependencyBadge(state) {
  state.hasDismissedDependencyBadge = true;
}

/**
 * Gets current dependency count
 * @param {Object} state - Global state
 * @returns {number}
 */
export function getDependencyCount(state) {
  return state.dependencies.length;
}

/**
 * Clears all dependencies
 * @param {Object} state - Global state
 */
export function clearDependencies(state) {
  state.dependencies = [];
  state.hasDismissedDependencyBadge = false;
}
