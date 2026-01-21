/**
 * Main application entry point
 * Coordinates all modules and manages global state
 */

// Import state and modules
import state from "./state.js";
import { ICONS } from "./constants/icons.js";
import { makeHistoryApi } from "./history/undo-redo.js";
import { initializeEditors, setupFormatButtons } from "./ui/editors.js";
import { showToast } from "./ui/toast.js";
import { parseFullPage } from "./parsers/full-page-parser.js";
import { detectDependencies } from "./parsers/dependency-detector.js";
import {
  updateDependencies,
  clearDependencies,
} from "./utils/dependency-manager.js";
import {
  showDependencyModal,
  updateDependencyButton,
  updateDependencyBadge,
} from "./ui/dependency-modal.js";
import { determineIfNewContent } from "./utils/content-detection.js";
import { generateContentHash } from "./utils/content-change-detector.js";
import {
  persistDependencyState,
  restoreDependencyState,
} from "./utils/dependency-persistence.js";
import {
  renderLayers,
  toggleLayer,
  toggleAllLayers,
  updateMultiSelectVisuals,
  updateSelectAllCheckboxState,
  enableLayerRename,
} from "./ui/layer-tree.js";
import {
  openModal,
  closeModal,
  showHtmlModal,
  showCssModal,
  showSupportModal,
  showInfoModal,
} from "./ui/modals.js";
import { initializeLogoEffect } from "./ui/logo.js";
import { initSortable } from "./ui/sortable.js";
import {
  renderPreview,
  updateIframeHighlights,
  scrollToIframeElement,
  scrollToLayerItem,
} from "./preview/iframe.js";
import { copyBricksJson } from "./clipboard/copy-bricks.js";
import {
  parseHtmlToLayers,
  generateHtmlFromLayers,
  getInitialLayerLabel,
} from "./parsers/html-parser.js";
import {
  deepParse,
  collectRulesForLayer,
  buildGlobalCss,
  getRelevantCss,
  validateCss,
  getLegalBaseSelectors,
} from "./parsers/css-parser.js";
import {
  generateBricksJson,
  generateStructuralBricksJson,
} from "./parsers/bricks-generator.js";
import {
  findLayerById,
  findLayerAndParent,
  removeLayerById,
  findPathToLayer,
  createCollapsedStateMap,
  getFlatLayerIds,
  getInstanceCount,
} from "./utils/layer-search.js";
import { generateId, stripDataC2bId } from "./utils/helpers.js";

// Global variables
let dom, htmlEditor, cssEditor, jsEditor;
let popperInstance = null;
let historyApi;

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  init();
});

// Make showToast available globally for testing
window.showToast = showToast;

function init() {
  cacheDomElements();
  historyApi = makeHistoryApi();

  // NEW: Restore dependency state from localStorage
  restoreDependencyState(state);

  // NEW: Initialize lock button visual state
  if (state.dependenciesLocked) {
    dom.lockDependenciesBtn.classList.add("active");
    const iconElement = dom.lockDependenciesBtn.querySelector(".icon");
    if (iconElement) {
      iconElement.innerHTML = ICONS.lockClosed;
    }
    console.log("Dependency lock restored:", state.dependenciesLocked);
  }

  dom.cssStyleModeCheckbox.checked = state.cssStyleMode === "gui";
  dom.cssModeCheckbox.checked = state.cssMode === "global";

  injectIcons();
  initializeLogoEffect();

  const editors = initializeEditors(dom, state);
  htmlEditor = editors.htmlEditor;
  cssEditor = editors.cssEditor;
  jsEditor = editors.jsEditor;

  initSplitters();
  setupEventListeners();
  setupFormatButtons(dom, { htmlEditor, cssEditor, jsEditor });

  // Call this function on init to fix the button's initial disabled state
  updateUiForState();

  runCode(false); // Initial run should not be recorded as a user action
  renderLayersWithSortable(); // ensure visible on first load

  recordHistory({
    layers: state.layers,
    html: htmlEditor.getValue(),
    css: cssEditor.getValue(),
    js: jsEditor.getValue(),
  });
  updateUndoRedoButtons();
}

