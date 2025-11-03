import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from 'lucide-react';

export const PromptTagsField = ({ newPrompt, setNewPrompt }) => {
  const [currentTag, setCurrentTag] = useState('');

  const handleAddTag = (e) => {
    e.preventDefault();
    if (currentTag && !newPrompt.tags.includes(currentTag)) {
      setNewPrompt(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setNewPrompt(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Tags</label>
      <div className="flex gap-2 flex-wrap mb-2">
        {newPrompt.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="gap-1">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          placeholder="Add a tag"
        />
        <Button type="button" variant="secondary" onClick={handleAddTag}>Add</Button>
      </div>
    </div>
  );
};