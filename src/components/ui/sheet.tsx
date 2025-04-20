// components/ui/sheet.tsx

"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;

// Custom props type for SheetPortal to support className
type SheetPortalProps = {
  className?: string;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof SheetPrimitive.Portal>;

const SheetPortal = ({ className, children, ...props }: SheetPortalProps) => (
  <SheetPrimitive.Portal {...props}>
    <div className={cn(className)}>{children}</div>
  </SheetPrimitive.Portal>
);
SheetPortal.displayName = "SheetPortal";

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity",
      className
    )}
    {...props}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

// Custom props for SheetContent to support "side"
type SheetContentProps = React.ComponentPropsWithoutRef<
  typeof SheetPrimitive.Content
> & {
  side?: "top" | "bottom" | "left" | "right";
};

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ className, side = "right", ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 bg-white dark:bg-zinc-900 p-6 shadow-lg transition-transform ease-in-out duration-300",
        side === "top" && "inset-x-0 top-0 h-1/3",
        side === "bottom" && "inset-x-0 bottom-0 h-1/3",
        side === "left" && "inset-y-0 left-0 w-3/4",
        side === "right" && "inset-y-0 right-0 w-3/4",
        className
      )}
      {...props}
    />
  </SheetPortal>
));
SheetContent.displayName = "SheetContent";

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
};
