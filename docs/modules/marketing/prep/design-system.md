# Design System: Marketing Module

**Status:** COMPLETE  
**Module:** Marketing (Core Marketplace Platform)  
**Date:** 2026-05-04  
**Aesthetic:** Neo-Minimalism with Organic, Farm-to-Table Authenticity

---

## Overview

This design system emphasizes **transparency, authenticity, and simplicity**. The visual language reflects the module's core purpose: connecting farmers directly to conscious consumers. The design should feel clean, purposeful, and human—not corporate or sterile. Natural textures, organic typography, and an earthy color palette evoke trust and sustainability.

---

## 1. Typography

### Font Stack

**Headings (h1–h4):** Serif font with organic, slightly imperfect character  
- Font family: `Lora`, `Georgia`, or similar serif (warm, approachable)
- Fallback: `system-ui`

**Body & UI Text:** Clean, approachable sans-serif  
- Font family: `Inter`, `Poppins`, or similar (friendly, readable)
- Fallback: `system-ui`

**Monospace (rare):** For order IDs, payment references  
- Font family: `Monaco`, `Courier New`, or system monospace

---

### Scale & Weights

| Element       | Size    | Weight | Line Height | Usage                          |
|---------------|---------|--------|-------------|--------------------------------|
| h1 (Page heading) | 32px   | 600    | 1.2         | Page titles                    |
| h2 (Section)  | 24px    | 600    | 1.3         | Card headings, section titles  |
| h3 (Sub-section) | 20px  | 600    | 1.3         | Form headings, modal titles    |
| h4 (Minor)    | 16px    | 600    | 1.4         | Field labels, small headings   |
| Body          | 14px    | 400    | 1.6         | Paragraph text, descriptions  |
| Small         | 12px    | 400    | 1.5         | Secondary text, hints          |
| Caption       | 11px    | 400    | 1.4         | Timestamps, metadata          |

---

## 2. Colour Palette

### Primary Colours (Organic Greens)

| Name          | Hex       | Tailwind       | Purpose                  |
|---------------|-----------|----------------|--------------------------|
| Sage Green    | `#6B8E5F` | `emerald-700`  | Primary action, links    |
| Moss Green    | `#7A9B6F` | `emerald-600`  | Hover states, depth      |
| Light Sage    | `#C8D5B5` | `emerald-100`  | Backgrounds, disabled    |

### Secondary Colours (Earthy Tones)

| Name          | Hex       | Tailwind       | Purpose                  |
|---------------|-----------|----------------|--------------------------|
| Terracotta    | `#C85A54` | `orange-600`   | Highlights, secondary action |
| Warm Beige    | `#E8D5C4` | `amber-50`     | Card backgrounds, warmth |
| Kraft Brown   | `#A0826D` | `amber-700`    | Text accents, borders    |

### Vibrant Food Colours (Accent)

| Name              | Hex       | Purpose               |
|-------------------|-----------|------------------------|
| Tomato Red        | `#E63946` | Error, warnings       |
| Carrot Orange     | `#FF8C42` | Special offers        |
| Aubergine Purple  | `#4A1E4B` | Premium tier, rarity  |
| Leafy Green       | `#2D5C2D` | Success, in-stock     |

### Semantic Colours

| State       | Hex       | Purpose                 |
|-------------|-----------|-------------------------|
| Success    | `#2D5C2D` | Approved orders, in stock |
| Error      | `#E63946` | Failed orders, out of stock |
| Warning    | `#FF8C42` | Limited availability, alerts |
| Info       | `#4A90E2` | Informational messages  |

### Neutral Palette

| Element      | Hex       | Tailwind         |
|--------------|-----------|------------------|
| White        | `#FFFFFF` | `white`          |
| Cream        | `#FEFDFB` | `slate-50`       |
| Light Gray   | `#F3F4F6` | `gray-100`       |
| Medium Gray  | `#D1D5DB` | `gray-300`       |
| Dark Gray    | `#6B7280` | `gray-500`       |
| Charcoal     | `#374151` | `gray-700`       |
| Black        | `#1F1F1F` | `gray-900`       |

### Premium Accent (Optional for High-Value Items)

