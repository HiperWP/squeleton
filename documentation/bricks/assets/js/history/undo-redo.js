/**
 * Undo/Redo history management
 */

const MAX_HISTORY = 50;

export function makeHistoryApi() {
  let history = [];
  let historyIndex = -1;

  const api = {
    record(snap) {
      history = history.slice(0, historyIndex + 1);
      history.push(JSON.stringify(snap));
      if (history.length > MAX_HISTORY) {
        history.shift();
      } else {
        historyIndex++;
      }
      return api;
    },

    canUndo() {
      return historyIndex > 0;
    },

    canRedo() {
      return historyIndex < history.length - 1;
    },

    undo() {
      if (!api.canUndo()) return null;
      historyIndex--;
      return JSON.parse(history[historyIndex]);
    },

    redo() {
      if (!api.canRedo()) return null;
      historyIndex++;
      return JSON.parse(history[historyIndex]);
    },

    getState() {
      return {
        canUndo: api.canUndo(),
        canRedo: api.canRedo(),
        historyLength: history.length,
        currentIndex: historyIndex
      };
    }
  };

  return api;
}
