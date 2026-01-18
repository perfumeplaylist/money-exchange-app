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
    error: Error,
    props: SectionErrorBoundaryProps
  ): SectionErrorBoundaryState | null {
    // props.errorType에 해당하는 에러만 처리
    if (error instanceof props.errorType) {
      return {
        hasError: true,
        error,
      };
    }

    // 담당하지 않는 에러는 null을 반환하여 상위로 전파
    return null;
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

    // 담당하지 않는 에러는 상위로 전파
    if (!(error instanceof this.props.errorType)) {
      throw error;
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    // 담당하지 않는 에러는 상위로 전파
    if (
      this.state.error &&
      !(this.state.error instanceof this.props.errorType)
    ) {
      throw this.state.error;
    }

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
