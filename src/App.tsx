import React, { useState, useEffect } from 'react';
import { CountryConfig, RideRecord, NotificationItem, NotificationPreferences, UserProfile, Badge, NotificationCategory } from './types';
import { COUNTRIES, detectUserCountry } from './data/countries';
import { INITIAL_NOTIFICATIONS, DEFAULT_NOTIFICATION_PREFERENCES } from './data/notificationsData';
import { INITIAL_USER_PROFILE, ALL_BADGES, DRIVER_LEVELS } from './data/gamificationData';
import { saveRideToFirestore, saveUserProfileToFirestore, subscribeAuthState } from './services/firebaseService';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PressMedia } from './components/PressMedia';
import { LiveStats } from './components/LiveStats';
import { GranScoreCalculator } from './components/GranScoreCalculator';
import { GranBotAi } from './components/GranBotAi';
import { SecretChamber } from './components/SecretChamber';
import { MetaTracker } from './components/MetaTracker';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { FaqAccordion } from './components/FaqAccordion';
import { Footer } from './components/Footer';
import { FloatingWhatsapp } from './components/FloatingWhatsapp';

import { RegisterModal } from './components/RegisterModal';
import { PWAInstallModal } from './components/PWAInstallModal';
import { AdminPanel } from './components/AdminPanel';
import { NotificationCenterModal } from './components/NotificationCenterModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AchievementToast } from './components/AchievementToast';

