import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, BedDouble, Building2, CheckCircle2, DoorOpen, FileText, Plus, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { properties } from "./Properties";
import { units } from "./Units";

const unitTypes = ["Mini Flat", "Self Contain", "1 Bed Flat", "2 Bed Flat", "3 Bed Penthouse"];

export default function LandlordNewUnit() {
  const navigate = useNavigate();
  const [property, setProperty] = useState(properties[0]?.name ?? "");
  const [unitName, setUnitName] = useState("");
  const [unitType, setUnitType] = useState("2 Bed Flat");
  const [rent, setRent] = useState("");
  const [status, setStatus] = useState("Vacant");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const propertyUnits = useMemo(
    () => units.filter((item) => item.property === property),
    [property],
  );

  if (submitted) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center space-y-5 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold text-foreground">Unit added successfully</h1>
          <p className="text-sm text-muted-foreground">
            {unitName || "The unit"} has been added under {property}. You can now manage occupancy, lease state, and collection readiness from the units directory.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="outline" asChild>
            <Link to="/landlord/units">Back to Units</Link>
          </Button>
          <Button onClick={() => navigate("/landlord/properties")}>Open Properties</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2">
            <Button variant="ghost" size="sm" className="gap-1.5 px-0 text-muted-foreground" asChild>
              <Link to="/landlord/units">
                <ArrowLeft className="h-4 w-4" /> Back to Units
              </Link>
            </Button>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Add Unit</h1>
          <p className="mt-1 text-sm text-muted-foreground">Register a new rentable unit under your portfolio and prepare it for occupancy or listing.</p>
        </div>
        <Badge variant="outline" className="w-fit bg-primary/10 text-primary border-primary/20">
          Landlord workflow
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.9fr)]">
        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Unit Details</CardTitle>
            <CardDescription>Capture the unit identity, rent plan, and readiness note used across your dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Property</label>
                <select
                  value={property}
                  onChange={(event) => setProperty(event.target.value)}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground"
                >
                  {properties.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Unit Name / Number</label>
                <Input placeholder="e.g. Palm Residence C4" value={unitName} onChange={(event) => setUnitName(event.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Unit Type</label>
                <select
                  value={unitType}
                  onChange={(event) => setUnitType(event.target.value)}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground"
                >
                  {unitTypes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Status</label>
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground"
                >
                  <option>Vacant</option>
                  <option>Occupied</option>
                  <option>Notice given</option>
                  <option>Under maintenance</option>
                </select>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-sm font-medium text-foreground">Rent</label>
                <Input placeholder="e.g. N850,000" value={rent} onChange={(event) => setRent(event.target.value)} />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-sm font-medium text-foreground">Readiness Note</label>
                <Textarea
                  rows={4}
                  placeholder="e.g. Ready to list after repainting, corporate tenant preferred, meter recently replaced..."
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-border/60 pt-4 sm:flex-row sm:justify-end">
              <Button variant="outline" asChild>
                <Link to="/landlord/units">Cancel</Link>
              </Button>
              <Button
                onClick={() => setSubmitted(true)}
                disabled={!unitName.trim() || !rent.trim()}
                className="gap-1.5"
              >
                <Plus className="h-4 w-4" /> Save Unit
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border border-border/60 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Property Snapshot</CardTitle>
              <CardDescription>Context from the selected building so you place the new unit correctly.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-muted/40 p-3">
                <p className="flex items-center gap-1 text-xs text-muted-foreground"><Building2 className="h-3 w-3" /> Property</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{property}</p>
              </div>
              <div className="rounded-xl bg-muted/40 p-3">
                <p className="flex items-center gap-1 text-xs text-muted-foreground"><DoorOpen className="h-3 w-3" /> Existing units</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{propertyUnits.length}</p>
              </div>
              <div className="rounded-xl bg-muted/40 p-3">
                <p className="flex items-center gap-1 text-xs text-muted-foreground"><Wallet className="h-3 w-3" /> Typical rent</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{propertyUnits[0]?.rent ?? "Set manually"}</p>
              </div>
              <div className="rounded-xl bg-muted/40 p-3">
                <p className="flex items-center gap-1 text-xs text-muted-foreground"><BedDouble className="h-3 w-3" /> Common type</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{propertyUnits[0]?.type ?? unitType}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/60 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Current Units</CardTitle>
              <CardDescription>Existing units under {property}.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {propertyUnits.map((item) => (
                <div key={item.id} className="rounded-xl border border-border/60 bg-secondary/20 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{item.type} · {item.tenant}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px]">{item.state}</Badge>
                  </div>
                </div>
              ))}
              <div className="rounded-xl border border-dashed border-border/70 bg-muted/20 p-3 text-xs text-muted-foreground">
                <div className="flex items-start gap-2">
                  <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  Add new units here before pushing them into listing, lease, or collection workflows.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
