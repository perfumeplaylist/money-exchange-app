import {
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
  Text,
  Flex,
} from "@packages/ui";
import { cn } from "@packages/core";
import { CURRENCY_OPTIONS, CURRENCY_DISPLAY_NAMES, TRANSACTION_TYPE_DISPLAY, formatAmountDisplay } from "@/entities/exchange";
import { handleKeyDown, handleChange, handlePaste } from "../utils/validate-amount-input";
import { useFormContext } from "react-hook-form";
import type { EstimateQuoteFormData } from "../model/schema";

const EstimateQuoteForm = () => {
  const form = useFormContext<EstimateQuoteFormData>();

  const currency = form.watch("currency");
  const transactionType = form.watch("transactionType");
  const amount = form.watch("amount");

  // 선택된 통화 정보
  const selectedCurrency = CURRENCY_OPTIONS.find((opt) => opt.value === currency);

  // 입력 필드에 표시할 값: 천 단위 구분 기호 포함
  const displayValue = formatAmountDisplay(amount, { emptyIfZero: true });

  // 고정 텍스트 (통화 + 거래 유형)
  const suffixText = `${CURRENCY_DISPLAY_NAMES[currency]} ${TRANSACTION_TYPE_DISPLAY[transactionType]}`;

  return (
    <Flex direction="column" gap="lg" className="w-full">
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
                  onChange={(e) => handleChange(e, field)}
                  onKeyDown={handleKeyDown}
                  onPaste={(e) => handlePaste(e, field)}
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
    </Flex>
  );
};

export default EstimateQuoteForm;
