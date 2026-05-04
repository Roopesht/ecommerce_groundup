// Global app state
let currentScreen = 'farmer-dashboard';

// Screen routing map
const screenMap = {
  // Farmer Profile Management
  'farmer-dashboard': renderFarmerDashboard,
  'profile-creation': renderProfileCreation,
  'public-profile': renderPublicProfile,

  // Farmer Order Management
  'orders-dashboard': renderOrdersDashboard,
  'order-detail': renderOrderDetail,

  // Checkout Payment
  'checkout-form': renderCheckoutForm,
  'payment-confirmation': renderPaymentConfirmation,
  'payment-failure': renderPaymentFailure,
};

/**
 * Initialize the app
 */
function initializeApp() {
  renderSidebar();
}

/**
 * Navigate to a different screen
 */
function goTo(screenName, params = {}) {
  currentScreen = screenName;

  // Store params for current screen
  window.currentScreenParams = params;

  // Render sidebar (active state changes)
  renderSidebar();

  // Render the screen
  const screenRenderer = screenMap[screenName];
  if (screenRenderer) {
    const html = screenRenderer(params);
    document.getElementById('mainContent').innerHTML = html;

    // Trigger screen events (for interactivity)
    attachScreenEvents(screenName);
  } else {
    console.warn(`Screen '${screenName}' not found`);
  }
}

/**
 * Render sidebar navigation
 */
function renderSidebar() {
  const role = window.appData.appState.userRole;
  let sections = [];

  if (role === 'farmer') {
    sections = [
      {
        title: 'Farmer',
        links: [
          { label: 'Dashboard', screen: 'farmer-dashboard' },
          { label: 'Edit Profile', screen: 'profile-creation' },
          { label: 'My Orders', screen: 'orders-dashboard' },
        ]
      },
      {
        title: 'Customer Views',
        links: [
          { label: 'Public Profile', screen: 'public-profile' },
        ]
      }
    ];
  } else {
    sections = [
      {
        title: 'Shopping',
        links: [
          { label: 'Checkout', screen: 'checkout-form' },
          { label: 'Confirmation', screen: 'payment-confirmation' },
          { label: 'Payment Failed', screen: 'payment-failure' },
        ]
      }
    ];
  }

  let html = '';
  sections.forEach(section => {
    html += `<div class="sidebar-section">
      <div class="sidebar-title">${section.title}</div>
      ${section.links.map(link => `
        <div class="sidebar-link ${currentScreen === link.screen ? 'active' : ''}"
             onclick="goTo('${link.screen}')">
          ${link.label}
        </div>
      `).join('')}
    </div>`;
  });

  document.getElementById('sidebar').innerHTML = html;
}

/**
 * Attach event handlers to screen elements
 */
function attachScreenEvents(screenName) {
  if (screenName === 'farmer-dashboard') {
    attachFarmerDashboardEvents();
  } else if (screenName === 'profile-creation') {
    attachProfileCreationEvents();
  } else if (screenName === 'orders-dashboard') {
    attachOrdersDashboardEvents();
  } else if (screenName === 'order-detail') {
    attachOrderDetailEvents();
  } else if (screenName === 'checkout-form') {
    attachCheckoutFormEvents();
  }
}

/**
 * Show a toast notification
 */
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast show ${type}`;

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/**
 * Show a modal
 */
function showModal(title, content, buttons = []) {
  const modal = document.getElementById('modal');
  const backdrop = document.getElementById('modalBackdrop');

  let html = `
    <div class="modal-header">
      <h2 class="modal-title">${title}</h2>
      <button class="modal-close" onclick="closeModal()">×</button>
    </div>
    <div class="modal-body">${content}</div>
  `;

  if (buttons.length > 0) {
    html += `
      <div class="modal-footer">
        ${buttons.map(btn => `
          <button class="button-${btn.type || 'primary'}" onclick="${btn.onclick}">
            ${btn.label}
          </button>
        `).join('')}
      </div>
    `;
  }

  modal.innerHTML = html;
  backdrop.classList.add('active');
}

/**
 * Close modal
 */
function closeModal() {
  document.getElementById('modalBackdrop').classList.remove('active');
}

/**
 * Format currency
 */
function formatCurrency(amount) {
  return `₹${parseFloat(amount).toFixed(2)}`;
}

/**
 * Format date
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
}

/**
 * Calculate order totals
 */
function calculateOrderTotals(items) {
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.unitPrice * item.quantity);
  }, 0);

  const tax = subtotal * 0.05; // 5% GST
  const deliveryFee = 0;
  const total = subtotal + tax + deliveryFee;

  return { subtotal, tax, deliveryFee, total };
}

/**
 * Switch between farmer and customer role
 */
function switchRole() {
  window.appData.appState.userRole = window.appData.appState.userRole === 'farmer' ? 'customer' : 'farmer';
  currentScreen = window.appData.appState.userRole === 'farmer' ? 'farmer-dashboard' : 'checkout-form';
  goTo(currentScreen);
  showToast(`Switched to ${window.appData.appState.userRole} view`);
}

/**
 * Logout
 */
function logout() {
  showToast('Logged out successfully');
  // In a real app, this would clear auth tokens and redirect
}
