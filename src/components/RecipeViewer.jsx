import { useMemo, useState, useEffect } from 'react';
import { Sparkles, ChefHat, Timer } from 'lucide-react';

/**
 * RecipeViewer Component
 * Parses and displays AI-generated Markdown recipes with custom styling.
 */
const RecipeViewer = ({ recipe, isLoading }) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const loadingMessages = useMemo(() => [
    "Gathering ingredients...",
    "Consulting the master chef...",
    "Baking your custom menu...",
    "Adding a pinch of magic...",
    "Plating with care..."
  ], []);

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 1500);
    }
    return () => {
      clearInterval(interval);
      setMessageIndex(0);
    };
  }, [isLoading, loadingMessages.length]);

  const parsedContent = useMemo(() => {
    if (!recipe) return null;

    // Helper to handle bold text: **text** -> <strong>text</strong>
    const formatInline = (content) => {
      const parts = content.split(/(\*\*.*?\*\*)/g);
      return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-bold text-charcoal">{part.slice(2, -2)}</strong>;
        }
        return part;
      });
    };

    const lines = recipe.split('\n');
    const result = [];
    let currentList = null;

    const flushList = () => {
      if (currentList) {
        if (currentList.type === 'ul') {
          result.push(
            <ul key={`ul-${result.length}`} className="list-disc list-outside ml-6 space-y-3 mb-8 text-charcoal/80 text-lg">
              {currentList.items.map((item, idx) => (
                <li key={idx} className="pl-2">{formatInline(item)}</li>
              ))}
            </ul>
          );
        } else if (currentList.type === 'ol') {
          result.push(
            <ol key={`ol-${result.length}`} className="list-decimal list-outside ml-6 space-y-5 mb-8 text-charcoal/80 text-lg">
              {currentList.items.map((item, idx) => (
                <li key={idx} className="pl-2">{formatInline(item)}</li>
              ))}
            </ol>
          );
        }
        currentList = null;
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Headers
      if (trimmed.startsWith('# ')) {
        flushList();
        result.push(
          <h1 key={index} className="text-3xl md:text-5xl font-serif text-sage mb-8 leading-tight">
            {trimmed.replace('# ', '')}
          </h1>
        );
      } else if (trimmed.startsWith('## ')) {
        flushList();
        result.push(
          <h2 key={index} className="text-xl md:text-2xl font-serif text-charcoal border-b border-charcoal/10 pb-3 mt-10 mb-6 flex items-center gap-2">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      // Unordered lists
      else if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        if (!currentList || currentList.type !== 'ul') {
          flushList();
          currentList = { type: 'ul', items: [] };
        }
        currentList.items.push(trimmed.substring(2));
      }
      // Ordered lists
      else if (/^\d+\.\s/.test(trimmed)) {
        if (!currentList || currentList.type !== 'ol') {
          flushList();
          currentList = { type: 'ol', items: [] };
        }
        currentList.items.push(trimmed.replace(/^\d+\.\s/, ''));
      }
      // Paragraphs / Empty lines
      else {
        if (trimmed === '') {
          flushList();
        } else {
          if (currentList) {
            flushList();
          }
          result.push(
            <p key={index} className="text-charcoal/80 leading-relaxed text-lg mb-6">
              {formatInline(trimmed)}
            </p>
          );
        }
      }
    });

    flushList();
    return result;
  }, [recipe]);

  if (isLoading) {
    return (
      <div className="flex-grow flex flex-col p-8 md:p-12 space-y-8 animate-pulse-soft">
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
          <div className="relative">
             <div className="w-24 h-24 bg-sage/10 rounded-full flex items-center justify-center text-sage animate-cooking-spin">
               <ChefHat size={48} />
             </div>
             <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-sm text-amber">
               <Timer size={20} className="animate-pulse" />
             </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-serif text-charcoal transition-all duration-500">
              {loadingMessages[messageIndex]}
            </h3>
            <p className="text-charcoal/40 italic">Master Chef is at work...</p>
          </div>
        </div>

        {/* Skeleton UI */}
        <div className="space-y-6">
          <div className="h-10 bg-charcoal/5 rounded-lg w-3/4" />
          <div className="space-y-3">
            <div className="h-4 bg-charcoal/5 rounded w-full" />
            <div className="h-4 bg-charcoal/5 rounded w-full" />
            <div className="h-4 bg-charcoal/5 rounded w-5/6" />
          </div>
          <div className="pt-8 space-y-4">
            <div className="h-8 bg-charcoal/5 rounded-lg w-1/4" />
            <div className="h-4 bg-charcoal/5 rounded w-full" />
            <div className="h-4 bg-charcoal/5 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-12 text-center space-y-6 min-h-[500px]">
        <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center text-charcoal/10">
          <Sparkles size={40} />
        </div>
        <div className="space-y-2 max-w-xs mx-auto">
          <h3 className="text-xl font-bold text-charcoal/80">Ready to Cook?</h3>
          <p className="text-charcoal/40 leading-relaxed">
            Your custom recipe will appear here once you hit generate.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="max-w-none">
        {parsedContent}
      </div>
    </div>
  );
};

export default RecipeViewer;
