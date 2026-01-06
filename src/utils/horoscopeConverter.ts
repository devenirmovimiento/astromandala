import {
    AstrologicalChart,
    PlanetPosition,
    HousePosition,
    Aspect,
    ZodiacSign,
    PlanetName,
    AspectType,
    HoroscopeResult,
    HoroscopeCelestialBody,
    HoroscopeCelestialPoint,
    HoroscopeAngle,
    HoroscopeHouse,
    HoroscopeAspect,
    OrbConfiguration,
    DEFAULT_ORBS,
    PLANET_CATEGORIES,
    PlanetCategory,
} from '../types';

/**
 * Mapping from circular-natal-horoscope-js sign keys to ZodiacSign type
 */
const SIGN_KEY_MAP: Record<string, ZodiacSign> = {
    aries: 'Aries',
    taurus: 'Taurus',
    gemini: 'Gemini',
    cancer: 'Cancer',
    leo: 'Leo',
    virgo: 'Virgo',
    libra: 'Libra',
    scorpio: 'Scorpio',
    sagittarius: 'Sagittarius',
    capricorn: 'Capricorn',
    aquarius: 'Aquarius',
    pisces: 'Pisces',
};

/**
 * Mapping from circular-natal-horoscope-js body/point/angle keys to PlanetName type
 */
const PLANET_KEY_MAP: Record<string, PlanetName> = {
    sun: 'Sun',
    moon: 'Moon',
    mercury: 'Mercury',
    venus: 'Venus',
    mars: 'Mars',
    jupiter: 'Jupiter',
    saturn: 'Saturn',
    uranus: 'Uranus',
    neptune: 'Neptune',
    pluto: 'Pluto',
    northnode: 'NorthNode',
    southnode: 'SouthNode',
    chiron: 'Chiron',
    lilith: 'Lilith',
    ascendant: 'Ascendant',
    midheaven: 'Midheaven',
};

/**
 * Mapping from circular-natal-horoscope-js aspect keys to AspectType
 */
const ASPECT_KEY_MAP: Record<string, AspectType> = {
    conjunction: 'conjunction',
    opposition: 'opposition',
    trine: 'trine',
    square: 'square',
    sextile: 'sextile',
    quincunx: 'quincunx',
    quintile: 'quintile',
    septile: 'semisextile', // septile not supported, map to semisextile
    'semi-square': 'semisquare',
    'semi-sextile': 'semisextile',
};

/**
 * Convert a sign key from circular-natal-horoscope-js to ZodiacSign
 */
function convertSignKey(key: string): ZodiacSign {
    const normalizedKey = key.toLowerCase();
    return SIGN_KEY_MAP[normalizedKey] || 'Aries';
}

/**
 * Convert a planet/point/angle key from circular-natal-horoscope-js to PlanetName
 */
function convertPlanetKey(key: string): PlanetName | null {
    const normalizedKey = key.toLowerCase();
    return PLANET_KEY_MAP[normalizedKey] || null;
}

/**
 * Convert an aspect key from circular-natal-horoscope-js to AspectType
 */
function convertAspectKey(key: string): AspectType | null {
    const normalizedKey = key.toLowerCase();
    return ASPECT_KEY_MAP[normalizedKey] || null;
}

/**
 * Calculate degree within sign (0-30) from ecliptic decimal degrees (0-360)
 */
function getDegreeInSign(eclipticDegrees: number): number {
    return eclipticDegrees % 30;
}

/**
 * Get zodiac sign from ecliptic degrees (0-360)
 */