function cacheDomElements() {
  dom = {
    appContainer: document.getElementById("app-container"),
    copyBricksBtn: document.getElementById("copy-bricks-btn"),
    runCodeBtn: document.getElementById("run-code-btn"),
    formatHtmlBtn: document.getElementById("format-html-btn"),
    formatCssBtn: document.getElementById("format-css-btn"),
    formatJsBtn: document.getElementById("format-js-btn"),
    htmlEditor: document.getElementById("html-editor"),
    cssEditor: document.getElementById("css-editor"),
    jsEditor: document.getElementById("js-editor"),
    previewIframe: document.getElementById("preview-iframe"),
    layerTree: document.getElementById("layer-tree"),
    contextMenu: document.getElementById("context-menu"),
    contextMenuCopyJson: document.querySelector(
      '#context-menu [data-action="copy-json"]'
    ),
    modalOverlay: document.getElementById("modal-overlay"),
    modalContent: document.getElementById("modal-content"),
    cssModeCheckbox: document.getElementById("css-mode-checkbox"),
    cssStyleModeCheckbox: document.getElementById("css-style-mode-checkbox"),
    toggleAllBtn: document.getElementById("toggle-all-btn"),
    deleteSelectedLayerBtn: document.getElementById(
      "delete-selected-layer-btn"
    ),
    selectAllCheckbox: document.getElementById("select-all-checkbox"),
    selectAllContainer: document.querySelector(".select-all-container"),
    undoBtn: document.getElementById("undo-btn"),
    redoBtn: document.getElementById("redo-btn"),
    autoHtmlScroll: document.getElementById("auto-html-scroll"),
    disablePreviewHighlights: document.getElementById(
      "disable-preview-highlights"
    ),
    supportProjectBtn: document.getElementById("support-project-btn"),
    // moreInfoBtn: document.getElementById("more-info-btn"),
    supportModalOverlay: document.getElementById("support-modal-overlay"),
    infoModalOverlay: document.getElementById("info-modal-overlay"),
    dependenciesBtn: document.getElementById("dependencies-btn"),
    dependencyBadge: document.getElementById("dependency-badge"),
    lockDependenciesBtn: document.getElementById("lock-dependencies-btn"),
  };

  // Setup tooltips
  const tippyOptions = {
    placement: "bottom",
    animation: "fade",
    theme: "translucent",
  };
  tippy(dom.copyBricksBtn, {
    ...tippyOptions,
    content: "Generate and copy the Bricks JSON structure",
  });
  tippy(dom.runCodeBtn, {
    ...tippyOptions,
    content: "Update the preview and layers panel (Ctrl+S)",
  });
  tippy(dom.formatHtmlBtn, {
    ...tippyOptions,
    content: "Auto-format and indent HTML code",
  });
  tippy(dom.formatCssBtn, {
    ...tippyOptions,
    content: "Auto-format and indent CSS code",
  });
  tippy(dom.formatJsBtn, {
    ...tippyOptions,
    content: "Auto-format and indent JavaScript code",
  });
  tippy(dom.toggleAllBtn, {
    ...tippyOptions,
    content: "Expand or collapse all layer items",
  });
  tippy(dom.deleteSelectedLayerBtn, {
    ...tippyOptions,
    content: "Delete all selected layers permanently",
  });
  tippy(dom.selectAllContainer, {
    ...tippyOptions,
    content: "Select or deselect all layers at once",
  });
  tippy(dom.undoBtn, {
    ...tippyOptions,
    content: "Undo the last action (Ctrl+Z)",
  });
  tippy(dom.redoBtn, {
    ...tippyOptions,
    content: "Redo the last undone action (Ctrl+Shift+Z)",
  });
  tippy(dom.moreInfoBtn, {
    placement: "bottom",
    animation: "fade",
    theme: "translucent",
    content: "More Info & Resources",
  });
  tippy(dom.dependenciesBtn, {
    placement: "bottom",
    animation: "fade",
    theme: "translucent",
    content: "View and copy external CSS/JS dependencies",
  });
  tippy(dom.lockDependenciesBtn, {
    placement: "bottom",
    animation: "fade",
    theme: "translucent",
    content: "Lock dependencies to prevent changes",
  });
  tippy(dom.cssStyleModeCheckbox.closest(".css-mode-toggle"), {
    ...tippyOptions,
    content:
      "GUI: Converts styles into native Bricks settings(Limited). Raw CSS: Pastes code directly into the element's 'Custom CSS' field.",
  });
  tippy(dom.cssModeCheckbox.closest(".css-mode-toggle"), {
    ...tippyOptions,
    content:
      "Global: Creates a global class in Bricks that can be used on other elements. Element: Applies classes to this specific element, in the custom css tab.",
  });
  tippy(dom.autoHtmlScroll.closest(".checkbox-label"), {
    ...tippyOptions,
    content:
      "Automatically scroll the HTML editor to match selected layers in the preview",
  });
  tippy(dom.disablePreviewHighlights.closest(".checkbox-label"), {
    ...tippyOptions,
    content: "Hide selection and hover highlights in the preview panel",
  });
}

function injectIcons() {
  document.getElementById("icon-html").innerHTML = ICONS.html;
  document.getElementById("icon-css").innerHTML = ICONS.css;
  document.getElementById("icon-js").innerHTML = ICONS.js;
  document.getElementById("icon-format").innerHTML = ICONS.format;
  document.getElementById("icon-format-css").innerHTML = ICONS.format;
  document.getElementById("icon-format-js").innerHTML = ICONS.format;
  document.getElementById("icon-expand").innerHTML = ICONS.expand;
  document.getElementById("icon-collapse").innerHTML = ICONS.collapse;
  document.getElementById("icon-delete-layer").innerHTML = ICONS.delete;
  document.getElementById("undo-btn").innerHTML = ICONS.undo;
  document.getElementById("redo-btn").innerHTML = ICONS.redo;
  // document.getElementById("more-info-btn").innerHTML = ICONS.more;
  document.getElementById("icon-dependencies").innerHTML = ICONS.dependencies;
  document.getElementById("icon-lock").innerHTML = ICONS.lockOpen;
}

