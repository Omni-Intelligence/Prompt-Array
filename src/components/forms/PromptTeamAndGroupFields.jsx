import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from '@tanstack/react-query';
import { getGroups } from '@/services/groups';

export const PromptTeamAndGroupFields = ({ newPrompt, setNewPrompt }) => {
  // Fetch real groups from the database
  const { data: groups = [] } = useQuery({
    queryKey: ['groups'],
    queryFn: getGroups
  });

  // Find the current group if one is set
  const currentGroup = groups.find(group => group.id === newPrompt.groupId);

  return (
    <>
      <div className="flex items-center justify-between space-x-2">
        <label htmlFor="public" className="text-sm font-medium">
          Make Public
        </label>
        <Switch
          id="public"
          checked={newPrompt.isPublic}
          onCheckedChange={(checked) => setNewPrompt(prev => ({ ...prev, isPublic: checked }))}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="group" className="text-sm font-medium">
          Add to Group
        </label>
        <Select
          value={newPrompt.groupId}
          onValueChange={(value) => setNewPrompt(prev => ({ ...prev, groupId: value }))}
          defaultValue={newPrompt.groupId}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a group">
              {currentGroup?.name || "Select a group"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No Group</SelectItem>
            {groups.map((group) => (
              <SelectItem key={group.id} value={group.id}>
                {group.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};