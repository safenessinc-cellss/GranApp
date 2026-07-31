import React from 'react';
import { CountryConfig } from '../types';
import { COUNTRIES } from '../data/countries';
import { Zap, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  country: CountryConfig;
  onCountryChange: (country: CountryConfig) => void;
  onOpenPwaInstall: () => void;
  onToggleAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  country,
  onCountryChange,
  onOpenPwaInstall,
  onToggleAdmin,
}) => {
  const lang = country.lang;

  return (
    <footer className="bg-[#0A0A10] border-t border-white/10 pt-16 pb-12 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#7C3AED] p-0.5">
                <div className="w-full h-full bg-[#0A0A10] rounded-[10px] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
                </div>
              </div>
              <span className="text-xl font-black text-white">
                Gran<span className="text-[#F59E0B]">App</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              PWA de inteligência financeira para motoristas e entregadores de aplicativo. Multiplique seus lucros e pare de pagar para trabalhar.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#10B981] font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Tecnologia PWA Instalável sem App Store</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Navegação Rápida</h4>
            <ul className="space-y-2.5">
              <li><a href="#calculadora" className="hover:text-[#F59E0B] transition-colors">Calculadora GranScore</a></li>
              <li><a href="#meta-tracker" className="hover:text-[#F59E0B] transition-colors">Meta Tracker Diário</a></li>
              <li><a href="#camara-secreta" className="hover:text-[#F59E0B] transition-colors">Cámara Secreta dos Motoristas</a></li>
              <li><a href="#granbot-ai" className="hover:text-[#F59E0B] transition-colors">IA GranBot Gemini</a></li>
              <li><a href="#depoimentos" className="hover:text-[#F59E0B] transition-colors">10 Depoimentos Reais</a></li>
              <li><a href="#planos" className="hover:text-[#F59E0B] transition-colors">Planos & Preços</a></li>
              <li><a href="#faq" className="hover:text-[#F59E0B] transition-colors">FAQ (13 Perguntas)</a></li>
            </ul>
          </div>

          {/* Col 3: Supported Apps & Country Selector */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">País & Moeda Local</h4>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {Object.values(COUNTRIES).map((c) => (
                  <button
                    key={c.code}
                    onClick={() => onCountryChange(c)}
                    className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 border ${
                      country.code === c.code
                        ? 'bg-[#7C3AED]/30 border-[#7C3AED] text-[#F59E0B]'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span>{c.code}</span>
                  </button>
                ))}
              </div>

              <p className="text-[11px] text-gray-500 pt-2">
                Moeda ativa: <span className="text-[#F59E0B] font-bold font-mono">{country.currencySymbol} ({country.currencyCode})</span>
              </p>
            </div>
          </div>

          {/* Col 4: Admin & PWA Actions */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Ações do Sistema</h4>
            <div className="space-y-3">
              <button
                onClick={onOpenPwaInstall}
                className="w-full py-2.5 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold rounded-2xl text-xs shadow-md transition-all text-center"
              >
                📲 Instalar PWA no Celular
              </button>

              <button
                onClick={onToggleAdmin}
                className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 text-[#F59E0B] font-bold rounded-2xl text-xs border border-white/10 transition-all text-center"
              >
                📊 Painel Admin & Métricas
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-gray-500">
          <p>© {new Date().getFullYear()} GranApp Inc. Todos os direitos reservados.</p>
          <div className="flex items-center gap-1 text-gray-400">
            <span>Desenvolvido com</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>para motoristas do mundo todo</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
