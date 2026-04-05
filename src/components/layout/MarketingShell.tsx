import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const MarketingShell = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mx-auto w-full max-w-[65rem] 2xl:max-w-[71rem]", className)}
    {...props}
  />
);

export default MarketingShell;
