import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import Header from './components/Header';
import SettingsModal from './components/SettingsModal';
import IngredientInput from './components/IngredientInput';
import RecipePreferences from './components/RecipePreferences';
import RecipeViewer from './components/RecipeViewer';
import EducationalZone from './components/EducationalZone';
import { generateRecipePrompt } from './utils/promptBuilder';
import { generateRecipeFromAI } from './utils/apiService';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [preferences, setPreferences] = useState({
    cuisine: 'Any / Fusion',
    style: 'Quick & Easy (< 20 mins)',
    spice: 'Medium'
  });

  // Centralized API Configuration
  const [apiConfig, setApiConfig] = useState({
    openaiKey: localStorage.getItem('pantry_pulse_openai_key') || '',
    geminiKey: localStorage.getItem('pantry_pulse_gemini_key') || '',
    activeProvider: localStorage.getItem('pantry_pulse_active_provider') || 'openai',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState('');

  const hasApiKey = !!(apiConfig.openaiKey || apiConfig.geminiKey);

  const handleSaveSettings = (newConfig) => {
    localStorage.setItem('pantry_pulse_openai_key', newConfig.openaiKey);
    localStorage.setItem('pantry_pulse_gemini_key', newConfig.geminiKey);
    localStorage.setItem('pantry_pulse_active_provider', newConfig.activeProvider);
    setApiConfig(newConfig);
  };

  const handleClearSettings = () => {
    localStorage.removeItem('pantry_pulse_openai_key');
    localStorage.removeItem('pantry_pulse_gemini_key');
    localStorage.removeItem('pantry_pulse_active_provider');
    setApiConfig({ openaiKey: '', geminiKey: '', activeProvider: 'openai' });
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setGeneratedRecipe('');

    try {
      // Build the prompt
      const prompt = generateRecipePrompt(ingredients, preferences);

      // Call the AI Provider
      const recipe = await generateRecipeFromAI(apiConfig, prompt);

      setGeneratedRecipe(recipe);
    } catch (error) {
      console.error('Error generating recipe:', error);
      alert(error.message || 'Something went wrong while generating the recipe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream/30 print:bg-white print:min-h-0">
      <Header
        onOpenSettings={() => setIsSettingsOpen(true)}
        hasApiKey={hasApiKey}
      />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8 md:py-12 print:py-0 print:px-0 print:max-w-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start print:block">

          {/* Left Column: Input Control Zone */}
          <section className="space-y-10 print:hidden">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl text-charcoal leading-tight">
                What's in your <span className="text-sage font-serif italic">pantry?</span>
              </h2>
              <p className="text-charcoal/60 text-lg max-w-md">
                Add your ingredients and set your preferences to generate a custom AI recipe.
              </p>
            </div>

            <div className="space-y-8 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-charcoal/5">
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-charcoal/40 ml-1">Ingredients</h3>
                <IngredientInput ingredients={ingredients} setIngredients={setIngredients} />
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-charcoal/40 ml-1">Preferences</h3>
                <RecipePreferences preferences={preferences} onPreferenceChange={setPreferences} />
              </div>

              <div className="pt-4">
                <div className="relative group">
                  <button
                    onClick={handleGenerate}
                    disabled={ingredients.length === 0 || !hasApiKey || isLoading}
                    className="w-full bg-sage hover:bg-sage/90 brightness-100 hover:brightness-95 disabled:bg-charcoal/10 disabled:text-charcoal/30 text-white py-4 px-8 rounded-2xl font-bold text-xl transition-all duration-300 shadow-lg shadow-sage/20 flex items-center justify-center gap-3 group/btn cursor-pointer disabled:cursor-not-allowed hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    <Wand2 size={24} className="group-hover/btn:rotate-12 transition-transform" />
                    {isLoading ? 'Crafting Recipe...' : 'Generate Recipe'}
                  </button>

                  {(ingredients.length === 0 || !hasApiKey) && !isLoading && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-charcoal text-white text-xs py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-10">
                      {ingredients.length === 0 ? 'Add at least one ingredient' : 'Set your API key in Settings'}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-charcoal rotate-45" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Right Column: Recipe Output Zone */}
          <section className="lg:sticky lg:top-28 print:static print:w-full">
             <div className="bg-white rounded-3xl shadow-sm border border-charcoal/5 min-h-[500px] flex flex-col overflow-hidden transition-all print:shadow-none print:border-none print:min-h-0">
                <RecipeViewer recipe={generatedRecipe} isLoading={isLoading} />
             </div>
          </section>
        </div>
      </main>

      <EducationalZone />

      <footer className="py-8 border-t border-charcoal/5 bg-white print:hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-charcoal/40 text-sm">
            &copy; {new Date().getFullYear()} PantryPulse. Your ingredients, your privacy, your AI.
          </p>
        </div>
      </footer>

      {isSettingsOpen && (
        <SettingsModal
          apiConfig={apiConfig}
          onSave={handleSaveSettings}
          onClear={handleClearSettings}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
