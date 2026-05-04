# Detailed Specification: Checkout and Payment

## 1. Screens and UI Components

### Screen: Checkout Form
**Path:** `/checkout`

**Layout (Single Page, Multi-Step or All-at-Once):**
- Header: "Complete Your Order"
- Step indicator (optional): Step 1/2 or all visible
- **Section 1: Delivery Address**
  - "Delivery Address" heading
  - Form fields:
    - Full Name (text input, pre-filled if from profile)
    - Street Address (text input)
    - City (dropdown: Bangalore, Cochin)
    - Postal Code (text input, max 6 digits)
    - Phone Number (tel input, pre-filled if logged in)
    - Email (email input, pre-filled)
  - "Save for future orders" checkbox (optional)
  - Buttons: "Edit" or inline edit (no separate button needed)

- **Section 2: Order Summary**
  - Heading: "Your Order"
  - Grouped by farmer (collapsible cards):
    - Farmer card:
      - Farmer name (clickable to view profile)
      - Estimated delivery window (based on lead time at checkout)
      - Items in order:
        - Produce photo (thumbnail)
        - Produce name
        - Quantity × Unit price = Line total
      - Farmer subtotal
  - Summary row:
    - Subtotal: ₹{subtotal}
    - Taxes/GST: ₹{tax} (or "Calculated at payment")
    - Delivery Fees: ₹{fee} or "Free"
    - **Total: ₹{total}**
  - "Modify Cart" link to go back to cart

- **Section 3: Payment**
  - Heading: "Payment Method"
  - Radio options:
    - ○ Credit/Debit Card
    - ○ Saved Payment Method (if customer has saved cards)
    - ○ UPI (future, optional)
  - Note: "Your payment will be processed securely through Razorpay"
  - Button: "Proceed to Payment" (primary)
  - Button: "Back to Cart" (secondary)

- **Footer:**
  - Trust badges/security icons
  - "We use industry-standard encryption to protect your data"

### Screen: Payment Gateway (Razorpay)
**Path:** Redirects to external payment processor URL

**Note:** Razorpay handles UI for payment entry. Our system receives callback.

### Screen: Payment Confirmation (Post-Payment)
**Path:** `/checkout/confirmation` or `/orders/{order-id}/confirmation`

**Layout:**
- Heading: "✓ Order Placed Successfully!"
- Confirmation message:
  - "Thank you for your order!"
  - "Order confirmation email has been sent to {email}"
- Order summary card:
  - Order number(s): ORD-000123, ORD-000124 (if multiple farmers)
  - Total amount paid: ₹{total}
  - Order date/time
  - Message: "Check your email for order details and track status in 'My Orders'"
- What's next:
  - "Farmers will confirm receipt within the next 2 hours"
  - "You can track your orders in My Orders"
  - "Questions? Message your farmers directly"
- Buttons:
  - "View My Orders" (primary)
  - "Continue Shopping" (secondary)
  - "Download Invoice" (if applicable)

### Screen: Payment Failure
**Path:** `/checkout/failed`

**Layout:**
- Heading: "✗ Payment Failed"
- Error message: "{error description from payment processor}" or "Your payment could not be processed"
- Reason (if available): "Card declined", "Insufficient funds", etc.
- Suggested actions:
  - "Try a different payment method"
  - "Check your card details and try again"
  - "Contact your bank if the problem persists"
- Buttons:
  - "Retry Payment" (primary, returns to checkout with cart intact)
  - "Edit Cart" (secondary)
  - "Contact Support" (tertiary)

---

## 2. Business Rules

1. **Cart Persistence**: If customer abandons checkout, cart must persist for at least 7 days (or until customer closes browser session).

2. **One Order Per Farmer**: If customer has items from multiple farmers in cart, system must create one order per farmer (not one combined order). All orders share same customer ID and placed_at timestamp.

3. **Delivery Address Required**: Customer must enter valid delivery address before payment. No pre-filled default.

4. **Order Total Calculation**:
   - Subtotal = sum of (quantity × unit_price) for all items
   - Tax = subtotal × GST_RATE (to be defined by product team)
   - Delivery Fee = ₹0 (or fixed amount to be defined; not calculated per farmer in Phase 1)
   - Total = Subtotal + Tax + Delivery Fee

