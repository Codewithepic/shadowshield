import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Bell, User, Menu, X, Settings, FileText, MessageSquare, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
  isAuthenticated?: boolean;
  activePath?: string;
}

const Navbar = ({
  userName = "Agent Smith",
  userAvatar = "",
  notificationCount = 3,
  isAuthenticated = true,
  activePath = "/",
}: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <Shield size={16} /> },
    { path: "/files", label: "Files", icon: <FileText size={16} /> },
    { path: "/messages", label: "Messages", icon: <MessageSquare size={16} /> },
    { path: "/security-log", label: "Security Log", icon: <ShieldAlert size={16} /> },
    { path: "/settings", label: "Settings", icon: <Settings size={16} /> },
  ];

  const handleLogout = () => {
    // Implement logout functionality here
    navigate('/');
  };

  return (
    <nav className="w-full h-16 sm:h-20 bg-gray-900 border-b border-gray-800 px-2 sm:px-4 md:px-6 flex items-center justify-between fixed top-0 z-50">
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500" />
          <span className="text-lg sm:text-xl font-bold text-white hidden sm:inline-block">
            ShadowShield
          </span>
        </Link>
      </div>

      {/* Mobile menu button */}
      <button
        className="lg:hidden text-gray-300 hover:text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-4 xl:gap-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "text-sm xl:text-base text-gray-300 hover:text-white transition-colors flex items-center gap-2",
              activePath === item.path && "text-emerald-500 font-medium"
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </div>

      {/* User Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {isAuthenticated ? (
          <>
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white h-8 w-8 sm:h-10 sm:w-10"
                onClick={() => navigate('/notifications')}
              >
                <Bell size={18} />
                {notificationCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 bg-red-500 text-xs"
                    variant="destructive"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                >
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border border-gray-700">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback className="bg-gray-800 text-emerald-500 text-xs sm:text-sm">
                      {userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userName}
                    </p>
                    <p className="text-xs leading-none text-gray-500">
                      agent@shadowshield.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  Security Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/security-log')}>
                  Access Logs
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-500"
                  onClick={handleLogout}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-3 py-1 h-8 sm:h-10"
            onClick={() => navigate('/login')}
          >
            Secure Login
          </Button>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 sm:top-20 left-0 right-0 bg-gray-900 border-b border-gray-800 lg:hidden shadow-lg">
          <div className="flex flex-col p-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-gray-300 hover:text-white transition-colors py-2 flex items-center gap-2",
                  activePath === item.path && "text-emerald-500 font-medium"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
