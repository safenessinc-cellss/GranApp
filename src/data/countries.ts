import { CountryConfig, Language } from '../types';

export const COUNTRIES: Record<string, CountryConfig> = {
  BR: {
    code: 'BR',
    name: 'Brasil',
    flag: '🇧🇷',
    currencySymbol: 'R$',
    currencyCode: 'BRL',
    lang: 'pt',
    defaultFuelPrice: 5.89,
    fuelUnit: 'L',
    platforms: ['Uber', '99', 'DiDi', 'InDrive'],
    deliveryApps: ['iFood', 'Rappi', 'Loggi'],
    pricing: {
      monthly: 29.90,
      quarterlyMonthly: 27.80,
      annualMonthly: 22.70,
    },
  },
  MX: {
    code: 'MX',
    name: 'México',
    flag: '🇲🇽',
    currencySymbol: 'MX$',
    currencyCode: 'MXN',
    lang: 'es',
    defaultFuelPrice: 24.50,
    fuelUnit: 'L',
    platforms: ['Uber', 'DiDi', 'Cabify', 'InDrive', 'Beat'],
    deliveryApps: ['Rappi', 'Uber Eats', 'Didi Food'],
    pricing: {
      monthly: 129,
      quarterlyMonthly: 119,
      annualMonthly: 98,
    },
  },
  US: {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currencySymbol: 'US$',
    currencyCode: 'USD',
    lang: 'en',
    defaultFuelPrice: 3.65,
    fuelUnit: 'gal',
    platforms: ['Uber', 'Lyft', 'InDrive'],
    deliveryApps: ['DoorDash', 'Grubhub', 'Instacart', 'Uber Eats'],
    pricing: {
      monthly: 9.99,
      quarterlyMonthly: 9.29,
      annualMonthly: 7.59,
    },
  },
  CO: {
    code: 'CO',
    name: 'Colombia',
    flag: '🇨🇴',
    currencySymbol: 'COP$',
    currencyCode: 'COP',
    lang: 'es',
    defaultFuelPrice: 15400,
    fuelUnit: 'gal',
    platforms: ['Uber', 'DiDi', 'Cabify', 'InDrive', 'Picap'],
    deliveryApps: ['Rappi', 'Uber Eats'],
    pricing: {
      monthly: 32000,
      quarterlyMonthly: 29700,
      annualMonthly: 24300,
    },
  },
  AR: {
    code: 'AR',
    name: 'Argentina',
    flag: '🇦🇷',
    currencySymbol: 'ARS$',
    currencyCode: 'ARS',
    lang: 'es',
    defaultFuelPrice: 1050,
    fuelUnit: 'L',
    platforms: ['Uber', 'Cabify', 'DiDi', 'InDrive'],
    deliveryApps: ['Rappi', 'PedidosYa'],
    pricing: {
      monthly: 9500,
      quarterlyMonthly: 8800,
      annualMonthly: 7200,
    },
  },
  ES: {
    code: 'ES',
    name: 'España / UE',
    flag: '🇪🇸',
    currencySymbol: '€',
    currencyCode: 'EUR',
    lang: 'es',
    defaultFuelPrice: 1.62,
    fuelUnit: 'L',
    platforms: ['Uber', 'Cabify', 'Bolt'],
    deliveryApps: ['Deliveroo', 'Glovo', 'Just Eat', 'Uber Eats'],
    pricing: {
      monthly: 8.90,
      quarterlyMonthly: 8.20,
      annualMonthly: 6.70,
    },
  },
  PE: {
    code: 'PE',
    name: 'Perú',
    flag: '🇵🇪',
    currencySymbol: 'S/',
    currencyCode: 'PEN',
    lang: 'es',
    defaultFuelPrice: 18.20,
    fuelUnit: 'gal',
    platforms: ['Uber', 'DiDi', 'InDrive', 'Cabify'],
    deliveryApps: ['Rappi', 'PedidosYa'],
    pricing: {
      monthly: 35,
      quarterlyMonthly: 32.5,
      annualMonthly: 26.5,
    },
  },
  CL: {
    code: 'CL',
    name: 'Chile',
    flag: '🇨🇱',
    currencySymbol: 'CLP$',
    currencyCode: 'CLP',
    lang: 'es',
    defaultFuelPrice: 1320,
    fuelUnit: 'L',
    platforms: ['Uber', 'DiDi', 'Cabify', 'InDrive'],
    deliveryApps: ['Rappi', 'Uber Eats', 'Justo'],
    pricing: {
      monthly: 8900,
      quarterlyMonthly: 8200,
      annualMonthly: 6700,
    },
  },
  GB: {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currencySymbol: '£',
    currencyCode: 'GBP',
    lang: 'en',
    defaultFuelPrice: 1.48,
    fuelUnit: 'L',
    platforms: ['Uber', 'Bolt', 'Ola'],
    deliveryApps: ['Deliveroo', 'Just Eat', 'Uber Eats'],
    pricing: {
      monthly: 7.99,
      quarterlyMonthly: 7.40,
      annualMonthly: 6.00,
    },
  },
};

export const DEFAULT_COUNTRY = COUNTRIES['BR'];

export function detectUserCountry(): CountryConfig {
  try {
    const navLang = navigator.language.toLowerCase();
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (tz.includes('Sao_Paulo') || tz.includes('Fortaleza') || tz.includes('Manaus') || navLang.includes('pt-br')) {
      return COUNTRIES['BR'];
    }
    if (tz.includes('Mexico') || navLang.includes('es-mx')) {
      return COUNTRIES['MX'];
    }
    if (tz.includes('Bogota') || navLang.includes('es-co')) {
      return COUNTRIES['CO'];
    }
    if (tz.includes('Buenos_Aires') || navLang.includes('es-ar')) {
      return COUNTRIES['AR'];
    }
    if (tz.includes('Madrid') || tz.includes('Canary') || navLang.includes('es-es')) {
      return COUNTRIES['ES'];
    }
    if (tz.includes('Lima') || navLang.includes('es-pe')) {
      return COUNTRIES['PE'];
    }
    if (tz.includes('Santiago') || navLang.includes('es-cl')) {
      return COUNTRIES['CL'];
    }
    if (tz.includes('London') || navLang.includes('en-gb')) {
      return COUNTRIES['GB'];
    }
    if (navLang.startsWith('es')) {
      return COUNTRIES['MX'];
    }
    if (navLang.startsWith('en')) {
      return COUNTRIES['US'];
    }
  } catch (e) {
    console.warn('Country auto-detect fallback to BR', e);
  }
  return DEFAULT_COUNTRY;
}

export function formatCurrency(value: number, country: CountryConfig): string {
  const isHighValueCurrency = ['COP', 'CLP', 'ARS'].includes(country.currencyCode);
  const formattedNumber = value.toLocaleString(
    country.lang === 'pt' ? 'pt-BR' : country.lang === 'es' ? 'es-ES' : 'en-US',
    {
      minimumFractionDigits: isHighValueCurrency ? 0 : 2,
      maximumFractionDigits: isHighValueCurrency ? 0 : 2,
    }
  );
  return `${country.currencySymbol} ${formattedNumber}`;
}
