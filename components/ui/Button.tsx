"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "font-sans-tight inline-flex items-center justify-center text-sm font-medium tracking-wide whitespace-nowrap uppercase transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "rounded-full bg-bone px-7 py-4 text-ink-0 hover:bg-amber-bright",
        ghost: "px-2 py-2 text-bone hover:text-amber-bright",
        outline:
          "rounded-full border border-bone/20 px-7 py-4 text-bone hover:border-amber hover:text-amber-bright",
        link: "px-0 py-0 text-bone underline-offset-4 hover:text-amber hover:underline",
      },
      size: {
        default: "",
        sm: "px-5 py-3 text-xs",
        lg: "px-9 py-5 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    );
  },
);
Button.displayName = "Button";
