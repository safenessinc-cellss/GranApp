import React, { useState } from 'react';
import { CountryConfig, NotificationItem, NotificationPreferences, NotificationCategory } from '../types';
import { 
  Bell, 
  X, 
  Check, 
  CheckCheck, 
  Trash2, 
  Send, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Target, 
  Zap, 
  Flame, 
  TrendingUp, 
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface NotificationCenterModalProps {
  country: CountryConfig;
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  preferences: NotificationPreferences;
  onUpdatePreferences: (prefs: NotificationPreferences) => void;
  onMarkAllAsRead: () => void;
  onClearNotifications: () => void;
  onTriggerTestNotification: (category: NotificationCategory) => void;
  onSelectActionUrl?: (url: string) => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  country,
  isOpen,
  onClose,
  notifications,
  preferences,
  onUpdatePreferences,
  onMarkAllAsRead,
  onClearNotifications,
  onTriggerTestNotification,
  onSelectActionUrl,
}) => {
  const [activeTab, setActiveTab] = useState<'feed' | 'settings'>('feed');
  const [permissionState, setPermissionState] = useState<string>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'default';
  });

  if (!isOpen) return null;

  const lang = country.lang;

  const requestPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const result = await Notification.requestPermission();
        setPermissionState(result);
        if (result === 'granted') {
          onUpdatePreferences({ ...preferences, enabled: true });
        }
      } catch (e) {
        console.warn('Error requesting notification permission', e);
      }
    }
  };

  const labels = {
    pt: {
      title: 'Central de Notificações Push PWA',
      subtitle: 'Alertas em tempo real sobre metas, GranScore e picos de tarifa',
      feedTab: 'Histórico & Alertas',
      settingsTab: 'Configurações Push',
      permGranted: 'Notificações Push Ativas no PWA',
      permDenied: 'Notificações Bloqueadas no Navegador',
      permPrompt: 'Ativar Notificações no Navegador',
      permDesc: 'Receba avisos instantâneos de metas e tarifas sem precisar abrir o app.',
      markRead: 'Marcar Lidas',
      clearAll: 'Limpar Histórico',
      empty: 'Nenhuma notificação recente.',
      testPushTitle: 'Simular Disparo Push Instantâneo',
      testPushSub: 'Teste como os alertas em tempo real aparecem no seu dispositivo:',
      btnGoal: '🎯 Alerta Meta Diária',
      btnScore: '⚡ Alerta GranScore (92 pts)',
      btnPeak: '🔥 Dica Horário de Pico',
      btnUpdate: '🚀 Atualização do PWA',
      toggleMaster: 'Ativar Notificações Push Globais',
      toggleGoals: '🎯 Lembretes de Meta Diária (Progresso & Faltantes)',
      toggleScore: '⚡ Alertas de GranScore & Corridas Lucrativas',
      toggleTips: '🔥 Dicas de Rentabilidade & Horário de Pico',
      toggleUpdates: '🚀 Novidades & Atualizações da Plataforma',
      toggleSound: '🔔 Sons de Alerta de Alta Prioridade',
      activeCountry: 'Notificações personalizadas para',
    },
    es: {
      title: 'Centro de Notificaciones Push PWA',
      subtitle: 'Alertas en tiempo real de metas, GranScore y horas punta',
      feedTab: 'Historial y Alertas',
      settingsTab: 'Ajustes Push',
      permGranted: 'Notificaciones Push Activas en PWA',
      permDenied: 'Notificaciones Bloqueadas en Navegador',
      permPrompt: 'Activar Notificaciones en Navegador',
      permDesc: 'Recibe avisos instantáneos de metas y tarifas sin abrir la app.',
      markRead: 'Marcar Leídas',
      clearAll: 'Limpiar Historial',
      empty: 'No hay notificaciones recientes.',
      testPushTitle: 'Simular Envío Push Instantáneo',
      testPushSub: 'Prueba cómo se ven las alertas en tiempo real en tu dispositivo:',
      btnGoal: '🎯 Alerta Meta Diaria',
      btnScore: '⚡ Alerta GranScore (92 pts)',
      btnPeak: '🔥 Consejo Hora Punta',
      btnUpdate: '🚀 Actualización PWA',
      toggleMaster: 'Activar Notificaciones Push Globales',
      toggleGoals: '🎯 Recordatorios de Meta Diaria',
      toggleScore: '⚡ Alertas de GranScore y Carreras Rentables',
      toggleTips: '🔥 Consejos de Rentabilidad y Hora Punta',
      toggleUpdates: '🚀 Novedades y Actualizaciones del PWA',
      toggleSound: '🔔 Sonidos de Alerta de Alta Prioridad',
      activeCountry: 'Notificaciones personalizadas para',
    },
    en: {
      title: 'PWA Push Notification Center',
      subtitle: 'Real-time alerts for goals, GranScore changes, and peak hours',
      feedTab: 'History & Alerts',
      settingsTab: 'Push Settings',
      permGranted: 'PWA Push Notifications Active',
      permDenied: 'Notifications Blocked in Browser',
      permPrompt: 'Enable Browser Notifications',
      permDesc: 'Receive instant alerts for goals and fares without opening the app.',
      markRead: 'Mark as Read',
      clearAll: 'Clear History',
      empty: 'No recent notifications.',
      testPushTitle: 'Simulate Instant Push Notification',
      testPushSub: 'Test how real-time alerts appear on your device:',
      btnGoal: '🎯 Daily Goal Alert',
      btnScore: '⚡ GranScore Alert (92 pts)',
      btnPeak: '🔥 Peak Hour Tip',
      btnUpdate: '🚀 Platform Update',
      toggleMaster: 'Enable Global Push Notifications',
      toggleGoals: '🎯 Daily Goal Reminders (Progress & Targets)',
      toggleScore: '⚡ GranScore & High Yield Alerts',
      toggleTips: '🔥 Profitability & Peak Hour Tips',
      toggleUpdates: '🚀 Platform News & Feature Updates',
      toggleSound: '🔔 High Priority Alert Sounds',
      activeCountry: 'Notifications tailored for',
    },
  }[lang];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getCategoryIcon = (category: NotificationCategory) => {
    switch (category) {
      case 'daily_goal':
        return <Target className="w-4 h-4 text-[#F59E0B]" />;
      case 'granscore':
        return <Zap className="w-4 h-4 text-[#7C3AED]" />;
      case 'peak_hour':
        return <Flame className="w-4 h-4 text-[#EF4444]" />;
      case 'platform_update':
        return <Sparkles className="w-4 h-4 text-[#10B981]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A10]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0A0A10] border border-white/10 rounded-3xl max-w-2xl w-full shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center relative">
              <Bell className="w-5 h-5 text-[#7C3AED]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EF4444] text-white text-[9px] font-black flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-lg font-black text-white">{labels.title}</h3>
              <p className="text-xs text-gray-400">{labels.subtitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-full bg-white/5 border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Browser Permission Status Banner */}
        <div className="mt-4 p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs">
            {permissionState === 'granted' ? (
              <>
                <ShieldCheck className="w-5 h-5 text-[#10B981] shrink-0" />
                <div>
                  <p className="font-bold text-[#10B981]">{labels.permGranted}</p>
                  <p className="text-[10px] text-gray-400">{labels.activeCountry} {country.flag} {country.name}</p>
                </div>
              </>
            ) : permissionState === 'denied' ? (
              <>
                <AlertCircle className="w-5 h-5 text-[#EF4444] shrink-0" />
                <div>
                  <p className="font-bold text-[#EF4444]">{labels.permDenied}</p>
                  <p className="text-[10px] text-gray-400">Ative nas configurações do navegador para alertas em tela cheia.</p>
                </div>
              </>
            ) : (
              <>
                <Bell className="w-5 h-5 text-[#F59E0B] shrink-0 animate-bounce" />
                <div>
                  <p className="font-bold text-[#F59E0B]">{labels.permPrompt}</p>
                  <p className="text-[10px] text-gray-400">{labels.permDesc}</p>
                </div>
              </>
            )}
          </div>

          {permissionState !== 'granted' && (
            <button
              onClick={requestPermission}
              className="px-3 py-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0"
            >
              Ativar Agora
            </button>
          )}
        </div>

        {/* Nav Tabs */}
        <div className="flex items-center gap-2 my-4 border-b border-white/10 pb-2">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
              activeTab === 'feed'
                ? 'bg-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>{labels.feedTab}</span>
            {unreadCount > 0 && (
              <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-[10px]">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
              activeTab === 'settings'
                ? 'bg-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{labels.settingsTab}</span>
          </button>
        </div>

        {/* Tab 1: Feed & Notifications List */}
        {activeTab === 'feed' && (
          <div className="space-y-4">
            
            {/* Quick Actions bar */}
            <div className="flex items-center justify-between text-xs text-gray-400 px-1">
              <span>{notifications.length} notificações registradas</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={onMarkAllAsRead}
                  className="hover:text-[#F59E0B] font-bold flex items-center gap-1 transition-colors"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>{labels.markRead}</span>
                </button>
                <button
                  onClick={onClearNotifications}
                  className="hover:text-[#EF4444] font-bold flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{labels.clearAll}</span>
                </button>
              </div>
            </div>

            {/* Notification List */}
            <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1">
              {notifications.length === 0 ? (
                <div className="text-center py-12 text-gray-500 text-xs">
                  <Bell className="w-8 h-8 opacity-30 mx-auto mb-2" />
                  <p>{labels.empty}</p>
                </div>
              ) : (
                notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 relative ${
                      item.read
                        ? 'bg-white/5 border-white/10 opacity-80'
                        : 'bg-[#7C3AED]/10 border-[#7C3AED]/40 shadow-[0_0_15px_rgba(124,58,237,0.15)]'
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 shrink-0 mt-0.5">
                      {getCategoryIcon(item.category)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-bold text-white truncate">
                          {item.title[lang] || item.title.pt}
                        </h4>
                        <span className="text-[10px] text-gray-400 shrink-0 font-mono">
                          {item.timestamp}
                        </span>
                      </div>

                      <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                        {item.message[lang] || item.message.pt}
                      </p>

                      {item.actionUrl && (
                        <button
                          onClick={() => {
                            if (onSelectActionUrl) onSelectActionUrl(item.actionUrl!);
                            onClose();
                          }}
                          className="mt-2 inline-flex items-center gap-1 text-[11px] font-extrabold text-[#F59E0B] hover:underline"
                        >
                          <span>Acessar no App</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-[#7C3AED] shrink-0 mt-1"></span>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Live Simulation Test Push Section */}
            <div className="pt-3 border-t border-white/10">
              <p className="text-xs font-bold text-gray-300 mb-2">{labels.testPushTitle}</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onTriggerTestNotification('daily_goal')}
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-bold text-white flex items-center gap-1.5 transition-all"
                >
                  <span>{labels.btnGoal}</span>
                </button>

                <button
                  onClick={() => onTriggerTestNotification('granscore')}
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-bold text-white flex items-center gap-1.5 transition-all"
                >
                  <span>{labels.btnScore}</span>
                </button>

                <button
                  onClick={() => onTriggerTestNotification('peak_hour')}
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-bold text-white flex items-center gap-1.5 transition-all"
                >
                  <span>{labels.btnPeak}</span>
                </button>

                <button
                  onClick={() => onTriggerTestNotification('platform_update')}
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-bold text-white flex items-center gap-1.5 transition-all"
                >
                  <span>{labels.btnUpdate}</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Push Settings & Preferences */}
        {activeTab === 'settings' && (
          <div className="space-y-4 py-2 text-xs">
            
            <div className="flex items-center justify-between p-3.5 bg-white/5 border border-white/10 rounded-2xl">
              <div>
                <p className="font-extrabold text-white">{labels.toggleMaster}</p>
                <p className="text-[11px] text-gray-400">Notificações gerais no dispositivo</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.enabled}
                onChange={(e) => onUpdatePreferences({ ...preferences, enabled: e.target.checked })}
                className="w-5 h-5 accent-[#7C3AED] rounded cursor-pointer"
              />
            </div>

            <div className="space-y-2 pl-1">
              <label className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl cursor-pointer transition-colors">
                <span className="font-bold text-gray-200">{labels.toggleGoals}</span>
                <input
                  type="checkbox"
                  checked={preferences.dailyGoals}
                  onChange={(e) => onUpdatePreferences({ ...preferences, dailyGoals: e.target.checked })}
                  className="w-4 h-4 accent-[#7C3AED] rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl cursor-pointer transition-colors">
                <span className="font-bold text-gray-200">{labels.toggleScore}</span>
                <input
                  type="checkbox"
                  checked={preferences.granscoreAlerts}
                  onChange={(e) => onUpdatePreferences({ ...preferences, granscoreAlerts: e.target.checked })}
                  className="w-4 h-4 accent-[#7C3AED] rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl cursor-pointer transition-colors">
                <span className="font-bold text-gray-200">{labels.toggleTips}</span>
                <input
                  type="checkbox"
                  checked={preferences.peakHourTips}
                  onChange={(e) => onUpdatePreferences({ ...preferences, peakHourTips: e.target.checked })}
                  className="w-4 h-4 accent-[#7C3AED] rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl cursor-pointer transition-colors">
                <span className="font-bold text-gray-200">{labels.toggleUpdates}</span>
                <input
                  type="checkbox"
                  checked={preferences.platformUpdates}
                  onChange={(e) => onUpdatePreferences({ ...preferences, platformUpdates: e.target.checked })}
                  className="w-4 h-4 accent-[#7C3AED] rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl cursor-pointer transition-colors">
                <div className="flex items-center gap-2">
                  {preferences.soundEnabled ? <Volume2 className="w-4 h-4 text-[#F59E0B]" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
                  <span className="font-bold text-gray-200">{labels.toggleSound}</span>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.soundEnabled}
                  onChange={(e) => onUpdatePreferences({ ...preferences, soundEnabled: e.target.checked })}
                  className="w-4 h-4 accent-[#7C3AED] rounded"
                />
              </label>
            </div>

            <button
              onClick={onClose}
              className="w-full mt-4 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-xs rounded-2xl shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-all"
            >
              Salvar Configurações
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
