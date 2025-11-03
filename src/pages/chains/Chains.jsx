import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Workflow } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useChains } from "@/hooks/chains";

const Chains = () => {
  const navigate = useNavigate();
  const { data: chains, isLoading } = useChains();

  const handleCreateChain = () => {
    navigate('/app/chains/create');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 md:ml-0 ml-16">
      <div className="p-8 space-y-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/app')}
            className="hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
              Prompt Chains
            </h1>
            <p className="text-muted-foreground">Create and manage prompt sequences</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card 
            onClick={handleCreateChain}
            className="bg-gradient-to-br from-violet-600 to-purple-700 backdrop-blur-sm border-violet-400/20 hover:shadow-lg transition-all duration-300 hover:shadow-violet-500/20 hover:scale-[1.02] cursor-pointer"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Plus className="h-5 w-5 text-violet-200" />
                Create New Chain
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-violet-200 mb-4">
                Create a sequence of prompts to streamline your workflow
              </p>
              <Button className="w-full bg-white hover:bg-violet-100 text-violet-700 transition-colors border-0">
                Get Started
              </Button>
            </CardContent>
          </Card>

          {isLoading ? (
            <div className="col-span-2 lg:col-span-3 text-center py-8 text-muted-foreground">
              Loading chains...
            </div>
          ) : chains?.length === 0 ? (
            <div className="col-span-2 lg:col-span-3 text-center py-8 text-muted-foreground">
              No chains yet. Create your first chain to get started!
            </div>
          ) : (
            chains?.map((chain) => (
              <Card 
                key={chain.id}
                onClick={() => navigate(`/app/chains/${chain.id}`)}
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 hover:border-primary/20 hover:scale-[1.02] cursor-pointer"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Workflow className="h-5 w-5 text-primary" />
                    {chain.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-muted-foreground">{chain.prompts?.length || 0} prompts</span>
                    <span className="text-sm text-muted-foreground">
                      Last updated {new Date(chain.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                  <Button variant="outline" className="w-full hover:bg-primary/10 hover:text-primary transition-colors">
                    View Chain
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Chains;