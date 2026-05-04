# User Flows: Marketing Module

**Module:** Marketing (Core Platform)  
**Date:** 2026-05-04  
**Status:** COMPLETE

---

## Overview

This document captures the primary user flows for farmers and customers in the direct-to-consumer organic produce marketplace. Each flow describes the sequence of user actions and system responses needed to complete a core task.

---

## Farmer Flows

### Flow 1: Create and Manage Farmer Profile

**Actor:** Farmer  
**Entry Point:** Farmer signs up or accesses their profile settings  
**Exit Point:** Profile is saved and visible to customers

**Steps:**
1. Farmer navigates to profile creation/editing page
2. System displays profile form with fields: location (city/village), farming practices, certifications, story/bio, profile photo
3. Farmer enters location (Bangalore or Cochin)
4. Farmer describes organic farming practices and methods
5. Farmer uploads profile photo or media (optional)
6. Farmer submits form
7. System validates and saves profile
8. System confirms profile is now live and visible to customers
9. Farmer can return to edit profile at any time; system saves updated information

**Notes:**
- Farmers may not have formal certifications; self-reported practices are acceptable
- Profile photo is optional but recommended (higher trust)
- Farmer can edit profile multiple times
- Changes to profile are immediately visible to customers

---

### Flow 2: List Produce with Complete Details

**Actor:** Farmer  
**Entry Point:** Farmer navigates to "Add Produce" or "List New Produce"  
**Exit Point:** Produce listing is published and searchable by customers

**Steps:**
1. Farmer clicks "List Produce" button
2. System displays produce listing form with fields: produce type, quantity, harvest date, price, production method, lead time, availability status, photos
3. Farmer specifies produce type (e.g., tomatoes, spinach, carrots)
4. Farmer enters quantity available
5. Farmer sets harvest date (or recent harvest date)
6. Farmer sets price per unit or bulk
7. Farmer describes production method (no pesticides, hand-picked, seasonal, biodynamic)
8. Farmer specifies lead time (e.g., "Ready for delivery in 2 days")
9. Farmer uploads produce photos
10. Farmer sets availability status (in stock, limited, out of stock)
11. Farmer submits listing
12. System validates and publishes listing
13. System makes listing searchable by produce type, farmer name, and location
14. Farmer receives confirmation; listing is now visible to customers

**Notes:**
- Photos are crucial for customer trust; system should encourage multi-photo uploads
- Lead time is critical for customer purchasing decisions
- Farmer can edit or remove listings at any time
- Availability status allows farmers to temporarily pause listings without deleting

---

### Flow 3: Receive and Manage Customer Orders

**Actor:** Farmer  
**Entry Point:** Customer places an order; farmer receives notification  
**Exit Point:** Order status is updated (confirmed, preparing, ready for delivery)

**Steps:**
1. Customer completes purchase and payment
2. System sends notification to farmer (order received)
3. Farmer navigates to "Orders" or "Incoming Orders" section
4. System displays list of new orders with customer name, order details (produce, quantity, delivery location), and customer contact
5. Farmer reviews order and customer details
6. Farmer confirms order receipt (or requests clarification from customer if needed)
7. Farmer updates order status as work progresses: "confirmed" → "preparing" → "ready for delivery"
8. System notifies customer of each status update
9. Farmer coordinates delivery timing with customer (via direct message or customer-provided contact)
10. Customer receives order and marks as delivered (or farmer confirms pickup)
11. Order is complete

**Notes:**
- Farmer receives real-time notification of new orders
- Farmer can view order history and filter by status
- Lead time set in product listing establishes delivery expectation
- Farmer and customer may communicate directly about delivery logistics outside the platform

---

### Flow 4: Respond to Customer Inquiries

**Actor:** Farmer  
**Entry Point:** Customer sends a direct message  
**Exit Point:** Conversation is ongoing or resolved

**Steps:**
1. Customer sends a direct message to farmer (e.g., "Is this organic certified?" or "Do you have lead time for next week?")
2. System notifies farmer of new message
3. Farmer navigates to "Messages" or "Inbox"
4. System displays conversation with customer, including question and message history
5. Farmer reads message and types response with detailed information
6. Farmer submits response
7. System sends message to customer immediately
8. Customer sees farmer's response and can reply if needed
9. Conversation continues until customer has sufficient information to decide or purchases

