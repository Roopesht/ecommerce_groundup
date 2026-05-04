# Detailed Specification: Farmer Profile Management

## 1. Screens and UI Components

### Screen: Profile Creation/Editing
**Path:** `/farmer/profile` (edit) or `/farmer/profile/create` (first-time setup)

**Layout:**
- Header: "Create Farmer Profile" or "Edit My Profile"
- Form with fields:
  - **Location** (required)
    - Dropdown: Select city (Bangalore or Cochin)
    - Text input: Village/area name
  - **Farming Practices** (required)
    - Textarea: Long-form description (max 2000 characters)
    - Placeholder text: "Describe your organic methods, sustainable practices, techniques..."
  - **Certifications/Credentials** (optional)
    - Textarea: Self-reported certifications (max 1000 characters)
    - Placeholder: "e.g., Organic certified by [body], Biodynamic, others..."
  - **Story/Bio** (optional)
    - Textarea: Personal story (max 2000 characters)
    - Placeholder: "Tell customers about yourself and your farm..."
  - **Profile Photo** (optional)
    - Image upload field
    - Accepted formats: JPG, PNG
    - Max file size: 5MB
    - Preview: Show thumbnail after upload
- Buttons:
  - "Save Profile" (primary)
  - "Cancel" (secondary)
- Success message: Toast notification "Profile saved and is now visible to customers"

### Screen: Public Farmer Profile (Customer View)
**Path:** `/farmers/{farmer-id}`

**Layout:**
- Header with profile photo (circular, 200x200px)
- Farmer name (heading)
- Location badge: "📍 City, State"
- Star rating and review count
- Sections (in order):
  - **About This Farmer**
    - Farming practices (text)
    - Story/Bio (text)
    - Certifications (if provided)
  - **Current Listings** (grid of produce items)
  - **Reviews** (list of customer reviews with ratings)
- Buttons:
  - "Message Farmer" (if customer logged in)
  - "View All Listings"

### Screen: Farmer Dashboard (Farmer View)
**Path:** `/farmer/dashboard`

**Layout:**
- Sidebar navigation
- Profile card (compact):
  - Profile photo thumbnail
  - Farmer name
  - Location
  - Edit button
  - View public profile link
- Quick stats:
  - Total reviews
  - Average rating
  - Active listings
  - Total orders

---

## 2. Business Rules

1. **Location Constraint**: Farmer must select from predefined list (Bangalore or Cochin only); no free-text entry.
2. **Mandatory Fields**: Location and Farming Practices are required; others are optional.
3. **Visibility**: Profile is live and searchable immediately after save; no manual approval required.
4. **Edit Permissions**: Farmer can only edit their own profile; system must verify farmer_id matches authenticated user.
5. **Photo Management**: If farmer uploads a new photo, old photo should be replaced (not versioned).
6. **Character Limits**:
   - Farming Practices: max 2000 characters
   - Certifications: max 1000 characters
   - Story/Bio: max 2000 characters
7. **Profile Completion**: System should not prevent profile save if optional fields are empty.
8. **Indexing**: Profile changes must be indexed for search within 1 minute.

---

## 3. Edge Cases

1. **No Profile Photo**: Profile should be complete and visible without a photo; photo is optional.
2. **Duplicate Location**: If farmer enters the same city twice (e.g., "Bangalore, Bangalore"), system should handle gracefully (store only city, ignore duplicate village entry).
3. **Long Text**: If farmer enters very long farming practices description, system must truncate for display on public profile card (show first 100 chars + "...") but store full text.
4. **Special Characters**: Farmer bio may contain Unicode characters (Tamil, Kannada scripts if supported in future); system must accept and display correctly.
5. **Photo Format Mismatch**: If farmer uploads a file that looks like an image but isn't (e.g., file.jpg that's actually text), system should reject with clear error.
6. **Profile Edit Collision**: If farmer has profile open in two browser tabs and edits in both, last save wins (no conflict resolution needed for Phase 1).
7. **Rapid Edits**: If farmer rapidly saves profile multiple times (e.g., 5 times in 10 seconds), system should handle gracefully; only the last version should be stored.
8. **Missing Photo on Edit**: If farmer previously uploaded a photo and now edits profile without changing it, system should retain old photo.

---

## 4. API Endpoints

### GET /api/v1/farmers/{farmer-id}
**Description:** Retrieve farmer profile (public view)  
**Auth:** Optional (works for logged-in and anonymous users)  
**Response:**
```json
{
  "id": "farmer-123",
  "name": "Ramesh Kumar",
  "location": {
    "city": "Bangalore",
    "village": "Whitefield"
  },
  "farming_practices": "We practice organic farming...",
  "certifications": "Certified by XYZ",
  "story": "Started farming in 2010...",
  "photo_url": "https://cdn.example.com/photos/farmer-123.jpg",
  "rating": 4.5,
  "review_count": 23,
  "created_at": "2026-01-15T10:30:00Z",
  "updated_at": "2026-04-20T14:15:00Z"
}
```

