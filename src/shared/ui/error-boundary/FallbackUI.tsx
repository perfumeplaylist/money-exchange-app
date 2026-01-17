import { extractErrorCode, type ErrorCode } from "@/shared";

interface FallbackUIProps {
  error: Error;
  resetErrorBoundary?: () => void;
}

const errorMessages: Partial<Record<ErrorCode, string>> = {
  // API 공통 에러
  BAD_REQUEST: "잘못된 요청입니다.",
  NOT_FOUND: "요청한 리소스를 찾을 수 없습니다.",
  UNAUTHORIZED: "인증이 필요합니다.",
  VALIDATION_ERROR: "입력값 검증에 실패했습니다.",
  MISSING_PARAMETER: "필수 파라미터가 누락되었습니다.",

  // Wallet/Exchange 도메인 에러
  WALLET_INSUFFICIENT_BALANCE: "잔액이 부족합니다.",
  INVALID_DEPOSIT_AMOUNT: "입금 금액이 유효하지 않습니다.",
  INVALID_WITHDRAW_AMOUNT: "출금 금액이 유효하지 않습니다.",

  // Currency/Exchange 정책 에러
  CURRENCY_MISMATCH: "선택한 통화가 일치하지 않습니다.",
  INVALID_AMOUNT_SCALE: "금액 단위가 올바르지 않습니다.",
  EXCHANGE_RATE_CURRENCY_MISMATCH: "환율 통화가 일치하지 않습니다.",
  UNSUPPORTED_FOREX_CONVERSION_CURRENCY: "지원하지 않는 외환 변환 통화입니다.",
  INVALID_EXCHANGE_RATE_CURRENCY: "유효하지 않은 환율 통화입니다.",
  UNSUPPORTED_CURRENCY_FOR_KRW_CONVERSION:
    "원화 변환을 지원하지 않는 통화입니다.",
};

export function FallbackUI({ error, resetErrorBoundary }: FallbackUIProps) {
  const errorCode = extractErrorCode(error);
  const message =
    errorCode && errorMessages[errorCode]
      ? errorMessages[errorCode]
      : error.message || "알 수 없는 오류가 발생했습니다.";

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border border-red-200 bg-red-50 p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-red-800">오류 발생</h2>
        </div>
        <div className="mb-4">
          <p className="text-sm text-red-700">{message}</p>
        </div>
        {resetErrorBoundary && (
          <button
            onClick={resetErrorBoundary}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            다시 시도
          </button>
        )}
      </div>
    </div>
  );
}
