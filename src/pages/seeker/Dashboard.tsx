import { FileText, Inbox, CalendarCheck, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const stats = [
  { title: "Active Posts", value: "3", icon: FileText, desc: "Needs published" },
  { title: "Offers Received", value: "12", icon: Inbox, desc: "Across all posts" },
  { title: "Upcoming Viewings", value: "2", icon: CalendarCheck, desc: "This week" },
  { title: "Match Rate", value: "87%", icon: TrendingUp, desc: "Offer relevance" },
];

const recentOffers = [
  { id: 1, property: "3 Bed Flat, Lekki Phase 1", provider: "Adebayo Johnson", price: "₦2,500,000/yr", badge: "Agent", time: "2 hrs ago", trust: "Verified" },
  { id: 2, property: "Studio, Wuse 2 Abuja", provider: "Chioma Okafor", price: "₦1,200,000/yr", badge: "Landlord", time: "5 hrs ago", trust: "Verified" },
  { id: 3, property: "2 Bed Serviced, Victoria Island", provider: "ShortStay NG", price: "₦45,000/night", badge: "Short-let", time: "1 day ago", trust: "Pending" },
];

export default function SeekerDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Welcome back!</h2>
          <p className="text-muted-foreground">Here's what's happening with your property search.</p>
        </div>
        <Button asChild>
          <Link to="/seeker/post">Post a Need</Link>
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
          <CardTitle>Recent Offers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentOffers.map((offer) => (
            <div key={offer.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <p className="font-medium text-foreground">{offer.property}</p>
                <p className="text-sm text-muted-foreground">by {offer.provider}</p>
              </div>
              <div className="flex items-center gap-3 text-right">
                <div>
                  <p className="font-semibold text-foreground">{offer.price}</p>
                  <div className="flex gap-1.5 mt-1">
                    <Badge variant="secondary" className="text-xs">{offer.badge}</Badge>
                    <Badge variant={offer.trust === "Verified" ? "default" : "outline"} className="text-xs">{offer.trust}</Badge>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{offer.time}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
