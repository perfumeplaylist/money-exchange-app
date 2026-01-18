import type { ControllerRenderProps } from "react-hook-form";
import type { EstimateQuoteFormData } from "../model/schema";

/**
 * 정규식 패턴: 정수 또는 소수점 2자리까지
 */
export const VALID_NUMBER_PATTERN = /^\d+(\.\d{0,2})?$/;

/**
 * 키보드 입력 필터링 핸들러
 */
export const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

/**
 * onChange 핸들러 (정규식으로 필터링)
 */
export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  field: ControllerRenderProps<EstimateQuoteFormData, "amount">
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

/**
 * 붙여넣기 처리 (정규식으로 필터링)
 */
export const handlePaste = (
  e: React.ClipboardEvent<HTMLInputElement>,
  field: ControllerRenderProps<EstimateQuoteFormData, "amount">
) => {
  e.preventDefault();
  const pastedText = e.clipboardData.getData('text').replace(/,/g, '');

  if (VALID_NUMBER_PATTERN.test(pastedText) || pastedText === '') {
    const numericValue = pastedText === '' ? 0 : parseFloat(pastedText);
    field.onChange(numericValue);
  }
};
