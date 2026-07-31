import React, { useState, useEffect } from 'react';
import { CountryConfig, Badge, UserProfile, BadgeCategory } from '../types';
import { DRIVER_LEVELS } from '../data/gamificationData';
import { loginWithGoogle, logout, subscribeAuthState } from '../services/firebaseService';
import { User } from 'firebase/auth';
import { 
  Trophy, 
  X, 
  Award, 
  Zap, 
  Flame, 
  Calculator, 
  Target, 
  Crown, 
  ShieldAlert, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  User as UserIcon, 
  Edit3, 
  Star,
  Share2,
  LogOut,
  Database
} from 'lucide-react';

interface UserProfileModalProps {
  country: CountryConfig;
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  badges: Badge[];
  onUpdateProfile: (profile: UserProfile) => void;
  totalRidesCount: number;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  country,
  isOpen,
  onClose,
  userProfile,
  badges,
  onUpdateProfile,
  totalRidesCount,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<BadgeCategory | 'all'>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(userProfile.name);
  const [platformInput, setPlatformInput] = useState(userProfile.mainPlatform);
  const [selectedBadgeDetail, setSelectedBadgeDetail] = useState<Badge | null>(null);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeAuthState((user) => {
      setAuthUser(user);
      if (user && user.displayName) {
        onUpdateProfile({
          ...userProfile,
          name: user.displayName,
          avatar: user.photoURL || userProfile.avatar,
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setAuthLoading(true);
    try {
      await loginWithGoogle();
    } catch (e) {
      console.warn('Login error', e);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.warn('Logout error', e);
    }
  };

  if (!isOpen) return null;

  const lang = country.lang;

  const currentLevelObj = DRIVER_LEVELS.find((l) => l.level === userProfile.level) || DRIVER_LEVELS[0];
  const nextLevelObj = DRIVER_LEVELS.find((l) => l.level === userProfile.level + 1) || DRIVER_LEVELS[DRIVER_LEVELS.length - 1];

  const currentXp = userProfile.xp;
  const minXp = currentLevelObj.minXp;
  const maxXp = nextLevelObj.minXp;
  const xpProgress = Math.min(100, Math.max(0, Math.round(((currentXp - minXp) / (maxXp - minXp || 1)) * 100)));

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  const labels = {
    pt: {
      title: 'Perfil & Gamificação do Motorista',
      subtitle: 'Conquistas, conquistas de GranScore e conquistas de faturamento',
      editBtn: 'Editar Perfil',
      saveBtn: 'Salvar',
      cancelBtn: 'Cancelar',
      levelTag: `Nível ${userProfile.level}`,
      xpLabel: `${currentXp} / ${maxXp} XP`,
      nextLevel: `Próximo Nível: ${nextLevelObj.title[lang] || nextLevelObj.title.pt}`,
      statBadges: 'Conquistas Desbloqueadas',
      statRides: 'Corridas Rastreadas',
      statRank: 'Classificação de Lucro',
      allCat: 'Todas',
      scoreCat: 'GranScore',
      ridesCat: 'Corridas',
      trackerCat: 'Meta Tracker',
      secretCat: 'Cámara Secreta',
      aiCat: 'GranBot IA',
      locked: 'Bloqueado',
      unlocked: 'Desbloqueado',
      reqLabel: 'Requisito',
      xpReward: 'XP de Bônus',
      shareBadge: 'Compartilhar Emblema',
    },
    es: {
      title: 'Perfil y Gamificación del Conductor',
      subtitle: 'Insignias, logros de GranScore y metas de ingresos',
      editBtn: 'Editar Perfil',
      saveBtn: 'Guardar',
      cancelBtn: 'Cancelar',
      levelTag: `Nivel ${userProfile.level}`,
      xpLabel: `${currentXp} / ${maxXp} XP`,
      nextLevel: `Siguiente Nivel: ${nextLevelObj.title[lang] || nextLevelObj.title.pt}`,
      statBadges: 'Insignias Desbloqueadas',
      statRides: 'Carreras Rastreadas',
      statRank: 'Rango de Ganancia',
      allCat: 'Todas',
      scoreCat: 'GranScore',
      ridesCat: 'Carreras',
      trackerCat: 'Meta Tracker',
      secretCat: 'Cámara Secreta',
      aiCat: 'GranBot IA',
      locked: 'Bloqueado',
      unlocked: 'Desbloqueado',
      reqLabel: 'Requisito',
      xpReward: 'XP de Bono',
      shareBadge: 'Compartir Insignia',
    },
    en: {
      title: 'Driver Profile & Gamification',
      subtitle: 'Badges, GranScore milestones, and revenue achievements',
      editBtn: 'Edit Profile',
      saveBtn: 'Save',
      cancelBtn: 'Cancel',
      levelTag: `Level ${userProfile.level}`,
      xpLabel: `${currentXp} / ${maxXp} XP`,
      nextLevel: `Next Level: ${nextLevelObj.title[lang] || nextLevelObj.title.pt}`,
      statBadges: 'Unlocked Badges',
      statRides: 'Tracked Rides',
      statRank: 'Profit Rank',
      allCat: 'All',
      scoreCat: 'GranScore',
      ridesCat: 'Rides',
      trackerCat: 'Meta Tracker',
      secretCat: 'Secret Chamber',
      aiCat: 'GranBot AI',
      locked: 'Locked',
      unlocked: 'Unlocked',
      reqLabel: 'Requirement',
      xpReward: 'Bonus XP',
      shareBadge: 'Share Badge',
    },
  }[lang];

  const handleSaveProfile = () => {
    onUpdateProfile({
      ...userProfile,
      name: nameInput,
      mainPlatform: platformInput,
    });
    setIsEditing(false);
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator':
        return <Calculator className="w-6 h-6" />;
      case 'Award':
        return <Award className="w-6 h-6" />;
      case 'Zap':
        return <Zap className="w-6 h-6" />;
      case 'Flame':
        return <Flame className="w-6 h-6" />;
      case 'Trophy':
        return <Trophy className="w-6 h-6" />;
      case 'Target':
        return <Target className="w-6 h-6" />;
      case 'Crown':
        return <Crown className="w-6 h-6" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  const filteredBadges = selectedCategory === 'all'
    ? badges
    : badges.filter((b) => b.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A10]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0A0A10] border border-white/10 rounded-3xl max-w-3xl w-full shadow-2xl p-6 relative my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-white/10">
          <div className="relative">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-[#7C3AED] shadow-xl"
            />
            <span className="absolute -bottom-2 -right-2 bg-[#F59E0B] text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full border border-white">
              Lvl {userProfile.level}
            </span>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1">
            {!isEditing ? (
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h3 className="text-xl font-black text-white">{userProfile.name}</h3>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-gray-400 hover:text-[#F59E0B]"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2 max-w-sm">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-white"
                />
                <input
                  type="text"
                  value={platformInput}
                  onChange={(e) => setPlatformInput(e.target.value)}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-white"
                />
                <button
                  onClick={handleSaveProfile}
                  className="px-3 py-1 bg-[#7C3AED] text-white text-xs font-bold rounded-lg"
                >
                  {labels.saveBtn}
                </button>
              </div>
            )}

            <p className="text-xs text-[#F59E0B] font-bold">
              {currentLevelObj.title[lang] || currentLevelObj.title.pt} • {userProfile.mainPlatform} ({userProfile.city})
            </p>

            {/* XP Progress Bar */}
            <div className="mt-3 max-w-md">
              <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                <span className="text-gray-300">{labels.levelTag}</span>
                <span className="text-[#7C3AED]">{labels.xpLabel}</span>
              </div>
              <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden border border-white/10 p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[#7C3AED] to-[#F59E0B] rounded-full transition-all duration-500"
                  style={{ width: `${xpProgress}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">{labels.nextLevel}</p>
            </div>
          </div>
        </div>

        {/* Firebase Cloud Sync & Auth Banner */}
        <div className="my-4 p-3.5 bg-gradient-to-r from-[#0A0A10] via-white/5 to-[#0A0A10] border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981]">
              <Database className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-white">Firebase Firestore Cloud Sync</span>
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
              </div>
              <p className="text-[11px] text-gray-400">
                {authUser 
                  ? `Sincronizado como ${authUser.email || authUser.displayName || 'Usuário Google'}`
                  : 'Conecte sua conta do Google para sincronizar suas corridas e progresso na nuvem granapp-95b00.'}
              </p>
            </div>
          </div>

          <div>
            {!authUser ? (
              <button
                onClick={handleGoogleLogin}
                disabled={authLoading}
                className="px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <UserIcon className="w-4 h-4 text-[#F59E0B]" />
                <span>{authLoading ? 'Conectando...' : 'Entrar com Google'}</span>
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-white/10 hover:bg-rose-500/20 hover:text-rose-400 border border-white/10 text-gray-300 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sair</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Driver Stats Row */}
        <div className="grid grid-cols-3 gap-3 my-5">
          <div className="bg-white/5 border border-white/10 p-3 rounded-2xl text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase">{labels.statBadges}</p>
            <p className="text-xl font-black text-[#F59E0B] mt-1">{unlockedCount} / {badges.length}</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-3 rounded-2xl text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase">{labels.statRides}</p>
            <p className="text-xl font-black text-[#7C3AED] mt-1">{totalRidesCount}</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-3 rounded-2xl text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase">{labels.statRank}</p>
            <p className="text-xl font-black text-[#10B981] mt-1">Top 5%</p>
          </div>
        </div>

        {/* Badges Section Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            {labels.allCat} ({badges.length})
          </button>
          <button
            onClick={() => setSelectedCategory('granscore')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'granscore'
                ? 'bg-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            {labels.scoreCat}
          </button>
          <button
            onClick={() => setSelectedCategory('rides')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'rides'
                ? 'bg-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            {labels.ridesCat}
          </button>
          <button
            onClick={() => setSelectedCategory('meta_tracker')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'meta_tracker'
                ? 'bg-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            {labels.trackerCat}
          </button>
          <button
            onClick={() => setSelectedCategory('exploration')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'exploration'
                ? 'bg-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            {labels.secretCat}
          </button>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
          {filteredBadges.map((badge) => {
            const isUnlocked = badge.unlocked;
            return (
              <div
                key={badge.id}
                onClick={() => setSelectedBadgeDetail(badge)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative flex items-start gap-3.5 group ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-[#7C3AED]/10 via-white/5 to-white/5 border-[#7C3AED]/40 hover:border-[#F59E0B]'
                    : 'bg-white/5 border-white/10 opacity-60 grayscale hover:grayscale-0 hover:opacity-80'
                }`}
              >
                <div className={`p-3 rounded-2xl border shrink-0 transition-transform group-hover:scale-110 ${
                  isUnlocked
                    ? 'bg-[#7C3AED] text-white border-[#7C3AED] shadow-[0_0_15px_rgba(124,58,237,0.5)]'
                    : 'bg-white/10 text-gray-400 border-white/10'
                }`}>
                  {getBadgeIcon(badge.iconName)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-black text-white truncate">
                      {badge.title[lang] || badge.title.pt}
                    </h4>
                    <span className="text-[10px] font-mono font-bold text-[#F59E0B] shrink-0">
                      +{badge.xpValue} XP
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-300 mt-1 line-clamp-2 leading-relaxed">
                    {badge.description[lang] || badge.description.pt}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between text-[10px]">
                    {isUnlocked ? (
                      <span className="flex items-center gap-1 text-[#10B981] font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        {labels.unlocked} ({badge.unlockedAt})
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-gray-400 font-bold">
                        <Lock className="w-3 h-3" />
                        {badge.currentProgress} / {badge.maxProgress}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Badge Detail Modal Overlay */}
        {selectedBadgeDetail && (
          <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0A0A10] border border-white/10 p-6 rounded-3xl max-w-md w-full text-center relative animate-in fade-in zoom-in-95">
              <button
                onClick={() => setSelectedBadgeDetail(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-16 h-16 rounded-2xl bg-[#7C3AED] text-white border-2 border-[#F59E0B] shadow-[0_0_20px_rgba(124,58,237,0.6)] flex items-center justify-center mx-auto mb-3">
                {getBadgeIcon(selectedBadgeDetail.iconName)}
              </div>

              <h4 className="text-lg font-black text-white">
                {selectedBadgeDetail.title[lang] || selectedBadgeDetail.title.pt}
              </h4>

              <span className="inline-block mt-1 px-3 py-0.5 bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30 rounded-full text-[10px] font-bold">
                +{selectedBadgeDetail.xpValue} XP Bônus
              </span>

              <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                {selectedBadgeDetail.description[lang] || selectedBadgeDetail.description.pt}
              </p>

              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl mt-4 text-left text-xs space-y-1">
                <p className="font-bold text-gray-400 uppercase text-[10px]">{labels.reqLabel}:</p>
                <p className="text-white font-semibold">{selectedBadgeDetail.requirementText[lang] || selectedBadgeDetail.requirementText.pt}</p>
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => setSelectedBadgeDetail(null)}
                  className="flex-1 py-2.5 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl text-xs"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
