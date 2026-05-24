import { useState } from 'react';
import { ChevronDown, Key, ShieldCheck, Leaf, HelpCircle, ExternalLink } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-charcoal/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left group transition-all"
        aria-expanded={isOpen}
      >
        <span className="font-serif text-lg md:text-xl text-charcoal group-hover:text-sage transition-colors">
          {question}
        </span>
        <ChevronDown
          size={20}
          className={`text-charcoal/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-charcoal/70 leading-relaxed text-base md:text-lg">
          {answer}
        </p>
      </div>
    </div>
  );
};

const EducationalZone = () => {
  const faqs = [
    {
      question: "Is PantryPulse really free?",
      answer: "Yes! PantryPulse is a 'Bring Your Own Key' (BYOK) tool. We don't charge any fees. You only pay the AI providers (OpenAI or Google) directly for what you use. Because we use highly efficient models like gpt-4o-mini or gemini-1.5-flash, generating a recipe costs mere fractions of a cent."
    },
    {
      question: "Is my private API key safe?",
      answer: "Absolutely. Your security is our priority. Your API keys are stored 100% locally in your own browser's localStorage. They are never sent to our servers, and they are only used to communicate directly with the AI provider when you click 'Generate Recipe'."
    },
    {
      question: "How does an AI recipe generator reduce food waste?",
      answer: "PantryPulse is a dedicated zero-waste kitchen helper. By inputting the random ingredients you already have, our AI creates custom recipes to ensure nothing goes to waste. It's the ultimate 'cook with what you have' tool, helping you save money and reduce your environmental footprint."
    }
  ];

  return (
    <section className="bg-charcoal/[0.03] border-t border-charcoal/5 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Guide Section */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sage/10 text-sage rounded-full text-sm font-bold uppercase tracking-wider">
              <Key size={14} />
              Quick Start Guide
            </div>
            <h2 className="text-3xl md:text-4xl text-charcoal leading-tight">
              Get started with your <span className="text-sage italic">AI Kitchen Helper</span>
            </h2>
            <p className="text-charcoal/60 text-lg">
              To use PantryPulse, you'll need an API key from OpenAI or Google Gemini. This ensures your recipes are generated instantly and privately.
            </p>

            <div className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Choose your AI Provider",
                  desc: "Sign up at the OpenAI Dashboard or Google AI Studio.",
                  link: "https://platform.openai.com/"
                },
                {
                  step: "02",
                  title: "Create a Secret Key",
                  desc: "Generate a new API key in your provider's settings. It only takes a second!"
                },
                {
                  step: "03",
                  title: "Paste & Start Cooking",
                  desc: "Open 'Settings' in PantryPulse, paste your key, and you're ready to generate unlimited recipes."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-5 bg-white rounded-2xl border border-charcoal/5 shadow-sm">
                  <div className="text-2xl font-serif font-black text-sage/20 leading-none pt-1">
                    {item.step}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-charcoal flex items-center gap-2">
                      {item.title}
                      {item.link && (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sage hover:text-sage/70 transition-colors">
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </h4>
                    <p className="text-charcoal/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber/10 text-amber rounded-full text-sm font-bold uppercase tracking-wider">
              <HelpCircle size={14} />
              Common Questions
            </div>
            <h2 className="text-3xl md:text-4xl text-charcoal leading-tight">
              Everything you need <br />to <span className="text-amber italic">know</span>
            </h2>

            <div className="bg-white rounded-3xl p-6 md:p-8 border border-charcoal/5 shadow-sm">
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-charcoal/40 text-sm">
                <ShieldCheck size={18} className="text-sage" />
                Privacy First
              </div>
              <div className="flex items-center gap-2 text-charcoal/40 text-sm">
                <Leaf size={18} className="text-sage" />
                Zero Food Waste
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EducationalZone;
