import React, { useState, useMemo } from 'react';
import { CountryConfig, RideRecord } from '../types';
import { calculateGranScore } from '../utils/granscore';
import { formatCurrency } from '../data/countries';
import { 
  Calculator, 
  Fuel, 
  Car, 
  Clock, 
  DollarSign, 
  Plus, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle 
} from 'lucide-react';

interface GranScoreCalculatorProps {
  country: CountryConfig;
  onSaveToMetaTracker: (ride: RideRecord) => void;
}

export const GranScoreCalculator: React.FC<GranScoreCalculatorProps> = ({
  country,
  onSaveToMetaTracker,
}) => {
  const lang = country.lang;

  // Default preset inputs depending on country scale
  const defaultFare = country.code === 'US' ? 18.50 : country.code === 'MX' ? 140 : country.code === 'COP' ? 24000 : country.code === 'ARS' ? 6500 : 28.50;

  const [fareValue, setFareValue] = useState<number>(defaultFare);
  const [pickupKm, setPickupKm] = useState<number>(2.0);
  const [tripKm, setTripKm] = useState<number>(8.5);
  const [durationMin, setDurationMin] = useState<number>(22);
  const [fuelPrice, setFuelPrice] = useState<number>(country.defaultFuelPrice);
  const [fuelConsumption, setFuelConsumption] = useState<number>(country.fuelUnit === 'gal' ? 25 : 10.5); // km/L or MPG
  const [fuelType, setFuelType] = useState<'gasoline' | 'ethanol' | 'cng' | 'ev' | 'diesel'>('gasoline');
  const [selectedPlatform, setSelectedPlatform] = useState<string>(country.platforms[0] || 'Uber');

  const handleFuelTypeChange = (type: 'gasoline' | 'ethanol' | 'cng' | 'ev' | 'diesel') => {
    setFuelType(type);
    const basePrice = country.defaultFuelPrice;
    if (type === 'gasoline') {
      setFuelPrice(basePrice);
      setFuelConsumption(country.fuelUnit === 'gal' ? 25 : 10.5);
    } else if (type === 'ethanol') {
      setFuelPrice(Number((basePrice * 0.72).toFixed(2)));
      setFuelConsumption(country.fuelUnit === 'gal' ? 18 : 7.5);
    } else if (type === 'cng') {
      setFuelPrice(Number((basePrice * 0.65).toFixed(2)));
      setFuelConsumption(country.fuelUnit === 'gal' ? 30 : 13.5);
    } else if (type === 'ev') {
      setFuelPrice(Number((basePrice * 0.30).toFixed(2)));
      setFuelConsumption(country.fuelUnit === 'gal' ? 45 : 6.5); // km/kWh
    } else if (type === 'diesel') {
      setFuelPrice(Number((basePrice * 0.95).toFixed(2)));
      setFuelConsumption(country.fuelUnit === 'gal' ? 28 : 12.0);
    }
  };

  const [savedSuccessAlert, setSavedSuccessAlert] = useState<boolean>(false);

  // Calculate GranScore Result
  const result = useMemo(() => {
    return calculateGranScore(
      {
        fareValue: Number(fareValue) || 0,
        pickupKm: Number(pickupKm) || 0,
        tripKm: Number(tripKm) || 0,
        durationMin: Number(durationMin) || 1,
        fuelPrice: Number(fuelPrice) || 1,
        fuelConsumption: Number(fuelConsumption) || 10,
      },
      country
    );
  }, [fareValue, pickupKm, tripKm, durationMin, fuelPrice, fuelConsumption, country]);

  const handleSaveRide = () => {
    const newRide: RideRecord = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      platform: selectedPlatform,
      fareValue: Number(fareValue) || 0,
      totalKm: result.totalKm,
      durationMin: result.durationMin,
      netProfit: result.netProfit,
      score: result.score,
      color: result.color,
    };
    onSaveToMetaTracker(newRide);
    setSavedSuccessAlert(true);
    setTimeout(() => setSavedSuccessAlert(false), 3000);
  };

  // Quick Preset Handlers
  const applyPreset = (preset: 'short' | 'airport' | 'rush' | 'trap') => {
    if (preset === 'short') {
      setFareValue(country.code === 'US' ? 6.50 : country.code === 'MX' ? 45 : 12.00);
      setPickupKm(0.8);
      setTripKm(2.5);
      setDurationMin(8);
    } else if (preset === 'airport') {
      setFareValue(country.code === 'US' ? 48.00 : country.code === 'MX' ? 380 : 85.00);
      setPickupKm(3.0);
      setTripKm(28.0);
      setDurationMin(35);
    } else if (preset === 'rush') {
      setFareValue(country.code === 'US' ? 26.00 : country.code === 'MX' ? 190 : 42.00);
      setPickupKm(1.5);
      setTripKm(9.0);
      setDurationMin(28);
    } else if (preset === 'trap') {
      // High pickup distance, low fare = Money loser!
      setFareValue(country.code === 'US' ? 8.00 : country.code === 'MX' ? 55 : 11.50);
      setPickupKm(6.5);
      setTripKm(5.0);
      setDurationMin(25);
    }
  };

  const labels = {
    pt: {
      title: 'Calculadora GranScore Instantânea',
      subtitle: 'Simule ou avalie qualquer chamada de aplicativo antes de aceitar. O algoritmo calcula o combustível e o lucro por hora em tempo real.',
      fareLabel: 'Valor Bruto da Corrida',
      pickupLabel: 'Deslocamento até Passageiro (Km a Vazio)',
      tripLabel: 'Distância da Corrida (Km)',
      durationLabel: 'Tempo Estimado (Minutos)',
      fuelPriceLabel: `Preço do Combustível (${country.currencySymbol}/${country.fuelUnit})`,
      consumptionLabel: country.fuelUnit === 'gal' ? 'Consumo (MPG)' : 'Consumo do Veículo (Km/L)',
      platformLabel: 'Plataforma',
      presetsTitle: 'Exemplos Rápidos de Corridas:',
      presetShort: 'Corrida Curta',
      presetAirport: 'Corrida Aeroporto',
      presetRush: 'Horário de Pico',
      presetTrap: 'Corrida Cilada (Prejuízo)',
      saveBtn: 'Salvar no Meta Tracker',
      savedMsg: '✓ Salva com sucesso no seu Meta Tracker!',
      netProfit: 'Lucro Líquido Real',
      hourlyProfit: 'Lucro Líquido / Hora',
      fuelCost: 'Custo de Gasolina',
      platformFee: 'Retenção Oculta Estimada',
    },
    es: {
      title: 'Calculadora GranScore Instantánea',
      subtitle: 'Simula o evalúa cualquier viaje antes de aceptar. El algoritmo calcula combustible y ganancia por hora en tiempo real.',
      fareLabel: 'Valor Bruto del Viaje',
      pickupLabel: 'Recogida de Pasajero (Km en Vacío)',
      tripLabel: 'Distancia del Viaje (Km)',
      durationLabel: 'Tiempo Estimado (Minutos)',
      fuelPriceLabel: `Precio del Combustible (${country.currencySymbol}/${country.fuelUnit})`,
      consumptionLabel: country.fuelUnit === 'gal' ? 'Consumo (MPG)' : 'Rendimiento (Km/L)',
      platformLabel: 'Plataforma',
      presetsTitle: 'Ejemplos Rápidos:',
      presetShort: 'Viaje Corto',
      presetAirport: 'Viaje Aeropuerto',
      presetRush: 'Hora Pico',
      presetTrap: 'Viaje Trampa (Pérdida)',
      saveBtn: 'Guardar en Meta Tracker',
      savedMsg: '✓ ¡Guardado exitosamente en tu Meta Tracker!',
      netProfit: 'Ganancia Neta Real',
      hourlyProfit: 'Ganancia / Hora',
      fuelCost: 'Costo de Combustible',
      platformFee: 'Comisión Oculta Estimada',
    },
    en: {
      title: 'Instant GranScore Calculator',
      subtitle: 'Evaluate any ride offer before accepting. Algorithm calculates gas costs and net hourly profit in real time.',
      fareLabel: 'Gross Fare Value',
      pickupLabel: 'Pickup Deadhead Distance',
      tripLabel: 'Trip Distance',
      durationLabel: 'Estimated Time (Mins)',
      fuelPriceLabel: `Gas Price (${country.currencySymbol}/${country.fuelUnit})`,
      consumptionLabel: country.fuelUnit === 'gal' ? 'Efficiency (MPG)' : 'Efficiency (Km/L)',
      platformLabel: 'App Platform',
      presetsTitle: 'Quick Presets:',
      presetShort: 'Short Ride',
      presetAirport: 'Airport Trip',
      presetRush: 'Rush Hour',
      presetTrap: 'Trap Ride (Money Loser)',
      saveBtn: 'Save to Meta Tracker',
      savedMsg: '✓ Successfully saved to Meta Tracker!',
      netProfit: 'Real Net Profit',
      hourlyProfit: 'Net Hourly Profit',
      fuelCost: 'Fuel Expenses',
      platformFee: 'Estimated App Cut',
    }
  }[lang];

  return (
    <section id="calculadora" className="py-16 bg-[#0A0A10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#F59E0B] mb-3">
            <Calculator className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>ALGORITMO DE RENTABILIDADE GRANSCORE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {labels.title}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mt-2">
            {labels.subtitle}
          </p>
        </div>

        {/* 15 Free Trial Banner / No Payment Required */}
        <div className="bg-gradient-to-r from-[#10B981]/20 via-[#0A0A10] to-[#7C3AED]/20 border border-[#10B981]/40 p-4 rounded-2xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#10B981] text-white font-black shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-white uppercase tracking-wider">Prueba Gratuita 15 Usos / Días</span>
                <span className="bg-[#10B981]/30 text-[#10B981] text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-[#10B981]/50">
                  SIN NECESIDAD DE PAGO
                </span>
              </div>
              <p className="text-[11px] text-gray-300 mt-0.5">
                Todos los usuarios pueden probar la app gratis por 15 días / cálculos. Los Administradores autorizados en el Panel Admin otorgan permisos completos.
              </p>
            </div>
          </div>
          <div className="bg-[#0A0A10] border border-white/10 px-3 py-1.5 rounded-xl text-xs font-bold text-[#10B981] whitespace-nowrap flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span>Acceso Gratuito Activo</span>
          </div>
        </div>

        {/* Quick Presets Bar */}
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl mb-8 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-extrabold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            {labels.presetsTitle}
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => applyPreset('short')}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#7C3AED]/30 text-xs font-semibold text-gray-200 border border-white/10 transition-colors"
            >
              🚗 {labels.presetShort}
            </button>
            <button
              onClick={() => applyPreset('airport')}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#7C3AED]/30 text-xs font-semibold text-gray-200 border border-white/10 transition-colors"
            >
              ✈️ {labels.presetAirport}
            </button>
            <button
              onClick={() => applyPreset('rush')}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#7C3AED]/30 text-xs font-semibold text-gray-200 border border-white/10 transition-colors"
            >
              🚦 {labels.presetRush}
            </button>
            <button
              onClick={() => applyPreset('trap')}
              className="px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-xs font-semibold text-rose-300 border border-rose-500/40 transition-colors"
            >
              ⚠️ {labels.presetTrap}
            </button>
          </div>
        </div>

        {/* Calculator Grid: Inputs on Left, GranScore Scorecard on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form Inputs (Col Span 7) */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            
            {/* Fare Value & Platform */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5 flex items-center justify-between">
                  <span>{labels.fareLabel}</span>
                  <span className="text-[#F59E0B] font-mono">{country.currencySymbol}</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#F59E0B] font-bold">
                    {country.currencySymbol}
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    value={fareValue}
                    onChange={(e) => setFareValue(parseFloat(e.target.value) || 0)}
                    className="w-full pl-12 pr-4 py-3 bg-[#0A0A10] border border-white/15 rounded-xl text-white font-black text-xl focus:border-[#7C3AED] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  {labels.platformLabel}
                </label>
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0A0A10] border border-white/15 rounded-xl text-white font-bold text-sm focus:border-[#7C3AED] focus:outline-none transition-colors"
                >
                  {country.platforms.concat(country.deliveryApps).map((plat) => (
                    <option key={plat} value={plat}>
                      {plat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pickup Km, Trip Km, Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  {labels.pickupLabel}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={pickupKm}
                    onChange={(e) => setPickupKm(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 bg-[#0A0A10] border border-white/15 rounded-xl text-white font-bold text-base focus:border-[#7C3AED] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-semibold text-gray-500">
                    {country.fuelUnit === 'gal' ? 'mi' : 'km'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  {labels.tripLabel}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={tripKm}
                    onChange={(e) => setTripKm(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 bg-[#0A0A10] border border-white/15 rounded-xl text-white font-bold text-base focus:border-[#7C3AED] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-semibold text-gray-500">
                    {country.fuelUnit === 'gal' ? 'mi' : 'km'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  {labels.durationLabel}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    value={durationMin}
                    onChange={(e) => setDurationMin(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-2.5 bg-[#0A0A10] border border-white/15 rounded-xl text-white font-bold text-base focus:border-[#7C3AED] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-semibold text-gray-500">
                    min
                  </span>
                </div>
              </div>
            </div>

            {/* Fuel / Energy Type Selection Pills */}
            <div className="pt-2 border-t border-white/10">
              <label className="block text-xs font-bold text-gray-300 mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Fuel className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Tipo de Combustível / Energia:</span>
                </span>
                <span className="text-[10px] text-gray-400 font-mono">
                  {fuelType === 'ev' ? '⚡ Elétrico (kWh)' : fuelType === 'cng' ? '🔥 GNV (m³)' : '⛽ Combustível'}
                </span>
              </label>
              <div className="grid grid-cols-5 gap-1.5 p-1 bg-[#0A0A10] border border-white/10 rounded-xl">
                <button
                  type="button"
                  onClick={() => handleFuelTypeChange('gasoline')}
                  className={`py-1.5 px-1 text-[11px] font-extrabold rounded-lg transition-all ${
                    fuelType === 'gasoline' ? 'bg-[#7C3AED] text-white shadow-md' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Gasolina
                </button>
                <button
                  type="button"
                  onClick={() => handleFuelTypeChange('ethanol')}
                  className={`py-1.5 px-1 text-[11px] font-extrabold rounded-lg transition-all ${
                    fuelType === 'ethanol' ? 'bg-[#10B981] text-white shadow-md' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Etanol
                </button>
                <button
                  type="button"
                  onClick={() => handleFuelTypeChange('cng')}
                  className={`py-1.5 px-1 text-[11px] font-extrabold rounded-lg transition-all ${
                    fuelType === 'cng' ? 'bg-[#F59E0B] text-white shadow-md' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  GNV
                </button>
                <button
                  type="button"
                  onClick={() => handleFuelTypeChange('ev')}
                  className={`py-1.5 px-1 text-[11px] font-extrabold rounded-lg transition-all ${
                    fuelType === 'ev' ? 'bg-cyan-500 text-white shadow-md' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  ⚡ Elétrico
                </button>
                <button
                  type="button"
                  onClick={() => handleFuelTypeChange('diesel')}
                  className={`py-1.5 px-1 text-[11px] font-extrabold rounded-lg transition-all ${
                    fuelType === 'diesel' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Diesel
                </button>
              </div>
            </div>

            {/* Fuel Price & Efficiency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Fuel className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>{fuelType === 'ev' ? `Preço Energia (${country.currencySymbol}/kWh)` : fuelType === 'cng' ? `Preço GNV (${country.currencySymbol}/m³)` : labels.fuelPriceLabel}</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-[#0A0A10] border border-white/15 rounded-xl text-white font-bold text-sm focus:border-[#7C3AED] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-[#7C3AED]" />
                  <span>{fuelType === 'ev' ? 'Autonomia (Km/kWh)' : fuelType === 'cng' ? 'Autonomia (Km/m³)' : labels.consumptionLabel}</span>
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={fuelConsumption}
                  onChange={(e) => setFuelConsumption(parseFloat(e.target.value) || 1)}
                  className="w-full px-4 py-2.5 bg-[#0A0A10] border border-white/15 rounded-xl text-white font-bold text-sm focus:border-[#7C3AED] focus:outline-none"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Scorecard (Col Span 5) */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-md relative overflow-hidden">
            
            {/* Top Glow bar based on verdict color */}
            <div 
              className="absolute top-0 left-0 right-0 h-2"
              style={{ backgroundColor: result.hexColor }}
            ></div>

            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-black text-gray-300 uppercase tracking-wider">
                SCORECARD GRANSCORE
              </span>
              <span className="text-xs font-extrabold text-[#F59E0B] flex items-center gap-1">
                {country.flag} {selectedPlatform}
              </span>
            </div>

            {/* Main Verdict Gauge display */}
            <div className="py-6 text-center space-y-3">
              <div 
                className="inline-flex items-center justify-center w-28 h-28 rounded-full border-4 shadow-xl transition-all duration-300"
                style={{ 
                  borderColor: result.hexColor, 
                  backgroundColor: `${result.hexColor}15`,
                  boxShadow: `0 0 30px ${result.hexColor}30`
                }}
              >
                <span className="text-5xl font-black text-white">
                  {result.score}
                </span>
              </div>

              {/* Verdict Banner */}
              <div 
                className="text-center font-black text-base px-6 py-2.5 rounded-full shadow-lg transition-all"
                style={{ 
                  backgroundColor: result.hexColor, 
                  color: result.color === 'yellow' ? '#0F172A' : '#FFFFFF' 
                }}
              >
                {result.color === 'green' && '🟢 '}
                {result.color === 'yellow' && '🟡 '}
                {result.color === 'red' && '🔴 '}
                {result.verdict}
              </div>

              <p className="text-xs font-bold text-slate-300 px-2">
                {result.summaryText}
              </p>
            </div>

            {/* Financial Breakdown Cards */}
            <div className="space-y-2.5 py-3 border-y border-purple-900/30">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  {labels.netProfit}
                </span>
                <span className={`text-base font-black ${result.netProfit > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {formatCurrency(result.netProfit, country)}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  {labels.hourlyProfit}
                </span>
                <span className="text-sm font-black text-amber-300 font-mono">
                  {formatCurrency(result.netProfitPerHour, country)}/h
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Fuel className="w-4 h-4 text-purple-400" />
                  {labels.fuelCost}
                </span>
                <span className="text-xs font-bold text-slate-300">
                  {formatCurrency(result.fuelCost, country)} ({result.fuelPercent.toFixed(1)}%)
                </span>
              </div>
            </div>

            {/* Recommendation Box */}
            <div className="mt-4 p-3.5 rounded-xl bg-purple-950/50 border border-purple-500/30 text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-amber-300 block mb-1">
                💡 Dica do GranScore:
              </span>
              {result.recommendation}
            </div>

            {/* Save to Meta Tracker CTA */}
            <div className="mt-5 space-y-2">
              <button
                onClick={handleSaveRide}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-slate-950 font-black text-sm py-3 px-4 rounded-xl shadow-lg shadow-amber-500/20 transition-all transform hover:scale-[1.02]"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>{labels.saveBtn}</span>
              </button>

              {savedSuccessAlert && (
                <div className="text-center text-xs font-bold text-emerald-400 bg-emerald-950/80 p-2 rounded-lg border border-emerald-500/40 animate-fade-in">
                  {labels.savedMsg}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
