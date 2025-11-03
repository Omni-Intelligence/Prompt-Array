import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const promptingTechniques = [
  {
    id: 1,
    title: "Zero-Shot Prompting",
    description: "Leverages AI's pre-trained knowledge without examples or context",
    example: `Write a comprehensive product description for a new smart water bottle that tracks hydration levels. Include features, benefits, and target audience. Format the response with clear sections and bullet points.`,
    why: "Zero-shot prompting involves asking the AI to perform a task without providing any examples or additional context. It leverages the AI's pre-trained knowledge to generate responses based solely on the instruction."
  },
  {
    id: 2,
    title: "Few-Shot Prompting",
    description: "Provides examples to help the AI understand the desired pattern",
    example: `Transform these technical explanations into simple analogies that a 10-year-old could understand:

1. "DNS servers are like the internet's phone book" - They help computers find the right website address, just like a phone book helps you find someone's phone number.
2. "RAM is like a desk workspace" - It's where your computer does its current work, just like you spread papers on a desk while working.
3. "Blockchain technology is like..." (complete this analogy)
4. "Machine learning algorithms are like..." (complete this analogy)`,
    why: "Few-shot prompting provides the AI with a few examples of the desired output. This helps the model understand the pattern or format you expect, improving the relevance and accuracy of the response."
  }
];

const TechniqueCard = ({ technique, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const gradients = [
    "from-blue-500/5 to-indigo-500/5 hover:from-blue-500/10 hover:to-indigo-500/10",
    "from-purple-500/5 to-pink-500/5 hover:from-purple-500/10 hover:to-pink-500/10",
    "from-green-500/5 to-emerald-500/5 hover:from-green-500/10 hover:to-emerald-500/10",
    "from-orange-500/5 to-red-500/5 hover:from-orange-500/10 hover:to-red-500/10",
    "from-pink-500/5 to-rose-500/5 hover:from-pink-500/10 hover:to-rose-500/10",
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Card className={cn(
        "h-full transition-all duration-300 relative overflow-hidden",
        "hover:shadow-lg hover:shadow-primary/20",
        "border-2 border-transparent",
        isExpanded ? "!border-primary" : "hover:border-primary/50",
        "bg-gradient-to-br",
        gradient
      )}>
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">
                {technique.title}
              </CardTitle>
              <CardDescription className="mt-2">
                {technique.description}
              </CardDescription>
            </div>
            <div className={cn(
              "w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center",
              "text-lg font-bold text-primary/70 group-hover:text-primary transition-colors duration-300",
              "border-2 border-primary/20 group-hover:border-primary/40"
            )}>
              {index + 1}
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative space-y-4">
          <div>
            <h3 className="font-semibold mb-2 text-primary">Why it works:</h3>
            <p className="text-sm text-muted-foreground">{technique.why}</p>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-primary">Example:</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs"
              >
                {isExpanded ? "Show Less" : "Show More"}
              </Button>
            </div>
            <div className={cn(
              "transition-all duration-300 overflow-hidden",
              isExpanded ? "max-h-[500px]" : "max-h-[80px]"
            )}>
              <div className="rounded-md bg-background/80 p-4 border border-muted">
                <pre className="text-sm whitespace-pre-wrap font-mono">{technique.example}</pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Techniques = () => {
  return (
    <div className="min-h-screen p-8 space-y-8 bg-gradient-to-br from-background via-background to-primary/5 md:ml-0 ml-16">
      <div className="py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Prompting Techniques
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master the art of crafting effective prompts for AI interactions with these powerful techniques
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promptingTechniques.map((technique, index) => (
            <TechniqueCard 
              key={technique.id} 
              technique={technique} 
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Techniques;
