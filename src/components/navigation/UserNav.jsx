import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function UserNav({ isCollapsed }) {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <div className={`flex ${isCollapsed ? 'justify-center' : 'items-center gap-4'}`}>
        {!isCollapsed && <Button variant="ghost" onClick={() => navigate("/signin")}>Sign Up</Button>}
        <Button onClick={() => navigate("/signin")} className={isCollapsed ? 'w-8 h-8 p-0' : ''}>
          {isCollapsed ? '→' : 'Sign In'}
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={`relative rounded-full ${isCollapsed ? 'w-8 h-8' : 'w-8 h-8'}`}>
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email} />
            <AvatarFallback>{user.email?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigate("/app/account")}>
          Account Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;