import React, { Component } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error Info:', errorInfo);

    // Show toast notification
    toast.error('Something went wrong. Please try again.');
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    // Navigate to app dashboard
    window.location.href = '/app';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We encountered an unexpected error. Don't worry, our team has been notified.
              Please try returning to the dashboard or refresh the page.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left bg-gray-100 dark:bg-gray-800 rounded-lg p-4 max-h-40 overflow-auto">
                <summary className="cursor-pointer font-mono text-sm text-gray-600 dark:text-gray-400 font-semibold">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 font-mono text-xs text-red-600 dark:text-red-400 whitespace-pre-wrap">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <Button
              onClick={this.handleReset}
              className="bg-primary hover:bg-primary/90 text-white"
              size="lg"
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