function getSignFromDegrees(eclipticDegrees: number): ZodiacSign {
    const signs: ZodiacSign[] = [
        'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
        'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ];
    const signIndex = Math.floor(eclipticDegrees / 30) % 12;
    return signs[signIndex];
}

/**
 * Convert a CelestialBody from circular-natal-horoscope-js to PlanetPosition
 */
function convertCelestialBody(body: HoroscopeCelestialBody): PlanetPosition | null {
    const planetName = convertPlanetKey(body.key);
    if (!planetName) return null;

    const eclipticDegrees = body.ChartPosition.Ecliptic.DecimalDegrees;

    return {
        planet: planetName,
        sign: body.Sign?.key ? convertSignKey(body.Sign.key) : getSignFromDegrees(eclipticDegrees),
        degree: getDegreeInSign(eclipticDegrees),
        retrograde: body.isRetrograde || false,
    };
}

/**
 * Convert a CelestialPoint from circular-natal-horoscope-js to PlanetPosition
 */
function convertCelestialPoint(point: HoroscopeCelestialPoint): PlanetPosition | null {
    const planetName = convertPlanetKey(point.key);
    if (!planetName) return null;

    const eclipticDegrees = point.ChartPosition.Ecliptic.DecimalDegrees;

    return {
        planet: planetName,
        sign: point.Sign?.key ? convertSignKey(point.Sign.key) : getSignFromDegrees(eclipticDegrees),
        degree: getDegreeInSign(eclipticDegrees),
    };
}

/**
 * Convert an Angle (Ascendant/Midheaven) from circular-natal-horoscope-js to PlanetPosition
 */
function convertAngle(angle: HoroscopeAngle): PlanetPosition | null {
    const planetName = convertPlanetKey(angle.key);
    if (!planetName) return null;

    const eclipticDegrees = angle.ChartPosition.Ecliptic.DecimalDegrees;

    return {
        planet: planetName,
        sign: angle.Sign?.key ? convertSignKey(angle.Sign.key) : getSignFromDegrees(eclipticDegrees),
        degree: getDegreeInSign(eclipticDegrees),
    };
}

/**
 * Convert a House from circular-natal-horoscope-js to HousePosition
 */
function convertHouse(house: HoroscopeHouse): HousePosition {
    const eclipticDegrees = house.ChartPosition.StartPosition.Ecliptic.DecimalDegrees;

    return {
        house: house.id,
        sign: house.Sign?.key ? convertSignKey(house.Sign.key) : getSignFromDegrees(eclipticDegrees),
        degree: getDegreeInSign(eclipticDegrees),
    };
}

/**
 * Convert an Aspect from circular-natal-horoscope-js to Aspect
 */
function convertAspect(aspect: HoroscopeAspect): Aspect | null {
    const planet1 = convertPlanetKey(aspect.point1Key);
    const planet2 = convertPlanetKey(aspect.point2Key);
    const aspectType = convertAspectKey(aspect.aspectKey);

    if (!planet1 || !planet2 || !aspectType) return null;

    return {
        planet1,
        planet2,
        aspect: aspectType,
        orb: aspect.orb,
    };
}

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
export function convertHoroscopeToChart(
    horoscope: HoroscopeResult,
    label?: string
): AstrologicalChart {
    const planets: PlanetPosition[] = [];
    const houses: HousePosition[] = [];
    const aspects: Aspect[] = [];

    // Convert CelestialBodies
    if (horoscope.CelestialBodies?.all) {
        for (const body of horoscope.CelestialBodies.all) {
            const converted = convertCelestialBody(body);
            if (converted) planets.push(converted);
        }
    }

    // Convert CelestialPoints (NorthNode, SouthNode, Lilith)
    if (horoscope.CelestialPoints?.all) {
        for (const point of horoscope.CelestialPoints.all) {
            const converted = convertCelestialPoint(point);
            if (converted) planets.push(converted);
        }
    }

    // Convert Ascendant
    if (horoscope.Ascendant) {
        const ascendant = convertAngle(horoscope.Ascendant);
        if (ascendant) planets.push(ascendant);
    }

    // Convert Midheaven
    if (horoscope.Midheaven) {
        const midheaven = convertAngle(horoscope.Midheaven);
        if (midheaven) planets.push(midheaven);
    }

    // Convert Houses
    if (horoscope.Houses) {
        for (const house of horoscope.Houses) {
            houses.push(convertHouse(house));
        }
    }

    // Convert Aspects
    if (horoscope.Aspects?.all) {
        for (const aspect of horoscope.Aspects.all) {
            const converted = convertAspect(aspect);
            if (converted) aspects.push(converted);
        }
    }

    return {
        label,
        planets,
        houses,
        aspects,
    };
}

/**
 * Aspect angles for each aspect type
 */
const ASPECT_ANGLES: Record<AspectType, number> = {
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
 * Get the orb for an aspect between two planets based on their categories.
 * Uses the average of both planets' orbs for the aspect calculation.
 * 
 * @param planet1 - First planet name
 * @param planet2 - Second planet name
 * @param orbConfig - Custom orb configuration (optional)
 * @returns The orb to use for this aspect
 */
export function getOrbForPlanets(
    planet1: PlanetName,
    planet2: PlanetName,
    orbConfig: OrbConfiguration = {}
): number {
    const config = { ...DEFAULT_ORBS, ...orbConfig };

    const cat1 = PLANET_CATEGORIES[planet1];
    const cat2 = PLANET_CATEGORIES[planet2];

    const orb1 = config[cat1];
    const orb2 = config[cat2];

    // Use the average of both orbs
    return (orb1 + orb2) / 2;
}

/**
 * Get planets with their ecliptic degrees from a Horoscope
 */
function getPlanetsWithDegrees(horoscope: HoroscopeResult): Array<{ key: string; degrees: number }> {
    const result: Array<{ key: string; degrees: number }> = [];

    if (horoscope.CelestialBodies?.all) {
        for (const body of horoscope.CelestialBodies.all) {
            result.push({ key: body.key, degrees: body.ChartPosition.Ecliptic.DecimalDegrees });
        }
    }

    if (horoscope.CelestialPoints?.all) {
        for (const point of horoscope.CelestialPoints.all) {
            result.push({ key: point.key, degrees: point.ChartPosition.Ecliptic.DecimalDegrees });
        }
    }

    if (horoscope.Ascendant) {
        result.push({ key: 'ascendant', degrees: horoscope.Ascendant.ChartPosition.Ecliptic.DecimalDegrees });
    }

    if (horoscope.Midheaven) {
        result.push({ key: 'midheaven', degrees: horoscope.Midheaven.ChartPosition.Ecliptic.DecimalDegrees });
    }

    return result;
}

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
export function calculateSynastryAspects(
    horoscope1: HoroscopeResult,
    horoscope2: HoroscopeResult,
    orbConfig: OrbConfiguration = {}
): import('../types').SynastryAspect[] {
    const synastryAspects: import('../types').SynastryAspect[] = [];

    const planets1 = getPlanetsWithDegrees(horoscope1);
    const planets2 = getPlanetsWithDegrees(horoscope2);

    // Check each pair for aspects
    for (const p1 of planets1) {
        for (const p2 of planets2) {
            const planet1 = convertPlanetKey(p1.key);
            const planet2 = convertPlanetKey(p2.key);

            if (!planet1 || !planet2) continue;

            const diff = Math.abs(p1.degrees - p2.degrees);
            const normalizedDiff = diff > 180 ? 360 - diff : diff;

            // Get the orb based on both planets' categories
            const maxOrb = getOrbForPlanets(planet1, planet2, orbConfig);

            for (const [aspectType, angle] of Object.entries(ASPECT_ANGLES)) {
                const aspectDiff = Math.abs(normalizedDiff - angle);

                if (aspectDiff <= maxOrb) {
                    synastryAspects.push({
                        planet1,
                        chart1Owner: 'chart1',
                        planet2,
                        chart2Owner: 'chart2',
                        aspect: aspectType as AspectType,
                        orb: aspectDiff,
                    });
                    break; // Only one aspect per pair
                }
            }
        }
    }

    return synastryAspects;
}

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
export function calculateNatalAspects(
    horoscope: HoroscopeResult,
    orbConfig: OrbConfiguration = {},
    aspectTypes?: AspectType[]
): Aspect[] {
    const aspects: Aspect[] = [];
    const planets = getPlanetsWithDegrees(horoscope);

    const typesToCheck = aspectTypes || (Object.keys(ASPECT_ANGLES) as AspectType[]);

    // Check each pair for aspects (avoid duplicates)
    for (let i = 0; i < planets.length; i++) {
        for (let j = i + 1; j < planets.length; j++) {
            const p1 = planets[i];
            const p2 = planets[j];

            const planet1 = convertPlanetKey(p1.key);
            const planet2 = convertPlanetKey(p2.key);

            if (!planet1 || !planet2) continue;

            const diff = Math.abs(p1.degrees - p2.degrees);
            const normalizedDiff = diff > 180 ? 360 - diff : diff;

            // Get the orb based on both planets' categories
            const maxOrb = getOrbForPlanets(planet1, planet2, orbConfig);

            for (const aspectType of typesToCheck) {
                const angle = ASPECT_ANGLES[aspectType];
                const aspectDiff = Math.abs(normalizedDiff - angle);

                if (aspectDiff <= maxOrb) {
                    aspects.push({
                        planet1,
                        planet2,
                        aspect: aspectType,
                        orb: aspectDiff,
                    });
                    break; // Only one aspect per pair
                }
            }
        }
    }

    return aspects;
}
