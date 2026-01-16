/**
 * General utility functions
 */

export function generateId(length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

export function stripDataC2bId(htmlString) {
  return htmlString.replace(/\s?data-c2b-id="[^"]*"/g, "");
}

export function parseCssText(cssText) {
  const css = {};
  cssText.split(";").forEach((declaration) => {
    if (declaration.trim()) {
      const [property, value] = declaration.split(":");
      css[property.trim()] = value.trim();
    }
  });
  return css;
}

export function isSimpleClassSelector(selector) {
  return /^\.[\w-]+$/.test(selector.trim());
}

export function hasImmediateText(node) {
  return Array.from(node.childNodes).some(
    (child) =>
      child.nodeType === Node.TEXT_NODE && child.textContent.trim().length > 0
  );
}

export function getAttributes(node) {
  const attrs = {};
  const validAttrName = /^[a-zA-Z0-9\-_:]+$/;
  for (const attr of node.attributes) {
    if (
      validAttrName.test(attr.name) &&
      attr.name !== "class" &&
      attr.name !== "data-c2b-id"
    ) {
      attrs[attr.name] = attr.value;
    }
  }
  return attrs;
}
