# Detailed Specification: Farmer Order Management

## 1. Screens and UI Components

### Screen: Orders Dashboard
**Path:** `/farmer/orders`

**Layout:**
- Header: "My Orders"
- Filter/Sort bar:
  - Status filter: All | New | Confirmed | Preparing | Ready for Delivery | Completed
  - Date range picker (optional)
  - Sort options: Most Recent | Oldest First
- Order list with columns:
  - Order number (clickable link)
  - Customer name
  - Date placed
  - Status badge (color-coded)
  - Total items count
  - Action buttons: View Details | Message Customer
- Pagination: Show 20 orders per page
- Empty state (if no orders): "No orders yet. Start by listing your produce!"

**Badges/Status Display:**
- 🔵 New: Blue badge
- ✅ Confirmed: Green badge
- 🔄 Preparing: Orange badge
- 📦 Ready for Delivery: Purple badge
- ✔️ Completed: Gray badge

### Screen: Order Detail View
**Path:** `/farmer/orders/{order-id}`

**Layout:**
- Header: Order #{order-number} | Date: {date}
- Customer Card:
  - Customer name
  - Phone number (clickable link or copy icon)
  - Email (clickable link)
  - "Message Customer" button
- Order Summary:
  - Delivery address (full address with city, postal code)
  - Estimated delivery date/window (based on lead time)
  - Order timeline (visual):
    - ✓ Order Placed {timestamp}
    - ○ Confirmed {or pending status update button}
    - ○ Preparing {or pending status update button}
    - ○ Ready for Delivery {or pending status update button}
- Items List:
  - Produce photo (thumbnail)
  - Produce name
  - Quantity ordered
  - Unit price
  - Line total
- Order Total: {total amount}
- Status Update Section:
  - Current status badge
  - Dropdown/buttons to move to next status
  - Button: "Confirm Receipt" (if status is New)
  - Button: "Mark as Preparing" (if status is Confirmed)
  - Button: "Ready for Delivery" (if status is Preparing)
  - Button: "Mark as Completed" (if status is Ready for Delivery)
  - Timestamp of last status update shown
- Back button or link to Orders list

### Screen: Real-Time Notification (Optional)
**Toast/Modal Popup**
- When new order arrives: 
  - "New Order! #{order-number} from {customer-name} for {total-items} items"
  - "Open Order" button (links to order detail)
  - Auto-dismiss after 5 seconds or click X

### Screen: Order History (Completed Orders)
**Path:** `/farmer/orders?status=completed`

**Layout:**
- Same as Orders Dashboard but filtered to completed/delivered orders
- Additional columns:
  - Completion date
  - Customer review rating (if available)

---

## 2. Business Rules

1. **Status Flow**: Orders must transition through states in order: New → Confirmed → Preparing → Ready for Delivery → Completed. No backward transitions allowed.

2. **Notification on Status Change**: Each status change by farmer triggers a notification to customer (in-app and email).

3. **Order Isolation**: Each farmer sees only their own orders. System must enforce this with farmer_id checks on all queries.

4. **Real-Time Notifications**: When customer places order, farmer receives notification within 5 seconds (via WebSocket or polling).

5. **Lead Time Reference**: Lead time shown on order detail is reference from the produce listing at time of order placement. If farmer later changes lead time on their listing, it doesn't affect existing orders.

6. **Delivery Coordination**: Farmer and customer coordinate delivery outside platform (via direct messaging or phone). System shows estimated delivery window but doesn't enforce it.

7. **Order Immutability**: Once order is created, items, quantities, and prices cannot be changed. If customer needs changes, they must place a new order.

8. **No Partial Cancellation**: Farmer cannot cancel individual items from order. If farmer cannot fulfill entire order, farmer must contact customer via messaging and coordinate outside platform.

9. **Delivery Confirmation**: Farmer can mark order as "Ready for Delivery" but customer is responsible for confirming receipt. System can prompt customer to confirm but doesn't auto-complete.