### PUT /api/v1/farmers/{farmer-id}/profile
**Description:** Update farmer profile  
**Auth:** Required (farmer must own profile)  
**Request Body:**
```json
{
  "location": {
    "city": "Bangalore",
    "village": "Whitefield"
  },
  "farming_practices": "We practice organic farming...",
  "certifications": "Certified by XYZ",
  "story": "Started farming in 2010...",
  "photo": "base64-encoded image or file"
}
```
**Response:** 200 OK with updated profile object  
**Error Responses:**
- 400: Validation error (missing required field, invalid city, file too large)
- 401: Unauthorized (user not authenticated)
- 403: Forbidden (user trying to edit another farmer's profile)
- 413: Payload too large (file > 5MB)

### GET /api/v1/farmers/me/profile
**Description:** Retrieve current authenticated farmer's own profile  
**Auth:** Required  
**Response:** Profile object (same as GET /api/v1/farmers/{farmer-id})

---

## 5. Database Tables

### farmers_profiles
| Column | Type | Nullable | Unique | Constraints |
|--------|------|----------|--------|-------------|
| id | UUID | NO | YES | Primary key |
| farmer_id | UUID | NO | YES | FK → users.id |
| location_city | ENUM | NO | NO | 'Bangalore', 'Cochin' |
| location_village | VARCHAR(255) | YES | NO | |
| farming_practices | TEXT | NO | NO | |
| certifications | TEXT | YES | NO | |
| story | TEXT | YES | NO | |
| photo_url | VARCHAR(512) | YES | NO | CDN path |
| created_at | TIMESTAMP | NO | NO | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | NO | NO | DEFAULT CURRENT_TIMESTAMP |
| is_deleted | BOOLEAN | NO | NO | DEFAULT FALSE (soft delete) |

**Indexes:**
- PRIMARY KEY on (farmer_id)
- INDEX on (location_city, location_village) for discovery queries
- INDEX on (created_at) for sorting/pagination
- INDEX on (updated_at) for recent edits

---

## 6. Frontend Components

### ProfileFormComponent
**Props:**
```typescript
interface ProfileFormProps {
  farmerId: string;
  initialData?: FarmerProfile;
  onSuccess: () => void;
  onCancel: () => void;
}
```
**State:**
- formData: { location, farming_practices, certifications, story, photo }
- photoPreview: string (base64 or URL)
- loading: boolean
- errors: Record<string, string>

**Methods:**
- handleCityChange(city: string)
- handleVillageChange(village: string)
- handleTextChange(field: string, value: string)
- handlePhotoUpload(file: File)
- handleSubmit()
- handleCancel()

### PhotoUploadComponent
**Props:**
```typescript
interface PhotoUploadProps {
  onPhotoSelected: (file: File) => void;
  currentPhotoUrl?: string;
  maxSizeMB?: number;
}
```
**Functionality:**
- Drag-and-drop zone
- Click-to-browse file selector
- Preview thumbnail
- Show file size and validation errors

### PublicProfileComponent
**Props:**
```typescript
interface PublicProfileProps {
  farmerId: string;
}
```
**Renders:**
- Profile photo
- Farmer name and location
- Rating and reviews count
- Farming practices, story, certifications (expandable)
- Current listings grid
- Recent reviews list
- Message farmer button

---

## 7. Validation Rules

### Location
- **Required**: Yes
- **Rules**:
  - City must be one of: "Bangalore", "Cochin"
  - Village: max 255 characters, alphanumeric + spaces + hyphens only
  - Error: "Please select a valid city and enter a village name"

### Farming Practices
- **Required**: Yes
- **Rules**:
  - Min 10 characters
  - Max 2000 characters
  - Must not be empty or whitespace-only
  - Error: "Describe your farming practices (10–2000 characters)"

### Certifications
- **Required**: No
- **Rules**:
  - Max 1000 characters if provided
  - Alphanumeric, spaces, commas, hyphens
  - Error: "Certifications must be under 1000 characters"

### Story
- **Required**: No
- **Rules**:
  - Max 2000 characters if provided
  - Alphanumeric, spaces, punctuation
  - Error: "Story must be under 2000 characters"

### Photo
- **Required**: No
- **Rules**:
  - Format: JPG, JPEG, PNG only
  - Max size: 5MB
  - Min dimensions: 200x200px
  - Max dimensions: 5000x5000px
  - Errors:
    - "Only JPG, JPEG, and PNG files are accepted"
    - "File size must be under 5MB"
    - "Image must be at least 200x200px"

---

## 8. Error States and Handling

### Validation Errors
**Display:** Inline error messages under each field
```
Location City: [Dropdown] ⚠️ City is required
Village: [Text input] ⚠️ Village name required
Farming Practices: [Textarea] ⚠️ Minimum 10 characters required
```

### Network Errors
**On Save Failure:**
- Toast notification: "Failed to save profile. Please try again."
- Retry button: Resend request with current form data
- Error persists for 5 seconds then dismisses
- Form data is retained (not cleared)

### Permission Errors
**If farmer tries to edit another farmer's profile:**
- Error message: "You don't have permission to edit this profile"
- Redirect to own profile after 3 seconds

### File Upload Errors
**Photo too large:**
- Error: "File size exceeds 5MB. Please choose a smaller image."
- Clear file input, retain other form data

**Invalid format:**
- Error: "Please upload a JPG or PNG file"
- Clear file input, retain preview of previous photo

### Concurrent Edit
**If profile is being edited in another tab:**
- On save: Show warning dialog
- Message: "Your profile was recently updated. Refresh to see latest changes."
- Options: [Reload] [Keep My Changes]

---

## 9. Additional Considerations

### Photo Storage
- Upload to S3 or CDN
- Generate thumbnail (200x200px, 100x100px)
- Store original URL in profile_photo_url
- Use CDN with caching headers for performance

### Search Indexing
- After profile save, update search index (Elasticsearch or similar)
- Index fields: farmer_name, location_city, location_village, farming_practices
- Make searchable within 60 seconds

### Notifications
- No notification to other users on profile creation/edit
- Farmer receives confirmation message in UI

### Audit Trail
- Log all profile edits with timestamp and user ID
- Store in audit_logs table for compliance
- Farmer cannot see audit logs (not in scope for Phase 1)

