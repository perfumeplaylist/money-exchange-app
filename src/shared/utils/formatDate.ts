/**
 * 날짜 문자열을 YYYY-MM-DD HH:mm:ss 형식으로 포맷팅
 * @param date ISO 8601 형식의 날짜 문자열
 * @returns 포맷팅된 날짜 문자열 (예: "2025-10-05 00:00:00")
 */
export const formatDateTime = (date: string): string => {
  const dateObj = new Date(date);
  
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
