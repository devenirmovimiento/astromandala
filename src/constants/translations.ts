import { MandalaLanguage } from '../types';

/**
 * Translations for UI labels
 */
export interface Translations {
  // Angle labels
  ASC: string;
  DSC: string;
  MC: string;
  IC: string;
  
  // UI labels for modal/settings
  settings: string;
  close: string;
  expand: string;
  showSynastry: string;
  showAspects: string;
  showDegrees: string;
  showHouses: string;
  showChart2Houses: string;
  showPlanetProjections: string;
  showChartInfo: string;
  includeAnglesInSynastry: string;
  aspectTypes: string;
  majorAspects: string;
  minorAspects: string;
  theme: string;
  language: string;
  light: string;
  dark: string;
  english: string;
  spanish: string;
  
  // Aspect names
  conjunction: string;
  opposition: string;
  trine: string;
  square: string;
  sextile: string;
  quincunx: string;
  semisextile: string;
  semisquare: string;
  sesquiquadrate: string;
  quintile: string;
  biquintile: string;
  
  // Chart labels
  chart1: string;
  chart2: string;
  innerChart: string;
  outerChart: string;
  
  // Size labels
  desktop: string;
  tablet: string;
  mobile: string;
  
  // Legend
  legend: string;
  aspectColors: string;
}

export const TRANSLATIONS: Record<MandalaLanguage, Translations> = {
  en: {
    // Angle labels
    ASC: 'ASC',
    DSC: 'DSC',
    MC: 'MC',
    IC: 'IC',
    
    // UI labels
    settings: 'Settings',
    close: 'Close',
    expand: 'Expand',
    showSynastry: 'Show Synastry (Two Charts)',
    showAspects: 'Show Aspects',
    showDegrees: 'Show Degrees',
    showHouses: 'Show Houses',
    showChart2Houses: 'Show Chart 2 Houses',
    showPlanetProjections: 'Show Planet Projections',
    showChartInfo: 'Show Chart Info Panel',
    includeAnglesInSynastry: 'Include AC/MC in Synastry Aspects',
    aspectTypes: 'Aspect Types',
    majorAspects: 'Major Aspects',
    minorAspects: 'Minor Aspects',
    theme: 'Theme',
    language: 'Language',
    light: 'Light',
    dark: 'Dark',
    english: 'English',
    spanish: 'Español',
    
    // Aspect names
    conjunction: 'Conjunction',
    opposition: 'Opposition',
    trine: 'Trine',
    square: 'Square',
    sextile: 'Sextile',
    quincunx: 'Quincunx',
    semisextile: 'Semisextile',
    semisquare: 'Semisquare',
    sesquiquadrate: 'Sesquiquadrate',
    quintile: 'Quintile',
    biquintile: 'Biquintile',
    
    // Chart labels
    chart1: 'Chart 1',
    chart2: 'Chart 2',
    innerChart: 'Inner Chart',
    outerChart: 'Outer Chart',
    
    // Size labels
    desktop: 'Desktop',
    tablet: 'Tablet',
    mobile: 'Mobile',
    
    // Legend
    legend: 'Legend',
    aspectColors: 'Aspect colors',
  },
  es: {
    // Angle labels
    ASC: 'ASC',
    DSC: 'DSC',
    MC: 'MC',
    IC: 'IC',
    
    // UI labels
    settings: 'Configuración',
    close: 'Cerrar',
    expand: 'Expandir',
    showSynastry: 'Mostrar Sinastría (Dos Cartas)',
    showAspects: 'Mostrar Aspectos',
    showDegrees: 'Mostrar Grados',
    showHouses: 'Mostrar Casas',
    showChart2Houses: 'Mostrar Casas de Carta 2',
    showPlanetProjections: 'Mostrar Proyecciones Planetarias',
    showChartInfo: 'Mostrar Panel de Info',
    includeAnglesInSynastry: 'Incluir AC/MC en Aspectos de Sinastría',
    aspectTypes: 'Tipos de Aspectos',
    majorAspects: 'Aspectos Mayores',
    minorAspects: 'Aspectos Menores',
    theme: 'Tema',
    language: 'Idioma',
    light: 'Claro',
    dark: 'Oscuro',
    english: 'English',
    spanish: 'Español',
    
    // Aspect names
    conjunction: 'Conjunción',
    opposition: 'Oposición',
    trine: 'Trígono',
    square: 'Cuadratura',
    sextile: 'Sextil',
    quincunx: 'Quincuncio',
    semisextile: 'Semisextil',
    semisquare: 'Semicuadratura',
    sesquiquadrate: 'Sesquicuadratura',
    quintile: 'Quintil',
    biquintile: 'Biquintil',
    
    // Chart labels
    chart1: 'Carta 1',
    chart2: 'Carta 2',
    innerChart: 'Carta Interior',
    outerChart: 'Carta Exterior',
    
    // Size labels
    desktop: 'Escritorio',
    tablet: 'Tableta',
    mobile: 'Móvil',
    
    // Legend
    legend: 'Leyenda',
    aspectColors: 'Colores de aspectos',
  },
};

/**
 * Get translations for a language
 */
export function getTranslations(language: MandalaLanguage = 'en'): Translations {
  return TRANSLATIONS[language];
}