**Notes:**
- Messages are one-way between farmer and customer; both see full conversation history
- Farmer can respond to multiple customers in parallel
- Messages should be timestamped and accessible from farmer's order or profile view
- Critical for trust-building; farmer responsiveness is a quality signal

---

### Flow 5: View Reputation and Customer Reviews

**Actor:** Farmer  
**Entry Point:** Farmer navigates to their profile or "Reputation" section  
**Exit Point:** Farmer views reviews and aggregate rating

**Steps:**
1. Farmer clicks on profile or "My Reputation" section
2. System displays farmer's aggregate rating (stars), review count, and list of customer reviews
3. System shows each review with customer name, rating, text, and date
4. Farmer can filter or sort reviews by rating, recency, or produce type (optional)
5. Farmer reads reviews to understand customer feedback and identify improvement areas
6. System may show trends (e.g., "Most reviewed for: tomatoes")

**Notes:**
- Ratings are visible to customers and critical for farmer credibility
- Farmer cannot edit or delete customer reviews
- Farmer can use review feedback to improve operations (e.g., packaging, lead time)
- Aggregate rating influences customer purchasing decisions

---

## Customer Flows

### Flow 6: Discover Produce and Farmers

**Actor:** Customer  
**Entry Point:** Customer lands on homepage or browsing page  
**Exit Point:** Customer views specific farmer profile or produce listing

**Steps:**
1. Customer navigates to "Browse" or "Discover" section
2. System displays grid or list of farmer profiles with name, location, photo, and aggregate rating
3. Customer can search by farmer name, location, or produce type
4. Customer can filter by availability or lead time (optional)
5. Customer clicks on a farmer profile to view their details
6. System displays farmer's full profile: location, farming practices, certifications, story, photos, and customer reviews
7. System also shows this farmer's current produce listings
8. Customer can view individual produce listings or return to browse other farmers
9. If customer clicks on a specific produce listing, system shows detailed product information (harvest date, production method, price, lead time, photos)

**Notes:**
- Homepage should feature top-rated farmers or new listings to drive engagement
- Search and filter are critical for discoverability in a multi-farmer marketplace
- Farmer reviews and ratings strongly influence which farmers customer clicks on
- Produce details should make clear which farmer grows it and their reputation

---

### Flow 7: Contact Farmer with Questions

**Actor:** Customer  
**Entry Point:** Customer views produce listing or farmer profile  
**Exit Point:** Customer receives farmer response or sufficient information to decide

**Steps:**
1. Customer views a produce listing and wants more information (e.g., "What's your delivery window?" or "Are you certified organic?")
2. Customer clicks "Message Farmer" or "Ask Question"
3. System displays a message form with the farmer's name and produce reference (if applicable)
4. Customer types a question or message
5. Customer submits message
6. System sends message to farmer and shows confirmation to customer
7. System notifies farmer of new inquiry
8. Farmer responds (see Flow 4 from farmer perspective)
9. System delivers farmer's response to customer
10. Customer can reply to continue conversation until satisfied

**Notes:**
- Direct messaging is central to building trust between strangers
- Customer should be able to contact farmer before committing to purchase
- Conversation history should be visible to customer
- Farmer responsiveness is a quality signal influencing future purchases

---

### Flow 8: Browse Listings and Add to Cart

**Actor:** Customer  
**Entry Point:** Customer is browsing produce listings  
**Exit Point:** Items are in cart and ready for checkout

**Steps:**
1. Customer views a produce listing with details (farmer name, harvest date, production method, price, photos, lead time, availability)
2. Customer reads farm information and reviews to build confidence
3. Customer decides quantity to purchase
4. Customer clicks "Add to Cart"
5. System adds item to cart with quantity, price, and farmer info
6. System displays confirmation (e.g., "Added to cart" toast or modal)
7. Customer can continue browsing other farmers/produce or proceed to checkout
8. If continuing to browse, repeat steps 1–7 for additional items
9. Customer clicks "View Cart" when ready to proceed
10. System displays cart summary: list of items by farmer, total price, total quantity, delivery locations needed

**Notes:**
- Customers may purchase from multiple farmers in one transaction
- Cart should clearly show which farmer grows each item (important for transparency)
- Lead times may vary by farmer; system should note this for delivery planning
- Quantities should be editable in cart

