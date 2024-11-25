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

      <main>
        <section className="min-h-screen flex items-center justify-center text-center px-4">
          <div className="space-y-8 animate-fade-up">
            <h1 className="text-6xl md:text-7xl font-bold font-display tracking-tight bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">
              Trade Smarter.<br />
              Not Harder.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Make informed cryptocurrency trading decisions with real-time market data,
              advanced analytics, and expert insights.
            </p>
            <div className="space-x-4">
              <Button size="lg" onClick={() => navigate("/login")} className="rounded-full px-8">
                Get Started
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/dashboard")} className="rounded-full px-8">
                View Demo
              </Button>
            </div>
          </div>
        </section>

        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center space-y-4 p-8 rounded-3xl bg-background/50 backdrop-blur-md shadow-lg">
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
              <div className="text-center space-y-4 p-8 rounded-3xl bg-background/50 backdrop-blur-md shadow-lg">
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
              <div className="text-center space-y-4 p-8 rounded-3xl bg-background/50 backdrop-blur-md shadow-lg">
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