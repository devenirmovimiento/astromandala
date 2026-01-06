'use client';

import React, { useMemo } from 'react';
import { AstrologicalChart, MandalaTheme, MandalaLanguage, PlanetName, ZodiacSign, PlanetPosition, HousePosition } from '../../types';
import { ZODIAC_SYMBOLS, PLANET_SYMBOLS, SIGN_ELEMENTS, getTranslations } from '../../constants';

interface ChartInfoPanelProps {
    chart: AstrologicalChart;
    secondChart?: AstrologicalChart;
    theme?: MandalaTheme;
    language?: MandalaLanguage;
    showHouses?: boolean;
    showElements?: boolean;
    className?: string;
}

// Planet names translations
const PLANET_NAMES: Record<MandalaLanguage, Record<PlanetName, string>> = {
    en: {
        Sun: 'Sun', Moon: 'Moon', Mercury: 'Mercury', Venus: 'Venus', Mars: 'Mars',
        Jupiter: 'Jupiter', Saturn: 'Saturn', Uranus: 'Uranus', Neptune: 'Neptune', Pluto: 'Pluto',
        NorthNode: 'Node', SouthNode: 'S.Node', Chiron: 'Chiron', Lilith: 'Lilith',
        Ascendant: 'ASC', Midheaven: 'MC',
    },
    es: {
        Sun: 'Sol', Moon: 'Luna', Mercury: 'Mercurio', Venus: 'Venus', Mars: 'Marte',
        Jupiter: 'Júpiter', Saturn: 'Saturno', Uranus: 'Urano', Neptune: 'Neptuno', Pluto: 'Plutón',
        NorthNode: 'Nodo', SouthNode: 'Nodo S.', Chiron: 'Quirón', Lilith: 'Lilith',
        Ascendant: 'ASC', Midheaven: 'MC',
    },
};

/**
 * Displays chart information - supports single chart or synastry (two charts side by side)
 */
