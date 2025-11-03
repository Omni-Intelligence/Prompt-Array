import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";

const QuickAccessGroup = ({ group }) => (
  <Link 
    to={`/app/groups/${group.id}`}
    className="group"
  >
    <Card className="bg-gradient-card hover:bg-gradient-card-hover backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-1 text-white dark:text-white">{group.name}</h3>
        <p className="text-sm text-white/80 dark:text-white/80">{group.count} prompts</p>
      </CardContent>
    </Card>
  </Link>
);

const QuickAccessGroups = ({ groups }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {groups.map((group) => (
        <QuickAccessGroup key={group.id} group={group} />
      ))}
    </div>
  );
};

export { QuickAccessGroups };