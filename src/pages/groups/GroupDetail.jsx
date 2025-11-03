import React, { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ArrowLeft, Plus, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { CreatePromptSheet, EditGroupSheet } from '@/components/modals';
import { getGroupPrompts } from '@/services/groups';
import { useGroupDetails, useGroups } from '@/hooks/groups';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const GroupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { group, isLoading: isLoadingGroup, error: groupError } = useGroupDetails(id);
  const { data: prompts = [], isLoading: isLoadingPrompts } = useQuery({
    queryKey: ['group-prompts', id],
    queryFn: () => getGroupPrompts(id),
    enabled: !!id
  });
  const [isCreatePromptOpen, setIsCreatePromptOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { deleteGroup } = useGroups();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditSheet, setShowEditSheet] = useState(false);

  const handleDelete = () => {
    deleteGroup(group.id);
    setShowDeleteDialog(false);
    navigate('/app/groups');
  };

  if (isLoadingGroup || isLoadingPrompts) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (groupError || !group) {
    return <Navigate to="/app/groups" replace />;
  }

  // Filter prompts based on search query
  const filteredPrompts = prompts.filter(prompt => 
    prompt.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prompt.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-8 bg-gradient-to-br from-background via-background to-primary/5 md:ml-0 ml-16">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/app/groups')}
            className="hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {group.name}
            </h1>
            <p className="text-muted-foreground">{group.description}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setShowEditSheet(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Group
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-destructive focus:text-destructive"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Group
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex justify-between items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <CreatePromptSheet
          isOpen={isCreatePromptOpen}
          onOpenChange={setIsCreatePromptOpen}
          initialData={{ groupId: id }}
          mode="create"
          trigger={
            <Button
              onClick={() => setIsCreatePromptOpen(true)}
              className="bg-primary hover:bg-primary/90 transition-colors"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Prompt
            </Button>
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPrompts.length === 0 ? (
          <div className="col-span-2 text-center py-12">
            <p className="text-muted-foreground">No prompts in this group yet. Create your first prompt to get started!</p>
          </div>
        ) : (
          filteredPrompts.map((prompt) => (
            <Card 
              key={prompt.id} 
              className="card-hover cursor-pointer h-[180px] overflow-hidden backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 hover:border-primary/20"
              onClick={() => navigate(`/app/library/prompt/${prompt.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex flex-col h-full">
                  <div>
                    <h3 className="text-lg font-semibold mb-1 truncate">{prompt.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-3">{prompt.content}</p>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Badge variant="secondary" className="text-xs">
                      Created {new Date(prompt.created_at).toLocaleDateString()}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      v{prompt.version || 1}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the group "{group.name}" and all its prompts.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EditGroupSheet
        group={group}
        onOpenChange={setShowEditSheet}
        trigger={<></>}
      />
    </div>
  );
};

export default GroupDetail;