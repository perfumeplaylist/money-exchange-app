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
      card: "bg-background border border-border-light rounded-radius-lg shadow-shadow-card p-padding-card",
      container: "bg-background border border-border-default rounded-radius-lg",
      panel: "bg-background border border-border-light rounded-radius-md",
      form: "bg-background-form border border-border-input rounded-radius-lg shadow-shadow-form p-padding-card",
      outline: "border border-border-default rounded-radius-sm",
      none: "",
    },
    padding: {
      none: "p-0",
      sm: "p-2",
      md: "p-padding-card",
      lg: "p-6",
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-radius-sm",
      md: "rounded-radius-md",
      lg: "rounded-radius-lg",
      xl: "rounded-radius-xl",
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
