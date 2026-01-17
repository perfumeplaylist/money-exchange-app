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
  "inline-flex items-center justify-center rounded-radius-sm font-medium text-[length:var(--font-size-md)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-button-primary-bg text-button-primary-text hover:opacity-90 focus-visible:ring-button-primary-bg",
        secondary:
          "bg-button-secondary-bg text-button-secondary-text hover:opacity-90 focus-visible:ring-button-secondary-bg",
        active:
          "bg-button-active-bg text-button-active-text hover:opacity-90 focus-visible:ring-button-active-bg",
        default:
          "bg-button-bg text-button-text hover:opacity-90 focus-visible:ring-button-bg",
      },
      size: {
        sm: "h-9 px-3 text-[length:var(--font-size-sm)]",
        md: "h-height-button px-4",
        lg: "h-12 px-6 text-[length:var(--font-size-lg)]",
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
