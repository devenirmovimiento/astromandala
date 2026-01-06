import * as react_jsx_runtime from 'react/jsx-runtime';

/**
 * Zodiac sign names
 */
type ZodiacSign = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';
/**
 * Planet and point names
 */
type PlanetName = 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'NorthNode' | 'SouthNode' | 'Chiron' | 'Lilith' | 'Ascendant' | 'Midheaven';
/**
 * Aspect types between planets
 */
type AspectType = 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile' | 'quincunx' | 'semisextile' | 'semisquare' | 'sesquiquadrate' | 'quintile' | 'biquintile';
/**
 * A planet or point position in the chart
 */
interface PlanetPosition {
    /** Name of the planet or point */
    planet: PlanetName;
    /** Zodiac sign the planet is in */
    sign: ZodiacSign;
    /** Degree within the sign (0-30) */
    degree: number;
    /** Whether the planet is retrograde */
    retrograde?: boolean;
}
/**
 * A house cusp in the chart
 */
interface HousePosition {
    /** House number (1-12) */
    house: number;
    /** Sign on the house cusp */
    sign: ZodiacSign;
    /** Degree of the cusp within the sign (0-30) */
    degree: number;
}
/**
 * An aspect between two planets within a single chart
 */
interface Aspect {
    /** First planet in the aspect */
    planet1: PlanetName;
    /** Second planet in the aspect */
    planet2: PlanetName;
    /** Type of aspect */
    aspect: AspectType;
    /** Orb (deviation from exact aspect) in degrees */
    orb: number;
    /** Whether this is an applying or separating aspect */
    applying?: boolean;
}
/**
 * An aspect between planets in two different charts (synastry)
 */
interface SynastryAspect {
    /** Planet from the first chart */
    planet1: PlanetName;
    /** Indicates which chart planet1 belongs to */
    chart1Owner: 'chart1' | 'chart2';
    /** Planet from the second chart */
    planet2: PlanetName;
    /** Indicates which chart planet2 belongs to */
    chart2Owner: 'chart1' | 'chart2';
    /** Type of aspect */
    aspect: AspectType;
    /** Orb (deviation from exact aspect) in degrees */
    orb: number;
}
/**
 * Complete astrological chart data
 */
interface AstrologicalChart {
    /** Array of planet positions */
    planets: PlanetPosition[];
    /** Array of house cusps */
    houses: HousePosition[];
    /** Array of aspects within this chart */
    aspects: Aspect[];
    /** Optional label for the chart (e.g., person's name) */
    label?: string;
}
/**
 * Birth data for a person
 */
interface BirthData {
    /** Person's name */
    name?: string;
    /** Birth date as string (e.g., "July 16, 1984" or "16/07/1984") */
    date?: string;
    /** Birth time as string (e.g., "18:15" or "6:15 PM") */
    time?: string;
    /** Birth location as string (e.g., "Buenos Aires, Argentina") */
    location?: string;
}
/**
 * ChartPosition structure from circular-natal-horoscope-js
 */
interface HoroscopeChartPosition {
    Ecliptic: {
        DecimalDegrees: number;
        ArcDegrees?: {
            degrees: number;
            minutes: number;
            seconds: number;
        };
        ArcDegreesFormatted?: string;
        ArcDegreesFormatted30?: string;
    };
    Horizon?: {
        DecimalDegrees: number;
        ArcDegrees?: {
            degrees: number;
            minutes: number;
            seconds: number;
        };
        ArcDegreesFormatted?: string;
        ArcDegreesFormatted30?: string;
    };
}
/**
 * Sign structure from circular-natal-horoscope-js
 */
interface HoroscopeSign {
    key: string;
    label: string;
}
/**
 * House structure from circular-natal-horoscope-js Houses array
 */
interface HoroscopeHouse {
    id: number;
    label: string;
    Sign: HoroscopeSign;
    ChartPosition: {
        StartPosition: HoroscopeChartPosition;
        EndPosition: HoroscopeChartPosition;
    };
}
/**
 * CelestialBody structure from circular-natal-horoscope-js
 */
