import React from 'react';
import { ZODIAC_ORDER, ZODIAC_SYMBOLS, ELEMENT_COLORS, SIGN_ELEMENTS } from '../../constants';
import { getPointOnCircle, getMandalaAngle } from '../../utils';

interface ZodiacWheelProps {
  centerX: number;
  centerY: number;
  outerRadius: number;
  innerRadius: number;
  ascendantDegree?: number;
}

/**
 * Renders the zodiac sign wheel (outer ring of the mandala)
 */
export function ZodiacWheel({
  centerX,
  centerY,
  outerRadius,
  innerRadius,
  ascendantDegree = 0,
}: ZodiacWheelProps) {
  const signArcAngle = 30; // Each sign spans 30 degrees
  const middleRadius = (outerRadius + innerRadius) / 2;

  return (
    <g className="zodiac-wheel">
      {/* Outer circle */}
      <circle
        cx={centerX}
        cy={centerY}
        r={outerRadius}
        fill="none"
        stroke="#333"
        strokeWidth={1}
      />
      
      {/* Inner circle */}
      <circle
        cx={centerX}
        cy={centerY}
        r={innerRadius}
        fill="none"
        stroke="#333"
        strokeWidth={1}
      />

      {/* Sign segments */}
      {ZODIAC_ORDER.map((sign, index) => {
        const startDegree = index * signArcAngle;
        const startAngle = getMandalaAngle(startDegree, ascendantDegree);
        const endAngle = getMandalaAngle(startDegree + signArcAngle, ascendantDegree);
        
        // Calculate positions for the segment
        const outerStart = getPointOnCircle(centerX, centerY, outerRadius, startAngle);
        const outerEnd = getPointOnCircle(centerX, centerY, outerRadius, endAngle);
        const innerStart = getPointOnCircle(centerX, centerY, innerRadius, startAngle);
        const innerEnd = getPointOnCircle(centerX, centerY, innerRadius, endAngle);
        
        // Symbol position at middle of segment
        const symbolAngle = getMandalaAngle(startDegree + signArcAngle / 2, ascendantDegree);
        const symbolPos = getPointOnCircle(centerX, centerY, middleRadius, symbolAngle);
        
        const element = SIGN_ELEMENTS[sign];
        const fillColor = ELEMENT_COLORS[element] + '30'; // 30 is hex for ~19% opacity
        
        // Create the arc segment path
        const pathD = `
          M ${outerStart.x} ${outerStart.y}
          A ${outerRadius} ${outerRadius} 0 0 0 ${outerEnd.x} ${outerEnd.y}
          L ${innerEnd.x} ${innerEnd.y}
          A ${innerRadius} ${innerRadius} 0 0 1 ${innerStart.x} ${innerStart.y}
          Z
        `;
        
        return (
          <g key={sign} className={`sign-segment sign-${sign.toLowerCase()}`}>
            {/* Segment background */}
            <path
              d={pathD}
              fill={fillColor}
              stroke="#666"
              strokeWidth={0.5}
            />
            
            {/* Sign symbol */}
            <text
              x={symbolPos.x}
              y={symbolPos.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={outerRadius * 0.08}
              fill={ELEMENT_COLORS[element]}
              fontWeight="bold"
            >
              {ZODIAC_SYMBOLS[sign]}
            </text>
          </g>
        );
      })}
      
      {/* Degree markers (every 5 degrees) */}
      {Array.from({ length: 72 }, (_, i) => {
        const degree = i * 5;
        const angle = getMandalaAngle(degree, ascendantDegree);
        const isMainDivision = degree % 30 === 0;
        const markerLength = isMainDivision ? (outerRadius - innerRadius) * 0.5 : (outerRadius - innerRadius) * 0.2;
        
        const outer = getPointOnCircle(centerX, centerY, innerRadius, angle);
        const inner = getPointOnCircle(centerX, centerY, innerRadius - markerLength, angle);
        
        return (
          <line
            key={`marker-${degree}`}
            x1={outer.x}
            y1={outer.y}
            x2={inner.x}
            y2={inner.y}
            stroke="#999"
            strokeWidth={isMainDivision ? 1 : 0.5}
          />
        );
      })}
    </g>
  );
}