function initSplitters() {
  Split(["#code-panel", "#preview-panel", "#layers-panel"], {
    sizes: [35, 40, 25],
    minSize: [250, 300, 250],
    gutterSize: 8,
    cursor: "col-resize",
  });

  Split(
    ["#html-editor-container", "#css-editor-container", "#js-editor-container"],
    {
      direction: "vertical",
      sizes: [45, 30, 25],
      minSize: 50,
      gutterSize: 8,
      cursor: "row-resize",
    }
  );
}

function runCode(record = true) {
  const oldStateMap = createCollapsedStateMap(state.layers);
  let html = htmlEditor.getValue();
  const css = cssEditor.getValue();
  const js = jsEditor.getValue();

  try {
    // ============================================
    // STEP 1: Store original HTML BEFORE parsing
    // ============================================
    const originalHtml = html;
    const isCurrentlyFullPage = parseFullPage(html).isFullPage;

    // ============================================
    // STEP 2: Detect dependencies from ORIGINAL HTML
    // ============================================
    let newDependencies = [];
    if (isCurrentlyFullPage) {
      newDependencies = detectDependencies(originalHtml);
      console.log("ðŸ“¦ Detected dependencies:", newDependencies.length);
    }

    // ============================================
    // STEP 3: Check if dependencies are locked
    // ============================================
    if (state.dependenciesLocked && state.dependencies.length > 0) {
      console.log(
        "Dependencies LOCKED - preserving existing:",
        state.dependencies.length
      );
      // Don't update dependencies, keep existing ones
    } else {
      // ============================================
      // STEP 4: Determine if NEW content or EDITING
      // ============================================
      const isNewContent = determineIfNewContent(
        state,
        originalHtml,
        newDependencies
      );
      console.log(
        "ðŸ” Content analysis:",
        isNewContent ? "NEW CONTENT" : "EDITING"
      );

      if (isNewContent) {
        console.log("âœ¨ NEW CONTENT - Updating dependencies");
        updateDependencies(newDependencies, state);
        state.originalFullPageHtml = originalHtml;
        state.lastFullPageParse = Date.now();
        showToast(
          `Full page detected - ${newDependencies.length} dependencies found`,
          "success"
        );
      } else {
        console.log("âœï¸ EDITING - Preserving dependencies");
        // Don't clear dependencies on edit
        if (!isCurrentlyFullPage && state.dependencies.length > 0) {
          // User switched to partial HTML - inform but preserve if locked
          showToast("Partial HTML detected - dependencies preserved", "info");
        }
      }
    }

    // ============================================
    // STEP 5: Parse HTML (strips dependencies)
    // ============================================
    const parsed = parseFullPage(html);

    if (parsed.isFullPage) {
      // Populate editors with cleaned content
      if (parsed.css) cssEditor.setValue(parsed.css);
      if (parsed.js) jsEditor.setValue(parsed.js);
      html = parsed.html;
      htmlEditor.setValue(html);

      // Store external dependencies for preview
      state.externalCSS = parsed.externalCSS || state.externalCSS || "";
      state.externalJS = parsed.externalJS || state.externalJS || "";
    }

    // ============================================
    // STEP 6: Update UI
    // ============================================
    updateDependencyButton(dom, state);
    updateDependencyBadge(dom, state);

    // ============================================
    // STEP 7: Update content hash AFTER processing
    // ============================================
    state.activeContentHash = generateContentHash(html, css, js);
    persistDependencyState(state);

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Reset global index counter for each parse
    parseHtmlToLayers.globalIndex = 1;

    state.layers = parseHtmlToLayers(
      Array.from(tempDiv.childNodes),
      0,
      oldStateMap
    );

    // After parsing, we update the editor with cleaned HTML (without our internal IDs)
    updateHtmlInEditorFromState();

    const rules = deepParse(css);
    const rootRules = rules.filter((r) => !r.parent);
    const atRulesMap = new Map();

    rules
      .filter((r) => r.parent)
      .forEach((r) => {
        if (!atRulesMap.has(r.parent)) atRulesMap.set(r.parent, []);
        atRulesMap.get(r.parent).push(r);
      });

    state.cssRules = {};
    rootRules.forEach((r) => {
      state.cssRules[r.selector] = r.body;
    });

    let globalCssString = "";
    atRulesMap.forEach((innerRules, parent) => {
      const innerCss = innerRules
        .map((r) => `  ${r.selector} {\n    ${r.body}\n  }`)
        .join("\n");
      globalCssString += `${parent} {\n${innerCss}\n}\n\n`;
    });
    state.globalCss = globalCssString.trim();

    renderLayersWithSortable();
    updateHtmlAndPreview();

    if (record) {
      recordHistory({
        layers: state.layers,
        html: htmlEditor.getValue(),
        css: cssEditor.getValue(),
        js: jsEditor.getValue(),
      });
    }
  } catch (error) {
    console.error("Error running code:", error);
    showToast(`Error: ${error.message}`, "error");
  }
}

function updateHtmlAndPreview() {
  const html = generateHtmlFromLayers(state.layers, 0, {
    includeDataAttr: true,
  });
  const css = cssEditor.getValue();
  const js = jsEditor.getValue();

  // Pass external dependencies to preview
  renderPreview(
    html,
    css,
    js,
    dom,
    state.externalCSS || "",
    state.externalJS || ""
  );

  // Update highlights after iframe loads
  dom.previewIframe.onload = () => {
    updateIframeHighlights(dom, state);
  };
}

