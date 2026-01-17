import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType } from "react";
import { type PolymorphicComponentProp, cn } from "@packages/core";

type FlexVariants = VariantProps<typeof flexVariants>;

type FlexProps<C extends ElementType = "div"> = PolymorphicComponentProp<
  C,
  FlexVariants
>;

/**
 * Flex Variants using CVA
 * Flexbox 레이아웃 컴포넌트
 * Based on design tokens from token.css
 */
const flexVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      "row-reverse": "flex-row-reverse",
      column: "flex-col",
      "column-reverse": "flex-col-reverse",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    gap: {
      none: "gap-0",
      xxs: "gap-spacing-xxs",
      xs: "gap-spacing-xs",
      sm: "gap-spacing-sm",
      md: "gap-spacing-md",
      lg: "gap-spacing-lg",
      xl: "gap-spacing-xl",
      xxl: "gap-spacing-xxl",
    },
    wrap: {
      nowrap: "flex-nowrap",
      wrap: "flex-wrap",
      "wrap-reverse": "flex-wrap-reverse",
    },
  },
  defaultVariants: {
    direction: "row",
    align: "start",
    justify: "start",
    gap: "none",
    wrap: "nowrap",
  },
});

export const Flex = <C extends ElementType = "div">({
  as,
  direction,
  align,
  justify,
  gap,
  wrap,
  className,
  children,
  ...props
}: FlexProps<C>) => {
  const Component = as || "div";

  return (
    <Component
      className={cn(
        flexVariants({ direction, align, justify, gap, wrap }),
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
