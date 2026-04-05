import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronsDown,
  ChevronsUp,
  EyeOff,
  LayoutDashboard,
  MoreHorizontal,
  Plus,
  RotateCcw,
  ScanSearch,
  SlidersHorizontal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DashboardLayoutPreset, DashboardWidgetSize } from "@/hooks/use-dashboard-layout";
import { cn } from "@/lib/utils";

export type DashboardCustomizerItem = {
  id: string;
  title: string;
  description: string;
  visible: boolean;
  size: DashboardWidgetSize;
  availableSizes: DashboardWidgetSize[];
};

export type DashboardWidgetMenuControls = {
  availableSizes: DashboardWidgetSize[];
  canMoveDown: boolean;
  canPinBottom: boolean;
  canPinTop: boolean;
  canMoveUp: boolean;
  currentSize: DashboardWidgetSize;
  editing?: boolean;
  onFocus?: () => void;
  onHide: () => void;
  onMove: (direction: "up" | "down") => void;
  onMoveTo: (position: "top" | "bottom") => void;
  onReset: () => void;
  onSizeChange: (size: DashboardWidgetSize) => void;
  title: string;
};

type DashboardCustomizerToolbarProps = {
  editing: boolean;
  hiddenCount: number;
  onApplyPreset: (preset: DashboardLayoutPreset) => void;
  onEditChange: (editing: boolean) => void;
  onReset: () => void;
};

type DashboardHiddenWidgetsProps = {
  items: DashboardCustomizerItem[];
  onShow: (itemId: string) => void;
};

type DashboardEditableWidgetProps = {
  children: React.ReactNode;
  editing: boolean;
  index: number;
  item: DashboardCustomizerItem;
  total: number;
  onHide: (itemId: string) => void;
  onMove: (itemId: string, direction: "up" | "down") => void;
  onSizeChange: (itemId: string, size: DashboardWidgetSize) => void;
};

const sizeLabels: Record<DashboardWidgetSize, string> = {
  compact: "1 col",
  wide: "2 col",
  full: "Full",
};

export const dashboardSizeClasses: Record<DashboardWidgetSize, string> = {
  compact: "lg:col-span-1",
  wide: "lg:col-span-2",
  full: "lg:col-span-3",
};