function updateHtmlInEditorFromState() {
  const newHtml = stripDataC2bId(
    generateHtmlFromLayers(state.layers, 0, { includeDataAttr: true })
  );
  const currentPos = htmlEditor.getCursor();
  htmlEditor.setValue(newHtml);
  htmlEditor.setCursor(currentPos);
}

function recordHistory(snap) {
  historyApi.record(snap);
  updateUndoRedoButtons();
}

function updateUndoRedoButtons() {
  const historyState = historyApi.getState();
  dom.undoBtn.disabled = !historyState.canUndo;
  dom.redoBtn.disabled = !historyState.canRedo;
}

function performUndo() {
  const prev = historyApi.undo();
  if (!prev) return;

  state.layers = prev.layers;
  htmlEditor.setValue(prev.html);
  cssEditor.setValue(prev.css);
  jsEditor.setValue(prev.js);

  runCode(false);
  updateUndoRedoButtons();
}

function performRedo() {
  const next = historyApi.redo();
  if (!next) return;

  state.layers = next.layers;
  htmlEditor.setValue(next.html);
  cssEditor.setValue(next.css);
  jsEditor.setValue(next.js);

  runCode(false);
  updateUndoRedoButtons();
}

function setupEventListeners() {
  // Run code button
  dom.runCodeBtn.addEventListener("click", () => {
    runCode();
    showToast("Code executed and preview updated", "success");
  });

  // CSS mode toggles
  dom.cssModeCheckbox.addEventListener("change", (e) => {
    state.cssMode = e.target.checked ? "global" : "element";
    localStorage.setItem("c2b-cssMode", state.cssMode); // Persist
    updateUiForState();
  });

  dom.cssStyleModeCheckbox.addEventListener("change", (e) => {
    state.cssStyleMode = e.target.checked ? "gui" : "custom";
    localStorage.setItem("c2b-cssStyleMode", state.cssStyleMode); // Persist
    updateUiForState();
  });

  // Copy Bricks button
  dom.copyBricksBtn.addEventListener("click", () =>
    copyBricksJson(null, state, { htmlEditor, cssEditor, jsEditor })
  );

  // Layer tree interactions
  dom.layerTree.addEventListener("click", handleLayerClick);
  dom.layerTree.addEventListener("dblclick", handleLayerDblClick);
  dom.layerTree.addEventListener("contextmenu", handleLayerContextMenu);

  // Context menu
  dom.contextMenu.addEventListener("click", handleContextMenuClick);
  document.addEventListener("click", (e) => {
    const inside = dom.contextMenu.contains(e.target);
    if (!inside) {
      dom.contextMenu.style.display = "none";
      if (popperInstance) {
        popperInstance.destroy();
        popperInstance = null;
      }
    }
  });

  // Toggle all button
  dom.toggleAllBtn.addEventListener("click", handleToggleAllClick);

  // Delete selected layers
  dom.deleteSelectedLayerBtn.addEventListener("click", deleteSelectedLayers);

  // Select all checkbox
  dom.selectAllCheckbox.addEventListener("change", handleSelectAllChange);

  // Iframe messages
  window.addEventListener("message", handleIframeMessage);

  // Modal overlay
  dom.modalOverlay.addEventListener("click", (e) => {
    if (e.target === dom.modalOverlay) {
      closeModal(dom);
    }
  });

  // Global click handler
  dom.appContainer.addEventListener("click", (e) => {
    if (
      e.target.closest(
        "#layer-tree, .context-menu, .CodeMirror, button, input, .toggle-switch, .tippy-box, .gutter"
      )
    ) {
      return;
    }
    deselectAllLayers();
  });

  // Undo/Redo buttons
  dom.undoBtn.addEventListener("click", performUndo);
  dom.redoBtn.addEventListener("click", performRedo);

  // --- ADD THE FOLLOWING LISTENERS FOR NEW BUTTONS AND MODALS ---
  // dom.supportProjectBtn.addEventListener("click", () => {
  //  showSupportModal(dom);
  // });

  // dom.moreInfoBtn.addEventListener("click", () => {
  //  showInfoModal(dom, ICONS);
  // });

  // Handle closing of new modals by clicking the overlay or a close button
  dom.supportModalOverlay.addEventListener("click", (e) => {
    if (e.target.matches(".modal-overlay, [data-close-support-modal]")) {
      dom.supportModalOverlay.classList.remove("show");
    }
  });

  dom.infoModalOverlay.addEventListener("click", (e) => {
    if (e.target.matches(".modal-overlay, [data-close-info-modal]")) {
      dom.infoModalOverlay.classList.remove("show");
    }
  });

  // Dependencies button with validation and warning
  dom.dependenciesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    // STEP 1: Check if button has disabled class (visual disabled state)
    if (dom.dependenciesBtn.classList.contains("disabled")) {
      showToast("No external dependencies detected in your code", "warning");
      return;
    }

    // STEP 2: Verify dependencies exist before showing modal
    if (state.dependencies.length === 0) {
      showToast("No external dependencies detected", "info");
      return;
    }

    // STEP 3: Show modal
    showDependencyModal(dom, state);
  });

  // Dependencies lock button
  dom.lockDependenciesBtn.addEventListener("click", toggleDependencyLock);

  // Keyboard shortcuts
  window.addEventListener("keydown", (e) => {
    if (e.target.closest(".CodeMirror")) return;
    if (e.key === "Escape" && document.activeElement.tagName !== "INPUT") {
      deselectAllLayers();
    }
    if (
      (e.ctrlKey || e.metaKey) &&
      !e.shiftKey &&
      e.key.toLowerCase() === "z"
    ) {
      e.preventDefault();
      performUndo();
    }
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.shiftKey || e.key.toLowerCase() === "y")
    ) {
      if (e.key.toLowerCase() === "y" && !(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      performRedo();
    }
    if (
      (e.ctrlKey || e.metaKey) &&
      e.key.toLowerCase() === "d" &&
      !e.target.closest(".CodeMirror")
    ) {
      e.preventDefault();
      duplicateSelectedLayers();
    }
  });

  // Auto-scroll persistence
  dom.autoHtmlScroll.checked = JSON.parse(
    localStorage.getItem("c2b-auto-html-scroll") ?? "true"
  );
  dom.autoHtmlScroll.addEventListener("change", (e) =>
    localStorage.setItem("c2b-auto-html-scroll", e.target.checked)
  );

  // Disable preview highlights persistence
  dom.disablePreviewHighlights.checked = state.disablePreviewHighlights;
  dom.disablePreviewHighlights.addEventListener("change", (e) => {
    state.disablePreviewHighlights = e.target.checked;
    localStorage.setItem("c2b-disable-preview-highlights", e.target.checked);

    // Immediately update preview highlights
    updateIframeHighlights(dom, state);
  });

  // Clear functionality
  const clearBtn = document.getElementById("clear-code-btn");
  const clearModalOverlay = document.getElementById("clear-modal-overlay");
  const confirmClearBtn = document.getElementById("confirm-clear-btn");

  if (clearBtn) {
    clearBtn.addEventListener("click", () =>
      clearModalOverlay.classList.add("show")
    );
  }

  if (confirmClearBtn) {
    confirmClearBtn.addEventListener("click", () => {
      htmlEditor.setValue("");
      cssEditor.setValue("");
      jsEditor.setValue("");

      // Clear all dependencies and external resources
      clearDependencies(state);
      state.externalCSS = "";
      state.externalJS = "";
      state.originalFullPageHtml = null;
      state.activeContentHash = null;

      // Update dependency UI
      updateDependencyButton(dom, state);
      updateDependencyBadge(dom, state);

      // Persist cleared state
      persistDependencyState(state);

      clearModalOverlay.classList.remove("show");
      runCode();
      showToast("All code and dependencies cleared", "success");
      recordHistory({
        layers: [],
        html: "",
        css: "",
        js: "",
      });
    });
  }

  document
    .querySelectorAll("[data-close-clear-modal]")
    .forEach((btn) =>
      btn.addEventListener("click", () =>
        clearModalOverlay.classList.remove("show")
      )
    );
}