---

### Flow 9: Checkout and Payment

**Actor:** Customer  
**Entry Point:** Customer clicks "Proceed to Checkout" from cart  
**Exit Point:** Payment is confirmed and order(s) are placed

**Steps:**
1. Customer views cart summary and clicks "Proceed to Checkout"
2. System displays checkout form: delivery address, contact information (phone, email)
3. Customer verifies or enters delivery address
4. Customer verifies or enters contact information
5. System displays order summary grouped by farmer (since order will go to multiple farmers)
6. System shows total price and any applicable taxes or delivery fees
7. Customer clicks "Proceed to Payment"
8. System redirects to payment processor (e.g., Razorpay)
9. Customer enters payment details or uses saved payment method
10. Payment processor authorizes payment
11. System receives payment confirmation
12. System clears cart and creates order(s) for each farmer
13. System sends order confirmation to customer (email/in-app)
14. System sends order notification to each farmer
15. Customer receives confirmation with order number(s) and next steps

**Notes:**
- Customers should see delivery address and contact info clearly before final payment
- Since farms are in specific locations, delivery coordination is handled post-purchase
- Multiple farmers in one cart = multiple orders, but single checkout flow
- Payment failure should allow customer to retry without losing cart

---

### Flow 10: Track Order Status

**Actor:** Customer  
**Entry Point:** Customer receives order confirmation and checks status  
**Exit Point:** Order is delivered and customer can leave review

**Steps:**
1. Customer receives order confirmation email/SMS with order number
2. Customer navigates to "My Orders" or "Order Tracking"
3. System displays list of customer's orders with status, farmer name, and produce details
4. Customer clicks on specific order to view detailed tracking
5. System displays order timeline:
   - Confirmed (order received by farmer)
   - Preparing (farmer is preparing produce)
   - Ready for Delivery (produce is ready; farmer coordinating delivery)
   - Estimated Delivery Date/Window (provided by farmer or logistics provider)
6. System may integrate with third-party logistics provider to show tracking details (optional)
7. Customer can see farmer's contact information and reach out if needed
8. Once delivered, system prompts customer to confirm receipt and leave review

**Notes:**
- Order status is updated by farmer (see Flow 3)
- Lead time set during listing helps customer set expectations
- Logistics coordination happens outside platform (farmer ↔ customer direct contact)
- Tracking page should be easily accessible from mobile and web

---

### Flow 11: Leave Review and Rating

**Actor:** Customer  
**Entry Point:** Order is delivered and customer has received it  
**Exit Point:** Review is published on farmer's profile

**Steps:**
1. System sends notification to customer: "Order delivered—please leave a review"
2. Customer navigates to "My Orders" and selects delivered order
3. System displays review form with fields: rating (stars), review text
4. Customer provides star rating (1–5 stars)
5. Customer writes optional review text (e.g., "Excellent quality, very fresh, arrived on time")
6. Customer submits review
7. System validates and publishes review on farmer's profile
8. System updates farmer's aggregate rating
9. Farmer can see review on their profile
10. Other customers can see review when browsing farmer profile or product listings

**Notes:**
- Reviews are critical for building trust in a trust-constrained market
- Customer should review within a few days of delivery while experience is fresh
- Reviews are public and visible to all customers
- System should prompt review (via notification or order page) but not require it
- Farmers cannot delete reviews (they can only respond, in future iterations)

---

## Cross-Flow Notes

### Farmer-Customer Communication
- Messaging is asynchronous and happens within the platform
- Both parties can see full conversation history
- Messages should be timestamped
- No requirement for video, calls, or rich media in Phase 1

### Trust and Transparency
- Farmer profiles, reviews, and ratings are the primary trust signals
- Produce photos and descriptions are important for quality assessment
- Customer reviews directly influence subsequent farmer credibility
- Farmer responsiveness to inquiries builds trust

### Delivery Coordination
- Farmers and customers coordinate delivery logistics directly (not platform-mediated)
- Lead time is set at product listing; farmer manages fulfillment timing
- Third-party logistics integration is optional for tracking; not required for Phase 1

### Data Visibility
- Each farmer sees only their own orders, messages, and reviews
- Each customer sees all their orders, messages across farmers, and reviews they've left
- Public profiles (farmer details, reviews, ratings) are visible to all logged-in users
