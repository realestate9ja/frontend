

# Agent/Landlord Response Flow — "Send Offer" Experience

## Problem
Currently, the "Send Offer" and "View Details" buttons in the Provider Lead Inbox (`/provider/inbox`) are static — clicking them does nothing. There's no flow for agents/landlords to actually respond to a tenant's posted need.

## What We'll Build

### 1. Lead Detail Page (`/provider/inbox/:id`)
A dedicated page showing the full tenant request with:
- Complete need details (property type, budget, location, features, move-in date, urgency)
- Tenant profile snippet (anonymized name, verification status, response rate)
- A timeline showing when the need was posted and SLA countdown
- "Send Offer" CTA that opens the offer composer

### 2. Send Offer Modal/Sheet
A slide-up sheet (or dialog) where the agent composes their offer:
- **Select a listing** — dropdown of their existing listings to match against the need
- **Offer price** — input with the ability to set custom pricing
- **Availability** — move-in date confirmation
- **Cover message** — textarea for a personalized pitch to the tenant
- **Attach photos** — placeholder for property images (non-functional until backend)
- **Submit** button that updates the lead status to "Responded" and shows a success toast

### 3. Updated Lead Inbox
- "Send Offer" button opens the offer composer sheet
- "View Details" button navigates to the lead detail page
- After responding, the lead card updates to show "Offer Sent" state with timestamp

### 4. Seeker Side — Offer Appears in `/seeker/offers`
- The existing Offers page already shows incoming offers — this completes the loop conceptually
- Add a "View Request" link on each offer card so seekers can reference their original need

## Files to Create/Edit
- **Create** `src/pages/provider/LeadDetail.tsx` — full lead detail page
- **Create** `src/components/provider/SendOfferSheet.tsx` — offer composer sheet component
- **Edit** `src/pages/provider/Inbox.tsx` — wire up buttons, add state management
- **Edit** `src/App.tsx` — add `/provider/inbox/:id` route
- **Edit** `src/pages/seeker/Offers.tsx` — add "View Original Request" link on offer cards

## Technical Details
- All data remains mock/localStorage-based (no backend)
- Use shadcn Sheet component for the offer composer
- Lead status updates stored in React state (resets on refresh until backend is connected)
- Route: `/provider/inbox/:id` using React Router params

