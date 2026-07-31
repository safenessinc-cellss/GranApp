import React from 'react';
import { CountryConfig } from '../types';
import { X, Smartphone, Download, Share, PlusSquare, CheckCircle2 } from 'lucide-react';

interface PWAInstallModalProps {
  country: CountryConfig;
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  country,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const lang = country.lang;

  const labels = {
    pt: {
      title: 'Instalar GranApp como PWA no Celular',
      subtitle: 'Sem precisar de Google Play Store ou Apple App Store. Funciona offline e responde super rápido!',
      iosTitle: 'Instalação no iPhone (iOS Safari):',
      iosStep1: '1. No navegador Safari, toque no ícone de Compartilhar (quadrado com seta para cima na barra inferior).',
      iosStep2: '2. Role para baixo e toque em "Adicionar à Tela de Início" (Add to Home Screen).',
      iosStep3: '3. Toque em "Adicionar" no canto superior direito. O ícone do GranApp aparecerá na sua tela inicial!',
      androidTitle: 'Instalação no Android (Chrome):',
      androidStep1: '1. Toque nos 3 pontinhos verticais no canto superior direito do Chrome.',
      androidStep2: '2. Selecione a opção "Instalar aplicativo" ou "Adicionar à tela inicial".',
      androidStep3: '3. Confirme a instalação. O app abrirá em tela cheia como um aplicativo nativo!',
      closeBtn: 'Entendi! Voltar ao App'
    },
    es: {
      title: 'Instalar GranApp como PWA en tu Celular',
      subtitle: 'Sin necesidad de Google Play o App Store. Funciona sin conexión y es súper rápido.',
      iosTitle: 'Instalación en iPhone (iOS Safari):',
      iosStep1: '1. En Safari, toca el ícono de Compartir (cuadrado con flecha hacia arriba).',
      iosStep2: '2. Desplázate hacia abajo y selecciona "Agregar a Inicio".',
      iosStep3: '3. Toca "Agregar" en la esquina superior derecha. ¡El ícono aparecerá en tu pantalla!',
      androidTitle: 'Instalación en Android (Chrome):',
      androidStep1: '1. Toca los 3 puntos en la esquina superior derecha de Chrome.',
      androidStep2: '2. Selecciona "Instalar aplicación" o "Agregar a pantalla principal".',
      androidStep3: '3. Confirma la instalación. ¡Abrirá en pantalla completa!',
      closeBtn: '¡Entendido! Volver'
    },
    en: {
      title: 'Install GranApp PWA on Mobile',
      subtitle: 'No App Store needed. Works offline and responds at blazing fast speed.',
      iosTitle: 'iPhone Installation (iOS Safari):',
      iosStep1: '1. In Safari, tap the Share icon (square with arrow pointing up).',
      iosStep2: '2. Scroll down and tap "Add to Home Screen".',
      iosStep3: '3. Tap "Add" top right. GranApp icon will appear on your home screen!',
      androidTitle: 'Android Installation (Chrome):',
      androidStep1: '1. Tap the 3 dots in the top right corner of Chrome.',
      androidStep2: '2. Select "Install app" or "Add to Home Screen".',
      androidStep3: '3. Confirm installation. Opens full screen as native app!',
      closeBtn: 'Got it! Back to App'
    }
  }[lang];

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A10]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0A0A10] border border-white/10 rounded-3xl max-w-lg w-full shadow-2xl p-6 sm:p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-[#7C3AED]" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">{labels.title}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{labels.subtitle}</p>
          </div>
        </div>

        <div className="space-y-6 my-6 text-xs text-gray-300">
          
          {/* iOS Card */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
            <h4 className="font-extrabold text-[#F59E0B] text-sm flex items-center gap-2">
              <Share className="w-4 h-4 text-[#F59E0B]" />
              <span>{labels.iosTitle}</span>
            </h4>
            <p>{labels.iosStep1}</p>
            <p>{labels.iosStep2}</p>
            <p className="text-[#10B981] font-semibold">{labels.iosStep3}</p>
          </div>

          {/* Android Card */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
            <h4 className="font-extrabold text-[#7C3AED] text-sm flex items-center gap-2">
              <Download className="w-4 h-4 text-[#7C3AED]" />
              <span>{labels.androidTitle}</span>
            </h4>
            <p>{labels.androidStep1}</p>
            <p>{labels.androidStep2}</p>
            <p className="text-[#10B981] font-semibold">{labels.androidStep3}</p>
          </div>

        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-xs rounded-2xl shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all"
        >
          {labels.closeBtn}
        </button>

      </div>
    </div>
  );
};
