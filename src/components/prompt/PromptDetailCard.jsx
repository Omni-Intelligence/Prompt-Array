import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, Copy, Clock } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PromptDetailCard = ({ prompt, onCopy, onEdit, onDelete }) => {
  return (
    <Card className="group backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 hover:border-primary/20 hover:scale-[1.01]">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="group-hover:text-primary transition-colors">
              {prompt.title}
            </CardTitle>
            <CardDescription>{prompt.description}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onCopy(prompt.content)}
              className="hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onEdit(prompt)}
              className="hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onDelete(prompt.id)}
              className="hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/50 p-4 rounded-md backdrop-blur-sm mb-4">
          <pre className="whitespace-pre-wrap text-sm">{prompt.content}</pre>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {prompt.tags?.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Last used: {prompt.lastUsed}</span>
          <Badge variant="outline" className="ml-2">v{prompt.currentVersion}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export { PromptDetailCard };