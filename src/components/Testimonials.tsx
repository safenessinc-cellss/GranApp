import React from 'react';
import { CountryConfig } from '../types';
import { TESTIMONIALS } from '../data/content';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

interface TestimonialsProps {
  country: CountryConfig;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ country }) => {
  const lang = country.lang;

  const labels = {
    pt: {
      tag: 'HISTÓRIAS DE SUCESSO COMPROVADAS',
      title: 'Quem usa o GranApp ganha mais e roda menos!',
      subtitle: 'Mais de 87.000 motoristas em 12 países utilizam o GranApp todos os dias para garantir lucro líquido no final do turno.',
    },
    es: {
      tag: 'HISTORIAS DE ÉXITO COMPROBADAS',
      title: '¡Quienes usan GranApp ganan más y recorren menos!',
      subtitle: 'Más de 87,000 conductores en 12 países usan GranApp diariamente para asegurar sus ganancias.',
    },
    en: {
      tag: 'PROVEN DRIVER SUCCESS',
      title: 'Drive less, earn more with GranApp!',
      subtitle: 'Over 87,000 gig drivers across 12 countries rely on GranApp every single day.',
    }
  }[lang];

  return (
    <section id="depoimentos" className="py-16 bg-[#0A0A10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#F59E0B] mb-3">
            <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
            <span>{labels.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {labels.title}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mt-2">
            {labels.subtitle}
          </p>
        </div>

        {/* 10 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 border border-white/10 hover:border-[#7C3AED]/40 p-6 rounded-3xl shadow-xl flex flex-col justify-between transition-all hover:-translate-y-1 relative group backdrop-blur-md"
            >
              <div>
                {/* Header Driver Info */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#F59E0B]"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-black text-white">{item.name}</h4>
                      <span className="text-sm">{item.countryCode === 'BR' ? '🇧🇷' : item.countryCode === 'MX' ? '🇲🇽' : item.countryCode === 'US' ? '🇺🇸' : item.countryCode === 'CO' ? '🇨🇴' : item.countryCode === 'AR' ? '🇦🇷' : item.countryCode === 'ES' ? '🇪🇸' : item.countryCode === 'PE' ? '🇵🇪' : '🇨🇱'}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium">
                      {item.role} • {item.city}
                    </p>
                    <p className="text-[10px] text-[#7C3AED] font-mono mt-0.5">
                      🚘 {item.vehicle}
                    </p>
                  </div>
                </div>

                {/* Rating Stars & Extra Income Badge */}
                <div className="flex items-center justify-between my-3 py-2 border-y border-white/10">
                  <div className="flex text-[#F59E0B]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B]" />
                    ))}
                  </div>
                  <span className="bg-[#10B981]/20 text-[#10B981] font-extrabold text-xs px-2.5 py-0.5 rounded-full border border-[#10B981]/30">
                    {item.extraIncome}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-xs text-gray-300 leading-relaxed italic">
                  "{item.quote[lang] || item.quote.pt}"
                </p>
              </div>

              {/* Verified Member Badge */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400 font-bold">
                <span className="flex items-center gap-1 text-[#10B981]">
                  <CheckCircle2 className="w-3 h-3" />
                  Membro Verificado
                </span>
                <span className="bg-[#0A0A10] px-2 py-0.5 rounded-lg border border-white/10">
                  {item.platform}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
