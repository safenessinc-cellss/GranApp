import React, { useState, useEffect } from 'react';
import { CountryConfig, RideRecord } from '../types';
import { formatCurrency } from '../data/countries';
import confetti from 'canvas-confetti';
import { 
  Target, 
  Plus, 
  Trash2, 
  Trophy, 
  TrendingUp, 
  Fuel, 
  CheckCircle, 
  Sparkles,
  Download,
  Play,
  Square,
  Clock,
  Zap
} from 'lucide-react';

interface MetaTrackerProps {
  country: CountryConfig;
  savedRides: RideRecord[];
  onAddRide: (ride: RideRecord) => void;
  onClearRides: () => void;
}

export const MetaTracker: React.FC<MetaTrackerProps> = ({
  country,
  savedRides,
  onAddRide,
  onClearRides,
}) => {
  const lang = country.lang;

  // Default target goal
  const defaultTarget = country.code === 'US' ? 180 : country.code === 'MX' ? 1200 : country.code === 'COP' ? 250000 : country.code === 'ARS' ? 60000 : 350;

  const [targetAmount, setTargetAmount] = useState<number>(defaultTarget);
  const [isAddingManual, setIsAddingManual] = useState<boolean>(false);

  // Manual Form
  const [manualFare, setManualFare] = useState<number>(25);
  const [manualKm, setManualKm] = useState<number>(7.5);
  const [manualMin, setManualMin] = useState<number>(18);
  const [manualPlatform, setManualPlatform] = useState<string>(country.platforms[0] || 'Uber');

  // Shift Timer ("Modo Rodando") state
  const [isShiftActive, setIsShiftActive] = useState<boolean>(false);
  const [shiftSeconds, setShiftSeconds] = useState<number>(0);

  useEffect(() => {
    let interval: any = null;
    if (isShiftActive) {
      interval = setInterval(() => {
        setShiftSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isShiftActive]);

  const formatShiftTime = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Aggregated Stats
  const totalEarned = savedRides.reduce((acc, r) => acc + r.fareValue, 0);
  const totalNetProfit = savedRides.reduce((acc, r) => acc + r.netProfit, 0);
  const totalKmDriven = savedRides.reduce((acc, r) => acc + r.totalKm, 0);
  const ridesCount = savedRides.length;

  const progressPercent = Math.min(100, Math.round((totalEarned / (targetAmount || 1)) * 100));

  // Hourly rate based on shift timer or default
  const shiftHours = shiftSeconds > 0 ? shiftSeconds / 3600 : 1;
  const netPerHourReal = shiftSeconds > 0 ? (totalNetProfit / shiftHours) : (savedRides.reduce((acc, r) => acc + (r.durationMin / 60), 0) > 0 ? totalNetProfit / (savedRides.reduce((acc, r) => acc + (r.durationMin / 60), 0)) : 0);

  // Trigger confetti when hitting 100%
  useEffect(() => {
    if (progressPercent >= 100 && totalEarned > 0) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7C3AED', '#F59E0B', '#10B981']
        });
      } catch (e) {
        console.warn('Confetti effect', e);
      }
    }
  }, [progressPercent, totalEarned]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fare = Number(manualFare) || 0;
    const km = Number(manualKm) || 1;
    const fuelCostEst = (km / 10) * country.defaultFuelPrice;
    const net = fare - fuelCostEst;

    const newRide: RideRecord = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      platform: manualPlatform,
      fareValue: fare,
      totalKm: km,
      durationMin: Number(manualMin) || 10,
      netProfit: net,
      score: net > 15 ? 85 : 60,
      color: net > 15 ? 'green' : 'yellow',
    };

    onAddRide(newRide);
    setIsAddingManual(false);
  };

  // CSV Export Handler
  const exportRidesToCSV = () => {
    if (savedRides.length === 0) return;
    const headers = ["ID", "Hora", "Plataforma", `Faturamento (${country.currencyCode})`, "Km Total", "Duracao (min)", `Lucro Liquido (${country.currencyCode})`, "GranScore"];
    const rows = savedRides.map(r => [
      r.id,
      r.timestamp,
      r.platform,
      r.fareValue.toFixed(2),
      r.totalKm.toFixed(1),
      r.durationMin,
      r.netProfit.toFixed(2),
      r.score
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `GranApp_Relatorio_Corridas_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const labels = {
    pt: {
      title: 'Meta Tracker Diário',
      subtitle: 'Acompanhe seus ganhos acumulados no dia e receba alertas para encerrar seu turno assim que bater a meta!',
      goalLabel: 'Sua Meta Diária:',
      progressLabel: 'Progresso da Meta',
      earnedLabel: 'Faturamento Bruto Hoje',
      netProfitLabel: 'Lucro Líquido Real',
      kmDrivenLabel: 'Km Rodados',
      ridesCountLabel: 'Corridas Realizadas',
      addBtn: 'Adicionar Corrida Manual',
      clearBtn: 'Limpar Histórico Hoje',
      goalReachedTitle: '🎉 PARABÉNS! META CUMPRIDA!',
      goalReachedDesc: 'Você bateu sua meta diária! É hora de voltar para casa com segurança e curtir sua família.',
      noRidesYet: 'Nenhuma corrida registrada hoje. Use a Calculadora acima ou adicione manualmente.'
    },
    es: {
      title: 'Meta Tracker Diario',
      subtitle: 'Monitorea tus ingresos acumulados del día y recibe alertas para finalizar tu turno al cumplir la meta.',
      goalLabel: 'Tu Meta Diaria:',
      progressLabel: 'Progreso de la Meta',
      earnedLabel: 'Ingreso Bruto Hoy',
      netProfitLabel: 'Ganancia Neta Real',
      kmDrivenLabel: 'Km Recorridos',
      ridesCountLabel: 'Viajes Realizados',
      addBtn: 'Agregar Viaje Manual',
      clearBtn: 'Limpiar Historial Hoy',
      goalReachedTitle: '🎉 ¡FELICIDADES! ¡META CUMPLIDA!',
      goalReachedDesc: '¡Cumpliste tu meta diaria! Es momento de regresar a casa con tranquilidad y disfrutar a tu familia.',
      noRidesYet: 'Sin viajes registrados hoy. Usa la Calculadora arriba o agrega manualmente.'
    },
    en: {
      title: 'Daily Goal Meta Tracker',
      subtitle: 'Track your daily cumulative earnings and receive alerts to end your shift as soon as you hit your goal.',
      goalLabel: 'Daily Target Goal:',
      progressLabel: 'Goal Progress',
      earnedLabel: 'Gross Earned Today',
      netProfitLabel: 'Real Net Profit',
      kmDrivenLabel: 'Miles/Km Driven',
      ridesCountLabel: 'Completed Rides',
      addBtn: 'Add Ride Manually',
      clearBtn: 'Reset Today Log',
      goalReachedTitle: '🎉 CONGRATULATIONS! GOAL ACHIEVED!',
      goalReachedDesc: 'You reached your daily goal! Time to head home safely and enjoy your evening.',
      noRidesYet: 'No rides logged yet today. Use the Calculator above or log manually.'
    }
  }[lang];

  return (
    <section id="meta-tracker" className="py-16 bg-[#0A0A10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#F59E0B] mb-3">
            <Target className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>PAINEL DE METAS EM TEMPO REAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {labels.title}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mt-2">
            {labels.subtitle}
          </p>
        </div>

        {/* Goal Banner Card */}
        <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl mb-8 backdrop-blur-md">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                {labels.goalLabel}
              </label>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-[#F59E0B]">{country.currencySymbol}</span>
                <input
                  type="number"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(parseFloat(e.target.value) || 0)}
                  className="w-36 px-3 py-1.5 bg-[#0A0A10] border border-white/15 rounded-xl text-white font-black text-2xl focus:border-[#7C3AED] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setIsAddingManual(true)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>{labels.addBtn}</span>
              </button>

              {savedRides.length > 0 && (
                <>
                  <button
                    onClick={exportRidesToCSV}
                    className="p-3 text-[#10B981] hover:bg-[#10B981]/10 bg-[#0A0A10] rounded-2xl border border-[#10B981]/30 transition-all flex items-center gap-1.5 text-xs font-bold"
                    title="Exportar Relatório CSV"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">CSV</span>
                  </button>

                  <button
                    onClick={onClearRides}
                    className="p-3 text-gray-400 hover:text-rose-400 bg-[#0A0A10] rounded-2xl border border-white/10"
                    title={labels.clearBtn}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Shift Timer Widget ("Modo Rodando / Cronômetro do Turno") */}
          <div className="my-5 p-4 bg-[#0A0A10] border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl border ${isShiftActive ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]' : 'bg-white/5 border-white/10 text-gray-400'}`}>
                <Clock className={`w-5 h-5 ${isShiftActive ? 'animate-spin' : ''}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <span>Modo Rodando (Turno Online)</span>
                  {isShiftActive && <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>}
                </p>
                <div className="flex items-baseline gap-3">
                  <p className="text-2xl font-black text-white font-mono">{formatShiftTime(shiftSeconds)}</p>
                  <p className="text-xs font-bold text-[#10B981] font-mono">
                    ~ {formatCurrency(netPerHourReal, country)}/hora limpo
                  </p>
                </div>
              </div>
            </div>

            <div>
              {!isShiftActive ? (
                <button
                  onClick={() => setIsShiftActive(true)}
                  className="px-5 py-2.5 bg-[#10B981] hover:bg-[#059669] text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Iniciar Turno</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsShiftActive(false)}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
                >
                  <Square className="w-4 h-4 fill-white" />
                  <span>Pausar Turno</span>
                </button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="py-6">
            <div className="flex justify-between items-center text-sm font-black mb-2">
              <span className="text-gray-300">{labels.progressLabel}</span>
              <span className="text-[#F59E0B] font-mono text-base">{progressPercent}%</span>
            </div>
            <div className="w-full h-5 bg-[#0A0A10] rounded-full p-1 border border-white/10 relative overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#7C3AED] via-[#F59E0B] to-[#10B981] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Goal Reached Alert Banner */}
          {progressPercent >= 100 && (
            <div className="bg-[#10B981]/20 border border-[#10B981]/40 p-4 rounded-2xl flex items-center gap-4 text-[#10B981] animate-bounce mb-6">
              <Trophy className="w-8 h-8 text-[#F59E0B] shrink-0" />
              <div>
                <p className="font-black text-base">{labels.goalReachedTitle}</p>
                <p className="text-xs text-gray-200 mt-0.5">{labels.goalReachedDesc}</p>
              </div>
            </div>
          )}

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="bg-[#0A0A10] p-4 rounded-2xl border border-white/10">
              <p className="text-[11px] font-bold text-gray-400 uppercase">{labels.earnedLabel}</p>
              <p className="text-xl font-black text-[#F59E0B] mt-1 font-mono">
                {formatCurrency(totalEarned, country)}
              </p>
            </div>

            <div className="bg-[#0A0A10] p-4 rounded-2xl border border-white/10">
              <p className="text-[11px] font-bold text-gray-400 uppercase">{labels.netProfitLabel}</p>
              <p className="text-xl font-black text-[#10B981] mt-1 font-mono">
                {formatCurrency(totalNetProfit, country)}
              </p>
            </div>

            <div className="bg-[#0A0A10] p-4 rounded-2xl border border-white/10">
              <p className="text-[11px] font-bold text-gray-400 uppercase">{labels.kmDrivenLabel}</p>
              <p className="text-xl font-black text-gray-200 mt-1 font-mono">
                {totalKmDriven.toFixed(1)} <span className="text-xs text-gray-500 font-normal">{country.fuelUnit === 'gal' ? 'mi' : 'km'}</span>
              </p>
            </div>

            <div className="bg-[#0A0A10] p-4 rounded-2xl border border-white/10">
              <p className="text-[11px] font-bold text-gray-400 uppercase">{labels.ridesCountLabel}</p>
              <p className="text-xl font-black text-[#7C3AED] mt-1 font-mono">
                {ridesCount}
              </p>
            </div>
          </div>

        </div>

        {/* Saved Rides List */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
          <h3 className="text-base font-extrabold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#10B981]" />
            <span>Corridas Registradas Hoje ({savedRides.length})</span>
          </h3>

          {savedRides.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-sm">
              {labels.noRidesYet}
            </div>
          ) : (
            <div className="space-y-3">
              {savedRides.map((ride) => (
                <div
                  key={ride.id}
                  className="flex items-center justify-between p-3.5 bg-[#0A0A10] border border-white/10 rounded-2xl hover:border-[#7C3AED]/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className={`w-3 h-3 rounded-full ${
                        ride.color === 'green' ? 'bg-[#10B981] shadow-sm shadow-[#10B981]' : 'bg-[#F59E0B]'
                      }`}
                    ></div>
                    <div>
                      <p className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{ride.platform}</span>
                        <span className="text-[10px] text-gray-500 font-mono">[{ride.timestamp}]</span>
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {ride.totalKm} km • {ride.durationMin} min
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-black text-[#F59E0B] font-mono">
                      {formatCurrency(ride.fareValue, country)}
                    </p>
                    <p className="text-xs font-extrabold text-[#10B981]">
                      Lucro: {formatCurrency(ride.netProfit, country)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Manual Add Modal */}
      {isAddingManual && (
        <div className="fixed inset-0 z-50 bg-[#0A0A10]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0A0A10] border border-white/10 p-6 rounded-3xl max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-black text-white mb-4">
              Adicionar Corrida Manualmente
            </h3>
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Valor da Corrida ({country.currencySymbol})
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={manualFare}
                  onChange={(e) => setManualFare(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white font-bold focus:border-[#7C3AED] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Km Total Rodados
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={manualKm}
                  onChange={(e) => setManualKm(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white font-bold focus:border-[#7C3AED] focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddingManual(false)}
                  className="flex-1 py-3 bg-white/10 text-gray-300 font-bold rounded-xl text-xs hover:bg-white/15 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black rounded-xl text-xs shadow-lg transition-all"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
