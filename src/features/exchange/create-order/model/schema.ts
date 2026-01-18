import { z } from "zod";
import type { CurrencyCode } from "@/shared";

export const createOrderSchema = z.object({
  exchangeRateId: z.number().positive(),
  fromCurrency: z.custom<CurrencyCode>(),
  toCurrency: z.custom<CurrencyCode>(),
  forexAmount: z.number().positive(),
});

export type CreateOrderData = z.infer<typeof createOrderSchema>;