10. **Farmer Contact Privacy**: Customer's phone and email are visible to farmer, but farmer cannot message other farmers or export customer data.

---

## 3. Edge Cases

1. **Order Placed But Payment Processing**: If payment is still processing when farmer views order, system shows status as "Pending" or "Processing" with a note. Farmer should not prepare until status is "Confirmed".

2. **Large Orders**: If customer orders from same farmer multiple times in one cart checkout, does that create one order or multiple? **Answer**: One order per farmer per checkout, combining all items for that farmer.

3. **Produce Runs Out**: If farmer has 10kg tomatoes in stock, customer orders 15kg (because availability status was wrong), farmer discovers this after confirming order. **Action**: Farmer must contact customer via messaging to resolve. System has no mechanism to auto-reject/reduce order quantity.

4. **Farmer Goes Offline**: If farmer never confirms an order, order stays in "New" state indefinitely. Customer sees "Waiting for Farmer Confirmation". No auto-cancellation after X days in Phase 1.

5. **Status Update Timestamp**: If farmer clicks "Mark as Preparing" at 2:00 PM but system processes it at 2:00:02 PM, timestamp stored is 2:00:02 PM (system time, not client time).

6. **Rapid Status Changes**: If farmer clicks "Mark as Preparing" immediately followed by "Ready for Delivery" (within 1 second), both should succeed and create two order_status_history records.

7. **Duplicate Notification**: If farmer views order detail page twice in a row, farmer should not receive new order notification twice. Notification system should track "seen" status.

8. **Order with Deleted Produce**: If farmer deletes a produce listing after order is placed, the order still references the produce item by ID (not by name). Display should handle gracefully: "Tomatoes (Delisted)" or similar.

9. **Farmer Account Suspended**: If farmer account is suspended/banned, existing orders should remain visible but farmer cannot update status. Show message: "Cannot update order status on suspended account."

10. **No Customer Contact**: If customer email/phone is invalid or missing, order still shows but "Message Customer" button is disabled with message "Invalid customer contact".

---

## 4. API Endpoints

### GET /api/v1/farmers/me/orders
**Description:** List all orders for authenticated farmer  
**Auth:** Required  
**Query Parameters:**
- status: "new" | "confirmed" | "preparing" | "ready_for_delivery" | "completed" (optional)
- page: number (default 1)
- limit: number (default 20, max 100)
- sort: "recent" | "oldest" (default recent)

**Response:**
```json
{
  "data": [
    {
      "id": "order-456",
      "order_number": "ORD-000456",
      "customer": {
        "id": "customer-123",
        "name": "Priya Sharma",
        "phone": "+91-9876543210",
        "email": "priya@example.com"
      },
      "status": "new",
      "items": [
        {
          "id": "order-item-1",
          "produce_id": "produce-789",
          "produce_name": "Tomatoes",
          "quantity": 2,
          "unit": "kg",
          "unit_price": 60,
          "total": 120
        }
      ],
      "total_amount": 120,
      "delivery_address": "123 Main St, Bangalore 560001",
      "estimated_delivery_window": "2026-05-06 to 2026-05-07",
      "placed_at": "2026-05-04T10:30:00Z",
      "status_updated_at": "2026-05-04T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45
  }
}
```

### GET /api/v1/farmers/me/orders/{order-id}
**Description:** Get detailed view of specific order  
**Auth:** Required (must be farmer of this order)  
**Response:**
```json
{
  "id": "order-456",
  "order_number": "ORD-000456",
  "customer": {
    "id": "customer-123",
    "name": "Priya Sharma",
    "phone": "+91-9876543210",
    "email": "priya@example.com"
  },
  "status": "new",
  "items": [
    {
      "id": "order-item-1",
      "produce_id": "produce-789",
      "produce_name": "Tomatoes",
      "produce_photo": "https://cdn.example.com/tomatoes.jpg",
      "quantity": 2,
      "unit": "kg",
      "unit_price": 60,
      "total": 120
    }
  ],
  "total_amount": 120,
  "delivery_address": {
    "street": "123 Main St",
    "city": "Bangalore",
    "postal_code": "560001",
    "full_address": "123 Main St, Bangalore 560001"
  },
  "estimated_delivery_window": "2026-05-06 to 2026-05-07",
  "placed_at": "2026-05-04T10:30:00Z",
  "status_history": [
    {
      "status": "new",
      "updated_at": "2026-05-04T10:30:00Z",
      "updated_by": "system"
    }
  ],
  "next_allowed_statuses": ["confirmed"]
}
```

