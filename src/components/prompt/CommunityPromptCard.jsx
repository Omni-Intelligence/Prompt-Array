import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Share2, MessageSquare, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from 'date-fns';
import { useForkPrompt } from '@/hooks/community';

const CommunityPromptCard = ({ prompt, onShare, onFork, onClick }) => {
  const { mutate: forkPrompt, isLoading: isForking } = useForkPrompt();

  const handleShare = (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/app/prompts/${prompt.id}`;
    navigator.clipboard.writeText(url);
    onShare?.(prompt.id);
  };

  const handleFork = async (e) => {
    e.stopPropagation();
    try {
      await forkPrompt(prompt.id);
      onFork?.(prompt);
    } catch (error) {
      console.error('Error forking prompt:', error);
    }
  };

  // Ensure we have valid data
  if (!prompt?.id || !prompt?.title) {
    console.warn('Invalid prompt data:', prompt);
    return null;
  }

  return (
    <Card 
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 hover:border-primary/20"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 ring-2 ring-primary/20">
              <AvatarImage src={prompt.author?.avatar_url} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {prompt.author?.full_name?.[0] || 'A'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium group-hover:text-primary transition-colors">
                {prompt.author?.full_name || 'Anonymous'}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(prompt.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            Community
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <CardTitle className="mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {prompt.title}
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {prompt.description || 'No description provided'}
        </CardDescription>
        {prompt.tags && prompt.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {prompt.tags.map(tag => (
              <Badge 
                key={tag}
                variant="secondary"
                className="bg-primary/5 text-primary/80 hover:bg-primary/10 transition-colors text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm">{prompt.favorites_count || 0}</span>
          <MessageSquare className="h-4 w-4 ml-2" />
          <span className="text-sm">{prompt.comments_count || 0}</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            className="hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFork}
            disabled={isForking}
            className="hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export { CommunityPromptCard };