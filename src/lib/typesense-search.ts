import Typesense from "typesense";
import type { DashboardSearchEntry, DashboardSearchRole } from "@/lib/dashboard-search";
import { searchDashboardEntries } from "@/lib/dashboard-search";

type TypesenseSearchDocument = {
  id: string;
  title: string;
  description: string;
  path: string;
  category: string;
  keywords?: string[];
  role: DashboardSearchRole;
};

const typesenseHost = import.meta.env.VITE_TYPESENSE_HOST;
const typesensePort = import.meta.env.VITE_TYPESENSE_PORT;
const typesenseProtocol = import.meta.env.VITE_TYPESENSE_PROTOCOL;
const typesenseApiKey = import.meta.env.VITE_TYPESENSE_SEARCH_API_KEY;
const typesenseCollection = import.meta.env.VITE_TYPESENSE_COLLECTION ?? "dashboard_search";

const isTypesenseConfigured = Boolean(
  typesenseHost && typesensePort && typesenseProtocol && typesenseApiKey,
);

const client = isTypesenseConfigured
  ? new Typesense.Client({
      nodes: [
        {
          host: typesenseHost,
          port: Number(typesensePort),
          protocol: typesenseProtocol,
        },
      ],
      apiKey: typesenseApiKey,
      connectionTimeoutSeconds: 2,
    })
  : null;

function toEntry(document: TypesenseSearchDocument): DashboardSearchEntry {
  return {
    id: document.id,
    title: document.title,
    description: document.description,
    path: document.path,
    category: document.category,
    keywords: document.keywords ?? [],
  };
}

export function hasTypesenseSearch() {
  return Boolean(client);
}

export async function searchDashboardEntriesLive(role: DashboardSearchRole, query: string) {
  const trimmed = query.trim();
  if (!trimmed) return [] as DashboardSearchEntry[];

  if (!client) {
    return searchDashboardEntries(role, trimmed);
  }

  try {
    const result = await client
      .collections<TypesenseSearchDocument>(typesenseCollection)
      .documents()
      .search({
        q: trimmed,
        query_by: "title,description,category,keywords",
        filter_by: `role:=${role}`,
        sort_by: "_text_match:desc",
        per_page: 12,
        prioritize_exact_match: true,
        exhaustive_search: true,
      });

    return (result.hits ?? [])
      .map((hit) => hit.document)
      .filter(Boolean)
      .map(toEntry);
  } catch (error) {
    console.error("Typesense search failed, falling back to local index.", error);
    return searchDashboardEntries(role, trimmed);
  }
}
