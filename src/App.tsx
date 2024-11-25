import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";

const queryClient = new QueryClient();

// Initialize admin account if it doesn't exist
const initializeAdmin = () => {
  const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
  if (!accounts.some((account: any) => account.username === 'levi1225')) {
    accounts.push({
      username: 'levi1225',
      password: 'Kaboodle1',
      isAdmin: true
    });
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App = () => {
  useEffect(() => {
    initializeAdmin();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Index />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;