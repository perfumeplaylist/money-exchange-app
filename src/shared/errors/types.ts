// API 공통 에러 코드
export type ApiErrorCode =
  | 'BAD_REQUEST'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'VALIDATION_ERROR'
  | 'MISSING_PARAMETER';

// Wallet/Exchange 도메인 에러 코드
export type WalletErrorCode =
  | 'WALLET_INSUFFICIENT_BALANCE'
  | 'INVALID_DEPOSIT_AMOUNT'
  | 'INVALID_WITHDRAW_AMOUNT';

// Currency/Exchange 정책 에러 코드
export type CurrencyErrorCode =
  | 'CURRENCY_MISMATCH'
  | 'INVALID_AMOUNT_SCALE'
  | 'EXCHANGE_RATE_CURRENCY_MISMATCH'
  | 'UNSUPPORTED_FOREX_CONVERSION_CURRENCY'
  | 'INVALID_EXCHANGE_RATE_CURRENCY'
  | 'UNSUPPORTED_CURRENCY_FOR_KRW_CONVERSION';

// 전체 에러 코드 타입
export type ErrorCode = ApiErrorCode | WalletErrorCode | CurrencyErrorCode;

// API 에러 응답 형식
export interface ApiErrorResponse {
  code: string;
  message: string;
  data: null;
}
