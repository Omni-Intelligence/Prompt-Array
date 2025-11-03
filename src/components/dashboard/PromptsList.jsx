import React, { useState } from 'react';
import { Star, Search, Trash2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePrompts } from '@/hooks/prompts';
import { toggleFavorite } from '@/services/favorites';
import { useQuery } from "@tanstack/react-query";
import { getTemplates } from '@/services/templates';
import { queryClient } from '@/lib/react-query';
import { toast } from "sonner";
import { deletePrompt } from '@/services/prompts';

const PromptItem = ({ prompt, onClick }) => {
  const handleClick = () => {
    console.log('PromptItem - Clicked prompt:', prompt);
    onClick(prompt);
  };

  const handleFavorite = async (e) => {
    e.stopPropagation();
    try {
      await toggleFavorite(prompt.id);
      queryClient.invalidateQueries({ queryKey: ['prompts'] });
      toast.success(prompt.starred ? "Removed from favorites" : "Added to favorites");
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error("Failed to update favorite status");
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this prompt? This action cannot be undone.')) {
      try {
        await deletePrompt(prompt.id);
        queryClient.invalidateQueries({ queryKey: ['prompts'] });
        toast.success("Prompt deleted successfully");
      } catch (error) {
        console.error('Error deleting prompt:', error);
        toast.error("Failed to delete prompt");
      }
    }
  };

  return (
    <li 
      onClick={handleClick}
      className="group bg-gradient-card hover:bg-gradient-card-hover backdrop-blur-sm p-2 md:p-4 rounded-lg border-none shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <span className="text-2xl group-hover:scale-110 transition-transform">{prompt.icon || '📝'}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm md:text-base font-medium text-white dark:text-white group-hover:text-white/90 transition-colors truncate">
            {prompt.title}
          </h3>
          <p className="text-xs md:text-sm text-white/80 dark:text-white/80 mt-1 truncate">
            {prompt.lastUsed ? `Last used ${prompt.lastUsed}` : prompt.updated_at ? `Last updated ${new Date(prompt.updated_at).toLocaleDateString()}` : 'Recently added'}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleFavorite}
          className={`${prompt.starred ? 'text-yellow-300' : 'text-white/70'} hover:text-yellow-300 transition-colors`}
        >
          <Star className={`h-5 w-5 ${prompt.starred ? 'fill-current' : ''}`} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          className="text-white/70 hover:text-red-300 transition-colors"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </li>
  );
};

const PromptsList = ({ onPromptClick }) => {
  const { data: userPrompts, isLoading: isLoadingPrompts, error: promptsError } = usePrompts();
  const { data: templates, isLoading: isLoadingTemplates, error: templatesError } = useQuery({
    queryKey: ['templates'],
    queryFn: getTemplates
  });
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoadingPrompts || isLoadingTemplates) {
    return <div className="text-white/80">Loading prompts...</div>;
  }

  if (promptsError || templatesError) {
    return <div className="text-red-300">Error loading prompts: {(promptsError || templatesError).message}</div>;
  }

  const filteredPrompts = userPrompts.filter(prompt => 
    prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categorizedPrompts = {
    recent: filteredPrompts.slice(0, 10),
    favorites: filteredPrompts.filter(p => p.starred),
    owned: filteredPrompts,
    templates: templates || []
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">All Prompts</h2>
        <div className="w-full max-w-md relative ml-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/70" />
          <Input 
            type="search" 
            placeholder="Search through prompts by title or content..." 
            className="pl-10 bg-primary/5 hover:bg-primary/10 text-gray-900 dark:text-white border-primary/20 hover:border-primary/40 placeholder:text-primary/50 focus:border-primary focus:ring-primary transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="w-full justify-start bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border-white/20 dark:border-gray-700/20">
          <TabsTrigger 
            value="recent" 
            className="text-gray-800 dark:text-gray-200 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            Recent
          </TabsTrigger>
          <TabsTrigger 
            value="favorites" 
            className="text-gray-800 dark:text-gray-200 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            Favorites
          </TabsTrigger>
          <TabsTrigger 
            value="owned" 
            className="text-gray-800 dark:text-gray-200 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            My Prompts
          </TabsTrigger>
          <TabsTrigger 
            value="templates" 
            className="text-gray-800 dark:text-gray-200 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            Templates
          </TabsTrigger>
        </TabsList>

        {Object.entries(categorizedPrompts).map(([category, categoryPrompts]) => (
          <TabsContent key={category} value={category}>
            <ScrollArea className="h-[800px]">
              {categoryPrompts.length === 0 ? (
                <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                  {category === 'templates' ? 'No template prompts available.' : 'No prompts found. Create your first prompt by clicking the "New Prompt" button above.'}
                </p>
              ) : (
                <ul className="space-y-4">
                  {categoryPrompts.map((prompt) => (
                    <PromptItem 
                      key={prompt.id} 
                      prompt={prompt}
                      onClick={onPromptClick}
                    />
                  ))}
                </ul>
              )}
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export { PromptsList };