interface HoroscopeCelestialBody {
    key: string;
    label: string;
    Sign: HoroscopeSign;
    ChartPosition: HoroscopeChartPosition;
    House?: {
        id: number;
        label: string;
    };
    isRetrograde?: boolean;
}
/**
 * CelestialPoint structure (northnode, southnode, lilith)
 */
interface HoroscopeCelestialPoint {
    key: string;
    label: string;
    Sign: HoroscopeSign;
    ChartPosition: HoroscopeChartPosition;
    House?: {
        id: number;
        label: string;
    };
}
/**
 * Angle structure (Ascendant, Midheaven)
 */
interface HoroscopeAngle {
    key: string;
    label: string;
    Sign: HoroscopeSign;
    ChartPosition: HoroscopeChartPosition;
}
/**
 * Aspect structure from circular-natal-horoscope-js
 */
interface HoroscopeAspect {
    point1Key: string;
    point2Key: string;
    aspectKey: string;
    orb: number;
    point1: HoroscopeCelestialBody | HoroscopeCelestialPoint | HoroscopeAngle;
    point2: HoroscopeCelestialBody | HoroscopeCelestialPoint | HoroscopeAngle;
}
/**
 * Horoscope object from circular-natal-horoscope-js
 * This represents the result of new Horoscope({...})
 */
interface HoroscopeResult {
    Ascendant: HoroscopeAngle;
    Midheaven: HoroscopeAngle;
    Houses: HoroscopeHouse[];
    CelestialBodies: {
        all: HoroscopeCelestialBody[];
        sun?: HoroscopeCelestialBody;
        moon?: HoroscopeCelestialBody;
        mercury?: HoroscopeCelestialBody;
        venus?: HoroscopeCelestialBody;
        mars?: HoroscopeCelestialBody;
        jupiter?: HoroscopeCelestialBody;
        saturn?: HoroscopeCelestialBody;
        uranus?: HoroscopeCelestialBody;
        neptune?: HoroscopeCelestialBody;
        pluto?: HoroscopeCelestialBody;
        chiron?: HoroscopeCelestialBody;
    };
    CelestialPoints: {
        all: HoroscopeCelestialPoint[];
        northnode?: HoroscopeCelestialPoint;
        southnode?: HoroscopeCelestialPoint;
        lilith?: HoroscopeCelestialPoint;
    };
    Aspects?: {
        all: HoroscopeAspect[];
        types?: Record<string, HoroscopeAspect[]>;
        points?: Record<string, HoroscopeAspect[]>;
    };
}
/**
 * Planet categories for orb configuration
 */
type PlanetCategory = 'luminaries' | 'personal' | 'social' | 'transpersonal' | 'points' | 'angles';
/**
 * Configuration for aspect orbs by planet category
 *
 * Default values:
 * - luminaries (Sun, Moon): 10°
 * - personal (Mercury, Venus, Mars): 8°
 * - social (Jupiter, Saturn): 6°
 * - transpersonal (Uranus, Neptune, Pluto): 5°
 * - points (Nodes, Chiron, Lilith): 5°
 * - angles (Ascendant, Midheaven): 5°
 */
interface OrbConfiguration {
    /** Orb for Sun and Moon (default: 10) */
    luminaries?: number;
    /** Orb for Mercury, Venus, Mars (default: 8) */
    personal?: number;
    /** Orb for Jupiter, Saturn (default: 6) */
    social?: number;
    /** Orb for Uranus, Neptune, Pluto (default: 5) */
    transpersonal?: number;
    /** Orb for Nodes, Chiron, Lilith (default: 5) */
    points?: number;
    /** Orb for Ascendant, Midheaven (default: 5) */
    angles?: number;
}
/**
 * Default orb values by planet category
 */
declare const DEFAULT_ORBS: Required<OrbConfiguration>;
/**
 * Map planets to their categories
 */
