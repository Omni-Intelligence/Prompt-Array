import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Unlock the Full Power of AI Prompts
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Create, organize, and master your AI prompts with our premium features
          </motion.p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-1 rounded-full text-sm font-semibold shadow-lg">
                MOST POPULAR
              </span>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-purple-100 dark:border-purple-900">
              <div className="p-8 sm:p-12">
                <div className="flex flex-col items-center">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Premium Plan</h2>
                  <div className="mt-4 flex items-baseline justify-center">
                    <span className="text-5xl font-extrabold text-purple-600 dark:text-purple-400">$39</span>
                    <span className="text-2xl font-medium text-gray-500 dark:text-gray-400">/year</span>
                  </div>
                  
                  {/* Value Proposition */}
                  <p className="mt-4 text-gray-600 dark:text-gray-300 text-center max-w-2xl">
                    Less than $0.11 per day for unlimited access to professional AI prompt tools
                  </p>
                </div>

                {/* Features Grid */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Unlimited Prompt Creation',
                      description: 'Create and save as many AI prompts as you need'
                    },
                    {
                      title: 'Prompt Chains',
                      description: 'Create powerful chains of prompts for complex workflows'
                    },
                    {
                      title: 'Smart Organization',
                      description: 'Organize prompts with groups and favorites'
                    },
                    {
                      title: 'Version Control (Coming Soon)',
                      description: 'Track changes and maintain prompt history'
                    },
                    {
                      title: 'Community Access',
                      description: 'Share and discover prompts from the community'
                    },
                    {
                      title: 'Advanced Templates',
                      description: 'Access our curated library of prompt templates'
                    }
                  ].map((feature) => (
                    <div key={feature.title} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Section */}
                <div className="mt-12">
                  <div className="flex flex-col items-center">
                    <div className="mt-8">
                      <Button className="w-full" variant="default" disabled>
                        Currently Free
                      </Button>
                    </div>
                    <p className="mt-2 text-sm text-center text-gray-500">
                      No payment required
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

