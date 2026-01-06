import React from 'react';
import { Aspect, SynastryAspect, PlanetPosition, AspectColors } from '../../types';
import { DEFAULT_ASPECT_COLORS, ASPECT_LINE_STYLES } from '../../constants';
import {
  getPointOnCircle,
  getMandalaAngle,
  getPlanetAbsoluteDegree,
} from '../../utils';

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
}

/** Angle points to filter from synastry aspects */
const ANGLE_POINTS = ['Ascendant', 'Midheaven'];

/**
 * Helper to find planet position
 */
function findPlanet(planets: PlanetPosition[], name: string): PlanetPosition | undefined {
  return planets.find((p) => p.planet === name);
}

/**
 * Renders aspect lines between planets
 */
export function AspectLines({
  centerX,
  centerY,
  radius,
  aspects = [],
  synastryAspects = [],
  planets,
  secondChartPlanets = [],
  ascendantDegree = 0,
  aspectColors = {},
  includeAnglesInSynastry = false,
}: AspectLinesProps) {
  const colors = { ...DEFAULT_ASPECT_COLORS, ...aspectColors };
  const aspectRadius = radius * 0.7; // Draw aspects in inner area

  // Filter natal aspects to exclude angles if configured
  const filteredNatalAspects = includeAnglesInSynastry
    ? aspects
    : aspects.filter(
        (a) => !ANGLE_POINTS.includes(a.planet1) && !ANGLE_POINTS.includes(a.planet2)
      );

  // Filter synastry aspects to exclude angles if configured
  const filteredSynastryAspects = includeAnglesInSynastry
    ? synastryAspects
    : synastryAspects.filter(
        (a) => !ANGLE_POINTS.includes(a.planet1) && !ANGLE_POINTS.includes(a.planet2)
      );

  // Helper to get planet coordinates
  const getPlanetCoords = (planetName: string, isSecondChart: boolean = false) => {
    const planetList = isSecondChart ? secondChartPlanets : planets;
    const planet = findPlanet(planetList, planetName);
    
    if (!planet) return null;
    
    const absoluteDegree = getPlanetAbsoluteDegree(planet);
    const angle = getMandalaAngle(absoluteDegree, ascendantDegree);
    return getPointOnCircle(centerX, centerY, aspectRadius, angle);
  };

  return (
    <g className="aspect-lines">
      {/* Natal aspects (within single chart) */}
      {filteredNatalAspects.map((aspect, index) => {
        const pos1 = getPlanetCoords(aspect.planet1);
        const pos2 = getPlanetCoords(aspect.planet2);
        
        if (!pos1 || !pos2) return null;
        
        const color = colors[aspect.aspect];
        const style = ASPECT_LINE_STYLES[aspect.aspect];
        
        // Calculate opacity based on orb (tighter orb = more opaque)
        const maxOrb = 10;
        const opacity = Math.max(0.3, 1 - aspect.orb / maxOrb);
        
        return (
          <line
            key={`natal-${index}-${aspect.planet1}-${aspect.planet2}`}
            x1={pos1.x}
            y1={pos1.y}
            x2={pos2.x}
            y2={pos2.y}
            stroke={color}
            strokeWidth={style.strokeWidth}
            strokeDasharray={style.dashArray}
            opacity={opacity}
            className={`aspect-line aspect-${aspect.aspect}`}
          />
        );
      })}

      {/* Synastry aspects (between two charts) */}
      {filteredSynastryAspects.map((aspect, index) => {
        const isP1SecondChart = aspect.chart1Owner === 'chart2';
        const isP2SecondChart = aspect.chart2Owner === 'chart2';
        
        const pos1 = getPlanetCoords(aspect.planet1, isP1SecondChart);
        const pos2 = getPlanetCoords(aspect.planet2, isP2SecondChart);
        
        if (!pos1 || !pos2) return null;
        
        const color = colors[aspect.aspect];
        const style = ASPECT_LINE_STYLES[aspect.aspect];
        
        // Calculate opacity based on orb
        const maxOrb = 10;
        const opacity = Math.max(0.3, 1 - aspect.orb / maxOrb);
        
        return (
          <line
            key={`synastry-${index}-${aspect.planet1}-${aspect.planet2}`}
            x1={pos1.x}
            y1={pos1.y}
            x2={pos2.x}
            y2={pos2.y}
            stroke={color}
            strokeWidth={style.strokeWidth * 1.2}
            strokeDasharray={style.dashArray}
            opacity={opacity}
            className={`aspect-line synastry-aspect aspect-${aspect.aspect}`}
          />
        );
      })}
    </g>
  );
}
