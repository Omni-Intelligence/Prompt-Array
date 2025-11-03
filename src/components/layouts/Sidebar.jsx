import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MessageSquareIcon, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { getNavItems } from '../../nav-items';
import { UserNav } from '@/components/navigation';
import { Logo } from '@/components/home/Logo';

export const Sidebar = ({ isCollapsed, onCollapsedChange }) => {
  const location = useLocation();

  return (
    <aside className={`${
      isCollapsed ? 'w-16' : 'w-64'
    } transition-all duration-300 border-r border-gray-200/50 dark:border-gray-800/50 md:backdrop-blur-sm md:bg-white/50 md:dark:bg-gray-900/50 bg-white dark:bg-gray-900 fixed md:relative z-30 h-full`}>
      <div className="flex flex-col h-full">
        <div className="p-4 flex-1">
          <div className="flex items-center justify-between mb-6">
            {!isCollapsed && (
              <Logo size="small" showSubtitle={true} />
            )}
            {isCollapsed && (
              <div className="flex items-center justify-center w-full">
                <span className="text-brand font-bold text-lg">P</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCollapsedChange(!isCollapsed)}
              className="p-1 md:hover:bg-gray-100 dark:md:hover:bg-gray-800"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
          <nav className="space-y-2">
            {getNavItems()
              .filter(item => {
                // Include all items except external ones, feedback, and Why Free
                const isExternal = item.external && item.to.includes('loom.com');
                const isFeedback = item.to.includes('feedback');
                const isWhyFree = item.title === 'Why Free?';
                return !isExternal && !isFeedback && !isWhyFree;
              })
              .map((item) => {
                const isActive = location.pathname === `/app/${item.to}`;
                let Component = item.disabled ? 'div' : Link;
                let componentProps = item.disabled ? {} : { 
                  to: item.to.startsWith('/') ? item.to : `/app/${item.to}`
                };

                return (
                  <Component 
                    key={item.to}
                    {...componentProps}
                    className={`group w-full ${item.disabled ? 'cursor-not-allowed' : ''}`}
                  >
                    <Button 
                      variant="ghost" 
                      className={`w-full group relative overflow-hidden transition-all duration-300
                        ${isActive 
                          ? 'bg-primary/10 text-primary hover:bg-primary/15 dark:bg-primary/20 dark:hover:bg-primary/25' 
                          : 'hover:bg-primary/5 dark:hover:bg-primary/10'}
                        ${item.disabled ? 'opacity-80' : ''}
                        ${isCollapsed ? 'px-0 justify-center' : 'justify-start'}`}
                      disabled={item.disabled}
                    >
                      <span className={`relative z-10 flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
                        <span className={`${isActive ? 'text-primary' : ''} ${isCollapsed ? 'mr-0' : 'mr-3'}`}>
                          {item.icon}
                        </span>
                        {!isCollapsed && <span className="font-medium text-gray-700 dark:text-gray-200">{item.title}</span>}
                      </span>
                    </Button>
                  </Component>
                );
              })}
          </nav>
        </div>
        
        {/* Bottom Links */}
        <div className="mt-auto space-y-2 p-4">
          <Button
            variant="ghost"
            className={`w-full bg-violet-100 hover:bg-violet-200 dark:bg-violet-900/20 dark:hover:bg-violet-900/30 text-violet-700 dark:text-violet-300 ${isCollapsed ? 'px-0 justify-center' : ''}`}
            onClick={() => window.open('https://www.loom.com/share/952fd364c4c945ce8b6218b1cefd9915', '_blank')}
          >
            <Sparkles className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">Tutorial</span>}
          </Button>
        </div>
        <div className="p-4 border-t border-gray-200/50 dark:border-gray-800/50">
          <UserNav isCollapsed={isCollapsed} />
        </div>
      </div>
    </aside>
  );
};
