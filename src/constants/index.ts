import { ZodiacSign, PlanetName, AspectType, AspectColors } from '../types';

/**
 * Zodiac sign symbols (Unicode)
 */
export const ZODIAC_SYMBOLS: Record<ZodiacSign, string> = {
  Aries: '♈',
  Taurus: '♉',
  Gemini: '♊',
  Cancer: '♋',
  Leo: '♌',
  Virgo: '♍',
  Libra: '♎',
  Scorpio: '♏',
  Sagittarius: '♐',
  Capricorn: '♑',
  Aquarius: '♒',
  Pisces: '♓',
};

/**
 * Planet symbols (Unicode)
 */
export const PLANET_SYMBOLS: Record<PlanetName, string> = {
  Sun: '☉',
  Moon: '☽',
  Mercury: '☿',
  Venus: '♀',
  Mars: '♂',
  Jupiter: '♃',
  Saturn: '♄',
  Uranus: '♅',
  Neptune: '♆',
  Pluto: '⯓',
  NorthNode: '☊',
  SouthNode: '☋',
  Chiron: '⚷',
  Lilith: '⚸',
  Ascendant: 'AC',
  Midheaven: 'MC',
};

/**
 * Starting degree for each zodiac sign (0-360)
 */
export const SIGN_START_DEGREES: Record<ZodiacSign, number> = {
  Aries: 0,
  Taurus: 30,
  Gemini: 60,
  Cancer: 90,
  Leo: 120,
  Virgo: 150,
  Libra: 180,
  Scorpio: 210,
  Sagittarius: 240,
  Capricorn: 270,
  Aquarius: 300,
  Pisces: 330,
};

/**
 * Zodiac signs in order
 */
export const ZODIAC_ORDER: ZodiacSign[] = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
];

/**
 * Element colors for zodiac signs
 */
export const ELEMENT_COLORS: Record<string, string> = {
  fire: '#e63946',    // Aries, Leo, Sagittarius
  earth: '#588157',   // Taurus, Virgo, Capricorn
  air: '#457b9d',     // Gemini, Libra, Aquarius
  water: '#5a9fd4',   // Cancer, Scorpio, Pisces - lighter blue for visibility
};

/**
 * Get element for a zodiac sign
 */
export const SIGN_ELEMENTS: Record<ZodiacSign, string> = {
  Aries: 'fire',
  Taurus: 'earth',
  Gemini: 'air',
  Cancer: 'water',
  Leo: 'fire',
  Virgo: 'earth',
  Libra: 'air',
  Scorpio: 'water',
  Sagittarius: 'fire',
  Capricorn: 'earth',
  Aquarius: 'air',
  Pisces: 'water',
};

/**
 * Default aspect colors
 */
export const DEFAULT_ASPECT_COLORS: Required<AspectColors> = {
  conjunction: '#ffcc00',
  opposition: '#ff0000',
  trine: '#00cc00',
  square: '#cc0000',
  sextile: '#0066cc',
  quincunx: '#9933cc',
  semisextile: '#66cc99',
  semisquare: '#cc6666',
  sesquiquadrate: '#cc9966',
  quintile: '#cc66cc',
  biquintile: '#66cccc',
};

/**
 * Aspect angles in degrees
 */
export const ASPECT_ANGLES: Record<AspectType, number> = {
  conjunction: 0,
  opposition: 180,
  trine: 120,
  square: 90,
  sextile: 60,
  quincunx: 150,
  semisextile: 30,
  semisquare: 45,
  sesquiquadrate: 135,
  quintile: 72,
  biquintile: 144,
};

/**
 * Aspect line styles
 */
export const ASPECT_LINE_STYLES: Record<AspectType, { dashArray?: string; strokeWidth: number }> = {
  conjunction: { strokeWidth: 2 },
  opposition: { strokeWidth: 2 },
  trine: { strokeWidth: 1.5 },
  square: { strokeWidth: 1.5 },
  sextile: { strokeWidth: 1 },
  quincunx: { dashArray: '5,3', strokeWidth: 1 },
  semisextile: { dashArray: '3,3', strokeWidth: 0.75 },
  semisquare: { dashArray: '4,2', strokeWidth: 0.75 },
  sesquiquadrate: { dashArray: '4,2', strokeWidth: 0.75 },
  quintile: { dashArray: '2,2', strokeWidth: 0.75 },
  biquintile: { dashArray: '2,2', strokeWidth: 0.75 },
};

// Export translations
export { TRANSLATIONS, getTranslations } from './translations';
export type { Translations } from './translations';
