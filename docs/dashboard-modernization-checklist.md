# Dashboard Modernization Checklist

## Status Key
- `[x]` done
- `[-]` in progress
- `[ ]` pending

## Goal
- Move the dashboard UI from a collection of decent pages to one product system.
- Standardize layout grammar, control placement, widget anatomy, settings structure, loading states, and status language.

## Design Direction
- Calm enterprise product UI
- Flatter surfaces
- Clearer density rules
- Fewer decorative containers
- Stronger data-first hierarchy
- Consistent light and dark theme behavior

## Core Rules

### Page Anatomy
- Use one dashboard page structure everywhere:
  - page header
  - optional KPI strip
  - control row
  - primary content
  - optional secondary content
- Keep the primary CTA in the page header, not the control row.

### Control Row
- Left side:
  - tabs or segmented state controls
- Right side:
  - search
  - filter
  - optional view switch
- Keep this pattern consistent across all data-heavy pages.

### Surface Types
- Only use these surface categories:
  - `DashboardStatCard`
  - `DashboardSectionCard`
  - `DataCard`
  - `DataTable`
  - `DashboardSettingsSection`

### Status System
- Use only these shared semantic tones:
  - `neutral`
  - `info`
  - `success`
  - `warning`
  - `danger`
- Avoid page-local badge color logic unless the case is genuinely unique.

### Widget Rules
- Widget anatomy:
  - title
  - optional one-line description
  - body
  - optional small footer action
- Remove duplicate control systems and heavy widget chrome.

### Settings Rules
- Settings pages should be row-based, not KPI-card-based.
- Each section should contain:
  - section title
  - section description
  - stack of setting rows
- Use the same layout across admin, provider, seeker, and landlord.

## Exact Components To Rebuild

### Shared Dashboard Primitives
- [x] `src/components/dashboard/DashboardPageHeader.tsx`
- [x] `src/components/dashboard/DashboardControlRow.tsx`
- [x] `src/components/dashboard/DashboardStatusBadge.tsx`
- [x] `src/components/dashboard/DashboardEmptyState.tsx`
- [x] `src/components/dashboard/DashboardSettingsSection.tsx`
- [x] `src/components/dashboard/DashboardSectionCard.tsx`
- [x] `src/components/dashboard/DashboardStatCard.tsx`
- [x] `src/components/dashboard/DashboardRecordItem.tsx`
- [x] `src/components/dashboard/DashboardSectionAction.tsx`
- [x] `src/components/dashboard/DashboardHistoryRow.tsx`

### Shared Dashboard Systems Still To Refine
- [x] `src/components/DashboardSkeleton.tsx`
  - role-specific skeleton mapping is in place
  - final shell fidelity pass completed against the current overview structure
- [x] `src/components/dashboard/DashboardCustomizer.tsx`
  - rebuilt into a quieter minimal editor language
- [x] `src/components/dashboard/DashboardNotifications.tsx`
  - simplified into a quieter, more minimal feed treatment
- [x] `src/components/dashboard/DashboardThemeToggle.tsx`
  - folded into the cleaner header control cluster

## Exact Pages To Refactor First

### Priority Group 1: Overview Home Pages
- [x] `src/pages/provider/Dashboard.tsx`
- [x] `src/pages/seeker/Dashboard.tsx`
- [x] `src/pages/admin/Dashboard.tsx`
- [x] `src/pages/landlord/Dashboard.tsx`

### Priority Group 2: Highest-Traffic Operational Pages
- [x] `src/pages/provider/Inbox.tsx`
- [x] `src/pages/provider/Listings.tsx`
- [x] `src/pages/seeker/Offers.tsx`
- [x] `src/pages/seeker/Bookings.tsx`
- [x] `src/pages/landlord/Properties.tsx`
- [x] `src/pages/landlord/Units.tsx`
- [x] `src/pages/landlord/Maintenance.tsx`
- [x] `src/pages/admin/Properties.tsx`
- [x] `src/pages/admin/Users.tsx`
- [x] `src/pages/admin/Verifications.tsx`
- [x] `src/pages/admin/Disputes.tsx`

### Priority Group 3: Settings Pages
- [x] `src/pages/admin/Settings.tsx`
- [x] `src/pages/provider/Settings.tsx`
- [x] `src/pages/seeker/Settings.tsx`
- [x] `src/pages/landlord/Settings.tsx`

### Priority Group 4: Create/Post Flows
- [x] `src/pages/seeker/PostNeed.tsx`
- [x] `src/pages/provider/AddListing.tsx`
- [x] `src/pages/provider/SendOffer.tsx`
- [x] `src/pages/admin/NewAnnouncement.tsx`
- [x] `src/pages/landlord/NewUnit.tsx`
- [x] `src/pages/landlord/NewMaintenanceIssue.tsx`

### Priority Group 5: Next Pages To Refine
- [x] `src/pages/provider/Calendar.tsx`
- [x] `src/pages/landlord/Calendar.tsx`
- [x] `src/pages/provider/Payouts.tsx`
- [x] `src/pages/landlord/Collections.tsx`
- [x] `src/pages/admin/Transactions.tsx`
- [x] `src/pages/admin/Announcements.tsx`

## Before / After Modernization Sequence

### Before
- multiple card styles for similar content
- inconsistent page headers
- filters, search, and actions not always in the same place
- overview widgets varied too much in chrome and density
- settings pages felt grouped, not systemized
- loading states were inconsistent
- dark mode still depends on several hardcoded light-first colors