declare const PLANET_CATEGORIES: Record<PlanetName, PlanetCategory>;
/**
 * Colors for different aspect types
 */
interface AspectColors {
    conjunction?: string;
    opposition?: string;
    trine?: string;
    square?: string;
    sextile?: string;
    quincunx?: string;
    semisextile?: string;
    semisquare?: string;
    sesquiquadrate?: string;
    quintile?: string;
    biquintile?: string;
}
/**
 * Theme for the mandala
 */
type MandalaTheme = 'light' | 'dark';
/**
 * Supported languages
 */
type MandalaLanguage = 'en' | 'es';
/**
 * Props for the AstroMandala component
 */
interface AstroMandalaProps {
    /** Primary astrological chart */
    chart: AstrologicalChart;
    /** Secondary chart for synastry comparison */
    secondChart?: AstrologicalChart;
    /** Aspects between the two charts (for synastry) */
    synastryAspects?: SynastryAspect[];
    /** Size of the mandala in pixels */
    size?: number;
    /** Whether to show aspect lines */
    showAspects?: boolean;
    /** Whether to show degree numbers */
    showDegrees?: boolean;
    /** Whether to show house divisions */
    showHouses?: boolean;
    /** Whether to show second chart houses (synastry) */
    showSecondChartHouses?: boolean;
    /** Whether to show planet projection markers on the zodiac ring */
    showPlanetProjections?: boolean;
    /** Aspect types to display (if not provided, all aspects are shown) */
    aspectTypesFilter?: AspectType[];
    /** Whether to include AC, MC, DSC, IC in synastry aspects (default: false) */
    includeAnglesInSynastry?: boolean;
    /** Color for inner chart planets */
    innerChartColor?: string;
    /** Color for outer chart planets (synastry) */
    outerChartColor?: string;
    /** Custom colors for aspect lines */
    aspectColors?: AspectColors;
    /** Theme for the mandala (light or dark) */
    theme?: MandalaTheme;
    /** Language for labels (default: 'en') */
    language?: MandalaLanguage;
    /** Additional CSS class name */
    className?: string;
}

/**
 * AstroMandala - Astrological chart visualization component
 *
 * Displays a single natal chart or two charts overlapping (synastry).
 * The chart shows the zodiac wheel, house divisions, planet positions,
 * and aspect lines between planets.
 */
declare function AstroMandala({ chart, secondChart, synastryAspects, size, showAspects, showDegrees, showHouses, showSecondChartHouses, showPlanetProjections, aspectTypesFilter, includeAnglesInSynastry, innerChartColor, outerChartColor, aspectColors, theme, className, }: AstroMandalaProps): react_jsx_runtime.JSX.Element;

interface AstroMandalaWithModalProps extends AstroMandalaProps {
    /** Initial language setting */
    language?: MandalaLanguage;
    /** Whether to show the expand button */
    showExpandButton?: boolean;
    /** Whether to show chart info panel (default: false) */
    showChartInfo?: boolean;
    /** Position of the chart info panel: 'right' (default) or 'bottom' */
    chartInfoPosition?: 'right' | 'bottom';
    /** Title to display in the modal header when expanded */
    title?: string;
    /** Birth data for the primary chart */
    birthData?: BirthData;
    /** Birth data for the secondary chart (synastry) */
    secondBirthData?: BirthData;
    /** Whether to show birth data on the chart by default (default: false) */
    showBirthData?: boolean;
    /** Callback when settings change */
    onSettingsChange?: (settings: ModalSettings) => void;
}
interface ModalSettings {
    showAspects: boolean;
    showDegrees: boolean;
    showHouses: boolean;
    showSecondChartHouses: boolean;
    showPlanetProjections: boolean;
    showChartInfo: boolean;
    showBirthData: boolean;
    includeAnglesInSynastry: boolean;
    aspectTypesFilter: AspectType[];
    theme: MandalaTheme;
    language: MandalaLanguage;
}
/**
 * AstroMandala with an expand button and fullscreen modal with settings
 */