5. **Payment Processing**:
   - Payment is authorized before orders are created
   - If payment succeeds, orders are created and cart is cleared
   - If payment fails, cart remains intact and customer can retry

6. **Multiple Order Creation**: When payment succeeds, system must atomically create all orders (one per farmer) or fail all. No partial order creation.

7. **Inventory Check**: Availability is not re-checked at checkout. If stock changed between adding to cart and checkout, system will create order anyway. Farmer coordinates with customer if unable to fulfill.

8. **Email Confirmation**: Customer and each farmer must receive order confirmation email within 5 minutes of payment success.

9. **Order Number Generation**: Order numbers must be sequential and unique (e.g., ORD-000001, ORD-000002). Format is human-readable.

10. **Idempotency**: If payment callback is received twice (duplicate webhook), system must handle gracefully and create orders only once.

11. **Taxes**: GST rate is applied to subtotal; exact rate TBD (currently placeholder).

12. **No Discounts/Coupons**: Phase 1 has no discount or coupon codes.

13. **Payment Method Saving**: Customers can optionally save payment method (if payment processor supports tokenization). This is optional; not required for Phase 1.

14. **Currency**: All prices in INR (₹). No currency conversion.

15. **Delivery Windows**: Estimated delivery window is calculated at checkout based on produce lead times. If customer orders from multiple farmers with different lead times, show window for each farmer separately.

---

## 3. Edge Cases

1. **Item Stock Changes Between Cart and Checkout**: Customer adds 5kg tomatoes to cart, but farmer reduces listing to 2kg before checkout. System creates order for full 5kg anyway. Farmer must contact customer if unable to fulfill.

2. **Farmer Deletes Produce Between Cart and Checkout**: Order is still created with reference to produce_id (not produce_name). Order shows "(Delisted)" or similar. Farmer can still fulfill if they choose.

3. **Multiple Cart Items from Same Farmer**: If customer adds 2kg tomatoes and 1kg spinach (both from Farmer A), system creates one order with both items.

4. **Empty Cart at Checkout**: Customer proceeds to checkout but cart is empty (cleared by system or another session). Show error: "Your cart is empty. Add items to proceed."

5. **Inventory Exhausted During Payment**: While payment is processing, farmer could receive another order that exhausts inventory. System checks inventory BEFORE payment authorization, not after. If inventory drops during payment processing (extreme edge case), farmer resolves by messaging customer.

6. **Duplicate Webhook Callbacks**: Payment processor may send confirmation webhook twice (retry logic). System must idempotently handle: check if order already exists with this payment_id, if so, don't create duplicate orders.

7. **Customer Session Timeout**: If customer session expires during checkout, they lose unsaved address. Cart is retained. On re-login, customer must enter address again.

8. **Extremely Large Orders**: If customer orders 1000+ items, order total calculation and email generation should still complete. Pagination/summary required for clarity.

9. **Special Characters in Address**: Customer enters address with Tamil/Kannada script. System must store and display correctly. No sanitization that removes valid characters.

10. **Payment Processing Delay**: If payment authorization takes >10 seconds, system shows spinner and waits. User should not close browser during this time. If they do, webhook callback will still create orders on success.

11. **No Delivery Address**: If customer submits checkout without entering delivery address, validation error is shown: "Delivery address is required."

12. **Postal Code Mismatch**: If customer enters postal code that doesn't match city, system should show warning but allow submission (user may know better).

13. **Multiple Orders Same Farmer**: If customer checks out twice and both orders are for same farmer, each order gets unique order_number. No deduplication.

14. **Tax Calculation Precision**: Tax is calculated as decimal to 2 places (e.g., ₹1234.57). No rounding issues in total.

15. **Payment Processor Down**: If payment processor is unreachable, customer sees error: "Payment service temporarily unavailable. Please try again in a few minutes." Cart is retained.

---

## 4. API Endpoints

