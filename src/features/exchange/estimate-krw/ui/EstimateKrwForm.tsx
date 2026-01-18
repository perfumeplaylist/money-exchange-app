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
import type { ControllerRenderProps } from "react-hook-form";
import type { EstimateKrwFormData } from "../model/schema";

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

  // 정규식 패턴: 정수 또는 소수점 2자리까지
  const VALID_NUMBER_PATTERN = /^\d+(\.\d{0,2})?$/;

  // 천 단위 구분 기호가 포함된 값을 포맷팅
  const formatDisplayValue = (num: number): string => {
    if (num === 0) return '';
    return num.toLocaleString('ko-KR', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  };

  // 입력 필드에 표시할 값: 천 단위 구분 기호 포함
  const displayValue = formatDisplayValue(amount);

  // 고정 텍스트 (통화 + 거래 유형)
  const suffixText = `${currency === "USD" ? "달러" : "엔"} ${transactionType === "buy" ? "사기" : "팔기"}`;

  // 키보드 입력 필터링 (정규식 활용)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 제어 키 (복사, 붙여넣기, 선택 등)
    const isControlKey = e.ctrlKey || e.metaKey;
    const isAllowedControl = /^[acxv]$/i.test(e.key);

    // 네비게이션 키
    const isNavigationKey = /^(Backspace|Delete|Tab|Escape|Enter|Arrow(Left|Right|Up|Down)|Home|End)$/.test(e.key);

    // 숫자 키
    const isNumberKey = /^[0-9]$/.test(e.key);

    // 소수점 키 (이미 소수점이 없을 때만)
    const currentValue = e.currentTarget.value.replace(/,/g, '');
    const isDecimalKey = e.key === '.' && !currentValue.includes('.');

    // 허용되지 않는 키는 차단
    if (!isNumberKey && !isDecimalKey && !isNavigationKey && !(isControlKey && isAllowedControl)) {
      e.preventDefault();
    }
  };

  // onChange 핸들러 (정규식으로 필터링)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<EstimateKrwFormData, "amount">
  ) => {
    const inputValue = e.target.value.replace(/,/g, ''); // 콤마 제거

    // 빈 문자열 허용
    if (inputValue === '') {
      field.onChange(0);
      return;
    }

    // 정규식으로 유효한 숫자 형식만 허용 (소수점 2자리까지)
    if (VALID_NUMBER_PATTERN.test(inputValue)) {
      const numericValue = parseFloat(inputValue);
      field.onChange(numericValue);
    }
    // 유효하지 않은 입력은 이전 값 유지 (리렌더링 방지)
  };

  // 붙여넣기 처리 (정규식으로 필터링)
  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    field: ControllerRenderProps<EstimateKrwFormData, "amount">
  ) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text').replace(/,/g, '');

    if (VALID_NUMBER_PATTERN.test(pastedText) || pastedText === '') {
      const numericValue = pastedText === '' ? 0 : parseFloat(pastedText);
      field.onChange(numericValue);
    }
  };

  return (
    <Box variant="form" className="w-full h-full border-border-wallet">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full">
          <Flex direction="column" justify="between" className="w-full h-full">
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

              <div className="pointer-events-none w-9 h-9 rounded-full bg-[#ACB4BB] border border-border-default flex items-center justify-center mx-auto">
                <ChevronDownIcon className="w-5 h-5 text-white" />
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
            </Flex>



            <Flex direction="column" gap="lg" className="w-full">

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
                variant="default"
                size="xl"
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
          </Flex>
        </form>
      </Form>
    </Box>
  );
};

export default EstimateKrwForm;
