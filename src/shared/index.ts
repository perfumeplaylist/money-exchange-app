// Error classes
export { ApiError, DomainError, WalletError, CurrencyError } from "./errors";

export type {
  ApiErrorCode,
  WalletErrorCode,
  CurrencyErrorCode,
  ErrorCode,
  ApiErrorResponse,
} from "./errors";

// ErrorBoundary components
export {
  TopErrorBoundary,
  GlobalErrorBoundary,
  SectionErrorBoundary,
  FallbackUI,
} from "./ui/error-boundary";

// UI components
export { PageHeader, NavHeader } from "./ui/page-header";

// Types
export type { HttpResponse } from "./utils/types";

// Utilities
export {
  extractErrorCode,
  toDomainError,
  HttpClient,
  AxiosClient,
} from "./utils";

// Storage
export {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from "./utils/storage";

// Constants
export * from "./constants/storage";
