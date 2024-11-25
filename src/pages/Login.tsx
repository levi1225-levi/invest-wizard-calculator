import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.username === username);
    if (user && !user.hasSetPassword) {
      setIsFirstLogin(true);
    } else {
      setIsFirstLogin(false);
    }
  }, [username]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isFirstLogin) {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((user: any) => {
        if (user.username === username) {
          return { ...user, password, hasSetPassword: true };
        }
        return user;
      });
      
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      toast.success("Password set successfully");
    }

    if (username === "levi1225" && password === "Kaboodle1") {
      localStorage.setItem("isAdmin", "true");
      toast.success("Logged in as admin");
      navigate("/admin");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.username === username && u.password === password);
    
    if (user) {
      if (new Date(user.expiryDate) < new Date()) {
        toast.error("Account has expired");
        return;
      }
      
      if (user.isAdmin) {
        localStorage.setItem("isAdmin", "true");
      }
      
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8 animate-fade-up">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display">
            {isFirstLogin ? "Create Your Password" : "Welcome Back"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {isFirstLogin
              ? "Please set up your password to continue"
              : "Enter your credentials to access the platform"}
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
            {isFirstLogin && (
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-secondary"
              />
            )}
          </div>
          <Button type="submit" className="w-full">
            {isFirstLogin ? "Set Password" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;