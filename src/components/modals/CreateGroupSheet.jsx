import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createGroup } from "@/services/groups";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useQueryClient } from '@tanstack/react-query';

const CreateGroupSheet = ({ isOpen, onOpenChange = () => {}, trigger }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const queryClient = useQueryClient();
  const [newGroup, setNewGroup] = React.useState({
    name: '',
    description: ''
  });

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!newGroup.name || !newGroup.description) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    try {
      await createGroup({
        name: newGroup.name,
        description: newGroup.description
      });
      toast.success("Group created successfully!");
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      onOpenChange(false);
      setNewGroup({ name: '', description: '' });
    } catch (error) {
      console.error('Error in handleCreateGroup:', error);
      const errorMessage = error.message || error.error_description || "Failed to create group. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent className="w-[95vw] max-w-[800px] sm:w-[800px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Create New Group</SheetTitle>
          <SheetDescription>
            Add a new group to organize your prompts
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleCreateGroup} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              value={newGroup.name}
              onChange={(e) => setNewGroup(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter group name"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={newGroup.description}
              onChange={(e) => setNewGroup(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter group description"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Group'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export { CreateGroupSheet };