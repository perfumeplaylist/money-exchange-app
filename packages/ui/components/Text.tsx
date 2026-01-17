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
// packages/ui/components/Text.tsx

const textVariants = cva("", {
  variants: {
    variant: {
      // 역할 기반 - 가장 일반적인 패턴
      heading_xxl:
        "text-[length:var(--font-size-xxxl)] font-bold text-text-primary",
      heading_xl:
        "text-[length:var(--font-size-xxl)] font-bold text-text-primary",
      link_strong:
        "text-[length:var(--font-size-smxl)] font-bold text-[var(--color-text-primary-link-hover)]",
      heading_lg:
        "text-[length:var(--font-size-lg)] font-semibold text-text-primary",
      link_lg:
        "text-[length:var(--font-size-smxl)] font-medium text-[var(--color-text-primary-link)]",
      body_lg:
        "text-[length:var(--font-size-lg)] font-regular text-text-primary",
      body_md:
        "text-[length:var(--font-size-md)] font-regular text-text-primary",
      body_sm:
        "text-[length:var(--font-size-sm)] font-regular text-text-primary",
      caption:
        "text-[length:var(--font-size-sm)] font-medium text-text-secondary",
      label: "text-[length:var(--font-size-sm)] font-medium text-form-label",
    },
    color: {
      // 색상만 오버라이드 가능
      primary: "text-text-primary",
      secondary: "text-text-secondary",
      tertiary: "text-text-tertiary",
      inverse: "text-text-inverse",
      positive: "text-positive",
      negative: "text-negative",
      error: "text-error",
      link_hover: "text-text-primary-link-hover",
      link: "text-text-primary-link",
      form_label: "text-form-label",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    variant: "body_md",
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
