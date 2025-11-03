import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, Plus, Search, ArrowDownUp, Play, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Batches = () => {
  const navigate = useNavigate();

  // Mock data - would come from backend in real app
  const batches = [
    {
      id: 1,
      title: "Blog Content Generation",
      description: "Generate title, outline, and full blog post in sequence",
      promptCount: 3,
      lastRun: "2 days ago",
      prompts: [
        "Generate blog title",
        "Create detailed outline",
        "Write full blog post"
      ]
    },
    {
      id: 2,
      title: "Social Media Package",
      description: "Create content for multiple social platforms",
      promptCount: 4,
      lastRun: "1 week ago",
      prompts: [
        "LinkedIn post",
        "Twitter thread",
        "Instagram caption",
        "Facebook post"
      ]
    }
  ];

  const handleCreateBatch = () => {
    toast.success("Coming soon: Create new batch");
  };

  const handleRunBatch = (batchId) => {
    toast.success("Starting batch execution...");
  };

  const handleEditBatch = (batchId) => {
    toast.success("Coming soon: Edit batch");
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Prompt Batches</h1>
            <p className="text-muted-foreground">
              Create and run sequences of prompts for complex content generation tasks
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search batches..."
              className="pl-8"
            />
          </div>
          <Button onClick={handleCreateBatch}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Batch
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-250px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batches.map((batch) => (
              <Card key={batch.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle>{batch.title}</CardTitle>
                      <CardDescription>{batch.description}</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditBatch(batch.id)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{batch.promptCount} prompts</span>
                      <span>Last run: {batch.lastRun}</span>
                    </div>
                    <div className="space-y-2">
                      {batch.prompts.map((prompt, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm p-2 bg-muted rounded-md"
                        >
                          <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
                          <span className="flex-1">{prompt}</span>
                          <Badge variant="secondary">{index + 1}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <div className="p-6 mt-auto">
                  <Button 
                    className="w-full" 
                    onClick={() => handleRunBatch(batch.id)}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Run Batch
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Batches;