import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from "sonner";

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('AuthProvider: Initializing');
    let mounted = true;

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }

        console.log('AuthProvider: Got initial session:', session);
        if (mounted) {
          setUser(session?.user ?? null);
          setLoading(false);
        }
      } catch (error) {
        console.error('AuthProvider: Error getting session:', error);
        if (mounted) {
          setError(error.message);
          setLoading(false);
          toast.error('Authentication Error: ' + error.message);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('AuthProvider: Auth state changed:', { event: _event, session });
      if (mounted) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('Sign in failed: ' + error.message);
      throw error;
    }
  };

  const DRIP_FUNCTION_URL = import.meta.env.VITE_DRIP_FUNCTION_URL

  const signUp = async (email, password, fullName) => {
    try {
      console.log('Starting sign-up process for:', email);
      
      // Check if user already exists
      const { data: existingUser } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (existingUser?.user) {
        console.log('User already exists:', existingUser);
        throw new Error('This email is already registered. Please sign in instead.');
      }

      // Proceed with sign up
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: fullName,
            email_confirm: false
          }
        }
      });

      console.log('Sign-up response:', { data, error });

      if (error) {
        console.error('Sign-up error:', error);
        throw error;
      }

      if (!data.user) {
        console.error('No user data returned');
        throw new Error('Failed to create user account');
      }

      if (DRIP_FUNCTION_URL) {
        try {
          await fetch(
            DRIP_FUNCTION_URL,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email,
                name: fullName,
                sourceApp: 'Prompt Array'
              })
            }
          )
        } catch (syncError) {
          console.error('Drip sync error:', syncError)
        }
      }

      // Check if email confirmation is required
      if (!data.user.email_confirmed_at) {
        console.log('Email confirmation required');
        toast.success('Sign up successful! Please check your email for verification.');
        return { data, requiresEmailConfirmation: true };
      } else {
        console.log('Email already confirmed');
        toast.success('Sign up successful! You can now sign in.');
        return { data, requiresEmailConfirmation: false };
      }
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error('Sign up failed: ' + error.message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Sign out failed: ' + error.message);
      throw error;
    }
  };

  const resendVerificationEmail = async (email) => {
    try {
      console.log('Resending verification email to:', email);
      const { data, error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error('Error resending verification:', error);
        throw error;
      }

      console.log('Verification email resent successfully:', data);
      toast.success('Verification email has been resent. Please check your inbox.');
      return data;
    } catch (error) {
      console.error('Failed to resend verification:', error);
      toast.error(error.message);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resendVerificationEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {error ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="p-4 text-red-500">
            Authentication Error: {error}
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};