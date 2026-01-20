/**
 * Dependency State Persistence
 * Saves and restores dependency state across sessions
 */

const STORAGE_KEY = 'c2b-dependency-state';

/**
 * Persist dependency state to localStorage
 */
export function persistDependencyState(state) {
  try {
    const persistData = {
      dependencies: state.dependencies,
      externalCSS: state.externalCSS,
      externalJS: state.externalJS,
      activeContentHash: state.activeContentHash,
      originalFullPageHtml: state.originalFullPageHtml,
      lastFullPageParse: state.lastFullPageParse,
      dependenciesLocked: state.dependenciesLocked, // ✅ CRITICAL FIX
      timestamp: Date.now()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(persistData));
    console.log('💾 Dependency state persisted (locked:', state.dependenciesLocked + ')');
  } catch (error) {
    console.error('❌ Failed to persist dependency state:', error);
  }
}

/**
 * Restore dependency state from localStorage
 */
export function restoreDependencyState(state) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return false;

    const data = JSON.parse(stored);

    // Only restore if data is recent (within last 24 hours)
    const age = Date.now() - (data.timestamp || 0);
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours

    if (age > maxAge) {
      console.log('⏰ Stored dependency state too old, ignoring');
      localStorage.removeItem(STORAGE_KEY);
      return false;
    }

    // ✅ Restore ALL dependency-related state
    state.dependencies = data.dependencies || [];
    state.externalCSS = data.externalCSS || '';
    state.externalJS = data.externalJS || '';
    state.activeContentHash = data.activeContentHash;
    state.originalFullPageHtml = data.originalFullPageHtml;
    state.lastFullPageParse = data.lastFullPageParse;
    state.dependenciesLocked = data.dependenciesLocked || false; // ✅ CRITICAL FIX

    console.log('✅ Restored dependency state:');
    console.log('  - Dependencies:', state.dependencies.length);
    console.log('  - Lock status:', state.dependenciesLocked);

    return true;
  } catch (error) {
    console.error('❌ Failed to restore dependency state:', error);
    return false;
  }
}

/**
 * Clear persisted dependency state
 */
export function clearPersistedState() {
  localStorage.removeItem(STORAGE_KEY);
}
