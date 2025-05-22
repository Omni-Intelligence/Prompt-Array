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
            src="/images/signin-cosmos.svg" 
            alt="Interactive Prompt Cosmos" 
            className="w-full h-full"
            style={{
              transform: 'scale(1.1)',
              animation: 'float 20s ease-in-out infinite'
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
      </div>

      {/* Right side - Sign in form */}
      <div className="flex-1 flex flex-col justify-center items-center p-4 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Prompt Array
            </h1>
            <p className="mt-2 text-gray-600">Welcome back to your prompt workspace</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Sign in</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="m@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password" 
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    variant="link"
                    className="text-primary hover:text-primary/80 p-0"
                    onClick={() => navigate('/reset-password')}
                    type="button"
                  >
                    Forgot password?
                  </Button>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90" disabled={loading}>
                  {loading ? "Loading..." : "Sign In"}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Button
                    variant="link"
                    className="text-primary hover:text-primary/80 p-0"
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