'use client';

import React, { useMemo, useState, useCallback } from 'react';
import { AstroMandalaProps, ZodiacSign, PlanetName, PlanetPosition, Aspect, SynastryAspect } from '../../types';
import { ZodiacWheel } from '../ZodiacWheel';
import { HouseWheel } from '../HouseWheel';
import { PlanetDisplay } from '../PlanetDisplay';
import { AspectLines } from '../AspectLines';
import { PlanetProjections } from '../PlanetProjections';
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
    showSecondChartHouses = false,
    showPlanetProjections = true,
    aspectTypesFilter,
    includeAnglesInSynastry = false,
    innerChartColor = '#4a90d9',
    outerChartColor = '#d94a4a',
    aspectColors,
    theme = 'light',
    className,
    onSignClick,
    onHouseClick,
    onPlanetClick,
    onAspectClick,
    onAngleClick,
}: AstroMandalaProps) {
    const centerX = size / 2;
    const centerY = size / 2;

    // Interactive hover states
    const [hoveredPlanet, setHoveredPlanet] = useState<PlanetName | null>(null);
    const [hoveredSign, setHoveredSign] = useState<ZodiacSign | null>(null);
    const [hoveredHouse, setHoveredHouse] = useState<{ house: number; isSecondChart: boolean } | null>(null);

    // Callbacks for hover events
    const handlePlanetHover = useCallback((planet: PlanetName | null) => {
        setHoveredPlanet(planet);
    }, []);

    const handleSignHover = useCallback((sign: ZodiacSign | null) => {
        setHoveredSign(sign);
    }, []);

    const handleHouseHover = useCallback((house: number | null, isSecondChart: boolean = false) => {
        setHoveredHouse(house !== null ? { house, isSecondChart } : null);
    }, []);

    // Create specific handlers for each chart's houses
    const handlePrimaryHouseHover = useCallback((house: number | null) => {
        handleHouseHover(house, false);
    }, [handleHouseHover]);

    const handleSecondHouseHover = useCallback((house: number | null) => {
        handleHouseHover(house, true);
    }, [handleHouseHover]);

    // Reset all hover states when mouse leaves the SVG
    const handleSvgMouseLeave = useCallback(() => {
        setHoveredPlanet(null);
        setHoveredSign(null);
        setHoveredHouse(null);
    }, []);

    // Theme colors
    const isDark = theme === 'dark';
    const colors = {
        background: isDark ? '#1a1a2e' : '#fafafa',
        backgroundStroke: isDark ? '#333' : '#ddd',
        centerFill: isDark ? '#16162a' : '#fff',
        centerStroke: isDark ? '#444' : '#ccc',
        text: isDark ? '#e0e0e0' : '#333',
        textSecondary: isDark ? '#aaa' : '#555',
        line: isDark ? '#555' : '#999',
    };

    // Calculate radii for different rings
    // In synastry mode with both houses shown, we need extra rings
    const isSynastry = Boolean(secondChart);
    const showBothHouses = showSecondChartHouses && isSynastry && secondChart;

    const outerRadius = size * 0.45;
    const zodiacInnerRadius = size * 0.38;

    // When showing both house systems, we need two house rings
    const outerHouseRingOuter = zodiacInnerRadius;
    const outerHouseRingInner = showBothHouses ? size * 0.30 : size * 0.15;
    const innerHouseRingOuter = showBothHouses ? size * 0.30 : size * 0.15;
    const innerHouseRingInner = showBothHouses ? size * 0.22 : size * 0.15;

    const planetRadius = showBothHouses ? size * 0.26 : size * 0.32;
    const houseInnerRadius = showBothHouses ? size * 0.22 : size * 0.15;
    const centerCircleRadius = showBothHouses ? size * 0.12 : size * 0.15;

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

    // Filter aspects by type if filter is provided
    const filteredChartAspects = useMemo(() => {
        if (!aspectTypesFilter || aspectTypesFilter.length === 0) {
            return chart.aspects;
        }
        return chart.aspects.filter((a) => aspectTypesFilter.includes(a.aspect));
    }, [chart.aspects, aspectTypesFilter]);

    const filteredSynastryAspects = useMemo(() => {
        if (!synastryAspects) return undefined;
        if (!aspectTypesFilter || aspectTypesFilter.length === 0) {
            return synastryAspects;
        }
        return synastryAspects.filter((a) => aspectTypesFilter.includes(a.aspect));
    }, [synastryAspects, aspectTypesFilter]);

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className={className}
            onMouseLeave={handleSvgMouseLeave}
            style={{
                fontFamily: 'Arial, sans-serif',
                maxWidth: '100%',
                height: 'auto',
                display: 'block',
                overflow: 'visible',
                // Prevent external CSS from affecting the SVG
                contain: 'layout style',
            }}
            // Ensure SVG maintains aspect ratio
            preserveAspectRatio="xMidYMid meet"
        >
            {/* Background */}
            <circle
                cx={centerX}
                cy={centerY}
                r={outerRadius + 5}
                fill={colors.background}
                stroke={colors.backgroundStroke}
                strokeWidth={1}
            />

            {/* Center circle */}
            <circle
                cx={centerX}
                cy={centerY}
                r={centerCircleRadius}
                fill={colors.centerFill}
                stroke={colors.centerStroke}
                strokeWidth={0.5}
            />

            {/* Zodiac wheel */}
            <ZodiacWheel
                centerX={centerX}
                centerY={centerY}
                outerRadius={outerRadius}
                innerRadius={zodiacInnerRadius}
                ascendantDegree={ascendantDegree}
                theme={theme}
                onSignHover={handleSignHover}
                hoveredSign={hoveredSign}
                onSignClick={onSignClick}
            />

            {/* Planet projection markers on zodiac ring */}
            {showPlanetProjections && (
                <PlanetProjections
                    centerX={centerX}
                    centerY={centerY}
                    outerRadius={outerRadius}
                    innerRadius={zodiacInnerRadius}
                    planets={chart.planets}
                    secondChartPlanets={secondChart?.planets}
                    ascendantDegree={ascendantDegree}
                    innerChartColor={innerChartColor}
                    outerChartColor={outerChartColor}
                />
            )}

            {/* House divisions - primary chart (outer ring) */}
            {showHouses && chart.houses.length > 0 && (
                <HouseWheel
                    centerX={centerX}
                    centerY={centerY}
                    outerRadius={outerHouseRingOuter}
                    innerRadius={outerHouseRingInner}
                    houses={chart.houses}
                    ascendantDegree={ascendantDegree}
                    theme={theme}
                    onHouseHover={handlePrimaryHouseHover}
                    hoveredHouse={hoveredHouse && !hoveredHouse.isSecondChart ? hoveredHouse.house : null}
                    onHouseClick={onHouseClick}
                    onAngleClick={onAngleClick}
                />
            )}

            {/* House divisions - second chart (inner ring for synastry) */}
            {showSecondChartHouses && showBothHouses && secondChart.houses.length > 0 && (
                <HouseWheel
                    centerX={centerX}
                    centerY={centerY}
                    outerRadius={innerHouseRingOuter}
                    innerRadius={innerHouseRingInner}
                    houses={secondChart.houses}
                    ascendantDegree={ascendantDegree}
                    isSecondChart={true}
                    color={outerChartColor}
                    theme={theme}
                    onHouseHover={handleSecondHouseHover}
                    hoveredHouse={hoveredHouse && hoveredHouse.isSecondChart ? hoveredHouse.house : null}
                    onHouseClick={onHouseClick}
                    onAngleClick={onAngleClick}
                />
            )}

            {/* Aspect lines */}
            {showAspects && (
                <AspectLines
                    centerX={centerX}
                    centerY={centerY}
                    radius={planetRadius}
                    aspects={filteredChartAspects}
                    synastryAspects={filteredSynastryAspects}
                    planets={chart.planets}
                    secondChartPlanets={secondChart?.planets}
                    ascendantDegree={ascendantDegree}
                    aspectColors={aspectColors}
                    includeAnglesInSynastry={includeAnglesInSynastry}
                    hoveredPlanet={hoveredPlanet}
                    onAspectClick={onAspectClick}
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
                theme={theme}
                onPlanetHover={handlePlanetHover}
                hoveredPlanet={hoveredPlanet}
                highlightedSign={hoveredSign}
                highlightedHouse={hoveredHouse?.house ?? null}
                houses={hoveredHouse ? (hoveredHouse.isSecondChart ? (secondChart?.houses || []) : chart.houses) : chart.houses}
                onPlanetClick={onPlanetClick}
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
                    theme={theme}
                    onPlanetHover={handlePlanetHover}
                    hoveredPlanet={hoveredPlanet}
                    highlightedSign={hoveredSign}
                    highlightedHouse={hoveredHouse?.house ?? null}
                    houses={hoveredHouse ? (hoveredHouse.isSecondChart ? (secondChart?.houses || []) : chart.houses) : (secondChart?.houses || [])}
                    onPlanetClick={onPlanetClick}
                />
            )}
        </svg>
    );
}
