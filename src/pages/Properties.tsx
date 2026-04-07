import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarketingShell from "@/components/layout/MarketingShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Star,
  Eye,
  Home,
  Grid3X3,
  List,
  ArrowRight,
  Maximize,
} from "lucide-react";

const allProperties = [
  {
    id: 1,
    title: "Modern 2BR Apartment",
    location: "Victoria Island, Lagos",
    price: "NGN 850,000",
    period: "/month",
    beds: 2,
    baths: 2,
    sqft: "1,200",
    rating: 4.8,
    views: 234,
    match: 95,
    type: "Apartment",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Cozy Studio Flat",
    location: "Lekki Phase 1, Lagos",
    price: "NGN 450,000",
    period: "/month",
    beds: 1,
    baths: 1,
    sqft: "650",
    rating: 4.5,
    views: 189,
    match: 88,
    type: "Studio",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Spacious 3BR Duplex",
    location: "Ikeja GRA, Lagos",
    price: "NGN 1,200,000",
    period: "/month",
    beds: 3,
    baths: 3,
    sqft: "2,800",
    rating: 4.9,
    views: 312,
    match: 92,
    type: "Duplex",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Luxury Penthouse",
    location: "Banana Island, Lagos",
    price: "NGN 3,500,000",
    period: "/month",
    beds: 4,
    baths: 4,
    sqft: "4,500",
    rating: 5.0,
    views: 456,
    match: 78,
    type: "Penthouse",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Furnished 1BR Flat",
    location: "Yaba, Lagos",
    price: "NGN 350,000",
    period: "/month",
    beds: 1,
    baths: 1,
    sqft: "550",
    rating: 4.3,
    views: 145,
    match: 85,
    type: "Apartment",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Executive 3BR Flat",
    location: "Ikoyi, Lagos",
    price: "NGN 2,100,000",
    period: "/month",
    beds: 3,
    baths: 2,
    sqft: "2,200",
    rating: 4.7,
    views: 278,
    match: 90,
    type: "Apartment",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
  },
  {
    id: 7,
    title: "Charming Bungalow",
    location: "Ajah, Lagos",
    price: "NGN 550,000",
    period: "/month",
    beds: 2,
    baths: 2,
    sqft: "1,600",
    rating: 4.4,
    views: 167,
    match: 82,
    type: "Bungalow",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop",
  },
  {
    id: 8,
    title: "Mini Flat Self-Con",
    location: "Surulere, Lagos",
    price: "NGN 250,000",
    period: "/month",
    beds: 1,
    baths: 1,
    sqft: "400",
    rating: 4.1,
    views: 98,
    match: 76,
    type: "Mini Flat",
    image:
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&h=400&fit=crop",
  },
];

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [typeFilter, setTypeFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    setSearch(searchParams.get("q") ?? "");
  }, [searchParams]);

  const filtered = allProperties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(search.toLowerCase()) ||
      property.location.toLowerCase().includes(search.toLowerCase());
    const matchesType =
      typeFilter === "all" || property.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-secondary/30 px-6 pb-16 pt-28 lg:px-16 xl:px-20">
        <MarketingShell>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Explore
            </p>
            <h1 className="mb-5 font-serif text-4xl leading-[1.15] text-foreground lg:text-5xl">
              Browse <span className="italic text-primary">Properties</span>
            </h1>
            <p className="mx-auto max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Discover verified rental properties curated to match your
              lifestyle, budget, and preferences.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-border bg-card p-3 shadow-md">
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <div className="relative w-full flex-1">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or location..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="h-12 border-0 bg-secondary/50 pl-9 text-sm focus-visible:ring-1"
                  />
                </div>
                <div className="flex w-full items-center gap-2 sm:w-auto">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="h-12 w-full border-0 bg-secondary/50 sm:w-[160px]">
                      <Home className="mr-1.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <SelectValue placeholder="Type" />
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
                  <div className="flex gap-1 rounded-xl border border-border bg-secondary/50 p-1">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="icon"
                      className="h-10 w-10 rounded-lg"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="icon"
                      className="h-10 w-10 rounded-lg"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MarketingShell>
      </section>

      <section className="px-6 py-16 lg:px-16 xl:px-20">
        <MarketingShell>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
                Results
              </p>
              <p className="text-sm text-muted-foreground">
                {filtered.length} properties found
              </p>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((property) => (
                <div
                  key={property.id}
                  className="group relative h-[340px] cursor-pointer overflow-hidden rounded-2xl"
                >
                  <img
                    src={property.image}
                    alt={property.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block rounded bg-primary px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                      {property.match}% match
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-border/30 bg-card/95 p-4 shadow-lg backdrop-blur-sm">
                    <div className="mb-1 flex items-start justify-between gap-2">
                      <h3 className="truncate text-sm font-semibold text-foreground">
                        {property.title}
                      </h3>
                      <p className="shrink-0 font-mono text-sm font-bold text-foreground">
                        {property.price}
                      </p>
                    </div>
                    <p className="mb-2.5 flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      <MapPin className="h-3 w-3 shrink-0" /> {property.location}
                    </p>
                    <div className="flex items-center justify-between border-t border-border/40 pt-2.5">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Bed className="h-3.5 w-3.5" /> {property.beds}
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="h-3.5 w-3.5" /> {property.baths}
                        </span>
                        <span className="flex items-center gap-1">
                          <Maximize className="h-3 w-3" /> {property.sqft}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="font-medium text-foreground">
                            {property.rating}
                          </span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" /> {property.views}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((property) => (
                <div
                  key={property.id}
                  className="overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
                >
                  <div className="flex gap-0">
                    <div className="relative h-36 w-48 shrink-0">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute left-2 top-2 inline-block rounded bg-primary px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-primary-foreground">
                        {property.match}%
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="mb-1 font-serif text-base text-foreground">
                            {property.title}
                          </h3>
                          <p className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                            <MapPin className="h-3 w-3" /> {property.location}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="font-mono text-base font-bold text-foreground">
                            {property.price}
                          </p>
                          <p className="font-mono text-[11px] text-muted-foreground">
                            {property.period}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-4 border-t border-border/40 pt-3 text-xs text-muted-foreground">
                        <Badge
                          variant="secondary"
                          className="font-mono text-[10px] uppercase tracking-wider"
                        >
                          {property.type}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Bed className="h-3.5 w-3.5" /> {property.beds} Beds
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="h-3.5 w-3.5" /> {property.baths} Baths
                        </span>
                        <span className="flex items-center gap-1">
                          <Maximize className="h-3 w-3" /> {property.sqft} sqft
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="font-medium text-foreground">
                            {property.rating}
                          </span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" /> {property.views}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
              <h3 className="mb-2 font-serif text-lg text-foreground">
                No properties found
              </h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </MarketingShell>
      </section>

      <section className="bg-[hsl(var(--dark-bg))] px-6 py-20 lg:px-16 xl:px-20">
        <MarketingShell>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 font-serif text-3xl text-primary-foreground lg:text-4xl">
              Can't Find What You're Looking For?
            </h2>
            <p className="mb-10 text-[15px] leading-relaxed text-primary-foreground/40">
              Post your housing need and let verified agents come to you with
              personalized offers.
            </p>
            <Button
              className="gap-2 rounded-lg bg-primary px-8 py-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <Link to="/signup">
                Post Your Need <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </MarketingShell>
      </section>

      <Footer />
    </div>
  );
};

export default Properties;