function handleLayerClick(e) {
  const layerContent = e.target.closest(".layer-content");
  if (!layerContent) return;

  e.stopPropagation();
  const clickedId = layerContent.dataset.id;

  if (e.target.closest(".layer-toggle")) {
    toggleLayer(clickedId, state);
    return;
  }

  expandParentsOfLayer(clickedId);

  const isCtrlOrMeta = e.ctrlKey || e.metaKey;
  const isShift = e.shiftKey;

  if (isShift && state.lastSelectedId) {
    const allIds = getFlatLayerIds(state.layers);
    const start = allIds.indexOf(state.lastSelectedId);
    const end = allIds.indexOf(clickedId);
    if (start !== -1 && end !== -1) {
      const range = allIds.slice(
        Math.min(start, end),
        Math.max(start, end) + 1
      );
      const currentSelection = new Set(state.multipleSelectedLayerIds);
      range.forEach((id) => currentSelection.add(id));
      state.multipleSelectedLayerIds = Array.from(currentSelection);
    }
  } else if (isCtrlOrMeta) {
    const index = state.multipleSelectedLayerIds.indexOf(clickedId);
    if (index > -1) {
      state.multipleSelectedLayerIds.splice(index, 1);
    } else {
      state.multipleSelectedLayerIds.push(clickedId);
    }
  } else {
    state.multipleSelectedLayerIds = [clickedId];
    scrollToIframeElement(clickedId, dom);
  }

  state.lastSelectedId = clickedId;
  state.selectedLayerId = clickedId;

  updateMultiSelectVisuals(state);
  updateIframeHighlights(dom, state);
  updateSelectAllCheckboxState(dom, state);

  if (state.selectedLayerId) {
    highlightHtmlForLayer(state.selectedLayerId);
  }
}

function handleLayerDblClick(e) {
  const label = e.target.closest(".layer-label");
  if (!label) return;
  const layerContent = label.closest(".layer-content");
  enableLayerRename(layerContent.dataset.id, label, state, recordHistory, {
    htmlEditor,
    cssEditor,
    jsEditor,
  });
}

