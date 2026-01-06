import { ZodiacSign, PlanetPosition } from '../types';
import { SIGN_START_DEGREES } from '../constants';

/**
 * Convert degrees to radians
 */
export function degreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
}

/**
 * Convert radians to degrees
 */
export function radiansToDegrees(radians: number): number {
    return (radians * 180) / Math.PI;
}

/**
 * Get absolute degree (0-360) from sign and degree within sign
 */
export function getAbsoluteDegree(sign: ZodiacSign, degree: number): number {
    return SIGN_START_DEGREES[sign] + degree;
}

/**
 * Normalize an angle to 0-360 range
 */
export function normalizeAngle(angle: number): number {
    let normalized = angle % 360;
    if (normalized < 0) {
        normalized += 360;
    }
    return normalized;
}

/**
 * Get the angle for positioning on the mandala wheel
 * The mandala has the Ascendant at the left (9 o'clock position)
 * and houses go counter-clockwise (1 → 2 → 3 goes down toward IC)
 */
export function getMandalaAngle(absoluteDegree: number, ascendantDegree?: number): number {
    // If ascendant is provided, rotate chart so Ascendant is at the left (180°)
    const offset = ascendantDegree ?? 0;
    // Houses go counter-clockwise from ASC, which means increasing angle in SVG
    return normalizeAngle(absoluteDegree - offset + 180);
}

/**
 * Calculate x,y coordinates on a circle given angle and radius
 */
export function getPointOnCircle(
    centerX: number,
    centerY: number,
    radius: number,
    angleDegrees: number
): { x: number; y: number } {
    const angleRadians = degreesToRadians(angleDegrees);
    return {
        x: centerX + radius * Math.cos(angleRadians),
        y: centerY - radius * Math.sin(angleRadians), // Negative because SVG y-axis is inverted
    };
}

/**
 * Get planet absolute degree
 */
export function getPlanetAbsoluteDegree(planet: PlanetPosition): number {
    return getAbsoluteDegree(planet.sign, planet.degree);
}

/**
 * Format degree for display (e.g., "15°23'")
 */
export function formatDegree(degree: number): string {
    const wholeDegrees = Math.floor(degree);
    const minutes = Math.round((degree - wholeDegrees) * 60);
    return `${wholeDegrees}°${minutes.toString().padStart(2, '0')}'`;
}

/**
 * Check if two planets are in collision (too close together)
 * Returns true if planets are within threshold degrees of each other
 */
export function checkPlanetCollision(
    degree1: number,
    degree2: number,
    threshold: number = 8
): boolean {
    const diff = Math.abs(normalizeAngle(degree1) - normalizeAngle(degree2));
    return diff < threshold || diff > 360 - threshold;
}

/**
 * Calculate the angular distance between two degrees (shortest path)
 */
function angularDistance(deg1: number, deg2: number): number {
    const diff = Math.abs(normalizeAngle(deg1) - normalizeAngle(deg2));
    return Math.min(diff, 360 - diff);
}

/**
 * Protected zones for angle labels (AS, MC, DS, IC) relative to ascendant
 * These are the positions where angle labels appear
 */
const ANGLE_LABEL_ZONES = [
    { house: 1, label: 'AS', relativeOffset: 0 },     // Ascendant at 0°
    { house: 4, label: 'IC', relativeOffset: 270 },   // IC at 270° (bottom)
    { house: 7, label: 'DS', relativeOffset: 180 },   // Descendant at 180°
    { house: 10, label: 'MC', relativeOffset: 90 },   // Midheaven at 90° (top)
];

/**
 * Check if a display angle is too close to any angle label zone
 */
function isInAngleLabelZone(
    displayAngle: number,
    ascendantDegree: number,
    threshold: number = 10
): { inZone: boolean; pushDirection: number; zoneDegree: number } {
    for (const zone of ANGLE_LABEL_ZONES) {
        // The label appears at the house cusp position
        // In the mandala, angles are displayed at specific positions
        const zoneDegree = normalizeAngle(zone.relativeOffset);
        const diff = displayAngle - zoneDegree;
        const normalizedDiff = ((diff + 180) % 360) - 180; // Range: -180 to 180

        if (Math.abs(normalizedDiff) < threshold) {
            // Planet is too close to an angle label
            // Push in the direction away from the label
            return {
                inZone: true,
                pushDirection: normalizedDiff > 0 ? 1 : -1,
                zoneDegree
            };
        }
    }
    return { inZone: false, pushDirection: 0, zoneDegree: 0 };
}

