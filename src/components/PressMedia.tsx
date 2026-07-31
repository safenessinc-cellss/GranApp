import React from 'react';
import { PRESS_OUTLETS } from '../data/content';
import { Language } from '../types';

interface PressMediaProps {
  lang: Language;
}

export const PressMedia: React.FC<PressMediaProps> = ({ lang }) => {
  const title = {
    pt: 'DESTAQUE NA IMPRENSA INTERNACIONAL',
    es: 'DESTACADO EN MEDIOS INTERNACIONALES',
    en: 'FEATURED IN LEADING MEDIA OUTLETS'
  }[lang];

  return (
    <section className="py-8 bg-[#0A0A10] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[11px] font-extrabold tracking-widest text-gray-400 uppercase mb-6">
          {title}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-80 hover:opacity-100 transition-opacity">
          {PRESS_OUTLETS.map((outlet) => (
            <div
              key={outlet.name}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-300 font-black text-sm sm:text-base tracking-wider hover:text-[#F59E0B] hover:border-[#7C3AED]/40 transition-all cursor-default"
            >
              {outlet.logoText}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
