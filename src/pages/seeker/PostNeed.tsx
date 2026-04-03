import { useState } from "react";
import { MapPin, Calendar, DollarSign, Bed, CheckCircle2, ShieldCheck, FileText, Plus, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const previousNeeds = [
  { id: 1, title: "3 Bed in Lekki Phase 1", budget: "₦2.5M/yr", status: "Active", offers: 4, date: "Mar 15, 2024" },
  { id: 2, title: "Studio in Wuse 2, Abuja", budget: "₦1.2M/yr", status: "Closed", offers: 7, date: "Feb 28, 2024" },
  { id: 3, title: "2 Bed Short-let, VI", budget: "₦45K/night", status: "Active", offers: 2, date: "Mar 18, 2024" },
];

const amenities = ["24hr Power", "Security", "Water Supply", "Parking", "Gated Estate", "Pet Friendly", "Furnished", "Swimming Pool", "Gym", "Serviced"];

export default function PostNeed() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-5">
        <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Need Published</h2>
          <p className="text-sm text-muted-foreground mt-1.5 max-w-sm">Verified agents and landlords will start sending you matching offers shortly.</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setSubmitted(false)} variant="outline" size="sm">Post Another</Button>
          <Button size="sm">View My Posts</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Post a Need</h1>
          <p className="text-sm text-muted-foreground mt-1">Describe what you're looking for — providers will send you tailored offers.</p>
        </div>
      </div>

      <Tabs defaultValue="new" className="space-y-4">
        <TabsList className="bg-muted/50 p-1 h-auto">
          <TabsTrigger value="new" className="text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm gap-1.5">
            <Plus className="h-3.5 w-3.5" /> New Need
          </TabsTrigger>
          <TabsTrigger value="history" className="text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm gap-1.5">
            <FileText className="h-3.5 w-3.5" /> My Posts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="border border-border/60 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">Property Requirements</CardTitle>
                  <CardDescription>Be specific to get better matches from providers</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">Type</label>
                        <select className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
                          <option>Rent (Long-term)</option>
                          <option>Short-let</option>
                          <option>Shared Apartment</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">Bedrooms</label>
                        <div className="relative">
                          <Bed className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <select className="w-full h-10 rounded-lg border border-input bg-background pl-9 pr-3 text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
                            <option>1 Bedroom</option>
                            <option>2 Bedrooms</option>
                            <option>3 Bedrooms</option>
                            <option>4+ Bedrooms</option>
                            <option>Self-contain</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Preferred Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="e.g. Lekki, Lagos or Wuse, Abuja" className="pl-9" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">Budget (Annual / Nightly)</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="e.g. 2,000,000" className="pl-9" required />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">Move-in Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input type="date" className="pl-9" required />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Must-haves</label>
                      <div className="flex flex-wrap gap-2">
                        {amenities.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            onClick={() => toggleTag(tag)}
                            className={`cursor-pointer px-3 py-1.5 transition-all duration-200 text-xs ${
                              selectedTags.includes(tag)
                                ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                                : "hover:bg-accent hover:border-primary/30 text-muted-foreground"
                            }`}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Additional Notes</label>
                      <textarea className="w-full min-h-[80px] rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none" placeholder="Any other requirements or preferences..." />
                    </div>

                    <Button type="submit" className="w-full h-11 text-sm font-medium">
                      Publish Need
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar tips */}
            <div className="space-y-4">
              <Card className="border border-border/60 shadow-sm">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10"><ShieldCheck className="h-4 w-4 text-primary" /></div>
                    <h3 className="text-sm font-semibold text-foreground">Lagos Tenancy Law</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">Landlords cannot demand more than 1 year advance rent for yearly tenants. All rent payments must come with a receipt.</p>
                </CardContent>
              </Card>

              <Card className="border border-border/60 shadow-sm">
                <CardContent className="p-5 space-y-3">
                  <h3 className="text-sm font-semibold text-foreground">Tips for better matches</h3>
                  <ul className="space-y-2">
                    {["Be specific about your preferred area", "Set a realistic budget range", "List amenities that matter most", "Add a move-in date for urgency"].map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="mt-0.5 h-4 w-4 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-semibold shrink-0">{i + 1}</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card className="border border-border/60 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Posted Needs</CardTitle>
              <CardDescription>Track your published property needs and incoming offers</CardDescription>
            </CardHeader>
            <CardContent className="divide-y divide-border/60">
              {previousNeeds.map((need) => (
                <div key={need.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0 group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{need.title}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-muted-foreground">{need.budget}</span>
                        <span className="text-xs text-muted-foreground">{need.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={`text-xs ${need.status === "Active" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-muted text-muted-foreground border-border"}`}>
                      {need.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{need.offers} offers</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
