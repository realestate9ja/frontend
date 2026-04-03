import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Bed, Bath, Star, Eye, SlidersHorizontal, Grid3X3, List } from "lucide-react";
import { useState } from "react";

const allProperties = [
  { id: 1, title: "Modern 2BR Apartment", location: "Victoria Island, Lagos", price: "₦850,000", period: "/month", beds: 2, baths: 2, rating: 4.8, views: 234, match: 95, type: "Apartment", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop" },
  { id: 2, title: "Cozy Studio Flat", location: "Lekki Phase 1, Lagos", price: "₦450,000", period: "/month", beds: 1, baths: 1, rating: 4.5, views: 189, match: 88, type: "Studio", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop" },
  { id: 3, title: "Spacious 3BR Duplex", location: "Ikeja GRA, Lagos", price: "₦1,200,000", period: "/month", beds: 3, baths: 3, rating: 4.9, views: 312, match: 92, type: "Duplex", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop" },
  { id: 4, title: "Luxury Penthouse", location: "Banana Island, Lagos", price: "₦3,500,000", period: "/month", beds: 4, baths: 4, rating: 5.0, views: 456, match: 78, type: "Penthouse", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop" },
  { id: 5, title: "Furnished 1BR Flat", location: "Yaba, Lagos", price: "₦350,000", period: "/month", beds: 1, baths: 1, rating: 4.3, views: 145, match: 85, type: "Apartment", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop" },
  { id: 6, title: "Executive 3BR Flat", location: "Ikoyi, Lagos", price: "₦2,100,000", period: "/month", beds: 3, baths: 2, rating: 4.7, views: 278, match: 90, type: "Apartment", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop" },
  { id: 7, title: "Charming Bungalow", location: "Ajah, Lagos", price: "₦550,000", period: "/month", beds: 2, baths: 2, rating: 4.4, views: 167, match: 82, type: "Bungalow", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop" },
  { id: 8, title: "Mini Flat Self-Con", location: "Surulere, Lagos", price: "₦250,000", period: "/month", beds: 1, baths: 1, rating: 4.1, views: 98, match: 76, type: "Mini Flat", image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&h=400&fit=crop" },
];

const Properties = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = allProperties.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || p.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-16 px-6 lg:px-16 xl:px-20 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-2">Browse Properties</h1>
          <p className="text-muted-foreground mb-8">Discover verified rental properties that match your lifestyle.</p>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search by name or location..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SlidersHorizontal className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="Studio">Studio</SelectItem>
                <SelectItem value="Duplex">Duplex</SelectItem>
                <SelectItem value="Penthouse">Penthouse</SelectItem>
                <SelectItem value="Bungalow">Bungalow</SelectItem>
                <SelectItem value="Mini Flat">Mini Flat</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-1 border border-border rounded-lg p-1">
              <Button variant={viewMode === "grid" ? "default" : "ghost"} size="icon" className="h-8 w-8" onClick={() => setViewMode("grid")}><Grid3X3 className="w-4 h-4" /></Button>
              <Button variant={viewMode === "list" ? "default" : "ghost"} size="icon" className="h-8 w-8" onClick={() => setViewMode("list")}><List className="w-4 h-4" /></Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 px-6 lg:px-16 xl:px-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-muted-foreground mb-6">{filtered.length} properties found</p>

          {viewMode === "grid" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((property) => (
                <Card key={property.id} className="overflow-hidden border-border/60 group hover:shadow-lg transition-all">
                  <div className="relative">
                    <img src={property.image} alt={property.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-xs">{property.match}% Match</Badge>
                    <Badge variant="secondary" className="absolute top-3 right-3 text-xs">{property.type}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground truncate">{property.title}</h3>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
                      <MapPin className="w-3 h-3" /> {property.location}
                    </div>
                    <p className="text-lg font-bold text-primary mt-2">{property.price}<span className="text-xs text-muted-foreground font-normal">{property.period}</span></p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/60">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Bed className="w-3 h-3" />{property.beds}</span>
                        <span className="flex items-center gap-1"><Bath className="w-3 h-3" />{property.baths}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500" />{property.rating}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{property.views}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((property) => (
                <Card key={property.id} className="border-border/60 hover:shadow-md transition-shadow">
                  <CardContent className="flex gap-4 p-4">
                    <img src={property.image} alt={property.title} className="w-32 h-24 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{property.title}</h3>
                          <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
                            <MapPin className="w-3 h-3" /> {property.location}
                          </div>
                        </div>
                        <p className="text-lg font-bold text-primary whitespace-nowrap">{property.price}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <Badge variant="secondary" className="text-xs">{property.type}</Badge>
                        <span className="flex items-center gap-1"><Bed className="w-3 h-3" />{property.beds} Beds</span>
                        <span className="flex items-center gap-1"><Bath className="w-3 h-3" />{property.baths} Baths</span>
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500" />{property.rating}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{property.views} views</span>
                        <Badge className="bg-primary/90 text-primary-foreground text-xs">{property.match}% Match</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground">No properties found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Properties;
