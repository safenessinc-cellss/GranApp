import { GranScoreInput, GranScoreResult, CountryConfig } from '../types';
import { formatCurrency } from '../data/countries';

export function calculateGranScore(
  input: GranScoreInput,
  country: CountryConfig
): GranScoreResult {
  const { fareValue, pickupKm, tripKm, durationMin, fuelPrice, fuelConsumption } = input;

  const totalKm = Math.max(0.1, pickupKm + tripKm);
  const duration = Math.max(1, durationMin);

  // Fuel calculation
  // Check if unit is mpg (like US) or km/L
  const kmPerLiter = fuelConsumption > 0 ? fuelConsumption : 10;
  const litersConsumed = totalKm / kmPerLiter;
  const fuelCost = litersConsumed * fuelPrice;

  // Net earnings
  const netProfit = fareValue - fuelCost;
  const fuelPercent = fareValue > 0 ? (fuelCost / fareValue) * 100 : 100;
  
  const netProfitPerHour = (netProfit / duration) * 60;
  const netProfitPerKm = netProfit / totalKm;

  // Estimated platform hidden retention (typically ~26% of passenger total)
  const platformFeeEstimate = 26;

  // GranScore 0 - 100 Mathematical Algorithm
  let scorePoints = 50; // base

  // 1. Hourly Profit Weighting (normalized by country currency scale)
  // Reference hourly target per country
  let targetHourlyNet = 35; // BRL
  if (country.currencyCode === 'USD' || country.currencyCode === 'EUR' || country.currencyCode === 'GBP') {
    targetHourlyNet = 18;
  } else if (country.currencyCode === 'MXN') {
    targetHourlyNet = 120;
  } else if (country.currencyCode === 'COP') {
    targetHourlyNet = 28000;
  } else if (country.currencyCode === 'ARS') {
    targetHourlyNet = 8000;
  } else if (country.currencyCode === 'PEN') {
    targetHourlyNet = 25;
  } else if (country.currencyCode === 'CLP') {
    targetHourlyNet = 8500;
  }

  const hourlyRatio = netProfitPerHour / targetHourlyNet;
  scorePoints += (hourlyRatio - 1) * 35;

  // 2. Pickup Empty Miles Penalty
  const emptyRatio = pickupKm / totalKm;
  if (emptyRatio > 0.4) {
    scorePoints -= 25; // Excessive deadhead drive
  } else if (emptyRatio > 0.25) {
    scorePoints -= 12;
  } else if (pickupKm < 1.0) {
    scorePoints += 10; // Very close pickup bonus
  }

  // 3. Fuel Cost % Penalty
  if (fuelPercent > 35) {
    scorePoints -= 30; // Fuel eating most of pay
  } else if (fuelPercent > 22) {
    scorePoints -= 15;
  } else if (fuelPercent < 12) {
    scorePoints += 15; // High efficiency
  }

  // 4. Gross Fare minimum check
  if (netProfit <= 0) {
    scorePoints = 5;
  }

  // Clamp 0 - 100
  const finalScore = Math.min(100, Math.max(0, Math.round(scorePoints)));

  let verdict: 'ACEITAR' | 'AVALIAR' | 'REJEITAR' = 'AVALIAR';
  let color: 'green' | 'yellow' | 'red' = 'yellow';
  let hexColor = '#EAB308';
  let summaryText = '';
  let recommendation = '';

  if (finalScore >= 75) {
    verdict = 'ACEITAR';
    color = 'green';
    hexColor = '#22C55E';
    if (country.lang === 'pt') {
      summaryText = 'CORRIDA DE OURO! Altíssima rentabilidade por hora.';
      recommendation = `Aceite imediatamente. O seu lucro líquido estimado é de ${formatCurrency(netProfit, country)} (${formatCurrency(netProfitPerHour, country)}/hora). O combustível representa apenas ${fuelPercent.toFixed(1)}% do valor.`;
    } else if (country.lang === 'es') {
      summaryText = '¡VIAJE DE ORO! Altísima rentabilidad por hora.';
      recommendation = `Acepta de inmediato. Tu ganancia neta estimada es de ${formatCurrency(netProfit, country)} (${formatCurrency(netProfitPerHour, country)}/hora). El combustible representa solo el ${fuelPercent.toFixed(1)}% del valor.`;
    } else {
      summaryText = 'GOLDEN RIDE! Extremely high hourly profitability.';
      recommendation = `Accept immediately. Estimated net profit is ${formatCurrency(netProfit, country)} (${formatCurrency(netProfitPerHour, country)}/hr). Fuel accounts for only ${fuelPercent.toFixed(1)}% of total fare.`;
    }
  } else if (finalScore >= 50) {
    verdict = 'AVALIAR';
    color = 'yellow';
    hexColor = '#EAB308';
    if (country.lang === 'pt') {
      summaryText = 'CORRIDA REGULAR. Lucro aceitável, mas com ressalvas.';
      recommendation = `Avalie se o destino te aproxima de casa ou de uma área com tarifa dinâmica. Lucro por hora: ${formatCurrency(netProfitPerHour, country)}/h. O custo de deslocamento até o passageiro é de ${pickupKm} km.`;
    } else if (country.lang === 'es') {
      summaryText = 'VIAJE REGULAR. Ganancia aceptable con precauciones.';
      recommendation = `Evalúa si el destino te acerca a casa o a una zona con tarifa dinámica. Ganancia por hora: ${formatCurrency(netProfitPerHour, country)}/h. Distancia de recogida: ${pickupKm} km.`;
    } else {
      summaryText = 'AVERAGE RIDE. Decent pay with caveats.';
      recommendation = `Consider if heading towards home or surge areas. Net hourly rate: ${formatCurrency(netProfitPerHour, country)}/hr. Pickup distance is ${pickupKm} km/mi.`;
    }
  } else {
    verdict = 'REJEITAR';
    color = 'red';
    hexColor = '#EF4444';
    if (country.lang === 'pt') {
      summaryText = 'CORRIDA PREJUÍZO! Você pagará para trabalhar.';
      recommendation = `Rejeite sem culpa! O combustível devorará ${fuelPercent.toFixed(1)}% do valor bruto. Sobrará apenas ${formatCurrency(netProfit, country)} de lucro líquido por ${duration} minutos de desgaste.`;
    } else if (country.lang === 'es') {
      summaryText = '¡VIAJE PÉRDIDA! Pagará por trabajar.';
      recommendation = `¡Rechaza sin dudar! El combustible consumirá el ${fuelPercent.toFixed(1)}% del valor bruto. Solo te quedarán ${formatCurrency(netProfit, country)} de ganancia neta por ${duration} minutos.`;
    } else {
      summaryText = 'MONEY LOSER RIDE! You are paying to drive.';
      recommendation = `Reject without hesitation! Gas eats up ${fuelPercent.toFixed(1)}% of gross fare. You earn only ${formatCurrency(netProfit, country)} net for ${duration} mins of vehicle wear.`;
    }
  }

  return {
    score: finalScore,
    verdict,
    color,
    hexColor,
    grossFare: fareValue,
    totalKm,
    durationMin: duration,
    fuelCost,
    fuelPercent,
    netProfit,
    netProfitPerHour,
    netProfitPerKm,
    platformFeeEstimate,
    summaryText,
    recommendation,
  };
}