declare function AstroMandalaWithModal({ chart, secondChart, synastryAspects, size, showAspects: initialShowAspects, showDegrees: initialShowDegrees, showHouses: initialShowHouses, showSecondChartHouses: initialShowSecondChartHouses, showPlanetProjections: initialShowPlanetProjections, showChartInfo: initialShowChartInfo, chartInfoPosition, showBirthData: initialShowBirthData, aspectTypesFilter: initialAspectTypesFilter, includeAnglesInSynastry: initialIncludeAnglesInSynastry, innerChartColor, outerChartColor, aspectColors, theme: initialTheme, language: initialLanguage, className, showExpandButton, title, birthData, secondBirthData, onSettingsChange, }: AstroMandalaWithModalProps): react_jsx_runtime.JSX.Element;

interface ZodiacWheelProps {
    centerX: number;
    centerY: number;
    outerRadius: number;
    innerRadius: number;
    ascendantDegree?: number;
    theme?: MandalaTheme;
    /** Callback when mouse hovers over a zodiac sign */
    onSignHover?: (sign: ZodiacSign | null) => void;
    /** Currently hovered sign */
    hoveredSign?: ZodiacSign | null;
}
/**
 * Renders the zodiac sign wheel (outer ring of the mandala)
 */
declare function ZodiacWheel({ centerX, centerY, outerRadius, innerRadius, ascendantDegree, theme, onSignHover, hoveredSign, }: ZodiacWheelProps): react_jsx_runtime.JSX.Element;

interface HouseWheelProps {
    centerX: number;
    centerY: number;
    outerRadius: number;
    innerRadius: number;
    houses: HousePosition[];
    ascendantDegree?: number;
    isSecondChart?: boolean;
    color?: string;
    theme?: MandalaTheme;
}
/**
 * Renders the house divisions on the chart
 */
declare function HouseWheel({ centerX, centerY, outerRadius, innerRadius, houses, ascendantDegree, isSecondChart, color, theme, }: HouseWheelProps): react_jsx_runtime.JSX.Element;

interface PlanetDisplayProps {
    centerX: number;
    centerY: number;
    radius: number;
    planets: PlanetPosition[];
    ascendantDegree?: number;
    color?: string;
    showDegrees?: boolean;
    isOuter?: boolean;
    theme?: MandalaTheme;
    /** Callback when mouse hovers over a planet */
    onPlanetHover?: (planet: PlanetName | null) => void;
    /** Currently hovered planet */
    hoveredPlanet?: PlanetName | null;
    /** Sign being hovered - planets in this sign will be highlighted */
    highlightedSign?: ZodiacSign | null;
}
/**
 * Renders planets on the chart
 */
declare function PlanetDisplay({ centerX, centerY, radius, planets, ascendantDegree, color, showDegrees, isOuter, theme, onPlanetHover, hoveredPlanet, highlightedSign, }: PlanetDisplayProps): react_jsx_runtime.JSX.Element;

interface AspectLinesProps {
    centerX: number;
    centerY: number;
    radius: number;
    aspects?: Aspect[];
    synastryAspects?: SynastryAspect[];
    planets: PlanetPosition[];
    secondChartPlanets?: PlanetPosition[];
    ascendantDegree?: number;
    aspectColors?: AspectColors;
    /** Whether to include AC, MC, DSC, IC in synastry aspects */
    includeAnglesInSynastry?: boolean;
    /** Currently hovered planet - when set, only show aspects involving this planet */
    hoveredPlanet?: PlanetName | null;
}
/**
 * Renders aspect lines between planets
 */
declare function AspectLines({ centerX, centerY, radius, aspects, synastryAspects, planets, secondChartPlanets, ascendantDegree, aspectColors, includeAnglesInSynastry, hoveredPlanet, }: AspectLinesProps): react_jsx_runtime.JSX.Element;

