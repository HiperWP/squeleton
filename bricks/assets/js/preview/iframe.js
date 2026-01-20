/**
 * Preview iframe rendering and interaction
 */

import { stripDataC2bId } from '../utils/helpers.js';

// Squeleton Framework - Always loaded in preview
const squeletonCSS = '<link rel="stylesheet" href="https://cdn.squeleton.dev/squeleton.v4.min.css">';
const squeletonJSFooter = '<script src="https://cdn.squeleton.dev/squeleton-scripts.v4.min.js"><\/script>';

export function renderPreview(html, css, js, dom, externalCSS = '', externalJS = '') {
  const iFrameScript = `
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const body = document.body;
            let lastHovered = null;

            body.addEventListener('mouseover', e => {
                // Check if highlights are disabled
                if (window.highlightsDisabled) return;

                const target = e.target.closest('[data-c2b-id]');
                if (target && target !== lastHovered) {
                    if(lastHovered) lastHovered.classList.remove('c2b-hover-highlight');
                    target.classList.add('c2b-hover-highlight');
                    lastHovered = target;
                }
            });

            body.addEventListener('mouseout', e => {
                // Check if highlights are disabled
                if (window.highlightsDisabled) return;

                if(lastHovered) {
                    lastHovered.classList.remove('c2b-hover-highlight');
                    lastHovered = null;
                }
            });

            body.addEventListener('click', e => {
                if (!e.target.closest('a[href]')) {
                    e.preventDefault();
                }
                const target = e.target.closest('[data-c2b-id]');
                if (target) {
                    const id = target.dataset.c2bId;
                    window.parent.postMessage({ type: 'c2b-click', id: id }, '*');
                }
            });

            // --- BLOCK <A> NAVIGATION ---
            body.addEventListener('click', e => {
              const anchor = e.target.closest('a[href]');
              if (anchor) {
                e.preventDefault();
                window.parent.postMessage({ type: 'c2b-link-blocked' }, '*');
              }
            });
        });
    <\/script>
  `;

  const iFrameStyles = `
    <style>
        :root { --accent-primary: ${getComputedStyle(
          document.documentElement
        )
          .getPropertyValue("--accent-primary")
          .trim()}; }
        .c2b-highlight {
            outline: 2px solid var(--accent-primary) !important;
            outline-offset: 2px;
            box-shadow: 0 0 15px rgba(112, 214, 255, 0.5);
            border-radius: 3px;
        }
        .c2b-hover-highlight {
            outline: 2px dashed var(--accent-primary) !important;
            outline-offset: 2px;
            border-radius: 3px;
            cursor: pointer;
        }
        body { scroll-behavior: smooth; }
    </style>
  `;

  // Include Squeleton framework and external CSS/JS in head
  const head = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${squeletonCSS}
    ${externalCSS}
    ${iFrameStyles}
    <style id="main-styles">${css}</style>
    ${iFrameScript}
  `;

  const body = `<body>${html}${squeletonJSFooter}${externalJS}<script>${js}<\/script></body>`;

  dom.previewIframe.srcdoc = `<html><head>${head}</head>${body}</html>`;

  dom.previewIframe.onload = () => {
    // updateIframeHighlights will be called from main
  };
}

export function updateIframeHighlights(dom, state) {
  const doc = dom.previewIframe.contentDocument;
  if (!doc) return;

  // Set flag in iframe to disable hover highlights
  if (doc.defaultView) {
    doc.defaultView.highlightsDisabled = state.disablePreviewHighlights;
  }

  // Always remove existing highlights first
  doc
    .querySelectorAll(".c2b-highlight")
    .forEach((el) => el.classList.remove("c2b-highlight"));

  // If highlights are disabled, stop here
  if (state.disablePreviewHighlights) {
    return;
  }

  // Apply highlights for selected layers (only if not disabled)
  state.multipleSelectedLayerIds.forEach((id) => {
    const el = doc.querySelector(`[data-c2b-id="${id}"]`);
    if (el) el.classList.add("c2b-highlight");
  });
}

export function scrollToIframeElement(elementId, dom) {
  const doc = dom.previewIframe.contentDocument;
  if (!doc) return;

  const element = doc.querySelector(`[data-c2b-id="${elementId}"]`);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }
}

export function scrollToLayerItem(layerId) {
  const layerItem = document.querySelector(
    `.layer-item[data-id="${layerId}"]`
  );
  if (layerItem) {
    layerItem.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }
}
