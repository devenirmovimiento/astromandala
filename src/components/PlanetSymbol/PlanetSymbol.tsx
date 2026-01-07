import React from 'react';
import { PlanetName } from '../../types';
import { PLANET_SYMBOLS } from '../../constants';

/**
 * Renders a custom SVG symbol for Pluto (more compatible with Android)
 */
function PlutoSVG({ size, color }: { size: number; color: string }) {
    const scale = size / 20; // Base size is 20
    const viewBox = "0 0 20 20";
    
    return (
        <svg
            width={size}
            height={size}
            viewBox={viewBox}
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
        >
            {/* Circle at top */}
            <circle cx="10" cy="6" r="3" fill="none" stroke={color} strokeWidth="1.5" />
            {/* Cross in middle */}
            <line x1="10" y1="9" x2="10" y2="17" stroke={color} strokeWidth="1.5" />
            <line x1="6" y1="13" x2="14" y2="13" stroke={color} strokeWidth="1.5" />
            {/* Curved arms */}
            <path
                d="M 6 13 Q 4 15 4 17"
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M 14 13 Q 16 15 16 17"
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}

interface PlanetSymbolProps {
    planet: PlanetName;
    /** Size in pixels (for inline) or as a CSS font-size value */
    size?: number | string;
    /** Color of the symbol */
    color?: string;
    /** Additional CSS styles */
    style?: React.CSSProperties;
    /** Additional CSS class */
    className?: string;
}

/**
 * Renders a planet symbol with fallback to SVG for Pluto (Android compatibility)
 */
export function PlanetSymbol({ 
    planet, 
    size = 16, 
    color = 'currentColor',
    style = {},
    className = '',
}: PlanetSymbolProps) {
    const symbol = PLANET_SYMBOLS[planet];
    
    // Use SVG for Pluto to ensure Android compatibility
    if (planet === 'Pluto') {
        const numSize = typeof size === 'number' ? size : parseFloat(size.toString());
        return <PlutoSVG size={numSize} color={color} />;
    }
    
    // For other planets, use Unicode symbols
    return (
        <span
            style={{
                fontFamily: 'Segoe UI Symbol, Symbola, sans-serif',
                fontSize: size,
                color,
                ...style,
            }}
            className={className}
        >
            {symbol}&#xFE0E;
        </span>
    );
}
