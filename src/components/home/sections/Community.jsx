import { motion } from "framer-motion";
import { Users, LayoutTemplate, Star, ThumbsUp, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Community() {
  return (
    <div className="mt-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
          Community Showcase
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Join our growing community of prompt engineers
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <Users className="w-8 h-8 text-primary mb-3" />
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">2,000+</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Active Members</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <LayoutTemplate className="w-8 h-8 text-primary mb-3" />
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">5,000+</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Templates Shared</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <Star className="w-8 h-8 text-primary mb-3" />
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">10,000+</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Prompts Created</div>
        </motion.div>
      </div>

      {/* Featured Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="group relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-sm text-primary mb-1">Featured Template</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Content Brief Generator</h3>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Content Creation
            </Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            A comprehensive template for creating detailed content briefs, including target audience, key points, and SEO requirements.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <ThumbsUp className="w-4 h-4" />
              <span>492 likes</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <Download className="w-4 h-4" />
              <span>1.2k uses</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="group relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-sm text-primary mb-1">Featured Template</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Data Insights Explorer</h3>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Data Analysis
            </Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            A structured approach to analyzing data sets, identifying patterns, and generating meaningful insights.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <ThumbsUp className="w-4 h-4" />
              <span>387 likes</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <Download className="w-4 h-4" />
              <span>956 uses</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
