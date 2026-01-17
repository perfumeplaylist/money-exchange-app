import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@packages/core";
import { useFormField } from "./FormField.context";

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
        md: "h-height-input px-4 text-[length:var(--font-size-md)]",
      },
      error: {
        true: "border-error",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      error: false,
    },
  }
);

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ size, error, className, ...props }, ref) => {
    const { formItemId } = useFormField();
    return (
      <input
        ref={ref}
        id={formItemId}
        className={cn(inputVariants({ size, error }), className)}
        {...props}
      />
    );
  }
);

FormInput.displayName = "FormInput";