/**
 * Translations for UI labels
 */
interface Translations {
    ASC: string;
    DSC: string;
    MC: string;
    IC: string;
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
    chart1: string;
    chart2: string;
    innerChart: string;
    outerChart: string;
    desktop: string;
    tablet: string;
    mobile: string;
    legend: string;
    aspectColors: string;
    showBirthData: string;
    downloadImage: string;
    birthDate: string;
    birthTime: string;
    birthLocation: string;
}
declare const TRANSLATIONS: Record<MandalaLanguage, Translations>;
/**
 * Get translations for a language
 */
declare function getTranslations(language?: MandalaLanguage): Translations;

/**
 * Zodiac sign symbols (Unicode)
 */
declare const ZODIAC_SYMBOLS: Record<ZodiacSign, string>;
/**
 * Planet symbols (Unicode)
 */
declare const PLANET_SYMBOLS: Record<PlanetName, string>;
/**
 * Starting degree for each zodiac sign (0-360)
 */
declare const SIGN_START_DEGREES: Record<ZodiacSign, number>;
/**
 * Zodiac signs in order
 */
declare const ZODIAC_ORDER: ZodiacSign[];
/**
 * Element colors for zodiac signs
 */
declare const ELEMENT_COLORS: Record<string, string>;
/**
 * Get element for a zodiac sign
 */
declare const SIGN_ELEMENTS: Record<ZodiacSign, string>;
/**
 * Default aspect colors
 */
declare const DEFAULT_ASPECT_COLORS: Required<AspectColors>;
/**
 * Aspect angles in degrees
 */
declare const ASPECT_ANGLES: Record<AspectType, number>;

/**
 * Get absolute degree (0-360) from sign and degree within sign
 */
declare function getAbsoluteDegree(sign: ZodiacSign, degree: number): number;
/**
 * Normalize an angle to 0-360 range
 */
declare function normalizeAngle(angle: number): number;
/**
 * Get the angle for positioning on the mandala wheel
 * The mandala has the Ascendant at the left (9 o'clock position)
 * and houses go counter-clockwise (1 → 2 → 3 goes down toward IC)
 */
declare function getMandalaAngle(absoluteDegree: number, ascendantDegree?: number): number;
/**
 * Calculate x,y coordinates on a circle given angle and radius
 */
declare function getPointOnCircle(centerX: number, centerY: number, radius: number, angleDegrees: number): {
    x: number;
    y: number;
};
/**
 * Get planet absolute degree
 */
declare function getPlanetAbsoluteDegree(planet: PlanetPosition): number;
/**
 * Format degree for display (e.g., "15°23'")
 */
declare function formatDegree(degree: number): string;

/**
 * Convert a Horoscope result from circular-natal-horoscope-js to AstrologicalChart
 *
 * @param horoscope - The Horoscope object from circular-natal-horoscope-js
 * @param label - Optional label for the chart (e.g., person's name)
 * @returns AstrologicalChart compatible with astromandala components
 *
 * @example
 * ```typescript
 * import { Origin, Horoscope } from 'circular-natal-horoscope-js';
 * import { convertHoroscopeToChart, AstroMandala } from 'astromandala';
 *
 * const origin = new Origin({
 *   year: 1984, month: 7, date: 16,
 *   hour: 18, minute: 15,
 *   latitude: -34.6037, longitude: -58.3816,
 * });
 *
 * const horoscope = new Horoscope({
 *   origin,
 *   houseSystem: 'placidus',
 *   zodiac: 'tropical',
 *   aspectTypes: ['major', 'minor'],
 *   aspectPoints: ['bodies', 'points', 'angles'],
 *   aspectWithPoints: ['bodies', 'points', 'angles'],
 * });
 *
 * const chart = convertHoroscopeToChart(horoscope, 'John Doe');
 * // Now use chart with <AstroMandala chart={chart} />
 * ```
 */