### After Step 1: Foundation
- [x] shared dashboard primitives exist
- [x] spacing, widget shell, page header, badge, and settings systems are established

### After Step 2: Settings System
- [x] all settings pages use the shared settings language
- [x] danger zones are more consistent
- [x] activity and tone consistency received the final sweep

### After Step 3: Control-Row System
- [x] major operational pages use the shared page-header + control-row pattern
- [-] a few secondary pages still carry older search/filter arrangements

### After Step 4: Overview Standard
- [x] all four dashboard home pages use the shared page header
- [x] all four use shared stat cards
- [x] all four use shared widget shells
- [x] overview record rows and section actions were standardized
- [x] widget internals received the minimal-density polish pass

### After Step 5: Create-Flow Standard
- [x] shared history-row language applied
- [x] shared header rhythm applied across create/post flows
- [x] sidebar/help-card minimalization received the quiet-surface cleanup pass

### After Step 6: Loading-State Alignment
- [x] shared overview loading hook is in place
- [x] role-based overview skeleton mapping exists
- [x] final fidelity pass completed

### After Step 7: Final Polish Target
- [x] dark mode tone sweep
- [x] mobile overflow and badge sweep
- [x] table/list density sweep
- [x] customizer redesign
- [x] notification redesign

## Phases

### Phase 1: Shared Primitives
- [x] Add `DashboardPageHeader`
- [x] Add `DashboardControlRow`
- [x] Add `DashboardStatusBadge`
- [x] Add `DashboardEmptyState`
- [x] Add `DashboardSettingsSection`
- [x] Add `DashboardSettingsRow`
- [x] Add `DashboardSectionCard`
- [x] Validate dark-mode appearance of the new primitives

### Phase 2: Shell Normalization
- [x] Standardize dashboard header spacing in:
  - `src/components/admin/AdminLayout.tsx`
  - `src/components/provider/ProviderLayout.tsx`
  - `src/components/seeker/SeekerLayout.tsx`
  - `src/components/landlord/LandlordLayout.tsx`
- [x] Standardize header actions:
  - search
  - notifications
  - dark mode
  - profile
- [x] Standardize content padding and mobile top spacing

### Phase 3: Overview Dashboards
- [x] Refactor:
  - `src/pages/admin/Dashboard.tsx`
  - `src/pages/provider/Dashboard.tsx`
  - `src/pages/seeker/Dashboard.tsx`
  - `src/pages/landlord/Dashboard.tsx`
- [x] Use one widget header pattern
- [x] Use one stat-card rhythm
- [x] Remove final badge, footer, and density drift between widgets

### Phase 4: Data Pages
- [x] Normalize control rows on:
  - `src/pages/provider/Inbox.tsx`
  - `src/pages/provider/Listings.tsx`
  - `src/pages/seeker/Offers.tsx`
  - `src/pages/seeker/Bookings.tsx`
  - `src/pages/landlord/Properties.tsx`
  - `src/pages/landlord/Units.tsx`
  - `src/pages/landlord/Maintenance.tsx`
  - `src/pages/admin/Properties.tsx`
  - `src/pages/admin/Users.tsx`
  - `src/pages/admin/Verifications.tsx`
  - `src/pages/admin/Disputes.tsx`
- [x] Prefer table/list-first layouts for high-volume content
- [x] Keep cards as summary or mobile fallback only

### Phase 5: Settings
- [x] Refactor:
  - `src/pages/admin/Settings.tsx`
  - `src/pages/provider/Settings.tsx`
  - `src/pages/seeker/Settings.tsx`
  - `src/pages/landlord/Settings.tsx`
- [x] Use one settings row pattern
- [x] Use one danger zone pattern
- [x] Use one activity feed pattern

### Phase 6: Create/Post Flows
- [x] Normalize:
  - `src/pages/seeker/PostNeed.tsx`
  - `src/pages/provider/AddListing.tsx`
  - `src/pages/provider/SendOffer.tsx`
  - `src/pages/admin/NewAnnouncement.tsx`
  - `src/pages/landlord/NewUnit.tsx`
  - `src/pages/landlord/NewMaintenanceIssue.tsx`
- [x] Keep consistent:
  - progress header
  - form shell
  - sidebar guidance
  - history tab
  - success state

### Phase 7: Dark Mode and Status Sweep
- [x] Replace light-only badge and icon-chip styles across dashboard pages
- [x] Standardize divider contrast in dark mode
- [x] Review empty states and muted surfaces in dark mode

### Phase 8: Minimalist Cleanup
- [x] Reduce visual noise in dashboard headers
- [x] Rebuild customizer into a quieter edit mode
- [x] Simplify notification panel hierarchy
- [x] Reduce decorative icon backgrounds where not necessary
- [x] Remove remaining one-off card treatments

## Immediate Execution Order From Here
1. Run a final repo-wide verification sweep for residual one-off tones
2. Spot-fix any tertiary page that still ships corrupted content strings
3. Verify build once the local Node `EPERM` environment issue is cleared
4. Treat future work as feature/UI iteration, not dashboard-system modernization

## Definition of Done
- any two dashboard pages feel like part of the same product
- control rows behave consistently
- settings pages share one layout grammar
- status badges share one semantic system
- overview widgets share one anatomy
- create flows share one structure
- dark mode looks designed, not inverted
- mobile badges, filters, and compact widgets no longer break
