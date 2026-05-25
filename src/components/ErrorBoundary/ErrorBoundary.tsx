import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ErrorMessage } from '../ErrorMessage';

interface ErrorBoundaryProps {
  children: ReactNode;
  onReset?: () => void;
  onError?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application error boundary caught an error:', error, errorInfo);
    this.props.onError?.();
  }

  handleReset = () => {
    this.props.onReset?.();
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="col-span-full w-full px-6 pb-10 sm:px-9">
          <ErrorMessage
            title="Unable to render results"
            message="Something went wrong inside the application. The error was caught safely."
            onRetry={this.handleReset}
            showErrorButton={false}
          />
        </section>
      );
    }

    return this.props.children;
  }
}
