
import { useEffect } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useIsMobile } from "@/hooks/use-mobile";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminContent from "@/components/admin/AdminContent";
import { AdminDashboardProvider } from "@/contexts/AdminDashboardContext";
import { useToast } from "@/components/ui/use-toast";

const AdminDashboard = () => {
  // Check admin authentication
  const { isAuthenticated } = useAdminAuth();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // Set admin name if it doesn't exist
  useEffect(() => {
    if (isAuthenticated) {
      const adminName = localStorage.getItem("adminName");
      if (!adminName) {
        const defaultName = "Admin-" + Math.floor(Math.random() * 1000).toString();
        localStorage.setItem("adminName", defaultName);
        
        toast({
          title: "Welcome!",
          description: `You've been assigned the name: ${defaultName}`,
        });
      }
    }
  }, [isAuthenticated, toast]);
  
  return (
    <AdminDashboardProvider>
      <div className={`flex flex-col ${!isMobile && "md:flex-row"} min-h-screen bg-black/5`}>
        <AdminSidebar />
        
        <div className="flex-1 px-2 py-2 sm:py-6 sm:px-4 lg:px-6 relative overflow-x-hidden">
          <div className="absolute inset-0 bg-black/50 -z-10" />
          
          <AdminHeader />
          <AdminContent />
        </div>
      </div>
    </AdminDashboardProvider>
  );
};

export default AdminDashboard;