### PUT /api/v1/farmers/me/orders/{order-id}/status
**Description:** Update order status  
**Auth:** Required  
**Request Body:**
```json
{
  "status": "confirmed"
}
```
**Allowed Transitions:**
- new → confirmed
- confirmed → preparing
- preparing → ready_for_delivery
- ready_for_delivery → completed

**Response:** 200 OK with updated order object  
**Error Responses:**
- 400: Invalid status or invalid transition (e.g., new → ready_for_delivery)
- 401: Unauthorized
- 403: Forbidden (farmer trying to update another farmer's order)
- 404: Order not found

---

## 5. Database Tables

### orders
| Column | Type | Nullable | Unique | Constraints |
|--------|------|----------|--------|-------------|
| id | UUID | NO | YES | Primary key |
| order_number | VARCHAR(20) | NO | YES | Unique, human-readable |
| farmer_id | UUID | NO | NO | FK → users.id |
| customer_id | UUID | NO | NO | FK → users.id |
| status | ENUM | NO | NO | 'new', 'confirmed', 'preparing', 'ready_for_delivery', 'completed' |
| total_amount | DECIMAL(10,2) | NO | NO | |
| delivery_address | TEXT | NO | NO | Full address as entered |
| placed_at | TIMESTAMP | NO | NO | |
| status_updated_at | TIMESTAMP | NO | NO | |
| completed_at | TIMESTAMP | YES | NO | |
| created_at | TIMESTAMP | NO | NO | |
| updated_at | TIMESTAMP | NO | NO | |

**Indexes:**
- PRIMARY KEY on (id)
- UNIQUE KEY on (order_number)
- INDEX on (farmer_id, status) for farmer order filtering
- INDEX on (customer_id) for customer orders
- INDEX on (placed_at) for sorting

### order_items
| Column | Type | Nullable | Unique | Constraints |
|--------|------|----------|--------|-------------|
| id | UUID | NO | YES | Primary key |
| order_id | UUID | NO | NO | FK → orders.id |
| produce_id | UUID | NO | NO | FK → produce_listings.id |
| quantity | DECIMAL(10,3) | NO | NO | |
| unit | VARCHAR(20) | NO | NO | 'kg', 'piece', 'bunch', etc. |
| unit_price | DECIMAL(10,2) | NO | NO | Price at time of order |
| created_at | TIMESTAMP | NO | NO | |

**Indexes:**
- PRIMARY KEY on (id)
- INDEX on (order_id) for order detail queries

### order_status_history
| Column | Type | Nullable | Unique | Constraints |
|--------|------|----------|--------|-------------|
| id | UUID | NO | YES | Primary key |
| order_id | UUID | NO | NO | FK → orders.id |
| status | ENUM | NO | NO | Order status value |
| updated_at | TIMESTAMP | NO | NO | |
| updated_by | VARCHAR(50) | NO | NO | 'farmer', 'system', 'customer' |
| notes | TEXT | YES | NO | Optional notes |

**Indexes:**
- INDEX on (order_id, updated_at) for status history timeline

---

## 6. Frontend Components

### OrderDashboardComponent
**Props:**
```typescript
interface OrderDashboardProps {
  farmerId: string;
}
```
**State:**
- orders: Order[]
- loading: boolean
- selectedStatus: string | null
- page: number
- totalPages: number

**Methods:**
- fetchOrders(status?: string, page?: number)
- handleStatusFilter(status: string)
- handlePageChange(page: number)
- handleViewDetails(orderId: string)

### OrderDetailComponent
**Props:**
```typescript
interface OrderDetailProps {
  orderId: string;
  farmerId: string;
  onBack: () => void;
}
```
**State:**
- order: OrderDetail | null
- loading: boolean
- statusUpdating: boolean
- error: string | null

**Methods:**
- fetchOrder()
- handleStatusUpdate(newStatus: string)
- handleMessageCustomer()

### OrderStatusUpdateComponent
**Props:**
```typescript
interface OrderStatusUpdateProps {
  currentStatus: string;
  nextAllowedStatuses: string[];
  onStatusUpdate: (status: string) => Promise<void>;
  loading: boolean;
}
```
**Renders:**
- Current status badge
- Button(s) for allowed next status(es)
- Loading spinner during update
- Error message if update fails

### OrderItemsListComponent
**Props:**
```typescript
interface OrderItemsListProps {
  items: OrderItem[];
  total: number;
}
```
**Renders:**
- Table or card list of items
- Produce photo, name, quantity, unit price, line total

### CustomerCardComponent
**Props:**
```typescript
interface CustomerCardProps {
  customer: {
    name: string;
    phone: string;
    email: string;
    id: string;
  };
  onMessageClick: () => void;
}
```
**Renders:**
- Customer name
- Phone (clickable tel link)
- Email (clickable mailto link)
- Message button

---

## 7. Validation Rules

### Status Update
- **Required**: Yes
- **Rules**:
  - Must be one of allowed next statuses
  - Cannot skip statuses (e.g., confirmed → ready_for_delivery not allowed, must go through preparing first)
  - Error: "Invalid status transition. Please update status in order."

### No Direct Validation on Items/Amounts
- Order items are immutable and should not be validated in this feature
- Validation happens at checkout time

---

## 8. Error States and Handling

### Status Update Failure
**Display:**
- Toast error: "Failed to update order status. Please try again."
- Button remains clickable for retry
- Include error details (network error, permission, etc.) in error log

### Order Not Found
**Display:**
- Error page: "Order not found or you don't have permission to view it."
- Back to orders list button

### Fetch Failure
**Display:**
- Skeleton loaders during initial fetch
- Error message if fetch fails: "Failed to load orders. Please refresh the page."
- Retry button

### Permission Error
**Display:**
- If farmer tries to access another farmer's order:
  - Error: "You don't have permission to view this order."
  - Redirect to own orders list

### Network Disconnection
**Display:**
- If order list fails to load due to network:
  - Error: "Unable to connect. Check your internet and try again."
  - Show last cached orders if available (offline support optional for Phase 1)

---

## 9. Real-Time Notifications

### New Order Notification
**When:** Customer completes checkout for this farmer's produce
**Delivery Method:** 
- In-app toast/modal (if farmer is on platform)
- Push notification (if supported)
- Email (async, within 1 minute)

**Content:**
- "New Order! Order #{order-number} from {customer-name}"
- Link to order detail page
- Auto-dismiss after 5 seconds

**Implementation:** WebSocket or Server-Sent Events (SSE) for real-time delivery

### Status Update Notification (Sent to Customer)
**When:** Farmer updates order status
**Delivery Method:**
- In-app notification (customer dashboard)
- Email

**Content:**
- "Your order #{order-number} status: {status}"
- Link to order tracking page

---

## 10. Additional Considerations

### Audit Trail
- Log all status changes in order_status_history table
- Include timestamp and who made the change (farmer_id)

### Idempotency
- If farmer clicks "Confirm" button twice rapidly, system should handle gracefully
- Implement idempotency key or state check to prevent duplicate status updates

### Scalability
- Orders list may grow large; ensure pagination and indexing support efficient queries
- Consider caching "new" orders count for quick display on dashboard

### Farmer Workload
- Consider notification digest feature (future): "Daily digest of orders" instead of individual notifications
- Show unread order count badge on nav

