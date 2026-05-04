# Feature: Checkout and Payment

## Summary
Customers complete their purchase by providing delivery address and contact information, then securely pay through a payment processor. The system creates separate orders for each farmer in the cart and sends confirmations to both customer and farmers. This feature handles the transactional core of the marketplace.

## User Story
As a customer, I want to enter my delivery address, review my order, complete payment securely, and receive an order confirmation so that I can complete my purchase and know my order was placed.

## Acceptance Criteria
- Customer can click "Proceed to Checkout" from their shopping cart
- System displays checkout form with fields for delivery address and contact information (phone, email)
- Customer can enter or verify delivery address (street, city, postal code)
- Customer can enter or verify phone number
- Customer can enter or verify email address
- System displays order summary showing all items grouped by farmer with quantities and prices
- System displays total price including any applicable taxes or fees
- Customer can see which farmers they're ordering from
- System shows estimated delivery windows based on lead times for each farmer
- Customer can proceed to payment
- System redirects to secure payment processor (e.g., Razorpay)
- Customer can enter payment details or use a saved payment method
- Payment processor securely processes payment
- System receives payment confirmation
- System creates separate order(s) for each farmer (one order per farmer in the cart)
- System clears the customer's cart
- System sends order confirmation email to customer with order number(s) and details
- System sends order notification to each farmer with order details and customer contact
- Customer receives in-app confirmation message with next steps
- Customer can view their orders in "My Orders" section
- System handles payment failures gracefully and allows retry without losing cart data

## Priority
High — This is a must-have feature; the entire marketplace depends on successful checkout and payment.

## Dependencies
user-registration, user-login, shopping-cart, farmer-order-management
