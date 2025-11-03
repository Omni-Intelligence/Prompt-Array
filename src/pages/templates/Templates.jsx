import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTemplates } from '@/services/prompts';
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, Copy, Search, Sparkles, TrendingUp, Brain, MessageSquare, 
  BarChart, Code, Building, Users, Target, Briefcase, LineChart, 
  PenTool, Lightbulb, Database, BookOpen, Mail, Megaphone, 
  ShieldCheck, Coins, FileText, Settings, Network
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CreatePromptSheet } from '@/components/modals';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const categoryConfig = {
  'Analytics & BI': { icon: BarChart },
  'Development': { icon: Code },
  'Business Strategy': { icon: Target },
  'Communication': { icon: MessageSquare },
  'Project Management': { icon: Settings },
  'Innovation': { icon: Lightbulb },
  'Team Leadership': { icon: Users },
  'AI & ML': { icon: Brain },
  'Marketing': { icon: Megaphone },
  'Sales': { icon: TrendingUp },
  'Finance': { icon: Coins },
  'Data Management': { icon: Database },
  'Research': { icon: BookOpen },
  'Content Creation': { icon: PenTool },
  'Email & Outreach': { icon: Mail },
  'HR & Recruitment': { icon: Briefcase },
  'Risk Management': { icon: ShieldCheck },
  'Documentation': { icon: FileText },
  'Networking': { icon: Network },
  'Operations': { icon: Building },
  'Uncategorized': { icon: Copy }
};

const Templates = () => {
  const navigate = useNavigate();
  const [isCreatePromptOpen, setIsCreatePromptOpen] = React.useState(false);
  const [selectedTemplate, setSelectedTemplate] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const { data: templates = [], isLoading, error } = useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      try {
        const data = await getTemplates();
        return data;
      } catch (err) {
        console.error('Error fetching templates:', err);
        throw err;
      }
    },
  });

  // Group templates by category and get counts
  const categories = React.useMemo(() => {
    const categoryCounts = templates.reduce((acc, template) => {
      const category = template.template_category || 'Uncategorized';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    // Ensure all configured categories are included even if they have no templates
    Object.keys(categoryConfig).forEach(category => {
      if (!categoryCounts[category]) {
        categoryCounts[category] = 0;
      }
    });

    return Object.entries(categoryCounts).map(([category, count]) => ({
      name: category,
      count,
      icon: (categoryConfig[category] || categoryConfig['Uncategorized']).icon
    }));
  }, [templates]);

  // Filter templates based on search and category
  const filteredTemplates = React.useMemo(() => {
    let filtered = templates;
    
    if (searchQuery) {
      filtered = filtered.filter(template => 
        template.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(template => 
        (template.template_category || 'Uncategorized') === selectedCategory
      );
    }
    
    return filtered;
  }, [templates, searchQuery, selectedCategory]);

  const handleUseTemplate = (template) => {
    setSelectedTemplate({
      ...template,
      title: template.title + ' (Copy)',
      is_template: false
    });
    setIsCreatePromptOpen(true);
  };

  if (error) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-semibold">Error loading templates</p>
          <p className="text-sm mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 space-y-8 bg-gradient-to-br from-background via-background to-primary/5 md:ml-0 ml-16">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 blur-3xl -z-10" />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              Templates
            </h1>
          </div>
        </div>

        <div className="mt-8 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-10 w-full max-w-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 focus:border-primary/50 focus:ring-primary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-24 bg-muted rounded-lg"></div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {categories.map(({ name, count, icon: Icon }) => (
              <Card 
                key={name}
                className={`cursor-pointer transition-all duration-200 overflow-hidden relative backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 ${
                  selectedCategory === name 
                    ? 'border-primary shadow-lg scale-[1.02]' 
                    : 'hover:border-primary/50 hover:shadow-md'
                }`}
                onClick={() => setSelectedCategory(name === selectedCategory ? null : name)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5" />
                <CardContent className="p-4 flex items-center space-x-4 relative">
                  <div className={`p-2 rounded-lg bg-gradient-to-br from-primary to-purple-500 text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{name}</h3>
                    <p className="text-sm text-muted-foreground">{count} templates</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <ScrollArea className="h-[calc(100vh-24rem)] rounded-lg border bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTemplates.map((template) => (
                <Card 
                  key={template.id}
                  className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group hover:border-primary/50 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50"
                  onClick={() => handleUseTemplate(template)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {template.title}
                        </CardTitle>
                        <Badge 
                          variant="secondary" 
                          className="mt-2 bg-gradient-to-br from-primary to-purple-500 text-white border-0"
                        >
                          {template.template_category || 'Uncategorized'}
                        </Badge>
                      </div>
                      <Copy className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 group-hover:text-foreground transition-colors">
                      {template.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </>
      )}

      <CreatePromptSheet
        isOpen={isCreatePromptOpen}
        onOpenChange={(open) => {
          setIsCreatePromptOpen(open);
          if (!open) setSelectedTemplate(null);
        }}
        initialData={selectedTemplate}
      />
    </div>
  );
};

export default Templates;