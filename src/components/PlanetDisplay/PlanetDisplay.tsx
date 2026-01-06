import React from 'react';
import { PlanetPosition } from '../../types';
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
}: PlanetDisplayProps) {
  // Calculate absolute degrees for all planets
  const planetsWithDegrees = planets.map((planet) => ({
    planet,
    absoluteDegree: getPlanetAbsoluteDegree(planet),
  }));

  // Adjust positions to avoid overlapping
  const adjustedPlanets = adjustPlanetPositions(planetsWithDegrees);

  // Different radii for inner and outer chart planets
  const planetRadius = isOuter ? radius * 1.08 : radius * 0.92;
  const lineRadius = isOuter ? radius * 1.0 : radius * 1.0;
  const degreeRadius = isOuter ? radius * 1.18 : radius * 0.82;

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
        const fontSize = radius * 0.08;

        return (
          <g
            key={planet.planet}
            className={`planet planet-${planet.planet.toLowerCase()}`}
            data-degree={absoluteDegree}
            data-actual-x={actualPos.x}
            data-actual-y={actualPos.y}
          >
            {/* Line connecting actual position to symbol if offset */}
            {Math.abs(offset) > 1 && (
              <line
                x1={actualPos.x}
                y1={actualPos.y}
                x2={symbolPos.x}
                y2={symbolPos.y}
                stroke={color}
                strokeWidth={0.5}
                strokeDasharray="2,2"
                opacity={0.5}
              />
            )}

            {/* Planet symbol */}
            <text
              x={symbolPos.x}
              y={symbolPos.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={fontSize}
              fill={color}
              fontWeight="bold"
            >
              {symbol}
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
                fontSize={fontSize * 0.5}
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
