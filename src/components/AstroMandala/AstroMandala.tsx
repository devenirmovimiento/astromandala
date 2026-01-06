'use client';

import React, { useMemo } from 'react';
import { AstroMandalaProps } from '../../types';
import { ZodiacWheel } from '../ZodiacWheel';
import { HouseWheel } from '../HouseWheel';
import { PlanetDisplay } from '../PlanetDisplay';
import { AspectLines } from '../AspectLines';
import { getAbsoluteDegree } from '../../utils';

/**
 * AstroMandala - Astrological chart visualization component
 * 
 * Displays a single natal chart or two charts overlapping (synastry).
 * The chart shows the zodiac wheel, house divisions, planet positions,
 * and aspect lines between planets.
 */
export function AstroMandala({
  chart,
  secondChart,
  synastryAspects,
  size = 500,
  showAspects = true,
  showDegrees = false,
  showHouses = true,
  innerChartColor = '#4a90d9',
  outerChartColor = '#d94a4a',
  aspectColors,
  className,
}: AstroMandalaProps) {
  const centerX = size / 2;
  const centerY = size / 2;
  
  // Calculate radii for different rings
  const outerRadius = size * 0.45;
  const zodiacInnerRadius = size * 0.38;
  const planetRadius = size * 0.32;
  const houseInnerRadius = size * 0.15;

  // Get Ascendant degree for chart orientation
  const ascendantDegree = useMemo(() => {
    const ascendant = chart.planets.find((p) => p.planet === 'Ascendant');
    if (ascendant) {
      return getAbsoluteDegree(ascendant.sign, ascendant.degree);
    }
    // If no Ascendant, use first house cusp
    const firstHouse = chart.houses.find((h) => h.house === 1);
    if (firstHouse) {
      return getAbsoluteDegree(firstHouse.sign, firstHouse.degree);
    }
    return 0;
  }, [chart.planets, chart.houses]);

  const isSynastry = Boolean(secondChart);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      {/* Background */}
      <circle
        cx={centerX}
        cy={centerY}
        r={outerRadius + 5}
        fill="#fafafa"
        stroke="#ddd"
        strokeWidth={1}
      />

      {/* Center circle */}
      <circle
        cx={centerX}
        cy={centerY}
        r={houseInnerRadius}
        fill="#fff"
        stroke="#ccc"
        strokeWidth={0.5}
      />

      {/* Zodiac wheel */}
      <ZodiacWheel
        centerX={centerX}
        centerY={centerY}
        outerRadius={outerRadius}
        innerRadius={zodiacInnerRadius}
        ascendantDegree={ascendantDegree}
      />

      {/* House divisions */}
      {showHouses && chart.houses.length > 0 && (
        <HouseWheel
          centerX={centerX}
          centerY={centerY}
          outerRadius={zodiacInnerRadius}
          innerRadius={houseInnerRadius}
          houses={chart.houses}
          ascendantDegree={ascendantDegree}
        />
      )}

      {/* Aspect lines */}
      {showAspects && (
        <AspectLines
          centerX={centerX}
          centerY={centerY}
          radius={planetRadius}
          aspects={chart.aspects}
          synastryAspects={synastryAspects}
          planets={chart.planets}
          secondChartPlanets={secondChart?.planets}
          ascendantDegree={ascendantDegree}
          aspectColors={aspectColors}
        />
      )}

      {/* Primary chart planets */}
      <PlanetDisplay
        centerX={centerX}
        centerY={centerY}
        radius={planetRadius}
        planets={chart.planets}
        ascendantDegree={ascendantDegree}
        color={innerChartColor}
        showDegrees={showDegrees}
        isOuter={false}
      />

      {/* Secondary chart planets (synastry) */}
      {isSynastry && secondChart && (
        <PlanetDisplay
          centerX={centerX}
          centerY={centerY}
          radius={planetRadius}
          planets={secondChart.planets}
          ascendantDegree={ascendantDegree}
          color={outerChartColor}
          showDegrees={showDegrees}
          isOuter={true}
        />
      )}

      {/* Chart labels */}
      {chart.label && (
        <text
          x={centerX}
          y={centerY - 10}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={size * 0.025}
          fill={innerChartColor}
          fontWeight="bold"
        >
          {chart.label}
        </text>
      )}
      
      {isSynastry && secondChart?.label && (
        <text
          x={centerX}
          y={centerY + 10}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={size * 0.025}
          fill={outerChartColor}
          fontWeight="bold"
        >
          {secondChart.label}
        </text>
      )}
    </svg>
  );
}
