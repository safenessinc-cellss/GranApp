import React from 'react';
import { CountryConfig } from '../types';
import { formatCurrency } from '../data/countries';
import { Calculator, ShieldAlert, Users, Award } from 'lucide-react';

interface LiveStatsProps {
  country: CountryConfig;
}

export const LiveStats: React.FC<LiveStatsProps> = ({ country }) => {
  const lang = country.lang;

  const savedAmount = country.code === 'BR' ? 38400000 : country.code === 'US' ? 7200000 : country.code === 'MX' ? 120000000 : 9500000;

  const stats = [
    {
      icon: <Calculator className="w-6 h-6 text-[#7C3AED]" />,
      number: '14.8M+',
      label: {
        pt: 'Corridas Analisadas',
        es: 'Viajes Analizados',
        en: 'Rides Evaluated'
      }[lang],
      sub: {
        pt: 'Avaliadas em menos de 2 seg',
        es: 'Evaluadas en menos de 2 seg',
        en: 'Scored in under 2 secs'
      }[lang]
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-[#F59E0B]" />,
      number: formatCurrency(savedAmount, country),
      label: {
        pt: 'Economizados em Prejuízo',
        es: 'Ahorrados en Pérdidas',
        en: 'Saved in Bad Offers'
      }[lang],
      sub: {
        pt: 'Em combustível e desgaste evitado',
        es: 'En gasolina y desgaste evitado',
        en: 'In gas and wear avoided'
      }[lang]
    },
    {
      icon: <Users className="w-6 h-6 text-[#10B981]" />,
      number: '87.400+',
      label: {
        pt: 'Motoristas Ativos',
        es: 'Conductores Activos',
        en: 'Active Driver Members'
      }[lang],
      sub: {
        pt: 'Em 12 países da América e Europa',
        es: 'En 12 países de América y Europa',
        en: 'Across 12 countries'
      }[lang]
    },
    {
      icon: <Award className="w-6 h-6 text-[#7C3AED]" />,
      number: '99.4%',
      label: {
        pt: 'Aprovação dos Usuários',
        es: 'Aprobación de Usuarios',
        en: 'Member Satisfaction'
      }[lang],
      sub: {
        pt: 'Aumento médio de +38% no lucro',
        es: 'Aumento promedio de +38% en ingresos',
        en: '+38% average profit gain'
      }[lang]
    }
  ];

  return (
    <section className="py-12 bg-[#0A0A10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 hover:border-[#7C3AED]/40 p-6 rounded-3xl shadow-xl transition-all hover:-translate-y-1 backdrop-blur-md"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center mb-4">
                {stat.icon}
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {stat.number}
              </p>
              <p className="text-sm font-bold text-[#F59E0B] mt-1">
                {stat.label}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
