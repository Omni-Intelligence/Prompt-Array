import { motion } from 'framer-motion';
import { Wrench, Sparkles, ArrowRight } from 'lucide-react';

export const Maintenance = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      {/* Floating Code Brackets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute text-[20rem] font-mono text-primary/5 select-none"
          style={{ left: '-10%', top: '10%' }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          [
        </motion.div>
        <motion.div
          className="absolute text-[20rem] font-mono text-primary/5 select-none"
          style={{ right: '-10%', bottom: '10%' }}
          animate={{
            y: [0, 30, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          ]
        </motion.div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-[120px] animate-pulse delay-700" />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <motion.div
            className="flex justify-center mb-8"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img
              src="/logo.svg"
              alt="Prompt Array Logo"
              className="h-20 w-auto"
            />
          </motion.div>

          {/* Icon with Animation */}
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-8"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Wrench className="w-12 h-12 text-primary" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Under Maintenance
          </motion.h1>

          {/* Subheading */}
          <motion.div
            className="space-y-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              <span className="font-semibold text-foreground">Prompt Array</span> is currently under maintenance
            </p>
            <div className="flex items-center justify-center gap-2 text-lg md:text-xl text-muted-foreground">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <p>We'll be back soon with a revamped website and app</p>
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            </div>
          </motion.div>

          {/* Info Box */}
          <motion.div
            className="max-w-md mx-auto bg-primary/5 border border-primary/20 rounded-lg p-6 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="text-sm text-muted-foreground mb-3">
              We're working hard to bring you an even better experience
            </p>
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary">
              <span>Stay tuned for something amazing</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </motion.div>

          {/* Animated Dots */}
          <motion.div
            className="flex justify-center gap-2 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-primary"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
