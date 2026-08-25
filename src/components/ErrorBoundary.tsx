import React, { Component, ErrorInfo, ReactNode } from "react";
import { actionClasses } from "~~/src/components/ui";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 p-10 text-center">
          <h1 className="text-2xl font-semibold text-base-content">Something went wrong / Une erreur s&apos;est produite.</h1>
          <button
            onClick={() => this.setState({ hasError: false })}
            className={actionClasses('solid')}
          >
            Retry / Réessayer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
