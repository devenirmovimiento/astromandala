import React from 'react';
import { HousePosition, MandalaTheme } from '../../types';
import { getPointOnCircle, getMandalaAngle, getAbsoluteDegree } from '../../utils';

interface HouseWheelProps {
    centerX: number;
    centerY: number;
    outerRadius: number;
    innerRadius: number;
    houses: HousePosition[];
    ascendantDegree?: number;
    isSecondChart?: boolean;
    color?: string;
    theme?: MandalaTheme;
}

/**
 * Angle labels for the four cardinal points
 */
const ANGLE_LABELS: Record<number, string> = {
    1: 'AS',
    4: 'IC',
    7: 'DS',
    10: 'MC',
};

/**
 * Renders the house divisions on the chart
 */
export function HouseWheel({
    centerX,
    centerY,
    outerRadius,
    innerRadius,
    houses,
    ascendantDegree = 0,
    isSecondChart = false,
    color,
    theme = 'light',
}: HouseWheelProps) {
    // Sort houses by number
    const sortedHouses = [...houses].sort((a, b) => a.house - b.house);

    const isDark = theme === 'dark';

    // Colors for second chart and theme
    const lineColor = isSecondChart ? (color || '#d94a4a') : (isDark ? '#ddd' : '#000');
    const textColor = isSecondChart ? (color || '#d94a4a') : (isDark ? '#bbb' : '#555');
    const angleLabelColor = isDark ? '#fff' : '#000';
    const nonAngularLineColor = isDark ? '#666' : '#999';

    return (
        <g className={`house-wheel ${isSecondChart ? 'house-wheel-second' : ''}`}>
            {sortedHouses.map((house, index) => {
                const houseDegree = getAbsoluteDegree(house.sign, house.degree);
                const angle = getMandalaAngle(houseDegree, ascendantDegree);

                // Line from inner to outer radius
                const outer = getPointOnCircle(centerX, centerY, outerRadius, angle);
                const inner = getPointOnCircle(centerX, centerY, innerRadius, angle);

                // House number position
                const nextHouse = sortedHouses[(index + 1) % 12];
                const nextHouseDegree = getAbsoluteDegree(nextHouse.sign, nextHouse.degree);

                // Calculate middle of house for number placement
                let midDegree = (houseDegree + nextHouseDegree) / 2;
                if (nextHouseDegree < houseDegree) {
                    midDegree = ((houseDegree + nextHouseDegree + 360) / 2) % 360;
                }

                const numberAngle = getMandalaAngle(midDegree, ascendantDegree);
                const numberRadius = innerRadius * 0.70; // Moved further inside
                const numberPos = getPointOnCircle(centerX, centerY, numberRadius, numberAngle);

                const isAngularHouse = [1, 4, 7, 10].includes(house.house);
                const angleLabel = ANGLE_LABELS[house.house];

                // Position for angle label (ASC, MC, DSC, IC)
                // For second chart, place labels slightly inside; for primary, slightly outside
                const labelRadius = isSecondChart ? innerRadius * 0.92 : outerRadius * 1.02;
                const labelPos = getPointOnCircle(centerX, centerY, labelRadius, angle);

                return (
                    <g key={`house-${house.house}${isSecondChart ? '-second' : ''}`} className={`house-division house-${house.house}`}>
                        {/* House cusp line */}
                        <line
                            x1={outer.x}
                            y1={outer.y}
                            x2={inner.x}
                            y2={inner.y}
                            stroke={isSecondChart ? lineColor : (isAngularHouse ? lineColor : nonAngularLineColor)}
                            strokeWidth={isAngularHouse ? (isSecondChart ? 1.5 : 2) : 0.5}
                            strokeDasharray={isSecondChart ? '4,2' : (isAngularHouse ? undefined : '2,2')}
                            opacity={isSecondChart ? 0.7 : 1}
                        />

                        {/* House number */}
                        <text
                            x={numberPos.x}
                            y={numberPos.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={outerRadius * 0.055}
                            fill={textColor}
                            fontWeight={isAngularHouse ? 'bold' : 'normal'}
                        >
                            {house.house}
                        </text>

                        {/* Angle label (AS, MC, DS, IC) */}
                        {angleLabel && (
                            <text
                                x={labelPos.x}
                                y={labelPos.y}
                                textAnchor="middle"
                                dominantBaseline="central"
                                fontSize={outerRadius * (isSecondChart ? 0.05 : 0.06)}
                                fill={angleLabelColor}
                                fontWeight="bold"
                                opacity={isSecondChart ? 0.85 : 1}
                            >
                                {angleLabel}
                            </text>
                        )}

                        {/* Inner circle line for second chart ring */}
                        {isSecondChart && index === 0 && (
                            <circle
                                cx={centerX}
                                cy={centerY}
                                r={innerRadius}
                                fill="none"
                                stroke={lineColor}
                                strokeWidth={0.5}
                                opacity={0.5}
                            />
                        )}
                    </g>
                );
            })}
        </g>
    );
}
