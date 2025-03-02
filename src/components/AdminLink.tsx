
import React from "react";
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminLink = () => {
  return (
    <div className="fixed top-4 right-4 z-10 animate-fade-in">
      <Link to="/admin-login">
        <Button variant="outline" className="glass-card flex items-center gap-2 hover:bg-accent/20">
          <LogIn className="w-4 h-4" />
          <span>Admin</span>
        </Button>
      </Link>
    </div>
  );
};

export default AdminLink;
