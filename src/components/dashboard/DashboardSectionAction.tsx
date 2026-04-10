import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

type DashboardSectionActionProps = {
  to?: string;
  children: ReactNode;
};

export function DashboardSectionAction({ to, children }: DashboardSectionActionProps) {
  if (to) {
    return (
      <Button variant="ghost" size="sm" className="h-7 px-1.5 text-xs text-primary shadow-none" asChild>
        <Link to={to}>
          {children}
          <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </Button>
    );
  }

  return (
    <Button variant="ghost" size="sm" className="h-7 px-1.5 text-xs text-primary shadow-none">
      {children}
      <ArrowRight className="ml-1 h-3 w-3" />
    </Button>
  );
}
