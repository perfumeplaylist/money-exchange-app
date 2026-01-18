/**
 * 환율 포맷팅 함수
 * 소수점 2자리, 천 단위 구분 기호 적용
 */

const formatExchangeRate = (rate: number): string => {
  return rate.toLocaleString("ko-KR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export { formatExchangeRate };
