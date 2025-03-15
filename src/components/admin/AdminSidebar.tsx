
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Trophy, 
  Users, 
  Newspaper, 
  LogOut, 
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
    {active && <ChevronRight className="w-4 h-4 ml-auto" />}
  </button>
);

const AdminSidebar = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("universities");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };
  
  // Toggle sidebar collapse (only for desktop)
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Handle item click for mobile view
  const handleItemClick = (id: string) => {
    setActiveTab(id);
    // Close the sheet after selecting an item on mobile
    if (isMobile) {
      setIsSheetOpen(false);
    }
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

  // Sidebar content for both mobile and desktop
  const SidebarContent = () => (
    <>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {(!isCollapsed || isMobile) && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <span className="font-bold text-sm text-white">EU</span>
            </div>
            <h2 className="text-white font-bold text-lg">Admin</h2>
          </div>
        )}
        {!isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="text-white hover:bg-white/10"
          >
            {isCollapsed ? <Menu /> : <X />}
          </Button>
        )}
      </div>
      
      {/* Navigation Items */}
      <div className="flex-1 py-4 px-2 flex flex-col gap-1 overflow-y-auto">
        {items.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={(isCollapsed && !isMobile) ? "" : item.label}
            active={activeTab === item.id}
            onClick={() => handleItemClick(item.id)}
          />
        ))}
      </div>
      
      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/10">
        <Button 
          variant="ghost" 
          className={cn(
            "flex items-center gap-3 w-full justify-start text-white/80 hover:text-white hover:bg-destructive/20",
            (isCollapsed && !isMobile) && "justify-center"
          )}
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          {(!isCollapsed || isMobile) && <span>Logout</span>}
        </Button>
      </div>
    </>
  );
  
  // Return different sidebar versions for mobile and desktop
  if (isMobile) {
    return (
      <div className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-lg border-b border-white/10 p-2">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <span className="font-bold text-sm text-white">EU</span>
            </div>
            <h2 className="text-white font-bold text-lg">Admin Panel</h2>
          </div>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-black/95 backdrop-blur-lg border-r border-white/10 p-0 w-64">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    );
  }
  
  return (
    <div className={cn(
      "min-h-screen flex flex-col bg-black/40 backdrop-blur-lg transition-all duration-300 border-r border-white/10",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <SidebarContent />
    </div>
  );
};

export default AdminSidebar;
