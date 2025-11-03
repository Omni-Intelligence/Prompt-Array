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
            src="/new-images/sam.mckay.edna_Abstract_streams_of_glowing_lines_flowing_into_0943014d-588f-4ae4-bf32-7e8902c72d77_0.png" 
            alt="Immersive Prompt Array Visualization" 
            className="w-full h-full object-cover"
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
      <div className="flex-1 flex flex-col justify-center items-center p-4 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-brand-blue">
              Prompt Array
            </h1>
            <p className="mt-3 text-base font-light text-slate-600">Create your account to get started</p>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-semibold text-brand-blue">Sign up</CardTitle>
              <CardDescription className="text-sm font-light text-slate-600">
                Enter your details to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-slate-900">Full Name</Label>
                  <Input 
                    id="fullName" 
                    type="text" 
                    placeholder="Enter your full name" 
                    required 
                    className="border-slate-200 focus:border-brand-blue focus:ring-brand-blue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-900">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="m@example.com" 
                    required 
                    className="border-slate-200 focus:border-brand-blue focus:ring-brand-blue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-900">Password</Label>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    placeholder="Create a password" 
                    required 
                    className="border-slate-200 focus:border-brand-blue focus:ring-brand-blue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-900">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    type="password" 
                    placeholder="Confirm your password" 
                    required 
                    className="border-slate-200 focus:border-brand-blue focus:ring-brand-blue"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <label 
                    htmlFor="terms" 
                    className="text-sm font-light text-slate-700"
                  >
                    I agree to the{" "}
                    <a href="#" className="text-brand-blue hover:underline font-medium">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-brand-blue hover:underline font-medium">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-brand-blue to-brand-pink hover:from-brand-blue/90 hover:to-brand-pink/90 text-white font-semibold text-base py-2.5">
                  Create Account
                </Button>

                <div className="text-center text-sm text-slate-600 pt-2">
                  Already have an account?{" "}
                  <Button
                    variant="link"
                    className="text-sm text-brand-blue hover:text-brand-blue/80 p-0 h-auto font-medium"
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

