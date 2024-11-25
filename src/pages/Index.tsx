import { SearchBar } from "@/components/SearchBar";
import { MemeCoinSection } from "@/components/MemeCoinSection";
import { AdminPanel } from "@/components/AdminPanel";

const Index = () => {
  const isAdmin = localStorage.getItem("username") === "levi1225";

  return (
    <div className="container py-8 space-y-8">
      <SearchBar />
      <MemeCoinSection />
      {isAdmin && <AdminPanel />}
    </div>
  );
};

export default Index;