import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Create Your Prompts",
    description: "Write and refine your AI prompts with our intuitive editor. Add descriptions, tags, and examples to build the perfect prompts.",
    image: "/new-images/sam.mckay.edna_working_at_a_computer_--ar_43_--sref_httpss.mj_97411d82-a5b9-444a-a83b-15e61ac10475_1.png",
    badge: "Step",
    align: "left"
  },
  {
    number: "02",
    title: "Organize & Categorize",
    description: "Automatically organize prompts into collections and use smart tags for easy filtering, discovery, and management.",
    image: "/new-images/sam.mckay.edna_Abstract_streams_of_glowing_lines_flowing_into_0943014d-588f-4ae4-bf32-7e8902c72d77_0.png",
    badge: "Step",
    align: "right"
  },
  {
    number: "03",
    title: "Build Chains",
    description: "Combine prompts into powerful chains that execute in sequence for complex, multi-step AI workflows.",
    image: "/new-images/sam.mckay.edna_Circular_abstract_loop_of_arrows_where_text_vo_24773bac-3ac6-4957-b42f-bc404a5eb4d1_1.png",
    badge: "Step",
    align: "left"
  },
  {
    number: "04",
    title: "Share & Collaborate",
    description: "Share your prompts with teammates or the community. Track versions, get feedback, and collaborate seamlessly.",
    image: "/new-images/sam.mckay.edna_Circle_of_diverse_professionals_exchanging_glo_bd6b7de5-921d-46f7-89c0-55d8d9333e53_0 (1).png",
    badge: "Step",
    align: "right"
  },
];

const StepCard = ({ step, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="mb-24"
    >
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${!isEven ? 'md:grid-flow-dense' : ''}`}>
        {/* Content */}
        <div className={`flex flex-col justify-center ${!isEven ? 'md:col-start-2' : ''}`}>
          <div className="mb-4 flex items-center gap-3">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand/10 border border-brand/20">
              <span className="text-xs font-medium text-brand">{step.badge}</span>
            </div>
          </div>
          
          <div className="mb-6 flex items-baseline gap-3">
            <h3 className="text-5xl md:text-6xl font-bold text-brand">
              {step.number}
            </h3>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {step.title}
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {step.description}
          </p>

          <div>
            <Link to="/app/dashboard" className="inline-flex items-center gap-2 text-brand font-semibold hover:gap-3 transition-all group">
              Next step
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className={`relative h-96 md:h-full min-h-96 ${!isEven ? 'md:col-start-1 md:row-start-1' : ''}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <img
              src={step.image}
              alt={step.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-muted/30 dark:bg-muted/20">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand/10 border border-brand/20 mb-6">
            <span className="text-xs font-medium text-brand">Simple Process</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            How It <span className="text-brand-accent">Works</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A simple process to transform your coding and AI journey with powerful prompt management
          </p>
        </motion.div>

        {/* Steps */}
        <div>
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-24 text-center py-16 bg-muted/50 rounded-2xl border border-border"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of developers managing their prompts more effectively.
          </p>
          <Button asChild size="lg" className="group">
            <Link to="/app/dashboard">
              Start Building Prompts
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
