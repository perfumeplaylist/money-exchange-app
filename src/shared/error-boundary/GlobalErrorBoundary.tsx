import { Component, type ReactNode, type ErrorInfo } from 'react';
import { ApiError } from '../errors/ApiError';
import { DomainError } from '../errors/DomainError';
import { FallbackUI } from './FallbackUI';

interface GlobalErrorBoundaryProps {
  children: ReactNode;
}

interface GlobalErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * GlobalErrorBoundary
 * ApiError만 처리하고, DomainError는 상위로 전파합니다.
 */
export class GlobalErrorBoundary extends Component<
  GlobalErrorBoundaryProps,
  GlobalErrorBoundaryState
> {
  constructor(props: GlobalErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): GlobalErrorBoundaryState | null {
    // ApiError만 처리하고 DomainError는 처리하지 않음
    if (error instanceof ApiError && !(error instanceof DomainError)) {
      return {
        hasError: true,
        error,
      };
    }

    // DomainError는 null을 반환하여 상위로 전파
    // null을 반환하면 상태를 업데이트하지 않고, 에러를 상위로 전파
    return null;
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // ApiError만 로깅
    if (error instanceof ApiError && !(error instanceof DomainError)) {
      console.error('GlobalErrorBoundary caught an ApiError:', error, errorInfo);
    }

    // DomainError는 상위로 전파
    if (error instanceof DomainError) {
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
    // DomainError인 경우 상위로 전파
    if (this.state.error instanceof DomainError) {
      throw this.state.error;
    }

    if (this.state.hasError && this.state.error) {
      return (
        <FallbackUI error={this.state.error} resetErrorBoundary={this.handleReset} />
      );
    }

    return this.props.children;
  }
}
