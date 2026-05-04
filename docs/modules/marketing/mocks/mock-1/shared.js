/**
 * shared.js - Common components and utilities
 */

/**
 * Render header with navigation
 */
function renderHeader() {
  const user = window.appData.appState.userName;
  const role = window.appData.appState.userRole;

  return `
    <div class="app-header">
      <div class="app-logo">🌱 Fresh Farm</div>
      <div class="app-nav">
        <span>${role === 'farmer' ? '👨‍🌾' : '👩'} ${user}</span>
        <button onclick="switchRole()">Switch Role</button>
        <button onclick="logout()">Logout</button>
      </div>
    </div>
  `;
}

/**
 * Render a rating display
 */
function renderRating(rating, count) {
  const stars = Math.round(rating);
  let starHtml = '';
  for (let i = 0; i < 5; i++) {
    starHtml += i < stars ? '⭐' : '☆';
  }
  return `<span>${starHtml} ${rating} (${count} reviews)</span>`;
}

/**
 * Render a status badge
 */
function renderStatusBadge(status) {
  const badges = {
    'new': { emoji: '🔵', label: 'New', class: 'badge-info' },
    'confirmed': { emoji: '✅', label: 'Confirmed', class: 'badge-success' },
    'preparing': { emoji: '🔄', label: 'Preparing', class: 'badge-warning' },
    'ready_for_delivery': { emoji: '📦', label: 'Ready', class: 'badge-info' },
    'ready-for-delivery': { emoji: '📦', label: 'Ready', class: 'badge-info' },
    'completed': { emoji: '✔️', label: 'Completed', class: 'badge-success' },
  };

  const badge = badges[status] || { emoji: '❓', label: status, class: 'badge-info' };
  return `<span class="badge ${badge.class}">${badge.emoji} ${badge.label}</span>`;
}

/**
 * Render product card
 */
function renderProductCard(produce) {
  return `
    <div class="item-card">
      <div class="item-card-image">${produce.emoji}</div>
      <div class="item-card-content">
        <div class="item-card-farmer">${window.appData.farmers[produce.farmerId].name}</div>
        <div class="item-card-name">${produce.name}</div>
        <div class="item-card-price">${formatCurrency(produce.price)}/${produce.unit}</div>
        <div class="item-card-meta">⏱️ ${produce.leadTime}</div>
        <div class="item-card-meta">${renderStatusBadge(produce.availabilityStatus)}</div>
      </div>
    </div>
  `;
}

/**
 * Render farmer card
 */
function renderFarmerCard(farmer) {
  return `
    <div class="card">
      <div style="font-size: 40px; text-align: center; margin-bottom: var(--spacing-md);">
        ${farmer.photoUrl}
      </div>
      <h4>${farmer.name}</h4>
      <div style="font-size: 12px; color: var(--color-dark-gray); margin: var(--spacing-sm) 0;">
        📍 ${farmer.location.city}, ${farmer.location.village}
      </div>
      <div style="margin: var(--spacing-md) 0;">
        ${renderRating(farmer.rating, farmer.reviewCount)}
      </div>
      <button class="button-primary button-full-width" onclick="goTo('public-profile', {farmerId: '${farmer.id}'})">
        View Profile
      </button>
    </div>
  `;
}

/**
 * Render order summary section
 */
function renderOrderSummary(items, farmerId) {
  const farmer = window.appData.farmers[farmerId];
  const totals = calculateOrderTotals(items);

  let itemsHtml = items.map(item => {
    const produce = window.appData.produce[item.produceId];
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-sm);">
        <span>${produce.emoji} ${produce.name} x ${item.quantity}${item.unit}</span>
        <span>${formatCurrency(item.unitPrice * item.quantity)}</span>
      </div>
    `;
  }).join('');

  return `
    <div class="card card-light-sage">
      <h4>${farmer.name}</h4>
      <small>Est. Delivery: 2026-05-06 to 2026-05-07</small>
      <div class="divider"></div>
      ${itemsHtml}
      <div class="summary-row">
        <span>Subtotal:</span>
        <strong>${formatCurrency(totals.subtotal)}</strong>
      </div>
    </div>
  `;
}

/**
 * Render timeline
 */
function renderTimeline(currentStatus) {
  const statuses = ['new', 'confirmed', 'preparing', 'ready_for_delivery', 'completed'];
  const statusLabels = {
    'new': 'Order Placed',
    'confirmed': 'Confirmed',
    'preparing': 'Preparing',
    'ready_for_delivery': 'Ready for Delivery',
    'completed': 'Completed',
  };

  let html = '<div class="timeline">';

  statuses.forEach((status, idx) => {
    const isCompleted = statuses.indexOf(currentStatus) >= idx;
    const isActive = status === currentStatus;

    html += `
      <div class="timeline-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}">
        <div>
          <strong>${statusLabels[status]}</strong>
          <div style="font-size: 12px; color: var(--color-dark-gray);">2026-05-0${4 + idx}</div>
        </div>
      </div>
    `;
  });

  html += '</div>';
  return html;
}

/**
 * Render review
 */
function renderReview(review) {
  return `
    <div class="card" style="margin-bottom: var(--spacing-lg);">
      <div style="display: flex; justify-content: space-between; align-items: start;">
        <div>
          <strong>${review.customerName}</strong>
          <div>${'⭐'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
        </div>
        <small>${formatDate(review.date)}</small>
      </div>
      <p style="margin-top: var(--spacing-md); margin-bottom: 0;">${review.text}</p>
    </div>
  `;
}

/**
 * Render form input
 */
function renderFormInput(name, label, type = 'text', value = '', options = []) {
  if (type === 'textarea') {
    return `
      <div class="form-group">
        <label for="${name}">${label}</label>
        <textarea id="${name}" name="${name}" placeholder="Enter ${label.toLowerCase()}">${value}</textarea>
      </div>
    `;
  }

  if (type === 'select') {
    return `
      <div class="form-group">
        <label for="${name}">${label}</label>
        <select id="${name}" name="${name}">
          <option value="">Select ${label.toLowerCase()}</option>
          ${options.map(opt => `<option value="${opt.value}" ${opt.value === value ? 'selected' : ''}>${opt.label}</option>`).join('')}
        </select>
      </div>
    `;
  }

  return `
    <div class="form-group">
      <label for="${name}">${label}</label>
      <input type="${type}" id="${name}" name="${name}" value="${value}" placeholder="Enter ${label.toLowerCase()}" />
    </div>
  `;
}

/**
 * Get form data from inputs
 */
function getFormData(formId) {
  const form = document.getElementById(formId);
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  return data;
}

/**
 * Attach common events
 */
function attachCommonEvents() {
  // Add any global event listeners here
}
