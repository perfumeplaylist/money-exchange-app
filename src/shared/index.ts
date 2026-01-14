// Error classes
export {
  ApiError,
  DomainError,
  WalletError,
  CurrencyError,
} from './errors';

export type {
  ApiErrorCode,
  WalletErrorCode,
  CurrencyErrorCode,
  ErrorCode,
  ApiErrorResponse,
} from './errors';

// ErrorBoundary components
export {
  TopErrorBoundary,
  GlobalErrorBoundary,
  SectionErrorBoundary,
  FallbackUI,
} from './error-boundary';

// Utilities
export { extractErrorCode, toDomainError } from './utils';
