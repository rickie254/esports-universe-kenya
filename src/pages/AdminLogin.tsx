
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Default admin credentials (in a real app, this would be authenticated with a backend)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const AdminLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Check if the credentials match
    if (values.username === ADMIN_USERNAME && values.password === ADMIN_PASSWORD) {
      // Set admin authentication in localStorage
      localStorage.setItem("adminAuthenticated", "true");
      
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      });
      
      navigate("/admin-dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid username or password",
      });
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative flex items-center justify-center">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50 -z-10" />

      {/* Back to Home */}
      <Link to="/" className="absolute top-4 left-4 text-white flex items-center gap-2 hover:text-accent transition-colors animate-fade-in">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      <div className="glass-card rounded-xl p-8 max-w-md w-full animate-scale-in">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">Admin Login</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Username</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your username" 
                      {...field}
                      className="bg-black/30 border-white/20 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="Enter your password" 
                      {...field}
                      className="bg-black/30 border-white/20 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AdminLogin;
