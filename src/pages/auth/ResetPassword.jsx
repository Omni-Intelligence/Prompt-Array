import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ResetPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    try {
      // TODO: Implement password reset logic
      toast.success("Password reset instructions sent to your email");
      navigate('/signin');
    } catch (error) {
      toast.error("Failed to send reset instructions. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Animated Background */}
      <div className="hidden lg:block lg:w-[60%] relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900" />
        <div className="absolute inset-0">
          <img 
            src="/new-images/sam.mckay.edna_Abstract_explosion_of_light_beams_turning_into_ae0bc824-7571-4682-8f82-3f6faa6c1865_0.png" 
            alt="Interactive Prompt Cosmos" 
            className="w-full h-full object-cover"
            style={{
              transform: 'scale(1.1)',
              animation: 'float 20s ease-in-out infinite'
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
      </div>

      {/* Right side - Reset Password form */}
      <div className="flex-1 flex flex-col justify-center items-center p-4 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-brand-blue">
              Reset Password
            </h1>
            <p className="mt-3 text-base font-light text-slate-600">Enter your email to receive reset instructions</p>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-semibold text-brand-blue">Password Reset</CardTitle>
              <CardDescription className="text-sm font-light text-slate-600">
                We'll send you instructions to reset your password
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
                    required 
                    className="border-slate-200 focus:border-brand-blue focus:ring-brand-blue"
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-brand-blue to-brand-pink hover:from-brand-blue/90 hover:to-brand-pink/90 text-white font-semibold text-base py-2.5">
                  Send Reset Instructions
                </Button>

                <div className="text-center text-sm text-slate-600 pt-2">
                  Remember your password?{" "}
                  <Button
                    variant="link"
                    className="text-sm text-brand-blue hover:text-brand-blue/80 p-0 h-auto font-medium"
                    onClick={() => navigate('/signin')}
                    type="button"
                  >
                    Sign in
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

export default ResetPassword;
