import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, DollarSign } from "lucide-react";

const leads = [
  { id: 1, need: "3 Bed Flat in Lekki Phase 1", budget: "₦2,500,000/yr", location: "Lekki, Lagos", type: "Rent", moveIn: "April 2024", posted: "15 min ago", sla: 12, features: ["24hr Power", "Security", "Parking"], status: "New" },
  { id: 2, need: "Studio Apartment in Wuse 2", budget: "₦1,200,000/yr", location: "Wuse 2, Abuja", type: "Rent", moveIn: "May 2024", posted: "1 hr ago", sla: 45, features: ["Furnished", "Security"], status: "New" },
  { id: 3, need: "Short-let in Victoria Island, 3 nights", budget: "₦50,000/night", location: "VI, Lagos", type: "Short-let", moveIn: "Mar 22-25", posted: "2 hrs ago", sla: 0, features: ["Furnished", "Pool", "Gym"], status: "Responded" },
  { id: 4, need: "2 Bed in Ikeja GRA", budget: "₦1,800,000/yr", location: "Ikeja, Lagos", type: "Rent", moveIn: "April 2024", posted: "3 hrs ago", sla: 0, features: ["Gated Estate", "Water"], status: "Responded" },
  { id: 5, need: "4 Bed Duplex in Maitama", budget: "₦5,000,000/yr", location: "Maitama, Abuja", type: "Rent", moveIn: "June 2024", posted: "5 hrs ago", sla: 30, features: ["Security", "Garden", "BQ"], status: "New" },
];

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  New: "default",
  Responded: "outline",
  Expired: "secondary",
};

export default function LeadInbox() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Lead Inbox</h2>
        <p className="text-muted-foreground">Tenant needs matching your listings. Respond fast to stay boosted.</p>
      </div>

      <div className="space-y-4">
        {leads.map((lead) => (
          <Card key={lead.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{lead.need}</h3>
                    <Badge variant={statusVariant[lead.status]} className="text-xs">{lead.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{lead.location}</span>
                    <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" />{lead.budget}</span>
                    <span>{lead.type}</span>
                    <span>Move-in: {lead.moveIn}</span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {lead.features.map((f) => (
                      <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right space-y-2 shrink-0">
                  <p className="text-xs text-muted-foreground">{lead.posted}</p>
                  {lead.sla > 0 && (
                    <div className="flex items-center gap-1 text-sm text-red-500 font-medium justify-end">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{lead.sla} min left</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-3 border-t">
                {lead.status === "New" ? (
                  <>
                    <Button size="sm">Send Offer</Button>
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm" variant="ghost">Skip</Button>
                  </>
                ) : (
                  <Button size="sm" variant="outline">View Offer Sent</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
