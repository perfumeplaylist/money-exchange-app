import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@packages/core";

type InputVariants = VariantProps<typeof inputVariants>;

type InputProps = InputVariants &
  React.InputHTMLAttributes<HTMLInputElement> & {
    error?: boolean;
  };

/**
 * Input Variants using CVA
 * Based on design tokens from token.css
 */
const inputVariants = cva(
  "w-full bg-[var(--color-background)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] border border-[var(--color-border-input)] rounded-[var(--radius-sm)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        sm: "h-9 px-3 text-[var(--font-size-sm)]",
        md: "h-[var(--height-input)] px-4 text-[var(--font-size-md)]",
        lg: "h-12 px-4 text-[var(--font-size-lg)]",
      },
      error: {
        true: "border-[var(--color-error)] focus-visible:ring-[var(--color-error)]",
        false:
          "focus-visible:ring-[var(--color-accent)] focus-visible:border-[var(--color-accent)]",
      },
    },
    defaultVariants: {
      size: "md",
      error: false,
    },
  }
);

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size, error, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputVariants({ size, error }), className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
