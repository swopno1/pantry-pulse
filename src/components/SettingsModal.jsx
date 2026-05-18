import { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Trash2, ShieldCheck, Save, AlertCircle } from 'lucide-react';

const SettingsModal = ({ apiConfig, onSave, onClear, onClose, error }) => {
  const [openAIKey, setOpenAIKey] = useState(apiConfig.openaiKey);
  const [geminiKey, setGeminiKey] = useState(apiConfig.geminiKey);
  const [activeProvider, setActiveProvider] = useState(apiConfig.activeProvider || 'openai');
  const [showOpenAI, setShowOpenAI] = useState(false);
  const [showGemini, setShowGemini] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isSaved) {
      const timer = setTimeout(() => setIsSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSaved]);

  const handleSave = () => {
    onSave({
      openaiKey: openAIKey,
      geminiKey: geminiKey,
      activeProvider: activeProvider
    });
    setIsSaved(true);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all saved API keys?')) {
      onClear();
      setOpenAIKey('');
      setGeminiKey('');
      setActiveProvider('openai');
    }
  };

  const hasError = !!error;
  const isCurrentlyActiveProviderOpenAI = activeProvider === 'openai';
  const isCurrentlyActiveProviderGemini = activeProvider === 'gemini';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-charcoal/5">
          <h2 className="text-2xl font-serif text-charcoal">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-charcoal/5 rounded-full transition-colors text-charcoal/50 hover:text-charcoal"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2 animate-pulse">
              <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={18} />
              <p className="text-amber-800 text-xs font-medium leading-relaxed">
                {error}
              </p>
            </div>
          )}

          <div className="bg-sage/10 rounded-xl p-4 flex gap-3 items-start">
            <ShieldCheck className="text-sage shrink-0" size={20} />
            <p className="text-sm text-charcoal/80 leading-relaxed">
              Your key is stored safely on your own device and is sent directly to the AI provider.
              <strong> It never touches our servers.</strong>
            </p>
          </div>

          <div className="space-y-5">
            {/* Active Provider Selection */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-charcoal/70 ml-1">Active AI Provider</label>
              <div className="flex gap-2 p-1 bg-cream border border-charcoal/10 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveProvider('openai')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    activeProvider === 'openai'
                      ? 'bg-white text-sage shadow-sm'
                      : 'text-charcoal/40 hover:text-charcoal/60'
                  }`}
                >
                  OpenAI
                </button>
                <button
                  type="button"
                  onClick={() => setActiveProvider('gemini')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    activeProvider === 'gemini'
                      ? 'bg-white text-sage shadow-sm'
                      : 'text-charcoal/40 hover:text-charcoal/60'
                  }`}
                >
                  Google Gemini
                </button>
              </div>
            </div>

            <div className="h-px bg-charcoal/5" />

            {/* OpenAI Key */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-charcoal/70 ml-1">OpenAI API Key</label>
              <div className="relative">
                <input
                  type={showOpenAI ? 'text' : 'password'}
                  value={openAIKey}
                  onChange={(e) => setOpenAIKey(e.target.value)}
                  placeholder="sk-..."
                  className={`w-full px-4 py-3 bg-cream border rounded-lg focus:outline-none focus:ring-2 transition-all pr-12 font-mono text-sm ${
                    hasError && isCurrentlyActiveProviderOpenAI
                      ? 'border-amber-500 ring-2 ring-amber-500/20'
                      : 'border-charcoal/10 focus:ring-sage/20 focus:border-sage'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowOpenAI(!showOpenAI)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal transition-colors"
                >
                  {showOpenAI ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Gemini Key */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-charcoal/70 ml-1">Google Gemini API Key</label>
              <div className="relative">
                <input
                  type={showGemini ? 'text' : 'password'}
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  placeholder="AIza..."
                  className={`w-full px-4 py-3 bg-cream border rounded-lg focus:outline-none focus:ring-2 transition-all pr-12 font-mono text-sm ${
                    hasError && isCurrentlyActiveProviderGemini
                      ? 'border-amber-500 ring-2 ring-amber-500/20'
                      : 'border-charcoal/10 focus:ring-sage/20 focus:border-sage'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowGemini(!showGemini)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal transition-colors"
                >
                  {showGemini ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={handleSave}
              className="w-full bg-sage hover:bg-sage/90 text-white py-3 rounded-lg font-semibold transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isSaved ? 'Saved!' : <><Save size={18} /> Save Settings</>}
            </button>
            <button
              onClick={handleClear}
              className="w-full bg-white border border-amber/20 hover:border-amber text-amber py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Trash2 size={18} /> Clear Keys
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