export function ChartInfoPanel({
    chart,
    secondChart,
    theme = 'light',
    language = 'en',
    showHouses = true,
    showElements = true,
    className,
}: ChartInfoPanelProps) {
    const isDark = theme === 'dark';
    const isSynastry = Boolean(secondChart);

    // Colors
    const chart1Color = '#4a90d9';
    const chart2Color = '#d94a4a';

    // Planet order for display
    const planetOrder: PlanetName[] = [
        'Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn',
        'Uranus', 'Neptune', 'Pluto', 'NorthNode', 'Lilith', 'Chiron'
    ];

    const sortPlanets = (planets: PlanetPosition[]): PlanetPosition[] => {
        return [...planets]
            .filter((p: PlanetPosition) => planetOrder.includes(p.planet))
            .sort((a: PlanetPosition, b: PlanetPosition) => planetOrder.indexOf(a.planet) - planetOrder.indexOf(b.planet));
    };

    const sortedPlanets1 = useMemo(() => sortPlanets(chart.planets), [chart.planets]);
    const sortedPlanets2 = useMemo(() => secondChart ? sortPlanets(secondChart.planets) : [], [secondChart]);

    const formatDegree = (degree: number): string => {
        const deg = Math.floor(degree);
        const min = Math.round((degree - deg) * 60);
        return `${deg}°${min.toString().padStart(2, '0')}'`;
    };

    const getPlanetName = (planet: PlanetName): string => {
        return PLANET_NAMES[language][planet] || planet;
    };

    // Styles
    const containerStyle: React.CSSProperties = {
        backgroundColor: isDark ? '#1a1a2e' : '#fff',
        color: isDark ? '#e0e0e0' : '#333',
        padding: '1rem',
        borderRadius: '8px',
        border: isDark ? '1px solid #333' : '1px solid #ddd',
        fontSize: '14px',
        fontFamily: 'system-ui, sans-serif',
        maxWidth: isSynastry ? '420px' : '320px',
    };

    const sectionTitleStyle: React.CSSProperties = {
        fontWeight: 'bold',
        fontSize: '14px',
        marginBottom: '0.5rem',
        marginTop: '0.75rem',
        color: isDark ? '#fff' : '#333',
    };

    const symbolStyle: React.CSSProperties = {
        fontFamily: 'Segoe UI Symbol, Symbola, sans-serif',
        fontSize: '16px',
    };

    const cellStyle: React.CSSProperties = {
        padding: '0.3rem 0.25rem',
        borderBottom: isDark ? '1px solid #333' : '1px solid #eee',
        whiteSpace: 'nowrap',
    };

    // Render position (sign + degree) for a planet
    const renderPosition = (planet: PlanetPosition | undefined, color: string) => {
        if (!planet) return null;
        return (
            <span style={{ color }}>
                <span style={symbolStyle}>{ZODIAC_SYMBOLS[planet.sign]}</span>
                {' '}
                {formatDegree(planet.degree)}
                {planet.retrograde && <span style={{ fontSize: '10px', marginLeft: '2px', color: isDark ? '#ff6b6b' : '#c00' }}>ℜ</span>}
            </span>
        );
    };

    // Get sorted house cusps
    const houses1 = useMemo(() => [...chart.houses].sort((a: HousePosition, b: HousePosition) => a.house - b.house), [chart.houses]);
    const houses2 = useMemo(() => secondChart ? [...secondChart.houses].sort((a: HousePosition, b: HousePosition) => a.house - b.house) : [], [secondChart]);

    // Angular house labels
    const getHouseLabel = (num: number): string => {
        if (num === 1) return 'ASC';
        if (num === 4) return 'IC';
        if (num === 7) return 'DSC';
        if (num === 10) return 'MC';
        return '';
    };

    return (
        <div style={containerStyle} className={className}>
            {/* Header for synastry */}
            {isSynastry && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '2rem',
                    marginBottom: '0.5rem',
                    paddingBottom: '0.5rem',
                    borderBottom: isDark ? '1px solid #444' : '1px solid #ddd',
                }}>
                    <div style={{ color: chart1Color, fontWeight: 'bold', fontSize: '13px', minWidth: '90px', textAlign: 'center' }}>
                        {chart.label || (language === 'es' ? 'Persona A' : 'Person A')}
                    </div>
                    <div style={{ color: chart2Color, fontWeight: 'bold', fontSize: '13px', minWidth: '90px', textAlign: 'center' }}>
                        {secondChart?.label || (language === 'es' ? 'Persona B' : 'Person B')}
                    </div>
                </div>
            )}

            {/* Planets Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                    {planetOrder.map(planetName => {
                        const planet1 = sortedPlanets1.find(p => p.planet === planetName);
                        const planet2 = sortedPlanets2.find(p => p.planet === planetName);

                        if (!planet1 && !planet2) return null;

                        return (
                            <tr key={planetName}>
                                <td style={{ ...cellStyle, ...symbolStyle, color: isDark ? '#888' : '#666', width: '24px' }}>
                                    {PLANET_SYMBOLS[planetName]}
                                </td>
                                <td style={{ ...cellStyle, fontWeight: 500, minWidth: '70px' }}>
                                    {getPlanetName(planetName)}
                                </td>
                                <td style={{ ...cellStyle, minWidth: '90px' }}>
                                    {renderPosition(planet1, isSynastry ? chart1Color : (isDark ? '#e0e0e0' : '#333'))}
                                </td>
                                {isSynastry && (
                                    <td style={{ ...cellStyle, minWidth: '90px' }}>
                                        {renderPosition(planet2, chart2Color)}
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Houses Section */}
            {showHouses && (
                <>
                    <div style={sectionTitleStyle}>
                        {language === 'es' ? 'Casas:' : 'Houses:'} (Placidus)
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <tbody>
                            {[1, 4, 7, 10].map(num => {
                                const house1 = houses1.find(h => h.house === num);
                                const house2 = houses2.find(h => h.house === num);
                                const label = getHouseLabel(num);

                                return (
                                    <tr key={num}>
                                        <td style={{ ...cellStyle, fontWeight: 'bold', width: '40px' }}>
                                            {label}:
                                        </td>
                                        <td style={{ ...cellStyle, color: isSynastry ? chart1Color : (isDark ? '#e0e0e0' : '#333') }}>
                                            {house1 && (
                                                <>
                                                    <span style={symbolStyle}>{ZODIAC_SYMBOLS[house1.sign]}</span>
                                                    {' '}
                                                    {formatDegree(house1.degree)}
                                                </>
                                            )}
                                        </td>
                                        {isSynastry && (
                                            <td style={{ ...cellStyle, color: chart2Color }}>
                                                {house2 && (
                                                    <>
                                                        <span style={symbolStyle}>{ZODIAC_SYMBOLS[house2.sign]}</span>
                                                        {' '}
                                                        {formatDegree(house2.degree)}
                                                    </>
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </>
            )}

            {/* Elements Section - only for single chart */}
            {showElements && !isSynastry && (
                <ElementsDisplay chart={chart} language={language} isDark={isDark} />
            )}
        </div>
    );
}

// Separate component for elements
function ElementsDisplay({ chart, language, isDark }: { chart: AstrologicalChart; language: MandalaLanguage; isDark: boolean }) {
    const elementCounts = useMemo(() => {
        const counts = { fire: 0, earth: 0, air: 0, water: 0 };
        const mainPlanets: PlanetName[] = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];

        chart.planets.forEach((planet: PlanetPosition) => {
            if (mainPlanets.includes(planet.planet)) {
                const element = SIGN_ELEMENTS[planet.sign];
                if (element && counts[element as keyof typeof counts] !== undefined) {
                    counts[element as keyof typeof counts]++;
                }
            }
        });

        return counts;
    }, [chart.planets]);

    const sectionTitleStyle: React.CSSProperties = {
        fontWeight: 'bold',
        fontSize: '14px',
        marginBottom: '0.5rem',
        marginTop: '0.75rem',
        color: isDark ? '#fff' : '#333',
    };

    const elementEmojis = { fire: '🔥', earth: '🌍', air: '💨', water: '💧' };
    const elementNames = {
        fire: language === 'es' ? 'Fuego' : 'Fire',
        earth: language === 'es' ? 'Tierra' : 'Earth',
        air: language === 'es' ? 'Aire' : 'Air',
        water: language === 'es' ? 'Agua' : 'Water',
    };

    return (
        <>
            <div style={sectionTitleStyle}>
                {language === 'es' ? 'Elementos' : 'Elements'}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {Object.entries(elementCounts).map(([element, count]) => (
                    <div key={element} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>{count}x</span>
                        <span>{elementEmojis[element as keyof typeof elementEmojis]}</span>
                        <span>{elementNames[element as keyof typeof elementNames]}</span>
                    </div>
                ))}
            </div>
        </>
    );
}
