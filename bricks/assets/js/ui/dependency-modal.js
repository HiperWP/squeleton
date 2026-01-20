/**
 * Dependency Modal UI Component
 * Renders and manages the dependencies modal
 */

import { showToast } from './toast.js';
import { dismissDependencyBadge } from '../utils/dependency-manager.js';

/**
 * Renders the dependencies modal
 * @param {Object} dom - DOM elements
 * @param {Object} state - Global state
 */
export function showDependencyModal(dom, state) {
  const { dependencies } = state;

  // DEBUG: Log dependencies to verify they exist
  console.log('📦 Dependencies in modal:', dependencies);

  if (dependencies.length === 0) {
    showToast('No external dependencies detected', 'info');
    return;
  }

  const modalHtml = `
    <div class="modal-content modal-content-large">
      <div class="modal-header">
        <h2 class="modal-title">External Dependencies Detected</h2>
        <button class="modal-close-btn" data-close-dependency-modal>×</button>
      </div>
      <div class="modal-body dependency-modal-body">
        <p class="dependency-intro">
          The following external libraries were detected in your HTML.
          Copy and paste them into your site's <strong>&lt;head&gt;</strong> (for CSS)
          or before the closing <strong>&lt;/body&gt;</strong> tag (for JS).
        </p>

        ${renderDependencyGroups(dependencies)}
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-close-dependency-modal>Close</button>
      </div>
    </div>
  `;

  dom.modalOverlay.innerHTML = modalHtml;
  dom.modalOverlay.classList.add('show');

  // Attach event listeners
  attachDependencyModalListeners(dom, state);

  // Dismiss badge after viewing
  dismissDependencyBadge(state);
  updateDependencyBadge(dom, state);
}

/**
 * Renders dependency groups (CSS and JS separately)
 */
function renderDependencyGroups(dependencies) {
  const cssDeps = dependencies.filter(d => d.type === 'css');
  const jsDeps = dependencies.filter(d => d.type === 'js');

  let html = '';

  if (cssDeps.length > 0) {
    html += `
      <div class="dependency-group">
        <h3 class="dependency-group-title">
          <i class="icon">${getIconForType('css')}</i>
          CSS Libraries (${cssDeps.length})
        </h3>
        <p class="dependency-hint">Add these to your site's <code>&lt;head&gt;</code> section</p>
        ${cssDeps.map((dep, index) => renderDependencyItem(dep, index)).join('')}
      </div>
    `;
  }

  if (jsDeps.length > 0) {
    html += `
      <div class="dependency-group">
        <h3 class="dependency-group-title">
          <i class="icon">${getIconForType('js')}</i>
          JavaScript Libraries (${jsDeps.length})
        </h3>
        <p class="dependency-hint">Add these before the closing <code>&lt;/body&gt;</code> tag</p>
        ${jsDeps.map((dep, index) => renderDependencyItem(dep, index + cssDeps.length)).join('')}
      </div>
    `;
  }

  return html;
}

/**
 * Renders individual dependency item
 */
function renderDependencyItem(dep, index) {
  const libraryBadge = dep.library
    ? `<span class="library-badge">${dep.library}</span>`
    : '';

  return `
    <div class="dependency-item">
      <div class="dependency-header">
        <div class="dependency-info">
          <span class="dependency-name">${dep.name}</span>
          ${libraryBadge}
        </div>
        <button class="btn btn-sm btn-secondary" data-copy-dependency="${index}">
          <i class="icon">${getCopyIcon()}</i>
          Copy
        </button>
      </div>
      <div class="dependency-code">
        <code>${escapeHtml(dep.raw)}</code>
      </div>
    </div>
  `;
}

/**
 * Attaches event listeners to modal
 */
function attachDependencyModalListeners(dom, state) {
  // Close button
  dom.modalOverlay.querySelectorAll('[data-close-dependency-modal]')
    .forEach(btn => {
      btn.addEventListener('click', () => {
        dom.modalOverlay.classList.remove('show');
      });
    });

  // Copy buttons
  dom.modalOverlay.querySelectorAll('[data-copy-dependency]')
    .forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.dataset.copyDependency);
        const dep = state.dependencies[index];

        navigator.clipboard.writeText(dep.raw);
        showToast(`${dep.name} copied to clipboard`, 'success');
      });
    });

  // Close on overlay click
  dom.modalOverlay.addEventListener('click', (e) => {
    if (e.target === dom.modalOverlay) {
      dom.modalOverlay.classList.remove('show');
    }
  });
}

