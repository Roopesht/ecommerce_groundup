/**
 * farmer-profile-management.js - Farmer profile screens
 */

/**
 * Render Farmer Dashboard
 */
function renderFarmerDashboard() {
  const farmer = window.appData.farmers[window.appData.appState.userId];
  const orders = Object.values(window.appData.orders).filter(o => o.farmerId === window.appData.appState.userId);
  const newOrders = orders.filter(o => o.status === 'new');

  return `
    <h1>My Dashboard</h1>

    <div class="grid grid-2">
      <div class="card">
        <h4>Profile</h4>
        <div style="font-size: 40px; text-align: center; margin: var(--spacing-lg) 0;">
          ${farmer.photoUrl}
        </div>
        <div style="text-align: center;">
          <h3>${farmer.name}</h3>
          <p>📍 ${farmer.location.city}, ${farmer.location.village}</p>
          <p>${renderRating(farmer.rating, farmer.reviewCount)}</p>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md); margin-top: var(--spacing-lg);">
          <button class="button-primary button-small" onclick="goTo('profile-creation')">Edit Profile</button>
          <button class="button-secondary button-small" onclick="goTo('public-profile', {farmerId: '${farmer.id}'})">View Public</button>
        </div>
      </div>

      <div class="card">
        <h4>Quick Stats</h4>
        <div class="summary-row">
          <span>Total Reviews</span>
          <strong>${farmer.reviewCount}</strong>
        </div>
        <div class="summary-row">
          <span>Avg Rating</span>
          <strong>${farmer.rating}</strong>
        </div>
        <div class="summary-row">
          <span>Active Listings</span>
          <strong>${farmer.activeListings}</strong>
        </div>
        <div class="summary-row">
          <span>Total Orders</span>
          <strong>${farmer.totalOrders}</strong>
        </div>
        <div class="summary-row">
          <span>New Orders</span>
          <strong style="color: var(--color-warning);">${newOrders.length}</strong>
        </div>
      </div>
    </div>

    <h2 style="margin-top: var(--spacing-2xl);">Recent Orders</h2>
    ${orders.slice(0, 5).map(order => `
      <div class="card">
        <div class="flex-between">
          <div>
            <strong>${order.orderNumber}</strong>
            <div style="font-size: 12px; color: var(--color-dark-gray);">
              ${window.appData.customers[order.customerId].name} • ${formatDate(order.placedAt)}
            </div>
          </div>
          <div>
            ${renderStatusBadge(order.status)}
            <div style="font-size: 14px; font-weight: 600; margin-top: var(--spacing-sm);">
              ${formatCurrency(order.totalAmount)}
            </div>
          </div>
        </div>
        <div style="margin-top: var(--spacing-md);">
          <button class="button-ghost" onclick="goTo('order-detail', {orderId: '${order.id}'})">View Order</button>
        </div>
      </div>
    `).join('')}

    <div class="screen-nav">
      <button class="button-primary" onclick="goTo('orders-dashboard')">View All Orders →</button>
    </div>
  `;
}

/**
 * Render Profile Creation/Editing
 */
