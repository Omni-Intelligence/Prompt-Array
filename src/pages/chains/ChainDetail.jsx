import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react";
import { usePrompts } from "@/hooks/prompts";
import { createChain, updateChain, getChain } from "@/services/chains";
import { toast } from "sonner";

const ChainDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = id === "new";
  const { data: prompts } = usePrompts();

  const [chain, setChain] = useState({
    title: "",
    description: "",
    prompts: []
  });

  const [isPromptSheetOpen, setIsPromptSheetOpen] = useState(false);

  useEffect(() => {
    if (!isNew && id) {
      const loadChain = async () => {
        try {
          const chainData = await getChain(id);
          if (chainData) {
            setChain(chainData);
          } else {
            toast.error("Chain not found");
            navigate("/app/chains");
          }
        } catch (error) {
          console.error('Error loading chain:', error);
          toast.error("Failed to load chain");
          navigate("/app/chains");
        }
      };
      loadChain();
    }
  }, [id, isNew, navigate]);

  const handleSave = async () => {
    if (!chain.title.trim()) {
      toast.error("Please enter a title for your chain");
      return;
    }

    if (chain.prompts.length === 0) {
      toast.error("Please add at least one prompt to your chain");
      return;
    }

    try {
      const chainData = {
        title: chain.title,
        description: chain.description || "",
        prompts: chain.prompts.map(prompt => prompt.id)
      };

      if (isNew) {
        await createChain(chainData);
        toast.success("Chain created successfully");
        navigate("/app/chains");
        return;
      }

      if (!id) {
        toast.error("Missing chain ID");
        return;
      }

      await updateChain(id, chainData);
      toast.success("Chain updated successfully");
      navigate("/app/chains");
    } catch (error) {
      console.error('Error saving chain:', error);
      toast.error(error.message || "Failed to save chain");
    }
  };

  const handleAddPrompt = (prompt) => {
    setChain(prev => ({
      ...prev,
      prompts: [...prev.prompts, prompt]
    }));
    setIsPromptSheetOpen(false);
  };

  const handleRemovePrompt = (index) => {
    setChain(prev => ({
      ...prev,
      prompts: prev.prompts.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/app/chains")}
              className="hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                {isNew ? "Create New Chain" : "Edit Chain"}
              </h1>
              <p className="text-muted-foreground">
                {isNew ? "Create a new sequence of prompts" : "Modify your prompt chain"}
              </p>
            </div>
          </div>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Chain
          </Button>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Chain Title</label>
                <Input
                  placeholder="Enter a title for your chain"
                  value={chain.title}
                  onChange={(e) => setChain(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  placeholder="Describe what this chain does"
                  value={chain.description}
                  onChange={(e) => setChain(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Prompts</h2>
                <Sheet open={isPromptSheetOpen} onOpenChange={setIsPromptSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Prompt
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Select a Prompt</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 space-y-4">
                      {prompts?.map((prompt) => (
                        <Card
                          key={prompt.id}
                          className="p-4 cursor-pointer hover:bg-primary/5 transition-colors"
                          onClick={() => handleAddPrompt(prompt)}
                        >
                          <h3 className="font-medium">{prompt.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {prompt.description}
                          </p>
                        </Card>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {chain.prompts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No prompts added yet. Click "Add Prompt" to get started.
                </div>
              ) : (
                <div className="space-y-4">
                  {chain.prompts.map((prompt, index) => (
                    <Card key={index} className="p-4 bg-white/50 dark:bg-gray-800/50">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-medium">{prompt.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {prompt.description}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemovePrompt(index)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChainDetail;