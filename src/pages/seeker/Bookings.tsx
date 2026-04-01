import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const bookings = [
  { id: "BK-001", property: "3 Bed Flat, Lekki Phase 1", provider: "Adebayo Johnson", amount: "₦2,500,000", status: "Escrow", stage: "Awaiting Viewing", date: "2024-03-20" },
  { id: "BK-002", property: "2 Bed Serviced, VI", provider: "ShortStay NG", amount: "₦135,000", status: "Confirmed", stage: "Check-in Mar 22", date: "2024-03-18" },
  { id: "BK-003", property: "Studio, Wuse 2", provider: "Chioma Okafor", amount: "₦1,200,000", status: "Completed", stage: "Moved In", date: "2024-02-15" },
];

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  Escrow: "secondary",
  Confirmed: "default",
  Completed: "outline",
  Cancelled: "destructive",
};

export default function Bookings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Bookings & Escrow</h2>
        <p className="text-muted-foreground">Track your active bookings, payments, and escrow timelines.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Active Bookings</p>
            <p className="text-2xl font-bold">2</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">In Escrow</p>
            <p className="text-2xl font-bold text-yellow-600">₦2,500,000</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold text-green-600">1</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Date</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-mono text-xs">{b.id}</TableCell>
                  <TableCell className="font-medium">{b.property}</TableCell>
                  <TableCell>{b.provider}</TableCell>
                  <TableCell>{b.amount}</TableCell>
                  <TableCell><Badge variant={statusVariant[b.status]}>{b.status}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{b.stage}</TableCell>
                  <TableCell className="text-muted-foreground">{b.date}</TableCell>
                  <TableCell><Button size="sm" variant="outline">View</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
