import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { CreatePromptSheet } from "@/components/modals";
import { useState } from "react";
import { getPrompt } from "@/services/prompts";

const CommunityPromptDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCreatePromptOpen, setIsCreatePromptOpen] = useState(false);

  const { data: prompt, isLoading, error } = useQuery({
    queryKey: ["communityPrompt", id],
    queryFn: () => getPrompt(id),
  });

  const handleShare = () => {
    const url = `${window.location.origin}/community/prompt/${id}`;
    navigator.clipboard.writeText(url);
    toast.success("Sharing link copied to clipboard!");
  };

  const handleFork = () => {
    setIsCreatePromptOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !prompt) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold mb-2">
              {error ? "Error loading prompt" : "Prompt not found"}
            </h2>
            <p className="text-gray-600">
              {error?.message || "This prompt might have been deleted or made private"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleFork}
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Fork
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={prompt.author?.avatar_url} />
              <AvatarFallback>{prompt.author?.full_name?.[0] || "A"}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">
                {prompt.author?.full_name || "Anonymous"}
              </h2>
              <p className="text-sm text-gray-600">
                {formatDistanceToNow(new Date(prompt.created_at), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{prompt.title}</h1>
            {prompt.description && (
              <p className="text-gray-600 mb-8">{prompt.description}</p>
            )}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <pre className="whitespace-pre-wrap text-sm">
                {prompt.content}
              </pre>
            </div>
          </div>
        </div>

        <CreatePromptSheet
          isOpen={isCreatePromptOpen}
          onOpenChange={(open) => setIsCreatePromptOpen(open)}
          initialData={{
            ...prompt,
            title: `${prompt.title} (Fork)`,
            is_public: false,
          }}
        />
      </div>
    </div>
  );
};

export default CommunityPromptDetail;
