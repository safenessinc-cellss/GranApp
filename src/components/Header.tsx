import React, { useState } from 'react';
import { CountryConfig, Language } from '../types';
import { COUNTRIES } from '../data/countries';
import { 
  Zap, 
  Download, 
  UserCheck, 
  ShieldCheck, 
  LayoutDashboard, 
  Menu, 
  X, 
  Calculator, 
  Target, 
  Eye, 
  HelpCircle, 
  Star, 
  Sparkles,
  ChevronDown,
  Bell,
  Trophy
} from 'lucide-react';

interface HeaderProps {
  currentCountry: CountryConfig;
  onCountryChange: (country: CountryConfig) => void;
  onOpenRegister: () => void;
  onOpenPwaInstall: () => void;
  onToggleAdmin: () => void;
  isAdminOpen: boolean;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  driverLevel: number;
  unlockedBadgesCount: number;
  onOpenProfile: () => void;
  activeSection?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentCountry,
  onCountryChange,
  onOpenRegister,
  onOpenPwaInstall,
  onToggleAdmin,
  isAdminOpen,
  unreadNotificationsCount,
  onOpenNotifications,
  driverLevel,
  unlockedBadgesCount,
  onOpenProfile,
}) => {
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const lang = currentCountry.lang;

  const t = {
    pwaActive: lang === 'pt' ? 'PWA On' : lang === 'es' ? 'PWA Activa' : 'PWA Live',
    installPwa: lang === 'pt' ? 'Instalar PWA' : lang === 'es' ? 'Instalar PWA' : 'Install PWA',
    login: lang === 'pt' ? 'Entrar' : lang === 'es' ? 'Ingresar' : 'Sign In',
    adminPanel: lang === 'pt' ? 'Admin' : lang === 'es' ? 'Admin' : 'Admin',
    calculator: lang === 'pt' ? 'Calculadora' : lang === 'es' ? 'Calculadora' : 'Calculator',
    metaTracker: lang === 'pt' ? 'Meta Tracker' : lang === 'es' ? 'Meta Tracker' : 'Meta Tracker',
    secretChamber: lang === 'pt' ? 'Cámara Secreta' : lang === 'es' ? 'Cámara Secreta' : 'Secret Chamber',
    granBot: lang === 'pt' ? 'IA GranBot' : lang === 'es' ? 'IA GranBot' : 'GranBot AI',
    testimonials: lang === 'pt' ? 'Depoimentos' : lang === 'es' ? 'Testimonios' : 'Testimonials',
    plans: lang === 'pt' ? 'Planos' : lang === 'es' ? 'Planes' : 'Plans',
    faq: 'FAQ',
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A10]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#7C3AED] flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.4)] group-hover:scale-105 transition-transform duration-300">
              <Zap className="w-6 h-6 text-white fill-white/20" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-[#Outfit] text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-[#7C3AED]">
                  Gran<span className="text-[#F59E0B]">App</span>
                </span>
                <span className="bg-[#7C3AED]/20 text-[#7C3AED] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#7C3AED]/40 uppercase">
                  PWA
                </span>
              </div>
              <p className="text-[10px] text-gray-400 hidden sm:block">
                Driver Financial Intelligence
              </p>
            </div>
          </a>

          {/* Live PWA Badge */}
          <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.pwaActive}</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-gray-300">
          <a href="#calculadora" className="hover:text-[#F59E0B] transition-colors flex items-center gap-1">
            <Calculator className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>{t.calculator}</span>
          </a>
          <a href="#meta-tracker" className="hover:text-[#F59E0B] transition-colors flex items-center gap-1">
            <Target className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{t.metaTracker}</span>
          </a>
          <a href="#camara-secreta" className="hover:text-[#F59E0B] transition-colors flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>{t.secretChamber}</span>
          </a>
          <a href="#granbot-ai" className="hover:text-[#F59E0B] transition-colors flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{t.granBot}</span>
          </a>
          <a href="#depoimentos" className="hover:text-[#F59E0B] transition-colors flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>{t.testimonials}</span>
          </a>
          <a href="#planos" className="hover:text-[#F59E0B] transition-colors flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
            <span>{t.plans}</span>
          </a>
          <a href="#faq" className="hover:text-[#F59E0B] transition-colors flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
            <span>{t.faq}</span>
          </a>
        </nav>

        {/* Right Section: Country Selector + Push Notifications + Gamification + Auth/Admin */}
        <div className="flex items-center gap-2">

          {/* 1. Push Notification Center Bell */}
          <button
            onClick={onOpenNotifications}
            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl relative transition-all"
            title="Central de Notificações Push"
          >
            <Bell className="w-4 h-4 text-[#F59E0B]" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EF4444] text-white text-[9px] font-black flex items-center justify-center animate-bounce">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* 2. Driver Profile & Gamification Badge */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#7C3AED]/20 to-[#F59E0B]/20 border border-[#7C3AED]/40 hover:border-[#F59E0B] px-2.5 py-1.5 rounded-xl text-xs font-bold text-white transition-all shadow-md"
            title="Perfil de Conquistas do Motorista"
          >
            <Trophy className="w-4 h-4 text-[#F59E0B]" />
            <span className="bg-[#7C3AED] text-white text-[10px] px-1.5 py-0.5 rounded-full font-black">
              Lvl {driverLevel}
            </span>
          </button>

          {/* 3. Country / Currency Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
              className="flex items-center gap-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold px-2 py-1.5 rounded-xl transition-colors"
              title="Cambiar País / Moeda"
            >
              <span className="text-base">{currentCountry.flag}</span>
              <span className="hidden sm:inline text-[11px] font-mono">{currentCountry.currencySymbol}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {isCountryDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#0A0A10] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-xl">
                <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-white/10">
                  {lang === 'pt' ? 'Selecione seu País' : lang === 'es' ? 'Selecciona tu País' : 'Select Country'}
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {Object.values(COUNTRIES).map((country) => (
                    <button
                      key={country.code}
                      onClick={() => {
                        onCountryChange(country);
                        setIsCountryDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-white/5 transition-colors ${
                        currentCountry.code === country.code ? 'bg-[#7C3AED]/20 text-[#F59E0B] font-bold' : 'text-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{country.flag}</span>
                        <span>{country.name}</span>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-[#7C3AED]">
                        {country.currencySymbol}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Admin Panel Toggle Button */}
          <button
            onClick={onToggleAdmin}
            className={`hidden sm:flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-xl border transition-all ${
              isAdminOpen
                ? 'bg-[#F59E0B] text-slate-950 border-[#F59E0B]'
                : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10'
            }`}
            title="Painel de Controle do Administrador"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>{t.adminPanel}</span>
          </button>

          {/* PWA Install Button */}
          <button
            onClick={onOpenPwaInstall}
            className="hidden sm:flex items-center gap-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-all"
          >
            <Download className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{t.installPwa}</span>
          </button>

          {/* Auth / Register Trigger */}
          <button
            onClick={onOpenRegister}
            className="flex items-center gap-1 bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-black text-xs px-3 py-1.5 rounded-xl shadow-md transition-all"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{t.login}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 text-gray-300 hover:text-white rounded-xl bg-white/5 border border-white/10"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A10] border-b border-white/10 px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <a
              href="#calculadora"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 hover:text-[#F59E0B]"
            >
              <Calculator className="w-4 h-4 text-[#7C3AED]" />
              <span>{t.calculator}</span>
            </a>
            <a
              href="#meta-tracker"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 hover:text-[#F59E0B]"
            >
              <Target className="w-4 h-4 text-[#F59E0B]" />
              <span>{t.metaTracker}</span>
            </a>
            <a
              href="#camara-secreta"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 hover:text-[#F59E0B]"
            >
              <Eye className="w-4 h-4 text-[#7C3AED]" />
              <span>{t.secretChamber}</span>
            </a>
            <a
              href="#granbot-ai"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 hover:text-[#F59E0B]"
            >
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span>{t.granBot}</span>
            </a>
            <a
              href="#depoimentos"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 hover:text-[#F59E0B]"
            >
              <Star className="w-4 h-4 text-[#7C3AED]" />
              <span>{t.testimonials}</span>
            </a>
            <a
              href="#planos"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 hover:text-[#F59E0B]"
            >
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
              <span>{t.plans}</span>
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenNotifications();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-2.5 rounded-xl text-xs"
            >
              <Bell className="w-4 h-4 text-[#F59E0B]" />
              <span>Central de Notificações PWA ({unreadNotificationsCount})</span>
            </button>

            <button
              onClick={() => {
                onOpenProfile();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-2.5 rounded-xl text-xs"
            >
              <Trophy className="w-4 h-4 text-[#F59E0B]" />
              <span>Perfil & Emblemas (Nível {driverLevel})</span>
            </button>

            <button
              onClick={() => {
                onOpenPwaInstall();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-2.5 rounded-xl text-xs shadow-md"
            >
              <Download className="w-4 h-4 text-[#F59E0B]" />
              <span>{t.installPwa}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

