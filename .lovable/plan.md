

# KYC Verification During Onboarding & Dashboard Alerts

## Overview
Add an optional KYC step to onboarding for agents and landlords, plus persistent KYC reminder banners on provider/seeker dashboards for users who skip it.

## What Changes

### 1. Expand Onboarding to 4 Steps (for agents/landlords only)
- Change the step flow from 3 to 4 steps for `agent` and `landlord` roles (tenants keep 3 steps)
- **New Step 3 — "Verify Your Identity"**: A card-based UI showing what documents are needed (NIN, CAC Certificate for agents; NIN, Property Deed for landlords)
- Include a file upload area (drag-and-drop style placeholder — non-functional until backend is connected) for each document type
- A prominent "Skip for now" option with a note: "You can complete this later, but verified profiles get 3× more leads"
- Update step dots and numbering accordingly
- Move current Step 3 (success screen) to Step 4

### 2. Store KYC Status in localStorage
- Save `dwello_kyc_status: "pending" | "skipped" | "submitted"` so dashboards can read it
- Set to `"submitted"` if they upload docs, `"skipped"` if they skip

### 3. KYC Alert Banner on Provider Dashboard
- Add a dismissible but persistent banner at the top of the provider dashboard when `dwello_kyc_status !== "submitted"`
- Design: amber/warning style card with Shield icon, progress indicator ("1 of 3 documents uploaded"), and a CTA button "Complete Verification" linking to a future KYC page or settings
- Show trust badge benefits: "Verified agents get 3× more leads and appear higher in search"

### 4. KYC Alert Banner on Seeker Dashboard
- Lighter version for tenants — a subtle info banner suggesting identity verification for faster booking approvals
- Can be dismissed permanently (stored in localStorage)

### 5. KYC Status Badge in Sidebar/Header
- Add a small unverified/verified badge next to the user avatar in ProviderLayout and SeekerLayout headers
- Unverified: amber dot or "Unverified" text; Verified: green checkmark

## Files to Create/Edit
- `src/pages/Onboarding.tsx` — Add KYC step, update step logic
- `src/pages/provider/Dashboard.tsx` — Add KYC alert banner
- `src/pages/seeker/Dashboard.tsx` — Add lighter KYC reminder
- `src/components/provider/ProviderLayout.tsx` — Add verification badge
- `src/components/seeker/SeekerLayout.tsx` — Add verification badge
- `src/components/KycAlertBanner.tsx` — Reusable KYC reminder component

## Technical Details
- All state is localStorage-based (no backend yet)
- The KYC step UI will have upload placeholders that are visually complete but non-functional until Lovable Cloud/Supabase storage is connected
- Step count dynamically adjusts: tenants see 3 dots, providers see 4 dots
- Document upload UI uses a dashed-border dropzone pattern with file type icons

