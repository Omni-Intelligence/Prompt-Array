import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FloatingShape = ({ delay, gradient, style, size }) => {
  return (
    <motion.div
      className="absolute rounded-full opacity-40"
      style={{
        ...style,
        background: gradient,
        width: size.width,
        height: size.height,
        filter: 'blur(40px)',
      }}
      initial={{ opacity: 0, y: -150 }}
      animate={{
        opacity: 0.15,
        y: [0, -20, 0],
      }}
      transition={{
        opacity: { duration: 1.2 },
        y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
      }}
    />
  );
};

export function HeroAnimated() {
  const shapes = [
    {
      gradient: 'radial-gradient(circle, rgba(102, 84, 245, 0.3) 0%, rgba(102, 84, 245, 0.1) 100%)',
      style: { left: '-10%', top: '20%' },
      size: { width: 400, height: 400 },
      delay: 0,
    },
    {
      gradient: 'radial-gradient(circle, rgba(255, 127, 0, 0.2) 0%, rgba(255, 127, 0, 0.05) 100%)',
      style: { right: '-10%', top: '60%' },
      size: { width: 350, height: 350 },
      delay: 0.5,
    },
  ];

  return (
    <section className="hero relative w-full overflow-hidden py-24 md:py-32 lg:py-40">
      {/* Hero Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 dark:opacity-30"
        >
          <source src="/videos/social_sam.mckay.edna_group_working_in_an_office_being_productive_eq_9518032e-aa42-4570-a5ab-56a20e44a7a7_0 (1)_compressed.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Subtle Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {shapes.map((shape, index) => (
          <FloatingShape key={index} {...shape} />
        ))}
      </div>

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background/50" />

      {/* Content */}
      <div className="container relative mx-auto px-4">
        <motion.div
          className="flex flex-col items-center text-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Card with Glassmorphism */}
          <div className="w-full max-w-4xl glassmorphism rounded-3xl p-4 md:p-8 lg:p-12 shadow-xl shadow-brand/10 dark:glow-effect">
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Your AI Prompts,
              <br />
              <span className="text-brand-accent">Perfectly Organized</span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
              Create, organize, and share powerful AI prompts. Boost your productivity with our intuitive prompt management platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup"
                className="group relative overflow-hidden bg-brand text-white px-8 py-3.5 rounded-lg transition-all duration-300 hover:shadow-brand hover:shadow-lg hover:-translate-y-1 text-lg font-semibold flex items-center gap-2 dark:hover:shadow-glow"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/app/dashboard"
                className="px-8 py-3.5 rounded-lg text-lg font-semibold border-2 border-brand/30 text-brand hover:bg-brand/5 transition-all duration-300 hover:-translate-y-1 dark:border-brand/50 dark:hover:bg-brand/10"
              >
                Explore Dashboard
              </Link>
            </div>
          </div>

          {/* Feature Tags */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {['AI-Powered', 'Real-Time Sync', 'Cloud Storage'].map((tag) => (
              <div
                key={tag}
                className="px-4 py-2 rounded-full bg-brand/5 border border-brand/20 text-sm font-medium text-brand dark:bg-brand/10 dark:border-brand/40"
              >
                ✓ {tag}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
