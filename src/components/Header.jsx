import { ChefHat, Settings as SettingsIcon } from 'lucide-react';

const Header = ({ onOpenSettings, hasApiKey }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-charcoal/5 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="bg-sage p-1.5 rounded-lg text-white shadow-sm">
            <ChefHat size={24} />
          </div>
          <h1 className="text-xl font-serif font-bold text-charcoal tracking-tight">
            Pantry<span className="text-sage">Pulse</span>
          </h1>
        </div>

        <button
          onClick={onOpenSettings}
          className="relative p-2 hover:bg-charcoal/5 rounded-full transition-all group"
          aria-label="Open Settings"
        >
          <SettingsIcon size={22} className="text-charcoal/70 group-hover:text-charcoal transition-colors" />
          <span
            className={`absolute top-1 right-1 w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm ${
              hasApiKey ? 'bg-emerald-500' : 'bg-amber'
            }`}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
