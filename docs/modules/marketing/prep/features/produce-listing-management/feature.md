# Feature: Produce Listing Management

## Summary
Farmers can create, edit, and remove listings for their organic produce. Each listing includes critical details like harvest date, price, production method, lead time, and photos. This feature enables customers to discover and evaluate specific products before purchasing.

## User Story
As a farmer, I want to list my produce with complete details (type, quantity, harvest date, price, production method, lead time, photos, availability) so that customers can find, evaluate, and purchase my products.

## Acceptance Criteria
- Farmer can navigate to "List Produce" or "Add Produce" page
- Farmer can enter produce type (e.g., tomatoes, spinach, carrots)
- Farmer can enter quantity available
- Farmer can set harvest date or recent harvest date
- Farmer can set price per unit or bulk price
- Farmer can describe production method (no pesticides, hand-picked, seasonal, biodynamic, etc.)
- Farmer can specify lead time (e.g., "Ready for delivery in 2 days")
- Farmer can upload one or more produce photos
- Farmer can set availability status (in stock, limited, out of stock)
- Farmer can submit the listing
- System validates all required fields
- System publishes listing and makes it searchable by produce type, farmer name, and location
- Farmer receives confirmation that listing is now visible to customers
- Farmer can edit an existing listing at any time
- Farmer can remove a listing (delete or mark as unavailable)
- Listing changes are immediately reflected to customers

## Priority
High — This is a must-have feature; without it, farmers cannot sell produce and the marketplace has no inventory.

## Dependencies
user-registration, user-login, farmer-profile-management
