/**
 * CodeMirror editor initialization and utilities
 */

import { showToast } from './toast.js';

// Custom tag matching implementation
function setupCustomTagMatching(editor) {
  let currentMarks = [];

  function clearMarks() {
    currentMarks.forEach(mark => mark.clear());
    currentMarks = [];
  }

  function highlightMatchingTags() {
    clearMarks();

    const cursor = editor.getCursor();
    const token = editor.getTokenAt(cursor);
    const line = editor.getLine(cursor.line);

    // Check if cursor is on a tag
    const tagMatch = line.substring(0, cursor.ch).match(/<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*$/);
    if (!tagMatch) return;

    const tagName = tagMatch[1];
    const isClosingTag = tagMatch[0].startsWith('</');

    // Find all instances of this tag
    const content = editor.getValue();
    const openTagRegex = new RegExp(`<${tagName}(?:\\s[^>]*)?>`, 'gi');
    const closeTagRegex = new RegExp(`</${tagName}>`, 'gi');

    let openMatches = [];
    let closeMatches = [];
    let match;

    // Find all opening tags
    while ((match = openTagRegex.exec(content)) !== null) {
      const pos = editor.posFromIndex(match.index);
      const endPos = editor.posFromIndex(match.index + match[0].length);
      openMatches.push({ start: pos, end: endPos, index: match.index });
    }

    // Find all closing tags
    while ((match = closeTagRegex.exec(content)) !== null) {
      const pos = editor.posFromIndex(match.index);
      const endPos = editor.posFromIndex(match.index + match[0].length);
      closeMatches.push({ start: pos, end: endPos, index: match.index });
    }

    // Find the current tag position
    const cursorIndex = editor.indexFromPos(cursor);
    let currentTag = null;

    if (isClosingTag) {
      currentTag = closeMatches.find(tag =>
        tag.index <= cursorIndex && cursorIndex <= tag.index + `</${tagName}>`.length
      );
    } else {
      currentTag = openMatches.find(tag =>
        tag.index <= cursorIndex && cursorIndex <= tag.end
      );
    }

    if (!currentTag) return;

    // Simple matching: highlight the first matching pair
    if (isClosingTag && openMatches.length > 0) {
      // Highlight the opening tag
      const mark1 = editor.markText(openMatches[0].start, openMatches[0].end, {
        className: 'CodeMirror-matchingtag'
      });
      const mark2 = editor.markText(currentTag.start, currentTag.end, {
        className: 'CodeMirror-matchingtag'
      });
      currentMarks.push(mark1, mark2);
    } else if (!isClosingTag && closeMatches.length > 0) {
      // Highlight the closing tag
      const mark1 = editor.markText(currentTag.start, currentTag.end, {
        className: 'CodeMirror-matchingtag'
      });
      const mark2 = editor.markText(closeMatches[0].start, closeMatches[0].end, {
        className: 'CodeMirror-matchingtag'
      });
      currentMarks.push(mark1, mark2);
    }
  }

  // Add event listeners
  editor.on('cursorActivity', highlightMatchingTags);
  editor.on('change', clearMarks);
}

export function initializeEditors(dom, state) {
  const baseOpts = {
    theme: "dracula",
    lineNumbers: true,
    lineWrapping: true,
    indentUnit: 2,
    tabSize: 2,
    indentWithTabs: false,
    styleActiveLine: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    extraKeys: {
      "Ctrl-S": () => dom.runCodeBtn.click(),
    },
  };

  const htmlOpts = {
    ...baseOpts,
    mode: "xml",
    autoCloseTags: true,
  };

  const cssOpts = {
    ...baseOpts,
    mode: "css",
  };

  const jsOpts = {
    ...baseOpts,
    mode: "javascript",
  };

  const htmlEditor = CodeMirror.fromTextArea(dom.htmlEditor, htmlOpts);
  const cssEditor = CodeMirror.fromTextArea(dom.cssEditor, cssOpts);
  const jsEditor = CodeMirror.fromTextArea(dom.jsEditor, jsOpts);

  // Add custom tag matching for HTML editor
  setupCustomTagMatching(htmlEditor);

  // restore default values
  htmlEditor.setValue(state.defaultHTML);
  cssEditor.setValue(state.defaultCSS);
  jsEditor.setValue(state.defaultJS);

  return { htmlEditor, cssEditor, jsEditor };
}

export function formatCode(editorInstance, type = "code") {
  try {
    editorInstance.execCommand("selectAll");
    editorInstance.execCommand("indentAuto");
    editorInstance.setCursor(editorInstance.getCursor());
    if (type) {
      showToast(`${type} formatted`, "success");
    }
  } catch (e) {
    console.error("CodeMirror formatting failed:", e);
    showToast("Could not format code.", "error");
  }
}

export function setupFormatButtons(dom, editors) {
  const { htmlEditor, cssEditor, jsEditor } = editors;

  dom.formatHtmlBtn.addEventListener("click", () =>
    formatCode(htmlEditor, "HTML")
  );
  dom.formatCssBtn.addEventListener("click", () =>
    formatCode(cssEditor, "CSS")
  );
  dom.formatJsBtn.addEventListener("click", () =>
    formatCode(jsEditor, "JavaScript")
  );
}
