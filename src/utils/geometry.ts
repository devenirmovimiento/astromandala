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
 * The mandala typically has 0° Aries at the left (9 o'clock position)
 * and goes counter-clockwise
 */
export function getMandalaAngle(absoluteDegree: number, ascendantDegree?: number): number {
  // If ascendant is provided, rotate chart so Ascendant is at the left
  const offset = ascendantDegree ?? 0;
  // Convert to SVG angle (0 at right, clockwise)
  // Astrological charts go counter-clockwise, so we negate
  return normalizeAngle(180 - absoluteDegree + offset);
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
 * Adjust planet positions to avoid overlapping
 * Returns adjusted positions with offset angles
 */
export function adjustPlanetPositions(
  planets: Array<{ planet: PlanetPosition; absoluteDegree: number }>,
  threshold: number = 8
): Array<{ planet: PlanetPosition; absoluteDegree: number; offset: number }> {
  const sorted = [...planets].sort((a, b) => a.absoluteDegree - b.absoluteDegree);
  const result: Array<{ planet: PlanetPosition; absoluteDegree: number; offset: number }> = [];

  for (let i = 0; i < sorted.length; i++) {
    let offset = 0;
    const current = sorted[i];

    // Check for collisions with already placed planets
    for (const placed of result) {
      const adjustedCurrent = normalizeAngle(current.absoluteDegree + offset);
      const adjustedPlaced = normalizeAngle(placed.absoluteDegree + placed.offset);
      
      if (checkPlanetCollision(adjustedCurrent, adjustedPlaced, threshold)) {
        offset += threshold / 2;
      }
    }

    result.push({ ...current, offset });
  }

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
