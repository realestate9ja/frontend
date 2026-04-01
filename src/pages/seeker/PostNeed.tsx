import { useState } from "react";
import { MapPin, Calendar, DollarSign, Home, Bed, Bath } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function PostNeed() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Home className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Need Posted!</h2>
        <p className="text-muted-foreground max-w-md">Your property need has been published. Verified agents and landlords will start sending you matching offers shortly.</p>
        <Button onClick={() => setSubmitted(false)} variant="outline">Post Another</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Post Your Need</h2>
        <p className="text-muted-foreground">Tell providers exactly what you're looking for. They'll send you tailored offers.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Property Requirements</CardTitle>
          <CardDescription>Be specific to get better matches</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Type</label>
                <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                  <option>Rent (Long-term)</option>
                  <option>Short-let</option>
                  <option>Shared Apartment</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Bedrooms</label>
                <div className="relative">
                  <Bed className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select className="w-full h-10 rounded-md border border-input bg-background pl-9 pr-3 text-sm">
                    <option>1 Bedroom</option>
                    <option>2 Bedrooms</option>
                    <option>3 Bedrooms</option>
                    <option>4+ Bedrooms</option>
                    <option>Self-contain</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Preferred Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="e.g. Lekki, Lagos or Wuse, Abuja" className="pl-9" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Budget (Annual / Nightly)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="e.g. 2,000,000" className="pl-9" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Move-in Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="date" className="pl-9" required />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Must-haves</label>
              <div className="flex flex-wrap gap-2">
                {["24hr Power", "Security", "Water Supply", "Parking", "Gated Estate", "Pet Friendly", "Furnished"].map((tag) => (
                  <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-3 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Additional Notes</label>
              <textarea className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground" placeholder="Any other requirements or preferences..." />
            </div>

            <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
              <strong>Lagos Tenancy Law:</strong> Landlords cannot demand more than 1 year advance rent for yearly tenants. All rent payments must come with a receipt.
            </div>

            <Button type="submit" className="w-full rounded-full">Publish Need</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
