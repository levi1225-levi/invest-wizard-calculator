import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed w-full bg-background/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold">CryptoWizard</h1>
          <div className="space-x-4">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Log in
            </Button>
            <Button onClick={() => navigate("/dashboard")}>
              Try Demo
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-32">
        <section className="container mx-auto px-4 text-center space-y-8">
          <h1 className="text-6xl font-bold font-display tracking-tight animate-fade-up">
            Trade Smarter.<br />
            Not Harder.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up delay-100">
            Make informed cryptocurrency trading decisions with real-time market data,
            advanced analytics, and expert insights.
          </p>
          <div className="space-x-4 animate-fade-up delay-200">
            <Button size="lg" onClick={() => navigate("/login")}>
              Get Started
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/dashboard")}>
              View Demo
            </Button>
          </div>
        </section>

        <section className="mt-32 py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center space-y-4 p-6 rounded-2xl bg-background shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Real-time Data</h3>
                <p className="text-muted-foreground">
                  Access live cryptocurrency prices and market data from trusted sources
                </p>
              </div>
              <div className="text-center space-y-4 p-6 rounded-2xl bg-background shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Advanced Analytics</h3>
                <p className="text-muted-foreground">
                  Get detailed market analysis and trading recommendations
                </p>
              </div>
              <div className="text-center space-y-4 p-6 rounded-2xl bg-background shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Expert Insights</h3>
                <p className="text-muted-foreground">
                  Learn from market trends and make informed trading decisions
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;