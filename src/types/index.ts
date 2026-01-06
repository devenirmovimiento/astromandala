/**
 * Zodiac sign names
 */
export type ZodiacSign =
    | 'Aries'
    | 'Taurus'
    | 'Gemini'
    | 'Cancer'
    | 'Leo'
    | 'Virgo'
    | 'Libra'
    | 'Scorpio'
    | 'Sagittarius'
    | 'Capricorn'
    | 'Aquarius'
    | 'Pisces';

/**
 * Planet and point names
 */
export type PlanetName =
    | 'Sun'
    | 'Moon'
    | 'Mercury'
    | 'Venus'
    | 'Mars'
    | 'Jupiter'
    | 'Saturn'
    | 'Uranus'
    | 'Neptune'
    | 'Pluto'
    | 'NorthNode'
    | 'SouthNode'
    | 'Chiron'
    | 'Lilith'
    | 'Ascendant'
    | 'Midheaven';

/**
 * Aspect types between planets
 */
export type AspectType =
    | 'conjunction'
    | 'opposition'
    | 'trine'
    | 'square'
    | 'sextile'
    | 'quincunx'
    | 'semisextile'
    | 'semisquare'
    | 'sesquiquadrate'
    | 'quintile'
    | 'biquintile';

/**
 * A planet or point position in the chart
 */
export interface PlanetPosition {
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
export interface HousePosition {
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
export interface Aspect {
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
export interface SynastryAspect {
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
export interface AstrologicalChart {
    /** Array of planet positions */
    planets: PlanetPosition[];
    /** Array of house cusps */
    houses: HousePosition[];
    /** Array of aspects within this chart */
    aspects: Aspect[];
    /** Optional label for the chart (e.g., person's name) */
    label?: string;
}

// ============================================
// Types compatible with circular-natal-horoscope-js
// ============================================

/**
 * ChartPosition structure from circular-natal-horoscope-js
 */
export interface HoroscopeChartPosition {
    Ecliptic: {
        DecimalDegrees: number;
        ArcDegrees?: { degrees: number; minutes: number; seconds: number };
        ArcDegreesFormatted?: string;
        ArcDegreesFormatted30?: string;
    };
    Horizon?: {
        DecimalDegrees: number;
        ArcDegrees?: { degrees: number; minutes: number; seconds: number };
        ArcDegreesFormatted?: string;
        ArcDegreesFormatted30?: string;
    };
}

/**
 * Sign structure from circular-natal-horoscope-js
 */
export interface HoroscopeSign {
    key: string;
    label: string;
}

/**
 * House structure from circular-natal-horoscope-js Houses array
 */
export interface HoroscopeHouse {
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
export interface HoroscopeCelestialBody {
    key: string;
    label: string;
    Sign: HoroscopeSign;
    ChartPosition: HoroscopeChartPosition;
    House?: { id: number; label: string };
    isRetrograde?: boolean;
}

/**
 * CelestialPoint structure (northnode, southnode, lilith)
 */
export interface HoroscopeCelestialPoint {
    key: string;
    label: string;
    Sign: HoroscopeSign;
    ChartPosition: HoroscopeChartPosition;
    House?: { id: number; label: string };
}

/**
 * Angle structure (Ascendant, Midheaven)
 */
export interface HoroscopeAngle {
    key: string;
    label: string;
    Sign: HoroscopeSign;
    ChartPosition: HoroscopeChartPosition;
}

/**
 * Aspect structure from circular-natal-horoscope-js
 */
export interface HoroscopeAspect {
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
export interface HoroscopeResult {
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
 * Colors for different aspect types
 */
export interface AspectColors {
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
export type MandalaTheme = 'light' | 'dark';

/**
 * Supported languages
 */
export type MandalaLanguage = 'en' | 'es';

/**
 * Props for the AstroMandala component
 */
export interface AstroMandalaProps {
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
