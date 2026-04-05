import { useEffect, useState } from "react";
import type { DashboardSearchEntry, DashboardSearchRole } from "@/lib/dashboard-search";
import { searchDashboardEntriesLive } from "@/lib/typesense-search";

export function useDashboardSearchResults(role: DashboardSearchRole, query: string, limit?: number) {
  const [results, setResults] = useState<DashboardSearchEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    const timer = window.setTimeout(async () => {
      const nextResults = await searchDashboardEntriesLive(role, trimmed);
      if (cancelled) return;
      setResults(typeof limit === "number" ? nextResults.slice(0, limit) : nextResults);
      setLoading(false);
    }, 120);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [limit, query, role]);

  return { results, loading };
}
