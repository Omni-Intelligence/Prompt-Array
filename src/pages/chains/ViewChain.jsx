import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Edit, Copy, ChevronDown, ChevronUp, GitBranch } from "lucide-react";
import { getChain } from "@/services/chains";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ChainConnector = ({ startY, endY }) => (
  <svg
    className="absolute left-8 top-0 h-full w-16 overflow-visible"
    style={{ transform: 'translateX(-50%)' }}
  >
    <motion.path
      d={`M 32 ${startY} C 32 ${startY + 40}, 32 ${endY - 40}, 32 ${endY}`}
      stroke="url(#gradient)"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
  </svg>
);

const ViewChain = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chain, setChain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedPrompts, setExpandedPrompts] = useState({});
  const promptRefs = useRef([]);

  const handleCopy = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const togglePrompt = (promptId) => {
    setExpandedPrompts(prev => ({
      ...prev,
      [promptId]: !prev[promptId]
    }));
  };

  useEffect(() => {
    const loadChain = async () => {
      try {
        const chainData = await getChain(id);
        setChain(chainData);
        promptRefs.current = new Array(chainData.prompts?.length || 0).fill(null);
        const initialExpandState = {};
        chainData.prompts?.forEach(prompt => {
          initialExpandState[prompt.id] = false;
        });
        setExpandedPrompts(initialExpandState);
      } catch (error) {
        console.error('Error loading chain:', error);
        toast.error("Failed to load chain");
      } finally {
        setLoading(false);
      }
    };

    loadChain();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-muted-foreground">Loading chain...</div>
      </div>
    );
  }

  if (!chain) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-muted-foreground">Chain not found</div>
      </div>
    );
  }

  const getPreviewContent = (content) => {
    const maxLength = 150;
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen p-8 space-y-8 bg-gradient-to-br from-background via-background to-primary/5 md:ml-0 ml-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/app/chains")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-violet-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                {chain.title}
              </h1>
            </div>
            {chain.description && (
              <p className="text-muted-foreground mt-1">{chain.description}</p>
            )}
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate(`/app/chains/${id}/edit`)}
          className="border-violet-200 hover:border-violet-300 hover:bg-violet-50 dark:border-violet-800 dark:hover:border-violet-700 dark:hover:bg-violet-900/50"
        >
          <Edit className="h-4 w-4 mr-2 text-violet-500" />
          Edit Chain
        </Button>
      </div>

      <div className="relative space-y-12">
        {chain.prompts?.map((prompt, index) => (
          <motion.div
            key={prompt.id}
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            ref={el => promptRefs.current[index] = el}
          >
            {index < chain.prompts.length - 1 && promptRefs.current[index] && promptRefs.current[index + 1] && (
              <ChainConnector
                startY={promptRefs.current[index].offsetHeight / 2}
                endY={promptRefs.current[index].offsetHeight + 48}
              />
            )}
            <Card className="relative ml-16 p-6 border-violet-200 dark:border-violet-800 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:border-violet-300 dark:hover:border-violet-700 transition-colors">
              <div className="absolute left-0 top-1/2 transform -translate-x-[2.75rem] -translate-y-1/2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-medium shadow-lg">
                  {index + 1}
                </div>
              </div>
              <div className="flex items-start justify-between">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{prompt.title}</h3>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(prompt.content)}
                        className="h-8 px-2 hover:bg-violet-50 dark:hover:bg-violet-900/50"
                      >
                        <Copy className="h-4 w-4 text-violet-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePrompt(prompt.id)}
                        className="h-8 px-2 hover:bg-violet-50 dark:hover:bg-violet-900/50"
                      >
                        {expandedPrompts[prompt.id] ? (
                          <ChevronUp className="h-4 w-4 text-violet-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-violet-500" />
                        )}
                      </Button>
                    </div>
                  </div>
                  {prompt.description && (
                    <p className="text-muted-foreground mb-4">{prompt.description}</p>
                  )}
                  <motion.div
                    className="mt-4 bg-violet-50/50 dark:bg-violet-900/20 p-4 rounded-md border border-violet-100 dark:border-violet-800"
                    layout
                  >
                    <pre className="whitespace-pre-wrap text-sm">
                      {expandedPrompts[prompt.id] 
                        ? prompt.content 
                        : getPreviewContent(prompt.content)}
                    </pre>
                  </motion.div>
                  {!expandedPrompts[prompt.id] && prompt.content.length > 150 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePrompt(prompt.id)}
                      className="mt-2 text-violet-500 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/50"
                    >
                      Show more
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ViewChain;
