import { Inbox, Building2, CreditCard, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const stats = [
  { title: "New Leads", value: "8", icon: Inbox, desc: "Unresponded this week" },
  { title: "Active Listings", value: "12", icon: Building2, desc: "Published properties" },
  { title: "Pending Payouts", value: "₦4.2M", icon: CreditCard, desc: "Awaiting release" },
  { title: "Response Rate", value: "94%", icon: TrendingUp, desc: "Avg 8 min response" },
];

const recentLeads = [
  { id: 1, need: "3 Bed in Lekki, budget ₦2.5M/yr", seeker: "Anonymous Tenant", posted: "15 min ago", sla: "Respond in 12 min", urgent: true },
  { id: 2, need: "Studio in Wuse 2, budget ₦1.2M/yr", seeker: "Anonymous Tenant", posted: "1 hr ago", sla: "Respond in 45 min", urgent: false },
  { id: 3, need: "Short-let VI, 3 nights, budget ₦50k/night", seeker: "Corporate Client", posted: "2 hrs ago", sla: "Responded", urgent: false },
];

export default function ProviderDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Provider Overview</h2>
          <p className="text-muted-foreground">Manage your leads, listings, and payouts.</p>
        </div>
        <Button asChild>
          <Link to="/provider/listings">Add Listing</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.title}</CardTitle>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentLeads.map((lead) => (
            <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1 flex-1">
                <p className="font-medium text-foreground">{lead.need}</p>
                <p className="text-sm text-muted-foreground">{lead.seeker} · {lead.posted}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-sm">
                  <Clock className="h-3.5 w-3.5" />
                  <span className={lead.urgent ? "text-red-500 font-medium" : "text-muted-foreground"}>{lead.sla}</span>
                </div>
                {lead.sla !== "Responded" && <Button size="sm">Send Offer</Button>}
                {lead.sla === "Responded" && <Badge variant="outline">Sent</Badge>}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
