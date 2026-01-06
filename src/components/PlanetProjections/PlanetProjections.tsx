import React from 'react';
import { PlanetPosition } from '../../types';
import { getPointOnCircle, getMandalaAngle, getAbsoluteDegree } from '../../utils';

interface PlanetProjectionsProps {
  centerX: number;
  centerY: number;
  outerRadius: number;
  innerRadius: number;
  planets: PlanetPosition[];
  secondChartPlanets?: PlanetPosition[];
  ascendantDegree?: number;
  innerChartColor?: string;
  outerChartColor?: string;
}

/**
 * Renders small tick marks on the zodiac ring showing where planets project
 */
export function PlanetProjections({
  centerX,
  centerY,
  outerRadius,
  innerRadius,
  planets,
  secondChartPlanets,
  ascendantDegree = 0,
  innerChartColor = '#4a90d9',
  outerChartColor = '#d94a4a',
}: PlanetProjectionsProps) {
  const tickLength = (outerRadius - innerRadius) * 0.3;
  
  // Filter out Ascendant and Midheaven as they are already shown
  const filteredPlanets = planets.filter(
    (p) => p.planet !== 'Ascendant' && p.planet !== 'Midheaven'
  );
  const filteredSecondPlanets = secondChartPlanets?.filter(
    (p) => p.planet !== 'Ascendant' && p.planet !== 'Midheaven'
  );

  const renderProjection = (
    planet: PlanetPosition,
    color: string,
    isOuter: boolean,
    key: string
  ) => {
    const absoluteDegree = getAbsoluteDegree(planet.sign, planet.degree);
    const angle = getMandalaAngle(absoluteDegree, ascendantDegree);
    
    // Position ticks from inner edge of zodiac ring
    const startRadius = innerRadius;
    const endRadius = innerRadius + tickLength;
    
    const start = getPointOnCircle(centerX, centerY, startRadius, angle);
    const end = getPointOnCircle(centerX, centerY, endRadius, angle);
    
    return (
      <line
        key={key}
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke={color}
        strokeWidth={2}
        opacity={0.8}
      />
    );
  };

  return (
    <g className="planet-projections">
      {/* Primary chart planet projections */}
      {filteredPlanets.map((planet, index) =>
        renderProjection(planet, innerChartColor, false, `proj-1-${index}`)
      )}
      
      {/* Secondary chart planet projections */}
      {filteredSecondPlanets?.map((planet, index) =>
        renderProjection(planet, outerChartColor, true, `proj-2-${index}`)
      )}
    </g>
  );
}
