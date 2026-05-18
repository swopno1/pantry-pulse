import { AlertCircle, X } from 'lucide-react';

const ErrorBanner = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 shadow-sm">
        <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={20} />
        <div className="flex-grow">
          <p className="text-amber-800 text-sm font-medium leading-relaxed">
            {message}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-amber-100 rounded-lg transition-colors text-amber-500 hover:text-amber-700"
            aria-label="Dismiss error"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorBanner;
