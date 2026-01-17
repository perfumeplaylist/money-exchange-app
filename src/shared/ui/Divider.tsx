import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@packages/core";

const dividerVariants = cva("w-full h-[1px] bg-border-default", {
  variants: {
    marginTop: {
      none: "mt-0",
      xs: "mt-1", // 4px
      sm: "mt-2", // 8px
      md: "mt-4", // 16px
      lg: "mt-6", // 24px
      xl: "mt-8", // 32px
      xxl: "mt-12", // 48px
    },
    marginBottom: {
      none: "mb-0",
      xs: "mb-1", // 4px
      sm: "mb-2", // 8px
      md: "mb-4", // 16px
      lg: "mb-6", // 24px
      xl: "mb-8", // 32px
      xxl: "mb-12", // 48px
    },
  },
  defaultVariants: {
    marginTop: undefined,
    marginBottom: undefined,
  },
});

type DividerVariants = VariantProps<typeof dividerVariants>;

interface DividerProps extends DividerVariants {
  /**
   * 추가 className
   */
  className?: string;
}

const Divider = ({ marginTop, marginBottom, className }: DividerProps) => {
  return (
    <div
      className={cn(
        dividerVariants({
          marginTop,
          marginBottom,
        }),
        className
      )}
    />
  );
};

export default Divider;