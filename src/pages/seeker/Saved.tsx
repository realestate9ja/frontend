import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MapPin, Star } from "lucide-react";

const saved = [
  { id: 1, property: "3 Bed Flat, Lekki Phase 1", provider: "Adebayo Johnson", price: "₦2,500,000/yr", location: "Lekki, Lagos", rating: 4.8, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop" },
  { id: 2, property: "2 Bed Serviced, Victoria Island", provider: "ShortStay NG", price: "₦45,000/night", location: "VI, Lagos", rating: 4.9, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=250&fit=crop" },
];

export default function Saved() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Saved Properties</h2>
        <p className="text-muted-foreground">Properties you've bookmarked from offers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {saved.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative">
              <img src={item.image} alt={item.property} className="w-full h-48 object-cover" />
              <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              </button>
            </div>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{item.property}</h3>
                <span className="flex items-center gap-1 text-sm">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  {item.rating}
                </span>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {item.location}
              </p>
              <div className="flex items-center justify-between pt-2">
                <p className="font-bold text-foreground">{item.price}</p>
                <Button size="sm">View Offer</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
