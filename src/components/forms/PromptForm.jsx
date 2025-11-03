import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PromptTeamAndGroupFields } from './PromptTeamAndGroupFields';
import { PromptTagsField } from './PromptTagsField';
import { toast } from "sonner";

export const PromptForm = ({ newPrompt, setNewPrompt, onSubmit, initialData, isEditing, mode }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <Input
          id="title"
          value={newPrompt.title}
          onChange={(e) => setNewPrompt(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Enter prompt title"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <Input
          id="description"
          value={newPrompt.description}
          onChange={(e) => setNewPrompt(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Enter prompt description"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          Prompt Content
        </label>
        <Textarea
          id="content"
          value={newPrompt.content}
          onChange={(e) => setNewPrompt(prev => ({ ...prev, content: e.target.value }))}
          placeholder="Enter your prompt content"
          className="min-h-[200px]"
        />
      </div>

      {isEditing && (
        <div className="space-y-2">
          <label htmlFor="changeDescription" className="text-sm font-medium">
            Change Description
          </label>
          <Input
            id="changeDescription"
            value={newPrompt.changeDescription}
            onChange={(e) => setNewPrompt(prev => ({ ...prev, changeDescription: e.target.value }))}
            placeholder="Describe what changed in this version"
          />
        </div>
      )}

      <PromptTeamAndGroupFields newPrompt={newPrompt} setNewPrompt={setNewPrompt} />
      <PromptTagsField newPrompt={newPrompt} setNewPrompt={setNewPrompt} />

      <Button type="submit" className="w-full">
        {mode === 'edit' ? 'Update Prompt' : (mode === 'fork' ? 'Fork Prompt' : 'Create Prompt')}
      </Button>
    </form>
  );
};