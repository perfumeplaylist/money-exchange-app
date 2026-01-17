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
      small_card:"bg-background border border-border-light rounded-radius-lg px-padding-card-lg py-padding-card-lg",
      container: "bg-background border border-border-default rounded-radius-lg",
      form: "bg-background-form border border-border-input rounded-radius-lg shadow-shadow-form p-padding-form",
      wallet: "bg-background-form border border-border-wallet rounded-radius-wallet p-padding-wallet",
    },
  },
  defaultVariants: {
    variant: "container",
  },
});

export const Box = <C extends ElementType = "div">({
  as,
  variant,
  className,
  children,
  ...props
}: BoxProps<C>) => {
  const Component = as || "div";

  return (
    <Component
      className={cn(boxVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Component>
  );
};
