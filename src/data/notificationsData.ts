import { NotificationItem, NotificationPreferences } from '../types';

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  enabled: true,
  dailyGoals: true,
  granscoreAlerts: true,
  platformUpdates: true,
  peakHourTips: true,
  soundEnabled: true,
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    category: 'daily_goal',
    title: {
      pt: '🎯 Lembrete de Meta Diária',
      es: '🎯 Recordatorio de Meta Diaria',
      en: '🎯 Daily Goal Reminder',
    },
    message: {
      pt: 'Você atingiu 65% da sua meta hoje! Faltam poucas corridas para fechar o dia com lucro máximo.',
      es: '¡Has alcanzado el 65% de tu meta hoy! Te faltan pocas carreras para cerrar el día con máximo beneficio.',
      en: 'You reached 65% of your daily goal! A few more rides to lock in maximum daily profit.',
    },
    timestamp: 'Há 15 min',
    read: false,
    actionUrl: '#meta-tracker',
  },
  {
    id: 'notif-2',
    category: 'granscore',
    title: {
      pt: '⚡ Alerta GranScore em Tempo Real',
      es: '⚡ Alerta GranScore en Tiempo Real',
      en: '⚡ Real-time GranScore Alert',
    },
    message: {
      pt: 'Sua última corrida registrou GranScore 92 pts! Excelente margem de lucro líquido por Km.',
      es: '¡Tu última carrera registró GranScore 92 pts! Excelente margen de ganancia neta por Km.',
      en: 'Your last ride achieved GranScore 92 pts! Excellent net profit margin per Km.',
    },
    timestamp: 'Há 1 hora',
    read: false,
    actionUrl: '#calculadora',
  },
  {
    id: 'notif-3',
    category: 'peak_hour',
    title: {
      pt: '🔥 Dica de Rentabilidade Horário de Pico',
      es: '🔥 Consejos de Rentabilidad Hora Punta',
      en: '🔥 Peak Hour Profitability Tip',
    },
    message: {
      pt: 'Horário de alta demanda iniciado na sua região! Ative Uber + 99 simultaneamente para pegar os maiores dinâmicos.',
      es: '¡Horario de alta demanda en tu zona! Activa Uber + 99 en simultáneo para tomar los mejores dinámicos.',
      en: 'High demand surge started in your region! Enable Uber + Lyft/99 simultaneously for peak multipliers.',
    },
    timestamp: 'Há 3 horas',
    read: true,
    actionUrl: '#granbot-ai',
  },
  {
    id: 'notif-4',
    category: 'platform_update',
    title: {
      pt: '🚀 Nova Atualização: GranBot Gemini 2.5',
      es: '🚀 Nueva Actualización: GranBot Gemini 2.5',
      en: '🚀 New Update: GranBot Gemini 2.5',
    },
    message: {
      pt: 'Lançamos a análise instantânea de prints de corridas e cálculo de impostos do MEI/Tax. Confira no app!',
      es: '¡Lanzamos el análisis instantáneo de capturas y cálculo de impuestos! ¡Pruébalo en la app!',
      en: 'We launched instant screenshot analysis and vehicle tax optimization! Check it out in the app!',
    },
    timestamp: 'Ontem',
    read: true,
    actionUrl: '#granbot-ai',
  },
];
