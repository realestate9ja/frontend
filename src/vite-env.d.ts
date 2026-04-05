/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TYPESENSE_HOST?: string;
  readonly VITE_TYPESENSE_PORT?: string;
  readonly VITE_TYPESENSE_PROTOCOL?: string;
  readonly VITE_TYPESENSE_SEARCH_API_KEY?: string;
  readonly VITE_TYPESENSE_COLLECTION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
