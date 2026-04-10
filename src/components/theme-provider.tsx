import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  forcedTheme,
}: {
  children: React.ReactNode;
  forcedTheme?: "light" | "dark";
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      forcedTheme={forcedTheme}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