| Name  | Hex       | Purpose              |
|-------|-----------|----------------------|
| Gold  | `#D4AF37` | Premium farmer badge |

---

### Colour Application (60-30-10 Rule)

- **60%:** Neutral (cream, whites, light gray) — breathing room, clean backgrounds
- **30%:** Primary sage/moss green — main content, sections, key interactions
- **10%:** Secondary accents (terracotta, warm beige, vibrant colors) — highlights, CTAs

---

## 3. Spacing

### Base Unit
`8px` — All margins, padding, and gaps use multiples of 8px.

### Spacing Scale

| Token   | Value  | Usage                          |
|---------|--------|--------------------------------|
| xs      | 4px    | Tight spacing (rare)           |
| sm      | 8px    | Icon-to-text, tight paddings   |
| md      | 16px   | Standard padding, margins      |
| lg      | 24px   | Section spacing, card gaps     |
| xl      | 32px   | Large section spacing          |
| 2xl     | 48px   | Page-level spacing             |
| 3xl     | 64px   | Major sections, hero spacing   |

### Common Patterns

- **Card padding:** 24px (lg)
- **Input padding:** 12px horizontal, 8px vertical
- **Button padding:** 12px horizontal, 8px vertical
- **Section gap:** 32px (xl)
- **Grid gap:** 24px (lg)

---

## 4. Border Radius

Follows neo-minimalism: subtle, purposeful rounding without excessive curves.

| Element             | Value | Purpose                      |
|---------------------|-------|------------------------------|
| Buttons, Inputs     | 8px   | Standard rounded corners     |
| Cards, Modals       | 12px  | Slightly more prominent      |
| Small elements      | 4px   | Tight, subtle rounding       |
| Avatars, Images     | 50%   | Fully circular               |

---

## 5. Shadows

Subtle elevation to maintain neo-minimalist clarity while creating depth.

| Level | CSS                                       | Usage                      |
|-------|-------------------------------------------|----------------------------|
| None  | None                                      | Flat elements, inputs      |
| sm    | `0 1px 2px rgba(0,0,0,0.05)`             | Subtle hover states        |
| md    | `0 4px 6px rgba(0,0,0,0.1)`              | Cards, dropdowns           |
| lg    | `0 10px 15px rgba(0,0,0,0.15)`           | Modals, overlays           |

---

## 6. Core Components

### Layout Components

- **Header / Navigation Bar**
  - Height: 64px
  - Logo + farmer/customer toggle + user menu
  - Sticky on scroll

- **Page Container**
  - Max-width: 1200px
  - Centered on desktop, full-width on mobile
  - Padding: 32px (xl) horizontal on desktop, 16px on mobile

