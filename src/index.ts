// Main component
export { AstroMandala } from './components';

// Main component with modal
export { AstroMandalaWithModal } from './components';
export type { AstroMandalaWithModalProps, ModalSettings } from './components';

// Sub-components for advanced usage
export { ZodiacWheel, HouseWheel, PlanetDisplay, AspectLines } from './components';

// Types
export type {
    ZodiacSign,
    PlanetName,
    AspectType,
    PlanetPosition,
    HousePosition,
    Aspect,
    SynastryAspect,
    AstrologicalChart,
    BirthData,
    AspectColors,
    AstroMandalaProps,
    MandalaTheme,
    MandalaLanguage,
    // Orb configuration types
    PlanetCategory,
    OrbConfiguration,
    // Types for circular-natal-horoscope-js compatibility
    HoroscopeResult,
    HoroscopeCelestialBody,
    HoroscopeCelestialPoint,
    HoroscopeAngle,
    HoroscopeHouse,
    HoroscopeAspect,
    HoroscopeChartPosition,
    HoroscopeSign,
} from './types';

// Orb configuration constants
export { DEFAULT_ORBS, PLANET_CATEGORIES } from './types';

// Constants for reference
export {
    ZODIAC_SYMBOLS,
    PLANET_SYMBOLS,
    ZODIAC_ORDER,
    SIGN_START_DEGREES,
    ELEMENT_COLORS,
    SIGN_ELEMENTS,
    DEFAULT_ASPECT_COLORS,
    ASPECT_ANGLES,
    TRANSLATIONS,
    getTranslations,
} from './constants';

export type { Translations } from './constants';

// Utility functions
export {
    getAbsoluteDegree,
    getMandalaAngle,
    getPointOnCircle,
    formatDegree,
    normalizeAngle,
    getPlanetAbsoluteDegree,
    // Horoscope conversion utilities
    convertHoroscopeToChart,
    calculateSynastryAspects,
    calculateNatalAspects,
    getOrbForPlanets,
} from './utils';
