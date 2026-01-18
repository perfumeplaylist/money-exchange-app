import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { estimateQuoteSchema, type EstimateQuoteFormData } from "@/features/exchange/estimate-quote/model/schema";

const useEstimateKrwForm = () => {
  const form = useForm<EstimateQuoteFormData>({
    resolver: zodResolver(estimateQuoteSchema),
    mode: "onChange",
    defaultValues: {
      currency: "USD",
      transactionType: "buy",
      amount: 0,
    },
  });

  const currency = form.watch("currency");
  const transactionType = form.watch("transactionType");
  const amount = form.watch("amount");

  return {
    form,
    currency,
    transactionType,
    amount,
  };
};

export default useEstimateKrwForm;
