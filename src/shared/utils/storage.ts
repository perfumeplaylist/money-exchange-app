// src/shared/utils/storage.ts
/**
 * localStorage 유틸리티 함수
 * SSR 환경을 고려하여 window 객체 체크를 포함합니다.
 */

const getLocalStorage = <T = string>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return null;

    // JSON 파싱 시도 (실패하면 원본 문자열 반환)
    try {
      return JSON.parse(item) as T;
    } catch {
      // JSON이 아닌 경우 원본 문자열 반환
      return item as T;
    }
  } catch (error) {
    console.error(`Error getting localStorage key "${key}":`, error);
    return null;
  }
};

const setLocalStorage = <T>(key: string, value: T): void => {
  try {
    // 이미 string인 경우 이중 stringify 방지
    const transformedValue =
      typeof value === "string" ? value : JSON.stringify(value);

    localStorage.setItem(key, transformedValue);
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
    throw error;
  }
};

const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
};

export { getLocalStorage, setLocalStorage, removeLocalStorage };
