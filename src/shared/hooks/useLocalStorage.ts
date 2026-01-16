// src/shared/hooks/useLocalStorage.ts
import { useState, useEffect, useCallback } from "react";
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from "../utils/storage";

/**
 * localStorage와 동기화되는 React 훅
 *
 * @param key - localStorage 키
 * @param initialValue - 초기값 (localStorage에 값이 없을 때 사용)
 * @returns [value, setValue, removeValue] 튜플
 *
 * @example
 * const [token, setToken, removeToken] = useLocalStorage<string>("auth_token", "");
 * setToken("new-token");
 * removeToken();
 */
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // 초기값을 localStorage에서 읽어오거나 제공된 initialValue 사용
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = getLocalStorage<T>(key);
      return item !== null ? item : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // localStorage에 저장하는 함수
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        // 함수인 경우 이전 값을 받아서 새로운 값 계산
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);
        setLocalStorage(key, valueToStore);
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // localStorage에서 제거하는 함수
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      removeLocalStorage(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // 다른 탭/창에서 localStorage 변경 감지
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const newValue = JSON.parse(e.newValue) as T;
          setStoredValue(newValue);
        } catch {
          setStoredValue(e.newValue as T);
        }
      } else if (e.key === key && e.newValue === null) {
        setStoredValue(initialValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;
