/**
 * Clipboard operations for Bricks JSON
 */

import { generateBricksJson } from '../parsers/bricks-generator.js';
import { showToast } from '../ui/toast.js';

export function copyBricksJson(layersToProcess, state, editors) {
  const IS_CONFLICT_MODE =
    state.cssStyleMode === "gui" && state.cssMode === "element";
  if (IS_CONFLICT_MODE) {
    showToast(
      "Please set 'Apply class to' to 'Global Class' to apply styles to Bricks gui.",
      "warning"
    );
    return;
  }

  try {
    const layers = layersToProcess || state.layers;
    const cssText = editors.cssEditor.getValue();
    const jsText = editors.jsEditor.getValue();
    const json = generateBricksJson(layers, state, cssText, jsText);
    if (!json) return;

    const jsonString = JSON.stringify(json, null, 2);
    navigator.clipboard.writeText(jsonString);

    const message = layersToProcess
      ? "Selected element(s) JSON copied!"
      : "Full Bricks structure copied!";
    showToast(message, "success");
  } catch (e) {
    console.error("Failed to generate or copy JSON:", e);
    showToast("Error generating Bricks JSON.", "error");
  }
}
