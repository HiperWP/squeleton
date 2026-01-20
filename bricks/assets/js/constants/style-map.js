/**
 * CSS property to Bricks settings mapping
 */

export const STYLE_MAP = {
  "background-color": {
    key: "_background",
    subkey: "color",
    transform: (value) => ({ raw: value }),
  },
  "background-image": {
    key: "_background",
    subkey: "image",
    transform: (value) => ({ url: value.match(/url\("(.*?)"\)/)[1] }),
  },
  "background-position": { key: "_background", subkey: "position" },
  "background-repeat": { key: "_background", subkey: "repeat" },
  "background-size": { key: "_background", subkey: "size" },
  "border-top-width": {
    key: "_border",
    subkey: "width",
    transform: (value) => ({ top: value }),
  },
  "border-right-width": {
    key: "_border",
    subkey: "width",
    transform: (value) => ({ right: value }),
  },
  "border-bottom-width": {
    key: "_border",
    subkey: "width",
    transform: (value) => ({ bottom: value }),
  },
  "border-left-width": {
    key: "_border",
    subkey: "width",
    transform: (value) => ({ left: value }),
  },
  "border-top-left-radius": {
    key: "_border",
    subkey: "radius",
    transform: (value) => ({ topLeft: value }),
  },
  "border-top-right-radius": {
    key: "_border",
    subkey: "radius",
    transform: (value) => ({ topRight: value }),
  },
  "border-bottom-right-radius": {
    key: "_border",
    subkey: "radius",
    transform: (value) => ({ bottomRight: value }),
  },
  "border-bottom-left-radius": {
    key: "_border",
    subkey: "radius",
    transform: (value) => ({ bottomLeft: value }),
  },
  "border-style": { key: "_border", subkey: "style" },
  "border-color": {
    key: "_border",
    subkey: "color",
    transform: (value) => ({ raw: value }),
  },
  "box-shadow": {
    key: "_boxShadow",
    transform: (value) => {
      /* Complex transform, handle separately */
    },
  },
  color: {
    key: "_typography",
    subkey: "color",
    transform: (value) => ({ raw: value }),
  },
  display: { key: "_display" },
  "flex-direction": { key: "_flexDirection" },
  "flex-wrap": { key: "_flexWrap" },
  "justify-content": { key: "_justifyContent" },
  "align-items": { key: "_alignItems" },
  "align-self": { key: "_alignSelf" },
  "font-family": {
    key: "_typography",
    subkey: "font-family",
    transform: (value) => ({ name: value.split(",")[0].trim() }),
  },
  "font-size": { key: "_typography", subkey: "font-size" },
  "font-weight": { key: "_typography", subkey: "font-weight" },
  "font-style": { key: "_typography", subkey: "font-style" },
  gap: {
    key: "_gap",
    transform: (value) => ({
      row: value.split(" ")[0],
      column: value.split(" ")[1] || value.split(" ")[0],
    }),
  },
  height: { key: "_height" },
  left: { key: "_left" },
  "letter-spacing": { key: "_typography", subkey: "letter-spacing" },
  "line-height": { key: "_typography", subkey: "line-height" },
  "margin-top": { key: "_margin", subkey: "top" },
  "margin-right": { key: "_margin", subkey: "right" },
  "margin-bottom": { key: "_margin", subkey: "bottom" },
  "margin-left": { key: "_margin", subkey: "left" },
  "min-height": { key: "_heightMin" },
  "max-height": { key: "_heightMax" },
  "min-width": { key: "_widthMin" },
  "max-width": { key: "_widthMax" },
  "object-fit": { key: "_objectFit" },
  "object-position": { key: "_objectPosition" },
  opacity: { key: "_opacity" },
  order: { key: "_order" },
  overflow: { key: "_overflow" },
  "padding-top": { key: "_padding", subkey: "top" },
  "padding-right": { key: "_padding", subkey: "right" },
  "padding-bottom": { key: "_padding", subkey: "bottom" },
  "padding-left": { key: "_padding", subkey: "left" },
  position: { key: "_position" },
  right: { key: "_right" },
  "text-align": { key: "_typography", subkey: "text-align" },
  "text-decoration": { key: "_typography", subkey: "text-decoration" },
  "text-transform": { key: "_typography", subkey: "text-transform" },
  top: { key: "_top" },
  transform: {
    key: "_transform",
    transform: (value) => {
      /* Complex transform, handle separately */
    },
  },
  transition: { key: "_cssTransition" },
  visibility: { key: "_visibility" },
  width: { key: "_width" },
  "z-index": { key: "_zIndex" },
};

export const CODE_BLOCK_TAGS = new Set([
  "form",
  "input",
  "select",
  "textarea",
  "canvas",
  "iframe",
  "video",
  "audio",
  "script",
  "style",
]);

export const DIV_STANDARD_TAGS = [
  "article",
  "aside",
  "nav",
  "ul",
  "ol",
  "li",
  "figure",
  "address",
];

export const TEXT_BASIC_STANDARD_TAGS = [
  "p",
  "div",
  "span",
  "figcaption",
  "address",
  "figure",
];
