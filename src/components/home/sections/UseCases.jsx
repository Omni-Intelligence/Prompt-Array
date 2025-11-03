import { motion } from "framer-motion";
import { PencilRuler, Megaphone, BarChart3, HeartHandshake, GraduationCap, Code2, CircleDot, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function UseCases() {
  return (
    <div className="mt-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
          Use Cases
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover how PromptArray can help you manage prompts across different scenarios
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Content Creation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="group relative p-8 rounded-xl bg-[#9333EA]/5 border border-[#9333EA]/10 hover:bg-[#9333EA]/10 hover:border-[#9333EA]/20 transition-all duration-300"
        >
          <div className="mb-4 inline-flex p-3 bg-[#9333EA]/10 rounded-xl">
            <PencilRuler className="w-6 h-6 text-[#9333EA]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Content Creation</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-0.5 text-[#9333EA]" />
              Store blog post outlines and content templates
            </li>
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-0.5 text-[#9333EA]" />
              Maintain consistent brand voice across platforms
            </li>
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-0.5 text-[#9333EA]" />
              Organize social media post templates
            </li>
          </ul>
        </motion.div>

        {/* Marketing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="group relative p-8 rounded-xl bg-[#9333EA]/5 border border-[#9333EA]/10 hover:bg-[#9333EA]/10 hover:border-[#9333EA]/20 transition-all duration-300"
        >
          <div className="mb-4 inline-flex p-3 bg-[#9333EA]/10 rounded-xl">
            <Megaphone className="w-6 h-6 text-[#9333EA]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Marketing</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-0.5 text-[#9333EA]" />
              Create compelling ad copy templates
            </li>
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-0.5 text-[#9333EA]" />
              Store campaign message frameworks
            </li>
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-0.5 text-[#9333EA]" />
              Manage email marketing templates
            </li>
          </ul>
        </motion.div>

        {/* Data Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="group relative p-8 rounded-xl bg-[#9333EA]/5 border border-[#9333EA]/10 hover:bg-[#9333EA]/10 hover:border-[#9333EA]/20 transition-all duration-300"
        >
          <div className="mb-4 inline-flex p-3 bg-[#9333EA]/10 rounded-xl">
            <BarChart3 className="w-6 h-6 text-[#9333EA]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Analysis</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-0.5 text-[#9333EA]" />
              Save data interpretation prompts
            </li>
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-0.5 text-[#9333EA]" />
              Organize report generation templates
            </li>
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-0.5 text-[#9333EA]" />
              Store data visualization prompts
            </li>
          </ul>
        </motion.div>

        {/* Customer Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="group relative p-8 rounded-xl bg-[#9333EA]/5 border border-[#9333EA]/10 hover:bg-[#9333EA]/10 hover:border-[#9333EA]/20 transition-all duration-300"
        >
          <div className="mb-4 inline-flex p-3 bg-[#9333EA]/10 rounded-xl">
            <HeartHandshake className="w-6 h-6 text-[#9333EA]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Support</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-0.5 text-[#9333EA]" />
              Manage response templates for common issues
            </li>
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-0.5 text-[#9333EA]" />
              Create consistent support messaging
            </li>
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-0.5 text-[#9333EA]" />
              Organize troubleshooting guides
            </li>
          </ul>
        </motion.div>

        {/* Research & Academic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="group relative p-8 rounded-xl bg-[#9333EA]/5 border border-[#9333EA]/10 hover:bg-[#9333EA]/10 hover:border-[#9333EA]/20 transition-all duration-300"
        >
          <div className="mb-4 inline-flex p-3 bg-[#9333EA]/10 rounded-xl">
            <GraduationCap className="w-6 h-6 text-[#9333EA]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Research & Academic</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-0.5 text-[#9333EA]" />
              Store literature review prompts
            </li>
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-0.5 text-[#9333EA]" />
              Manage research methodology templates
            </li>
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-0.5 text-[#9333EA]" />
              Organize citation and reference guides
            </li>
          </ul>
        </motion.div>

        {/* Software Development */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="group relative p-8 rounded-xl bg-[#9333EA]/5 border border-[#9333EA]/10 hover:bg-[#9333EA]/10 hover:border-[#9333EA]/20 transition-all duration-300"
        >
          <div className="mb-4 inline-flex p-3 bg-[#9333EA]/10 rounded-xl">
            <Code2 className="w-6 h-6 text-[#9333EA]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Software Development</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-0.5 text-[#9333EA]" />
              Save code documentation templates
            </li>
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-0.5 text-[#9333EA]" />
              Store code review prompts
            </li>
            <li className="flex items-start">
              <CircleDot className="w-4 h-4 mr-2 mt-0.5 text-[#9333EA]" />
              Manage debugging assistance prompts
            </li>
          </ul>
        </motion.div>
      </div>

      <div className="mt-12 text-center">
        <Link 
          to="/app/templates" 
          className="text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center"
        >
          View all use cases
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}
