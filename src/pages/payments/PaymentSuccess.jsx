import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQueryClient } from '@tanstack/react-query';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [countdown, setCountdown] = useState(5);
  const queryClient = useQueryClient();

  useEffect(() => {
    // Invalidate subscription cache to force a refresh
    queryClient.invalidateQueries(['subscription']);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (user) {
            navigate('/app/dashboard');
          } else {
            navigate('/signin', { 
              state: { 
                from: '/dashboard',
                message: 'Please sign in to access your premium features'
              }
            });
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, user, queryClient]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full mx-auto p-8"
      >
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900">
            <svg className="h-8 w-8 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Success Message */}
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Payment Successful!
          </h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Thank you for subscribing to our premium plan.
          </p>
          {user ? (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Redirecting to dashboard in {countdown} seconds...
            </p>
          ) : (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Please sign in to access your premium features.
            </p>
          )}

          {/* Manual Navigation Button */}
          {user ? (
            <button
              onClick={() => navigate('/app/dashboard')}
              className="mt-8 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Go to Dashboard Now
            </button>
          ) : (
            <button
              onClick={() => navigate('/signin', { 
                state: { 
                  from: '/dashboard',
                  message: 'Please sign in to access your premium features'
                }
              })}
              className="mt-8 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Sign in Now
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
