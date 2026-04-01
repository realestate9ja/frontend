

# Dwello Landing Page — Pixel-Perfect Clone

## Overview
Build an exact replica of the Dwello real estate landing page from the uploaded screenshot. Every section, color, spacing, and detail will be matched as closely as possible.

## Sections & Components (top to bottom)

### 1. Navbar (`src/components/Navbar.tsx`)
- Logo: "Dwello" with purple house icon
- Links: Rent, Buy, Sell, Manage Property (dropdown arrow), Resources (dropdown arrow)
- Right: "Login" text link, purple "Sign up" button (rounded)

### 2. Hero (`src/components/Hero.tsx`)
- Left: Large bold heading "Buy, rent, or sell your property easily", subtitle paragraph
- Rent/Buy/Sell tab switcher (underline active on Rent)
- Search bar: Location "Barcelona, Spain" + "Select Move-in Date" with calendar icon + purple "Browse Properties" button
- Stats: "50k+ renters" with icon, "10k+ properties" with icon
- Right: Property card stack with house image, "Minal Villa" card overlay, price "$1,500", "Excellent" trust badge with 5 stars

### 3. Features (`src/components/Features.tsx`)
- Left column: "The new way to find your new home" heading, subtitle, house image with purple "Browse Properties" button overlay
- Right 2x2 grid: Property Insurance, Best Price, Lowest Commission, Overall Control — each with circular purple icon, title, description

### 4. Property Listings (`src/components/PropertyListings.tsx`)
- Heading: "Based on your location", subtitle
- Tabs: Rent (active, purple), Buy, Sell, Search icon
- 2x3 grid of property cards: image, "POPULAR" purple badge, price/month, heart icon, property name, address, beds/baths/sqft icons
- Purple outlined "Browse more properties" button centered

### 5. Value Proposition (`src/components/ValueProposition.tsx`)
- Dark navy background section
- Left: "We make it easy for **tenants** and **landowners**." (italic on key words)
- Right: description paragraph
- Horizontal scrollable cards: "Virtual home tour" (purple bg), "Find the best deal" (white bg), third card partially visible
- Stats row: 7.4% Property Return Rate | 3,856 Property in Sell & Rent | 2,540 Daily Completed Transactions

### 6. Newsletter (`src/components/Newsletter.tsx`)
- "No Spam Promise" purple badge
- "Are you a landowner?" heading, subtitle
- Email input + purple "Submit" button
- Small text below about subscribers

### 7. Footer (`src/components/Footer.tsx`)
- Logo "Dwello", columns: SELL A HOME, BUY A HOME, BUY RENT OWNER, TERMS & PRIVACY, ABOUT, RESOURCES
- Copyright line, social icons (Facebook, Instagram, Twitter, LinkedIn)

## Design Tokens
- Primary purple: `#7C3AED` / `#6C3AEF` (violet-600 range)
- Dark section bg: `#1A1046` / `#0F0A2A`
- Body text: `#6B7280` (gray-500)
- Headings: `#1F2937` (gray-800/900)
- Card shadows: subtle `shadow-md`
- Border radius: `rounded-lg` on cards, `rounded-full` on badges/buttons
- Font: system sans-serif (Inter-like)

## File Structure
```
src/components/Navbar.tsx
src/components/Hero.tsx
src/components/Features.tsx
src/components/PropertyListings.tsx
src/components/ValueProposition.tsx
src/components/Newsletter.tsx
src/components/Footer.tsx
src/pages/Index.tsx (assembles all sections)
src/index.css (updated CSS variables for purple primary)
```

## Images
- Property photos: Unsplash URLs for houses/real estate
- Icons: Lucide React icons (Home, Search, Calendar, Heart, Bed, Bath, Maximize, Shield, DollarSign, etc.)

## Key Details to Match
- Purple gradient/solid buttons with white text
- "POPULAR" badges positioned top-left on property images
- Heart favorite icons top-right on property cards
- Stats with vertical dividers in the value proposition
- Exact card layouts with price, name, address, and amenity icons
- Trust badge with star rating in hero section
- Property card preview overlapping the hero image on the right

