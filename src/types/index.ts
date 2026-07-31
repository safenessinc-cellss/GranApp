export type Language = 'pt' | 'es' | 'en';

export interface CountryConfig {
  code: string;
  name: string;
  flag: string;
  currencySymbol: string;
  currencyCode: string;
  lang: Language;
  defaultFuelPrice: number;
  fuelUnit: string; // 'L' or 'gal'
  platforms: string[];
  deliveryApps: string[];
  pricing: {
    monthly: number;
    quarterlyMonthly: number; // monthly equivalent when billed quarterly
    annualMonthly: number; // monthly equivalent when billed annually
  };
}

export interface GranScoreResult {
  score: number; // 0 - 100
  verdict: 'ACEITAR' | 'AVALIAR' | 'REJEITAR';
  color: 'green' | 'yellow' | 'red';
  hexColor: string;
  grossFare: number;
  totalKm: number;
  durationMin: number;
  fuelCost: number;
  fuelPercent: number;
  netProfit: number;
  netProfitPerHour: number;
  netProfitPerKm: number;
  platformFeeEstimate: number;
  summaryText: string;
  recommendation: string;
}

export interface GranScoreInput {
  fareValue: number;
  pickupKm: number;
  tripKm: number;
  durationMin: number;
  fuelPrice: number;
  fuelConsumption: number; // Km per L or MPG
}

export interface RideRecord {
  id: string;
  timestamp: string;
  platform: string;
  fareValue: number;
  totalKm: number;
  durationMin: number;
  netProfit: number;
  score: number;
  color: 'green' | 'yellow' | 'red';
}

export interface DailyGoal {
  targetAmount: number;
  currentAmount: number;
  fuelSpent: number;
  totalKmDriven: number;
  ridesCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  countryCode: string;
  city: string;
  vehicle: string;
  extraIncome: string;
  quote: {
    pt: string;
    es: string;
    en: string;
  };
  rating: number;
  platform: string;
}

export interface FaqItem {
  id: string;
  question: {
    pt: string;
    es: string;
    en: string;
  };
  answer: {
    pt: string;
    es: string;
    en: string;
  };
  category: 'granscore' | 'pwa' | 'pagamentos' | 'seguranca';
}

export interface PlanConfig {
  id: string;
  title: string;
  discountBadge?: string;
  popular?: boolean;
  type: 'monthly' | 'quarterly' | 'annual';
  features: string[];
}

export interface AdminStats {
  activeDrivers: number;
  analyzedRides: number;
  savedMoneyUSD: number;
  savedMoneyBRL: number;
  conversionRate: number;
  subscribers: {
    monthly: number;
    quarterly: number;
    annual: number;
  };
  countryStats: {
    code: string;
    name: string;
    drivers: number;
    conversion: string;
  }[];
  authorizedAdmins?: string[];
  leads: {
    id: string;
    name: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    platform: string;
    plan: string;
    status: string;
    role?: string;
    date: string;
  }[];
}

export type NotificationCategory = 'daily_goal' | 'granscore' | 'platform_update' | 'peak_hour';

export interface LocalizedText {
  pt: string;
  es: string;
  en: string;
}

export interface NotificationItem {
  id: string;
  category: NotificationCategory;
  title: LocalizedText;
  message: LocalizedText;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  countryCode?: string;
}

export interface NotificationPreferences {
  enabled: boolean;
  dailyGoals: boolean;
  granscoreAlerts: boolean;
  platformUpdates: boolean;
  peakHourTips: boolean;
  soundEnabled: boolean;
}

export type BadgeCategory = 'granscore' | 'rides' | 'meta_tracker' | 'exploration' | 'ai';

export interface Badge {
  id: string;
  iconName: string;
  category: BadgeCategory;
  title: LocalizedText;
  description: LocalizedText;
  requirementText: LocalizedText;
  xpValue: number;
  unlocked: boolean;
  unlockedAt?: string;
  currentProgress: number;
  maxProgress: number;
}

export interface UserProfile {
  name: string;
  avatar: string;
  mainPlatform: string;
  city: string;
  level: number;
  xp: number;
  unlockedBadges: string[];
}