export default function App() {
  // Auto detect user country or fallback to default
  const [currentCountry, setCurrentCountry] = useState<CountryConfig>(() => {
    return detectUserCountry();
  });

  // Saved Rides for Meta Tracker
  const [savedRides, setSavedRides] = useState<RideRecord[]>(() => {
    try {
      const stored = localStorage.getItem('granapp_rides');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Ride storage', e);
    }
    return [
      {
        id: '1',
        timestamp: '08:15',
        platform: 'Uber',
        fareValue: 28.50,
        totalKm: 10.5,
        durationMin: 22,
        netProfit: 23.20,
        score: 92,
        color: 'green'
      },
      {
        id: '2',
        timestamp: '09:05',
        platform: '99',
        fareValue: 42.00,
        totalKm: 16.0,
        durationMin: 30,
        netProfit: 32.80,
        score: 88,
        color: 'green'
      }
    ];
  });

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const stored = localStorage.getItem('granapp_notifications');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Notification storage', e);
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>(() => {
    try {
      const stored = localStorage.getItem('granapp_notification_prefs');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Notification prefs storage', e);
    }
    return DEFAULT_NOTIFICATION_PREFERENCES;
  });

  // Gamification User Profile & Badges
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem('granapp_user_profile');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Profile storage', e);
    }
    return INITIAL_USER_PROFILE;
  });

  const [badges, setBadges] = useState<Badge[]>(() => {
    try {
      const stored = localStorage.getItem('granapp_badges');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Badges storage', e);
    }
    return ALL_BADGES;
  });

  // Modals state
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('Anual (24% OFF)');
  const [isPwaInstallOpen, setIsPwaInstallOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // Real-time Toasts state
  const [activeToastBadge, setActiveToastBadge] = useState<Badge | null>(null);
  const [activeToastNotification, setActiveToastNotification] = useState<NotificationItem | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('granapp_rides', JSON.stringify(savedRides));
    } catch (e) {
      console.warn('Save ride err', e);
    }
  }, [savedRides]);

  useEffect(() => {
    try {
      localStorage.setItem('granapp_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.warn('Save notif err', e);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem('granapp_notification_prefs', JSON.stringify(notificationPreferences));
    } catch (e) {
      console.warn('Save notif prefs err', e);
    }
  }, [notificationPreferences]);

  useEffect(() => {
    try {
      localStorage.setItem('granapp_user_profile', JSON.stringify(userProfile));
    } catch (e) {
      console.warn('Save user profile err', e);
    }
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('granapp_badges', JSON.stringify(badges));
    } catch (e) {
      console.warn('Save badges err', e);
    }
  }, [badges]);

  // Gamification Engine: Check & Unlock Badges dynamically
  const evaluateBadges = (newRidesList: RideRecord[], extraAction?: 'ai' | 'secret') => {
    setBadges((prevBadges) => {
      let updatedXpBonus = 0;
      let newlyUnlockedBadge: Badge | null = null;

      const updated = prevBadges.map((badge) => {
        let currentProgress = badge.currentProgress;
        let shouldUnlock = badge.unlocked;

        if (badge.id === 'badge_first_score') {
          currentProgress = newRidesList.length > 0 ? 1 : 0;
          if (currentProgress >= 1) shouldUnlock = true;
        } else if (badge.id === 'badge_score_master') {
          currentProgress = newRidesList.filter((r) => r.score >= 80).length;
          if (currentProgress >= 3) shouldUnlock = true;
        } else if (badge.id === 'badge_high_yield') {
          currentProgress = newRidesList.filter((r) => r.score >= 90).length;
          if (currentProgress >= 1) shouldUnlock = true;
        } else if (badge.id === 'badge_marathon') {
          currentProgress = newRidesList.length;
          if (currentProgress >= 5) shouldUnlock = true;
        } else if (badge.id === 'badge_century') {
          currentProgress = newRidesList.length;
          if (currentProgress >= 10) shouldUnlock = true;
        } else if (badge.id === 'badge_goal_setter') {
          currentProgress = newRidesList.length > 0 ? 1 : 0;
          if (currentProgress >= 1) shouldUnlock = true;
        } else if (badge.id === 'badge_goal_crusher') {
          const totalProfitToday = newRidesList.reduce((acc, r) => acc + r.netProfit, 0);
          currentProgress = Math.min(100, Math.round((totalProfitToday / 250) * 100));
          if (currentProgress >= 100) shouldUnlock = true;
        } else if (badge.id === 'badge_secret_chamber' && extraAction === 'secret') {
          currentProgress = 1;
          shouldUnlock = true;
        } else if (badge.id === 'badge_ai_strategist' && extraAction === 'ai') {
          currentProgress = 1;
          shouldUnlock = true;
        }

        // Check if unlocked just now
        if (shouldUnlock && !badge.unlocked) {
          newlyUnlockedBadge = {
            ...badge,
            unlocked: true,
            unlockedAt: 'Hoje',
            currentProgress: badge.maxProgress,
          };
          updatedXpBonus += badge.xpValue;
          return newlyUnlockedBadge;
        }

        return { ...badge, currentProgress };
      });

      if (newlyUnlockedBadge) {
        setActiveToastBadge(newlyUnlockedBadge);
        setUserProfile((prevProfile) => {
          const newXp = prevProfile.xp + updatedXpBonus;
          let newLevel = prevProfile.level;
          for (const levelObj of DRIVER_LEVELS) {
            if (newXp >= levelObj.minXp) {
              newLevel = levelObj.level;
            }
          }
          return {
            ...prevProfile,
            xp: newXp,
            level: newLevel,
            unlockedBadges: [...prevProfile.unlockedBadges, (newlyUnlockedBadge as Badge).id],
          };
        });
      }

      return updated;
    });
  };

  const handleAddRide = (ride: RideRecord) => {
    const updated = [ride, ...savedRides];
    setSavedRides(updated);
    evaluateBadges(updated);
    saveRideToFirestore(ride);
  };

  const handleClearRides = () => {
    setSavedRides([]);
  };

  const handleOpenRegisterWithPlan = (planName: string) => {
    setSelectedPlan(planName);
    setIsRegisterOpen(true);
  };

  // Notification actions
  const handleMarkAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  const handleTriggerTestNotification = (category: NotificationCategory) => {
    const lang = currentCountry.lang;
    let title = { pt: '🎯 Alerta GranApp', es: '🎯 Alerta GranApp', en: '🎯 GranApp Alert' };
    let message = { pt: 'Notificação PWA processada!', es: '¡Notificación PWA procesada!', en: 'PWA Notification processed!' };

    if (category === 'daily_goal') {
      title = {
        pt: '🎯 Meta Diária: 75% Concluída!',
        es: '🎯 Meta Diaria: ¡75% Completada!',
        en: '🎯 Daily Goal: 75% Completed!',
      };
      message = {
        pt: `Faltam apenas ${currentCountry.currencySymbol} 45.00 para você bater sua meta hoje em ${currentCountry.name}!`,
        es: `¡Faltan solo ${currentCountry.currencySymbol} 45.00 para cumplir tu meta hoy en ${currentCountry.name}!`,
        en: `Only ${currentCountry.currencySymbol} 45.00 left to reach your goal today in ${currentCountry.name}!`,
      };
    } else if (category === 'granscore') {
      title = {
        pt: '⚡ GranScore 92 pts Detectado!',
        es: '⚡ ¡GranScore 92 pts Detectado!',
        en: '⚡ GranScore 92 pts Detected!',
      };
      message = {
        pt: 'Sua corrida teve margem de lucro líquido excelente com baixo desgaste do veículo.',
        es: 'Tu carrera tuvo un margen de ganancia excelente con bajo desgaste del vehículo.',
        en: 'Your ride achieved an outstanding net profit margin with minimal car wear.',
      };
    } else if (category === 'peak_hour') {
      title = {
        pt: '🔥 Pico de Demanda na sua Zona',
        es: '🔥 Pico de Demanda en tu Zona',
        en: '🔥 Peak Demand Surge in Your Area',
      };
      message = {
        pt: 'Oportunidade de multiplicar faturamento! Ative 99 + Uber simultaneamente.',
        es: '¡Oportunidad de multiplicar ganancias! Activa 99 + Uber en simultáneo.',
        en: 'Multiplier surge active! Turn on Uber + Lyft/99 simultaneously now.',
      };
    } else if (category === 'platform_update') {
      title = {
        pt: '🚀 GranBot Gemini 2.5 Atualizado',
        es: '🚀 GranBot Gemini 2.5 Actualizado',
        en: '🚀 GranBot Gemini 2.5 Updated',
      };
      message = {
        pt: 'Agora com análise de impostos locais e radar de áreas de risco.',
        es: 'Ahora con análisis de impuestos locales y radar de áreas de riesgo.',
        en: 'Now with local tax calculations and high-risk area radar.',
      };
    }

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      category,
      title,
      message,
      timestamp: 'Agora mesmo',
      read: false,
      actionUrl: category === 'daily_goal' ? '#meta-tracker' : '#calculadora',
      countryCode: currentCountry.code,
    };

    setNotifications((prev) => [newNotif, ...prev]);
    setActiveToastNotification(newNotif);

    // Browser Push Notification API invocation
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title[lang] || title.pt, {
          body: message[lang] || message.pt,
          icon: '/favicon.ico',
        });
      } catch (e) {
        console.warn('Native notification error', e);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A10] text-gray-100 selection:bg-[#7C3AED] selection:text-white relative">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.12),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(245,158,11,0.05),transparent_40%)] pointer-events-none z-0"></div>
      <div className="relative z-10">

        {/* 1. Header */}
        <Header
          currentCountry={currentCountry}
          onCountryChange={(country) => setCurrentCountry(country)}
          onOpenRegister={() => setIsRegisterOpen(true)}
          onOpenPwaInstall={() => setIsPwaInstallOpen(true)}
          onToggleAdmin={() => setIsAdminOpen(!isAdminOpen)}
          isAdminOpen={isAdminOpen}
          unreadNotificationsCount={notifications.filter((n) => !n.read).length}
          onOpenNotifications={() => setIsNotificationOpen(true)}
          driverLevel={userProfile.level}
          unlockedBadgesCount={badges.filter((b) => b.unlocked).length}
          onOpenProfile={() => setIsProfileOpen(true)}
        />

        <main>
          {/* 2. Hero */}
          <Hero
            country={currentCountry}
            onOpenRegister={() => setIsRegisterOpen(true)}
            onOpenPwaInstall={() => setIsPwaInstallOpen(true)}
          />

          {/* 3. Prensa / Mídia */}
          <PressMedia lang={currentCountry.lang} />

          {/* 4. Estadísticas (Live Stats) */}
          <LiveStats country={currentCountry} />

          {/* 5. Calculadora GranScore */}
          <GranScoreCalculator
            country={currentCountry}
            onSaveToMetaTracker={handleAddRide}
          />

          {/* 6. Assistente de IA GranBot (Gemini) */}
          <GranBotAi
            country={currentCountry}
            onAiConsultation={() => evaluateBadges(savedRides, 'ai')}
          />

          {/* 7. Cámara Secreta */}
          <SecretChamber
            country={currentCountry}
            onOpenRegister={() => setIsRegisterOpen(true)}
          />

          {/* 8. Meta Tracker */}
          <MetaTracker
            country={currentCountry}
            savedRides={savedRides}
            onAddRide={handleAddRide}
            onClearRides={handleClearRides}
          />

          {/* 9. Depoimentos (10 Motoristas Reais) */}
          <Testimonials country={currentCountry} />

          {/* 10. Planos de Assinatura (3 Níveis) */}
          <Pricing
            country={currentCountry}
            onOpenRegisterWithPlan={handleOpenRegisterWithPlan}
          />

          {/* 11. FAQ (13 Perguntas Frequentes) */}
          <FaqAccordion country={currentCountry} />
        </main>

        {/* 12. Footer */}
        <Footer
          country={currentCountry}
          onCountryChange={(country) => setCurrentCountry(country)}
          onOpenPwaInstall={() => setIsPwaInstallOpen(true)}
          onToggleAdmin={() => setIsAdminOpen(!isAdminOpen)}
        />

        {/* 13. Floating WhatsApp Button */}
        <FloatingWhatsapp country={currentCountry} />

        {/* Modals & Overlays */}
        <RegisterModal
          country={currentCountry}
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          selectedPlanName={selectedPlan}
        />

        <PWAInstallModal
          country={currentCountry}
          isOpen={isPwaInstallOpen}
          onClose={() => setIsPwaInstallOpen(false)}
        />

        <AdminPanel
          country={currentCountry}
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />

        {/* Push Notifications Modal */}
        <NotificationCenterModal
          country={currentCountry}
          isOpen={isNotificationOpen}
          onClose={() => setIsNotificationOpen(false)}
          notifications={notifications}
          preferences={notificationPreferences}
          onUpdatePreferences={(prefs) => setNotificationPreferences(prefs)}
          onMarkAllAsRead={handleMarkAllNotificationsAsRead}
          onClearNotifications={handleClearNotifications}
          onTriggerTestNotification={handleTriggerTestNotification}
          onSelectActionUrl={(url) => {
            const el = document.querySelector(url);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* User Profile & Gamification Badges Modal */}
        <UserProfileModal
          country={currentCountry}
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          userProfile={userProfile}
          badges={badges}
          onUpdateProfile={(profile) => setUserProfile(profile)}
          totalRidesCount={savedRides.length}
        />

        {/* Achievement / Push Toast Alerts */}
        <AchievementToast
          badge={activeToastBadge}
          notification={activeToastNotification}
          lang={currentCountry.lang}
          onClose={() => {
            setActiveToastBadge(null);
            setActiveToastNotification(null);
          }}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenNotifications={() => setIsNotificationOpen(true)}
        />

      </div>
    </div>
  );
}
