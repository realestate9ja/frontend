import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, CheckCheck, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DashboardRole = "admin" | "provider" | "seeker" | "landlord";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  path: string;
  tone?: "default" | "warning" | "success";
};

const notificationData: Record<DashboardRole, NotificationItem[]> = {
  admin: [
    { id: "admin-verification-chioma", title: "Verification queue updated", message: "Chioma Okafor submitted a new KYC document for review.", time: "10m ago", path: "/admin/verifications", tone: "warning" },
    { id: "admin-dispute-vi", title: "Dispute needs escalation", message: "A Victoria Island tenancy dispute has been reopened by both parties.", time: "42m ago", path: "/admin/disputes", tone: "warning" },
    { id: "admin-report-growth", title: "Weekly report ready", message: "The latest platform health and transaction report is now available.", time: "Today", path: "/admin/reports", tone: "success" },
  ],
  provider: [
    { id: "provider-lead-lekki", title: "New lead matched", message: "A seeker is requesting a 3 bed in Lekki Phase 1.", time: "8m ago", path: "/provider/inbox", tone: "default" },
    { id: "provider-payout-release", title: "Payout released", message: "Your latest escrow release is ready for settlement.", time: "1h ago", path: "/provider/payouts", tone: "success" },
    { id: "provider-calendar-viewing", title: "Viewing scheduled", message: "Corporate Client confirmed a Thursday inspection slot.", time: "Today", path: "/provider/calendar", tone: "default" },
  ],
  seeker: [
    { id: "seeker-offer-ikoyi", title: "New offer received", message: "A landlord sent you an updated offer for Modern 2 Bed, Ikoyi.", time: "12m ago", path: "/seeker/offers", tone: "default" },
    { id: "seeker-viewing-palm", title: "Viewing confirmed", message: "Palm Residence inspection is confirmed for Friday at 11:00 AM.", time: "1h ago", path: "/seeker/bookings?section=viewings", tone: "success" },
    { id: "seeker-booking-docs", title: "Booking awaiting action", message: "Upload the remaining documents to complete your booking review.", time: "Today", path: "/seeker/bookings?section=bookings", tone: "warning" },
  ],
  landlord: [
    { id: "landlord-collection-overdue", title: "Collection alert", message: "Amber Foods is due tomorrow for Admiralty Suites 5B.", time: "9m ago", path: "/landlord/collections", tone: "warning" },
    { id: "landlord-maintenance-urgent", title: "Urgent maintenance issue", message: "Lekki Court A2 was flagged for water heater replacement.", time: "50m ago", path: "/landlord/maintenance", tone: "warning" },
    { id: "landlord-document-expiry", title: "Compliance file expiring", message: "One property document is due for review this week.", time: "Today", path: "/landlord/settings", tone: "default" },
  ],
};

const toneStyles: Record<NonNullable<NotificationItem["tone"]>, string> = {
  default: "bg-primary/10",
  warning: "bg-amber-500/10",
  success: "bg-emerald-500/10",
};

export function DashboardNotifications({ role }: { role: DashboardRole }) {
  const navigate = useNavigate();
  const storageKey = `dwello_notifications_read_${role}`;
  const items = notificationData[role];
  const [readIds, setReadIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setReadIds(JSON.parse(stored));
      } catch {
        setReadIds([]);
      }
    }
  }, [storageKey]);

  const persistReadIds = (next: string[]) => {
    setReadIds(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const unreadCount = useMemo(
    () => items.filter((item) => !readIds.includes(item.id)).length,
    [items, readIds],
  );

  const markAllAsRead = () => {
    persistReadIds(items.map((item) => item.id));
  };

  const openNotification = (item: NotificationItem) => {
    if (!readIds.includes(item.id)) {
      persistReadIds([...readIds, item.id]);
    }
    navigate(item.path);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-lg" aria-label="Open notifications">
          <Bell className="h-4 w-4 text-muted-foreground" />
          {unreadCount > 0 && (
            <>
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
              <span className="sr-only">{unreadCount} unread notifications</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[min(92vw,380px)] p-0">
        <div className="flex items-center justify-between px-4 py-3">
          <DropdownMenuLabel className="p-0 text-sm font-semibold">Notifications</DropdownMenuLabel>
          {unreadCount > 0 ? (
            <Button variant="ghost" size="sm" className="h-8 gap-1.5 px-2 text-xs" onClick={markAllAsRead}>
              <CheckCheck className="h-3.5 w-3.5" /> Mark all read
            </Button>
          ) : (
            <Badge variant="outline" className="text-[10px]">Up to date</Badge>
          )}
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-[420px] overflow-y-auto p-2">
          {items.map((item) => {
            const unread = !readIds.includes(item.id);
            return (
              <DropdownMenuItem
                key={item.id}
                onClick={() => openNotification(item)}
                className="mb-1 flex cursor-pointer items-start gap-3 rounded-xl border border-transparent p-3 focus:bg-secondary/60"
              >
                <div className={`mt-0.5 h-9 w-1 rounded-full ${toneStyles[item.tone ?? "default"]}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.message}</p>
                    </div>
                    {unread && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock3 className="h-3 w-3" />
                    {item.time}
                  </div>
                </div>
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