declare function convertHoroscopeToChart(horoscope: HoroscopeResult, label?: string): AstrologicalChart;
/**
 * Get the orb for an aspect between two planets based on their categories.
 * Uses the average of both planets' orbs for the aspect calculation.
 *
 * @param planet1 - First planet name
 * @param planet2 - Second planet name
 * @param orbConfig - Custom orb configuration (optional)
 * @returns The orb to use for this aspect
 */
declare function getOrbForPlanets(planet1: PlanetName, planet2: PlanetName, orbConfig?: OrbConfiguration): number;
/**
 * Calculate synastry aspects between two Horoscope results
 *
 * @param horoscope1 - First Horoscope from circular-natal-horoscope-js
 * @param horoscope2 - Second Horoscope from circular-natal-horoscope-js
 * @param orbConfig - Custom orbs by planet category (optional)
 * @returns Array of SynastryAspect objects
 *
 * @example
 * ```typescript
 * // Using default orbs (Sun/Moon: 10°, Personal: 8°, etc.)
 * const aspects = calculateSynastryAspects(horoscope1, horoscope2);
 *
 * // Using custom orbs
 * const aspects = calculateSynastryAspects(horoscope1, horoscope2, {
 *   luminaries: 12,  // Sun, Moon
 *   personal: 10,    // Mercury, Venus, Mars
 *   transpersonal: 6 // Uranus, Neptune, Pluto
 * });
 * ```
 */
declare function calculateSynastryAspects(horoscope1: HoroscopeResult, horoscope2: HoroscopeResult, orbConfig?: OrbConfiguration): SynastryAspect[];
/**
 * Calculate natal aspects within a single Horoscope
 *
 * This function calculates aspects between all planets in a single chart
 * using configurable orbs based on planet categories.
 *
 * @param horoscope - Horoscope from circular-natal-horoscope-js
 * @param orbConfig - Custom orbs by planet category (optional)
 * @param aspectTypes - Which aspect types to calculate (optional, defaults to all)
 * @returns Array of Aspect objects
 *
 * @example
 * ```typescript
 * // Calculate all aspects with default orbs
 * const aspects = calculateNatalAspects(horoscope);
 *
 * // Calculate only major aspects with tighter orbs
 * const aspects = calculateNatalAspects(horoscope,
 *   { luminaries: 8, personal: 6, transpersonal: 4 },
 *   ['conjunction', 'opposition', 'trine', 'square', 'sextile']
 * );
 * ```
 */
declare function calculateNatalAspects(horoscope: HoroscopeResult, orbConfig?: OrbConfiguration, aspectTypes?: AspectType[]): Aspect[];

export { ASPECT_ANGLES, type Aspect, type AspectColors, AspectLines, type AspectType, AstroMandala, type AstroMandalaProps, AstroMandalaWithModal, type AstroMandalaWithModalProps, type AstrologicalChart, type BirthData, DEFAULT_ASPECT_COLORS, DEFAULT_ORBS, ELEMENT_COLORS, type HoroscopeAngle, type HoroscopeAspect, type HoroscopeCelestialBody, type HoroscopeCelestialPoint, type HoroscopeChartPosition, type HoroscopeHouse, type HoroscopeResult, type HoroscopeSign, type HousePosition, HouseWheel, type MandalaLanguage, type MandalaTheme, type ModalSettings, type OrbConfiguration, PLANET_CATEGORIES, PLANET_SYMBOLS, type PlanetCategory, PlanetDisplay, type PlanetName, type PlanetPosition, SIGN_ELEMENTS, SIGN_START_DEGREES, type SynastryAspect, TRANSLATIONS, type Translations, ZODIAC_ORDER, ZODIAC_SYMBOLS, type ZodiacSign, ZodiacWheel, calculateNatalAspects, calculateSynastryAspects, convertHoroscopeToChart, formatDegree, getAbsoluteDegree, getMandalaAngle, getOrbForPlanets, getPlanetAbsoluteDegree, getPointOnCircle, getTranslations, normalizeAngle };