function handleLayerContextMenu(e) {
  e.preventDefault();
  const layerContent = e.target.closest(".layer-content");
  if (!layerContent) {
    if (popperInstance) {
      popperInstance.destroy();
      popperInstance = null;
    }
    dom.contextMenu.style.display = "none";
    return;
  }

  state.contextMenuLayerId = layerContent.dataset.id;

  if (!state.multipleSelectedLayerIds.includes(state.contextMenuLayerId)) {
    expandParentsOfLayer(state.contextMenuLayerId);
    state.multipleSelectedLayerIds = [state.contextMenuLayerId];
    state.selectedLayerId = state.contextMenuLayerId;
    state.lastSelectedId = state.contextMenuLayerId;
    updateMultiSelectVisuals(state);
    updateIframeHighlights(dom, state);
    updateSelectAllCheckboxState(dom, state);
  }

  updateUiForState();

  // Show the context menu so Popper can measure it.
  dom.contextMenu.style.display = "block";

  // Create a virtual element that represents the click coordinates.
  const virtualElement = {
    getBoundingClientRect: () => ({
      width: 0,
      height: 0,
      top: e.clientY,
      right: e.clientX,
      bottom: e.clientY,
      left: e.clientX,
    }),
  };

  // Create the Popper instance using the correct v2 API.
  popperInstance = Popper.createPopper(virtualElement, dom.contextMenu, {
    placement: "bottom-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
      {
        name: "preventOverflow",
        options: {
          boundary: "viewport",
        },
      },
      {
        name: "flip",
        options: {
          fallbackPlacements: ["top-start", "right-start", "left-start"],
        },
      },
    ],
  });
}

function handleContextMenuClick(e) {
  const action = e.target.dataset.action;
  if (!action || e.target.classList.contains("disabled")) {
    if (action === "copy-json") {
      showToast(
        "Please set 'Apply class to' to 'Global Class' to use the 'Bricks Controls' option.",
        "warning"
      );
    }
    return;
  }

  // ROBUST ERROR CHECKING
  const targetId = state.contextMenuLayerId;
  if (!targetId) {
    console.error("âŒ Context menu: No target layer ID found");
    showToast("Error: No layer selected", "error");
    hideContextMenu();
    return;
  }

  const layer = findLayerById(state.layers, targetId);
  if (!layer) {
    console.error("âŒ Context menu: Layer not found for ID:", targetId);
    showToast("Error: Layer not found", "error");
    hideContextMenu();
    return;
  }

  console.log("Context menu action:", action, "for layer:", layer.label);

  try {
    switch (action) {
      case "rename":
        const layerEl = document.querySelector(
          `.layer-content[data-id="${targetId}"] .layer-label`
        );
        if (layerEl) {
          enableLayerRename(targetId, layerEl, state, recordHistory, {
            htmlEditor,
            cssEditor,
            jsEditor,
          });
        } else {
          console.error("âŒ Rename: Layer element not found in DOM");
          showToast("Error: Cannot rename layer", "error");
        }
        break;
      case "delete":
        deleteSelectedLayers();
        break;
      case "duplicate":
        duplicateLayer(targetId);
        break;
      case "copy-json":
        const layersToCopy =
          state.multipleSelectedLayerIds.length > 1
            ? getRootLayersFromSelection(state.multipleSelectedLayerIds)
            : [layer];
        copyBricksJson(layersToCopy, state, {
          htmlEditor,
          cssEditor,
          jsEditor,
        });
        break;
      case "view-html":
        // ENHANCED ERROR HANDLING FOR VIEW HTML
        if (!layer || !dom || !state || !generateStructuralBricksJson) {
          console.error("âŒ View HTML: Missing required parameters");
          showToast("Error: Cannot show HTML modal", "error");
          break;
        }
        console.log("ðŸ” Opening HTML modal for layer:", layer.label);
        showHtmlModal(layer, dom, state, generateStructuralBricksJson);
        break;
      case "view-css":
        // ENHANCED ERROR HANDLING FOR VIEW CSS
        if (
          !layer ||
          !dom ||
          !state ||
          !htmlEditor ||
          !cssEditor ||
          !jsEditor
        ) {
          console.error("âŒ View CSS: Missing required parameters");
          showToast("Error: Cannot show CSS modal", "error");
          break;
        }
        console.log("ðŸŽ¨ Opening CSS modal for layer:", layer.label);
        showCssModal(
          layer,
          dom,
          state,
          { htmlEditor, cssEditor, jsEditor },
          injectCssForLayer,
          runCode
        );
        break;
      default:
        console.warn("âš ï¸ Unknown context menu action:", action);
    }
  } catch (error) {
    console.error("âŒ Context menu action failed:", error);
    showToast(`Error: ${action} failed`, "error");
  }

  // ALWAYS CLEANUP
  state.contextMenuLayerId = null;
  hideContextMenu();
}

function hideContextMenu() {
  dom.contextMenu.style.display = "none";
  if (popperInstance) {
    popperInstance.destroy();
    popperInstance = null;
  }
}

function handleToggleAllClick() {
  state.allLayersExpanded = !state.allLayersExpanded;
  toggleAllLayers(state.allLayersExpanded, state);
  dom.toggleAllBtn.classList.toggle("show-collapse", state.allLayersExpanded);
  dom.toggleAllBtn.title = state.allLayersExpanded
    ? "Collapse All"
    : "Expand All";
}

