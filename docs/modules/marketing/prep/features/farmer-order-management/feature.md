# Feature: Farmer Order Management

## Summary
Farmers receive notifications when customers place orders and can view, confirm, and update order status throughout fulfillment. Status updates (confirmed, preparing, ready for delivery) notify customers and help coordinate delivery timing.

## User Story
As a farmer, I want to view incoming customer orders, confirm receipt, and update order status so that I can manage fulfillment and keep customers informed about their orders.

## Acceptance Criteria
- Farmer receives real-time notification when a new order arrives
- Farmer can navigate to an "Orders" or "Incoming Orders" section
- Farmer can view a list of orders with customer name, order details (produce type, quantity, delivery location), and customer contact information
- Farmer can view detailed information for each order
- Farmer can confirm order receipt
- Farmer can update order status through predefined states: confirmed → preparing → ready for delivery
- Each status update triggers a notification to the customer
- Farmer can view order history and filter by status
- Farmer can contact customer (via built-in messaging) if clarification is needed
- Farmer can view which produce items are in each order
- Farmer can mark order as complete once delivered

## Priority
High — This is a must-have feature; without it, farmers cannot fulfill orders and customers have no way to track progress.

## Dependencies
user-registration, user-login, produce-listing-management, checkout-payment
