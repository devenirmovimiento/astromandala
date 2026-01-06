import React from 'react';
import { HousePosition } from '../../types';
import { getPointOnCircle, getMandalaAngle, getAbsoluteDegree } from '../../utils';

interface HouseWheelProps {
  centerX: number;
  centerY: number;
  outerRadius: number;
  innerRadius: number;
  houses: HousePosition[];
  ascendantDegree?: number;
}

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
}: HouseWheelProps) {
  // Sort houses by number
  const sortedHouses = [...houses].sort((a, b) => a.house - b.house);
  
  return (
    <g className="house-wheel">
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
        const numberRadius = innerRadius * 0.85;
        const numberPos = getPointOnCircle(centerX, centerY, numberRadius, numberAngle);
        
        const isAngularHouse = [1, 4, 7, 10].includes(house.house);
        
        return (
          <g key={`house-${house.house}`} className={`house-division house-${house.house}`}>
            {/* House cusp line */}
            <line
              x1={outer.x}
              y1={outer.y}
              x2={inner.x}
              y2={inner.y}
              stroke={isAngularHouse ? '#444' : '#888'}
              strokeWidth={isAngularHouse ? 1.5 : 0.75}
              strokeDasharray={isAngularHouse ? undefined : '3,3'}
            />
            
            {/* House number */}
            <text
              x={numberPos.x}
              y={numberPos.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={outerRadius * 0.045}
              fill="#666"
              fontWeight={isAngularHouse ? 'bold' : 'normal'}
            >
              {house.house}
            </text>
          </g>
        );
      })}
    </g>
  );
}
