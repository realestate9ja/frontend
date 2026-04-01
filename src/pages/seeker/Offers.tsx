import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShieldCheck, Clock } from "lucide-react";

const offers = [
  { id: 1, property: "3 Bed Flat, Lekki Phase 1", provider: "Adebayo Johnson", role: "Agent", price: "₦2,500,000/yr", trust: "Verified", rating: 4.8, responseTime: "12 min", match: 95, features: ["24hr Power", "Security", "Parking"], status: "New" },
  { id: 2, property: "2 Bed Apartment, Ikeja GRA", provider: "Lagos Homes Ltd", role: "Agent", price: "₦1,800,000/yr", trust: "Verified", rating: 4.5, responseTime: "45 min", match: 88, features: ["Gated Estate", "Water Supply"], status: "Viewed" },
  { id: 3, property: "Studio, Wuse 2", provider: "Chioma Okafor", role: "Landlord", price: "₦1,200,000/yr", trust: "Pending", rating: 4.2, responseTime: "2 hrs", match: 76, features: ["Furnished", "Security"], status: "New" },
  { id: 4, property: "2 Bed Serviced, VI", provider: "ShortStay NG", role: "Short-let", price: "₦45,000/night", trust: "Verified", rating: 4.9, responseTime: "5 min", match: 92, features: ["24hr Power", "Furnished", "Pool"], status: "Saved" },
];

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  New: "default",
  Viewed: "secondary",
  Saved: "outline",
};

export default function Offers() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Incoming Offers</h2>
        <p className="text-muted-foreground">Offers matched to your posted needs, ranked by fit & trust.</p>
      </div>

      <div className="space-y-4">
        {offers.map((offer) => (
          <Card key={offer.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{offer.property}</h3>
                    <Badge variant={statusVariant[offer.status]} className="text-xs">{offer.status}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{offer.provider}</span>
                    <Badge variant="outline" className="text-xs">{offer.role}</Badge>
                    <span className="flex items-center gap-1">
                      {offer.trust === "Verified" ? <ShieldCheck className="h-3.5 w-3.5 text-green-600" /> : <Clock className="h-3.5 w-3.5 text-yellow-600" />}
                      {offer.trust}
                    </span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {offer.features.map((f) => (
                      <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right space-y-2 shrink-0">
                  <p className="text-lg font-bold text-foreground">{offer.price}</p>
                  <div className="flex items-center gap-1 justify-end text-sm">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span>{offer.rating}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{offer.match}% match</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Responded in {offer.responseTime}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-3 border-t">
                <Button size="sm">View Details</Button>
                <Button size="sm" variant="outline">Schedule Viewing</Button>
                <Button size="sm" variant="ghost">Save</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
