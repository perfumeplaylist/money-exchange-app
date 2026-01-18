import { mutationOptions } from "@tanstack/react-query";
import { postExchangeRateHistoryApi } from "@/entities/exchange";
import type { PostExchangeRateHistory } from "@/entities/exchange";

export const create_order_mutation_key = {
  createOrder: () => ["create-order"],
};

export const create_order_mutation_option = {
  createOrder: () => mutationOptions({
    mutationKey: create_order_mutation_key.createOrder(),
    mutationFn: (body: PostExchangeRateHistory) => postExchangeRateHistoryApi(body),
  }),
};
