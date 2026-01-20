/**
 * Toast notification system
 */

export function showToast(message, type = 'info') {
  const container = document.getElementById("toast-container");
  if (!container) {
    console.warn('Toast container not found');
    return;
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);

  setTimeout(() => {
    toast.classList.remove("show");
    toast.addEventListener("transitionend", () => toast.remove());
  }, 3000);
}
