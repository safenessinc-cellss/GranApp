import React, { useState } from 'react';
import { CountryConfig } from '../types';
import { FAQS } from '../data/content';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';

interface FaqAccordionProps {
  country: CountryConfig;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ country }) => {
  const lang = country.lang;

  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const qText = (faq.question[lang] || faq.question.pt).toLowerCase();
    const aText = (faq.answer[lang] || faq.answer.pt).toLowerCase();
    const matchesSearch = !searchQuery || qText.includes(searchQuery.toLowerCase()) || aText.includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const labels = {
    pt: {
      tag: 'TIRA DÚVIDAS DOS MOTORISTAS',
      title: 'Perguntas Frequentes (13 Dúvidas Respondidas)',
      subtitle: 'Tudo o que você precisa saber sobre o GranApp, PWA, GranScore e assinatura.',
      searchPlaceholder: 'Buscar dúvida por palavra-chave...',
      allCat: 'Todas (13)',
      granscoreCat: 'GranScore',
      pwaCat: 'PWA & Instalação',
      paymentCat: 'Pagamentos',
      securityCat: 'Segurança & App',
    },
    es: {
      tag: 'RESPUESTAS A CONDUCTORES',
      title: 'Preguntas Frecuentes (13 Preguntas Respondidas)',
      subtitle: 'Todo lo que necesitas saber sobre GranApp, PWA, GranScore y suscripción.',
      searchPlaceholder: 'Buscar pregunta por palabra clave...',
      allCat: 'Todas (13)',
      granscoreCat: 'GranScore',
      pwaCat: 'PWA e Instalación',
      paymentCat: 'Pagos',
      securityCat: 'Seguridad y Apps',
    },
    en: {
      tag: 'DRIVER FREQUENT QUESTIONS',
      title: 'Frequently Asked Questions (13 Full Q&As)',
      subtitle: 'Everything you need to know about GranApp, PWA install, GranScore, and membership.',
      searchPlaceholder: 'Search question by keyword...',
      allCat: 'All (13)',
      granscoreCat: 'GranScore',
      pwaCat: 'PWA & Install',
      paymentCat: 'Billing',
      securityCat: 'Safety & Terms',
    }
  }[lang];

  return (
    <section id="faq" className="py-16 bg-[#0A0A10] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#F59E0B] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{labels.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {labels.title}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mt-2">
            {labels.subtitle}
          </p>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={labels.searchPlaceholder}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white text-xs font-medium focus:border-[#7C3AED] focus:outline-none transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {labels.allCat}
            </button>
            <button
              onClick={() => setActiveCategory('granscore')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === 'granscore'
                  ? 'bg-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {labels.granscoreCat}
            </button>
            <button
              onClick={() => setActiveCategory('pwa')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === 'pwa'
                  ? 'bg-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {labels.pwaCat}
            </button>
            <button
              onClick={() => setActiveCategory('pagamentos')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === 'pagamentos'
                  ? 'bg-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {labels.paymentCat}
            </button>
            <button
              onClick={() => setActiveCategory('seguranca')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === 'seguranca'
                  ? 'bg-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {labels.securityCat}
            </button>
          </div>
        </div>

        {/* FAQ Items Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            const question = faq.question[lang] || faq.question.pt;
            const answer = faq.answer[lang] || faq.answer.pt;

            return (
              <div
                key={faq.id}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-colors backdrop-blur-md"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-[#F59E0B] transition-colors"
                >
                  <span className="flex-1">{question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs text-gray-300 leading-relaxed border-t border-white/10 whitespace-pre-line animate-fade-in">
                    {answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
