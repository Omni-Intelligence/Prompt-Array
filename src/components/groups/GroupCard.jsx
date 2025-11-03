import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { getGroupPrompts } from '@/services/groups';
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
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
import { useGroups } from '@/hooks/groups';
import { EditGroupSheet } from '@/components/modals';

const GroupCard = ({ group }) => {
  const navigate = useNavigate();
  const { data: prompts = [], refetch } = useQuery({
    queryKey: ['group-prompts', group.id],
    queryFn: () => getGroupPrompts(group.id),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });
  const { deleteGroup } = useGroups();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditSheet, setShowEditSheet] = useState(false);
  
  const handleCardClick = (e) => {
    if (e.target.closest('[data-menu]') || e.target.closest('[role="menuitem"]')) {
      e.stopPropagation();
      return;
    }
    navigate(`/app/groups/${group.id}`);
  };

  const handleDelete = async () => {
    try {
      await deleteGroup(group.id);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Failed to delete group:', error);
    }
  };

  return (
    <>
      <Card
        onClick={handleCardClick}
        className="cursor-pointer transition-all duration-300 hover:shadow-lg bg-gradient-card hover:bg-gradient-card-hover p-2 md:p-4"
      >
        <CardHeader className="pb-2 md:pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base md:text-lg text-white">
              {group.name}
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild data-menu>
                <Button variant="ghost" className="h-8 w-8 p-0 text-white/80 hover:text-white">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white/10 backdrop-blur-sm border-white/20">
                <DropdownMenuItem onClick={() => setShowEditSheet(true)} className="text-white/80 hover:text-white">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-300 hover:text-red-400"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-white/80">{group.description}</p>
          <div className="mt-4">
            <p className="text-sm text-white/60">
              {prompts.length} {prompts.length === 1 ? 'prompt' : 'prompts'}
            </p>
          </div>
        </CardContent>
      </Card>

      <EditGroupSheet
        isOpen={showEditSheet}
        onOpenChange={setShowEditSheet}
        group={group}
      />

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
    </>
  );
};

export { GroupCard };