### POST /api/v1/checkout/validate
**Description:** Validate cart and delivery address before payment  
**Auth:** Required  
**Request Body:**
```json
{
  "cart_id": "cart-123",
  "delivery_address": {
    "full_name": "Priya Sharma",
    "street": "123 Main St",
    "city": "Bangalore",
    "postal_code": "560001",
    "phone": "+91-9876543210",
    "email": "priya@example.com"
  }
}
```
**Response:** 200 OK
```json
{
  "valid": true,
  "subtotal": 500,
  "tax": 45,
  "delivery_fee": 0,
  "total": 545,
  "items_by_farmer": [
    {
      "farmer_id": "farmer-123",
      "farmer_name": "Ramesh Kumar",
      "items_count": 2,
      "estimated_delivery": "2026-05-06 to 2026-05-07"
    }
  ]
}
```
**Error Responses:**
- 400: Validation error (invalid address, empty cart, etc.)
- 401: Unauthorized (user not logged in)

### POST /api/v1/checkout/initiate-payment
**Description:** Create payment order and return payment URL  
**Auth:** Required  
**Request Body:**
```json
{
  "cart_id": "cart-123",
  "delivery_address": {
    "full_name": "Priya Sharma",
    "street": "123 Main St",
    "city": "Bangalore",
    "postal_code": "560001",
    "phone": "+91-9876543210",
    "email": "priya@example.com"
  }
}
```
**Response:** 200 OK
```json
{
  "payment_order_id": "order_IjxEAZDMHU92A4",
  "razorpay_key": "rzp_live_xxxxx",
  "amount": 54500,
  "currency": "INR",
  "checkout_url": "https://checkout.razorpay.com/..."
}
```
**Error Responses:**
- 400: Cart validation failed
- 401: Unauthorized
- 500: Payment processor error

### POST /api/v1/checkout/confirm-payment
**Description:** Confirm payment and create orders (called from frontend after payment success)  
**Auth:** Required  
**Request Body:**
```json
{
  "payment_order_id": "order_IjxEAZDMHU92A4",
  "razorpay_payment_id": "pay_Hs6YvNaAg0gUzJ",
  "razorpay_signature": "9ef4dffbfd84f1318f6739a3ce19f9d85851857ae648f114332d8401e0949a5d"
}
```
**Response:** 200 OK
```json
{
  "success": true,
  "order_ids": ["order-456", "order-457"],
  "order_numbers": ["ORD-000456", "ORD-000457"],
  "total_amount": 545,
  "confirmation_sent": true
}
```
**Error Responses:**
- 400: Invalid signature or payment verification failed
- 401: Unauthorized
- 422: Order creation failed (but payment succeeded — requires manual investigation)

### POST /api/webhooks/razorpay/payment-success
**Description:** Webhook endpoint for payment processor callbacks  
**Auth:** Signature verification (Razorpay secret)  
**Request Body:** Razorpay webhook payload  
**Response:** 200 OK (empty)  
**Action:** Create orders if payment_id not already processed

---

## 5. Database Tables

### orders
(See farmer-order-management detailed.md for structure, with these additions:)

| Column | Type | Nullable | Constraints |
|--------|------|----------|------------|
| payment_id | VARCHAR(50) | YES | FK/Reference to payment record |
| delivery_address | TEXT | NO | Full address as provided by customer |

### payments
| Column | Type | Nullable | Unique | Constraints |
|--------|------|----------|--------|------------|
| id | UUID | NO | YES | Primary key |
| customer_id | UUID | NO | NO | FK → users.id |
| payment_processor_id | VARCHAR(100) | NO | YES | Razorpay order/payment ID |
| status | ENUM | NO | NO | 'initiated', 'processing', 'completed', 'failed', 'refunded' |
| amount | DECIMAL(10,2) | NO | NO | Total amount in INR |
| currency | VARCHAR(3) | NO | NO | 'INR' |
| razorpay_signature | VARCHAR(255) | YES | NO | For webhook verification |
| initiated_at | TIMESTAMP | NO | NO | |
| completed_at | TIMESTAMP | YES | NO | |
| error_message | TEXT | YES | NO | If payment failed |
| created_at | TIMESTAMP | NO | NO | |
| updated_at | TIMESTAMP | NO | NO | |

**Indexes:**
- PRIMARY KEY on (id)
- UNIQUE KEY on (payment_processor_id)
- INDEX on (customer_id, completed_at) for customer payment history
- INDEX on (status) for payment reconciliation

### carts
(Existing cart table should have these fields if not already present)

