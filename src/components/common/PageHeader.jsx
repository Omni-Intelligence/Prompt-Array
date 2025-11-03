import React from 'react';

/**
 * PageHeader - Consistent header component for pages
 * Displays title, optional description, and action buttons
 * Matches the visual style of Dashboard and Library pages
 */
export const PageHeader = ({
  title,
  description,
  actions = [],
  showBackButton = false,
  onBackClick,
  className = ''
}) => {
  return (
    <div className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 ${className}`}>
      {/* Title and Description Section */}
      <div className="flex items-start gap-2 flex-1">
        {showBackButton && onBackClick && (
          <button
            onClick={onBackClick}
            className="mt-1 p-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Go back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        )}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {title}
          </h1>
          {description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mt-1">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Actions Section */}
      {actions.length > 0 && (
        <div className="flex items-center gap-2 w-full md:w-auto">
          {actions.map((action, index) => (
            <div key={index}>
              {action}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

