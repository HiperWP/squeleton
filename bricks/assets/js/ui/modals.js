/**
 * Modal dialog system
 */

import { formatCode } from "./editors.js";
import { showToast } from "./toast.js";
import { generateHtmlFromLayers } from "../parsers/html-parser.js";
import { stripDataC2bId } from "../utils/helpers.js";
import {
  getRelevantCss,
  validateCss,
  deepParse,
  getLegalBaseSelectors,
} from "../parsers/css-parser.js";

export function openModal(dom) {
  dom.modalOverlay.classList.add("show");

  // Remove any existing event listeners to prevent duplicates
  const closeBtn = dom.modalContent.querySelector(".modal-close-btn");
  if (closeBtn) {
    // Clone the button to remove all event listeners
    const newCloseBtn = closeBtn.cloneNode(true);
    closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);

    // Add the event listener to the new button
    newCloseBtn.addEventListener("click", () => closeModal(dom));
  }
}

export function closeModal(dom) {
  dom.modalOverlay.classList.remove("show");
}

export function showHtmlModal(layer, dom, state, generateStructuralBricksJson) {
  // ✅ PARAMETER VALIDATION
  if (!layer) {
    console.error('❌ showHtmlModal: layer is required');
    showToast('Error: No layer provided', 'error');
    return;
  }
  if (!dom || !dom.modalContent) {
    console.error('❌ showHtmlModal: dom.modalContent is required');
    showToast('Error: Modal container not found', 'error');
    return;
  }
  if (!generateStructuralBricksJson) {
    console.error('❌ showHtmlModal: generateStructuralBricksJson function is required');
    showToast('Error: JSON generator not available', 'error');
    return;
  }

  console.log('🔍 Showing HTML modal for layer:', layer.label);

  // ✅ GENERATE HTML DATA FIRST
  let elementHtml = '';
  let descendantsHtml = '';
  try {
    elementHtml = stripDataC2bId(
      generateHtmlFromLayers([layer], 0, {
        includeDataAttr: false,
        includeChildren: false,
      })
    );
    descendantsHtml = stripDataC2bId(
      generateHtmlFromLayers([layer], 0, {
        includeDataAttr: false,
        includeChildren: true,
      })
    );
    console.log('✅ HTML Modal: Generated HTML data successfully');
    console.log('  - Element HTML:', elementHtml.length, 'characters');
    console.log('  - Descendants HTML:', descendantsHtml.length, 'characters');
  } catch (error) {
    console.error('❌ HTML Modal: Failed to generate HTML:', error);
    elementHtml = '<!-- Error generating HTML -->';
    descendantsHtml = '<!-- Error generating HTML -->';
  }

  // ✅ CREATE MODAL HTML
  const modalHtml = `
    <div class="modal-header">
        <h2 class="modal-title">View HTML - ${layer.label}</h2>
        <button class="modal-close-btn">×</button>
    </div>
    <div class="modal-body">
        <div class="modal-tabs">
            <button class="modal-tab active" data-tab="element">Element Only</button>
            <button class="modal-tab" data-tab="descendants">Element & Descendants</button>
        </div>
        <div class="modal-tab-content active" data-tab-content="element">
            <div class="modal-editor-container">
                <textarea id="html-modal-editor-element"></textarea>
            </div>
        </div>
        <div class="modal-tab-content" data-tab-content="descendants">
            <div class="modal-editor-container">
                <textarea id="html-modal-editor-descendants"></textarea>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button class="btn btn-secondary" id="copy-html-btn">Copy HTML</button>
        <button class="btn btn-primary" id="copy-json-btn">Copy Bricks JSON</button>
    </div>
  `;

  try {
    dom.modalContent.innerHTML = modalHtml;
    console.log('✅ HTML Modal: HTML created successfully');
  } catch (error) {
    console.error('❌ showHtmlModal: Failed to set modal HTML:', error);
    showToast('Error: Failed to create modal', 'error');
    return;
  }

  // ✅ ROBUST DOM INITIALIZATION WITH RETRY MECHANISM
  const initializeModal = (attempt = 1) => {
    const elementTextarea = document.getElementById("html-modal-editor-element");
    const descendantsTextarea = document.getElementById("html-modal-editor-descendants");

    if (!elementTextarea || !descendantsTextarea) {
      if (attempt < 5) {
        console.warn(`⚠️ HTML Modal: Textarea elements not found, retrying... (${attempt}/5)`);
        setTimeout(() => initializeModal(attempt + 1), 50);
        return;
      } else {
        console.error("❌ HTML Modal: Textarea elements not found after 5 attempts");
        showToast('Error: Failed to initialize HTML modal', 'error');
        return;
      }
    }

    console.log('✅ HTML Modal: Found textareas, initializing CodeMirror editors');

    try {
      const elementEditor = CodeMirror.fromTextArea(elementTextarea, {
        mode: "xml",
        htmlMode: true,
        theme: "dracula",
        lineNumbers: true,
        readOnly: true,
        lineWrapping: true,
      });
      elementEditor.setValue(elementHtml);
      formatCode(elementEditor, null);
      setTimeout(() => elementEditor.refresh(), 100);
      console.log('✅ HTML Modal: Element editor initialized');

      const descendantsEditor = CodeMirror.fromTextArea(descendantsTextarea, {
        mode: "xml",
        htmlMode: true,
        theme: "dracula",
        lineNumbers: true,
        readOnly: true,
        lineWrapping: true,
      });
      descendantsEditor.setValue(descendantsHtml);
      formatCode(descendantsEditor, null);
      setTimeout(() => descendantsEditor.refresh(), 100);
      console.log('✅ HTML Modal: Descendants editor initialized');

      openModal(dom);
      console.log('✅ HTML Modal: Successfully opened with both editors');

    let activeTab = "element";

    dom.modalContent
      .querySelector(".modal-tabs")
      .addEventListener("click", (e) => {
        if (e.target.classList.contains("modal-tab")) {
          activeTab = e.target.dataset.tab;
          dom.modalContent
            .querySelectorAll(".modal-tab")
            .forEach((tab) => tab.classList.remove("active"));
          e.target.classList.add("active");
          dom.modalContent
            .querySelectorAll(".modal-tab-content")
            .forEach((content) => content.classList.remove("active"));
          dom.modalContent
            .querySelector(`[data-tab-content="${activeTab}"]`)
            .classList.add("active");
          descendantsEditor.refresh();
          elementEditor.refresh();
        }
      });

      // ✅ SETUP EVENT LISTENERS WITH ERROR HANDLING
      const copyHtmlBtn = dom.modalContent.querySelector("#copy-html-btn");
      const copyJsonBtn = dom.modalContent.querySelector("#copy-json-btn");

      if (copyHtmlBtn) {
        copyHtmlBtn.addEventListener("click", () => {
          try {
            const htmlToCopy = activeTab === "element" ? elementHtml : descendantsHtml;
            navigator.clipboard.writeText(htmlToCopy);
            showToast(`${layer.label} HTML copied`, "success");
            console.log('✅ HTML Modal: HTML copied to clipboard');
          } catch (error) {
            console.error('❌ HTML Modal: Failed to copy HTML:', error);
            showToast('Error: Failed to copy HTML', 'error');
          }
        });
      }

      if (copyJsonBtn) {
        copyJsonBtn.addEventListener("click", () => {
          try {
            const layersToCopy = activeTab === "element" ? [{ ...layer, children: [] }] : [layer];
            const json = generateStructuralBricksJson(layersToCopy, state);
            const jsonString = JSON.stringify(json, null, 2);
            navigator.clipboard.writeText(jsonString);
            showToast(`${layer.label} JSON copied`, "success");
            console.log('✅ HTML Modal: JSON copied to clipboard');
          } catch (error) {
            console.error('❌ HTML Modal: Failed to copy JSON:', error);
            showToast('Error: Failed to copy JSON', 'error');
          }
        });
      }

      console.log('✅ HTML Modal: Event listeners attached successfully');
    } catch (error) {
      console.error('❌ HTML Modal: Failed to initialize:', error);
      showToast('Error: Failed to initialize HTML modal', 'error');
    }
  };

  // ✅ START INITIALIZATION
  console.log('🔍 Starting HTML modal initialization...');
  initializeModal();
}