| Column | Type | Nullable | Constraints |
|--------|------|----------|------------|
| id | UUID | NO | Primary key |
| customer_id | UUID | NO | FK → users.id |
| items | JSON | NO | Array of {produce_id, quantity, farmer_id} |
| subtotal | DECIMAL(10,2) | YES | Cached for performance |
| created_at | TIMESTAMP | NO | |
| updated_at | TIMESTAMP | NO | |
| expires_at | TIMESTAMP | NO | 7 days from creation |

### delivery_addresses
| Column | Type | Nullable | Constraints |
|--------|------|----------|------------|
| id | UUID | NO | Primary key |
| customer_id | UUID | NO | FK → users.id |
| full_name | VARCHAR(255) | NO | |
| street | VARCHAR(255) | NO | |
| city | ENUM | NO | 'Bangalore', 'Cochin' |
| postal_code | VARCHAR(10) | NO | |
| phone | VARCHAR(20) | NO | |
| email | VARCHAR(255) | NO | |
| is_default | BOOLEAN | NO | DEFAULT FALSE |
| created_at | TIMESTAMP | NO | |

**Indexes:**
- INDEX on (customer_id) for address history

---

## 6. Frontend Components

### CheckoutFormComponent
**Props:**
```typescript
interface CheckoutFormProps {
  cart: CartItem[];
  customer: User;
  onPaymentSuccess: (orderIds: string[]) => void;
  onPaymentFailure: (error: string) => void;
}
```
**State:**
- formData: { fullName, street, city, postalCode, phone, email }
- validationErrors: Record<string, string>
- orderSummary: { subtotal, tax, total, itemsByFarmer }
- loading: boolean
- currentStep: 'address' | 'summary' | 'payment'

**Methods:**
- handleAddressChange(field: string, value: string)
- handleCityChange(city: string)
- validateAddress()
- validatePhoneEmail()
- handleProceedToPayment()
- handleBackToCart()

### OrderSummaryComponent
**Props:**
```typescript
interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
}
```
**Renders:**
- Items grouped by farmer
- Farmer name and estimated delivery window
- Line items with photos
- Subtotal, tax, delivery fee, total

### DeliveryAddressFormComponent
**Props:**
```typescript
interface DeliveryAddressFormProps {
  initialData?: DeliveryAddress;
  onSubmit: (address: DeliveryAddress) => void;
  onCancel: () => void;
  loading: boolean;
}
```
**State:**
- formData: DeliveryAddress
- validationErrors: Record<string, string>

**Methods:**
- handleChange(field: string, value: string)
- handleSubmit()
- validateForm()

### PaymentInitiatorComponent
**Props:**
```typescript
interface PaymentInitiatorProps {
  amount: number;
  customerId: string;
  onPaymentSuccess: (paymentId: string) => void;
  onPaymentFailure: (error: string) => void;
}
```
**Methods:**
- initializeRazorpay()
- handlePaymentResponse(response: RazorpayResponse)
- verifySignature(signature: string)

### ConfirmationScreenComponent
**Props:**
```typescript
interface ConfirmationScreenProps {
  orderNumbers: string[];
  totalAmount: number;
  customerEmail: string;
  itemsByFarmer: FarmerOrderSummary[];
}
```
**Renders:**
- Success message
- Order numbers and total
- What's next instructions
- Navigation buttons

---

## 7. Validation Rules

### Delivery Address
- **Full Name**:
  - Required, min 2 chars, max 100 chars
  - Alphanumeric and spaces only
  - Error: "Please enter a valid full name"

- **Street Address**:
  - Required, max 255 chars
  - Alphanumeric, spaces, numbers, common punctuation
  - Error: "Please enter a valid street address"

- **City**:
  - Required, must be one of: Bangalore, Cochin
  - Error: "Please select a valid city"

- **Postal Code**:
  - Required for Bangalore/Cochin
  - 6 digits exactly
  - Error: "Postal code must be 6 digits"

- **Phone**:
  - Required, must be valid Indian phone format
  - E.164 format: +91-9876543210 or 9876543210
  - Error: "Please enter a valid 10-digit phone number"

- **Email**:
  - Required, valid email format
  - Error: "Please enter a valid email address"

### Cart Validation
- **Not Empty**: At least one item in cart
  - Error: "Your cart is empty. Add items to proceed."