function handleSelectAllChange(e) {
  const isChecked = e.target.checked;
  if (isChecked) {
    state.multipleSelectedLayerIds = getFlatLayerIds(state.layers);
  } else {
    state.multipleSelectedLayerIds = [];
  }
  state.selectedLayerId =
    state.multipleSelectedLayerIds.length > 0
      ? state.multipleSelectedLayerIds[0]
      : null;
  updateMultiSelectVisuals(state);
  updateIframeHighlights(dom, state);
}

function handleIframeMessage(event) {
  if (event.source !== dom.previewIframe.contentWindow) return;

  const { type, id } = event.data;

  if (type === "c2b-click") {
    if (id) {
      expandParentsOfLayer(id);

      state.multipleSelectedLayerIds = [id];
      state.selectedLayerId = id;
      state.lastSelectedId = id;

      updateMultiSelectVisuals(state);
      updateIframeHighlights(dom, state);
      updateSelectAllCheckboxState(dom, state);
      scrollToLayerItem(id);
      highlightHtmlForLayer(id);
    }
  } else if (type === "c2b-link-blocked") {
    showToast("ðŸ”— Link clicks are disabled in builder mode.", "error");
  }
}

function expandParentsOfLayer(layerId) {
  const parentIds = findPathToLayer(state.layers, layerId);
  if (!parentIds) return;

  parentIds.forEach((parentId) => {
    const parentLayer = findLayerById(state.layers, parentId);
    if (parentLayer && parentLayer.isCollapsed) {
      parentLayer.isCollapsed = false;

      const layerItemEl = document.querySelector(
        `.layer-item[data-id="${parentId}"]`
      );
      if (layerItemEl) {
        layerItemEl.classList.remove("collapsed");
        const toggle = layerItemEl.querySelector(".layer-toggle");
        if (toggle) toggle.classList.add("expanded");
      }
    }
  });
}

function deselectAllLayers() {
  if (state.multipleSelectedLayerIds.length === 0) {
    return;
  }

  state.multipleSelectedLayerIds = [];
  state.selectedLayerId = null;
  state.lastSelectedId = null;

  updateMultiSelectVisuals(state);
  updateIframeHighlights(dom, state);
  updateSelectAllCheckboxState(dom, state);
}

function deleteSelectedLayers() {
  const toDelete = [...state.multipleSelectedLayerIds];
  if (toDelete.length === 0) {
    showToast("No layers selected to delete.", "warning");
    return;
  }

  toDelete.forEach((id) => deleteLayer(id));

  const count = toDelete.length;

  state.multipleSelectedLayerIds = [];
  state.selectedLayerId = null;
  state.lastSelectedId = null;

  renderLayersWithSortable();
  updateHtmlAndPreview();
  updateHtmlInEditorFromState();

  showToast(`${count} layer${count > 1 ? "s" : ""} deleted`, "success");

  recordHistory({
    layers: state.layers,
    html: htmlEditor.getValue(),
    css: cssEditor.getValue(),
    js: jsEditor.getValue(),
  });
}

function deleteLayer(layerId) {
  state.layers = removeLayerById(state.layers, layerId);
  if (state.selectedLayerId === layerId) state.selectedLayerId = null;
  const multiIndex = state.multipleSelectedLayerIds.indexOf(layerId);
  if (multiIndex > -1) state.multipleSelectedLayerIds.splice(multiIndex, 1);
}

function toggleDependencyLock() {
  state.dependenciesLocked = !state.dependenciesLocked;

  // Update button visual state
  dom.lockDependenciesBtn.classList.toggle("active", state.dependenciesLocked);

  // Update icon
  const iconElement = dom.lockDependenciesBtn.querySelector(".icon");
  if (iconElement) {
    iconElement.innerHTML = state.dependenciesLocked
      ? ICONS.lockClosed
      : ICONS.lockOpen;
  }

  // Update badge to show lock status
  if (state.dependenciesLocked && state.dependencies.length > 0) {
    dom.dependencyBadge.classList.add("locked");
    dom.dependencyBadge.title = `${state.dependencies.length} dependencies locked`;
  } else {
    dom.dependencyBadge.classList.remove("locked");
    dom.dependencyBadge.title = `${state.dependencies.length} dependencies detected`;
  }

  // Show feedback toast
  const message = state.dependenciesLocked
    ? `Dependencies locked (${state.dependencies.length} items)`
    : ` Dependencies unlocked`;

  showToast(message, state.dependenciesLocked ? "success" : "info");

  // Persist state to localStorage
  persistDependencyState(state);

  console.log("Lock toggled:", state.dependenciesLocked);
}

function duplicateLayer(layerId) {
  const found = findLayerAndParent(state.layers, layerId);
  if (found) {
    const { parentArray, index } = found;
    const originalLayer = parentArray[index];
    const duplicatedLayer = JSON.parse(JSON.stringify(originalLayer));

    function assignNewIds(layer, newParentId) {
      layer.id = generateId();
      layer.parentId = newParentId;
      layer.children.forEach((child) => {
        assignNewIds(child, layer.id);
      });
    }
    assignNewIds(duplicatedLayer, originalLayer.parentId);

    parentArray.splice(index + 1, 0, duplicatedLayer);

    renderLayersWithSortable();
    updateHtmlAndPreview();
    updateHtmlInEditorFromState();

    showToast("Layer duplicated", "success");

    recordHistory({
      layers: state.layers,
      html: htmlEditor.getValue(),
      css: cssEditor.getValue(),
      js: jsEditor.getValue(),
    });
  }
}

