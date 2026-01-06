import React from 'react';
import { PlanetPosition, MandalaTheme, PlanetName, ZodiacSign } from '../../types';
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
    /** Callback when mouse hovers over a planet */
    onPlanetHover?: (planet: PlanetName | null) => void;
    /** Currently hovered planet */
    hoveredPlanet?: PlanetName | null;
    /** Sign being hovered - planets in this sign will be highlighted */
    highlightedSign?: ZodiacSign | null;
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
}: PlanetDisplayProps) {
    const isDark = theme === 'dark';
    const offsetLineColor = isDark ? '#555' : '#ccc';

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
                // Determine if this planet is being hovered
                const isHovered = hoveredPlanet === planet.planet;
                // Calculate opacity based on hover state
                const baseOpacity = 1;
                const highlightOpacity = isHighlighted ? 1 : (highlightedSign ? 0.4 : baseOpacity);

                return (
                    <g
                        key={planet.planet}
                        className={`planet planet-${planet.planet.toLowerCase()}${isHighlighted ? ' highlighted' : ''}${isHovered ? ' hovered' : ''}`}
                        data-degree={absoluteDegree}
                        data-actual-x={actualPos.x}
                        data-actual-y={actualPos.y}
                        style={{ cursor: 'pointer' }}
                        onMouseEnter={() => onPlanetHover?.(planet.planet)}
                        onMouseLeave={() => onPlanetHover?.(null)}
                        opacity={highlightOpacity}
                    >
                        {/* Glow effect for highlighted planets */}
                        {isHighlighted && (
                            <circle
                                cx={symbolPos.x}
                                cy={symbolPos.y}
                                r={fontSize * 0.8}
                                fill={color}
                                opacity={0.25}
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
                        <text
                            x={symbolPos.x}
                            y={symbolPos.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={isHighlighted ? fontSize * 1.15 : fontSize}
                            fill={color}
                            fontWeight={isAngle || isHighlighted ? 'bold' : 'normal'}
                            style={{
                                fontFamily: 'Segoe UI Symbol, Symbola, sans-serif',
                                transition: 'font-size 0.15s ease-out',
                            }}
                        >
                            {symbol}&#xFE0E;
                        </text>

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
