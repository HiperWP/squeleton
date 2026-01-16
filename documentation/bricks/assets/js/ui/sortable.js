/**
 * Sortable drag-and-drop functionality for layer reordering
 */

import { showToast } from './toast.js';

export function initSortable(dom, state, updateHtmlAndPreview, updateHtmlInEditorFromState, recordHistory, editors) {
  // Clear existing sortable instances
  if (window.sortableInstances) {
    window.sortableInstances.forEach((s) => s.destroy());
  }
  window.sortableInstances = [];

  let expandTimeoutId = null;

  const sortableLists = document.querySelectorAll(
    ".layer-tree, .layer-children"
  );

  sortableLists.forEach((listEl) => {
    const s = Sortable.create(listEl, {
      group: "layers",
      animation: 150,
      onMove: (evt) => {
        const potentialParentLi = evt.related;
        clearTimeout(expandTimeoutId);
        if (
          potentialParentLi &&
          potentialParentLi.classList.contains("layer-item") &&
          potentialParentLi.classList.contains("collapsed")
        ) {
          expandTimeoutId = setTimeout(() => {
            const layerId = potentialParentLi.dataset.id;
            // Import toggleLayer function or pass it as parameter
            // toggleLayer(layerId, state);
          }, 600);
        }
      },
      onEnd: () => {
        clearTimeout(expandTimeoutId);

        const newLayerStructure = buildLayersFromDOM(dom.layerTree, state);
        state.layers = newLayerStructure;

        updateHtmlAndPreview();
        updateHtmlInEditorFromState();

        showToast("Layers reordered", "success");

        recordHistory({
          layers: state.layers,
          html: editors.htmlEditor.getValue(),
          css: editors.cssEditor.getValue(),
          js: editors.jsEditor.getValue(),
        });
      },
    });
    window.sortableInstances.push(s);
  });
}

export function buildLayersFromDOM(rootUl, state) {
  const layerMap = new Map();

  function flattenLayers(layers) {
    for (const layer of layers) {
      layerMap.set(layer.id, { ...layer });
      flattenLayers(layer.children);
    }
  }
  flattenLayers(state.layers);

  function traverse(ulElement, parentId = 0) {
    return Array.from(ulElement.children)
      .map((liElement) => {
        if (!liElement.matches(".layer-item")) return null;
        const layerId = liElement.dataset.id;
        const oldLayer = layerMap.get(layerId);
        if (!oldLayer) return null;

        const newLayer = { ...oldLayer, parentId, children: [] };

        const childrenUl = liElement.querySelector(
          ":scope > .layer-children"
        );
        if (childrenUl) {
          newLayer.children = traverse(childrenUl, layerId);
        }
        return newLayer;
      })
      .filter(Boolean);
  }

  return traverse(rootUl);
}
