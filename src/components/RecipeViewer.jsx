import { useMemo } from 'react';
import { Sparkles, Wand2 } from 'lucide-react';

/**
 * RecipeViewer Component
 * Parses and displays AI-generated Markdown recipes with custom styling.
 */
const RecipeViewer = ({ recipe, isLoading }) => {

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
      <div className="flex-grow flex flex-col items-center justify-center p-12 text-center space-y-6 min-h-[500px]">
        <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center text-sage animate-pulse">
          <Wand2 size={40} />
        </div>
        <div className="space-y-2 max-w-xs mx-auto">
          <h3 className="text-xl font-bold text-charcoal/80">Crafting your recipe...</h3>
          <p className="text-charcoal/40 leading-relaxed italic">
            "Good things come to those who wait."
          </p>
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
