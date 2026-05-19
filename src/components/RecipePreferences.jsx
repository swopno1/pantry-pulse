import { Flame } from 'lucide-react';

const RecipePreferences = ({ preferences, onPreferenceChange }) => {
  const cuisines = [
    'Bangladeshi', 'Italian', 'Indian',
    'Mexican', 'East Asian', 'Any / Fusion'
  ];

  const styles = [
    'Quick & Easy (< 20 mins)',
    'Comfort Food',
    'Healthy / Low Calorie',
    'Chef\'s Special (Creative)'
  ];

  const spiceLevels = ['Mild', 'Medium', 'Hot'];

  const handleCuisineChange = (cuisine) => {
    onPreferenceChange({ ...preferences, cuisine });
  };

  const handleStyleChange = (style) => {
    onPreferenceChange({ ...preferences, style });
  };

  const handleSpiceChange = (spice) => {
    onPreferenceChange({ ...preferences, spice });
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 space-y-8 text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Cuisine Type */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-charcoal/80 ml-1">Cuisine Type</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {cuisines.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => handleCuisineChange(cuisine)}
              aria-pressed={preferences.cuisine === cuisine}
              className={`px-4 py-2.5 rounded-xl border-2 transition-all duration-300 text-sm font-medium hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
                preferences.cuisine === cuisine
                  ? 'bg-amber border-amber text-white shadow-md shadow-amber/20'
                  : 'bg-white border-charcoal/5 text-charcoal/60 hover:border-amber/30 hover:text-charcoal'
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>

      {/* Cooking Style */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-charcoal/80 ml-1">Cooking Style & Time</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {styles.map((style) => (
            <button
              key={style}
              onClick={() => handleStyleChange(style)}
              aria-pressed={preferences.style === style}
              className={`px-4 py-2.5 rounded-xl border-2 transition-all duration-300 text-sm font-medium hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
                preferences.style === style
                  ? 'bg-amber border-amber text-white shadow-md shadow-amber/20'
                  : 'bg-white border-charcoal/5 text-charcoal/60 hover:border-amber/30 hover:text-charcoal'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Spice Level */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-charcoal/80 ml-1 flex items-center gap-2">
          Spice Level
        </h3>
        <div className="flex gap-3">
          {spiceLevels.map((level, index) => (
            <button
              key={level}
              onClick={() => handleSpiceChange(level)}
              aria-pressed={preferences.spice === level}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-300 font-medium hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
                preferences.spice === level
                  ? 'bg-amber border-amber text-white shadow-md shadow-amber/20'
                  : 'bg-white border-charcoal/5 text-charcoal/60 hover:border-amber/30 hover:text-charcoal'
              }`}
            >
              <div className="flex" aria-hidden="true">
                {[...Array(index + 1)].map((_, i) => (
                  <Flame
                    key={i}
                    size={16}
                    className={preferences.spice === level ? 'fill-white' : 'fill-amber'}
                  />
                ))}
              </div>
              <span className="text-sm">{level}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipePreferences;
