import { motion } from 'framer-motion';
import {
  Zap,
  Share2,
  Lock,
  Search,
  GitBranch,
  Users,
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Organization',
    description: 'Automatically categorize and organize your prompts with intelligent tagging and smart collections.',
    gradient: 'from-brand/10 to-brand/5',
  },
  {
    icon: GitBranch,
    title: 'Smart Chain Management',
    description: 'Build powerful prompt chains that execute in sequence for complex, multi-step workflows.',
    gradient: 'from-secondary/10 to-secondary/5',
  },
  {
    icon: Share2,
    title: 'Real-Time Collaboration',
    description: 'Share prompts and chains with your team, collaborate in real-time, and manage access permissions.',
    gradient: 'from-brand-pink/10 to-brand-pink/5',
  },
  {
    icon: Search,
    title: 'Advanced Search',
    description: 'Find exactly what you need with powerful semantic search across all your prompts and collections.',
    gradient: 'from-brand/10 to-secondary/5',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'End-to-end encryption, role-based access control, and SOC 2 compliance for peace of mind.',
    gradient: 'from-secondary/10 to-brand/5',
  },
  {
    icon: Users,
    title: 'Community Library',
    description: 'Browse and share prompts with our community. Discover new techniques and best practices.',
    gradient: 'from-brand-pink/10 to-secondary/5',
  },
];

const FeatureCard = ({ icon: Icon, title, description, gradient, index }) => {
  return (
    <motion.div
      className="group relative h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className={`h-full bg-gradient-to-br ${gradient} backdrop-blur border border-brand/10 dark:border-brand/20 rounded-2xl p-6 hover:shadow-lg hover:border-brand/30 dark:hover:border-brand/40 transition-all duration-300 hover:bg-gradient-to-br dark:hover:shadow-glow`}>
        {/* Icon */}
        <div className="icon-badge mb-4 w-fit dark:glow-effect">
          <Icon className="w-6 h-6 text-brand" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-brand transition-colors">{title}</h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>

        {/* Hover accent line */}
        <div className="absolute inset-x-0 -bottom-px h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
};

export function FeaturesGrid() {
  return (
    <section id="features" className="py-16 md:py-24 dark:bg-muted/20">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            Powerful Features for <span className="text-brand-accent">Prompt Management</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to create, organize, and share AI prompts like a pro.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
