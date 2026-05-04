/**
 * farmer-order-management.js - Farmer order management screens
 */

/**
 * Render Orders Dashboard
 */
function renderOrdersDashboard() {
  const farmerId = window.appData.appState.userId;
  const allOrders = Object.values(window.appData.orders).filter(o => o.farmerId === farmerId);
  const statuses = ['new', 'confirmed', 'preparing', 'ready_for_delivery', 'completed'];

  let filterHtml = '<div style="margin-bottom: var(--spacing-lg); display: flex; gap: var(--spacing-md); flex-wrap: wrap;">';
  filterHtml += '<span style="font-weight: 600; align-self: center;">Filter:</span>';
  filterHtml += statuses.map(status => `
    <button class="button-small button-secondary" onclick="filterOrders('${status}')">
      ${status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ')}
    </button>
  `).join('');
  filterHtml += '</div>';

  let ordersHtml = '<table class="table"><thead><tr><th>Order #</th><th>Customer</th><th>Date</th><th>Status</th><th>Items</th><th>Action</th></tr></thead><tbody>';

  allOrders.slice(0, 10).forEach(order => {
    const customer = window.appData.customers[order.customerId];
    const dateStr = new Date(order.placedAt).toLocaleDateString('en-IN');

    ordersHtml += `
      <tr>
        <td><strong>${order.orderNumber}</strong></td>
        <td>${customer.name}</td>
        <td>${dateStr}</td>
        <td>${renderStatusBadge(order.status)}</td>
        <td>${order.items.length} items</td>
        <td>
          <button class="button-small button-ghost" onclick="goTo('order-detail', {orderId: '${order.id}'})">
            View
          </button>
        </td>
      </tr>
    `;
  });

  ordersHtml += '</tbody></table>';

  return `
    <h1>My Orders (${allOrders.length} Total)</h1>

    ${filterHtml}

    ${ordersHtml}

    <div style="text-align: center; margin-top: var(--spacing-2xl); color: var(--color-dark-gray);">
      <p>Page 1 of ${Math.ceil(allOrders.length / 10)}</p>
    </div>
  `;
}

/**
 * Render Order Detail
 */
function renderOrderDetail(params = {}) {
  const orderId = params.orderId || 'ORD-000045';
  const order = Object.values(window.appData.orders).find(o => o.id === orderId || o.orderNumber === orderId);

  if (!order) {
    return '<h1>Order not found</h1>';
  }

  const customer = window.appData.customers[order.customerId];
  const totals = calculateOrderTotals(order.items);

  // Status flow for next allowed transitions
  const statusFlow = {
    'new': 'confirmed',
    'confirmed': 'preparing',
    'preparing': 'ready_for_delivery',
    'ready_for_delivery': 'completed',
  };

  const nextStatus = statusFlow[order.status];

  return `
    <div class="flex-between">
      <div>
        <h1>${order.orderNumber}</h1>
        <p style="color: var(--color-dark-gray);">Placed: ${formatDate(order.placedAt)}</p>
      </div>
      <div>
        ${renderStatusBadge(order.status)}
      </div>
    </div>

    <div class="grid grid-2" style="margin-top: var(--spacing-xl);">
      <div class="card">
        <h4>Customer</h4>
        <p><strong>${customer.name}</strong></p>
        <p style="font-size: 12px; color: var(--color-dark-gray); margin-bottom: var(--spacing-sm);">
          📱 <a href="tel:${customer.phone}">${customer.phone}</a>
        </p>
        <p style="font-size: 12px; color: var(--color-dark-gray);">
          📧 <a href="mailto:${customer.email}">${customer.email}</a>
        </p>
        <button class="button-primary" style="width: 100%; margin-top: var(--spacing-md);">
          Message Customer
        </button>
      </div>

      <div class="card">
        <h4>Delivery Details</h4>
        <p>${order.deliveryAddress}</p>
        <p style="margin-top: var(--spacing-md); font-size: 12px; color: var(--color-dark-gray);">
          Est. Delivery: <strong>${order.estimatedDelivery}</strong>
        </p>
      </div>
    </div>

    <h3 style="margin-top: var(--spacing-xl);">Order Timeline</h3>
    ${renderTimeline(order.status)}

    <h3 style="margin-top: var(--spacing-xl);">Items</h3>
    <div class="card">
      ${order.items.map(item => {
        const produce = window.appData.produce[item.produceId];
        return `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-md) 0; border-bottom: 1px solid var(--color-medium-gray);">
            <div>
              <div style="font-size: 24px; margin-right: var(--spacing-md); display: inline-block;">
                ${produce.emoji}
              </div>
              <div style="display: inline-block;">
                <strong>${produce.name}</strong>
                <div style="font-size: 12px; color: var(--color-dark-gray);">
                  ${item.quantity}${item.unit} × ${formatCurrency(item.unitPrice)}
                </div>
              </div>
            </div>
            <strong>${formatCurrency(item.unitPrice * item.quantity)}</strong>
          </div>
        `;
      }).join('')}

      <div style="padding: var(--spacing-md) 0; text-align: right;">
        <strong style="font-size: 16px;">Total: ${formatCurrency(order.totalAmount)}</strong>
      </div>
    </div>

    ${nextStatus ? `
      <div class="card card-light-sage" style="margin-top: var(--spacing-xl);">
        <h4>Next Action</h4>
        <p>Current Status: <strong>${order.status.replace(/_/g, ' ').toUpperCase()}</strong></p>
        <p style="color: var(--color-dark-gray); font-size: 14px; margin-bottom: var(--spacing-md);">
          Move to: <strong>${nextStatus.replace(/_/g, ' ').toUpperCase()}</strong>
        </p>
        <button class="button-primary button-full-width" onclick="updateOrderStatus('${orderId}', '${nextStatus}')">
          ${nextStatus === 'confirmed' ? 'Confirm Receipt & Start' : 'Update to'} ${nextStatus.replace(/_/g, ' ').toUpperCase()}
        </button>
      </div>
    ` : ''}

    <div class="screen-nav">
      <button class="button-secondary" onclick="goTo('orders-dashboard')">← Back to Orders</button>
    </div>
  `;
}

/**
 * Attach orders dashboard events
 */
function attachOrdersDashboardEvents() {
  // Event handlers for dashboard
}

/**
 * Attach order detail events
 */
function attachOrderDetailEvents() {
  // Event handlers for detail view
}

/**
 * Filter orders by status
 */
function filterOrders(status) {
  showToast(`Filtering by ${status}`);
  // In a real app, this would filter the displayed orders
}

/**
 * Update order status
 */
function updateOrderStatus(orderId, newStatus) {
  const order = Object.values(window.appData.orders).find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    order.statusUpdatedAt = new Date().toISOString();

    showToast(`Order updated to ${newStatus.replace(/_/g, ' ')}`, 'success');
    setTimeout(() => {
      goTo('order-detail', { orderId: orderId });
    }, 1500);
  }
}
