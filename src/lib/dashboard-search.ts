import { stats as providerStats, recentLeads as providerRecentLeads, topListings as providerTopListings } from "@/pages/provider/Dashboard";
import { initialLeads as providerInboxLeads } from "@/pages/provider/Inbox";
import { initialListings as providerListings } from "@/pages/provider/Listings";
import { stats as seekerStats, recentOffers as seekerRecentOffers, savedProperties as seekerOverviewSaved } from "@/pages/seeker/Dashboard";
import { offers as seekerOffers } from "@/pages/seeker/Offers";
import { saved as seekerSaved } from "@/pages/seeker/Saved";
import { stats as adminStats, recentActivity as adminRecentActivity, quickActions as adminQuickActions } from "@/pages/admin/Dashboard";
import { properties as adminProperties } from "@/pages/admin/Properties";
import { users as adminUsers } from "@/pages/admin/Users";
import { stats as landlordStats, leaseExpiries, maintenanceItems, collectionAlerts } from "@/pages/landlord/Dashboard";
import { properties as landlordProperties } from "@/pages/landlord/Properties";
import { units as landlordUnits } from "@/pages/landlord/Units";
import { rows as landlordCollectionRows } from "@/pages/landlord/Collections";
import { toSearchId } from "@/lib/search-id";

export type DashboardSearchRole = "admin" | "provider" | "landlord" | "seeker";

export type DashboardSearchEntry = {
  id: string;
  title: string;
  description: string;
  path: string;
  category: string;
  keywords: string[];
};

export const dashboardSearchConfig: Record<
  DashboardSearchRole,
  { label: string; basePath: string; searchPath: string }
> = {
  admin: { label: "Admin", basePath: "/admin", searchPath: "/admin/search" },
  provider: { label: "Provider", basePath: "/provider", searchPath: "/provider/search" },
  landlord: { label: "Landlord", basePath: "/landlord", searchPath: "/landlord/search" },
  seeker: { label: "Seeker", basePath: "/seeker", searchPath: "/seeker/search" },
};

function entry(id: string, title: string, description: string, path: string, category: string, keywords: string[] = []): DashboardSearchEntry {
  return { id, title, description, path, category, keywords };
}

function withFocus(path: string, focus: string, params?: Record<string, string>) {
  const searchParams = new URLSearchParams(params);
  searchParams.set("focus", focus);
  return `${path}?${searchParams.toString()}`;
}

function providerEntries(): DashboardSearchEntry[] {
  return [
    entry("provider-dashboard", "Dashboard overview", "Track leads, listings, payouts, and response performance.", "/provider", "Overview", ["dashboard", "overview"]),
    ...providerStats.map((item) =>
      entry(`provider-stat-${normalize(item.title)}`, item.title, `${item.subtitle}. ${item.change}. ${item.value}.`, withFocus("/provider", `provider-stat-${toSearchId(item.title)}`), "Overview", [item.change, item.value, item.subtitle]),
    ),
    entry("provider-top-listings", "Top listings", "See which listings attract the most views, inquiries, and ratings.", "/provider", "Overview", ["views", "inquiries", "ratings"]),
    ...providerTopListings.map((item) =>
      entry(`provider-top-${normalize(item.name)}`, item.name, `${item.views} views, ${item.inquiries} inquiries, ${item.rating} rating.`, withFocus("/provider", `provider-top-${toSearchId(item.name)}`), "Overview", [String(item.views), String(item.inquiries), String(item.rating)]),
    ),
    entry("provider-recent-leads", "Recent leads", "Prioritize inbound tenant leads and respond quickly.", "/provider", "Overview", ["recent leads", "tenant needs"]),
    ...providerRecentLeads.map((item) =>
      entry(`provider-lead-${item.id}`, item.need, `${item.seeker}. Posted ${item.posted}. ${item.urgent ? "Urgent." : ""}`, withFocus("/provider", `provider-overview-lead-${item.id}`), "Overview", [item.seeker, item.posted, item.urgent ? "urgent" : "normal"]),
    ),
    entry("provider-inbox", "Lead inbox", "Manage new, responded, and urgent leads from seekers.", "/provider/inbox", "Operations", ["inbox", "leads"]),
    ...providerInboxLeads.map((item) =>
      entry(`provider-inbox-${item.id}`, item.need, `${item.location}. ${item.budget}. ${item.type}. Move-in ${item.moveIn}. ${item.status}.`, withFocus("/provider/inbox", `provider-inbox-${item.id}`, { tab: item.status === "Responded" ? "responded" : "new" }), "Operations", [...item.features, item.location, item.budget, item.type, item.status, item.moveIn]),
    ),
    entry("provider-listings", "My listings", "Manage listings and monitor views and offers.", "/provider/listings", "Operations", ["my listings", "properties"]),
    ...providerListings.map((item) =>
      entry(`provider-listing-${item.id}`, item.title, `${item.location}. ${item.price}. ${item.status}. ${item.views} views and ${item.offers} offers.`, withFocus("/provider/listings", `provider-listing-${item.id}`), "Operations", [item.type, item.location, item.status, item.price, `${item.beds} beds`, `${item.baths} baths`]),
    ),
    entry("provider-add-listing", "Add listing", "Create rent, short-let, or sale listings with pricing and amenities.", "/provider/listings/new", "Operations", ["add listing", "create property"]),
    entry("provider-payouts", "Payouts", "Review earnings, escrow, fees, and released provider payouts.", "/provider/payouts", "Finance", ["payouts", "earnings", "escrow"]),
    entry("provider-calendar", "Calendar", "Monitor bookings, confirmed visits, pending actions, and projected revenue.", "/provider/calendar", "Operations", ["calendar", "bookings", "visits"]),
  ];
}

