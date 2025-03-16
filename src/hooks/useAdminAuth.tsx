
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const useAdminAuth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const isAdmin = localStorage.getItem("adminAuthenticated") === "true";
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Access denied",
        description: "You must be logged in as an admin to view this page",
      });
      navigate("/admin-login");
    }
  }, [navigate, toast]);
  
  return { isAuthenticated: localStorage.getItem("adminAuthenticated") === "true" };
};
