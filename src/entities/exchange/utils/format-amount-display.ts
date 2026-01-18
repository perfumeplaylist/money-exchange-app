/**
 * 금액 포맷팅 함수
 * 천 단위 구분 기호 적용
 * @param amount - 포맷팅할 금액
 * @param options - 포맷팅 옵션
 * @param options.maxFractionDigits - 최대 소수점 자리수 (기본값: 2)
 * @param options.minFractionDigits - 최소 소수점 자리수 (기본값: 0)
 * @param options.emptyIfZero - 0일 때 빈 문자열 반환 여부 (기본값: false)
 */
const formatAmountDisplay = (
  amount: number,
  options?: {
    maxFractionDigits?: number;
    minFractionDigits?: number;
    emptyIfZero?: boolean;
  }
): string => {
  const { maxFractionDigits = 2, minFractionDigits = 0, emptyIfZero = false } = options || {};

  if (emptyIfZero && amount === 0) return '';

  return amount.toLocaleString('ko-KR', {
    maximumFractionDigits: maxFractionDigits,
    minimumFractionDigits: minFractionDigits,
  });
};

export { formatAmountDisplay };
