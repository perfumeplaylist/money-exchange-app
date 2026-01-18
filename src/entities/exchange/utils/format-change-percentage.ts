/**
 * 변화율 포맷팅 함수
 * +/- 기호 포함, % 표시, 소수점 2자리 고정
 */

const formatChangePercentage = (changePercentage: number): string => {
  const isIncrease = changePercentage > 0;
  return `${isIncrease ? "+" : ""}${changePercentage.toFixed(2)}%`;
};

export { formatChangePercentage };
