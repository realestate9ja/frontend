import { Search, Plus, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const listings = [
  { id: "L-001", title: "3 Bedroom Flat, Lekki Phase 1", type: "Rent", price: "₦2,500,000/yr", location: "Lagos", status: "Active", views: 45, offers: 3 },
  { id: "L-002", title: "Studio Apartment, Wuse 2", type: "Rent", price: "₦1,200,000/yr", location: "Abuja", status: "Active", views: 32, offers: 2 },
  { id: "L-003", title: "2 Bed Serviced Apartment, VI", type: "Short-let", price: "₦45,000/night", location: "Lagos", status: "Active", views: 89, offers: 7 },
  { id: "L-004", title: "4 Bedroom Duplex, Maitama", type: "Rent", price: "₦5,000,000/yr", location: "Abuja", status: "Pending", views: 12, offers: 0 },
  { id: "L-005", title: "Self-Contain, Surulere", type: "Rent", price: "₦600,000/yr", location: "Lagos", status: "Draft", views: 0, offers: 0 },
];

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  Active: "default",
  Pending: "secondary",
  Draft: "outline",
};

export default function Listings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">My Listings</h2>
          <p className="text-muted-foreground">Manage your property listings</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-1" /> Add Listing</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search listings..." className="pl-9" />
            </div>
            <Button variant="outline" size="sm">All</Button>
            <Button variant="outline" size="sm">Active</Button>
            <Button variant="outline" size="sm">Pending</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Offers</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="font-medium">{l.title}</TableCell>
                  <TableCell>{l.type}</TableCell>
                  <TableCell>{l.price}</TableCell>
                  <TableCell>{l.location}</TableCell>
                  <TableCell><Badge variant={statusVariant[l.status]}>{l.status}</Badge></TableCell>
                  <TableCell>{l.views}</TableCell>
                  <TableCell>{l.offers}</TableCell>
                  <TableCell><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
