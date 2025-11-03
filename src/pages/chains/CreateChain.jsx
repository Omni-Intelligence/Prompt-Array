import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ArrowLeft, Plus, Save } from "lucide-react";
import { usePrompts } from "@/hooks/prompts";
import { createChain } from "@/services/chains";
import { toast } from "sonner";

const CreateChain = () => {
  const navigate = useNavigate();
  const { data: prompts } = usePrompts();

  const [chain, setChain] = useState({
    title: "",
    description: "",
    prompts: []
  });

  const [isPromptSheetOpen, setIsPromptSheetOpen] = useState(false);

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

      await createChain(chainData);
      toast.success("Chain created successfully");
      navigate("/app/chains");
    } catch (error) {
      console.error('Error creating chain:', error);
      toast.error(error.message || "Failed to create chain");
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/app/chains')}
              className="hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                Create New Chain
              </h1>
              <p className="text-muted-foreground">Create a new sequence of prompts</p>
            </div>
          </div>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Chain
          </Button>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Title</label>
                <Input
                  placeholder="Enter chain title"
                  value={chain.title}
                  onChange={(e) => setChain(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <Textarea
                  placeholder="Enter chain description"
                  value={chain.description}
                  onChange={(e) => setChain(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Prompts</h2>
                <Sheet open={isPromptSheetOpen} onOpenChange={setIsPromptSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Prompt
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Select Prompt</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4 space-y-2">
                      {prompts?.map((prompt) => (
                        <div
                          key={prompt.id}
                          onClick={() => handleAddPrompt(prompt)}
                          className="p-4 rounded-lg border hover:bg-accent cursor-pointer"
                        >
                          <h3 className="font-medium">{prompt.title}</h3>
                          <p className="text-sm text-muted-foreground">{prompt.description}</p>
                        </div>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              <div className="space-y-2">
                {chain.prompts.map((prompt, index) => (
                  <div
                    key={prompt.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div>
                      <h3 className="font-medium">{prompt.title}</h3>
                      <p className="text-sm text-muted-foreground">{prompt.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemovePrompt(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                {chain.prompts.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No prompts added yet. Click "Add Prompt" to get started.
                  </p>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateChain;
