import { Component, type ReactNode, type ErrorInfo } from 'react';
import { FallbackUI } from './FallbackUI';

interface TopErrorBoundaryProps {
  children: ReactNode;
}

interface TopErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * 최상위 ErrorBoundary
 * 모든 미처리 에러의 최종 fallback으로 동작합니다.
 */
export class TopErrorBoundary extends Component<
  TopErrorBoundaryProps,
  TopErrorBoundaryState
> {
  constructor(props: TopErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): TopErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 에러 로깅
    console.error('TopErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <FallbackUI error={this.state.error} resetErrorBoundary={this.handleReset} />
      );
    }

    return this.props.children;
  }
}
