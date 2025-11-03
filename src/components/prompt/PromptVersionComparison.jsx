import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PromptVersionComparison = ({ version1, version2, onClose }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5" />
          Version Comparison
        </CardTitle>
        <CardDescription>
          Comparing version {version1.version} with version {version2.version}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="font-medium">Version {version1.version}</div>
            <div className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(version1.createdAt), { addSuffix: true })}
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="whitespace-pre-wrap font-mono text-sm">{version1.content}</pre>
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-medium">Version {version2.version}</div>
            <div className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(version2.createdAt), { addSuffix: true })}
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="whitespace-pre-wrap font-mono text-sm">{version2.content}</pre>
            </div>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="mt-4 w-full"
          onClick={onClose}
        >
          Close Comparison
        </Button>
      </CardContent>
    </Card>
  );
};

export { PromptVersionComparison };