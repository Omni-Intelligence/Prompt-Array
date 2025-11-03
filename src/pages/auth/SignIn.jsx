import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/app';
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isSignUp) {
        await signUp(formData.email, formData.password, undefined);
        navigate(redirectPath);
      } else {
        await signIn(formData.email, formData.password);
        navigate(redirectPath);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Animated Background */}
      <div className="hidden lg:block lg:w-[60%] relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900" />
        <div className="absolute inset-0">
          <img 
            src="/new-images/sam.mckay.edna_Network_of_nodes_connected_by_glowing_lines_ea_1fa62e10-cb69-40e5-bb59-618e8919caf8_1.png" 
            alt="Interactive Prompt Network" 
            className="w-full h-full object-cover"
            style={{
              transform: 'scale(1.1)',
              animation: 'float 20s ease-in-out infinite'
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
      </div>

      {/* Right side - Sign in form */}
      <div className="flex-1 flex flex-col justify-center items-center p-4 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-brand-blue">
              Prompt Array
            </h1>
            <p className="mt-3 text-base font-light text-slate-600">Welcome back to your prompt workspace</p>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-semibold text-brand-blue">Sign in</CardTitle>
              <CardDescription className="text-sm font-light text-slate-600">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-900">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="m@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required 
                    className="border-slate-200 focus:border-brand-blue focus:ring-brand-blue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-900">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password" 
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required 
                    className="border-slate-200 focus:border-brand-blue focus:ring-brand-blue"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Button
                    variant="link"
                    className="text-sm text-brand-blue hover:text-brand-blue/80 p-0 h-auto font-medium"
                    onClick={() => navigate('/reset-password')}
                    type="button"
                  >
                    Forgot password?
                  </Button>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-brand-blue to-brand-pink hover:from-brand-blue/90 hover:to-brand-pink/90 text-white font-semibold text-base py-2.5" disabled={loading}>
                  {loading ? "Loading..." : "Sign In"}
                </Button>

                <div className="text-center text-sm text-slate-600 pt-2">
                  Don't have an account?{" "}
                  <Button
                    variant="link"
                    className="text-sm text-brand-blue hover:text-brand-blue/80 p-0 h-auto font-medium"
                    onClick={() => navigate('/signup')}
                    type="button"
                  >
                    Sign up
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: scale(1.1) rotate(0deg); }
          50% { transform: scale(1.15) rotate(1deg); }
        }
      `}</style>
    </div>
  );
};

export default SignIn;

