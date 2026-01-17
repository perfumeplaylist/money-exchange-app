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
      // --font-size-xxxl (48px), --color-text-primary (#212529)
      heading_xxl:
        "text-[length:var(--font-size-xxxl)] font-bold text-text-primary",
      // --font-size-xl (24px), --color-text-primary (#212529)
      rate_display:
        "text-[length:var(--font-size-xl)] font-bold text-text-primary",
      // --font-size-xl (24px), --color-text-primary (#212529), font-weight 800
      wallet_title:
        "text-[length:var(--font-size-xl)] font-extrabold text-text-primary",
      // --font-size-smxl (20px), --color-text-primary (#212529), font-weight 500
      wallet_label:
        "text-[length:var(--font-size-smxl)] font-medium text-text-primary",
      // --font-size-smxl (20px), --color-text-primary (#212529), font-weight 600
      wallet_amount:
        "text-[length:var(--font-size-smxl)] font-semibold text-text-primary",
      // --font-size-smxl (20px), --color-text-primary (#212529), font-weight 700
      wallet_total_amount:
        "text-[length:var(--font-size-smxl)] font-bold text-text-primary",
      // --font-size-smxl (20px), --color-text-primary-link-hover (#36414c)
      link_strong:
        "text-[length:var(--font-size-smxl)] font-bold text-[var(--color-text-primary-link-hover)]",
      // --font-size-lg (18px), --color-text-primary (#212529)
      heading_lg:
        "text-[length:var(--font-size-lg)] font-semibold text-text-primary",
      // --font-size-smxl (20px), --color-form-label (#646f7c)
      unit_lg:
        "text-[length:var(--font-size-smxl)] font-semibold text-text-form-label",
      // --font-size-smxl (20px), --color-text-primary-link (#8899aa)
      link_lg:
        "text-[length:var(--font-size-smxl)] font-medium text-[var(--color-text-primary-link)]",
      // --font-size-lg (18px), --color-text-primary (#212529)
      body_lg:
        "text-[length:var(--font-size-lg)] font-regular text-text-primary",
      // --font-size-md (16px), --color-text-primary (#212529)
      body_md:
        "text-[length:var(--font-size-md)] font-regular text-text-primary",
      // --font-size-sm (14px), --color-text-primary (#212529)
      body_sm:
        "text-[length:var(--font-size-sm)] font-regular text-text-primary",
      // --font-size-sm (14px), --color-form-label (#646f7c)
      label: "text-[length:var(--font-size-sm)] font-medium text-form-label",
    },
    color: {
      // 색상만 오버라이드 가능
      // --color-text-primary (#212529)
      primary: "text-text-primary",
      // --color-text-secondary (#6c757d)
      secondary: "text-text-secondary",
      // --color-error (#dc3545)
      error: "text-error",
      // --color-increase (#FE5050)
      increase: "text-increase",
      // --color-decrease (#3B6EFF)
      decrease: "text-decrease",
      // --color-form-label (#646f7c)
      form_label: "text-form-label",
      // --color-accent (#0d6efd)
      accent: "text-accent",
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
