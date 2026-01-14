import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType } from "react";
import { type PolymorphicComponentProp, cn } from "@packages/core";

type BoxVariants = VariantProps<typeof boxVariants>;

type BoxProps<C extends ElementType = "div"> = PolymorphicComponentProp<
  C,
  BoxVariants
>;

/**
 * Box Variants using CVA
 * BorderBox 역할을 하는 컴포넌트
 * Based on design tokens from token.css
 */
const boxVariants = cva("", {
  variants: {
    variant: {
      card: "bg-[var(--color-background)] border border-[var(--color-border-light)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] p-[var(--padding-card)]",
      container:
        "bg-[var(--color-background)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)]",
      panel:
        "bg-[var(--color-background)] border border-[var(--color-border-light)] rounded-[var(--radius-md)]",
      form: "bg-[var(--color-background)] border border-[var(--color-border-input)] rounded-[var(--radius-lg)] shadow-[var(--shadow-form)] p-[var(--padding-card)]",
      outline:
        "border border-[var(--color-border-default)] rounded-[var(--radius-sm)]",
      none: "",
    },
    padding: {
      none: "p-0",
      sm: "p-2",
      md: "p-[var(--padding-card)]",
      lg: "p-6",
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-[var(--radius-sm)]",
      md: "rounded-[var(--radius-md)]",
      lg: "rounded-[var(--radius-lg)]",
      xl: "rounded-[var(--radius-xl)]",
    },
  },
  defaultVariants: {
    variant: "card",
    padding: "md",
    rounded: "lg",
  },
});

export const Box = <C extends ElementType = "div">({
  as,
  variant,
  padding,
  rounded,
  className,
  children,
  ...props
}: BoxProps<C>) => {
  const Component = as || "div";

  return (
    <Component
      className={cn(boxVariants({ variant, padding, rounded }), className)}
      {...props}
    >
      {children}
    </Component>
  );
};