- **All Items in Stock**: Each item quantity ≤ available quantity
  - Warning (non-blocking): "Item {name} quantity reduced due to limited stock"
  - Allow customer to proceed or modify cart

- **Prices Match**: Unit prices in cart match current listing prices
  - Warning (non-blocking): "Price of {item} changed. Current: ₹{new_price}"
  - Show old vs new price

---

## 8. Error States and Handling

### Address Validation Errors
**Display:** Inline error messages under each field
```
Postal Code: [input] ⚠️ Must be 6 digits
Phone: [input] ⚠️ Enter a valid 10-digit number
```

### Payment Failures (from Razorpay)
**Display:** Error page with specific message
- "Your card was declined"
- "Insufficient funds"
- "Transaction timeout"
- Generic fallback: "Payment could not be processed"

**Action:**
- Offer retry
- Link to support
- Maintain cart for re-attempt

### Network Errors
**During Address Validation:**
- Error: "Failed to validate address. Please check your connection."
- Retry button

**During Payment:**
- Show timeout message if payment takes >30 seconds
- "Your payment is processing. Do not close this window."
- Option to check status later (if payment succeeded in background)

### Webhook Failure
**Scenario:** Payment succeeded in processor but webhook never arrives
**Mitigation:**
- Implement polling fallback (check payment status every 5 seconds for 2 minutes)
- If still not confirmed, show message: "Payment received but order status pending. Check email for confirmation."
- Customer can manually retry with same payment_id (idempotent)

### Order Creation Failure
**Scenario:** Payment succeeded but order creation failed (database error)
**Display:** 
- Error: "Payment successful but order creation failed. Our team will investigate."
- Show order confirmation screen with note: "Status may take a few minutes to update"
- Email customer immediately with payment confirmation
- Manual reconciliation required (flag in admin dashboard)

### Duplicate Payment Detection
**Scenario:** User clicks "Confirm Payment" button twice
**Handling:**
- Button disabled during payment processing
- Idempotency key in request prevents duplicate order creation
- Second click returns cached response from first click

---

## 9. Payment Processing Flow (Detailed)

### Happy Path:
1. Customer fills in address and reviews order
2. Frontend calls `POST /checkout/initiate-payment`
3. Backend creates payment record, calls Razorpay API, returns payment URL
4. Frontend redirects to Razorpay checkout page
5. Customer enters payment details on Razorpay (hosted page)
6. Razorpay processes payment, returns result to frontend
7. Frontend calls `POST /checkout/confirm-payment` with payment ID and signature
8. Backend verifies signature with Razorpay secret
9. Backend creates orders (one per farmer) atomically
10. Backend clears cart
11. Backend sends confirmation emails to customer and farmers
12. Frontend shows confirmation screen
13. Razorpay also sends webhook callback to `POST /webhooks/razorpay/payment-success` (async)

### Failure Cases:
- **Payment declined at Razorpay**: Razorpay redirects with error code; frontend shows error screen; cart retained
- **Webhook arrives before frontend confirmation**: Backend checks if orders already exist; returns success if so
- **Frontend loses connection during payment**: Payment still processes at Razorpay; webhook creates orders; customer checks email or "My Orders" to see confirmation

---

## 10. Additional Considerations

### PCI DSS Compliance
- Never handle raw credit card data in our backend
- Always use Razorpay hosted page or tokenized payments
- Use HTTPS everywhere

### Fraud Prevention
- Validate postal code matches delivery city
- Log all transactions for audit
- Monitor for unusual patterns (future: implement fraud detection)

### Email Templates
- Order confirmation email includes:
  - Order number(s)
  - Items list
  - Total amount
  - Delivery address
  - Farmer contact info
  - Link to track order

### Invoice Generation
- Phase 1: No formal invoice feature
- Future: Generate PDF invoice after delivery

### Refund Policy
- Not handled in Phase 1
- If customer requests refund, manual processing required

### Delivery Fee Structure
- Phase 1: Fixed ₹0 or fixed amount (TBD)
- Future: Implement distance-based or farmer-based delivery fees

### Saved Addresses
- Allow customers to save delivery address for future orders
- Show list of saved addresses on checkout
- Implement if time allows; optional for Phase 1

