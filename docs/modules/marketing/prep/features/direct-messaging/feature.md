# Feature: Direct Messaging Between Farmers and Customers

## Summary
Farmers and customers can communicate directly through the platform to discuss produce details, production methods, availability, lead times, and delivery coordination. This asynchronous messaging system is critical for building trust and resolving questions before purchase, and for coordinating fulfillment after purchase.

## User Story
As a farmer, I want to receive and respond to customer inquiries so that I can build trust and answer questions about my produce. As a customer, I want to message farmers with questions about production methods, availability, and lead times so that I can make informed purchasing decisions.

## Acceptance Criteria

### For Both Users:
- Messages are delivered and visible within the platform
- Conversation history is preserved and accessible to both parties
- Messages are timestamped
- Both parties can see who is sending each message
- System supports asynchronous messaging (no real-time chat required)

### For Customers (Sending Inquiries):
- Customer can click "Message Farmer" or "Ask Question" from a farmer profile or produce listing
- System displays a message form with farmer name and optional produce reference
- Customer can type a question or message
- Customer can submit the message
- System sends confirmation to customer
- System notifies farmer of new inquiry
- Customer can see farmer's response in their message thread
- Customer can reply to continue the conversation
- Customer can view all conversations with all farmers they've messaged
- Customer can access message thread from produce listing or farmer profile

### For Farmers (Responding to Inquiries):
- Farmer receives notification when a customer sends a message
- Farmer can navigate to "Messages" or "Inbox" section
- Farmer can view list of conversations with customers
- Farmer can click on a conversation to view full message history with that customer
- Farmer can see the customer's message and context (which produce item, if applicable)
- Farmer can type and submit a response message
- System sends message to customer
- Farmer can view conversation history with each customer
- Farmer can respond to multiple customers in parallel
- Farmer can see which messages are new/unread

### General:
- System prevents customers from messaging other customers
- System prevents farmers from messaging other farmers
- System prevents anonymous or non-authenticated users from messaging
- Conversation threads are organized and easily accessible
- Users can find past conversations by farmer name or produce type (search optional)
- No requirement for rich media (photos, documents) in Phase 1

## Priority
High — This is a must-have feature; direct communication is core to the value proposition and essential for building trust in a marketplace without quality certification.

## Dependencies
user-registration, user-login, farmer-profile-management, produce-listing-management
