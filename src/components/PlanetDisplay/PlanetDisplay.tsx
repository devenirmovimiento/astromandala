import React from 'react';
import { PlanetPosition, MandalaTheme } from '../../types';
import { PLANET_SYMBOLS } from '../../constants';
import {
  getPointOnCircle,
  getMandalaAngle,
  getPlanetAbsoluteDegree,
  formatDegree,
  adjustPlanetPositions,
} from '../../utils';

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
}

/**
 * Renders planets on the chart
 */
export function PlanetDisplay({
  centerX,
  centerY,
  radius,
  planets,
  ascendantDegree = 0,
  color = '#4a90d9',
  showDegrees = false,
  isOuter = false,
  theme = 'light',
}: PlanetDisplayProps) {
  const isDark = theme === 'dark';
  const offsetLineColor = isDark ? '#555' : '#ccc';
  // Calculate absolute degrees for all planets
  const planetsWithDegrees = planets.map((planet) => ({
    planet,
    absoluteDegree: getPlanetAbsoluteDegree(planet),
  }));

  // Adjust positions to avoid overlapping
  const adjustedPlanets = adjustPlanetPositions(planetsWithDegrees);

  // Different radii for inner and outer chart planets
  // Inner planets are placed between zodiac ring and house numbers
  const planetRadius = isOuter ? radius * 1.08 : radius * 0.88;
  const lineRadius = isOuter ? radius * 1.0 : radius * 0.95;
  const degreeRadius = isOuter ? radius * 1.18 : radius * 0.78;

  return (
    <g className={`planets ${isOuter ? 'outer-planets' : 'inner-planets'}`}>
      {adjustedPlanets.map(({ planet, absoluteDegree, offset }) => {
        // Actual position (for aspect lines)
        const actualAngle = getMandalaAngle(absoluteDegree, ascendantDegree);
        const actualPos = getPointOnCircle(centerX, centerY, lineRadius, actualAngle);

        // Displayed position (with offset to avoid overlaps)
        const displayAngle = getMandalaAngle(absoluteDegree + offset, ascendantDegree);
        const symbolPos = getPointOnCircle(centerX, centerY, planetRadius, displayAngle);
        const degreePos = getPointOnCircle(centerX, centerY, degreeRadius, displayAngle);

        const symbol = PLANET_SYMBOLS[planet.planet];
        const isAngle = planet.planet === 'Ascendant' || planet.planet === 'Midheaven';
        const fontSize = isAngle ? radius * 0.09 : radius * 0.14;

        return (
          <g
            key={planet.planet}
            className={`planet planet-${planet.planet.toLowerCase()}`}
            data-degree={absoluteDegree}
            data-actual-x={actualPos.x}
            data-actual-y={actualPos.y}
          >
            {/* Line connecting actual position to symbol if offset */}
            {Math.abs(offset) > 2 && (
              <>
                {/* Small marker at actual position */}
                <circle
                  cx={actualPos.x}
                  cy={actualPos.y}
                  r={2}
                  fill={color}
                  opacity={0.6}
                />
                {/* Connection line */}
                <line
                  x1={actualPos.x}
                  y1={actualPos.y}
                  x2={symbolPos.x}
                  y2={symbolPos.y}
                  stroke={color}
                  strokeWidth={0.75}
                  strokeDasharray="3,2"
                  opacity={0.5}
                />
              </>
            )}

            {/* Planet symbol */}
            <text
              x={symbolPos.x}
              y={symbolPos.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={fontSize}
              fill={color}
              fontWeight={isAngle ? 'bold' : 'normal'}
              style={{ 
                fontFamily: 'Segoe UI Symbol, Symbola, sans-serif',
              }}
            >
              {symbol}&#xFE0E;
              {planet.retrograde && (
                <tspan fontSize={fontSize * 0.5} dy={-fontSize * 0.3}>
                  ℞
                </tspan>
              )}
            </text>

            {/* Degree display */}
            {showDegrees && (
              <text
                x={degreePos.x}
                y={degreePos.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={fontSize * 0.35}
                fill={color}
                opacity={0.8}
              >
                {formatDegree(planet.degree)}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}
