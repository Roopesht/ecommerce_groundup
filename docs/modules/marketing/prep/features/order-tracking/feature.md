# Feature: Order Tracking

## Summary
Customers can view their orders and track the status from confirmation through preparation to ready for delivery. The feature displays the order timeline, estimated delivery dates, and farmer contact information, enabling customers to coordinate delivery and stay informed throughout fulfillment.

## User Story
As a customer, I want to view my orders and track their status from confirmed through delivery so that I know when to expect my produce and can contact the farmer if needed.

## Acceptance Criteria
- Customer can navigate to "My Orders" or "Order Tracking" section
- Customer can view a list of their orders with status, farmer name, produce details, order number, and order date
- Customer can click on a specific order to view detailed tracking
- System displays order timeline showing progression through states: confirmed → preparing → ready for delivery
- System shows estimated delivery date or window based on lead time
- System shows current status with clear indication (e.g., "Confirmed", "Preparing", "Ready for Delivery")
- Customer can see the farmer's name, location, and contact information
- Customer can see all produce items in the order with quantities and prices
- Customer can view the customer's delivery address on the order
- Each status update from farmer displays the timestamp
- System may show third-party logistics tracking information if available (optional)
- Customer can contact the farmer directly via messaging if questions arise
- Once delivered, system prompts customer to confirm receipt
- Customer can confirm order delivery through the tracking page
- Order history is accessible and shows all past orders

## Priority
High — This is a must-have feature; customers need visibility into order status to plan deliveries and manage expectations.

## Dependencies
user-registration, user-login, checkout-payment, farmer-order-management, direct-messaging
