import { z } from "zod";
import type { CurrencyCode } from "@/shared";

export const estimateQuoteSchema = z.object({
  currency: z.custom<CurrencyCode>((val) => {
    return val === "USD" || val === "JPY";
  }, {
    message: "USD 또는 JPY를 선택해주세요.",
  }),
  transactionType: z.enum(["buy", "sell"]),
  amount: z
    .number({
      message: "금액을 입력해주세요.",
    })
    .positive({
      message: "금액은 0보다 커야 합니다.",
    })
    .refine(
      (val) => {
        // 소수점 2자리까지 허용
        const decimalPlaces = (val.toString().split(".")[1] || "").length;
        return decimalPlaces <= 2;
      },
      {
        message: "소수점은 2자리까지 입력 가능합니다.",
      }
    ),
});

export type EstimateQuoteFormData = z.infer<typeof estimateQuoteSchema>;