/**
 * Updates the dependency badge count and visibility
 */
export function updateDependencyBadge(dom, state) {
  const badge = dom.dependencyBadge;
  const count = state.dependencies.length;

  if (count === 0 || state.hasDismissedDependencyBadge) {
    badge.classList.add('hidden');
  } else {
    badge.classList.remove('hidden');
    badge.textContent = count;

    // ✅ NEW: Show lock indicator
    if (state.dependenciesLocked) {
      badge.classList.add('locked');
      badge.title = 'Dependencies locked';
    } else {
      badge.classList.remove('locked');
      badge.title = `${count} dependencies detected`;
    }
  }
}

/**
 * Shows or hides the dependencies button
 */
export function updateDependencyButton(dom, state) {
  const btn = dom.dependenciesBtn;
  const count = state.dependencies.length;

  // ALWAYS keep button visible, just toggle disabled state
  btn.style.display = 'inline-flex'; // Always visible

  if (count > 0) {
    btn.classList.remove('disabled');
    btn.disabled = false;
  } else {
    btn.classList.add('disabled');
    // Don't set btn.disabled = true to allow click events for toast
    btn.disabled = false;
  }

  updateDependencyBadge(dom, state);
}

// Helper functions
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getCopyIcon() {
  return `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4V2C4 1.44772 4.44772 1 5 1H13C13.5523 1 14 1.44772 14 2V10C14 10.5523 13.5523 11 13 11H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <rect x="2" y="5" width="9" height="10" rx="1" stroke="currentColor" stroke-width="1.5"/>
  </svg>`;
}

function getIconForType(type) {
  if (type === 'css') {
    return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_4841_1028)"><path d="M2 14.5L8 16.5L14 14.5L16 0.5H0M3 6.5H10L11 4.5H2V2.5H14L12 12.5H4V10.5H10V8.5H3" fill="currentColor"/></g><defs><clipPath id="clip0_4841_1028"><rect width="16" height="16" fill="white" transform="translate(0 0.5)"/></clipPath></defs>
    </svg>`;
  }
  return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_4841_1028)">
    <mask id="mask0_4841_1028" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="17">
    <path d="M0 0.5H16V16.5H0V0.5Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_4841_1028)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0.5H16V16.5H0V0.5ZM12.2313 13.9133C11.4893 13.9133 11.07 13.5267 10.748 13L9.526 13.71C9.96733 14.582 10.8693 15.2473 12.266 15.2473C13.694 15.2473 14.7573 14.506 14.7573 13.152C14.7573 11.8967 14.036 11.3387 12.7587 10.79L12.3827 10.6293C11.7373 10.3493 11.458 10.1673 11.458 9.716C11.458 9.35133 11.738 9.072 12.178 9.072C12.6093 9.072 12.8873 9.254 13.1453 9.716L14.316 8.96467C13.8207 8.09333 13.134 7.76067 12.178 7.76067C10.8353 7.76067 9.976 8.61933 9.976 9.74733C9.976 10.9707 10.696 11.55 11.7813 12.012L12.1573 12.1733C12.8433 12.4733 13.252 12.656 13.252 13.1713C13.252 13.602 12.854 13.9133 12.2313 13.9133ZM6.40467 13.9033C5.888 13.9033 5.67267 13.55 5.43667 13.13L4.21267 13.8713C4.56733 14.622 5.26467 15.2447 6.468 15.2447C7.80067 15.2447 8.71333 14.536 8.71333 12.9793V7.846H7.21V12.9593C7.21 13.7107 6.898 13.9033 6.404 13.9033" fill="currentColor"/>
    </g>
    </g>
    <defs>
    <clipPath id="clip0_4841_1028">
    <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
    </clipPath>
    </defs>
  </svg>`;
}
