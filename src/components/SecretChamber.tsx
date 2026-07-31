import React, { useState } from 'react';
import { CountryConfig } from '../types';
import { SECRET_CHAMBER_DATA } from '../data/content';
import { formatCurrency } from '../data/countries';
import { Eye, ShieldAlert, Lock, Unlock, AlertOctagon, TrendingDown, Wrench } from 'lucide-react';

interface SecretChamberProps {
  country: CountryConfig;
  onOpenRegister: () => void;
}

export const SecretChamber: React.FC<SecretChamberProps> = ({ country, onOpenRegister }) => {
  const lang = country.lang;

  const [drivenKm, setDrivenKm] = useState<number>(150); // Daily driven Km for depreciation calc

  // Depreciation constants per Km
  const tireCostPerKm = country.code === 'US' ? 0.03 : country.code === 'MX' ? 0.45 : 0.12; // BRL
  const oilAndMaintenancePerKm = country.code === 'US' ? 0.05 : country.code === 'MX' ? 0.70 : 0.18;
  const carDepreciationPerKm = country.code === 'US' ? 0.08 : country.code === 'MX' ? 1.10 : 0.25;

  const totalDepreciationPerKm = tireCostPerKm + oilAndMaintenancePerKm + carDepreciationPerKm;
  const dailyWearCost = drivenKm * totalDepreciationPerKm;

  const labels = {
    pt: {
      tag: 'CONHECIMENTO EXCLUSIVO',
      title: 'Cámara Secreta dos Motoristas',
      subtitle: 'Descubra as taxas ocultas retidas pelas plataformas e a depreciação invisível do seu veículo a cada Km rodado.',
      tab1: 'Taxas Ocultas das Apps',
      tab2: 'Zonas & Dinâmicas',
      tab3: 'Depreciação Invisível',
      app: 'Plataforma',
      advertised: 'Taxa Anunciada',
      realObserved: 'Taxa Real Retida',
      calcDepTitle: 'Calculadora de Desgaste Oculto (Manutenção + Depreciação)',
      dailyKmInput: 'Km Rodados Hoje:',
      dailyWearTotal: 'Custo de Desgaste Invisível Hoje:',
      unlockTitle: 'Desbloqueie o Radar em Tempo Real no App!',
      unlockDesc: 'Membros GranApp possuem alerta em tempo real de mudança de tarifas e zonas de perigo.',
      unlockBtn: 'Desbloquear Acesso Total (7 Dias Grátis)'
    },
    es: {
      tag: 'CONOCIMIENTO EXCLUSIVO',
      title: 'Cámara Secreta de Conductores',
      subtitle: 'Descubre las comisiones ocultas retenidas por las plataformas y la depreciación invisible de tu auto por cada Km.',
      tab1: 'Comisiones Ocultas',
      tab2: 'Zonas y Tarifas Dinámicas',
      tab3: 'Depreciación Invisible',
      app: 'Plataforma',
      advertised: 'Comisión Anunciada',
      realObserved: 'Retención Real Observada',
      calcDepTitle: 'Calculadora de Desgaste Oculto (Mantenimiento + Depreciación)',
      dailyKmInput: 'Km Recorridos Hoy:',
      dailyWearTotal: 'Costo de Desgaste Invisible Hoy:',
      unlockTitle: '¡Desbloquea el Radar en Tiempo Real!',
      unlockDesc: 'Los miembros GranApp reciben alertas en tiempo real de tarifas dinámicas y zonas de riesgo.',
      unlockBtn: 'Desbloquear Acceso Total (7 Días Gratis)'
    },
    en: {
      tag: 'EXCLUSIVE DRIVER INTEL',
      title: 'Driver Secret Chamber',
      subtitle: 'Uncover hidden app commission cuts and invisible vehicle wear expenses on every mile driven.',
      tab1: 'App Hidden Cuts',
      tab2: 'Danger & Surge Zones',
      tab3: 'Invisible Car Wear',
      app: 'Platform',
      advertised: 'Advertised Cut',
      realObserved: 'Observed Real Cut',
      calcDepTitle: 'Invisible Car Wear Calculator (Tires, Brakes & Depreciation)',
      dailyKmInput: 'Miles/Km Driven Today:',
      dailyWearTotal: 'Invisible Car Wear Cost Today:',
      unlockTitle: 'Unlock Real-Time Radar in the App!',
      unlockDesc: 'GranApp members receive real-time alerts on fake surge maps and high-risk pickup zones.',
      unlockBtn: 'Unlock Full Access (7-Day Free Trial)'
    }
  }[lang];

  return (
    <section id="camara-secreta" className="py-16 bg-[#0A0A10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#F59E0B] mb-3">
            <Eye className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{labels.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {labels.title}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mt-2">
            {labels.subtitle}
          </p>
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Hidden Fees Table */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 p-6 rounded-3xl shadow-xl flex flex-col justify-between backdrop-blur-md">
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-rose-400" />
                <span>{labels.tab1}</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 uppercase font-extrabold">
                      <th className="py-2.5 px-3">{labels.app}</th>
                      <th className="py-2.5 px-3">{labels.advertised}</th>
                      <th className="py-2.5 px-3 text-rose-400">{labels.realObserved}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {SECRET_CHAMBER_DATA.hiddenFees.map((fee) => (
                      <tr key={fee.platform} className="hover:bg-[#7C3AED]/10 transition-colors">
                        <td className="py-3 px-3 font-extrabold text-white">{fee.platform}</td>
                        <td className="py-3 px-3 font-semibold text-gray-400">{fee.advertisedFee}</td>
                        <td className="py-3 px-3 font-black text-rose-400">{fee.realObservedFee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-gray-400 italic">
              * Dados consolidados a partir de mais de 100.000 resumos de corridas analisadas por motoristas da comunidade GranApp.
            </div>
          </div>

          {/* Right Column: Invisible Vehicle Wear Calculator */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 rounded-3xl shadow-2xl flex flex-col justify-between backdrop-blur-md">
            <div>
              <h3 className="text-base font-extrabold text-[#F59E0B] mb-3 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#F59E0B]" />
                <span>{labels.calcDepTitle}</span>
              </h3>

              <div className="space-y-4 my-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    {labels.dailyKmInput}
                  </label>
                  <input
                    type="number"
                    value={drivenKm}
                    onChange={(e) => setDrivenKm(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 bg-[#0A0A10] border border-white/15 rounded-xl text-white font-black text-lg focus:border-[#7C3AED] focus:outline-none"
                  />
                </div>

                <div className="bg-[#0A0A10] p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-300">
                    <span>Pneus & Freios:</span>
                    <span className="font-mono font-bold text-[#F59E0B]">
                      {formatCurrency(drivenKm * tireCostPerKm, country)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Óleo e Manutenção Preventiva:</span>
                    <span className="font-mono font-bold text-[#F59E0B]">
                      {formatCurrency(drivenKm * oilAndMaintenancePerKm, country)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Desvalorização do Veículo por Km:</span>
                    <span className="font-mono font-bold text-[#F59E0B]">
                      {formatCurrency(drivenKm * carDepreciationPerKm, country)}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex justify-between items-center text-sm font-extrabold">
                    <span className="text-white">{labels.dailyWearTotal}</span>
                    <span className="text-rose-400 text-lg font-black font-mono">
                      {formatCurrency(dailyWearCost, country)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Unlock Banner */}
            <div className="mt-4 pt-4 border-t border-white/10 text-center space-y-2">
              <p className="text-xs font-bold text-[#F59E0B]">
                {labels.unlockTitle}
              </p>
              <button
                onClick={onOpenRegister}
                className="w-full py-3 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-xs rounded-2xl shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-all"
              >
                {labels.unlockBtn}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
