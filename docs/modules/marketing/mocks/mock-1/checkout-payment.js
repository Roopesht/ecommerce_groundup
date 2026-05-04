/**
 * checkout-payment.js - Checkout and payment screens
 */

/**
 * Render Checkout Form
 */
function renderCheckoutForm() {
  // Initialize cart with sample data if empty
  if (window.appData.cart.items.length === 0) {
    window.appData.cart.items = [
      { produceId: 'produce-1', farmerId: 'farmer-123', quantity: 2, unit: 'kg' },
      { produceId: 'produce-2', farmerId: 'farmer-123', quantity: 1, unit: 'kg' },
      { produceId: 'produce-3', farmerId: 'farmer-123', quantity: 1, unit: 'bunch' },
    ];
  }

  // Group items by farmer
  const itemsByFarmer = {};
  window.appData.cart.items.forEach(item => {
    if (!itemsByFarmer[item.farmerId]) {
      itemsByFarmer[item.farmerId] = [];
    }
    itemsByFarmer[item.farmerId].push(item);
  });

  // Calculate totals
  const subtotal = window.appData.cart.items.reduce((sum, item) => {
    const produce = window.appData.produce[item.produceId];
    return sum + (produce.price * item.quantity);
  }, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  let orderSummaryHtml = '';
  Object.entries(itemsByFarmer).forEach(([farmerId, items]) => {
    orderSummaryHtml += renderOrderSummary(items.map(item => ({
      produceId: item.produceId,
      quantity: item.quantity,
      unit: item.unit,
      unitPrice: window.appData.produce[item.produceId].price
    })), farmerId);
  });

  return `
    <h1>Complete Your Order</h1>

    <div class="grid grid-2" style="gap: var(--spacing-2xl);">
      <div>
        <h3>Delivery Address</h3>
        <form id="checkoutForm" class="card">
          ${renderFormInput('fullName', 'Full Name', 'text', 'Priya Sharma')}
          ${renderFormInput('street', 'Street Address', 'text', '123 Main Street')}

          <div class="form-grid">
            ${renderFormInput('city', 'City', 'select', 'Bangalore', [
              { value: 'Bangalore', label: 'Bangalore' },
              { value: 'Cochin', label: 'Cochin' }
            ])}
            ${renderFormInput('postalCode', 'Postal Code', 'text', '560001')}
          </div>

          ${renderFormInput('phone', 'Phone', 'tel', '+91-9876543210')}
          ${renderFormInput('email', 'Email', 'email', 'priya@example.com')}

          <div class="form-checkbox">
            <input type="checkbox" id="saveAddress" name="saveAddress">
            <label for="saveAddress" style="margin: 0; cursor: pointer;">Save for future orders</label>
          </div>
        </form>
      </div>

      <div>
        <h3>Your Order</h3>
        ${orderSummaryHtml}

        <div class="card">
          <div class="summary-row">
            <span>Subtotal:</span>
            <strong>${formatCurrency(subtotal)}</strong>
          </div>
          <div class="summary-row">
            <span>Taxes (GST 5%):</span>
            <strong>${formatCurrency(tax)}</strong>
          </div>
          <div class="summary-row">
            <span>Delivery Fee:</span>
            <strong>₹0</strong>
          </div>
          <div class="summary-row">
            <span>TOTAL:</span>
            <strong style="font-size: 16px; color: var(--color-sage);">${formatCurrency(total)}</strong>
          </div>
          <button class="button-ghost" onclick="goTo('checkout-form')">Modify Cart</button>
        </div>

        <h3 style="margin-top: var(--spacing-lg);">Payment Method</h3>
        <div class="card">
          <div style="margin-bottom: var(--spacing-md);">
            <input type="radio" id="card" name="paymentMethod" value="card" checked>
            <label for="card" style="cursor: pointer; display: inline;">Credit/Debit Card (Recommended)</label>
          </div>
          <div>
            <input type="radio" id="saved" name="paymentMethod" value="saved">
            <label for="saved" style="cursor: pointer; display: inline;">Saved Payment Method</label>
          </div>

          <p style="margin-top: var(--spacing-lg); font-size: 12px; color: var(--color-dark-gray);">
            🔒 Secured by Razorpay • Industry-standard encryption
          </p>

          <div style="margin-top: var(--spacing-lg); display: flex; gap: var(--spacing-md);">
            <button class="button-primary" onclick="processPayment()">Proceed to Payment</button>
            <button class="button-secondary" onclick="goTo('checkout-form')">Back to Cart</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render Payment Confirmation
 */
function renderPaymentConfirmation() {
  const orderNumbers = ['ORD-000045', 'ORD-000046'];
  const total = 199.50;

  return `
    <div style="text-align: center; padding: var(--spacing-3xl) var(--spacing-2xl);">
      <div style="font-size: 64px; margin-bottom: var(--spacing-lg);">✓</div>
      <h1 style="color: var(--color-success);">Order Placed Successfully!</h1>
      <p style="font-size: 16px; color: var(--color-dark-gray); margin-bottom: var(--spacing-xl);">
        Thank you for your order, Priya!<br>
        Order confirmation email has been sent to priya@example.com
      </p>

      <div class="card card-beige" style="margin: var(--spacing-2xl) auto; max-width: 500px;">
        <h3>Order Summary</h3>

        <div class="summary-row">
          <span>Order Number(s):</span>
          <strong>${orderNumbers.join(', ')}</strong>
        </div>
        <div class="summary-row">
          <span>Total Amount Paid:</span>
          <strong>${formatCurrency(total)}</strong>
        </div>
        <div class="summary-row">
          <span>Order Date:</span>
          <strong>2026-05-04 at 10:30 AM</strong>
        </div>

        <h4 style="margin-top: var(--spacing-lg);">Items ordered from:</h4>
        <div style="margin: var(--spacing-md) 0;">
          <p>✓ <strong>Ramesh Kumar (Farmer)</strong></p>
          <p style="font-size: 12px; color: var(--color-dark-gray);">
            3 items • Est. Delivery: 2026-05-06 to 07
          </p>
        </div>
      </div>

      <div class="card" style="margin: var(--spacing-2xl) auto; max-width: 500px;">
        <h3>What's Next?</h3>
        <div style="text-align: left;">
          <p>🌱 Farmers will confirm receipt within 2 hours</p>
          <p>📧 Check your email for order details</p>
          <p>📦 Track order status in 'My Orders'</p>
          <p>💬 Questions? Message farmers directly</p>
          <div style="margin-top: var(--spacing-md); padding: var(--spacing-md); background-color: var(--color-light-gray); border-radius: var(--radius-md);">
            <button class="button-ghost" style="width: 100%;">Message: Ramesh Kumar</button>
          </div>
        </div>
      </div>

      <div style="display: flex; gap: var(--spacing-md); justify-content: center; margin-top: var(--spacing-2xl);">
        <button class="button-primary" onclick="goTo('farmer-dashboard')">View My Orders</button>
        <button class="button-secondary" onclick="goTo('checkout-form')">Continue Shopping</button>
      </div>
    </div>
  `;
}

/**
 * Render Payment Failure
 */
function renderPaymentFailure() {
  return `
    <div style="text-align: center; padding: var(--spacing-3xl) var(--spacing-2xl);">
      <div style="font-size: 64px; margin-bottom: var(--spacing-lg); color: var(--color-error);">✗</div>
      <h1 style="color: var(--color-error);">Payment Failed</h1>
      <p style="font-size: 16px; color: var(--color-dark-gray); margin-bottom: var(--spacing-xl);">
        Your payment could not be processed
      </p>

      <div class="card card-beige" style="margin: var(--spacing-2xl) auto; max-width: 500px; text-align: left;">
        <h3>Error Details</h3>
        <p><strong>Reason:</strong> Card Declined</p>
        <p style="font-size: 12px; color: var(--color-dark-gray);">
          Please check with your card issuer or try a different payment method.
        </p>
        <p style="font-size: 12px; color: var(--color-dark-gray); margin-top: var(--spacing-md);">
          Error Code: RZP-402 (Card Declined)
        </p>
      </div>

      <div class="card" style="margin: var(--spacing-2xl) auto; max-width: 500px;">
        <h3>What You Can Do</h3>
        <div style="text-align: left;">
          <p>▪ Try a different payment method</p>
          <p>▪ Check your card details are correct</p>
          <p>▪ Contact your bank for more information</p>
          <p>▪ Use a different card if available</p>
        </div>
        <div style="margin-top: var(--spacing-lg); padding: var(--spacing-md); background-color: var(--color-light-gray); border-radius: var(--radius-md);">
          <p style="font-size: 12px; margin: 0;">
            💡 Your cart items are still saved!<br>
            You can retry whenever you're ready.
          </p>
        </div>
      </div>

      <div style="display: flex; gap: var(--spacing-md); justify-content: center; flex-wrap: wrap; margin-top: var(--spacing-2xl);">
        <button class="button-primary" onclick="goTo('checkout-form')">Retry Payment</button>
        <button class="button-secondary" onclick="goTo('checkout-form')">Edit Cart</button>
        <button class="button-ghost" onclick="goTo('farmer-dashboard')">Contact Support</button>
      </div>
    </div>
  `;
}

/**
 * Attach checkout form events
 */
function attachCheckoutFormEvents() {
  // Form validation events
  const form = document.getElementById('checkoutForm');
  if (form) {
    form.addEventListener('change', function() {
      // Real-time validation could happen here
    });
  }
}

/**
 * Process payment
 */
function processPayment() {
  const formData = getFormData('checkoutForm');

  // Validate form
  if (!formData.fullName || !formData.street || !formData.city || !formData.postalCode) {
    showToast('Please fill in all required fields', 'error');
    return;
  }

  if (!formData.phone || !formData.email) {
    showToast('Please enter valid phone and email', 'error');
    return;
  }

  // Validate postal code
  if (!/^\d{6}$/.test(formData.postalCode)) {
    showToast('Postal code must be 6 digits', 'error');
    return;
  }

  // Simulate payment processing
  showToast('Processing payment...', 'info');

  setTimeout(() => {
    // Randomly succeed or fail for demo purposes
    const success = Math.random() > 0.3; // 70% success rate

    if (success) {
      showToast('Payment successful!', 'success');
      setTimeout(() => {
        goTo('payment-confirmation');
      }, 1000);
    } else {
      goTo('payment-failure');
    }
  }, 2000);
}
