import React from "react";
import { cn } from "@/lib/utils";

export const genericBoxClass =
  "w-full border rounded shadow relative bg-card text-card-foreground";

const defaultBoxClass = cn(
  genericBoxClass,
  "my-5 group-[.reg]:my-0 group-[.reg]:shadow-none group-[.reg]:rounded-none group-[.reg]:border-0 group-[.reg]:border-b group-[.reg]:last:border-0",
);

const Box = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(defaultBoxClass, className)} {...props} />
));
Box.displayName = "Box";

const defaultBoxGroupClass = cn(genericBoxClass, "group reg my-5");

const BoxGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(defaultBoxGroupClass, className)} {...props} />
));
BoxGroup.displayName = "BoxGroup";

export { Box, BoxGroup };