function seekerEntries(): DashboardSearchEntry[] {
  return [
    entry("seeker-dashboard", "Dashboard overview", "Track active needs, offers, viewings, and match quality.", "/seeker", "Overview", ["dashboard", "overview"]),
    ...seekerStats.map((item) =>
      entry(`seeker-stat-${normalize(item.title)}`, item.title, `${item.subtitle}. ${item.change}. ${item.value}.`, withFocus("/seeker", `seeker-stat-${toSearchId(item.title)}`), "Overview", [item.change, item.value, item.subtitle]),
    ),
    entry("seeker-recent-offers", "Recent offers", "Review the latest dashboard offers and compare provider fit.", "/seeker", "Overview", ["recent offers"]),
    ...seekerRecentOffers.map((item) =>
      entry(`seeker-overview-offer-${item.id}`, item.property, `${item.provider}. ${item.price}. ${item.badge}. ${item.match}% match.`, withFocus("/seeker", `seeker-overview-offer-${item.id}`), "Overview", [item.provider, item.price, item.badge, `${item.match}%`, item.time]),
    ),
    entry("seeker-saved-overview", "Saved properties", "Keep favorite homes close by for quick comparison.", "/seeker", "Overview", ["saved properties", "favorites"]),
    ...seekerOverviewSaved.map((item) =>
      entry(`seeker-overview-saved-${normalize(item.name)}`, item.name, `${item.location}. ${item.price}.`, withFocus("/seeker", `seeker-overview-saved-${toSearchId(item.name)}`), "Overview", [item.location, item.price]),
    ),
    entry("seeker-offers", "My offers", "Review matched offers ranked by fit and trust.", "/seeker/offers", "Operations", ["offers", "matched offers"]),
    ...seekerOffers.map((item) =>
      entry(`seeker-offer-${item.id}`, item.property, `${item.provider}. ${item.role}. ${item.price}. ${item.trust}. ${item.match}% match.`, withFocus("/seeker/offers", `seeker-offer-${item.id}`), "Operations", [item.provider, item.role, item.price, item.trust, `${item.match}%`, ...item.features]),
    ),
    entry("seeker-saved", "Saved properties", "Review favorite homes and compare bookmarked listings.", "/seeker/saved", "Operations", ["saved properties", "bookmarks"]),
    ...seekerSaved.map((item) =>
      entry(`seeker-saved-${item.id}`, item.property, `${item.provider}. ${item.location}. ${item.price}. Saved ${item.savedDate}.`, withFocus("/seeker/saved", `seeker-saved-${item.id}`), "Operations", [item.provider, item.location, item.price, item.savedDate, `${item.views} views`]),
    ),
    entry("seeker-post-need", "Post a need", "Publish a housing need with budget, location, and urgency.", "/seeker/post", "Operations", ["post a need", "housing need"]),
    entry("seeker-bookings", "Bookings", "Manage active bookings, escrow, completed stays, and spend.", "/seeker/bookings", "Operations", ["bookings", "escrow"]),
    entry("seeker-browse", "Browse properties", "Search the full property catalog from the seeker workspace.", "/properties", "Discovery", ["browse properties", "discover"]),
  ];
}

