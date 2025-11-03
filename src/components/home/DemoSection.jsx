import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useState } from 'react';

export function DemoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="demo" className="py-16 md:py-24 bg-muted/50 dark:bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="section-header mb-12">
          <h2 className="section-title">
            See <span className="text-brand-accent">Prompt Array</span> in Action
          </h2>
          <p className="section-subtitle">
            Watch how easy it is to create, organize, and manage your AI prompts.
          </p>
        </div>

        {/* Video Container */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Video Embed */}
          <div className="relative group cursor-pointer">
            {/* Video Wrapper with Aspect Ratio */}
            {!isPlaying ? (
              <div 
                className="relative w-full bg-foreground/5 rounded-2xl overflow-hidden shadow-xl shadow-brand/10 dark:shadow-glow aspect-video group/video"
                onClick={() => setIsPlaying(true)}
              >
                {/* Placeholder with Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand/20 via-background to-brand/10 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-transparent via-black/5 to-transparent" />

                  {/* Play Button */}
                  <motion.div
                    className="relative z-10 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 rounded-full bg-brand/20 group-hover/video:bg-brand/30 transition-colors" />
                    <div className="relative w-20 h-20 rounded-full bg-brand flex items-center justify-center shadow-lg shadow-brand/50 dark:shadow-glow">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </motion.div>
                </div>

                {/* Border Animation */}
                <div className="absolute inset-0 rounded-2xl border-2 border-brand/20 group-hover:border-brand/40 transition-colors" />
              </div>
            ) : (
              <div className="relative w-full rounded-2xl overflow-hidden shadow-xl shadow-brand/10 dark:shadow-glow aspect-video">
                <video
                  autoPlay
                  controls
                  className="w-full h-full"
                  onEnded={() => setIsPlaying(false)}
                >
                  <source src="/videos/EDNA Home Page Redesign (1).mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {/* Video Description */}
            {!isPlaying && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                Click to play • 2 minutes • See the full platform in action
              </p>
            )}
          </div>

          {/* Features Below Video */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Intuitive Interface',
                description: 'Create and manage prompts with our clean, user-friendly editor.',
              },
              {
                title: 'Smart Organization',
                description: 'Auto-categorize, tag, and search across your entire prompt library.',
              },
              {
                title: 'Team Collaboration',
                description: 'Share prompts, get feedback, and collaborate with your team in real-time.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold text-lg mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
