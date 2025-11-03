import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Search, Grid3X3, Users, ArrowLeft, TrendingUp, Clock, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCommunityPrompts } from "@/hooks/community";
import { CommunityPromptCard } from "@/components/prompt";
import { CreatePromptSheet } from "@/components/modals";

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("latest");
  const [viewMode, setViewMode] = useState("grid");
  const [isCreatePromptOpen, setIsCreatePromptOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const navigate = useNavigate();

  const { data: prompts, isLoading, error } = useCommunityPrompts({
    filter,
    searchQuery: searchQuery.trim(),
  });

  useEffect(() => {
    if (error) {
      console.error('Community page error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        stack: error.stack
      });
    }
  }, [error]);

  const handleShare = (promptId) => {
    const url = `${window.location.origin}/app/prompts/${promptId}`;
    navigator.clipboard.writeText(url);
    toast.success("Sharing link copied to clipboard!");
  };

  const handleFork = (prompt) => {
    setSelectedPrompt({
      ...prompt,
      title: `${prompt.title} (Fork)`,
      is_public: false
    });
    setIsCreatePromptOpen(true);
  };

  if (error) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-center text-red-500">
            <p className="font-semibold">Error loading prompts</p>
            <p className="text-sm mt-2">{error.message}</p>
            {error.hint && (
              <p className="text-sm mt-1 text-gray-600">{error.hint}</p>
            )}
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 space-y-8 bg-gradient-to-br from-background via-background to-primary/5 md:ml-0 ml-16">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 blur-3xl -z-10" />
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                Community
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-stretch">
            <div className="relative flex-grow">
              <Input
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 focus:border-primary/50 focus:ring-primary/50"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === 'latest' ? 'default' : 'outline'}
                onClick={() => setFilter('latest')}
                className="flex-1 sm:flex-none gap-2 bg-primary/10 hover:bg-primary/20 text-primary border-primary/20"
              >
                <Clock className="h-4 w-4" />
                Latest
              </Button>
              <Button
                variant={filter === 'trending' ? 'default' : 'outline'}
                onClick={() => setFilter('trending')}
                className="flex-1 sm:flex-none gap-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-500 border-purple-500/20"
              >
                <TrendingUp className="h-4 w-4" />
                Trending
              </Button>
              <Button
                variant={filter === 'top' ? 'default' : 'outline'}
                onClick={() => setFilter('top')}
                className="flex-1 sm:flex-none gap-2 bg-primary/10 hover:bg-primary/20 text-primary border-primary/20"
              >
                <Star className="h-4 w-4" />
                Top
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : prompts?.length === 0 ? (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-xl font-semibold text-gray-600 mb-2">No prompts found</p>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <ScrollArea className="h-[calc(100vh-16rem)]">
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6 p-4`}>
            {prompts?.map((prompt) => (
              <CommunityPromptCard
                key={prompt.id}
                prompt={prompt}
                onShare={() => handleShare(prompt.id)}
                onFork={() => handleFork(prompt)}
                onClick={() => navigate(`/app/prompts/${prompt.id}`)}
              />
            ))}
          </div>
        </ScrollArea>
      )}

      <CreatePromptSheet
        isOpen={isCreatePromptOpen}
        onOpenChange={(open) => {
          setIsCreatePromptOpen(open);
          if (!open) setSelectedPrompt(null);
        }}
        initialData={selectedPrompt}
      />
    </div>
  );
};

export default Community;