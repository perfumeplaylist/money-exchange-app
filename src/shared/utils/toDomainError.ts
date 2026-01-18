import { ApiError } from '../errors/ApiError';
import { WalletError } from '../errors/WalletError';
import { CurrencyError } from '../errors/CurrencyError';
import type {
  ApiErrorCode,
  WalletErrorCode,
  CurrencyErrorCode,
  ApiErrorResponse,
} from '../errors/types';
import {
  API_ERROR_CODE,
  WALLET_ERROR_CODE,
  CURRENCY_ERROR_CODE,
} from '../constants/error';

/**
 * HTTP 에러 응답을 도메인 에러로 변환합니다.
 * 
 * @param response - API 에러 응답 객체 { code, message, data: null }
 * @param statusCode - HTTP 상태 코드 (기본값: 400)
 * @returns 변환된 에러 인스턴스
 * @throws Error - 매핑되지 않은 에러 코드인 경우
 */
export function toDomainError(
  response: ApiErrorResponse,
  statusCode: number = 400
): ApiError | WalletError | CurrencyError {
  const { code, message } = response;

  // API 공통 에러 코드 매핑
  const apiErrorCodes: ApiErrorCode[] = Object.values(API_ERROR_CODE) as ApiErrorCode[];

  if (apiErrorCodes.includes(code as ApiErrorCode)) {
    return new ApiError(code as ApiErrorCode, message, statusCode);
  }

  // Wallet/Exchange 도메인 에러 코드 매핑
  const walletErrorCodes: WalletErrorCode[] = Object.values(WALLET_ERROR_CODE) as WalletErrorCode[];

  if (walletErrorCodes.includes(code as WalletErrorCode)) {
    return new WalletError(code as WalletErrorCode, message, statusCode);
  }

  // Currency/Exchange 정책 에러 코드 매핑
  const currencyErrorCodes: CurrencyErrorCode[] = Object.values(CURRENCY_ERROR_CODE) as CurrencyErrorCode[];

  if (currencyErrorCodes.includes(code as CurrencyErrorCode)) {
    return new CurrencyError(code as CurrencyErrorCode, message, statusCode);
  }

  // 매핑되지 않은 에러 코드는 에러 발생 (default fallback 금지)
  throw new Error(
    `Unmapped error code: ${code}. Please add it to the appropriate error type.`
  );
}
