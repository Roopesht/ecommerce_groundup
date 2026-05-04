# Content Definition: Marketing Module

**Status:** COMPLETE  
**Module:** Marketing (Core Marketplace Platform)  
**Date:** 2026-05-04  
**Tone:** Transparent, authentic, human, empowering. Speak directly to both farmers and customers without corporate jargon. Emphasize direct relationships and simplicity.

---

## 1. Page & Screen Copy

### Authentication & Onboarding

#### Sign-Up Page (Farmer)
**Headline:** Join as an Organic Farmer  
**Subheading:** Sell directly to conscious consumers. Keep 100% of your margin.  
**Body Text:** Create your farmer account in minutes. List your produce, connect with customers who value organic farming, and build your reputation.  

**Role Selection:**
- Button 1: "I'm a Farmer" 
- Button 2: "I'm a Customer"

---

#### Sign-Up Page (Customer)
**Headline:** Find Organic Produce from Real Farmers  
**Subheading:** Know exactly where your food comes from.  
**Body Text:** Browse farmer profiles, ask questions about farming methods, and purchase directly from the source. Support farmers. Eat better.

---

### Farmer Dashboard

#### Farmer Home / Dashboard
**Headline:** Welcome, [Farmer Name]  
**Subheading:** Your Farm Profile & Sales  

**Sections:**
- **Quick Stats Card:**
  - Label: "Total Orders This Month"
  - Label: "Average Rating"
  - Label: "Active Listings"

- **Recent Orders Card:**
  - Headline: "New Orders"
  - Subheading: "Latest customer orders waiting for confirmation"
  - Empty state: "No orders yet. Keep your listings fresh to attract customers."

- **Messages Card:**
  - Headline: "Customer Questions"
  - Subheading: "Respond quickly to build trust"
  - Empty state: "No messages. Check back when customers reach out."

---

#### Farmer Profile Page (Farmer View)
**Headline:** Your Farm Profile  
**Subheading:** This is what customers see when they visit your page.

**Section: Profile Photo**
- Label: "Profile Photo"
- Placeholder: "Upload a photo of you or your farm"
- Help Text: "Customers trust a face. A profile photo increases your credibility."

**Section: About Your Farm**
- Label: "Farm Location"
- Placeholder: "e.g., Whitefield, Bangalore"
- Label: "Tell Your Story"
- Placeholder: "What makes your farm special? Describe your farming practices, how long you've been organic, your philosophy..."
- Help Text: "Be genuine. Share your story in your own words."

**Section: Certifications & Credentials**
- Label: "Do you have organic certification?"
- Options: "Yes, I have certification" | "No, but I practice organic methods" | "Prefer not to say"
- If Yes: "Upload certification document (optional)"

---

#### Produce Listing Form (Create/Edit)
**Headline:** List New Produce  
**Subheading:** Help customers find what you're selling.

**Form Fields:**

| Label | Placeholder | Help Text |
|-------|-------------|-----------|
| Produce Type | "e.g., Tomatoes, Spinach, Carrots" | Required field |
| Quantity Available | "e.g., 50 kg" | How much do you have in stock? |
| Harvest Date | [Date picker] | When was this produce harvested? |
| Price per Unit | "e.g., ₹80/kg" | Set your price. Customers expect premium organic. |
| Production Method | "e.g., No pesticides, Hand-picked, Seasonal, Biodynamic..." | Tell customers how you grow this |
| Lead Time | [Dropdown: "Ready now", "1-2 days", "3-5 days", "1 week"] | How long after order until ready for delivery? |
| Availability Status | [Radio: "In Stock", "Limited", "Out of Stock"] | Is this available? You can temporarily pause. |
| Photos | [Upload area, up to 5 photos] | Photos are crucial. Show the actual produce. |

---

#### Manage Orders Page (Farmer)
**Headline:** Your Orders  
**Subheading:** New orders appear here. Confirm and update status as you prepare.

**Order Card (for each order):**
```
Customer Name: [Name]
Order Date: [Date]
Produce: [Item] × [Quantity]
Delivery Location: [Address]
Status: [Confirmed | Preparing | Ready for Delivery]
Customer Contact: [Phone/Email]

[Button: "View Details"]
[Button: "Message Customer"]
```

**Empty State (No orders yet):**
- Headline: "No orders yet"
- Message: "Keep your listings fresh and respond to customer messages. Orders will appear here."
- CTA: "Go to My Listings"