/**
 * Adjust planet positions to avoid overlapping
 * Uses an iterative force-based approach to spread out clustered planets
 * Also avoids collisions with angle labels (AS, MC, DS, IC)
 * Returns adjusted positions with offset angles
 */
export function adjustPlanetPositions(
    planets: Array<{ planet: PlanetPosition; absoluteDegree: number }>,
    threshold: number = 8,
    ascendantDegree: number = 0
): Array<{ planet: PlanetPosition; absoluteDegree: number; offset: number }> {
    if (planets.length === 0) return [];
    if (planets.length === 1) {
        // Even single planets need angle label avoidance
        const p = planets[0];
        const displayAngle = getMandalaAngle(p.absoluteDegree, ascendantDegree);
        const angleCheck = isInAngleLabelZone(displayAngle, ascendantDegree, 10);
        const offset = angleCheck.inZone ? angleCheck.pushDirection * 12 : 0;
        return [{ ...p, offset }];
    }

    // Initialize offsets
    const result = planets.map((p) => ({
        ...p,
        offset: 0,
        displayDegree: p.absoluteDegree,
        displayAngle: getMandalaAngle(p.absoluteDegree, ascendantDegree)
    }));

    // Sort by absolute degree initially
    result.sort((a, b) => a.absoluteDegree - b.absoluteDegree);

    // Iterative relaxation algorithm
    const minSpacing = threshold;
    const maxIterations = 80;
    const angleLabelThreshold = 10; // Extra space around angle labels

    for (let iteration = 0; iteration < maxIterations; iteration++) {
        let hasCollision = false;

        // Update display degrees and angles
        result.forEach(p => {
            p.displayDegree = normalizeAngle(p.absoluteDegree + p.offset);
            p.displayAngle = getMandalaAngle(p.displayDegree, ascendantDegree);
        });

        // Check collisions with angle labels (AS, MC, DS, IC)
        for (const planet of result) {
            const angleCheck = isInAngleLabelZone(planet.displayAngle, ascendantDegree, angleLabelThreshold);
            if (angleCheck.inZone) {
                hasCollision = true;
                // Push away from the angle label
                planet.offset += angleCheck.pushDirection * 2;
            }
        }

        // Sort by display degree for collision detection
        const sortedByDisplay = [...result].sort((a, b) => a.displayDegree - b.displayDegree);

        // Check each adjacent pair (including wrap-around)
        for (let i = 0; i < sortedByDisplay.length; i++) {
            const current = sortedByDisplay[i];
            const next = sortedByDisplay[(i + 1) % sortedByDisplay.length];

            let distance = next.displayDegree - current.displayDegree;
            if (distance < 0) distance += 360; // Handle wrap-around

            if (distance < minSpacing && distance > 0) {
                hasCollision = true;

                // Calculate how much to push apart
                const overlap = minSpacing - distance;
                const pushAmount = overlap / 2 + 0.5;

                // Push current backward and next forward
                current.offset -= pushAmount;
                next.offset += pushAmount;
            }
        }

        // If no collisions, we're done
        if (!hasCollision) break;

        // Dampen offsets slightly to prevent oscillation
        result.forEach(p => {
            p.offset *= 0.92;
        });
    }

    // Final pass: limit maximum offset to prevent planets from drifting too far
    const maxOffset = 30;
    result.forEach(p => {
        p.offset = Math.max(-maxOffset, Math.min(maxOffset, p.offset));
    });

    return result;
}

/**
 * Get arc path for SVG
 */
export function getArcPath(
    centerX: number,
    centerY: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    largeArc: boolean = false
): string {
    const start = getPointOnCircle(centerX, centerY, radius, startAngle);
    const end = getPointOnCircle(centerX, centerY, radius, endAngle);

    const largeArcFlag = largeArc ? 1 : 0;
    const sweepFlag = 0; // Counter-clockwise

    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;
}
