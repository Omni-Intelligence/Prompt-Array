import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { QuickAccessGroups, PromptsList } from '@/components/dashboard';
import { CreatePromptSheet, CreateGroupSheet } from '@/components/modals';
import { useGroups } from '@/hooks/groups';

const DashboardShapes = () => (
  <>
    {/* Decorative shapes specific to dashboard */}
    <div className="gradient-shape gradient-blob w-72 h-72 top-20 right-[10%] opacity-10" />
    <div className="gradient-shape gradient-wave w-64 h-64 bottom-32 left-[15%] opacity-10" />
    <div className="gradient-shape gradient-circle w-56 h-56 top-[40%] right-[20%] opacity-10" />
  </>
);

const Dashboard = () => {
  const [isCreatePromptOpen, setIsCreatePromptOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const navigate = useNavigate();
  const { groups, isLoading: isLoadingGroups } = useGroups();
  const canCreatePrompt = true; // Always allow prompt creation

  const handleNewPromptClick = () => {
    setIsCreatePromptOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50/50 to-purple-100/50 dark:from-gray-900/50 dark:to-gray-800/50">
      <DashboardShapes />
      <div className="p-6 md:p-6 space-y-8 relative z-10 md:ml-0 ml-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
          </div>
          <div className="flex gap-2">
            <CreateGroupSheet
              trigger={
                <Button
                  variant="outline"
                  className="hover:bg-primary/10 hover:text-primary transition-colors backdrop-blur-sm bg-white/50"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Group
                </Button>
              }
            />
            <Button
              onClick={handleNewPromptClick}
              className="bg-primary hover:bg-primary/90 transition-colors"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Prompt
            </Button>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-xl md:text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Quick Access Groups
          </h2>
          {isLoadingGroups ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <QuickAccessGroups groups={groups} />
          )}
        </section>

        <PromptsList 
          onPromptClick={(prompt) => {
            setSelectedPrompt(prompt);
            navigate(`/app/prompts/${prompt.id}`);
          }} 
        />

        <CreatePromptSheet
          isOpen={isCreatePromptOpen}
          onOpenChange={setIsCreatePromptOpen}
          initialData={selectedPrompt}
        />
      </div>
    </div>
  );
};

export default Dashboard;