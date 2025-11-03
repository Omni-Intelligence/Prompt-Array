import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { History, RotateCcw, ArrowLeftRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PromptVersionComparison } from './PromptVersionComparison';

const PromptVersionHistory = ({ versions, currentVersion, onRestoreVersion }) => {
  const [selectedVersions, setSelectedVersions] = React.useState([]);
  const [showComparison, setShowComparison] = React.useState(false);

  const handleVersionSelect = (version) => {
    if (selectedVersions.find(v => v.id === version.id)) {
      setSelectedVersions(selectedVersions.filter(v => v.id !== version.id));
    } else if (selectedVersions.length < 2) {
      setSelectedVersions([...selectedVersions, version]);
    }
  };

  const handleCompare = () => {
    if (selectedVersions.length === 2) {
      setShowComparison(true);
    }
  };

  if (showComparison && selectedVersions.length === 2) {
    return (
      <PromptVersionComparison
        version1={selectedVersions[0]}
        version2={selectedVersions[1]}
        onClose={() => {
          setShowComparison(false);
          setSelectedVersions([]);
        }}
      />
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5" />
              Version History
            </CardTitle>
            <CardDescription>
              View and restore previous versions of this prompt
            </CardDescription>
          </div>
          {selectedVersions.length === 2 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCompare}
              className="gap-2"
            >
              <ArrowLeftRight className="w-4 h-4" />
              Compare Selected
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {versions.map((version, index) => (
              <div
                key={version.id}
                className={`p-4 rounded-lg border ${
                  version.version === currentVersion
                    ? 'bg-primary/10 border-primary'
                    : selectedVersions.find(v => v.id === version.id)
                    ? 'bg-secondary/20 border-secondary'
                    : 'bg-background border-border'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!!selectedVersions.find(v => v.id === version.id)}
                      onChange={() => handleVersionSelect(version)}
                      disabled={
                        selectedVersions.length === 2 &&
                        !selectedVersions.find(v => v.id === version.id)
                      }
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <div>
                      <h4 className="font-medium">Version {version.version}</h4>
                      <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(version.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  {version.version !== currentVersion && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRestoreVersion(version)}
                      className="gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Restore
                    </Button>
                  )}
                </div>
                {version.changeDescription && (
                  <p className="text-sm text-muted-foreground mb-2">
                    {version.changeDescription}
                  </p>
                )}
                <div className="text-sm bg-muted p-2 rounded">
                  <pre className="whitespace-pre-wrap font-mono">{version.content}</pre>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export { PromptVersionHistory };