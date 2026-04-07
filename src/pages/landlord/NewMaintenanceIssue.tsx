import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowLeft, CheckCircle2, ClipboardList, Plus, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { units } from "./Units";

const vendors = ["Vendor pending", "Rapid Repairs", "PowerFix Ltd", "Prime Facility Services"];

export default function LandlordNewMaintenanceIssue() {
  const navigate = useNavigate();
  const [unit, setUnit] = useState(units[0]?.name ?? "");
  const [issue, setIssue] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [assigned, setAssigned] = useState(vendors[0]);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedUnit = useMemo(
    () => units.find((item) => item.name === unit),
    [unit],
  );

  if (submitted) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center space-y-5 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold text-foreground">Issue logged successfully</h1>
          <p className="text-sm text-muted-foreground">
            {issue || "The maintenance issue"} has been added for {unit}. You can now track vendor progress and resolution from the maintenance queue.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="outline" asChild>
            <Link to="/landlord/maintenance">Back to Maintenance</Link>
          </Button>
          <Button onClick={() => navigate("/landlord/units")}>Open Units</Button>
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
              <Link to="/landlord/maintenance">
                <ArrowLeft className="h-4 w-4" /> Back to Maintenance
              </Link>
            </Button>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Log Maintenance Issue</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create a new work order for repairs, inspections, or vendor follow-up inside your portfolio.</p>
        </div>
        <Badge variant="outline" className="w-fit border-amber-200 bg-amber-50 text-amber-700">
          Maintenance workflow
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.9fr)]">
        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Issue Details</CardTitle>
            <CardDescription>Capture the affected unit, urgency, and vendor state for clean operational tracking.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Affected Unit</label>
                <select
                  value={unit}
                  onChange={(event) => setUnit(event.target.value)}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground"
                >
                  {units.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Priority</label>
                <select
                  value={priority}
                  onChange={(event) => setPriority(event.target.value)}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground"
                >
                  <option>Normal</option>
                  <option>Urgent</option>
                </select>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-sm font-medium text-foreground">Issue Title</label>
                <Input placeholder="e.g. Water heater replacement" value={issue} onChange={(event) => setIssue(event.target.value)} />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-sm font-medium text-foreground">Assigned Vendor</label>
                <select
                  value={assigned}
                  onChange={(event) => setAssigned(event.target.value)}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground"
                >
                  {vendors.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-sm font-medium text-foreground">Work Note</label>
                <Textarea
                  rows={4}
                  placeholder="Describe the issue, tenant impact, access constraints, or what the vendor should know..."
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-border/60 pt-4 sm:flex-row sm:justify-end">
              <Button variant="outline" asChild>
                <Link to="/landlord/maintenance">Cancel</Link>
              </Button>
              <Button
                onClick={() => setSubmitted(true)}
                disabled={!issue.trim()}
                className="gap-1.5"
              >
                <Plus className="h-4 w-4" /> Log Issue
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border border-border/60 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Unit Context</CardTitle>
              <CardDescription>Operational details for the selected unit.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-muted/40 p-3">
                <p className="flex items-center gap-1 text-xs text-muted-foreground"><ClipboardList className="h-3 w-3" /> Unit</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{selectedUnit?.name ?? unit}</p>
              </div>
              <div className="rounded-xl bg-muted/40 p-3">
                <p className="flex items-center gap-1 text-xs text-muted-foreground"><Wrench className="h-3 w-3" /> Current state</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{selectedUnit?.state ?? "Unknown"}</p>
              </div>
              <div className="rounded-xl bg-muted/40 p-3">
                <p className="flex items-center gap-1 text-xs text-muted-foreground"><AlertTriangle className="h-3 w-3" /> Tenant</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{selectedUnit?.tenant ?? "Vacant"}</p>
              </div>
              <div className="rounded-xl bg-muted/40 p-3">
                <p className="flex items-center gap-1 text-xs text-muted-foreground"><ClipboardList className="h-3 w-3" /> Lease</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{selectedUnit?.lease ?? "Not set"}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/60 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Queue Guidance</CardTitle>
              <CardDescription>Use consistent issue records to keep vendors and tenants aligned.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Log one issue per repair topic so status stays clear.",
                "Use Urgent only when tenant safety or essential services are affected.",
                "Capture the vendor state immediately if work is already assigned.",
              ].map((item) => (
                <div key={item} className="rounded-xl border border-border/60 bg-secondary/20 p-3 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
