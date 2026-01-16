/**
 * Layer search and manipulation utilities
 */

export function findLayerById(layers, id) {
  for (const layer of layers) {
    if (layer.id === id) return layer;
    const found = findLayerById(layer.children, id);
    if (found) return found;
  }
  return null;
}

export function findLayerAndParent(layers, id, parentArray = null) {
  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    if (layer.id === id) {
      return {
        parentArray: parentArray || layers,
        index: i,
        layer: layer,
      };
    }
    if (layer.children && layer.children.length > 0) {
      const found = findLayerAndParent(layer.children, id, layer.children);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

export function removeLayerById(layers, id) {
  return layers.filter((layer) => {
    if (layer.id === id) return false;
    layer.children = removeLayerById(layer.children, id);
    return true;
  });
}

export function findPathToLayer(layers, targetId) {
  function find(currentLayers, currentPath) {
    for (const layer of currentLayers) {
      if (layer.id === targetId) {
        return currentPath;
      }
      if (layer.children.length > 0) {
        const pathFromChild = find(layer.children, [
          ...currentPath,
          layer.id,
        ]);
        if (pathFromChild !== null) {
          return pathFromChild;
        }
      }
    }
    return null;
  }
  return find(layers, []);
}

export function createCollapsedStateMap(layers, pathPrefix = "", map = {}) {
  layers.forEach((layer, index) => {
    const currentPath = pathPrefix ? `${pathPrefix}_${index}` : `${index}`;
    map[currentPath] = layer.isCollapsed;
    if (layer.children.length > 0) {
      createCollapsedStateMap(layer.children, currentPath, map);
    }
  });
  return map;
}

export function getFlatLayerIds(layers) {
  const ids = [];

  function traverse(layerList) {
    layerList.forEach((layer) => {
      ids.push(layer.id);
      if (layer.children.length > 0) {
        traverse(layer.children);
      }
    });
  }
  traverse(layers);
  return ids;
}

export function getInstanceCount(layers, targetId) {
  const targetLayer = findLayerById(layers, targetId);
  if (!targetLayer) return 0;

  let count = 0;
  let found = false;

  function traverse(sublayers) {
    for (const layer of sublayers) {
      if (found) return;

      if (layer.tag === targetLayer.tag) {
        count++;
      }

      if (layer.id === targetId) {
        found = true;
        return;
      }

      if (layer.children) {
        traverse(layer.children);
      }
    }
  }

  traverse(layers);
  return count;
}