export function showCssModal(
  layer,
  dom,
  state,
  editors,
  injectCssForLayer,
  runCode
) {
  // ✅ PARAMETER VALIDATION
  if (!layer) {
    console.error('❌ showCssModal: layer is required');
    showToast('Error: No layer provided', 'error');
    return;
  }
  if (!dom || !dom.modalContent) {
    console.error('❌ showCssModal: dom.modalContent is required');
    showToast('Error: Modal container not found', 'error');
    return;
  }
  if (!editors || !editors.cssEditor) {
    console.error('❌ showCssModal: editors.cssEditor is required');
    showToast('Error: CSS editor not available', 'error');
    return;
  }
  if (!injectCssForLayer || typeof injectCssForLayer !== 'function') {
    console.error('❌ showCssModal: injectCssForLayer function is required');
    showToast('Error: CSS injection function not available', 'error');
    return;
  }

  console.log('🎨 Showing CSS modal for layer:', layer.label);

  // ✅ GET CSS DATA FIRST
  let relevantCss = '';
  try {
    const legal = getLegalBaseSelectors(layer);
    relevantCss = getRelevantCss(
      layer,
      editors.cssEditor.getValue(),
      state.layers
    );
    console.log('✅ CSS Modal: Retrieved relevant CSS:', relevantCss.length, 'characters');
  } catch (error) {
    console.error('❌ CSS Modal: Failed to get relevant CSS:', error);
    relevantCss = '/* No relevant CSS found */';
  }

  // ✅ CREATE MODAL HTML
  try {
    const html = `
      <div class="modal-header">
        <h2 class="modal-title">Edit CSS for <span class="css-modal-title-accent">${layer.label}</span></h2>
        <button class="modal-close-btn">×</button>
      </div>
      <div class="modal-body">
        <div class="modal-editor-container">
          <textarea id="css-modal-editor"></textarea>
        </div>
      </div>
      <div class="modal-footer" id="css-modal-footer">
        <button class="btn btn-primary" id="save-css-btn">Save changes</button>
        <button class="btn btn-secondary" id="copy-css-btn">Copy CSS</button>
      </div>
    `;

    dom.modalContent.innerHTML = html;
    console.log('✅ CSS Modal: HTML created successfully');
  } catch (error) {
    console.error('❌ showCssModal: Failed to set modal HTML:', error);
    showToast('Error: Failed to create CSS modal', 'error');
    return;
  }

  // ✅ ROBUST DOM INITIALIZATION WITH RETRY MECHANISM
  const initializeCssModal = (attempt = 1) => {
    const cssTextarea = document.getElementById("css-modal-editor");

    if (!cssTextarea) {
      if (attempt < 5) {
        console.warn(`⚠️ CSS Modal: Textarea element not found, retrying... (${attempt}/5)`);
        setTimeout(() => initializeCssModal(attempt + 1), 50);
        return;
      } else {
        console.error("❌ CSS Modal: Textarea element not found after 5 attempts");
        showToast('Error: Failed to initialize CSS modal', 'error');
        return;
      }
    }

    console.log('✅ CSS Modal: Found textarea, initializing CodeMirror editor');

    try {
      const cm = CodeMirror.fromTextArea(cssTextarea, {
        mode: "css",
        theme: "dracula",
        lineNumbers: true,
        lineWrapping: true,
        indentUnit: 2,
        tabSize: 2,
        indentWithTabs: false,
        styleActiveLine: true,
        autoCloseBrackets: true,
        autoCloseTags: true,
        extraKeys: {
          "Ctrl-S": () => dom.runCodeBtn.click(),
        },
      });

      // ✅ SET CSS VALUE (NOW ACCESSIBLE)
      cm.setValue(relevantCss);
      formatCode(cm, null);
      setTimeout(() => cm.refresh(), 150);

      openModal(dom);
      console.log('✅ CSS Modal: Successfully opened with', relevantCss.length, 'characters of CSS');

      // ✅ SETUP EVENT LISTENERS
      document.getElementById("save-css-btn").addEventListener("click", () => {
        const cssText = cm.getValue().trim();
        if (!validateCss(cssText, layer, state.layers)) {
          showToast(
            "Selectors must match the selected element (id, class, data-attr)",
            "error"
          );
          return;
        }
        injectCssForLayer(layer, cssText, editors, runCode);
        showToast("CSS saved & preview updated", "success");
        closeModal(dom);
      });

      document.getElementById("copy-css-btn").addEventListener("click", () => {
        navigator.clipboard.writeText(cm.getValue());
        showToast("CSS copied", "success");
      });

      console.log('✅ CSS Modal: Event listeners attached successfully');
    } catch (error) {
      console.error('❌ CSS Modal: Failed to initialize CodeMirror:', error);
      showToast('Error: Failed to initialize CSS modal', 'error');
    }
  };

  // ✅ START INITIALIZATION
  console.log('🎨 Starting CSS modal initialization...');
  initializeCssModal();
}

