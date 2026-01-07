import React from 'react';
import { PlanetPosition, MandalaTheme, PlanetName, ZodiacSign, HousePosition } from '../../types';
import { PLANET_SYMBOLS } from '../../constants';
import {
    getPointOnCircle,
    getMandalaAngle,
    getPlanetAbsoluteDegree,
    formatDegree,
    adjustPlanetPositions,
    getAbsoluteDegree,
} from '../../utils';

/**
 * Renders a custom SVG symbol for Pluto (more compatible with Android)
 * Uses the standard astrological glyph: circle with arc embracing it from below, and cross at bottom
 */
function PlutoSymbol({ x, y, size, color }: { x: number; y: number; size: number; color: string }) {
    const scale = size / 20; // Base size is 20
    return (
        <g transform={`translate(${x - size / 2}, ${y - size / 2}) scale(${scale})`}>
            {/* Circle in upper area */}
            <circle cx="10" cy="5.5" r="2.8" fill="none" stroke={color} strokeWidth="1.4" />
            {/* Arc embracing the circle from below - ends curve up beside the circle */}
            <path
                d="M 4.5 6 Q 4.5 12 10 12 Q 15.5 12 15.5 6"
                fill="none"
                stroke={color}
                strokeWidth="1.4"
                strokeLinecap="round"
            />
            {/* Vertical line of the cross */}
            <line x1="10" y1="12" x2="10" y2="18.5" stroke={color} strokeWidth="1.4" />
            {/* Horizontal line of the cross */}
            <line x1="6" y1="15.5" x2="14" y2="15.5" stroke={color} strokeWidth="1.4" />
        </g>
    );
}

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
    /** Callback when mouse hovers over a planet */
    onPlanetHover?: (planet: PlanetName | null) => void;
    /** Currently hovered planet */
    hoveredPlanet?: PlanetName | null;
    /** Sign being hovered - planets in this sign will be highlighted */
    highlightedSign?: ZodiacSign | null;
    /** House being hovered - planets in this house will be highlighted */
    highlightedHouse?: number | null;
    /** Houses data for determining planet positions */
    houses?: HousePosition[];
    /** Aspect being hovered - planets connected by this aspect will be highlighted */
    highlightedByAspect?: { planet1: string; planet2: string } | null;
    /** Callback when a planet is clicked */
    onPlanetClick?: (planet: PlanetPosition) => void;
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
    onPlanetHover,
    hoveredPlanet,
    highlightedSign,
    highlightedHouse,
    houses = [],
    highlightedByAspect,
    onPlanetClick,
}: PlanetDisplayProps) {
    const isDark = theme === 'dark';
    const offsetLineColor = isDark ? '#555' : '#ccc';

    // Helper function to check if a planet is in a specific house
    const isPlanetInHouse = (planet: PlanetPosition, houseNumber: number): boolean => {
        if (!houses || houses.length === 0) return false;

        const planetDegree = getPlanetAbsoluteDegree(planet);
        const house = houses.find(h => h.house === houseNumber);
        const nextHouse = houses.find(h => h.house === (houseNumber % 12) + 1);

        if (!house || !nextHouse) return false;

        const houseDegree = getAbsoluteDegree(house.sign, house.degree);
        const nextHouseDegree = getAbsoluteDegree(nextHouse.sign, nextHouse.degree);

        // Handle wrap-around at 360/0 degrees
        if (nextHouseDegree < houseDegree) {
            // House crosses 0 degrees
            return planetDegree >= houseDegree || planetDegree < nextHouseDegree;
        } else {
            return planetDegree >= houseDegree && planetDegree < nextHouseDegree;
        }
    };

    // Filter out Ascendant and Midheaven as they are already shown in HouseWheel as ASC/MC labels
    const filteredPlanets = planets.filter(
        (planet) => planet.planet !== 'Ascendant' && planet.planet !== 'Midheaven'
    );

    // Calculate absolute degrees for all planets
    const planetsWithDegrees = filteredPlanets.map((planet) => ({
        planet,
        absoluteDegree: getPlanetAbsoluteDegree(planet),
    }));

    // Adjust positions to avoid overlapping (including angle labels)
    const adjustedPlanets = adjustPlanetPositions(planetsWithDegrees, 8, ascendantDegree);

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

                // Determine if this planet should be highlighted (when its sign is hovered)
                const isHighlighted = highlightedSign && planet.sign === highlightedSign;
                // Determine if this planet is in the hovered house
                const isInHighlightedHouse = highlightedHouse && isPlanetInHouse(planet, highlightedHouse);
                // Determine if this planet is connected by the hovered aspect
                const isHighlightedByAspect = highlightedByAspect &&
                    (planet.planet === highlightedByAspect.planet1 || planet.planet === highlightedByAspect.planet2);
                // Determine if this planet is being hovered
                const isHovered = hoveredPlanet === planet.planet;
                // Calculate opacity based on hover state
                const baseOpacity = 1;
                let highlightOpacity = baseOpacity;

                // When sign is hovered, dim others
                if (highlightedSign) {
                    highlightOpacity = isHighlighted ? 1 : 0.4;
                }
                // When house is hovered, dim others
                if (highlightedHouse) {
                    highlightOpacity = isInHighlightedHouse ? 1 : 0.4;
                }
                // When aspect is hovered, dim others and slightly highlight connected planets
                if (highlightedByAspect) {
                    highlightOpacity = isHighlightedByAspect ? 1.2 : 0.3;
                }

                return (
                    <g
                        key={planet.planet}
                        className={`planet planet-${planet.planet.toLowerCase()}${isHighlighted ? ' highlighted' : ''}${isHovered ? ' hovered' : ''}${isInHighlightedHouse ? ' in-highlighted-house' : ''}${isHighlightedByAspect ? ' highlighted-by-aspect' : ''}`}
                        data-degree={absoluteDegree}
                        data-actual-x={actualPos.x}
                        data-actual-y={actualPos.y}
                        style={{ cursor: 'pointer' }}
                        onMouseEnter={() => onPlanetHover?.(planet.planet)}
                        onMouseLeave={() => onPlanetHover?.(null)}
                        onClick={() => onPlanetClick?.(planet)}
                        opacity={highlightOpacity}
                    >
                        {/* Glow effect for highlighted planets */}
                        {(isHighlighted || isInHighlightedHouse || isHighlightedByAspect) && (
                            <circle
                                cx={symbolPos.x}
                                cy={symbolPos.y}
                                r={fontSize * 0.8}
                                fill={color}
                                opacity={isHighlightedByAspect ? 0.35 : 0.25}
                                style={{ filter: 'blur(4px)' }}
                            />
                        )}

                        {/* Line connecting actual position to symbol if offset */}
                        {Math.abs(offset) > 2 && (
                            <>
                                {/* Small marker at actual position */}
                                <circle
                                    cx={actualPos.x}
                                    cy={actualPos.y}
                                    r={2}
                                    fill={color}
                                    opacity={0.6 * highlightOpacity}
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
                                    opacity={0.5 * highlightOpacity}
                                />
                            </>
                        )}

                        {/* Planet symbol */}
                        {planet.planet === 'Pluto' ? (
                            <PlutoSymbol
                                x={symbolPos.x}
                                y={symbolPos.y}
                                size={fontSize}
                                color={color}
                            />
                        ) : (
                            <text
                                x={symbolPos.x}
                                y={symbolPos.y}
                                textAnchor="middle"
                                dominantBaseline="central"
                                fontSize={(isHighlighted || isInHighlightedHouse || isHighlightedByAspect) ? fontSize * 1.15 : fontSize}
                                fill={color}
                                fontWeight={isAngle || isHighlighted || isInHighlightedHouse || isHighlightedByAspect ? 'bold' : 'normal'}
                                style={{
                                    fontFamily: 'Segoe UI Symbol, Symbola, sans-serif',
                                    transition: 'font-size 0.15s ease-out',
                                }}
                            >
                                {symbol}&#xFE0E;
                            </text>
                        )}

                        {/* Retrograde symbol - positioned below/beside to avoid collisions */}
                        {planet.retrograde && (
                            <text
                                x={symbolPos.x + fontSize * 0.45}
                                y={symbolPos.y - fontSize * 0.35}
                                textAnchor="start"
                                dominantBaseline="central"
                                fontSize={fontSize * 0.32}
                                fill={color}
                                opacity={0.9}
                                style={{
                                    fontFamily: 'Segoe UI Symbol, Symbola, sans-serif',
                                }}
                            >
                                R
                            </text>
                        )}

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
