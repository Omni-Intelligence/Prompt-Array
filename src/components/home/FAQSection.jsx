import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

const features = [
  {
    title: 'Lightning Fast Execution',
    subtitle: 'Execute prompts with millisecond precision',
    image: '/new-images/sam.mckay.edna_Abstract_explosion_of_light_beams_turning_into_ae0bc824-7571-4682-8f82-3f6faa6c1865_0.png',
    bullets: [
      'Instant feedback on prompt performance',
      'Rapid iteration cycles',
      'Real-time execution monitoring'
    ]
  },
  {
    title: 'Build With Flow',
    subtitle: 'Create sophisticated workflows seamlessly',
    image: '/new-images/sam.mckay.edna_Circular_abstract_loop_of_arrows_where_text_vo_24773bac-3ac6-4957-b42f-bc404a5eb4d1_1.png',
    bullets: [
      'Visual chain builder interface',
      'Complex automation made simple',
      'Smooth workflow orchestration'
    ]
  },
  {
    title: 'Organize & Scale',
    subtitle: 'Manage prompts across your entire organization',
    image: '/new-images/sam.mckay.edna_Circle_of_diverse_professionals_exchanging_glo_bd6b7de5-921d-46f7-89c0-55d8d9333e53_0 (1).png',
    bullets: [
      'Centralized prompt library management',
      'Team collaboration with version control',
      'Enterprise-grade access controls'
    ]
  }
];

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      {/* Image Card */}
      <div className="relative h-72 rounded-xl overflow-hidden mb-6 shadow-md">
        <img
          src={feature.image}
          alt={feature.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Text Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
          <h3 className="text-white text-2xl font-semibold mb-1">{feature.title}</h3>
          <p className="text-gray-100 text-sm">{feature.subtitle}</p>
        </div>
      </div>

      {/* Bullets Below */}
      <div className="space-y-3 px-2">
        {feature.bullets.map((bullet, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
            viewport={{ once: true }}
            className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800"
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-pink-600 mt-2 flex-shrink-0" />
            <p className="text-gray-700 dark:text-gray-300 text-sm">{bullet}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export function FAQSection() {
  return (
    <section id="why-prompt-array" className="py-20 md:py-32 bg-white dark:bg-black">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand/10 border border-brand/20 mb-6">
            <span className="text-xs font-medium text-brand">Why Choose Us</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Why Choose <span className="text-brand-accent">Prompt Array</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover why thousands of developers, creators, and teams trust Prompt Array for their AI prompt management needs.
          </p>
        </motion.div>

        {/* Features Grid with Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Manually trigger video play for iOS Safari
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, []);

  return (
    <section className="relative w-full overflow-hidden py-24 md:py-32 lg:py-40">
      {/* Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(102, 84, 245, 0.3) 0%, rgba(102, 84, 245, 0.1) 100%)',
            left: '-10%',
            top: '20%',
            width: 400,
            height: 400,
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
        <motion.div
          className="absolute rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(255, 127, 0, 0.2) 0%, rgba(255, 127, 0, 0.05) 100%)',
            right: '-10%',
            top: '60%',
            width: 350,
            height: 350,
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
      </div>

      {/* Content */}
      <div className="container relative mx-auto px-4">
        <motion.div
          className="flex flex-col items-center text-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Main Card with Glassmorphism */}
          <div className="w-full max-w-4xl glassmorphism rounded-3xl p-4 md:p-8 lg:p-12 shadow-xl shadow-brand/10 dark:glow-effect">
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
              Start Your <span className="text-brand-accent">Prompt Journey</span> Today
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
              Join thousands of developers, creators, and teams building smarter AI solutions with Prompt Array.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/app/dashboard"
                className="group relative overflow-hidden bg-brand text-white px-8 py-3.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brand hover:-translate-y-1 text-lg font-semibold flex items-center gap-2 dark:hover:shadow-glow"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/app/dashboard"
                className="px-8 py-3.5 rounded-lg text-lg font-semibold border-2 border-brand/30 text-brand hover:bg-brand/5 transition-all duration-300 hover:-translate-y-1 dark:border-brand/50 dark:hover:bg-brand/10"
              >
                Learn How It Works
              </Link>
            </div>
          </div>

          {/* Video Container with Border and Rounded Edges */}
          <motion.div
            className="w-full max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-2xl overflow-hidden border-4 border-brand/30 shadow-2xl dark:border-brand/50">
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-auto aspect-video object-cover"
                style={{ WebkitPlaysinline: 'true' }}
                defaultMuted
                src="/videos/social_sam.mckay.edna_Network_of_nodes_connected_by_glowing_lines_ea_68369123-6a21-4b9e-8697-722a42766ab7_2_compressed.mp4"
              />
              {/* Overlay gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Feature Tags */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {['100% Free', 'No Credit Card', 'Full Features'].map((tag) => (
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
