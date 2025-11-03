import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AvatarSelector({ currentAvatar, onAvatarChange, children }) {
  const [open, setOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);

  const avatarCategories = {
    'Human': [
      'adventurer',
      'adventurer-neutral',
      'avataaars',
      'big-ears',
      'big-ears-neutral',
      'big-smile',
      'personas',
      'pixel-art',
      'pixel-art-neutral'
    ],
    'Artistic': [
      'lorelei',
      'lorelei-neutral',
      'micah',
      'miniavs',
      'open-peeps',
      'croodles',
      'croodles-neutral'
    ],
    'Fun': [
      'bottts',
      'fun-emoji',
      'icons',
      'identicon'
    ],
    'Abstract': [
      'initials',
      'shapes',
      'beam',
      'pixels',
      'geometric',
      'bauhaus',
      'thumbs'
    ]
  };

  const seeds = [
    'felix',
    'aneka',
    'jasper',
    'luna',
    'nova',
    'atlas',
    'sage',
    'zephyr'
  ];

  const getAvatarUrl = (style, seed) => {
    // These styles need version 7.x
    const v7Styles = ['initials', 'shapes', 'beam', 'pixels', 'geometric', 'bauhaus', 'thumbs'];
    const version = v7Styles.includes(style) ? '7.x' : '6.x';
    return `https://api.dicebear.com/${version}/${style}/svg?seed=${seed}`;
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    onAvatarChange(avatar);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Choose your avatar</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="Human" className="w-full">
          <TabsList className="w-full mb-4">
            {Object.keys(avatarCategories).map((category) => (
              <TabsTrigger key={category} value={category} className="flex-1">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(avatarCategories).map(([category, styles]) => (
            <TabsContent key={category} value={category}>
              <ScrollArea className="h-[400px] pr-4">
                <div className="grid grid-cols-3 gap-4 p-1">
                  {styles.map((style) =>
                    seeds.map((seed) => {
                      const avatarUrl = getAvatarUrl(style, seed);
                      return (
                        <div
                          key={`${style}-${seed}`}
                          className={cn(
                            "cursor-pointer rounded-lg p-2 hover:bg-accent transition-colors",
                            selectedAvatar === avatarUrl && "bg-accent"
                          )}
                          onClick={() => handleAvatarSelect(avatarUrl)}
                        >
                          <img
                            src={avatarUrl}
                            alt={`${style} avatar`}
                            className="h-16 w-16 rounded-lg mx-auto"
                          />
                          <p className="text-xs text-center mt-1 text-muted-foreground">
                            {style}
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>

        <DialogFooter className="mt-4">
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