function adminEntries(): DashboardSearchEntry[] {
  return [
    entry("admin-dashboard", "Dashboard overview", "Monitor platform properties, users, revenue, and disputes.", "/admin", "Overview", ["dashboard", "overview"]),
    ...adminStats.map((item) =>
      entry(`admin-stat-${normalize(item.title)}`, item.title, `${item.subtitle}. ${item.change}. ${item.value}.`, withFocus("/admin", `admin-stat-${toSearchId(item.title)}`), "Overview", [item.change, item.value, item.subtitle]),
    ),
    entry("admin-recent-activity", "Recent activity", "Monitor live platform events across the marketplace.", "/admin", "Overview", ["recent activity", "live"]),
    ...adminRecentActivity.map((item) =>
      entry(`admin-activity-${item.id}`, `${item.action} by ${item.user}`, `${item.time}. ${item.type}.`, withFocus("/admin", `admin-activity-${item.id}`), "Overview", [item.user, item.time, item.type, item.action]),
    ),
    entry("admin-quick-actions", "Quick actions", "Jump into common admin tasks and monitor platform health.", "/admin", "Overview", ["quick actions", "platform health"]),
    ...adminQuickActions.map((item) =>
      entry(`admin-action-${normalize(item.label)}`, item.label, `Quick action to open ${item.label}.`, item.to, "Overview", [item.label, "quick action"]),
    ),
    entry("admin-properties", "Properties", "Manage all listings across the platform and moderation states.", "/admin/properties", "Operations", ["properties", "all listings"]),
    ...adminProperties.map((item) =>
      entry(`admin-property-${item.id}`, item.title, `${item.agent}. ${item.location}. ${item.price}. ${item.status}. ${item.date}.`, withFocus("/admin/properties", `admin-property-${item.id}`), "Operations", [item.agent, item.location, item.price, item.status, item.date]),
    ),
    entry("admin-users", "Users and providers", "Manage registered users, providers, verification, and suspensions.", "/admin/users", "Operations", ["users", "providers"]),
    ...adminUsers.map((item) =>
      entry(`admin-user-${item.id}`, item.name, `${item.role}. ${item.verification}. ${item.email}. Joined ${item.joined}. ${item.activity}.`, withFocus("/admin/users", `admin-user-${item.id}`), "Operations", [item.role, item.verification, item.email, item.joined, item.activity]),
    ),
    entry("admin-transactions", "Transactions", "Review volume, escrow, failed transactions, and payment flow.", "/admin/transactions", "Finance", ["transactions", "payments"]),
    entry("admin-disputes", "Disputes", "Handle open rent, listing, booking, and payout disputes.", "/admin/disputes", "Operations", ["disputes"]),
    entry("admin-verifications", "KYC and verifications", "Review pending, verified, and rejected identity checks.", "/admin/verifications", "Operations", ["kyc", "verifications"]),
    entry("admin-reports", "Reports and analytics", "Analyze revenue, bookings, users, occupancy, and conversion performance.", "/admin/reports", "Analytics", ["reports", "analytics"]),
    entry("admin-announcements", "Announcements", "Publish platform updates, maintenance notices, and fraud alerts.", "/admin/announcements", "Operations", ["announcements", "updates"]),
  ];
}

