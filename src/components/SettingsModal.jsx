import { useState } from 'react';
import { X, Eye, EyeOff, Trash2, ShieldCheck, Save } from 'lucide-react';

const SettingsModal = ({ onClose }) => {
  const [openAIKey, setOpenAIKey] = useState(() => localStorage.getItem('pantry_pulse_openai_key') || '');
  const [geminiKey, setGeminiKey] = useState(() => localStorage.getItem('pantry_pulse_gemini_key') || '');
  const [showOpenAI, setShowOpenAI] = useState(false);
  const [showGemini, setShowGemini] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('pantry_pulse_openai_key', openAIKey);
    localStorage.setItem('pantry_pulse_gemini_key', geminiKey);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all saved API keys?')) {
      localStorage.removeItem('pantry_pulse_openai_key');
      localStorage.removeItem('pantry_pulse_gemini_key');
      setOpenAIKey('');
      setGeminiKey('');
    }
  };

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

        <div className="p-6 space-y-6">
          <div className="bg-sage/10 rounded-xl p-4 flex gap-3 items-start">
            <ShieldCheck className="text-sage shrink-0" size={20} />
            <p className="text-sm text-charcoal/80 leading-relaxed">
              Your key is stored safely on your own device and is sent directly to the AI provider.
              <strong> It never touches our servers.</strong>
            </p>
          </div>

          <div className="space-y-4">
            {/* OpenAI Key */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-charcoal/70 ml-1">OpenAI API Key</label>
              <div className="relative">
                <input
                  type={showOpenAI ? 'text' : 'password'}
                  value={openAIKey}
                  onChange={(e) => setOpenAIKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full px-4 py-3 bg-cream border border-charcoal/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all pr-12 font-mono text-sm"
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
                  className="w-full px-4 py-3 bg-cream border border-charcoal/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all pr-12 font-mono text-sm"
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
