/**
 * HTML to Layer parsing logic
 */

import { CODE_BLOCK_TAGS, DIV_STANDARD_TAGS, TEXT_BASIC_STANDARD_TAGS } from '../constants/style-map.js';
import { generateId, hasImmediateText, getAttributes, stripDataC2bId } from '../utils/helpers.js';

export function determineBricksConversion(node) {
  const tag = node.tagName.toLowerCase();

  // Rule 0: Preserve Core Bricks Elements
  if (tag === "section") return { bricksName: "section", isStructural: true };
  if (tag === "div" && node.classList.contains("container"))
    return { bricksName: "container", isStructural: true };

  // Rule 1: The "Code Block" Exception
  if (CODE_BLOCK_TAGS.has(tag))
    return {
      bricksName: "code",
      content: node.outerHTML,
      isStructural: false,
    };

  // Special Handling for SVG, Image
  if (tag === "svg")
    return {
      bricksName: "svg",
      content: node.innerHTML,
      isStructural: false,
    };
  if (tag === "img")
    return { bricksName: "image", content: "", isStructural: false };

  // Rule 2: Content vs. Structure (The Litmus Test)
  if (hasImmediateText(node)) {
    let bricksName = "text-basic";
    if (tag.startsWith("h") && tag.length === 2) bricksName = "heading";
    else if (tag === "a") bricksName = "text-link";
    else if (tag === "button") bricksName = "button";

    return {
      bricksName,
      content: node.innerHTML.trim(),
      isStructural: false,
    };
  }

  // If we reach here, the element has no direct text content, making it a structural wrapper.
  return { bricksName: "div", isStructural: true };
}

export function parseHtmlToLayers(
  nodes,
  parentId = 0,
  oldStateMap = {},
  pathPrefix = ""
) {
  const layers = [];
  let nodeIndex = 0;

  // Initialize global index counter if not already set
  if (!parseHtmlToLayers.globalIndex) {
    parseHtmlToLayers.globalIndex = 1;
  }

  nodes.forEach((node) => {
    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const layerId = generateId();
    const tag = node.tagName.toLowerCase();
    const currentPath = pathPrefix
      ? `${pathPrefix}_${nodeIndex}`
      : `${nodeIndex}`;
    node.setAttribute("data-c2b-id", layerId);

    const conversion = determineBricksConversion(node);

    const children = conversion.isStructural
      ? parseHtmlToLayers(
          Array.from(node.childNodes),
          layerId,
          oldStateMap,
          currentPath
        )
      : [];

    const hasChildren = children.length > 0;

    const layer = {
      id: layerId,
      parentId,
      bricksName: conversion.bricksName,
      tag,
      label: getInitialLayerLabel(node, conversion.bricksName),
      classes: Array.from(node.classList),
      attributes: getAttributes(node),
      content: conversion.content || "",
      isCollapsed: hasChildren ? oldStateMap[currentPath] ?? true : false,
      children,
      _globalIndex: parseHtmlToLayers.globalIndex++,
    };

    layers.push(layer);
    nodeIndex++;
  });
  return layers;
}

export function getInitialLayerLabel(node, bricksName, layerData = null) {
  const idAttr = node
    ? node.id
    : layerData
    ? layerData.attributes.id || ""
    : "";
  const classes = node
    ? Array.from(node.classList)
    : layerData
    ? layerData.classes
    : [];
  const tag = node
    ? node.tagName.toLowerCase()
    : layerData
    ? layerData.tag
    : "";

  if (idAttr) return `#${idAttr}`;
  if (classes.length > 0) return `.${classes[0]}`;
  if (bricksName === "code")
    return tag.charAt(0).toUpperCase() + tag.slice(1);

  let label = bricksName.charAt(0).toUpperCase() + bricksName.slice(1);
  if (label === "Text-basic") return "Basic Text";
  if (label === "Text-link") return "Text Link";
  return label;
}

export function generateHtmlFromLayers(layers, indent = 0, options = {}) {
  const { includeDataAttr = true, includeChildren = true } = options;
  let html = "";
  const indentation = "  ".repeat(indent);

  layers.forEach((layer) => {
    if (layer.bricksName === "code") {
      html += `${indentation}${
        includeDataAttr ? layer.content : stripDataC2bId(layer.content)
      }\n`;
      return;
    }

    let attrs = "";
    if (includeDataAttr) {
      attrs += ` data-c2b-id="${layer.id}"`;
    }
    if (layer.attributes.id) attrs += ` id="${layer.attributes.id}"`;
    if (layer.classes.length > 0)
      attrs += ` class="${layer.classes.join(" ")}"`;
    for (const [key, value] of Object.entries(layer.attributes)) {
      if (key !== "id") attrs += ` ${key}="${value}"`;
    }
    attrs = attrs.trim();
    if (attrs) attrs = " " + attrs;

    const selfClosing = ["img"].includes(layer.tag);
    const isTerminalContent =
      layer.children.length === 0 && layer.content.length > 0;

    html += `${indentation}<${layer.tag}${attrs}>`;

    if (selfClosing) {
      html += `\n`;
      return;
    }

    if (isTerminalContent) {
      html += includeDataAttr ? layer.content : stripDataC2bId(layer.content);
    } else if (includeChildren && layer.children.length > 0) {
      html += `\n${generateHtmlFromLayers(
        layer.children,
        indent + 1,
        options
      )}`;
      html += `${indentation}`;
    }

    html += `</${layer.tag}>\n`;
  });
  return html.replace(/\n\s*\n/g, "\n");
}
