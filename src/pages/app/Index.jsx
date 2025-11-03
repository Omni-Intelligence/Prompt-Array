import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '@/components/layouts';
import { CreatePromptSheet, CreateGroupSheet } from '@/components/modals';

const DecorativeShapes = () => (
  <>
    {/* Large gradient circle in top-right */}
    <div className="gradient-shape gradient-circle w-96 h-96 -top-48 -right-48" />
    
    {/* Blob shape in bottom-left */}
    <div className="gradient-shape gradient-blob w-80 h-80 -bottom-40 -left-40" />
    
    {/* Wave shape in middle-right */}
    <div className="gradient-shape gradient-wave w-64 h-64 top-1/2 -right-32 transform -translate-y-1/2" />
  </>
);

const Index = () => {
  const [isCreatePromptOpen, setIsCreatePromptOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Add mobile detection and handling
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setIsCollapsed(isMobile);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Decorative background shapes */}
      <DecorativeShapes />

      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-20"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar Navigation */}
      <Sidebar isCollapsed={isCollapsed} onCollapsedChange={setIsCollapsed} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>

      <CreatePromptSheet
        isOpen={isCreatePromptOpen}
        onOpenChange={setIsCreatePromptOpen}
      />

      <CreateGroupSheet
        isOpen={isCreateGroupOpen}
        onOpenChange={setIsCreateGroupOpen}
      />
    </div>
  );
};

export default Index;