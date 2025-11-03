import React from 'react';
import { useGroups } from '@/hooks/groups';
import { usePromptLimits } from '@/hooks/billing';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { GroupCard } from '@/components/groups';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateGroupSheet } from '@/components/modals';

const Groups = () => {
  const navigate = useNavigate();
  const { groups, isLoading } = useGroups();
  const { promptCount, promptLimit, isSubscribed } = usePromptLimits();
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-muted-foreground">Loading groups...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 md:p-8 md:ml-0 ml-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Groups
            </h1>
          </div>
        </div>
        <CreateGroupSheet
          isOpen={isCreateGroupOpen}
          onOpenChange={setIsCreateGroupOpen}
          trigger={
            <Button
              className="bg-primary hover:bg-primary/90 transition-colors"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Group
            </Button>
          }
        />
      </div>

      {groups.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No groups yet. Create your first group to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Groups;