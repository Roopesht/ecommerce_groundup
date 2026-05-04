# Feature: Order Review and Rating

## Summary
After delivery, customers can rate their experience and write reviews about the farmer and produce. These reviews are published on the farmer's public profile and directly influence other customers' purchasing decisions. Reviews are central to the trust-building mechanism in a platform without quality certification.

## User Story
As a customer who has received my order, I want to leave a review and rating for the farmer so that other customers can learn from my experience and farmers can see feedback about their service.

## Acceptance Criteria
- After order is delivered, system prompts customer to review (via notification, email, or on order tracking page)
- Customer can navigate to a delivered order and click "Leave Review" or "Rate Farmer"
- System displays review form with fields for rating (stars) and optional review text
- Customer can select a star rating from 1 to 5 stars
- Customer can write optional review text (character limit and text area provided)
- Customer can specify which produce item(s) the review applies to (optional)
- Customer can submit the review
- System validates the review and publishes it on the farmer's public profile
- System updates the farmer's aggregate rating (average of all reviews)
- System displays review on farmer's profile with: customer name, star rating, review text, produce reference, and review date
- Farmer can see the review on their reputation dashboard
- Other customers can see the review when browsing the farmer's profile or that produce listing
- Customer cannot edit or delete their own review (immutable)
- Farmer cannot delete or edit customer reviews
- System does not require a review (optional feedback)
- Customer can leave a review even without writing review text (rating only)
- Multiple reviews from the same customer for different orders are tracked separately

## Priority
High — This is a must-have feature; reviews are the primary trust signal for farmers and directly impact revenue and user acquisition success metrics.

## Dependencies
user-registration, user-login, checkout-payment, order-tracking, farmer-reputation-display