function renderProfileCreation() {
  const farmer = window.appData.farmers[window.appData.appState.userId];

  return `
    <h1>Edit My Profile</h1>

    <form id="profileForm" class="card">
      <div class="form-grid">
        <div>
          <h3>Location</h3>
          ${renderFormInput('city', 'City', 'select', farmer.location.city, [
            { value: 'Bangalore', label: 'Bangalore' },
            { value: 'Cochin', label: 'Cochin' }
          ])}
          ${renderFormInput('village', 'Village/Area', 'text', farmer.location.village)}
        </div>

        <div>
          <h3>About You</h3>
          ${renderFormInput('farmingPractices', 'Farming Practices', 'textarea', farmer.farmingPractices)}
          <p class="form-help-text">Describe your organic methods and sustainable practices</p>
        </div>
      </div>

      <div class="divider"></div>

      <div class="form-grid">
        <div>
          ${renderFormInput('certifications', 'Certifications (Optional)', 'textarea', farmer.certifications || '')}
          <p class="form-help-text">e.g., Organic certified by [body], Biodynamic, etc.</p>
        </div>

        <div>
          ${renderFormInput('story', 'Your Story (Optional)', 'textarea', farmer.story || '')}
          <p class="form-help-text">Tell customers about yourself and your farm</p>
        </div>
      </div>

      <div class="divider"></div>

      <div>
        <h3>Profile Photo (Optional)</h3>
        <div style="border: 2px dashed var(--color-kraft-brown); border-radius: var(--radius-lg); padding: var(--spacing-lg); text-align: center; margin-bottom: var(--spacing-lg);">
          <div style="font-size: 48px; margin-bottom: var(--spacing-md);">📷</div>
          <input type="file" id="photoInput" accept="image/*" style="display: none;">
          <button type="button" class="button-secondary" onclick="document.getElementById('photoInput').click()">
            Choose Photo
          </button>
          <p class="form-help-text" style="margin-top: var(--spacing-md);">JPG, PNG • Max 5MB</p>
        </div>
      </div>

      <div class="flex" style="gap: var(--spacing-lg); justify-content: flex-end;">
        <button type="button" class="button-secondary" onclick="goTo('farmer-dashboard')">Cancel</button>
        <button type="button" class="button-primary" onclick="saveProfile()">Save Profile</button>
      </div>
    </form>
  `;
}

/**
 * Render Public Farmer Profile
 */
function renderPublicProfile(params = {}) {
  const farmerId = params.farmerId || window.appData.appState.userId;
  const farmer = window.appData.farmers[farmerId];
  const farmerProduce = Object.values(window.appData.produce).filter(p => p.farmerId === farmerId);
  const farmerReviews = window.appData.reviews.filter(r => r.farmerId === farmerId);

  return `
    <div style="display: flex; gap: var(--spacing-lg); align-items: start; margin-bottom: var(--spacing-2xl);">
      <div style="font-size: 80px;">${farmer.photoUrl}</div>
      <div>
        <h1 style="margin-bottom: var(--spacing-sm);">${farmer.name}</h1>
        <p>📍 ${farmer.location.city}, ${farmer.location.village}</p>
        <p>${renderRating(farmer.rating, farmer.reviewCount)}</p>
        <button class="button-primary" style="margin-top: var(--spacing-md);">Message Farmer</button>
      </div>
    </div>

    <div class="card card-beige">
      <h3>About This Farmer</h3>
      <p><strong>Farming Practices:</strong></p>
      <p>${farmer.farmingPractices}</p>
      ${farmer.story ? `<p><strong>Story:</strong></p><p>${farmer.story}</p>` : ''}
      ${farmer.certifications ? `<p><strong>Certifications:</strong></p><p>${farmer.certifications}</p>` : ''}
    </div>

    <h2>Current Listings</h2>
    <div class="grid grid-3">
      ${farmerProduce.map(p => renderProductCard(p)).join('')}
    </div>

    <h2 style="margin-top: var(--spacing-2xl);">Customer Reviews</h2>
    ${farmerReviews.length > 0 ? farmerReviews.map(r => renderReview(r)).join('') : '<p style="text-align: center; color: var(--color-dark-gray);">No reviews yet</p>'}

    <div class="screen-nav">
      <div class="screen-nav-back" onclick="window.history.back()">← Back</div>
    </div>
  `;
}

/**
 * Attach farmer dashboard events
 */
function attachFarmerDashboardEvents() {
  // Add any specific event listeners
}

/**
 * Attach profile creation events
 */
function attachProfileCreationEvents() {
  // Handle photo upload preview
  const photoInput = document.getElementById('photoInput');
  if (photoInput) {
    photoInput.addEventListener('change', function(e) {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
          showToast('Photo uploaded successfully');
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    });
  }
}

/**
 * Save farmer profile
 */
function saveProfile() {
  const formData = getFormData('profileForm');

  // Update farmer data
  const farmer = window.appData.farmers[window.appData.appState.userId];
  farmer.location.city = formData.city;
  farmer.location.village = formData.village;
  farmer.farmingPractices = formData.farmingPractices;
  farmer.certifications = formData.certifications;
  farmer.story = formData.story;

  showToast('Profile saved and is now visible to customers', 'success');
  setTimeout(() => {
    goTo('farmer-dashboard');
  }, 1500);
}