- **Card**
  - Background: Warm beige (#E8D5C4) or white
  - Padding: 24px (lg)
  - Border radius: 12px
  - Shadow: md
  - Used for: farmer profiles, produce listings, reviews

- **Sidebar / Profile Panel**
  - Width: 280px (collapsible on mobile)
  - Background: Light sage (#C8D5B5) or white
  - Padding: 16px (md)
  - For: farmer profile summary, order filters

---

### Input Components

- **Button**
  - Height: 40px
  - Padding: 12px 24px
  - Border radius: 8px
  - Primary: Sage green (#6B8E5F)
  - Secondary: Outline variant with Kraft brown border
  - Ghost: Text-only, no background
  - Hover: Shade darker (Moss green #7A9B6F)
  - Disabled: Light sage (#C8D5B5) with reduced opacity

- **Text Input / Textarea**
  - Height: 40px (input), min 80px (textarea)
  - Padding: 8px 12px
  - Border: 1px solid Kraft brown (#A0826D)
  - Border radius: 8px
  - Focus: Border color changes to Sage green
  - Background: White or Cream (#FEFDFB)
  - Placeholder: Dark gray (#6B7280)

- **Select / Dropdown**
  - Same sizing as text input
  - Dropdown menu background: Cream
  - Hover item: Light sage background

- **Checkbox / Radio**
  - Accent color: Sage green (#6B8E5F)
  - Size: 16px × 16px

- **DatePicker**
  - Calendar overlay with Cream background
  - Selected date: Sage green background
  - Current day: Border highlight

- **File Upload**
  - Dashed border, Kraft brown
  - Drag-and-drop area
  - Icon + "Upload" text centered

---

### Feedback Components

- **Toast / Alert**
  - Positioned: Bottom-right, with 16px margin
  - Padding: 16px
  - Border radius: 8px
  - Success: Green background with dark text
  - Error: Red background with white text
  - Warning: Orange background with dark text
  - Auto-dismiss: 4 seconds

- **Badge**
  - Display availability status
  - "In Stock" → Green (#2D5C2D)
  - "Limited" → Orange (#FF8C42)
  - "Out of Stock" → Red (#E63946)
  - Padding: 4px 8px
  - Border radius: 4px
  - Font size: 11px

- **Spinner / Loading**
  - Colour: Sage green (#6B8E5F)
  - Size: 32px (default)

---

### Data Display Components

- **Product Card**
  - Image: Full-width, 200px height
  - Content: 24px padding
  - Farmer name: 14px, bold
  - Produce name: 16px, bold
  - Price: 18px, Sage green
  - Lead time: 12px, secondary text
  - Hover: Subtle shadow increase, cursor pointer

- **Farmer Card**
  - Avatar: 64px, circular
  - Name: h4 (16px, bold)
  - Location: 12px, secondary text
  - Rating: Star icon + score (14px)
  - Review count: 12px, gray
  - CTA button: "View Profile"

- **Review Card**
  - Reviewer name: 14px, bold
  - Star rating: 5-star display
  - Review text: 14px
  - Date: 11px, secondary text
  - Border-bottom: Light gray separator

- **Order Table**
  - Header: Sage green background (#6B8E5F), white text
  - Rows: Alternating white / light gray
  - Padding: 12px per cell
  - Status column: Use badges (in-stock colors)

- **Pagination**
  - Page numbers: 14px, centered
  - Active page: Sage green background
  - Previous/Next: Secondary buttons

- **Empty State**
  - Centered icon (64px)
  - Heading: 20px, bold
  - Description: 14px, secondary text
  - CTA button below

---

### Overlay Components

- **Modal / Dialog**
  - Backdrop: Transparent black (rgba(0,0,0,0.5))
  - Modal body: White, border radius 12px
  - Padding: 32px (xl)
  - Shadow: lg
  - Header: 24px heading + close button (top-right)
  - Footer: Action buttons right-aligned

- **Sheet (Mobile Slide-up)**
  - From bottom on mobile
  - White background, border-radius 12px top
  - Swipe to close

- **Dropdown Menu**
  - White background
  - Border: 1px solid Medium gray (#D1D5DB)
  - Shadow: md
  - Items: 40px height, 16px padding
  - Hover: Light gray background

---

### Communication Components

- **Chat / Message Thread**
  - User messages: Right-aligned, Sage green background
  - Farmer messages: Left-aligned, Light gray background
  - Padding: 12px 16px
  - Border radius: 8px
  - Timestamp: 11px, secondary text below message
  - Input area: Text input + send button (same as primary button)

---

### Form Components

- **Farmer Profile Form**
  - Layout: 1 column on mobile, up to 2 columns on desktop
  - Section headings: 20px
  - Field spacing: 16px vertical gap
  - Help text below fields: 12px, secondary text
  - Submit button: Full-width on mobile, auto-width on desktop

- **Produce Listing Form**
  - Similar to profile form
  - Photo upload: Prominent, with preview thumbnails
  - Lead time field: Select dropdown (1 day, 2-3 days, 1 week, etc.)
  - Availability: Radio buttons

- **Checkout Form**
  - Order summary: Light sage background card
  - Delivery address: 2 columns on desktop
  - Payment info: Secure, concise fields
  - Final CTA: "Place Order" button, full-width

---

## 7. Icon Set

**Library:** Heroicons or Feather Icons (clean, minimal, 24px default)

**Common icons:**
- Search: Magnifying glass
- Menu: Hamburger
- Close: X
- Back: Chevron left
- Filter: Funnel
- Heart / Wishlist: Heart
- Star (rating): Star
- Pin (location): Map pin
- Clock (lead time): Clock
- Message / Chat: Message square
- Cart: Shopping cart
- Checkmark (success): Check circle
- X (error): X circle
- Info: Info icon
- Upload: Upload cloud

**Sizing:**
- Small: 16px (for labels)
- Default: 24px (within buttons, menus)
- Large: 32px (hero/empty state icons)

---

## 8. Responsive Breakpoints

Mobile-first design. Build for mobile, then enhance for larger screens.

| Breakpoint | Width   | Device          |
|------------|---------|-----------------|
| Mobile     | < 640px | Phones          |
| Tablet     | 640px+  | iPads, small tablets |
| Desktop    | 768px+  | Laptops, desktops |
| Wide       | 1024px+ | Large monitors  |

### Layout Adjustments

- **Mobile:**
  - Single column layouts
  - Full-width cards with 16px margins
  - Hamburger menu for navigation
  - Bottom navigation for key actions (Cart, Home, Profile)
  - Modals slide up from bottom (sheet style)

- **Desktop (768px+):**
  - Multi-column grids (2–3 columns)
  - Sidebar navigation / profile panel visible
  - Modals centered on screen
  - Horizontal navigation menu

---

## 9. Interaction & Animation

### Transitions

- **Hover states:** 200ms ease
  - Buttons darken or lift (shadow increase)
  - Cards lift with shadow increase
  - Links underline or change color

- **Focus states:** Clear focus ring (2px solid Sage green)

### Micro-interactions

- **Loading spinner:** Smooth 360° rotation, 1s loop
- **Toast notifications:** Fade in (200ms), auto-fade out (4s, 200ms fade)
- **Hover on cards:** Shadow increase + slight 2px scale up
- **Button press:** Active state (darker color) for 100ms, then return

---

## 10. Accessibility (WCAG 2.1 AA)

- **Colour contrast:** All text meets 4.5:1 contrast ratio (normal text) and 3:1 (large text)
- **Focus indicators:** Visible on all interactive elements (2px solid sage green ring)
- **Form labels:** Always associated with inputs (`<label for="...">`)
- **ARIA roles:** Modals, alerts, status updates have proper roles
- **Keyboard navigation:** All interactive elements reachable via Tab
- **Alt text:** All images have descriptive alt text
- **Semantic HTML:** Proper heading hierarchy, semantic elements (nav, main, etc.)

---

## 11. Dark Mode (Optional Future)

If dark mode is added, use:
- **Primary background:** `#1F1F1F` (Black)
- **Secondary background:** `#2D2D2D` (Charcoal)
- **Text:** `#FEFDFB` (Cream) for primary, `#D1D5DB` (Medium gray) for secondary
- **Accent:** Sage green remains `#6B8E5F` (sufficient contrast on dark)

---

## 12. Usage Notes

### For Developers

- Use CSS variables (custom properties) to maintain consistency:
  ```css
  :root {
    --color-sage: #6B8E5F;
    --color-moss: #7A9B6F;
    --color-beige: #E8D5C4;
    --spacing-base: 8px;
    --radius-default: 8px;
    --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  }
  ```

- Consider using a CSS-in-JS solution (styled-components, Emotion) or Tailwind CSS with custom config for consistency.

### For Designers

- **Texture & Photography:** Use real product photography (not stock images) to emphasize authenticity. Show the actual produce, farmer hands in soil, etc.
- **Whitespace:** Embrace generous whitespace (60% neutral per 60-30-10 rule). Avoid cramped layouts.
- **Imperfection:** Slightly organic, hand-drawn elements are encouraged (serif fonts, subtle grain textures) to feel human, not corporate.

---

## 13. Component Library

This design system is intended to be implemented as a reusable component library (React components, Web Components, or similar). Each component should:

1. Follow the above specifications
2. Be documented with props/usage examples
3. Include states (default, hover, active, disabled, loading)
4. Have accessibility built in (ARIA, keyboard nav, focus states)
5. Support theming (color, spacing via CSS variables)

---

**This design system is the source of truth for the Marketing module's visual identity. All UI implementations should conform to these specifications.**
