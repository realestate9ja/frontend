import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardSearchRole, dashboardSearchConfig } from "@/lib/dashboard-search";
import { useDashboardSearchResults } from "@/hooks/use-dashboard-search-results";
import { searchDashboardEntriesLive } from "@/lib/typesense-search";

type DashboardHeaderSearchProps = {
  role: DashboardSearchRole;
  placeholder: string;
};

export function DashboardHeaderSearch({ role, placeholder }: DashboardHeaderSearchProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchPath } = dashboardSearchConfig[role];
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { results, loading } = useDashboardSearchResults(role, query, 6);

  useEffect(() => {
    setOpen(false);
    setMobileOpen(false);
    setQuery("");
  }, [location.pathname]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    const bestMatch = results[0] ?? (await searchDashboardEntriesLive(role, trimmed))[0];
    navigate(bestMatch ? bestMatch.path : `${searchPath}?q=${encodeURIComponent(trimmed)}`);
    setOpen(false);
    setMobileOpen(false);
  };

  return (
    <>
      <div ref={containerRef} className="relative flex-1 max-w-sm hidden sm:block">
        <form onSubmit={handleSubmit} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={placeholder}
            className="pl-9 h-9 bg-secondary/50 border-border/50 text-sm rounded-lg"
            value={query}
            onFocus={() => setOpen(true)}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
          />
        </form>

        {open && query.trim() ? (
          <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 rounded-xl border border-border/60 bg-background p-2 shadow-xl">
            {loading ? (
              <div className="px-3 py-4 text-sm text-muted-foreground">
                Searching...
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-1">
                {results.map((result) => (
                  <Link
                    key={result.id}
                    to={result.path}
                    className="flex items-start justify-between gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-accent/50"
                    onClick={() => {
                      setOpen(false);
                      setMobileOpen(false);
                    }}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{result.title}</p>
                      <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{result.description}</p>
                    </div>
                    <span className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      {result.category}
                    </span>
                  </Link>
                ))}
                <Button
                  type="button"
                  variant="ghost"
                  className="mt-1 h-9 w-full justify-between text-sm text-primary hover:text-primary"
                  onClick={() => {
                    navigate(`${searchPath}?q=${encodeURIComponent(query.trim())}`);
                    setOpen(false);
                    setMobileOpen(false);
                  }}
                >
                  View all results
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="px-3 py-4 text-sm text-muted-foreground">
                No matching dashboard content found.
              </div>
            )}
          </div>
        ) : null}
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="relative h-9 w-9 rounded-lg sm:hidden"
        onClick={() => setMobileOpen((value) => !value)}
      >
        <Search className="h-4 w-4 text-muted-foreground" />
      </Button>

      {mobileOpen ? (
        <div className="fixed inset-x-3 top-[4.25rem] z-40 rounded-xl border border-border/60 bg-background p-3 shadow-2xl sm:hidden">
          <form onSubmit={handleSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              autoFocus
              placeholder={placeholder}
              className="h-10 rounded-lg border-border/50 bg-secondary/50 pl-9 pr-10 text-sm"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-md"
              onClick={() => {
                setMobileOpen(false);
                setQuery("");
              }}
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </Button>
          </form>

          <div className="mt-3 max-h-[60vh] overflow-y-auto">
            {query.trim() ? (
              loading ? (
                <div className="px-1 py-3 text-sm text-muted-foreground">
                  Searching...
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-1">
                  {results.map((result) => (
                    <Link
                      key={result.id}
                      to={result.path}
                      className="flex items-start justify-between gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-accent/50"
                      onClick={() => {
                        setMobileOpen(false);
                        setQuery("");
                      }}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">{result.title}</p>
                        <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{result.description}</p>
                      </div>
                      <span className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                        {result.category}
                      </span>
                    </Link>
                  ))}
                  <Button
                    type="button"
                    variant="ghost"
                    className="mt-1 h-9 w-full justify-between text-sm text-primary hover:text-primary"
                    onClick={() => {
                      navigate(`${searchPath}?q=${encodeURIComponent(query.trim())}`);
                      setMobileOpen(false);
                    }}
                  >
                    View all results
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="px-1 py-3 text-sm text-muted-foreground">
                  No matching dashboard content found.
                </div>
              )
            ) : (
              <div className="px-1 py-3 text-sm text-muted-foreground">
                Start typing to search this dashboard.
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