function landlordEntries(): DashboardSearchEntry[] {
  return [
    entry("landlord-dashboard", "Dashboard overview", "Monitor occupancy, collections, lease risk, and property operations.", "/landlord", "Overview", ["dashboard", "overview"]),
    ...landlordStats.map((item) =>
      entry(`landlord-stat-${normalize(item.title)}`, item.title, `${item.subtitle}. ${item.change}. ${item.value}.`, withFocus("/landlord", `landlord-stat-${toSearchId(item.title)}`), "Overview", [item.change, item.value, item.subtitle]),
    ),
    ...leaseExpiries.map((item, index) =>
      entry(`landlord-lease-${index}`, item.unit, `${item.tenant}. Due in ${item.due}. ${item.status}.`, withFocus("/landlord", `landlord-lease-${index}`), "Overview", [item.tenant, item.due, item.status]),
    ),
    ...maintenanceItems.map((item, index) =>
      entry(`landlord-maintenance-overview-${index}`, item.issue, `${item.unit}. ${item.priority}. ${item.age}.`, withFocus("/landlord", `landlord-maintenance-overview-${index}`), "Overview", [item.unit, item.priority, item.age]),
    ),
    ...collectionAlerts.map((item, index) =>
      entry(`landlord-collection-alert-${index}`, item.tenant, `${item.unit}. ${item.amount}. ${item.state}.`, withFocus("/landlord", `landlord-collection-alert-${index}`), "Overview", [item.unit, item.amount, item.state]),
    ),
    entry("landlord-properties", "Properties", "Manage owned buildings, occupancy, documentation, and issues.", "/landlord/properties", "Operations", ["properties"]),
    ...landlordProperties.map((item) =>
      entry(`landlord-property-${item.id}`, item.name, `${item.location}. ${item.units} units, ${item.occupied} occupied, ${item.vacant} vacant. ${item.collections}. ${item.docs}. ${item.status}.`, withFocus("/landlord/properties", `landlord-property-${item.id}`), "Operations", [item.location, item.collections, item.docs, item.status, item.yield]),
    ),
    entry("landlord-units", "Units", "Track unit occupancy, tenant assignment, lease state, and unit readiness.", "/landlord/units", "Operations", ["units"]),
    ...landlordUnits.map((item) =>
      entry(`landlord-unit-${item.id}`, item.name, `${item.property}. ${item.tenant}. ${item.type}. ${item.rent}. ${item.state}. ${item.lease}. ${item.statusNote}.`, withFocus("/landlord/units", `landlord-unit-${item.id}`), "Operations", [item.property, item.tenant, item.type, item.rent, item.state, item.lease, item.statusNote]),
    ),
    entry("landlord-collections", "Collections", "Monitor rent expected, received, due-soon, and overdue items.", "/landlord/collections", "Finance", ["collections", "rent ledger"]),
    ...landlordCollectionRows.map((item) =>
      entry(`landlord-collection-row-${item.id}`, item.tenant, `${item.unit}. ${item.property}. ${item.amount}. ${item.state}. Due ${item.due}. ${item.method}.`, withFocus("/landlord/collections", `landlord-collection-row-${item.id}`), "Finance", [item.unit, item.property, item.amount, item.state, item.due, item.method]),
    ),
    entry("landlord-payouts", "Payouts", "Track released funds, escrow, deductions, and settlements.", "/landlord/payouts", "Finance", ["payouts"]),
    entry("landlord-calendar", "Calendar", "Monitor portfolio events, inspections, reminders, and tracked collections.", "/landlord/calendar", "Operations", ["calendar"]),
    entry("landlord-maintenance", "Maintenance", "Manage open, in-progress, resolved, and urgent maintenance issues.", "/landlord/maintenance", "Operations", ["maintenance"]),
  ];
}

const dashboardSearchEntries: Record<DashboardSearchRole, DashboardSearchEntry[]> = {
  provider: providerEntries(),
  seeker: seekerEntries(),
  admin: adminEntries(),
  landlord: landlordEntries(),
};

export function getDashboardSearchEntries(role: DashboardSearchRole) {
  return dashboardSearchEntries[role];
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s]/g, " ")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function searchDashboardEntries(role: DashboardSearchRole, query: string) {
  const normalizedQuery = normalize(query);
  const entries = getDashboardSearchEntries(role);

  if (!normalizedQuery) {
    return entries;
  }

  const terms = normalizedQuery.split(" ").filter(Boolean);

  return entries
    .map((item) => {
      const title = normalize(item.title);
      const description = normalize(item.description);
      const category = normalize(item.category);
      const keywords = normalize(item.keywords.join(" "));
      const path = normalize(item.path);
      const haystack = `${title} ${description} ${category} ${keywords} ${path}`;

      let score = 0;
      if (title.includes(normalizedQuery)) score += 20;
      if (keywords.includes(normalizedQuery)) score += 14;
      if (description.includes(normalizedQuery)) score += 10;
      if (haystack.includes(normalizedQuery)) score += 6;

      for (const term of terms) {
        if (title.includes(term)) score += 8;
        if (description.includes(term)) score += 4;
        if (category.includes(term)) score += 2;
        if (keywords.includes(term)) score += 5;
        if (path.includes(term)) score += 1;
      }

      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
}
