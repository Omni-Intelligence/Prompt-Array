import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, ArrowRight, Inbox } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const RegisterSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resendVerificationEmail } = useAuth();
  const [isResending, setIsResending] = useState(false);

  // Get email from location state or localStorage
  const email = location.state?.email || localStorage.getItem('registrationEmail');

  const handleResendVerification = async () => {
    if (!email) {
      // toast.error("Email address not found. Please try signing up again."); // toast is not defined
      console.error("Email address not found. Please try signing up again.");
      return;
    }

    try {
      setIsResending(true);
      await resendVerificationEmail(email);
    } catch (error) {
      console.error('Failed to resend verification:', error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            {/* Decorative Image - visible on desktop */}
            <div className="hidden sm:block mb-4 rounded-lg overflow-hidden h-40 w-full">
              <img 
                src="/new-images/sam.mckay.edna_Circle_of_diverse_professionals_exchanging_glo_bd6b7de5-921d-46f7-89c0-55d8d9333e53_0 (1).png" 
                alt="Team collaboration" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Email Icon */}
            <div className="flex justify-center">
              <div className="bg-brand-blue/10 p-3 rounded-full">
                <Mail className="h-12 w-12 text-brand-blue" />
              </div>
            </div>

            {/* Title and Description */}
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-brand-blue">Check your email</h1>
              <p className="text-base font-light text-slate-600">
                We've sent you a verification link to {email ? <strong className="font-medium">{email}</strong> : 'your email address'}.
                Please click the link to activate your account.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="bg-brand-blue/10 p-2 rounded-full mt-1 flex-shrink-0">
                  <Inbox className="h-4 w-4 text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">1. Check your inbox</h3>
                  <p className="text-sm font-light text-slate-600 mt-1">
                    Open the email from Prompt Array and click the verification link
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-brand-blue/10 p-2 rounded-full mt-1 flex-shrink-0">
                  <ArrowRight className="h-4 w-4 text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">2. Start using Prompt Array</h3>
                  <p className="text-sm font-light text-slate-600 mt-1">
                    After verification, you can sign in and start using all features
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <Button
                className="w-full bg-gradient-to-r from-brand-blue to-brand-pink hover:from-brand-blue/90 hover:to-brand-pink/90 text-white font-semibold text-base py-2.5"
                onClick={() => navigate("/signin")}
              >
                Go to Sign In
              </Button>
              <p className="text-sm text-slate-600 font-light">
                Didn't receive the email?{" "}
                <button 
                  className="text-brand-blue hover:underline disabled:opacity-50 font-medium"
                  onClick={handleResendVerification}
                  disabled={isResending}
                >
                  {isResending ? 'Resending...' : 'Click to resend'}
                </button>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterSuccess;