export function DashboardWidgetMenu({ controls }: { controls: DashboardWidgetMenuControls }) {
  if (controls.editing) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-transparent hover:border-border/70">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="pb-1">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">{controls.title}</p>
            <p className="text-xs font-normal text-muted-foreground">Dashboard widget controls</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {controls.onFocus ? (
          <>
            <DropdownMenuItem onClick={controls.onFocus}>
              <ScanSearch className="mr-2 h-4 w-4" /> Open focus view
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        ) : null}
        <DropdownMenuLabel>Position</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => controls.onMoveTo("top")} disabled={!controls.canPinTop}>
          <ChevronsUp className="mr-2 h-4 w-4" /> Pin to top
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => controls.onMoveTo("bottom")} disabled={!controls.canPinBottom}>
          <ChevronsDown className="mr-2 h-4 w-4" /> Send to bottom
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => controls.onMove("up")} disabled={!controls.canMoveUp}>
          <ArrowUp className="mr-2 h-4 w-4" /> Move up
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => controls.onMove("down")} disabled={!controls.canMoveDown}>
          <ArrowDown className="mr-2 h-4 w-4" /> Move down
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            Size and layout
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-44">
            <DropdownMenuLabel>Widget width</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={controls.currentSize} onValueChange={(value) => controls.onSizeChange(value as DashboardWidgetSize)}>
              {controls.availableSizes.map((size) => (
                <DropdownMenuRadioItem key={size} value={size}>
                  {sizeLabels[size]}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem onClick={controls.onReset}>
          <RotateCcw className="mr-2 h-4 w-4" /> Restore widget defaults
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={controls.onHide}>
          <EyeOff className="mr-2 h-4 w-4" /> Hide widget
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DashboardCustomizerToolbar({
  editing,
  hiddenCount,
  onApplyPreset,
  onEditChange,
  onReset,
}: DashboardCustomizerToolbarProps) {
  if (!editing) {
    return (
      <Button variant="outline" size="sm" className="h-9 gap-2 rounded-full border-border/70 bg-background/90 px-4 text-sm shadow-sm" onClick={() => onEditChange(true)}>
        <LayoutDashboard className="h-4 w-4" /> Customize layout
      </Button>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-border/70 bg-card/95 px-3 py-2.5 shadow-sm">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary">
            <SlidersHorizontal className="h-4 w-4" />
          </div>
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-foreground">Customize layout</p>
              <Badge variant="outline" className="h-5 rounded-full px-2 text-[10px] font-normal">
                Auto-saved
              </Badge>
              {hiddenCount > 0 ? (
                <Badge variant="outline" className="h-5 rounded-full px-2 text-[10px] font-normal">
                  {hiddenCount} hidden
                </Badge>
              ) : null}
            </div>
            <p className="text-xs text-muted-foreground">
              Resize, reorder, or hide cards without leaving the dashboard.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <div className="grid w-full grid-cols-3 rounded-2xl border border-border/70 bg-muted/30 p-1 sm:inline-flex sm:w-auto sm:flex-wrap sm:items-center sm:rounded-full">
            <Button type="button" variant="ghost" size="sm" className="h-7 rounded-full px-3 text-xs" onClick={() => onApplyPreset("balanced")}>
              Balanced
            </Button>
            <Button type="button" variant="ghost" size="sm" className="h-7 rounded-full px-3 text-xs" onClick={() => onApplyPreset("compact")}>
              Compact
            </Button>
            <Button type="button" variant="ghost" size="sm" className="h-7 rounded-full px-3 text-xs" onClick={() => onApplyPreset("expanded")}>
              Expanded
            </Button>
          </div>
          <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:items-center">
            <Button type="button" variant="ghost" size="sm" className="h-7 gap-2 rounded-full px-3 text-xs" onClick={onReset}>
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </Button>
            <Button type="button" size="sm" className="h-7 gap-2 rounded-full px-3 text-xs" onClick={() => onEditChange(false)}>
              <Check className="h-3.5 w-3.5" /> Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardHiddenWidgets({ items, onShow }: DashboardHiddenWidgetsProps) {
  if (items.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border/60 bg-muted/20 px-3 py-2.5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">Hidden widgets</p>
          <p className="text-xs text-muted-foreground">Bring back any cards you removed without leaving edit mode.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <Button
              key={item.id}
              type="button"
              variant="outline"
              size="sm"
              className="h-7 w-full justify-center gap-2 rounded-full sm:w-auto"
              onClick={() => onShow(item.id)}
            >
              <Plus className="h-3.5 w-3.5" /> {item.title}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DashboardEditableWidget({
  children,
  editing,
  index,
  item,
  total,
  onHide,
  onMove,
  onSizeChange,
}: DashboardEditableWidgetProps) {
  return (
    <div className={cn(dashboardSizeClasses[item.size], "min-w-0 self-start")}>
      <div
        className={cn(
          "relative transition-all",
          editing && "rounded-[1.45rem] ring-1 ring-border/80 ring-offset-2 ring-offset-background",
        )}
      >
        {editing ? (
          <div className="pointer-events-none absolute inset-x-2 top-2 z-20 flex flex-col gap-2 sm:inset-x-3 sm:top-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="pointer-events-auto inline-flex max-w-full items-center gap-2 self-start rounded-full border border-border/80 bg-background/95 px-2.5 py-1 shadow-sm backdrop-blur">
              <p className="max-w-[10rem] truncate text-[11px] font-medium text-foreground">{item.title}</p>
              <Badge variant="outline" className="h-5 rounded-full px-2 text-[10px] font-normal">
                  {index + 1}/{total}
                </Badge>
            </div>

            <div className="pointer-events-auto flex w-full flex-col gap-2 sm:w-auto sm:items-end">
              <div className="grid w-full grid-cols-1 rounded-2xl border border-border/80 bg-background/95 p-1 shadow-sm backdrop-blur sm:inline-flex sm:w-auto sm:flex-wrap sm:items-center sm:rounded-full">
                  {item.availableSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => onSizeChange(item.id, size)}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors",
                        item.size === size
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {sizeLabels[size]}
                    </button>
                  ))}
              </div>

              <div className="grid w-full grid-cols-2 gap-1 rounded-2xl border border-border/80 bg-background/95 p-1 shadow-sm backdrop-blur sm:inline-flex sm:w-auto sm:grid-cols-none sm:gap-0 sm:rounded-full">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 rounded-full px-2"
                    onClick={() => onMove(item.id, "up")}
                    disabled={index === 0}
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 rounded-full px-2"
                    onClick={() => onMove(item.id, "down")}
                    disabled={index === total - 1}
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </Button>
              </div>

              <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 w-full gap-1.5 rounded-full border border-border/80 bg-background/95 px-2.5 text-xs text-muted-foreground shadow-sm backdrop-blur hover:text-foreground sm:w-auto"
                  onClick={() => onHide(item.id)}
                >
                  <EyeOff className="h-3.5 w-3.5" /> Hide
                </Button>
            </div>
          </div>
        ) : null}
        <div className={cn(editing && "pt-32 sm:pt-14")}>{children}</div>
      </div>
    </div>
  );
}
