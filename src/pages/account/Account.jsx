import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { AvatarSelector } from "@/components/account";
import { queryClient } from '@/lib/react-query';

const Account = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: user?.user_metadata?.full_name || "",
    avatar_url: user?.user_metadata?.avatar_url || "",
    company: user?.user_metadata?.company || "",
    notifications: {
      email: true,
      marketing: false
    }
  });
  
  useEffect(() => {
    if (user?.user_metadata) {
      setProfile(prev => ({
        ...prev,
        ...user.user_metadata,
        notifications: user.user_metadata.notifications || {
          email: true,
          marketing: false
        }
      }));
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validate avatar URL
      if (profile.avatar_url && !profile.avatar_url.match(/^https?:\/\/.+/)) {
        throw new Error("Invalid avatar URL format. Must start with http:// or https://");
      }

      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: profile.full_name,
          avatar_url: profile.avatar_url,
          company: profile.company,
          notifications: profile.notifications
        }
      });

      if (error) throw error;
      toast.success("Account settings saved successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const currentPassword = form.current.value;
    const newPassword = form.new.value;
    const confirmPassword = form.confirm.value;

    // Password validation
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (!/[A-Z]/.test(newPassword)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    }

    if (!/[0-9]/.test(newPassword)) {
      toast.error("Password must contain at least one number");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    setLoading(true);
    try {
      // First verify current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword
      });

      if (signInError) {
        toast.error("Current password is incorrect");
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      toast.success("Password updated successfully!");
      form.reset();
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.rpc('delete_user_account');
      if (error) throw error;
      
      await signOut();
      navigate('/');
      toast.success("Account deleted successfully");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 md:ml-0 ml-16">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/app")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    value={user?.email || ""} 
                    disabled 
                    className="bg-gray-50"
                  />
                </div>
                
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={profile.full_name}
                    onChange={e => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input 
                    id="company" 
                    value={profile.company}
                    onChange={e => setProfile(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Enter your company name"
                  />
                </div>

                <div>
                  <Label>Profile Picture</Label>
                  <div className="flex items-center space-x-4">
                    <AvatarSelector
                      currentAvatar={profile.avatar_url}
                      onAvatarChange={(url) => setProfile(prev => ({ ...prev, avatar_url: url }))}
                    >
                      <Button variant="outline" type="button">
                        Change Avatar
                      </Button>
                    </AvatarSelector>
                    {profile.avatar_url && (
                      <img 
                        src={profile.avatar_url} 
                        alt="Current avatar" 
                        className="h-12 w-12 rounded-full"
                      />
                    )}
                  </div>
                </div>
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive notifications about your prompts and groups
                  </div>
                </div>
                <Switch
                  checked={profile.notifications.email}
                  onCheckedChange={checked => 
                    setProfile(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, email: checked }
                    }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Emails</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive updates about new features and promotions
                  </div>
                </div>
                <Switch
                  checked={profile.notifications.marketing}
                  onCheckedChange={checked => 
                    setProfile(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, marketing: checked }
                    }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Password Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div>
                <Label htmlFor="current">Current Password</Label>
                <Input id="current" type="password" required />
              </div>
              
              <div>
                <Label htmlFor="new">New Password</Label>
                <Input id="new" type="password" required />
              </div>
              
              <div>
                <Label htmlFor="confirm">Confirm New Password</Label>
                <Input id="confirm" type="password" required />
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button 
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Account"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Account;