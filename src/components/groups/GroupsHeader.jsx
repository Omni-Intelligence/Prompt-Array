import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, ArrowLeft, FolderPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GroupsHeader = ({ onCreateGroup, onCreateFolder }) => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Groups
          </h1>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="hover:bg-primary/10 hover:text-primary transition-colors"
            onClick={onCreateFolder}
          >
            <FolderPlus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
          <Button 
            className="bg-primary hover:bg-primary/90 transition-colors"
            onClick={onCreateGroup}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Group
          </Button>
        </div>
      </div>

      <div className="mb-6 w-full max-w-md">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search groups..." 
            className="pl-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
          />
        </div>
      </div>
    </>
  );
};

export { GroupsHeader };