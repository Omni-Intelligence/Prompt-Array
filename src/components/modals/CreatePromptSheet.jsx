import React from 'react';
import { PromptForm } from '@/components/forms';
import { toast } from "sonner";
import { createPrompt, updatePrompt } from '@/services/prompts';
import { useQueryClient } from '@tanstack/react-query';
import { usePromptLimits } from '@/hooks/billing';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const CreatePromptSheet = ({ trigger, isOpen, onOpenChange, initialData = null, mode = 'create' }) => {
  const queryClient = useQueryClient();
  const { canCreatePrompt, promptCount, promptLimit, isSubscribed } = usePromptLimits();
  const [newPrompt, setNewPrompt] = React.useState({
    title: mode === 'create' && !initialData?.title ? '' : (initialData?.title || ''),
    content: mode === 'create' && !initialData?.title ? '' : (initialData?.content || ''),
    description: mode === 'create' && !initialData?.title ? '' : (initialData?.description || ''),
    tags: mode === 'create' && !initialData?.title ? [] : (initialData?.tags || []),
    isPublic: mode === 'create' && !initialData?.title ? false : (initialData?.isPublic || false),
    teamId: initialData?.teamId || '',
    groupId: initialData?.groupId || 'none',
    changeDescription: ''
  });

  React.useEffect(() => {
    if (initialData) {
      setNewPrompt({
        title: initialData.title || '',
        content: initialData.content || '',
        description: initialData.description || '',
        tags: initialData.tags || [],
        isPublic: initialData.is_public !== undefined ? initialData.is_public : false,
        teamId: initialData.team_id || '',
        groupId: initialData.group_id || 'none',
        changeDescription: ''
      });
    } else {
      setNewPrompt({
        title: '',
        content: '',
        description: '',
        tags: [],
        isPublic: false,
        teamId: '',
        groupId: 'none',
        changeDescription: ''
      });
    }
  }, [initialData]);

  const handleCreatePrompt = async (e) => {
    e.preventDefault();
    
    if (!newPrompt.title || !newPrompt.content) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      if (mode === 'edit' && initialData?.id) {
        const updatedPrompt = await updatePrompt(initialData.id, newPrompt);
        // Update the cache with the new data
        queryClient.setQueryData(['prompt', initialData.id], updatedPrompt);
        toast.success("Prompt updated successfully!");
      } else {
        await createPrompt(newPrompt);
        toast.success("Prompt created successfully!");
      }
      
      // Invalidate queries to refresh the UI
      queryClient.invalidateQueries({ queryKey: ['prompts'] });
      queryClient.invalidateQueries({ queryKey: ['prompt', initialData?.id] });
      if (newPrompt.groupId) {
        queryClient.invalidateQueries({ queryKey: ['group-prompts', newPrompt.groupId] });
      }
      
      onOpenChange?.(false);
      
      // Only reset the form if we're not in edit mode
      if (mode !== 'edit') {
        setNewPrompt({ 
          title: '', 
          content: '', 
          description: '', 
          tags: [],
          isPublic: false,
          teamId: '',
          groupId: 'none',
          changeDescription: ''
        });
      }
    } catch (error) {
      console.error('Error with prompt:', error);
      toast.error(mode === 'edit' ? "Failed to update prompt. Please try again." : "Failed to create prompt. Please try again.");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent className="sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>
            {mode === 'edit' ? 'Edit Prompt' : (mode === 'fork' ? 'Fork Prompt' : 'Create New Prompt')}
          </SheetTitle>
          <SheetDescription>
            {mode === 'edit' 
              ? 'Update your prompt details' 
              : (mode === 'fork'
                ? 'Fork this prompt to your library' 
                : <>
                    Add a new prompt to your library
                  </>
                )
            }
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <PromptForm
            newPrompt={newPrompt}
            setNewPrompt={setNewPrompt}
            onSubmit={handleCreatePrompt}
            initialData={initialData}
            isEditing={!!initialData}
            mode={mode}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { CreatePromptSheet };