import React from 'react';
import { AlertCircle, RefreshCw, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * PageLoader - Full-screen spinner with optional message
 * Used for initial page loads or critical data fetching
 */
export const PageLoader = ({ message = 'Loading...' }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-50/50 to-purple-100/50 dark:from-gray-900/50 dark:to-gray-800/50 z-50">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      {message && (
        <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
          {message}
        </p>
      )}
    </div>
  </div>
);

/**
 * SectionLoader - Half-height spinner for section loading states
 * Used within page sections without blocking the entire page
 */
export const SectionLoader = ({ message = 'Loading...', height = 'h-64' }) => (
  <div className={`flex flex-col items-center justify-center ${height} w-full`}>
    <div className="flex flex-col items-center gap-3">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      {message && (
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {message}
        </p>
      )}
    </div>
  </div>
);

/**
 * ErrorState - Error display with optional retry button
 * Used when data fetching fails or errors occur
 */
export const ErrorState = ({
  title = 'Something went wrong',
  message = 'An error occurred. Please try again.',
  onRetry,
  error
}) => (
  <div className="flex flex-col items-center justify-center py-12 px-4">
    <div className="flex flex-col items-center gap-4 text-center max-w-md">
      <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
        <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-500" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
          {message}
        </p>
        {error && (
          <p className="text-xs text-red-600 dark:text-red-400 font-mono mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded">
            {error}
          </p>
        )}
      </div>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="mt-4 hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  </div>
);

/**
 * EmptyState - Empty state display with icon, title, message, and optional action
 * Used when there is no data to display
 */
export const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No data available',
  message = 'There is nothing to display here yet.',
  action,
  actionLabel = 'Create',
  onAction
}) => (
  <div className="flex flex-col items-center justify-center py-12 px-4">
    <div className="flex flex-col items-center gap-4 text-center max-w-md">
      <div className="p-4 rounded-full bg-primary/10 dark:bg-primary/20">
        <Icon className="h-8 w-8 text-primary dark:text-primary/80" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {message}
        </p>
      </div>
      {onAction && (
        <Button
          onClick={onAction}
          className="mt-4 bg-primary hover:bg-primary/90 transition-colors"
        >
          {actionLabel}
        </Button>
      )}
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  </div>
);
