import { SearchBar } from "@/components/SearchBar";
import { MemeCoinSection } from "@/components/MemeCoinSection";

const Demo = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container py-12 space-y-12">
        <div className="text-center space-y-4 animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-display font-bold">
            Demo Mode
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            This is a demo version with sample data. Log in to access real-time market data.
          </p>
        </div>

        <SearchBar isDemo={true} />
        <MemeCoinSection isDemo={true} />
      </main>
    </div>
  );
};

export default Demo;