import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, Copy, Star, History, Edit } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { PromptVersionHistory } from "@/components/prompt";
import { useState, useCallback } from "react";
import { toggleFavorite } from "@/services/favorites";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { CreatePromptSheet } from "@/components/modals";
import { getPrompt, getPromptVersions, updatePrompt } from '@/services/prompts';

const PromptDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  // Main prompt query
  const { data: prompt, isLoading, error } = useQuery({
    queryKey: ['prompt', id],
    queryFn: async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw new Error('Authentication error');
        if (!user) {
          navigate('/signin', { state: { from: `/app/prompts/${id}` } });
          throw new Error('Authentication required');
        }
        
        const data = await getPrompt(id);
        if (!data) throw new Error('Prompt not found');
        return data;
      } catch (error) {
        console.error('Error in prompt query:', error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    retry: false
  });

  // Version history query
  const { data: versions } = useQuery({
    queryKey: ['prompt-versions', id],
    queryFn: () => getPromptVersions(id),
    enabled: !!id && showVersionHistory,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });

  const handleCopyPrompt = useCallback(() => {
    if (!prompt?.content) return;
    navigator.clipboard.writeText(prompt.content);
    toast.success("Prompt copied to clipboard!");
  }, [prompt?.content]);

  const handleRestoreVersion = useCallback(async (version) => {
    try {
      await updatePrompt(id, {
        ...version,
        changeDescription: `Restored from version ${version.version}`
      });
      toast.success('Version restored successfully!');
      queryClient.invalidateQueries({ queryKey: ['prompt', id] });
      queryClient.invalidateQueries({ queryKey: ['prompt-versions', id] });
      setShowVersionHistory(false);
    } catch (error) {
      console.error('Error restoring version:', error);
      toast.error('Failed to restore version');
    }
  }, [id, queryClient]);

  if (isLoading) {
    return <div className="p-8 max-w-4xl mx-auto">Loading prompt...</div>;
  }

  if (error) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-center text-red-500">
            <p className="font-semibold">Error loading prompt</p>
            <p className="text-sm mt-2">{error.message}</p>
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="mt-4"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-center">
            <p className="font-semibold">Prompt not found</p>
            <p className="text-sm mt-2 text-muted-foreground">
              The prompt you're looking for might have been deleted or you may not have permission to view it.
            </p>
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="mt-4"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center md:ml-0 ml-16">
      <div className="p-8 max-w-4xl w-full">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold">{prompt.title}</h1>
              <p className="text-muted-foreground">
                Created {new Date(prompt.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="ml-auto relative"
                onClick={() => setShowVersionHistory(!showVersionHistory)}
              >
                <History className="mr-2 h-4 w-4" />
                Version History
                <Badge variant="secondary" className="absolute -top-2 -right-2 text-xs bg-primary/10 text-primary">
                  Coming Soon
                </Badge>
              </Button>
            </div>
          </div>

          {showVersionHistory ? (
            <PromptVersionHistory
              versions={versions || []}
              currentVersion={prompt.version}
              onRestoreVersion={handleRestoreVersion}
            />
          ) : (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle>Prompt Content</CardTitle>
                    <CardDescription>{prompt.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsEditSheetOpen(true)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCopyPrompt}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-md">
                  <pre className="whitespace-pre-wrap text-sm">{prompt.content}</pre>
                </div>
                <div className="flex flex-wrap gap-2">
                  {prompt.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <CreatePromptSheet
          isOpen={isEditSheetOpen}
          onOpenChange={setIsEditSheetOpen}
          initialData={prompt}
          mode="edit"
        />
      </div>
    </div>
  );
};

export default PromptDetail;