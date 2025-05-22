import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fullNameInput = e.target.querySelector('#fullName');
      const emailInput = e.target.querySelector('#email');
      const passwordInput = e.target.querySelector('#password');
      const confirmPasswordInput = e.target.querySelector('#confirmPassword');

      const fullName = fullNameInput?.value;
      const email = emailInput?.value;
      const password = passwordInput?.value;
      const confirmPassword = confirmPasswordInput?.value;

      if (!email || !password) {
        toast.error("Please fill in all required fields");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      console.log('Starting registration for:', email);
      const { data, requiresEmailConfirmation } = await signUp(email, password, fullName);
      
      if (requiresEmailConfirmation) {
        // Store email for resend functionality
        localStorage.setItem('registrationEmail', email);
        navigate('/register-success', { state: { email } });
      } else {
        navigate('/app');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-[60%] relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900" />
        <div className="absolute inset-0">
          <img 
            src="/images/immersive-prompt-flow.svg" 
            alt="Immersive Prompt Array Visualization" 
            className="w-full h-full"
            style={{
              transform: 'scale(1.1)',
              animation: 'subtle-scale 20s ease-in-out infinite'
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
      </div>

      <style jsx>{`
        @keyframes subtle-scale {
          0%, 100% { transform: scale(1.1); }
          50% { transform: scale(1.15); }
        }
      `}</style>

      {/* Right side - Sign up form */}
      <div className="flex-1 flex flex-col justify-center items-center p-4 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Prompt Array
            </h1>
            <p className="mt-2 text-gray-600">Create your account to get started</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Sign up</CardTitle>
              <CardDescription>
                Enter your details to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    type="text" 
                    placeholder="Enter your full name" 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="m@example.com" 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    placeholder="Create a password" 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    type="password" 
                    placeholder="Confirm your password" 
                    required 
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <label 
                    htmlFor="terms" 
                    className="text-sm text-gray-600"
                  >
                    I agree to the{" "}
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90">
                  Create Account
                </Button>

                <div className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Button
                    variant="link"
                    className="text-primary hover:text-primary/80 p-0"
                    onClick={() => navigate('/signin')}
                  >
                    Sign in
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;