export function showSupportModal(dom) {
  const modalHtml = `
    <div class="modal-content modal-content-large">
      <div class="modal-header">
        <h2 class="modal-title">Support the Project</h2>
        <button class="modal-close-btn support-modal" data-close-support-modal>×</button>
      </div>
      <div class="modal-body clear-modal-body support-modal-body">
        <p>Hi, I'm Zar, the creator of this tool. I built Squeleton2Bricks to give back to the Bricks community and have committed to keeping it free and open for everyone.</p><br>
        <p>If you find this tool helpful and want to support its continued development, maintenance, and hosting costs, please consider a small donation. It's truly appreciated, but never required.</p><br>
        <p>Thank you for being part of the journey :)</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-close-support-modal>Close</button>
        <a href="https://buy.stripe.com/8x26oH3kU2Kl3tN8W5fjG03" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Donate Securely</a>
      </div>
    </div>
  `;

  dom.supportModalOverlay.innerHTML = modalHtml;
  dom.supportModalOverlay.classList.add("show");
}

export function showInfoModal(dom, icons) {
  const modalHtml = `
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Resources & Info</h2>
        <button class="modal-close-btn" data-close-info-modal>×</button>
      </div>
      <div class="modal-body info-modal-body">
        <!-- Actions Section -->
        <div>
          <h3 class="info-modal-section-title">Actions</h3>
          <div class="info-modal-grid">
            <a href="https://mahmudzar.notion.site/237da768e05680f287c7d7b2c08909e8" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Report a Problem / Suggest a Feature</a>
            <a href="https://mahmudzar.notion.site/Squeleton2Bricks-Getting-Started-Doc-237da768e056807eb3eae4c0d4c5f5a7#237da768e05680958241e871296893d6" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Read the Docs</a>
          </div>
        </div>

        <!-- Other Tools Section -->
        <div>
          <h3 class="info-modal-section-title">My Other Free Tools</h3>
          <div class="info-modal-grid">
            <a href="https://bricks2code.sevalla.page/" target="_blank" rel="noopener noreferrer" class="info-modal-card">
              <h4>Bricks2Code</h4>
              <p>The reverse of this tool. Convert your Bricks page data into clean, portable HTML and CSS.</p>
            </a>
            <a href="https://bricksvariablemanager.sevalla.page/" target="_blank" rel="noopener noreferrer" class="info-modal-card">
              <h4>Bricks Variable Manager</h4>
              <p>A powerful interface to create, manage, import, and export CSS variables for your Bricks projects.</p>
            </a>
          </div>
        </div>

        <!-- Socials Section -->
        <div>
          <h3 class="info-modal-section-title">Connect With Me</h3>
          <div class="info-modal-socials">
            <a href="https://github.com/MahmudZar" target="_blank" rel="noopener noreferrer" title="GitHub">${icons.github}</a>
            <a href="https://x.com/mahmudzar_" target="_blank" rel="noopener noreferrer" title="Twitter">${icons.twitter}</a>
            <a href="https://www.facebook.com/mahmud.zar.2025/" target="_blank" rel="noopener noreferrer" title="Facebook">${icons.facebook}</a>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-close-info-modal>Close</button>
      </div>
    </div>
  `;

  dom.infoModalOverlay.innerHTML = modalHtml;
  dom.infoModalOverlay.classList.add("show");
}
