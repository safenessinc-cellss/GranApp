import React from 'react';
import { CountryConfig } from '../types';
import { formatCurrency } from '../data/countries';
import { Check, Zap, Sparkles, ShieldCheck, ArrowRight, Gift } from 'lucide-react';

interface PricingProps {
  country: CountryConfig;
  onOpenRegisterWithPlan: (planName: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ country, onOpenRegisterWithPlan }) => {
  const lang = country.lang;
  const p = country.pricing;

  const labels = {
    pt: {
      tag: '7 DIAS GRÁTIS EM QUALQUER PLANO',
      title: 'Invista menos de R$ 1 por dia e ganhe R$ 1.800+ a mais todo mês!',
      subtitle: 'Sem fidelidade. Cancele com 1 clique a qualquer momento se não aumentar seus lucros.',
      monthlyTitle: 'Plano Mensal',
      quarterlyTitle: 'Plano Trimestral',
      annualTitle: 'Plano Anual',
      popularBadge: 'MAIS ESCOLHIDO • 24% OFF',
      discount7: '7% OFF',
      discount24: '24% OFF',
      perMonth: '/ mês',
      billedPeriodically: (period: string) => `Cobrado ${period} no valor total`,
      cta: 'Começar 7 Dias Grátis',
      features: [
        'Cálculos ilimitados de GranScore (24/7)',
        'Meta Tracker diário com sincronização',
        'Acesso total à Cámara Secreta de Taxas',
        'Assistente de IA GranBot Gemini',
        'Suporte VIP via WhatsApp direto'
      ]
    },
    es: {
      tag: '7 DÍAS GRATIS EN CUALQUIER PLAN',
      title: '¡Invierte menos de un café al día y multiplica tus ingresos!',
      subtitle: 'Sin permanencia. Cancela con 1 clic en cualquier momento si no aumentas tus ganancias.',
      monthlyTitle: 'Plan Mensual',
      quarterlyTitle: 'Plan Trimestral',
      annualTitle: 'Plan Anual',
      popularBadge: 'MÁS ELEGIDO • 24% OFF',
      discount7: '7% OFF',
      discount24: '24% OFF',
      perMonth: '/ mes',
      billedPeriodically: (period: string) => `Facturado ${period} por el total`,
      cta: 'Comenzar 7 Días Gratis',
      features: [
        'Cálculos ilimitados de GranScore (24/7)',
        'Meta Tracker diario con sincronización',
        'Acceso total a la Cámara Secreta',
        'Asistente de IA GranBot Gemini',
        'Soporte VIP por WhatsApp directo'
      ]
    },
    en: {
      tag: '7-DAY RISK-FREE TRIAL ON ALL PLANS',
      title: 'Invest less than a dollar a day to earn $500+ more every month!',
      subtitle: 'No commitments. Cancel anytime in 1 click if you don\'t boost your net profits.',
      monthlyTitle: 'Monthly Plan',
      quarterlyTitle: 'Quarterly Plan',
      annualTitle: 'Annual Plan',
      popularBadge: 'MOST POPULAR • 24% OFF',
      discount7: '7% OFF',
      discount24: '24% OFF',
      perMonth: '/ month',
      billedPeriodically: (period: string) => `Billed ${period}`,
      cta: 'Start 7-Day Free Trial',
      features: [
        'Unlimited 24/7 GranScore evaluations',
        'Daily Goal Meta Tracker with cloud sync',
        'Full access to Secret Chamber intel',
        'GranBot AI Gemini Ride Assistant',
        'Direct VIP WhatsApp Member Support'
      ]
    }
  }[lang];

  return (
    <section id="planos" className="py-16 bg-[#0A0A10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-black text-[#F59E0B] mb-3 shadow-lg">
            <Gift className="w-4 h-4 text-[#F59E0B] animate-bounce" />
            <span>{labels.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {labels.title}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mt-2">
            {labels.subtitle}
          </p>
        </div>

        {/* 3 Tiers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Tier 1: Monthly */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:border-[#7C3AED]/40 transition-all shadow-xl backdrop-blur-md">
            <div>
              <h3 className="text-xl font-black text-white">{labels.monthlyTitle}</h3>
              <p className="text-xs text-gray-400 mt-1">Flexibilidade total mês a mês</p>

              <div className="my-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white font-mono">
                    {formatCurrency(p.monthly, country)}
                  </span>
                  <span className="text-xs text-gray-400">{labels.perMonth}</span>
                </div>
                <p className="text-[11px] text-[#F59E0B] font-bold mt-1">✓ 7 Días Grátis Incluídos</p>
              </div>

              <ul className="space-y-3 pt-4 border-t border-white/10 text-xs text-gray-300">
                {labels.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onOpenRegisterWithPlan('Mensal')}
              className="mt-8 w-full py-3.5 bg-white/10 hover:bg-[#7C3AED] text-white font-bold text-xs rounded-2xl border border-white/10 transition-all"
            >
              {labels.cta}
            </button>
          </div>

          {/* Tier 2: Annual (HIGHLIGHTED / POPULAR) */}
          <div className="bg-[#1E1B4B] border-2 border-[#7C3AED] rounded-3xl p-8 flex flex-col justify-between shadow-[0_0_30px_rgba(124,58,237,0.35)] relative transform md:-translate-y-2 backdrop-blur-md">
            
            {/* Badge Top */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#7C3AED] text-white font-black text-[11px] px-4 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>{labels.popularBadge}</span>
            </div>

            <div>
              <h3 className="text-2xl font-black text-white">{labels.annualTitle}</h3>
              <p className="text-xs text-gray-300 mt-1">Economia máxima com trava de preço local</p>

              <div className="my-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-white font-mono">
                    {formatCurrency(p.annualMonthly, country)}
                  </span>
                  <span className="text-xs text-gray-300">{labels.perMonth}</span>
                </div>
                <p className="text-xs text-[#10B981] font-bold mt-1">
                  🎉 {labels.discount24} • Maior Lucratividade
                </p>
              </div>

              <ul className="space-y-3 pt-4 border-t border-white/15 text-xs text-gray-200">
                {labels.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#F59E0B] shrink-0 stroke-[3]" />
                    <span className="font-semibold">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onOpenRegisterWithPlan('Anual')}
              className="mt-8 w-full py-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-sm rounded-2xl shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all transform hover:scale-[1.02]"
            >
              {labels.cta}
            </button>
          </div>

          {/* Tier 3: Quarterly */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:border-[#7C3AED]/40 transition-all shadow-xl backdrop-blur-md">
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black text-white">{labels.quarterlyTitle}</h3>
                <span className="bg-[#7C3AED]/20 text-[#7C3AED] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#7C3AED]/30">
                  {labels.discount7}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Plano intermediário balanceado</p>

              <div className="my-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white font-mono">
                    {formatCurrency(p.quarterlyMonthly, country)}
                  </span>
                  <span className="text-xs text-gray-400">{labels.perMonth}</span>
                </div>
                <p className="text-[11px] text-[#F59E0B] font-bold mt-1">✓ 7 Días Grátis Incluídos</p>
              </div>

              <ul className="space-y-3 pt-4 border-t border-white/10 text-xs text-gray-300">
                {labels.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onOpenRegisterWithPlan('Trimestral')}
              className="mt-8 w-full py-3.5 bg-white/10 hover:bg-[#7C3AED] text-white font-bold text-xs rounded-2xl border border-white/10 transition-all"
            >
              {labels.cta}
            </button>
          </div>

        </div>

        {/* Security & Guarantee Note */}
        <div className="mt-12 text-center text-xs text-slate-400 flex flex-wrap items-center justify-center gap-6">
          <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Garantia Incondicional de 7 Dias
          </span>
          <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
            <Zap className="w-4 h-4 text-amber-400" />
            Ativação PWA Instantânea
          </span>
        </div>

      </div>
    </section>
  );
};
