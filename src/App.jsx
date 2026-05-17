import { UtensilsCrossed, Settings, Info, ChefHat, Sparkles } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-sage text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ChefHat size={32} />
            <h1 className="text-2xl font-serif tracking-tight">PantryPulse</h1>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Settings size={24} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
        <div className="max-w-2xl">
          <div className="inline-flex p-3 bg-amber/10 text-amber rounded-2xl mb-6">
            <Sparkles size={40} />
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 text-charcoal leading-tight">
            Welcome to <span className="text-sage">PantryPulse</span>
          </h2>
          <p className="text-lg text-charcoal/70 mb-10 font-sans">
            Transform your leftover ingredients into delicious recipes.
            Completely private, ultra-fast, and powered by your own AI keys.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-sage hover:bg-sage/90 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg flex items-center justify-center gap-2">
              <UtensilsCrossed size={20} />
              Start Cooking
            </button>
            <button className="bg-white border-2 border-amber/20 hover:border-amber text-amber px-8 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
              <Info size={20} />
              Learn More
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-charcoal/5">
        <div className="container mx-auto px-4 text-center text-sm text-charcoal/50">
          <p>&copy; {new Date().getFullYear()} PantryPulse. Your ingredients, your privacy, your AI.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
