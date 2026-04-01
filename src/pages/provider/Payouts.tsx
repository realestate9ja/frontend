import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const payouts = [
  { id: "PO-301", property: "3 Bed Flat, Lekki Phase 1", amount: "₦2,375,000", platformFee: "₦125,000", type: "Rent", status: "Released", date: "2024-03-15" },
  { id: "PO-302", property: "2 Bed Serviced, VI", amount: "₦42,750", platformFee: "₦2,250", type: "Short-let", status: "Pending", date: "2024-03-18" },
  { id: "PO-303", property: "Studio, Wuse 2", amount: "₦1,140,000", platformFee: "₦60,000", type: "Rent", status: "Escrow", date: "2024-03-20" },
  { id: "PO-304", property: "2 Bed Serviced, VI", amount: "₦85,500", platformFee: "₦4,500", type: "Short-let", status: "Released", date: "2024-03-10" },
];

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  Released: "default",
  Pending: "secondary",
  Escrow: "outline",
};

export default function Payouts() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Payouts</h2>
        <p className="text-muted-foreground">Track your earnings, platform fees, and payout status.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Earnings (MTD)</p>
            <p className="text-2xl font-bold">₦3,643,250</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">In Escrow</p>
            <p className="text-2xl font-bold text-yellow-600">₦1,140,000</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Platform Fees</p>
            <p className="text-2xl font-bold text-muted-foreground">₦191,750</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Your Share</TableHead>
                <TableHead>Platform Fee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payouts.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-mono text-xs">{p.id}</TableCell>
                  <TableCell className="font-medium">{p.property}</TableCell>
                  <TableCell>{p.amount}</TableCell>
                  <TableCell className="text-muted-foreground">{p.platformFee}</TableCell>
                  <TableCell>{p.type}</TableCell>
                  <TableCell><Badge variant={statusVariant[p.status]}>{p.status}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{p.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