function duplicateSelectedLayers() {
  if (state.multipleSelectedLayerIds.length === 1) {
    duplicateLayer(state.multipleSelectedLayerIds[0]);
  }
}

function getRootLayersFromSelection(selectionIds) {
  const selectionSet = new Set(selectionIds);
  const roots = [];

  function traverse(layers) {
    for (const layer of layers) {
      if (selectionSet.has(layer.id)) {
        roots.push(layer);
      } else {
        traverse(layer.children);
      }
    }
  }
  traverse(state.layers);
  return roots;
}

function updateUiForState() {
  const IS_CONFLICT_MODE =
    state.cssStyleMode === "gui" && state.cssMode === "element";
  const copyBtnTippy = dom.copyBricksBtn._tippy;

  dom.copyBricksBtn.classList.toggle("disabled", IS_CONFLICT_MODE);
  dom.contextMenuCopyJson.classList.toggle("disabled", IS_CONFLICT_MODE);

  if (copyBtnTippy) {
    if (IS_CONFLICT_MODE) {
      copyBtnTippy.setContent(
        "Unsupported Combination: Bricks' controls are designed for reusable classes. To map styles to the builder controls, please set 'Apply Class To' to 'Global Class'"
      );
      copyBtnTippy.setProps({ theme: "translucent-danger" });
    } else {
      copyBtnTippy.setContent("Generate and copy the Bricks JSON structure");
      copyBtnTippy.setProps({ theme: "translucent" });
    }
    // Force tooltip to refresh
    copyBtnTippy.hide();
  }
}

function injectCssForLayer(layer, newCss, editors, runCode) {
  const legal = getLegalBaseSelectors(layer);
  const rules = deepParse(editors.cssEditor.getValue());
  const kept = rules.filter((r) => {
    const cleanSelector = r.selector.replace(/:[:\w-]+(\(.*?\))?/g, "").trim();
    return !legal.some((token) => cleanSelector.endsWith(token));
  });

  let cssStr = "";
  // rebuild stylesheet
  const rootRules = kept.filter((r) => !r.parent);
  const atBlocks = new Map();

  rootRules.forEach((r) => (cssStr += `${r.selector} {\n  ${r.body}\n}\n\n`));
  kept
    .filter((r) => r.parent)
    .forEach((r) => {
      if (!atBlocks.has(r.parent)) atBlocks.set(r.parent, []);
      atBlocks.get(r.parent).push(r);
    });
  for (const [parent, inner] of atBlocks) {
    const innerCss = inner
      .map((r) => `  ${r.selector} {\n    ${r.body}\n  }`)
      .join("\n");
    cssStr += `${parent} {\n${innerCss}\n}\n\n`;
  }

  cssStr += newCss.trim();
  editors.cssEditor.setValue(cssStr.trim());
  runCode();
}

function highlightHtmlForLayer(layerId) {
  if (!dom.autoHtmlScroll.checked) {
    htmlEditor.getAllMarks().forEach((m) => m.clear());
    return;
  }

  const layer = findLayerById(state.layers, layerId);
  if (!layer) return;

  // Determine the instance number of this tag (e.g., the 3rd `<div>`)
  const instanceCount = getInstanceCount(state.layers, layerId);
  if (instanceCount === 0) return;

  const tagName = layer.tag;
  // This regex finds the opening tag, including self-closing tags
  const regex = new RegExp(`<${tagName}(\\s|>|\\/)`, "ig");

  const cursor = htmlEditor.getSearchCursor(
    regex,
    { line: 0, ch: 0 },
    { caseFold: true }
  );

  // Move the cursor to the Nth instance
  for (let i = 0; i < instanceCount; i++) {
    if (!cursor.findNext()) {
      return; // Not enough instances found, should not happen
    }
  }

  // We are now at the correct instance
  htmlEditor.getAllMarks().forEach((m) => m.clear()); // Remove old marks

  // To highlight only the tag, not its content, we need to find its closing '>'
  const from = cursor.from();
  const lineContent = htmlEditor.getLine(from.line);
  const closingBracketIndex = lineContent.indexOf(">", from.ch);
  const to = {
    line: from.line,
    ch: closingBracketIndex > -1 ? closingBracketIndex + 1 : lineContent.length,
  };

  htmlEditor.markText(from, to, {
    className: "c2b-editor-highlight",
    clearOnEnter: true,
  });

  htmlEditor.scrollIntoView({ from, to }, 120);
}

// Initialize sortable after layers are rendered
function initializeSortable() {
  initSortable(
    dom,
    state,
    updateHtmlAndPreview,
    updateHtmlInEditorFromState,
    recordHistory,
    { htmlEditor, cssEditor, jsEditor }
  );
}

// Initialize sortable after layers are rendered
function renderLayersWithSortable() {
  renderLayers(dom, state);
  updateMultiSelectVisuals(state);
  initializeSortable();
}

// Tooltips are now properly configured above