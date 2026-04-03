import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const MarketingShell = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mx-auto w-full max-w-6xl 2xl:max-w-7xl", className)} {...props} />
);

export default MarketingShell;
