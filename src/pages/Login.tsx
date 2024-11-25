import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === "levi1225" && password === "Kaboodle1") {
      localStorage.setItem("isAdmin", "true");
      toast.success("Logged in as admin");
      navigate("/admin");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.username === username);
    
    if (!user) {
      toast.error("User not found");
      return;
    }

    if (new Date(user.expiryDate) < new Date()) {
      toast.error("Account has expired");
      return;
    }

    if (!user.hasSetPassword) {
      // First time login - set password
      const updatedUsers = users.map((u: any) => {
        if (u.username === username) {
          return { ...u, password, hasSetPassword: true };
        }
        return u;
      });
      
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      toast.success("Password set successfully");
      
      if (user.isAdmin) {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
      return;
    }

    if (user.password !== password) {
      toast.error("Invalid password");
      return;
    }
    
    if (user.isAdmin) {
      localStorage.setItem("isAdmin", "true");
    }
    
    toast.success("Logged in successfully");
    navigate(user.isAdmin ? "/admin" : "/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8 animate-fade-up">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display">Welcome Back</h2>
          <p className="mt-2 text-muted-foreground">
            Enter your credentials to access the platform
          </p>
        </div>
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-secondary"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-secondary"
            />
          </div>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;