import { useState } from 'react';
import { X, Plus } from 'lucide-react';

const IngredientInput = ({ ingredients, setIngredients }) => {
  const [inputValue, setInputValue] = useState('');

  const addIngredient = (value) => {
    const trimmedValue = value.trim().toLowerCase();
    if (trimmedValue && !ingredients.includes(trimmedValue)) {
      setIngredients([...ingredients, trimmedValue]);
    }
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addIngredient(inputValue);
    }
  };

  const removeIngredient = (indexToRemove) => {
    setIngredients(ingredients.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="relative group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type an ingredient like 'rice' or 'eggs' and press Enter..."
          className="w-full px-4 py-4 bg-white border-2 border-charcoal/10 rounded-xl focus:outline-none focus:border-sage focus:ring-4 focus:ring-sage/10 transition-all text-lg"
        />
        <button
          onClick={() => addIngredient(inputValue)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-sage text-white rounded-lg hover:bg-sage/90 transition-colors shadow-sm"
          aria-label="Add ingredient"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 min-h-[40px]">
        {ingredients.map((ingredient, index) => (
          <div
            key={`${ingredient}-${index}`}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-sage/10 text-sage border border-sage/20 rounded-full animate-in fade-in zoom-in duration-200"
          >
            <span className="text-sm font-medium capitalize">{ingredient}</span>
            <button
              onClick={() => removeIngredient(index)}
              className="p-0.5 hover:bg-sage/20 rounded-full transition-colors cursor-pointer"
              aria-label={`Remove ${ingredient}`}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientInput;
