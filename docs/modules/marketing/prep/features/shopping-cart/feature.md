# Feature: Shopping Cart

## Summary
Customers can add produce from multiple farmers to a shopping cart and manage items (view, update quantities, remove) before checkout. The cart clearly shows which farmer grows each item to maintain transparency and allow customers to purchase from multiple farmers in one transaction.

## User Story
As a customer, I want to add produce to a cart, manage quantities, and review my selections before checkout so that I can plan my purchases and buy from multiple farmers if desired.

## Acceptance Criteria
- Customer can click "Add to Cart" on a produce listing
- System adds the item to cart with quantity, price, farmer info, and produce details
- Customer receives confirmation (toast, modal, or notification) that item was added
- Customer can view their cart at any time
- Customer can see cart summary: list of items grouped by farmer, quantity per item, price per item, total quantity, and total price
- Customer can see which farmer grows each item in the cart
- Customer can update the quantity of any item in the cart
- Customer can remove an item from the cart
- Customer can continue browsing and add more items from different farmers
- System updates cart total when quantity changes or items are added/removed
- System prevents adding out-of-stock items to cart
- Customer can see the cart item count displayed in the UI (badge or counter)
- Cart persists across page navigation (session persistence)
- Customer can empty the entire cart if desired
- System shows subtotal before taxes/fees

## Priority
High — This is a must-have feature; without it, customers cannot prepare orders for checkout.

## Dependencies
user-registration, user-login, produce-discovery
