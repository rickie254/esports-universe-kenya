
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { useAdminDashboard } from "@/contexts/AdminDashboardContext";
import { useToast } from "@/components/ui/use-toast";

const AdminHeader = () => {
  const { handleSaveChanges } = useAdminDashboard();
  const { toast } = useToast();
  
  const onSave = () => {
    handleSaveChanges();
    toast({
      title: "Changes saved",
      description: "Your changes have been saved successfully",
    });
  };

  return (
    <div className="max-w-7xl mx-auto mb-3 sm:mb-5 flex justify-between items-center animate-fade-in flex-wrap gap-2">
      <Link to="/" className="text-white flex items-center gap-2 hover:text-accent transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to Site</span>
      </Link>
      
      <Button 
        variant="outline" 
        className="glass-card hover:bg-accent/20 text-sm py-1 px-2 h-8"
        onClick={onSave}
      >
        <Save className="w-3 h-3 mr-1" />
        Save
      </Button>
    </div>
  );
};

export default AdminHeader;