---

#### Order Details Page (Farmer)
**Headline:** Order #[Order ID]  
**Subheading:** [Date] from [Customer Name]

**Order Information:**
- Label: "Customer Name" | Value: [Name]
- Label: "Customer Contact" | Value: [Phone/Email]
- Label: "Delivery Location" | Value: [Full Address]
- Label: "Produce Ordered" | Value: [Item] × [Quantity]
- Label: "Total Price" | Value: ₹[Amount]

**Status Timeline:**
- ☑ Confirmed
- ☐ Preparing
- ☐ Ready for Delivery
- ☐ Completed

**Next Step Prompt:**
- If status is "Confirmed": "Confirm you've received this order and are ready to prepare it."
- If status is "Preparing": "Let the customer know when it's ready. Update status to 'Ready for Delivery.'"
- If status is "Ready": "Coordinate delivery with the customer. Use the contact method above."

**Action Buttons:**
- [Button: "Update Status"]
- [Button: "Message Customer"]
- [Button: "Back to Orders"]

---

#### Messages / Inbox (Farmer)
**Headline:** Your Messages  
**Subheading:** Respond quickly to customer questions. This builds trust.

**Conversation List:**
```
Customer Name: [Name]
Last Message Preview: "[Customer's last message...]"
Timestamp: [e.g., "2 hours ago"]
Unread Badge: [If unread]

[Click to view conversation]
```

**Empty State:**
- Headline: "No messages yet"
- Message: "When customers ask questions about your produce or farm, they'll appear here."

---

#### Message Thread (Farmer)
**Headline:** Conversation with [Customer Name]  
**Subheading:** About: [Product name, if applicable]

