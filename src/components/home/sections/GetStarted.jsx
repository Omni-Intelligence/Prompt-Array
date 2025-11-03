import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight } from "lucide-react";

export function GetStarted() {
  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#9333EA] to-[#C084FC] bg-clip-text text-transparent">
            Get Started Today
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Begin your prompt engineering journey in minutes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Step 1 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative"
          >
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#9333EA] rounded-full flex items-center justify-center text-white font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Create Account</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Sign up for free and set up your profile in less than a minute
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative"
          >
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#9333EA] rounded-full flex items-center justify-center text-white font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Explore Templates</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Browse our collection of pre-built templates and prompts
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative"
          >
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#9333EA] rounded-full flex items-center justify-center text-white font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Start Creating</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Build your first prompt or customize existing templates
            </p>
          </motion.div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-[#9333EA] hover:bg-[#9333EA]/90">
            <Link to="/signup">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
