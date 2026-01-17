import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormInput,
  FormErrorMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsList,
  TabsTrigger,
  Button,
  Text,
  Flex,
  Box,
} from "@packages/ui";
import { US, JP } from "country-flag-icons/react/3x2";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@packages/core";
import useEstimateKrwForm from "../hooks/useEstimateKrwForm";
import { Divider, type CurrencyCode } from "@/shared";

const CURRENCY_OPTIONS: {
  value: CurrencyCode;
  label: string;
  flagIcon: React.ComponentType<{ className?: string }>;
  countryName: string;
}[] = [
    {
      value: "USD",
      label: "미국 USD",
      flagIcon: US,
      countryName: "미국",
    },
    {
      value: "JPY",
      label: "일본 JPY",
      flagIcon: JP,
      countryName: "일본",
    },
  ];

const EstimateKrwForm = () => {
  const {
    form,
    onSubmit,
    selectedExchangeRate,
    requiredKrw,
    appliedRate,
    isQuoteLoading,
    isOrderPending,
  } = useEstimateKrwForm();

  const currency = form.watch("currency");
  const transactionType = form.watch("transactionType");
  const amount = form.watch("amount");

  // 선택된 통화 정보
  const selectedCurrency = CURRENCY_OPTIONS.find((opt) => opt.value === currency);

  // 환율 포맷팅 (API로부터 받은 appliedRate 사용)
  const formattedRate = appliedRate
    ? appliedRate.toLocaleString("ko-KR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    : "0.00";

  // 필요 원화 포맷팅
  const formattedRequiredKrw = requiredKrw.toLocaleString("ko-KR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // 거래 유형에 따른 텍스트
  const resultText = transactionType === "buy" ? "원 필요해요" : "원 받을 수 있어요";

  // 입력값에서 숫자만 추출하는 함수
  const extractNumber = (inputValue: string): number => {
    // 숫자와 소수점만 추출
    const numericString = inputValue.match(/\d+\.?\d*/)?.[0] || "";
    if (!numericString) return 0;

    const parsed = parseFloat(numericString);
    return isNaN(parsed) ? 0 : parsed;
  };

  // 입력 필드에 표시할 값: 항상 숫자만 표시
  const displayValue = amount > 0 ? amount.toString() : "";

  // 고정 텍스트 (통화 + 거래 유형)
  const suffixText = `${currency === "USD" ? "달러" : "엔"} ${transactionType === "buy" ? "사기" : "팔기"}`;

  return (
    <Box variant="form" className="w-full h-full min-h-[789px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Flex direction="column" gap="lg">
            {/* 통화 선택 헤더 */}
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full justify-between border-none shadow-none">
                      <SelectValue>
                        <Flex align="center" gap="sm">
                          {selectedCurrency && (
                            <selectedCurrency.flagIcon className="w-6 h-6 rounded-full" />
                          )}
                          <Text variant="rate_display" as="span">
                            {selectedCurrency?.label} 환전하기
                          </Text>
                        </Flex>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent
                      className="z-100 bg-background border border-border-default w-[140px] h-[104px] pt-2 pb-2 rounded-[10px]"
                      position="popper"
                      side="bottom"
                      align="start"
                      sideOffset={2}
                    >
                      {CURRENCY_OPTIONS.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="font-medium leading-[150%] hover:bg-[#F7F8FA] focus:bg-[#F7F8FA] data-highlighted:bg-[#F7F8FA] data-[state=checked]:bg-[#F7F8FA]"
                        >
                          <Flex align="center" gap="sm">
                            <option.flagIcon className="w-5 h-4 rounded-full" />
                            <Text variant="body_md" className="font-medium leading-[150%]">
                              {option.label}
                            </Text>
                          </Flex>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormErrorMessage />
                </FormItem>
              )}
            />

            {/* 매매 타입 토글 */}
            <FormField
              control={form.control}
              name="transactionType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Tabs
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <TabsList className="rounded-[16px] border border-border-default bg-background h-[83px] p-3 w-full">
                      <TabsTrigger
                        value="buy"
                        className={cn(
                          "py-4 px-[18px] rounded-[12px] text-[#FFA7A7] font-semibold text-[length:var(--font-size-smxl)]",
                          "data-[state=active]:bg-[#FE5050] data-[state=active]:text-white"
                        )}
                      >
                        살래요
                      </TabsTrigger>
                      <TabsTrigger
                        value="sell"
                        className={cn(
                          "py-4 px-[18px] rounded-[12px] text-[#9DB6FF] font-semibold text-[length:var(--font-size-smxl)]",
                          "data-[state=active]:bg-[#3479EB] data-[state=active]:text-white"
                        )}
                      >
                        팔래요
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </FormItem>
              )}
            />

            {/* 매수 금액 입력 */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Flex direction="column" gap="xs">
                    <FormLabel>
                      <Text variant="label" color="form_label">
                        {transactionType === "buy" ? "매수 금액" : "매도 금액"}
                      </Text>
                    </FormLabel>
                    <div className="relative w-full">
                      <FormInput
                        value={displayValue}
                        onChange={(e) => {
                          const numericValue = extractNumber(e.target.value);
                          field.onChange(numericValue);
                        }}
                        placeholder="0"
                        className="w-full h-[75px] text-right pr-20"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Text variant="body_md" className="text-text-secondary">
                          {suffixText}
                        </Text>
                      </div>
                    </div>
                  </Flex>
                </FormItem>
              )}
            />

            <div className="pointer-events-none w-9 h-9 rounded-full bg-background border border-border-default flex items-center justify-center mx-auto">
              <ChevronDownIcon className="w-5 h-5 text-text-secondary" />
            </div>


            {/* 필요 원화 표시 */}
            <Flex direction="column" gap="md" className="w-full">
              <Text variant="label" color="form_label">
                필요 원화
              </Text>
              <Box
                variant="container"
                className="w-full h-[75px] bg-[#F1F2F4] border border-border-default rounded-radius-sm flex items-center justify-end pr-4"
              >
                {isQuoteLoading && amount > 0 ? (
                  <Text variant="body_md" className="text-text-secondary">
                    계산 중...
                  </Text>
                ) : (
                  <div>
                    <span className="text-text-primary">{formattedRequiredKrw}</span>{" "}
                    <span className="text-primary">{resultText}</span>
                  </div>
                )}
              </Box>
            </Flex>


            <Divider />
            {/* 적용 환율 표시 */}
            {selectedExchangeRate && amount > 0 && (
              <Flex justify="between" align="center" className="w-full">
                <Text variant="wallet_label" color="form_label">
                  적용 환율
                </Text>
                {isQuoteLoading ? (
                  <Text variant="wallet_amount" as="p" className="text-text-secondary">
                    계산 중...
                  </Text>
                ) : (
                  <Text variant="wallet_amount" as="p">
                    1 {currency} = {formattedRate} 원
                  </Text>
                )}
              </Flex>
            )}

            {/* 에러 메시지 */}
            {form.formState.errors.root && (
              <Text variant="body_sm" color="error" className="text-center">
                {form.formState.errors.root.message}
              </Text>
            )}

            {/* 환전하기 버튼 */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={
                !form.formState.isValid ||
                amount <= 0 ||
                isOrderPending ||
                isQuoteLoading
              }
            >
              {isOrderPending ? "처리 중..." : "환전하기"}
            </Button>
          </Flex>
        </form>
      </Form>
    </Box>
  );
};

export default EstimateKrwForm;
