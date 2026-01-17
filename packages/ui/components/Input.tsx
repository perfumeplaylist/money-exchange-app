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
  "w-full bg-background text-text-primary placeholder:text-text-placeholder border border-border-input rounded-radius-sm transition-colors outline-none focus:outline-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        sm: "h-9 px-3 text-[length:var(--font-size-sm)]",
        md: "h-height-input px-4 text-[length:var(--font-size-md)]",
        lg: "h-12 px-4 text-[length:var(--font-size-lg)]",
      },
      variant: {
        default: "",
        result: "h-[75px] bg-[#F7F8FA] border-border-default text-right",
      },
      error: {
        true: "border-error",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      error: false,
    },
  }
);

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size, variant, error, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputVariants({ size, variant, error }), className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
