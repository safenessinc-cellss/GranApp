import React, { useEffect } from 'react';
import { Badge, NotificationItem, Language } from '../types';
import { Trophy, Bell, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface AchievementToastProps {
  badge: Badge | null;
  notification: NotificationItem | null;
  lang: Language;
  onClose: () => void;
  onOpenProfile?: () => void;
  onOpenNotifications?: () => void;
}

export const AchievementToast: React.FC<AchievementToastProps> = ({
  badge,
  notification,
  lang,
  onClose,
  onOpenProfile,
  onOpenNotifications,
}) => {
  useEffect(() => {
    if (badge || notification) {
      const timer = setTimeout(() => {
        onClose();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [badge, notification, onClose]);

  if (!badge && !notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 duration-300">
      {badge ? (
        <div className="bg-[#0A0A10] border-2 border-[#F59E0B] p-4 rounded-3xl shadow-[0_0_30px_rgba(245,158,11,0.3)] flex items-start gap-3 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-[#7C3AED] text-[#F59E0B] border border-[#F59E0B] flex items-center justify-center shrink-0 shadow-lg">
            <Trophy className="w-6 h-6 animate-bounce" />
          </div>

          <div className="flex-1 pr-4">
            <span className="text-[10px] font-black uppercase text-[#F59E0B] tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              NOVA CONQUISTA DESBLOQUEADA!
            </span>
            <h4 className="text-xs font-black text-white mt-0.5">
              {badge.title[lang] || badge.title.pt}
            </h4>
            <p className="text-[11px] text-gray-300 mt-1">
              +{badge.xpValue} XP adicionados ao seu nível de motorista.
            </p>

            {onOpenProfile && (
              <button
                onClick={() => {
                  onOpenProfile();
                  onClose();
                }}
                className="mt-2 text-[10px] font-bold text-[#7C3AED] hover:underline"
              >
                Ver Galeria de Emblemas →
              </button>
            )}
          </div>
        </div>
      ) : notification ? (
        <div className="bg-[#0A0A10] border border-[#7C3AED] p-4 rounded-3xl shadow-[0_0_25px_rgba(124,58,237,0.3)] flex items-start gap-3 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[#7C3AED] flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5 animate-pulse" />
          </div>

          <div className="flex-1 pr-4">
            <span className="text-[10px] font-bold text-[#7C3AED] uppercase tracking-wider">
              NOTIFICAÇÃO PWA
            </span>
            <h4 className="text-xs font-bold text-white mt-0.5">
              {notification.title[lang] || notification.title.pt}
            </h4>
            <p className="text-[11px] text-gray-300 mt-0.5 leading-relaxed">
              {notification.message[lang] || notification.message.pt}
            </p>

            {onOpenNotifications && (
              <button
                onClick={() => {
                  onOpenNotifications();
                  onClose();
                }}
                className="mt-2 text-[10px] font-bold text-[#F59E0B] hover:underline"
              >
                Abrir Central de Notificações →
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
