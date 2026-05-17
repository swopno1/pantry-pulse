import { useState } from 'react';
import { UtensilsCrossed, Settings as SettingsIcon, ChefHat, Sparkles } from 'lucide-react';
import SettingsModal from './components/SettingsModal';
import IngredientInput from './components/IngredientInput';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-sage text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ChefHat size={32} />
            <h1 className="text-2xl font-serif tracking-tight">PantryPulse</h1>
          </div>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Open Settings"
          >
            <SettingsIcon size={24} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center">
        <div className="max-w-2xl w-full text-center">
          <div className="inline-flex p-3 bg-amber/10 text-amber rounded-2xl mb-6">
            <Sparkles size={40} />
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 text-charcoal leading-tight">
            What's in your <span className="text-sage">pantry?</span>
          </h2>
          <p className="text-lg text-charcoal/70 mb-10 font-sans">
            Enter the ingredients you have on hand, and we'll suggest the perfect recipe.
          </p>

          <IngredientInput ingredients={ingredients} setIngredients={setIngredients} />

          {ingredients.length > 0 && (
            <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button className="bg-sage hover:bg-sage/90 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 mx-auto group">
                <UtensilsCrossed size={24} className="group-hover:rotate-12 transition-transform" />
                Generate Recipe
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-charcoal/5">
        <div className="container mx-auto px-4 text-center text-sm text-charcoal/50">
          <p>&copy; {new Date().getFullYear()} PantryPulse. Your ingredients, your privacy, your AI.</p>
        </div>
      </footer>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
