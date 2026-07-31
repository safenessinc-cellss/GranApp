import React from 'react';
import { CountryConfig } from '../types';
import { 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Calculator, 
  CheckCircle2, 
  Smartphone,
  Star
} from 'lucide-react';

interface HeroProps {
  country: CountryConfig;
  onOpenRegister: () => void;
  onOpenPwaInstall: () => void;
}

export const Hero: React.FC<HeroProps> = ({ country, onOpenRegister, onOpenPwaInstall }) => {
  const lang = country.lang;

  const content = {
    pt: {
      badge: 'PROVADO POR MAIS DE 87.000 MOTORISTAS',
      title1: 'Multiplique seus lucros em cada corrida.',
      titleHighlight: 'Não pague para trabalhar!',
      subtitle: 'O PWA definitivo para motoristas de Uber, 99, DiDi e entregadores. O algoritmo GranScore avalia em 2 segundos se a corrida vale a pena ou é prejuízo antes de aceitar no semáforo.',
      ctaPrimary: 'Provar 7 Dias Grátis',
      ctaSecondary: 'Calcular Minha Corrida',
      feature1: 'Cálculo de Lucro Líquido Real',
      feature2: 'Funciona Offline e no iPhone/Android',
      feature3: 'Ajuste Automático de Moeda Local',
      cardTitle: 'Análise Instantânea GranScore',
      cardScoreText: 'CORRIDA DE OURO',
      cardProfitLabel: 'Lucro Líquido Real / Hora',
      cardKmLabel: 'Gasto de Gasolina',
      cardVerdict: 'ACEITE IMEDIATAMENTE'
    },
    es: {
      badge: 'PROBADO POR MÁS DE 87,000 CONDUCTORES',
      title1: 'Multiplica tus ganancias en cada viaje.',
      titleHighlight: '¡No pagues por trabajar!',
      subtitle: 'La PWA definitiva para conductores de Uber, DiDi, Lyft, Cabify e InDrive. El algoritmo GranScore calcula en 2 segundos si el viaje genera ganancia o pérdida antes de aceptar.',
      ctaPrimary: 'Probar 7 Días Gratis',
      ctaSecondary: 'Calcular Mi Viaje',
      feature1: 'Cálculo de Ganancia Neta Real',
      feature2: 'Funciona Offline en iPhone y Android',
      feature3: 'Ajuste Automático a Moneda Local',
      cardTitle: 'Análisis Instantáneo GranScore',
      cardScoreText: 'VIAJE DE ORO',
      cardProfitLabel: 'Ganancia Neta / Hora',
      cardKmLabel: 'Gasto de Combustible',
      cardVerdict: 'ACEPTA DE INMEDIATO'
    },
    en: {
      badge: 'TRUSTED BY OVER 87,000 GIG DRIVERS',
      title1: 'Multiply your net profits on every ride.',
      titleHighlight: 'Stop paying to work!',
      subtitle: 'The ultimate driver PWA for Uber, Lyft, DoorDash & DiDi drivers. GranScore evaluates in 2 seconds whether a ride offer pays real profit before you accept.',
      ctaPrimary: 'Start 7-Day Free Trial',
      ctaSecondary: 'Calculate My Ride',
      feature1: 'Real Net Hourly Profit Metric',
      feature2: 'Works Offline on iOS & Android',
      feature3: 'Auto-adapts to Local Currency',
      cardTitle: 'Instant GranScore Analysis',
      cardScoreText: 'GOLDEN RIDE OFFER',
      cardProfitLabel: 'Real Net Profit / Hour',
      cardKmLabel: 'Gas Expenses',
      cardVerdict: 'ACCEPT IMMEDIATELY'
    }
  }[lang];

  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      {/* Background Neon Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-[250px] h-[250px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Call To Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-extrabold text-[#F59E0B] shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] animate-spin" style={{ animationDuration: '4s' }} />
              <span>{content.badge}</span>
              <span className="text-gray-500">|</span>
              <span className="text-white flex items-center gap-1">
                {country.flag} {country.name} ({country.currencySymbol})
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              {content.title1}{' '}
              <span className="block mt-2 bg-gradient-to-r from-white via-slate-100 to-[#7C3AED] bg-clip-text text-transparent">
                {content.titleHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl font-medium leading-relaxed">
              {content.subtitle}
            </p>

            {/* Key Benefits List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-200 bg-white/5 border border-white/10 p-3 rounded-2xl">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>{content.feature1}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-200 bg-white/5 border border-white/10 p-3 rounded-2xl">
                <Smartphone className="w-4 h-4 text-[#7C3AED] shrink-0" />
                <span>{content.feature2}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-200 bg-white/5 border border-white/10 p-3 rounded-2xl">
                <TrendingUp className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>{content.feature3}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenRegister}
                className="flex items-center justify-center gap-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-base px-8 py-4 rounded-2xl shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Zap className="w-5 h-5 fill-white" />
                <span>{content.ctaPrimary}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="#calculadora"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/10 font-bold text-base px-6 py-4 rounded-2xl transition-all"
              >
                <Calculator className="w-5 h-5 text-[#F59E0B]" />
                <span>{content.ctaSecondary}</span>
              </a>
            </div>

            {/* Micro Social Proof */}
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="Driver" />
                <img className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" alt="Driver" />
                <img className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100" alt="Driver" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-extrabold text-white ml-1">4.9/5.0</span>
                </div>
                <span>+14,800,000 corridas analisadas este mês</span>
              </div>
            </div>

          </div>

          {/* Right Column: Floating Interactive GranScore Teaser Widget */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md bg-white/5 border border-white/10 rounded-3xl p-6 shadow-[0_0_30px_rgba(124,58,237,0.2)] backdrop-blur-md">
              
              {/* Header inside Card */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#10B981] animate-pulse"></div>
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                    {content.cardTitle}
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-[#7C3AED]/20 text-[#7C3AED] px-2.5 py-1 rounded-full border border-[#7C3AED]/30 font-bold">
                  {country.flag} {country.currencyCode}
                </span>
              </div>

              {/* GranScore Teaser Circular Gauge */}
              <div className="py-6 flex flex-col items-center justify-center">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  {/* Outer Glowing Ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 animate-pulse"></div>
                  <div className="absolute inset-2 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" style={{ animationDuration: '10s' }}></div>
                  
                  {/* Score Number Display */}
                  <div className="text-center">
                    <span className="text-5xl font-black text-emerald-400 tracking-tight">
                      94
                    </span>
                    <span className="block text-[11px] font-extrabold text-emerald-300 uppercase tracking-widest mt-0.5">
                      {content.cardScoreText}
                    </span>
                  </div>
                </div>

                {/* Verdict Badge */}
                <div className="mt-4 bg-emerald-500 text-slate-950 font-black text-xs px-4 py-1.5 rounded-full shadow-lg shadow-emerald-500/30 tracking-wider">
                  🟢 {content.cardVerdict}
                </div>
              </div>

              {/* Quick Metrics Inside Card */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl text-center">
                  <p className="text-[10px] text-slate-400 font-semibold">{content.cardProfitLabel}</p>
                  <p className="text-lg font-black text-emerald-400 mt-0.5">
                    {country.currencySymbol} {country.code === 'US' ? '28.50' : country.code === 'MX' ? '185' : '54,20'}
                  </p>
                </div>
                <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl text-center">
                  <p className="text-[10px] text-slate-400 font-semibold">{content.cardKmLabel}</p>
                  <p className="text-lg font-black text-amber-400 mt-0.5">
                    11.2% <span className="text-xs font-normal text-slate-400">do valor</span>
                  </p>
                </div>
              </div>

              {/* Supported App Logos Strip */}
              <div className="mt-5 pt-4 border-t border-slate-800/80">
                <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-wider mb-2">
                  {lang === 'pt' ? 'Compatível com todas as plataformas:' : lang === 'es' ? 'Compatible con todas las apps:' : 'Works with all local platforms:'}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {country.platforms.concat(country.deliveryApps).slice(0, 5).map((plat) => (
                    <span
                      key={plat}
                      className="text-[11px] font-bold bg-slate-950 text-slate-300 border border-slate-800 px-2.5 py-1 rounded-md"
                    >
                      {plat}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
