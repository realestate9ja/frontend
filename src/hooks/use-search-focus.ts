import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function useSearchFocus() {
  const [searchParams] = useSearchParams();
  const focus = searchParams.get("focus");

  useEffect(() => {
    if (!focus) return;

    const timer = window.setTimeout(() => {
      const target = document.querySelector<HTMLElement>(`[data-search-id="${focus}"]`);
      if (!target) return;

      target.scrollIntoView({ behavior: "smooth", block: "center" });
      target.classList.add("ring-2", "ring-primary/40", "ring-offset-2", "ring-offset-background");

      const clearTimer = window.setTimeout(() => {
        target.classList.remove("ring-2", "ring-primary/40", "ring-offset-2", "ring-offset-background");
      }, 2200);

      return () => window.clearTimeout(clearTimer);
    }, 120);

    return () => window.clearTimeout(timer);
  }, [focus]);

  return focus;
}
