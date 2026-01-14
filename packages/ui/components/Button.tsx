import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType } from "react";
import { type PolymorphicComponentProp, cn } from "@packages/core";

type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonProps<C extends ElementType = "button"> = PolymorphicComponentProp<
  C,
  ButtonVariants & {
    disabled?: boolean;
  }
>;

/**
 * Button Variants using CVA
 * Based on design tokens from token.css
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[var(--radius-sm)] font-[var(--font-weight-medium)] text-[var(--font-size-md)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-button-primary-bg)] text-[var(--color-button-primary-text)] hover:opacity-90 focus-visible:ring-[var(--color-button-primary-bg)]",
        secondary:
          "bg-[var(--color-button-secondary-bg)] text-[var(--color-button-secondary-text)] hover:opacity-90 focus-visible:ring-[var(--color-button-secondary-bg)]",
        active:
          "bg-[var(--color-button-active-bg)] text-[var(--color-button-active-text)] hover:opacity-90 focus-visible:ring-[var(--color-button-active-bg)]",
        default:
          "bg-[var(--color-button-bg)] text-[var(--color-button-text)] hover:opacity-90 focus-visible:ring-[var(--color-button-bg)]",
      },
      size: {
        sm: "h-9 px-3 text-[var(--font-size-sm)]",
        md: "h-[var(--height-button)] px-4",
        lg: "h-12 px-6 text-[var(--font-size-lg)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export const Button = <C extends ElementType = "button">({
  as,
  variant,
  size,
  disabled,
  className,
  children,
  ...props
}: ButtonProps<C>) => {
  const Component = as || "button";

  return (
    <Component
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </Component>
  );
};
