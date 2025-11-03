import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { updateGroup } from "@/services/groups";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useQueryClient } from '@tanstack/react-query';

const EditGroupSheet = ({ isOpen, onOpenChange, group }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const queryClient = useQueryClient();
  const [editedGroup, setEditedGroup] = React.useState({
    title: group?.name || '',
    description: group?.description || ''
  });

  // Update form when group prop changes
  React.useEffect(() => {
    if (group) {
      setEditedGroup({
        title: group.name || '',
        description: group.description || ''
      });
    }
  }, [group]);

  const handleUpdateGroup = async (e) => {
    e.preventDefault();
    if (!editedGroup.title || !editedGroup.description) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    try {
      await updateGroup(group.id, {
        name: editedGroup.title,
        description: editedGroup.description
      });
      toast.success("Group updated successfully!");
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      onOpenChange(false);
    } catch (error) {
      console.error('Error in handleUpdateGroup:', error);
      toast.error(error.message || "Failed to update group. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Group</SheetTitle>
          <SheetDescription>
            Make changes to your group here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleUpdateGroup} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={editedGroup.title}
              onChange={(e) =>
                setEditedGroup((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Enter group title"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={editedGroup.description}
              onChange={(e) =>
                setEditedGroup((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Enter group description"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export { EditGroupSheet };
