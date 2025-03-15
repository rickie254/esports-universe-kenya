
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Trophy, 
  Users, 
  Newspaper, 
  LogOut, 
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const SidebarItem = ({ icon, label, active, onClick }: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 w-full px-4 py-3 text-left rounded-lg transition-colors",
      active 
        ? "bg-accent text-accent-foreground font-medium" 
        : "hover:bg-accent/50 text-white/80 hover:text-white"
    )}
  >
    <div className="w-5 h-5">{icon}</div>
    <span>{label}</span>
  </button>
);

const AdminSidebar = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("universities");
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };
  
  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  const items = [
    {
      id: "universities",
      label: "Universities",
      icon: <Trophy className="w-5 h-5" />,
    },
    {
      id: "league-table",
      label: "League Table",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      id: "players",
      label: "Players",
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: "local-news",
      label: "Local News",
      icon: <Newspaper className="w-5 h-5" />,
    },
    {
      id: "global-news",
      label: "Global News", 
      icon: <Newspaper className="w-5 h-5" />,
    },
  ];
  
  return (
    <div className={cn(
      "min-h-screen flex flex-col bg-black/40 backdrop-blur-lg transition-all duration-300 border-r border-white/10",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {!isCollapsed && <h2 className="text-white font-bold text-lg">Admin Panel</h2>}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="text-white hover:bg-white/10"
        >
          {isCollapsed ? <Menu /> : <X />}
        </Button>
      </div>
      
      {/* Navigation Items */}
      <div className="flex-1 py-4 px-2 flex flex-col gap-1">
        {items.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={isCollapsed ? "" : item.label}
            active={activeTab === item.id}
            onClick={() => setActiveTab(item.id)}
          />
        ))}
      </div>
      
      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/10">
        <Button 
          variant="ghost" 
          className={cn(
            "flex items-center gap-3 w-full justify-start text-white/80 hover:text-white hover:bg-destructive/20",
            isCollapsed && "justify-center"
          )}
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
