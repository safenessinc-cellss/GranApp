import React from 'react';
import { CountryConfig } from '../types';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsappProps {
  country: CountryConfig;
}

export const FloatingWhatsapp: React.FC<FloatingWhatsappProps> = ({ country }) => {
  const lang = country.lang;

  const messages = {
    pt: `Olá Suporte GranApp! Preciso de ajuda com o PWA no meu celular no Brasil.`,
    es: `¡Hola Soporte GranApp! Necesito ayuda con la PWA en mi celular.`,
    en: `Hello GranApp Support! I need help with the driver PWA.`
  };

  const whatsappUrl = `https://wa.me/5511999998888?text=${encodeURIComponent(messages[lang] || messages.pt)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-400 text-white p-3.5 rounded-full shadow-2xl shadow-emerald-500/50 flex items-center justify-center transition-all transform hover:scale-110 group border-2 border-emerald-300/40"
      title="Falar no WhatsApp com o Suporte VIP GranApp"
    >
      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 animate-ping"></span>
      <MessageCircle className="w-7 h-7 fill-white/20 stroke-[2.5]" />
      
      {/* Tooltip on hover */}
      <span className="absolute right-16 bg-slate-900 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl border border-emerald-500/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Suporte VIP GranApp WhatsApp 💬
      </span>
    </a>
  );
};
