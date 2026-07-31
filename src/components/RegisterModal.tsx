import React, { useState } from 'react';
import { CountryConfig } from '../types';
import { X, UserCheck, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { saveLeadToFirestore } from '../services/firebaseService';

interface RegisterModalProps {
  country: CountryConfig;
  isOpen: boolean;
  onClose: () => void;
  selectedPlanName?: string;
  onLeadCreated?: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  country,
  isOpen,
  onClose,
  selectedPlanName = 'Anual (24% OFF)',
  onLeadCreated,
}) => {
  if (!isOpen) return null;

  const lang = country.lang;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [platform, setPlatform] = useState(country.platforms[0] || 'Uber');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    try {
      const leadPayload = {
        name: name || 'Conductor GranApp',
        email,
        phone,
        country: country.code,
        city: city || 'N/A',
        platform,
        plan: selectedPlanName,
      };

      await saveLeadToFirestore(leadPayload);

      await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload),
      });

      if (onLeadCreated) onLeadCreated();
      setSubmitted(true);
    } catch (err) {
      console.warn('Lead submit', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const labels = {
    pt: {
      title: 'Ativar 7 Dias Grátis no GranApp',
      subtitle: `Sua conta PWA no Brasil com direito ao plano ${selectedPlanName}.`,
      name: 'Nome Completo',
      email: 'E-mail Principal',
      phone: 'WhatsApp com DDD',
      city: 'Sua Cidade Principal',
      platform: 'Aplicativo Principal',
      submitBtn: 'Iniciar Teste de 7 Dias Agora',
      successTitle: '🎉 CONTA ATIVADA COM SUCESSO!',
      successDesc: 'Sua licença de 7 dias grátis está ativa. Você já pode usar todas as funções do GranScore e Meta Tracker!',
      closeBtn: 'Entrar no PWA'
    },
    es: {
      title: 'Activar 7 Días Gratis en GranApp',
      subtitle: `Tu cuenta PWA con acceso al plan ${selectedPlanName}.`,
      name: 'Nombre Completo',
      email: 'Correo Electrónico',
      phone: 'WhatsApp con Código de País',
      city: 'Tu Ciudad',
      platform: 'Aplicación Principal',
      submitBtn: 'Comenzar Prueba de 7 Días Ahora',
      successTitle: '🎉 ¡CUENTA ACTIVADA CON ÉXITO!',
      successDesc: '¡Tu prueba de 7 días está activa! Ya puedes usar GranScore y Meta Tracker.',
      closeBtn: 'Ingresar a la PWA'
    },
    en: {
      title: 'Activate 7-Day Free Trial',
      subtitle: `Your PWA account with access to the ${selectedPlanName} plan.`,
      name: 'Full Name',
      email: 'Email Address',
      phone: 'WhatsApp / Phone',
      city: 'Primary City',
      platform: 'Primary App',
      submitBtn: 'Start 7-Day Free Trial Now',
      successTitle: '🎉 ACCOUNT ACTIVATED SUCCESSFULLY!',
      successDesc: 'Your 7-day risk-free trial is active! Start using GranScore and Meta Tracker immediately.',
      closeBtn: 'Open PWA Dashboard'
    }
  }[lang];

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A10]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0A0A10] border border-white/10 rounded-3xl max-w-lg w-full shadow-2xl p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-[#7C3AED]" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">{labels.title}</h3>
                <p className="text-xs text-[#F59E0B] font-semibold mt-0.5">{labels.subtitle}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">{labels.name}</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Carlos Silva"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-[#7C3AED] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">{labels.email}</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu.email@gmail.com"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-[#7C3AED] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">{labels.phone}</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+55 11 99999-8888"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-[#7C3AED] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">{labels.city}</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ex: São Paulo"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-[#7C3AED] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">{labels.platform}</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#0A0A10] border border-white/10 rounded-xl text-white text-sm focus:border-[#7C3AED] focus:outline-none font-bold"
                  >
                    {country.platforms.concat(country.deliveryApps).map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-4 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-50 text-white font-black text-sm rounded-2xl shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
                <span>{loading ? 'Ativando...' : labels.submitBtn}</span>
              </button>

              <p className="text-[10px] text-center text-gray-500">
                🔒 Seus dados estão seguros e protegidos. Teste sem cartão nos primeiros 7 dias.
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#10B981]/20 border-2 border-[#10B981] flex items-center justify-center mx-auto text-[#10B981]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-white">
              {labels.successTitle}
            </h3>

            <p className="text-xs text-gray-300 leading-relaxed max-w-sm mx-auto">
              {labels.successDesc}
            </p>

            <button
              onClick={onClose}
              className="w-full py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs rounded-2xl shadow-lg transition-all"
            >
              {labels.closeBtn}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
