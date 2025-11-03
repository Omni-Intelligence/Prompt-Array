import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircleDot, BookOpen, GraduationCap, ArrowRight } from "lucide-react";

export function Learning() {
  return (
    <div className="mt-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
          Master Prompt Engineering
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Learn essential techniques to craft more effective prompts and get better results from AI tools
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Core Techniques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="group relative p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          <div className="mb-4 inline-flex p-3 bg-primary/10 rounded-xl">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Core Techniques</h3>
          <ul className="space-y-4 mb-6">
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-1 text-primary" />
              <span className="text-gray-600 dark:text-gray-300">Zero-shot and few-shot prompting</span>
            </li>
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-1 text-primary" />
              <span className="text-gray-600 dark:text-gray-300">Chain of thought reasoning</span>
            </li>
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-1 text-primary" />
              <span className="text-gray-600 dark:text-gray-300">Role and context setting</span>
            </li>
          </ul>
        </motion.div>

        {/* Advanced Strategies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="group relative p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          <div className="mb-4 inline-flex p-3 bg-primary/10 rounded-xl">
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Advanced Strategies</h3>
          <ul className="space-y-4 mb-6">
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-1 text-primary" />
              <span className="text-gray-600 dark:text-gray-300">Task decomposition methods</span>
            </li>
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-1 text-primary" />
              <span className="text-gray-600 dark:text-gray-300">Iterative refinement process</span>
            </li>
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-1 text-primary" />
              <span className="text-gray-600 dark:text-gray-300">Output format control</span>
            </li>
          </ul>
        </motion.div>

        {/* Best Practices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="group relative p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          <div className="mb-4 inline-flex p-3 bg-primary/10 rounded-xl">
            <ArrowRight className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Best Practices</h3>
          <ul className="space-y-4 mb-6">
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-1 text-primary" />
              <span className="text-gray-600 dark:text-gray-300">Clear and specific instructions</span>
            </li>
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-1 text-primary" />
              <span className="text-gray-600 dark:text-gray-300">Error handling strategies</span>
            </li>
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-1 text-primary" />
              <span className="text-gray-600 dark:text-gray-300">Validation techniques</span>
            </li>
          </ul>
        </motion.div>
      </div>

      <div className="mt-12 text-center">
        <Link 
          to="/app/techniques" 
          className="text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center"
        >
          Explore all techniques
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}
