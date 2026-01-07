import React from 'react';
import { PlanetName } from '../../types';
import { PLANET_SYMBOLS } from '../../constants';

/**
 * Renders a custom SVG symbol for Pluto (more compatible with Android)
 * Uses the standard astrological glyph: circle with arc embracing it from below, and cross at bottom
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
