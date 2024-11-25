import { SearchBar } from "@/components/SearchBar";
import { MemeCoinSection } from "@/components/MemeCoinSection";
import { AdminPanel } from "@/components/AdminPanel";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("username") === "levi1225";

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Crypto Dashboard</h1>
        <Button onClick={handleLogout} variant="outline">
          Logout
        </Button>
      </div>
      <SearchBar />
      <MemeCoinSection />
      {isAdmin && <AdminPanel />}
    </div>
  );
};

export default Index;