import { Component, type ReactNode, type ErrorInfo } from "react";
import { ApiError, DomainError, FallbackUI, WalletError } from "@/shared";

interface SectionErrorBoundaryProps {
  children: ReactNode;
  errorType: typeof DomainError | typeof ApiError | typeof WalletError;
}

interface SectionErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * SectionErrorBoundary
 * 지정된 도메인 에러 타입만 처리하고, 나머지는 상위로 전파합니다.
 */
export class SectionErrorBoundary extends Component<
  SectionErrorBoundaryProps,
  SectionErrorBoundaryState
> {
  constructor(props: SectionErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(
    error: Error
  ): SectionErrorBoundaryState {
    // 모든 에러를 상태에 저장 (타입 체크는 render에서 수행)
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 담당하는 도메인 에러만 로깅
    if (error instanceof this.props.errorType) {
      console.error(
        `SectionErrorBoundary caught a ${this.props.errorType.name}:`,
        error,
        errorInfo
      );
    }
  }

  handleReset = () => {
    // onReset이 있으면 먼저 실행 (예: 쿼리 refetch)
    // 에러 바운더리 상태 리셋
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    // 에러가 있고, 담당하지 않는 에러 타입이면 상위로 전파
    if (
      this.state.error &&
      !(this.state.error instanceof this.props.errorType)
    ) {
      throw this.state.error;
    }

    // 담당하는 에러 타입이면 FallbackUI 표시
    if (this.state.hasError && this.state.error) {
      return (
        <FallbackUI
          error={this.state.error}
          resetErrorBoundary={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}
