import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType } from "react";
import { type PolymorphicComponentProp, cn } from "@packages/core";

type TextVariants = VariantProps<typeof textVariants>;

type TextProps<C extends ElementType = "p"> = PolymorphicComponentProp<
  C,
  TextVariants
>;

/**
 * Text Variants using CVA
 * Based on design tokens from token.css
 */
const textVariants = cva("", {
  variants: {
    variant: {
      // 역할 기반 - 가장 일반적인 패턴
      "heading-xxl":
        "text-[var(--font-size-xxl)] font-[var(--font-weight-bold)] text-[var(--color-text-primary)]",
      "heading-xl":
        "text-[var(--font-size-xl)] font-[var(--font-weight-bold)] text-[var(--color-text-primary)]",
      "heading-lg":
        "text-[var(--font-size-lg)] font-[var(--font-weight-semibold)] text-[var(--color-text-primary)]",
      "body-lg":
        "text-[var(--font-size-lg)] font-[var(--font-weight-regular)] text-[var(--color-text-primary)]",
      "body-md":
        "text-[var(--font-size-md)] font-[var(--font-weight-regular)] text-[var(--color-text-primary)]",
      "body-sm":
        "text-[var(--font-size-sm)] font-[var(--font-weight-regular)] text-[var(--color-text-primary)]",
      caption:
        "text-[var(--font-size-sm)] font-[var(--font-weight-medium)] text-[var(--color-text-secondary)]",
      label:
        "text-[var(--font-size-sm)] font-[var(--font-weight-medium)] text-[var(--color-text-primary)]",
    },
    color: {
      // 색상만 오버라이드 가능
      primary: "text-[var(--color-text-primary)]",
      secondary: "text-[var(--color-text-secondary)]",
      tertiary: "text-[var(--color-text-tertiary)]",
      inverse: "text-[var(--color-text-inverse)]",
      positive: "text-[var(--color-positive)]",
      negative: "text-[var(--color-negative)]",
      error: "text-[var(--color-error)]",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    variant: "body-md",
    color: "primary",
    align: "left",
  },
});

export const Text = <C extends ElementType = "p">({
  as,
  variant,
  color,
  align,
  className,
  children,
  ...props
}: TextProps<C>) => {
  const Component = as || "p";

  return (
    <Component
      className={cn(textVariants({ variant, color, align }), className)}
      {...props}
    >
      {children}
    </Component>
  );
};
