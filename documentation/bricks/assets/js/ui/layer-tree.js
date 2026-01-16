/**
 * Layer tree rendering and interaction
 */

import { ICONS } from '../constants/icons.js';
import { findLayerById, getFlatLayerIds } from '../utils/layer-search.js';

export function createLayerElement(layer, state) {
  const li = document.createElement("li");
  li.className = `layer-item ${layer.isCollapsed ? "collapsed" : ""}`;
  li.dataset.id = layer.id;

  if (state.multipleSelectedLayerIds.includes(layer.id)) {
    li.classList.add("selected");
  }
  if (layer.id === state.selectedLayerId) {
    li.classList.add("active");
  }

  const hasChildren = layer.children && layer.children.length > 0;
  const iconKey = ICONS[layer.bricksName] ? layer.bricksName : "div";
  const toggleIcon = hasChildren ? ICONS.arrow : "";

  li.innerHTML = `
    <div class="layer-content" data-id="${layer.id}">
        <button class="layer-toggle ${hasChildren ? "" : "hidden"} ${
    !layer.isCollapsed ? "expanded" : ""
  }">
            ${toggleIcon}
        </button>
        <i class="layer-icon">${ICONS[iconKey]}</i>
        <span class="layer-label">${layer.label}</span>
    </div>
  `;

  if (hasChildren) {
    const childrenUl = document.createElement("ul");
    childrenUl.className = "layer-children";
    layer.children.forEach((child) =>
      childrenUl.appendChild(createLayerElement(child, state))
    );
    li.appendChild(childrenUl);
  }
  return li;
}

export function renderLayers(dom, state) {
  dom.layerTree.innerHTML = "";
  if (state.layers.length > 0) {
    state.layers.forEach((layer) =>
      dom.layerTree.appendChild(createLayerElement(layer, state))
    );
  } else {
    dom.layerTree.innerHTML =
      '<li class="empty-layer-tree">Run code to see layers</li>';
  }
}

export function toggleLayer(layerId, state) {
  const layer = findLayerById(state.layers, layerId);
  if (layer && layer.children.length > 0) {
    layer.isCollapsed = !layer.isCollapsed;
    const layerItemEl = document.querySelector(
      `.layer-item[data-id="${layerId}"]`
    );
    if (layerItemEl) {
      layerItemEl.classList.toggle("collapsed", layer.isCollapsed);
      layerItemEl
        .querySelector(".layer-toggle")
        .classList.toggle("expanded", !layer.isCollapsed);
    }
  }
}

export function toggleAllLayers(expand, state) {
  function traverse(layers) {
    layers.forEach((layer) => {
      if (layer.children.length > 0) {
        layer.isCollapsed = !expand;
        const layerItemEl = document.querySelector(
          `.layer-item[data-id="${layer.id}"]`
        );
        if (layerItemEl) {
          layerItemEl.classList.toggle("collapsed", layer.isCollapsed);
          layerItemEl
            .querySelector(".layer-toggle")
            .classList.toggle("expanded", !layer.isCollapsed);
          traverse(layer.children);
        }
      }
    });
  }
  traverse(state.layers);
}

export function updateMultiSelectVisuals(state) {
  document
    .querySelectorAll(".layer-item.selected")
    .forEach((item) => item.classList.remove("selected"));
  document
    .querySelectorAll(".layer-item.active")
    .forEach((item) => item.classList.remove("active"));

  state.multipleSelectedLayerIds.forEach((id) => {
    const item = document.querySelector(`.layer-item[data-id="${id}"]`);
    item?.classList.add("selected");
  });

  if (state.selectedLayerId) {
    const activeItem = document.querySelector(
      `.layer-item[data-id="${state.selectedLayerId}"]`
    );
    activeItem?.classList.add("active");
  }
}

export function updateSelectAllCheckboxState(dom, state) {
  const totalLayers = getFlatLayerIds(state.layers).length;
  if (totalLayers === 0) {
    dom.selectAllCheckbox.checked = false;
    dom.selectAllCheckbox.indeterminate = false;
    return;
  }
  const selectedCount = state.multipleSelectedLayerIds.length;
  if (selectedCount === 0) {
    dom.selectAllCheckbox.checked = false;
    dom.selectAllCheckbox.indeterminate = false;
  } else if (selectedCount === totalLayers) {
    dom.selectAllCheckbox.checked = true;
    dom.selectAllCheckbox.indeterminate = false;
  } else {
    dom.selectAllCheckbox.checked = false;
    dom.selectAllCheckbox.indeterminate = true;
  }
}

export function enableLayerRename(layerId, labelElement, state, recordHistory, editors) {
  const originalText = labelElement.textContent;
  const input = document.createElement("input");
  input.type = "text";
  input.value = originalText;
  input.className = "layer-label-input";
  labelElement.classList.add("sr-only");
  labelElement.parentNode.insertBefore(input, labelElement);
  input.focus();
  input.select();

  const saveRename = () => {
    const newLabel = input.value.trim();
    const layer = findLayerById(state.layers, layerId);
    if (layer && newLabel) {
      layer.label = newLabel;
      labelElement.textContent = newLabel;
    } else {
      labelElement.textContent = originalText;
    }
    input.remove();
    labelElement.classList.remove("sr-only");
    input.removeEventListener("blur", saveRename);
    input.removeEventListener("keydown", onKeydown);

    recordHistory({
      layers: state.layers,
      html: editors.htmlEditor.getValue(),
      css: editors.cssEditor.getValue(),
      js: editors.jsEditor.getValue(),
    });
  };

  const onKeydown = (e) => {
    if (e.key === "Enter") input.blur();
    if (e.key === "Escape") {
      input.value = originalText;
      input.blur();
    }
  };

  input.addEventListener("blur", saveRename);
  input.addEventListener("keydown", onKeydown);
}