**Message Format (Farmer's messages):**
```
[Your Name, Farmer]
[Message text]
[Timestamp]
```

**Message Format (Customer's messages):**
```
[Customer Name]
[Message text]
[Timestamp]
```

**Message Input:**
- Placeholder: "Type your response... Be specific about production methods, availability, lead time..."
- Button: "Send Message"

---

#### Farmer Reviews & Reputation (Farmer View)
**Headline:** Your Reputation  
**Subheading:** What customers are saying about your farm.

**Aggregate Stats Card:**
- Label: "Your Rating" | Value: ★★★★★ (4.8 out of 5)
- Label: "Total Reviews" | Value: [Number]
- Label: "Most Reviewed For" | Value: [e.g., "Tomatoes, Spinach"]

**Reviews List:**
```
[Customer Name]
★★★★★ (5 stars)
"Excellent quality, very fresh, arrived on time!"
Purchased: Tomatoes, 2kg
Date: [Date]
```

**Empty State:**
- Headline: "No reviews yet"
- Message: "Once customers receive and review their orders, their feedback will appear here."

---

### Customer Landing Page

#### Homepage (Not Logged In)
**Hero Section:**
- **Headline:** "Know Your Farmer. Trust Your Food."
- **Subheading:** "Browse organic produce from real farmers in Bangalore and Cochin. Direct. Transparent. Premium."
- **CTA Button:** "Start Browsing"

**Section: How It Works**
- **Headline:** "Simple, Direct, Honest"
- **Steps:**
  1. Browse farmer profiles and produce
  2. Ask farmers questions directly
  3. Add to cart and checkout
  4. Track your order from farm to door
  5. Review and build farmer reputation

**Section: Featured Farmers**
- **Headline:** "Meet Our Farmers"
- **Farmer Card (repeating):**
  - Farmer photo
  - Farmer name
  - Location
  - ★★★★★ [Rating]
  - "[X] reviews"
  - "Top produce: [Type]"
  - Button: "View Farm"

---

#### Homepage (Logged In Customer)
**Headline:** Welcome back, [Customer Name]!  
**Subheading:** Fresh produce from farms you trust.

**Sections:**
- **Your Recent Activity:**
  - "You reviewed tomatoes from [Farmer Name] — thanks!"
  - "Your order from [Farmer] arrives tomorrow"

- **Browse Farmers & Produce:**
  - Grid of farmer cards / produce cards
  - Sorting/Filtering options visible

---

### Customer Browse & Discover

#### Browse / Discover Page
**Headline:** Browse Farmers & Produce  
**Subheading:** Find farmers near you. Check their reviews. Ask questions.

**Search & Filter Bar:**
- Search placeholder: "Search by farmer name, location, or produce type..."
- Filter button: "Show Filters"

**Filter Options (expandable):**
- Location: [Checkbox: Bangalore, Cochin]
- Produce Type: [Checkboxes: Vegetables, Fruits, Herbs, etc.]
- Availability: [Radio: In Stock, Any]
- Lead Time: [Dropdown: Ready now, 1-2 days, etc.]
- Rating: [Slider: 1★ to 5★]

**Farmer Card (Grid Layout):**
```
[Farmer Photo]
[Farmer Name]
[Location: Bangalore | Cochin]
★★★★★ [Rating] ([X] reviews)
"Top: Tomatoes, Spinach"
[Button: "View Farm"]
```

**Empty State (No results):**
- Headline: "No farmers found"
- Message: "Try adjusting your filters or search term."

---

#### Farmer Profile Page (Customer View)
**Headline:** [Farmer Name]'s Farm  
**Subheading:** [Location, Bangalore/Cochin]

**Profile Section:**
- Farmer photo
- About text (farmer's story)
- Certifications: [Display if present]
- Location: [Full address or village name]
- Rating: ★★★★★ [4.8] ([125 reviews])

**Produce Section:**
- **Headline:** "Available Now"
- **Subheading:** "Fresh from [Farmer Name]'s farm"
- Product cards (see below)

**Customer Reviews Section:**
- **Headline:** "What Customers Say"
- Review cards (see below)
- Pagination if many reviews

**Empty States:**
- If no produce listed: "This farmer hasn't listed produce yet. Check back soon or message them!"
- If no reviews: "Be the first to review!"

---

#### Produce Listing / Product Page (Customer)
**Product Details Card:**
- Product photo (large, carousel if multiple)
- **Headline:** [Produce Type]
- **Subheading:** From [Farmer Name]'s farm in [Location]
- Label: "Harvest Date" | Value: [Date]
- Label: "Price" | Value: ₹[Price]/[Unit]
- Label: "Lead Time" | Value: "Ready in 2-3 days"
- Label: "Availability" | Value: "In Stock" (green badge)
- Label: "Production Method" | Value: [Description]
- Label: "Quantity Available" | Value: [Amount]

**About This Farmer:**
- Farmer photo (small)
- Farmer name (link to profile)
- Rating: ★★★★★ [4.8]
- "Message [Farmer Name]" button

**Customer Action Section:**
- Label: "Quantity"
- Input: [Number input with +/- buttons]
- Button: "Add to Cart"

**Reviews Section (for this product):**
- Headline: "What Customers Say"
- Reviews filtered to this produce type (if available)

---

### Customer Cart & Checkout

#### Cart Page
**Headline:** Your Cart  
**Subheading:** Review items before checkout.

**Cart Items (grouped by farmer):**
```
[Farmer Name] - [Location]
━━━━━━━━━━━━━━━━━━
[Produce 1]
Quantity: [Input with +/- buttons]
Price: ₹[Per Unit] × [Quantity] = ₹[Total]
[Remove button]

[Produce 2]
[Same format]

Subtotal for [Farmer Name]: ₹[Amount]
━━━━━━━━━━━━━━━━━━
```

**Cart Summary:**
- Label: "Subtotal" | Value: ₹[Amount]
- Label: "Taxes (estimated)" | Value: ₹[Amount]
- Label: "Total" | Value: ₹[Amount]

**Note:** "You're ordering from multiple farmers. Each will prepare and deliver separately."

**Buttons:**
- [Button: "Continue Shopping"]
- [Button: "Proceed to Checkout"]

**Empty Cart State:**
- Headline: "Your cart is empty"
- Message: "Start browsing to add produce."
- Button: "Browse Farmers"

---

#### Checkout Page
**Headline:** Checkout  
**Subheading:** Deliver to [Customer Name]

**Section: Delivery Address**
- Label: "Full Address"
- Placeholder: "Street address, city, postal code"
- Label: "Phone Number"
- Placeholder: "Enter your 10-digit mobile number"
- Label: "Email"
- Placeholder: "Your email for order updates"
- Checkbox: "Use saved address" (if applicable)

**Section: Order Summary**
- **Headline:** "Order Summary"
- (Display grouped items by farmer, totals—same as cart)

**Payment Section:**
- Headline: "Payment Method"
- Label: "I'm proceeding to secure payment with [Payment Processor]"
- Button: "Proceed to Payment"

**Security Note:**
- "Your payment information is secure and processed by [Payment Processor]. We never store your card details."

---

#### Payment Page (Redirects to Payment Processor)
- [Handled by external payment gateway]
- After successful payment: Customer redirected to order confirmation

---

#### Order Confirmation Page
**Headline:** Order Placed Successfully! ✓  
**Subheading:** Thank you for supporting direct-from-farm organic produce.

**Order Number:**
- Label: "Order Number" | Value: #[Order ID]
- Label: "Order Date" | Value: [Date & Time]

**Order Summary:**
- List of items ordered (grouped by farmer)
- Delivery address
- Total paid

**Next Steps:**
- "Each farmer will confirm their order and prepare your produce."
- "You'll receive updates by email and SMS as your order is prepared."
- "Lead times vary by farmer. Check your order details for estimates."

**Buttons:**
- [Button: "View My Orders"]
- [Button: "Continue Shopping"]

**Email Confirmation:**
- See Email Templates section below

---

### Customer Order Tracking

#### Order History / My Orders Page
**Headline:** Your Orders  
**Subheading:** Track status and manage your purchases.

**Filters:**
- All | Pending | Preparing | Ready for Delivery | Delivered | Reviewed

**Order Cards (repeating):**
```
Order #[Order ID]
From: [Farmer Name] - [Location]
Ordered: [Date]
Status: [Preparing] ◐ (progress indicator)

Items: [Produce 1], [Produce 2]
Total: ₹[Amount]

[Button: "View Details"]
[Button: "Track Progress"]
```

**Empty State:**
- Headline: "No orders yet"
- Message: "Start browsing to place your first order."
- Button: "Browse Farmers"

---

#### Order Details / Tracking Page
**Headline:** Order #[Order ID]  
**Subheading:** From [Farmer Name] in [Location]

**Order Info:**
- Label: "Ordered On" | Value: [Date]
- Label: "Farmer" | Value: [Farmer Name] (link to profile)
- Label: "Delivery To" | Value: [Address]
- Label: "Total Price" | Value: ₹[Amount]

**Status Timeline:**
```
✓ Order Confirmed
  [Date & Time]
  Farmer received your order
  
◐ Preparing
  [Estimated completion]
  Farmer is preparing your produce
  
○ Ready for Delivery
  Estimated by [Date]
  
○ Delivered
```

**Items Ordered:**
```
[Produce 1] × [Quantity]
Production Method: [Description]
Lead Time: [e.g., "2-3 days"]
Price: ₹[Amount]

[Produce 2]
[Same format]
```

**Farmer Contact Section:**
- Label: "Need to reach [Farmer Name]?"
- Button: "Message Farmer"
- Label: "Phone" | Value: [Farmer's phone, if shared]

**Action Buttons:**
- [Button: "Message Farmer"]
- [Button: "Back to Orders"]

**After Delivery:**
- Prompt: "Order delivered? Leave a review to help others find great farmers."
- [Button: "Leave Review"]

---

### Customer Reviews

#### Leave Review Page
**Headline:** Review Your Order  
**Subheading:** Help other customers find great farmers.

**Order Summary:**
- Farmer name
- Produce purchased
- Order date
- Delivery date

**Review Form:**

| Field | Type | Placeholder |
|-------|------|-------------|
| Rating | Star selector (1-5) | Required. Click to rate. |
| Your Review | Text area | "What did you think? Was the produce fresh? How was the farmer's responsiveness? Optional but appreciated." |

**Buttons:**
- [Button: "Submit Review"]
- [Button: "Skip"]

---

#### Review Confirmation
**Headline:** Thank You!  
**Message:** "Your review has been posted. Other customers will see it when browsing [Farmer Name]'s profile."

---

### Messaging (Customer-Farmer Communication)

#### Message a Farmer
**Headline:** Message [Farmer Name]  
**Subheading:** Ask about production methods, availability, or anything else.

**Context (if applicable):**
- "About: [Produce Name]" (if messaging from a specific product)

**Message Form:**
- Label: "Your Message"
- Placeholder: "Ask about organic certification, lead time, quality, anything! Farmers appreciate questions—it shows you care."
- Button: "Send Message"

**Quick Questions (optional suggestions):**
- "Is this organic certified?"
- "What's your lead time?"
- "Can you deliver to [location]?"
- "Tell me about your farming methods"

---

#### Message Thread (Customer View)
**Headline:** Conversation with [Farmer Name]  
**Subheading:** About: [Produce name, if applicable]

**Messages:**
```
You
[Message text]
[Timestamp]

[Farmer Name]
[Response text]
[Timestamp]
```

**Message Input:**
- Placeholder: "Type a response..."
- Button: "Send"

---

## 2. Form Labels & Placeholders

### Farmer Forms

| Form | Field | Label | Placeholder | Validation/Help |
|------|-------|-------|-------------|-----------------|
| Profile | Location | Farm Location | "e.g., Whitefield, Bangalore" | Bangalore or Cochin only |
| Profile | Story/Bio | Tell Your Story | "Describe your farm, practices, philosophy..." | 50–500 characters recommended |
| Profile | Certifications | Organic Certification | "Yes / No / Prefer not to say" | Optional upload for Yes |
| Produce | Type | Produce Type | "e.g., Tomatoes, Spinach, Carrots" | Required |
| Produce | Quantity | Quantity Available | "e.g., 50 kg or 100 units" | Required, with unit selector |
| Produce | Harvest Date | Harvest Date | [Date picker, default today] | Required |
| Produce | Price | Price per Unit | "e.g., ₹80" | Required, currency symbol included |
| Produce | Method | Production Method | "e.g., No pesticides, hand-picked, biodynamic..." | Multi-line text, 100–500 chars |
| Produce | Lead Time | Lead Time | [Dropdown: Ready now, 1-2 days, 3-5 days, 1 week] | Required |
| Produce | Status | Availability | [Radio: In Stock, Limited, Out of Stock] | Required |
| Produce | Photos | Photos | "Upload up to 5 photos" | Drag-and-drop area. JPG, PNG. Max 5MB each. |

---

### Customer Forms

| Form | Field | Label | Placeholder | Validation/Help |
|------|-------|-------|-------------|-----------------|
| Checkout | Address | Full Address | "Street address, city, postal code, India" | Required. Bangalore/Cochin only. |
| Checkout | Phone | Phone Number | "10-digit mobile number" | Required, starts with 6-9 |
| Checkout | Email | Email Address | "your.email@example.com" | Required, valid email |
| Cart | Quantity | Quantity | [+/− buttons, min 1] | Integer only. Check farm max availability. |

---

## 3. CTA Labels

### Primary Actions (Main buttons—use Sage Green, prominent)

| Context | Label | Alternative |
|---------|-------|-------------|
| Create account (Farmer) | "Become a Farmer" | "Join as Farmer" |
| Create account (Customer) | "Start Shopping" | "Browse Farmers" |
| Sign in | "Sign In" | |
| Edit profile | "Save Changes" | "Update Profile" |
| Add produce listing | "List This Produce" | "Publish Listing" |
| Update order status | "Confirm Status" | "Update Order" |
| Send message | "Send Message" | |
| Add to cart | "Add to Cart" | |
| Proceed to checkout | "Proceed to Checkout" | "Go to Checkout" |
| Place order | "Place Order" | "Confirm & Pay" |
| Track order | "View Details" | "Track Progress" |
| Leave review | "Submit Review" | "Post Review" |
| View profile | "View Farm" | "See Profile" |
| Message farmer | "Message [Farmer Name]" | "Ask a Question" |

---

### Secondary Actions (Secondary buttons—use outline style)

| Context | Label |
|---------|-------|
| Continue shopping | "Continue Shopping" |
| Back to previous | "Back" |
| Cancel action | "Cancel" |
| Skip optional step | "Skip" |
| Remove from cart | "Remove" |
| Edit listing | "Edit" |
| Delete listing | "Remove Listing" |
| View all reviews | "See All Reviews" |

---

### Tertiary Actions (Text links, subtle)

| Context | Label |
|---------|-------|
| View farmer profile | "[Farmer Name]" (hyperlink) |
| Need help? | "Contact Support" |
| Forgot password? | "Forgot Password?" |
| Already have account? | "Sign In" |
| Don't have account? | "Create Account" |

---

## 4. Empty States

### Farmer Empty States

| Screen | Headline | Message | CTA |
|--------|----------|---------|-----|
| Orders | "No orders yet" | "Keep your listings fresh and respond to customer messages to attract buyers." | "Go to My Listings" |
| Messages | "No messages" | "When customers ask questions, they'll appear here. Good responsiveness builds trust!" | "View My Farm Profile" |
| Reviews | "No reviews yet" | "You'll see reviews here once customers have received and reviewed their orders." | "View My Listings" |

---

### Customer Empty States

| Screen | Headline | Message | CTA |
|--------|----------|---------|-----|
| Cart | "Your cart is empty" | "Start browsing farms and produce to add items." | "Browse Farmers" |
| Orders | "No orders yet" | "You haven't placed any orders. Ready to discover fresh, direct-from-farm produce?" | "Browse Farmers" |
| Bookmarks/Favorites (if added) | "No favorites yet" | "Save your favorite farms for quick access later." | "Browse Farmers" |
| Messages | "No conversations" | "Contact farmers to ask questions about their produce or farming methods." | "Browse Farmers" |

---

## 5. Error Messages

All error messages should be user-friendly (no technical jargon) and offer clear next steps.

| Scenario | Message | Suggestion |
|----------|---------|-----------|
| Email already registered | "This email is already registered. Sign in or use a different email." | Link to "Sign In" or "Forgot Password?" |
| Invalid email format | "Please enter a valid email address." | Show format example |
| Password too weak | "Password must be at least 8 characters, with a mix of letters, numbers, and symbols." | Show requirements as you type |
| Form field required | "This field is required." | Highlight missing field |
| Phone number invalid | "Please enter a valid 10-digit phone number." | Show format example |
| Address not in service area | "We deliver to Bangalore and Cochin only. Please verify your address." | Suggest service areas |
| Payment failed | "Payment could not be processed. Please check your card details and try again. If the problem persists, contact your bank." | "Retry Payment" button |
| Network error | "Something went wrong. Please check your internet connection and try again." | "Retry" button |
| File upload failed | "File too large. Please upload images under 5MB." | Clear size requirement |
| Invalid quantity | "Please enter a quantity between 1 and [max available]." | Show valid range |
| Produce out of stock | "This produce is no longer available. Check back soon or browse other farmers." | "Browse Similar" button |
| Farm not found | "This farm no longer exists. Browse other farms instead." | "Browse Farmers" button |
| Order not found | "We couldn't find that order. Check your order number or contact support." | Link to support |
| Unauthorized access | "You don't have permission to view this. Sign in with the correct account." | "Sign In" button |

---

## 6. Success Messages

| Action | Message | Duration |
|--------|---------|----------|
| Account created | "Welcome! Your account has been created." | Dismiss or 3 seconds |
| Profile saved | "Your profile has been updated." | Dismiss or 3 seconds |
| Produce listed | "Your listing is now live and visible to customers!" | Dismiss or 3 seconds |
| Listing updated | "Your listing has been updated." | Dismiss or 3 seconds |
| Order confirmed | "Order confirmed! You'll receive updates as it's prepared." | Dismiss or 3 seconds |
| Status updated | "Order status updated. Customer has been notified." | Dismiss or 3 seconds |
| Message sent | "Message sent to [Farmer Name]." | Dismiss or 2 seconds |
| Review posted | "Thank you! Your review is now visible on the farmer's profile." | Dismiss or 3 seconds |
| Item added to cart | "[Produce Name] added to cart." | Dismiss or 2 seconds |
| Order placed | "Order placed successfully! Check your email for details." | Persistent until dismissed |
| Payment successful | "Payment successful. Your order is confirmed." | Persistent until dismissed |
| Address saved | "Address saved successfully." | Dismiss or 2 seconds |

---

## 7. Notifications & Transactional Emails

### Email: Welcome (Farmer)
**Subject:** "Welcome to Lush Greens – Connect with Premium Customers"

**Body:**
```
Hi [Farmer Name],

Welcome to our direct-to-consumer marketplace! You're now connected to 
conscious consumers in Bangalore and Cochin who value authentic, organic produce.

Get Started:
1. Complete your farm profile (add location, story, certifications)
2. List your first produce
3. Respond quickly to customer questions to build trust

Your Success Tips:
- Great photos increase sales. Show the real produce.
- Respond to customer messages within 24 hours—trust is everything.
- Honest production methods attract the right customers.

Questions? Reply to this email or contact support.

Happy selling,
Lush Greens
```

**CTA Button:** "Complete Your Profile"

---

### Email: Welcome (Customer)
**Subject:** "Welcome to Lush Greens – Discover Farms You Can Trust"

**Body:**
```
Hi [Customer Name],

Welcome! You're now part of a community that believes in transparency, 
quality, and supporting local farmers.

What You Can Do:
- Browse farms in Bangalore and Cochin
- Ask farmers about their methods and availability
- Order directly—support farmers, eat better
- Review after delivery to help others decide

Start Exploring:
- Top-rated farms in your area
- New produce listings this week
- Farmers with fast delivery times

Questions? We're here to help. Just reply to this email.

Happy browsing,
Lush Greens
```

**CTA Button:** "Browse Farms"

---

### Email: New Order (Farmer)
**Subject:** "New Order from [Customer Name] — Confirm Now"

**Body:**
```
Hi [Farmer Name],

A customer just placed an order for your produce!

Order Details:
━━━━━━━━━━━━━━━━━━
Order #[Order ID]
Customer: [Customer Name]
Phone: [Customer Phone]
Email: [Customer Email]

Items Ordered:
- [Produce 1] × [Quantity]
- [Produce 2] × [Quantity]

Delivery To:
[Full Address]

━━━━━━━━━━━━━━━━━━

Next Steps:
1. Review the order details
2. Confirm you can fulfill it by the lead time you specified
3. Update the status as you prepare

Respond Quickly:
Good responsiveness builds customer trust and leads to more orders.

Questions? Message the customer or contact us.

Best,
Lush Greens
```

**CTA Button:** "Confirm Order"

---

### Email: Order Confirmed (Customer)
**Subject:** "Order Confirmed from [Farmer Name] – Track Your Produce"

**Body:**
```
Hi [Customer Name],

Your order has been confirmed! [Farmer Name] is preparing your produce.

Order Summary:
━━━━━━━━━━━━━━━━━━
Order #[Order ID]
From: [Farmer Name]'s Farm, [Location]

Items:
- [Produce 1] × [Quantity]
- [Produce 2] × [Quantity]

Total: ₹[Amount]
Delivery To: [Address]

━━━━━━━━━━━━━━━━━━

Lead Time:
Your produce should be ready for delivery in [Lead Time] (by [Estimated Date]).

Track Your Order:
Check status anytime in your account.

Questions or Changes?
Message [Farmer Name] directly through the platform if you have any questions.

Thank you for supporting direct-from-farm organic produce!

Lush Greens
```

**CTA Button:** "Track Order"

---

### Email: Order Status Update (Customer)
**Subject:** "Order Status Update: [Status] – [Farmer Name]"

**Body:**
```
Hi [Customer Name],

Your order from [Farmer Name] has been updated.

Order #[Order ID]
Status: [Confirmed | Preparing | Ready for Delivery]

Current Timeline:
━━━━━━━━━━━━━━━━━━
✓ Confirmed
[Date & Time]

◐ Preparing
Estimated ready by [Date]

(Next Steps)

━━━━━━━━━━━━━━━━━━

Next Steps:
[Depending on status]
- If "Preparing": Farmer is working on your order.
- If "Ready for Delivery": Farmer will coordinate delivery. Check your messages.

Have Questions?
Reply to this email or message [Farmer Name] directly.

Lush Greens
```

---

### Email: Ready for Delivery (Customer)
**Subject:** "[Farmer Name] Has Your Order Ready – Coordinate Delivery"

**Body:**
```
Hi [Customer Name],

Great news! Your produce from [Farmer Name] is ready for delivery.

Order #[Order ID]
From: [Farmer Name], [Location]
Items: [List]
Total: ₹[Amount]
Delivery To: [Address]

━━━━━━━━━━━━━━━━━━

What's Next:
[Farmer Name] will contact you to finalize delivery details:
- Exact time / window
- Pickup location (if applicable)
- Contact method (phone, SMS, etc.)

Farmer Contact:
Phone: [Farmer's Phone]
Message them on the platform: [Link]

Your produce is fresh and ready. Respond quickly to confirm delivery!

Lush Greens
```

---

### Email: Order Delivered (Customer) – Review Prompt
**Subject:** "Your Fresh Produce Arrived – Please Review!"

**Body:**
```
Hi [Customer Name],

Did your order from [Farmer Name] arrive?

Order #[Order ID]
Items: [List produce]

We'd Love Your Feedback:
Reviews help other customers find great farmers and help farmers know what they're doing well. 
Even a quick star rating makes a difference.

━━━━━━━━━━━━━━━━━━

Ready to Review?
Visit your order and leave a rating and comment.

Any Issues?
If there were any problems with your order, please let us know so we can help.

Thank you for supporting direct-from-farm organic!

Lush Greens
```

**CTA Button:** "Leave Review"

---

### In-App Notification: New Message (Farmer)
**Headline:** "New message from [Customer Name]"  
**Body Preview:** "[Customer message preview...]"  
**Action:** "View Message"

---

### In-App Notification: New Message (Customer)
**Headline:** "[Farmer Name] replied"  
**Body Preview:** "[Farmer message preview...]"  
**Action:** "Read Response"

---

### In-App Notification: Order Status Update (Farmer)
**Headline:** "Order #[ID] status updated"  
**Body:** "Customer has marked order as delivered."  
**Action:** "View Order"

---

### In-App Notification: Order Status Update (Customer)
**Headline:** "[Farmer Name] updated your order"  
**Body:** "Status is now: [Preparing]"  
**Action:** "Track Order"

---

### In-App Notification: New Order (Farmer)
**Headline:** "New order from [Customer Name]!"  
**Body:** "[Produce 1] × [Qty], [Produce 2] × [Qty]"  
**Action:** "Confirm Order"

---

### SMS Notifications (Optional)

| Trigger | Template |
|---------|----------|
| Order placed | "Hi [Name], your order #[ID] from [Farmer] is confirmed! Track it: [Link]" |
| Status update | "[Farmer] updated your order to '[Status]'. Check it: [Link]" |
| Ready for delivery | "[Farmer] says your order is ready! Respond to: [Phone/Link]" |
| New message | "[Farmer] replied to your message. Check: [Link]" |

---

## 8. Microcopy & Help Text

### Farmer Prompts & Guidance

| Location | Text |
|----------|------|
| Profile photo upload | "Customers trust a face. A profile photo significantly increases your credibility." |
| About section | "Be genuine. Customers connect with farmers who share their story. Tell them about your farm, methods, and philosophy." |
| Production method field | "Help customers understand how you grow. Examples: 'No synthetic pesticides, hand-harvested, seasonal crops, regenerative methods.'" |
| Lead time selection | "Honest lead times build trust. Customers respect farmers who deliver on time." |
| Photo upload (produce) | "Quality photos are crucial. Show the actual produce, not stock images. Customers want to see what they're buying." |
| Message responsiveness | "Respond within 24 hours. Good communication is a trust signal and leads to more orders." |

---

### Customer Prompts & Guidance

| Location | Text |
|----------|------|
| Farmer profile view | "Read reviews to understand what customers love about this farm." |
| Message to farmer | "Ask about anything—production methods, certification, lead time, availability. Farmers appreciate engaged customers." |
| Review prompt | "Share your honest experience. Your feedback helps other customers and helps farmers improve." |
| Checkout confirmation | "Each farmer will prepare and deliver separately. Lead times vary by farmer." |
| Cart | "All items will be ordered from multiple farms with a single checkout." |

---

## 9. Brand Voice Guidelines

### Tone
- **Authentic:** Genuine, not corporate. Speak like a real person.
- **Transparent:** Honest about what the platform is (direct connections, no guarantees) and what it isn't (no farmer vetting, no quality certification).
- **Empowering:** Position both farmers and customers as agents in control. Farmers own their listings. Customers make informed choices.
- **Approachable:** Use simple language. Avoid jargon.
- **Warm:** The relationship between farmer and customer matters. Encourage trust-building.

### Examples

**Don't:** "Leverage our disruptive platform to monetize your agricultural asset base."  
**Do:** "Sell directly to customers who value your work. Keep 100% of what you earn."

**Don't:** "Submit a standardized inquiry via our integrated communication protocol."  
**Do:** "Ask [Farmer] your questions directly—about production methods, lead time, anything."

**Don't:** "Optimize your supply chain efficiency."  
**Do:** "Plan your delivery. Keep your customers in the loop."

---

**This content document is the source of truth for all user-facing text. All UI implementation should use these exact labels, messages, and microcopy.**
