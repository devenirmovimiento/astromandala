'use client';

import React, { useState, useMemo } from 'react';
import {
    MandalaTheme,
    MandalaLanguage,
    AstrologicalChart,
    PlanetName,
    ZodiacSign,
    AspectType,
    Aspect,
} from '../../types';
import {
    getTranslations,
    SIGN_ELEMENTS,
    PLANET_SYMBOLS,
    ZODIAC_SYMBOLS,
    infoElementos,
    infoSignos,
    infoCasas,
    infoCuerpos,
    infoRetrogradacion,
    infoTransitosAspectos,
    infoEjesAngulares,
} from '../../constants';
import { PlanetSymbol } from '../PlanetSymbol';

// Types for what was clicked
export type ClickedItemType = 'sign' | 'planet' | 'house' | 'aspect' | 'angle';

export interface ClickedItem {
    type: ClickedItemType;
    // For sign clicks
    sign?: ZodiacSign;
    // For planet clicks
    planet?: PlanetName;
    planetSign?: ZodiacSign;
    planetDegree?: number;
    planetHouse?: number;
    isRetrograde?: boolean;
    // For house clicks
    house?: number;
    houseSign?: ZodiacSign;
    // For aspect clicks
    aspectType?: AspectType;
    aspectPlanet1?: PlanetName;
    aspectPlanet2?: PlanetName;
    // For angle clicks
    angle?: 'ascendant' | 'descendant' | 'midheaven' | 'imum_coeli';
    angleSign?: ZodiacSign;
}

export interface EducationalInfoPanelProps {
    clickedItem: ClickedItem | null;
    chart: AstrologicalChart;
    secondChart?: AstrologicalChart;
    theme: MandalaTheme;
    language: MandalaLanguage;
    onClose: () => void;
    onItemClick?: (item: ClickedItem) => void;
}

// Helper to map zodiac sign to info key
const signToInfoKey: Record<ZodiacSign, keyof typeof infoSignos> = {
    'Aries': 'aries',
    'Taurus': 'tauro',
    'Gemini': 'geminis',
    'Cancer': 'cancer',
    'Leo': 'leo',
    'Virgo': 'virgo',
    'Libra': 'libra',
    'Scorpio': 'escorpio',
    'Sagittarius': 'sagitario',
    'Capricorn': 'capricornio',
    'Aquarius': 'acuario',
    'Pisces': 'piscis',
};

// Helper to map element to info key
const elementToInfoKey: Record<string, keyof typeof infoElementos> = {
    'fire': 'fuego',
    'water': 'agua',
    'earth': 'tierra',
    'air': 'aire',
};

// Helper to map planet to info key
const planetToInfoKey: Record<PlanetName, keyof typeof infoCuerpos | null> = {
    'Sun': 'sol',
    'Moon': 'luna',
    'Mercury': 'mercurio',
    'Venus': 'venus',
    'Mars': 'marte',
    'Jupiter': 'jupiter',
    'Saturn': 'saturno',
    'Uranus': 'urano',
    'Neptune': 'neptuno',
    'Pluto': 'pluton',
    'Chiron': 'quiron',
    'Lilith': 'lilith',
    'NorthNode': 'nodoNorte',
    'SouthNode': 'nodoSur',
    'Ascendant': null,
    'Midheaven': null,
};

// Helper to map aspect to info key
const aspectToInfoKey: Record<AspectType, keyof typeof infoTransitosAspectos> = {
    'conjunction': 'conjuncion',
    'opposition': 'oposicion',
    'trine': 'trigono',
    'square': 'cuadratura',
    'sextile': 'sextil',
    'quincunx': 'quincuncio',
    'semisextile': 'sextil',
    'semisquare': 'cuadratura',
    'sesquiquadrate': 'cuadratura',
    'quintile': 'quintil',
    'biquintile': 'biquintil',
};

// Helper to map house number to info key
const houseToInfoKey = (house: number): keyof typeof infoCasas => {
    return `casa${house}` as keyof typeof infoCasas;
};

// Expandable Section Component
interface ExpandableSectionProps {
    title: string;
    children: React.ReactNode;
    defaultExpanded?: boolean;
    theme: MandalaTheme;
}

function ExpandableSection({ title, children, defaultExpanded = false, theme }: ExpandableSectionProps) {
    const [expanded, setExpanded] = useState(defaultExpanded);
    const isDark = theme === 'dark';

    return (
        <div style={{
            marginBottom: '0.75rem',
            borderRadius: '6px',
            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
            overflow: 'hidden',
        }}>
            <button
                onClick={() => setExpanded(!expanded)}
                style={{
                    width: '100%',
                    padding: '0.75rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: isDark ? '#e0e0e0' : '#333',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 600,
                    textAlign: 'left',
                }}
            >
                <span>{title}</span>
                <span style={{ fontSize: '12px' }}>{expanded ? '▼' : '▶'}</span>
            </button>
            {expanded && (
                <div style={{ padding: '0 0.75rem 0.75rem' }}>
                    {children}
                </div>
            )}
        </div>
    );
}

// Link Item Component
interface LinkItemProps {
    label: string;
    symbol?: string;
    planetName?: PlanetName;
    onClick: () => void;
    theme: MandalaTheme;
    color?: string;
}

function LinkItem({ label, symbol, planetName, onClick, theme, color }: LinkItemProps) {
    const isDark = theme === 'dark';

    return (
        <button
            onClick={onClick}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.25rem 0.5rem',
                margin: '0.125rem',
                borderRadius: '4px',
                border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.15)',
                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                color: color || (isDark ? '#a8c8f0' : '#2563eb'),
                cursor: 'pointer',
                fontSize: '13px',
                textDecoration: 'none',
            }}
        >
            {planetName ? (
                <PlanetSymbol planet={planetName} size={14} color={color || (isDark ? '#a8c8f0' : '#2563eb')} />
            ) : symbol ? (
                <span style={{ fontSize: '14px' }}>{symbol}</span>
            ) : null}
            <span>{label}</span>
        </button>
    );
}

// List Renderer
interface ListRendererProps {
    items: readonly string[];
    theme: MandalaTheme;
}

function ListRenderer({ items, theme }: ListRendererProps) {
    const isDark = theme === 'dark';

    return (
        <ul style={{
            margin: 0,
            paddingLeft: '1.25rem',
            color: isDark ? '#ccc' : '#555',
            fontSize: '13px',
            lineHeight: 1.6,
        }}>
            {items.map((item, i) => (
                <li key={i}>{item}</li>
            ))}
        </ul>
    );
}

export function EducationalInfoPanel({
    clickedItem,
    chart,
    theme,
    language,
    onClose,
    onItemClick,
}: EducationalInfoPanelProps) {
    const t = useMemo(() => getTranslations(language), [language]);
    const isDark = theme === 'dark';
    const lang = language === 'es' ? 'es' : 'en';

    if (!clickedItem) return null;

    // Find planets in a sign
    const getPlanetsInSign = (sign: ZodiacSign) => {
        return chart.planets.filter(p => p.sign === sign && p.planet !== 'Ascendant' && p.planet !== 'Midheaven');
    };

    // Find planets in a house
    const getPlanetsInHouse = (houseNum: number) => {
        // Find house cusps to determine which planets are in which house
        const sortedHouses = [...chart.houses].sort((a, b) => {
            const degA = getAbsoluteDegreeFromSign(a.sign, a.degree);
            const degB = getAbsoluteDegreeFromSign(b.sign, b.degree);
            return degA - degB;
        });

        return chart.planets.filter(p => {
            if (p.planet === 'Ascendant' || p.planet === 'Midheaven') return false;
            const planetDeg = getAbsoluteDegreeFromSign(p.sign, p.degree);
            const houseIndex = sortedHouses.findIndex(h => h.house === houseNum);
            if (houseIndex === -1) return false;
            const houseCusp = sortedHouses[houseIndex];
            const nextHouse = sortedHouses[(houseIndex + 1) % 12];
            const houseStart = getAbsoluteDegreeFromSign(houseCusp.sign, houseCusp.degree);
            const houseEnd = getAbsoluteDegreeFromSign(nextHouse.sign, nextHouse.degree);

            if (houseStart < houseEnd) {
                return planetDeg >= houseStart && planetDeg < houseEnd;
            } else {
                // House spans 0°
                return planetDeg >= houseStart || planetDeg < houseEnd;
            }
        });
    };

    // Find aspects for a planet
    const getAspectsForPlanet = (planetName: PlanetName): Aspect[] => {
        return chart.aspects.filter(a => a.planet1 === planetName || a.planet2 === planetName);
    };

    // Get house number for a planet based on degree
    const getHouseForPlanet = (planetSign: ZodiacSign, planetDegree: number): number => {
        const planetAbsDeg = getAbsoluteDegreeFromSign(planetSign, planetDegree);
        const sortedHouses = [...chart.houses].sort((a, b) => {
            const degA = getAbsoluteDegreeFromSign(a.sign, a.degree);
            const degB = getAbsoluteDegreeFromSign(b.sign, b.degree);
            return degA - degB;
        });

        for (let i = 0; i < sortedHouses.length; i++) {
            const houseCusp = sortedHouses[i];
            const nextHouse = sortedHouses[(i + 1) % 12];
            const houseStart = getAbsoluteDegreeFromSign(houseCusp.sign, houseCusp.degree);
            const houseEnd = getAbsoluteDegreeFromSign(nextHouse.sign, nextHouse.degree);

            if (houseStart < houseEnd) {
                if (planetAbsDeg >= houseStart && planetAbsDeg < houseEnd) {
                    return houseCusp.house;
                }
            } else {
                if (planetAbsDeg >= houseStart || planetAbsDeg < houseEnd) {
                    return houseCusp.house;
                }
            }
        }
        return 1;
    };

    // Helper function to get absolute degree
    const getAbsoluteDegreeFromSign = (sign: ZodiacSign, degree: number): number => {
        const signStarts: Record<ZodiacSign, number> = {
            'Aries': 0, 'Taurus': 30, 'Gemini': 60, 'Cancer': 90,
            'Leo': 120, 'Virgo': 150, 'Libra': 180, 'Scorpio': 210,
            'Sagittarius': 240, 'Capricorn': 270, 'Aquarius': 300, 'Pisces': 330,
        };
        return signStarts[sign] + degree;
    };

    // Create click handler for an item
    const handleItemClick = (item: ClickedItem) => {
        onItemClick?.(item);
    };

    // Render content based on clicked item type
    const renderContent = () => {
        switch (clickedItem.type) {
            case 'sign':
                return renderSignInfo();
            case 'planet':
                return renderPlanetInfo();
            case 'house':
                return renderHouseInfo();
            case 'aspect':
                return renderAspectInfo();
            case 'angle':
                return renderAngleInfo();
            default:
                return null;
        }
    };

    // Render sign information
    const renderSignInfo = () => {
        if (!clickedItem.sign) return null;
        const signKey = signToInfoKey[clickedItem.sign];
        const signInfo = infoSignos[signKey];
        const element = SIGN_ELEMENTS[clickedItem.sign];
        const elementKey = elementToInfoKey[element];
        const elementInfo = infoElementos[elementKey];
        const planetsInSign = getPlanetsInSign(clickedItem.sign);

        return (
            <>
                {/* Sign Header */}
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.5rem',
                    }}>
                        <span style={{ fontSize: '28px' }}>{ZODIAC_SYMBOLS[clickedItem.sign]}</span>
                        <h3 style={{ margin: 0, fontSize: '20px', color: isDark ? '#fff' : '#333' }}>
                            {signInfo.label[lang]}
                        </h3>
                    </div>
                    <p style={{
                        margin: 0,
                        fontSize: '14px',
                        fontStyle: 'italic',
                        color: isDark ? '#aaa' : '#666',
                    }}>
                        {signInfo.coreTheme[lang]}
                    </p>
                </div>

                {/* Sign Light & Shadow */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.5rem',
                    marginBottom: '0.75rem',
                }}>
                    <div style={{
                        padding: '0.5rem',
                        borderRadius: '6px',
                        backgroundColor: isDark ? 'rgba(100, 200, 100, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                    }}>
                        <h4 style={{
                            margin: '0 0 0.25rem 0',
                            fontSize: '12px',
                            color: isDark ? '#86efac' : '#16a34a',
                        }}>
                            {t.lightQualities}
                        </h4>
                        <ListRenderer items={signInfo.light[lang]} theme={theme} />
                    </div>
                    <div style={{
                        padding: '0.5rem',
                        borderRadius: '6px',
                        backgroundColor: isDark ? 'rgba(200, 100, 100, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    }}>
                        <h4 style={{
                            margin: '0 0 0.25rem 0',
                            fontSize: '12px',
                            color: isDark ? '#fca5a5' : '#dc2626',
                        }}>
                            {t.shadowQualities}
                        </h4>
                        <ListRenderer items={signInfo.shadow[lang]} theme={theme} />
                    </div>
                </div>

                {/* Learning */}
                <ExpandableSection title={t.learning} theme={theme}>
                    <p style={{ margin: 0, fontSize: '13px', color: isDark ? '#ccc' : '#555' }}>
                        {signInfo.learning[lang]}
                    </p>
                </ExpandableSection>

                {/* Questions */}
                <ExpandableSection title={t.questions} theme={theme}>
                    <ListRenderer items={signInfo.questions[lang]} theme={theme} />
                </ExpandableSection>

                {/* Chart Hint */}
                <ExpandableSection title={t.chartHints} theme={theme}>
                    <p style={{ margin: 0, fontSize: '13px', color: isDark ? '#ccc' : '#555' }}>
                        {signInfo.chartHint[lang]}
                    </p>
                </ExpandableSection>

                {/* Element Section */}
                <ExpandableSection title={`${t.element}: ${elementInfo.label[lang]}`} theme={theme}>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '13px', color: isDark ? '#ccc' : '#555' }}>
                        {elementInfo.intro[lang]}
                    </p>
                    <div style={{ marginTop: '0.5rem' }}>
                        <h5 style={{ margin: '0 0 0.25rem 0', fontSize: '12px', color: isDark ? '#aaa' : '#666' }}>
                            {t.balance}
                        </h5>
                        <p style={{ margin: 0, fontSize: '12px', color: isDark ? '#ccc' : '#555' }}>
                            <strong>{t.balanced}:</strong> {elementInfo.balance.balanced[lang]}
                        </p>
                    </div>
                </ExpandableSection>

                {/* Planets in this sign */}
                {planetsInSign.length > 0 && (
                    <ExpandableSection title={`${t.relatedPositions} (${planetsInSign.length})`} theme={theme}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                            {planetsInSign.map(p => {
                                const house = getHouseForPlanet(p.sign, p.degree);
                                return (
                                    <LinkItem
                                        key={p.planet}
                                        planetName={p.planet}
                                        label={`${t.inHouse} ${house}`}
                                        onClick={() => handleItemClick({
                                            type: 'planet',
                                            planet: p.planet,
                                            planetSign: p.sign,
                                            planetDegree: p.degree,
                                            planetHouse: house,
                                            isRetrograde: p.retrograde,
                                        })}
                                        theme={theme}
                                    />
                                );
                            })}
                        </div>
                    </ExpandableSection>
                )}
            </>
        );
    };

    // Render planet information
    const renderPlanetInfo = () => {
        if (!clickedItem.planet) return null;
        const planetKey = planetToInfoKey[clickedItem.planet];

        // Handle angles (Ascendant, Midheaven)
        if (!planetKey) {
            if (clickedItem.planet === 'Ascendant') {
                return renderAngleInfo();
            } else if (clickedItem.planet === 'Midheaven') {
                return renderAngleInfo();
            }
            return null;
        }

        const planetInfo = infoCuerpos[planetKey];
        const aspects = getAspectsForPlanet(clickedItem.planet);
        const houseNum = clickedItem.planetHouse || (clickedItem.planetSign && clickedItem.planetDegree !== undefined
            ? getHouseForPlanet(clickedItem.planetSign, clickedItem.planetDegree)
            : 1);
        const houseKey = houseToInfoKey(houseNum);
        const houseInfo = infoCasas[houseKey];

        return (
            <>
                {/* Planet Header */}
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.5rem',
                    }}>
                        <PlanetSymbol planet={clickedItem.planet} size={28} color={isDark ? '#fff' : '#333'} />
                        <div>
                            <h3 style={{ margin: 0, fontSize: '20px', color: isDark ? '#fff' : '#333' }}>
                                {planetInfo.label[lang]}
                            </h3>
                            {clickedItem.planetSign && (
                                <p style={{
                                    margin: 0,
                                    fontSize: '13px',
                                    color: isDark ? '#aaa' : '#666',
                                }}>
                                    {t.inSign} {infoSignos[signToInfoKey[clickedItem.planetSign]].label[lang]}
                                    {clickedItem.planetDegree !== undefined && ` ${t.atDegree} ${clickedItem.planetDegree.toFixed(0)}°`}
                                    {` • ${t.inHouse} ${houseNum}`}
                                    {clickedItem.isRetrograde && ` • ℞ ${t.retrograde}`}
                                </p>
                            )}
                        </div>
                    </div>
                    <p style={{
                        margin: 0,
                        fontSize: '14px',
                        fontStyle: 'italic',
                        color: isDark ? '#aaa' : '#666',
                    }}>
                        {planetInfo.coreTheme[lang]}
                    </p>
                </div>

                {/* Planet Intro */}
                <p style={{
                    margin: '0 0 0.75rem 0',
                    fontSize: '13px',
                    color: isDark ? '#ccc' : '#555',
                    lineHeight: 1.6,
                }}>
                    {planetInfo.intro[lang]}
                </p>

                {/* Light & Shadow */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.5rem',
                    marginBottom: '0.75rem',
                }}>
                    <div style={{
                        padding: '0.5rem',
                        borderRadius: '6px',
                        backgroundColor: isDark ? 'rgba(100, 200, 100, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                    }}>
                        <h4 style={{
                            margin: '0 0 0.25rem 0',
                            fontSize: '12px',
                            color: isDark ? '#86efac' : '#16a34a',
                        }}>
                            {t.lightQualities}
                        </h4>
                        <ListRenderer items={planetInfo.light[lang]} theme={theme} />
                    </div>
                    <div style={{
                        padding: '0.5rem',
                        borderRadius: '6px',
                        backgroundColor: isDark ? 'rgba(200, 100, 100, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    }}>
                        <h4 style={{
                            margin: '0 0 0.25rem 0',
                            fontSize: '12px',
                            color: isDark ? '#fca5a5' : '#dc2626',
                        }}>
                            {t.shadowQualities}
                        </h4>
                        <ListRenderer items={planetInfo.shadow[lang]} theme={theme} />
                    </div>
                </div>

                {/* Retrograde info if applicable */}
                {clickedItem.isRetrograde && (
                    <ExpandableSection title={`℞ ${t.retrograde}`} theme={theme} defaultExpanded>
                        <p style={{ margin: '0 0 0.5rem 0', fontSize: '13px', color: isDark ? '#ccc' : '#555' }}>
                            {infoRetrogradacion.retrograde.intro[lang]}
                        </p>
                        <ListRenderer items={infoRetrogradacion.retrograde.keyIdeas[lang]} theme={theme} />
                    </ExpandableSection>
                )}

                {/* House info */}
                <ExpandableSection title={`${t.inHouse} ${houseNum}`} theme={theme}>
                    <p style={{ margin: '0 0 0.25rem 0', fontSize: '13px', fontStyle: 'italic', color: isDark ? '#aaa' : '#666' }}>
                        {houseInfo.coreTheme[lang]}
                    </p>
                    <p style={{ margin: 0, fontSize: '13px', color: isDark ? '#ccc' : '#555' }}>
                        {houseInfo.intro[lang]}
                    </p>
                </ExpandableSection>

                {/* Questions */}
                <ExpandableSection title={t.questions} theme={theme}>
                    <ListRenderer items={planetInfo.questions[lang]} theme={theme} />
                </ExpandableSection>

                {/* Chart Hint */}
                <ExpandableSection title={t.chartHints} theme={theme}>
                    <p style={{ margin: 0, fontSize: '13px', color: isDark ? '#ccc' : '#555' }}>
                        {planetInfo.chartHint[lang]}
                    </p>
                </ExpandableSection>

                {/* Aspects */}
                {aspects.length > 0 && (
                    <ExpandableSection title={`${t.aspectsTable} (${aspects.length})`} theme={theme}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.25rem',
                        }}>
                            {aspects.map((asp, i) => {
                                const otherPlanet = asp.planet1 === clickedItem.planet ? asp.planet2 : asp.planet1;
                                const aspectKey = aspectToInfoKey[asp.aspect];
                                const aspectInfo = infoTransitosAspectos[aspectKey];
                                return (
                                    <div
                                        key={i}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '0.5rem',
                                            borderRadius: '4px',
                                            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <LinkItem
                                                planetName={otherPlanet}
                                                label=""
                                                onClick={() => {
                                                    const p = chart.planets.find(pl => pl.planet === otherPlanet);
                                                    if (p) {
                                                        handleItemClick({
                                                            type: 'planet',
                                                            planet: p.planet,
                                                            planetSign: p.sign,
                                                            planetDegree: p.degree,
                                                            planetHouse: getHouseForPlanet(p.sign, p.degree),
                                                            isRetrograde: p.retrograde,
                                                        });
                                                    }
                                                }}
                                                theme={theme}
                                            />
                                            <span style={{ fontSize: '13px', color: isDark ? '#ccc' : '#555' }}>
                                                {aspectInfo.label[lang]}
                                            </span>
                                        </div>
                                        <LinkItem
                                            label={t.clickToLearnMore}
                                            onClick={() => handleItemClick({
                                                type: 'aspect',
                                                aspectType: asp.aspect,
                                                aspectPlanet1: asp.planet1,
                                                aspectPlanet2: asp.planet2,
                                            })}
                                            theme={theme}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </ExpandableSection>
                )}
            </>
        );
    };

    // Render house information
    const renderHouseInfo = () => {
        if (clickedItem.house === undefined) return null;
        const houseKey = houseToInfoKey(clickedItem.house);
        const houseInfo = infoCasas[houseKey];
        const planetsInHouse = getPlanetsInHouse(clickedItem.house);

        return (
            <>
                {/* House Header */}
                <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '20px', color: isDark ? '#fff' : '#333' }}>
                        {houseInfo.label[lang]}
                    </h3>
                    {clickedItem.houseSign && (
                        <p style={{ margin: 0, fontSize: '13px', color: isDark ? '#aaa' : '#666' }}>
                            {t.inSign} {infoSignos[signToInfoKey[clickedItem.houseSign]].label[lang]}
                        </p>
                    )}
                    <p style={{
                        margin: '0.25rem 0 0 0',
                        fontSize: '14px',
                        fontStyle: 'italic',
                        color: isDark ? '#aaa' : '#666',
                    }}>
                        {houseInfo.coreTheme[lang]}
                    </p>
                </div>

                {/* House Intro */}
                <p style={{
                    margin: '0 0 0.75rem 0',
                    fontSize: '13px',
                    color: isDark ? '#ccc' : '#555',
                    lineHeight: 1.6,
                }}>
                    {houseInfo.intro[lang]}
                </p>

                {/* Light & Shadow */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.5rem',
                    marginBottom: '0.75rem',
                }}>
                    <div style={{
                        padding: '0.5rem',
                        borderRadius: '6px',
                        backgroundColor: isDark ? 'rgba(100, 200, 100, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                    }}>
                        <h4 style={{
                            margin: '0 0 0.25rem 0',
                            fontSize: '12px',
                            color: isDark ? '#86efac' : '#16a34a',
                        }}>
                            {t.lightQualities}
                        </h4>
                        <ListRenderer items={houseInfo.light[lang]} theme={theme} />
                    </div>
                    <div style={{
                        padding: '0.5rem',
                        borderRadius: '6px',
                        backgroundColor: isDark ? 'rgba(200, 100, 100, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    }}>
                        <h4 style={{
                            margin: '0 0 0.25rem 0',
                            fontSize: '12px',
                            color: isDark ? '#fca5a5' : '#dc2626',
                        }}>
                            {t.shadowQualities}
                        </h4>
                        <ListRenderer items={houseInfo.shadow[lang]} theme={theme} />
                    </div>
                </div>

                {/* Questions */}
                <ExpandableSection title={t.questions} theme={theme}>
                    <ListRenderer items={houseInfo.questions[lang]} theme={theme} />
                </ExpandableSection>

                {/* Planets in this house */}
                {planetsInHouse.length > 0 && (
                    <ExpandableSection title={`${t.relatedPositions} (${planetsInHouse.length})`} theme={theme} defaultExpanded>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                            {planetsInHouse.map(p => (
                                <LinkItem
                                    key={p.planet}
                                    planetName={p.planet}
                                    label={`${p.degree.toFixed(0)}° ${ZODIAC_SYMBOLS[p.sign]}${p.retrograde ? ' ℞' : ''}`}
                                    onClick={() => handleItemClick({
                                        type: 'planet',
                                        planet: p.planet,
                                        planetSign: p.sign,
                                        planetDegree: p.degree,
                                        planetHouse: clickedItem.house,
                                        isRetrograde: p.retrograde,
                                    })}
                                    theme={theme}
                                />
                            ))}
                        </div>
                    </ExpandableSection>
                )}
            </>
        );
    };

    // Render aspect information
    const renderAspectInfo = () => {
        if (!clickedItem.aspectType) return null;
        const aspectKey = aspectToInfoKey[clickedItem.aspectType];
        const aspectInfo = infoTransitosAspectos[aspectKey];

        return (
            <>
                {/* Aspect Header */}
                <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '20px', color: isDark ? '#fff' : '#333' }}>
                        {aspectInfo.label[lang]}
                    </h3>
                    {clickedItem.aspectPlanet1 && clickedItem.aspectPlanet2 && (
                        <p style={{ margin: 0, fontSize: '13px', color: isDark ? '#aaa' : '#666', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <PlanetSymbol planet={clickedItem.aspectPlanet1} size={13} />
                            <span>-</span>
                            <PlanetSymbol planet={clickedItem.aspectPlanet2} size={13} />
                        </p>
                    )}
                    <p style={{
                        margin: '0.25rem 0 0 0',
                        fontSize: '14px',
                        fontStyle: 'italic',
                        color: isDark ? '#aaa' : '#666',
                    }}>
                        {aspectInfo.coreTheme[lang]} ({aspectInfo.angle}°)
                    </p>
                </div>

                {/* Aspect Intro */}
                <p style={{
                    margin: '0 0 0.75rem 0',
                    fontSize: '13px',
                    color: isDark ? '#ccc' : '#555',
                    lineHeight: 1.6,
                }}>
                    {aspectInfo.intro[lang]}
                </p>

                {/* Light & Shadow */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.5rem',
                    marginBottom: '0.75rem',
                }}>
                    <div style={{
                        padding: '0.5rem',
                        borderRadius: '6px',
                        backgroundColor: isDark ? 'rgba(100, 200, 100, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                    }}>
                        <h4 style={{
                            margin: '0 0 0.25rem 0',
                            fontSize: '12px',
                            color: isDark ? '#86efac' : '#16a34a',
                        }}>
                            {t.lightQualities}
                        </h4>
                        <ListRenderer items={aspectInfo.light[lang]} theme={theme} />
                    </div>
                    <div style={{
                        padding: '0.5rem',
                        borderRadius: '6px',
                        backgroundColor: isDark ? 'rgba(200, 100, 100, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    }}>
                        <h4 style={{
                            margin: '0 0 0.25rem 0',
                            fontSize: '12px',
                            color: isDark ? '#fca5a5' : '#dc2626',
                        }}>
                            {t.shadowQualities}
                        </h4>
                        <ListRenderer items={aspectInfo.shadow[lang]} theme={theme} />
                    </div>
                </div>

                {/* Questions */}
                <ExpandableSection title={t.questions} theme={theme}>
                    <ListRenderer items={aspectInfo.questions[lang]} theme={theme} />
                </ExpandableSection>

                {/* Related Planets */}
                {clickedItem.aspectPlanet1 && clickedItem.aspectPlanet2 && (
                    <ExpandableSection title={t.relatedPositions} theme={theme} defaultExpanded>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                            {[clickedItem.aspectPlanet1, clickedItem.aspectPlanet2].map(pName => {
                                const p = chart.planets.find(pl => pl.planet === pName);
                                if (!p) return null;
                                return (
                                    <LinkItem
                                        key={pName}
                                        planetName={pName}
                                        label={`${t.inSign} ${ZODIAC_SYMBOLS[p.sign]}`}
                                        onClick={() => handleItemClick({
                                            type: 'planet',
                                            planet: p.planet,
                                            planetSign: p.sign,
                                            planetDegree: p.degree,
                                            planetHouse: getHouseForPlanet(p.sign, p.degree),
                                            isRetrograde: p.retrograde,
                                        })}
                                        theme={theme}
                                    />
                                );
                            })}
                        </div>
                    </ExpandableSection>
                )}
            </>
        );
    };

    // Map English angle names to Spanish info keys
    const angleToInfoKey: Record<string, keyof typeof infoEjesAngulares> = {
        'ascendant': 'ascendente',
        'descendant': 'descendente',
        'midheaven': 'medioCielo',
        'imum_coeli': 'fondoCielo',
        // Also handle planet names that are angles
        'Ascendant': 'ascendente',
        'Midheaven': 'medioCielo',
    };

    // Render angle information
    const renderAngleInfo = () => {
        let angleKey: keyof typeof infoEjesAngulares | undefined;

        if (clickedItem.angle) {
            angleKey = angleToInfoKey[clickedItem.angle];
        } else if (clickedItem.planet) {
            angleKey = angleToInfoKey[clickedItem.planet];
        }

        if (!angleKey) {
            return null;
        }

        const angleInfo = infoEjesAngulares[angleKey];

        if (!angleInfo) {
            return null;
        }
        const sign = clickedItem.angleSign || clickedItem.planetSign;

        return (
            <>
                {/* Angle Header */}
                <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '20px', color: isDark ? '#fff' : '#333' }}>
                        {angleInfo.label[lang]}
                    </h3>
                    {sign && (
                        <p style={{ margin: 0, fontSize: '13px', color: isDark ? '#aaa' : '#666' }}>
                            {t.inSign} {infoSignos[signToInfoKey[sign]].label[lang]} {ZODIAC_SYMBOLS[sign]}
                        </p>
                    )}
                    <p style={{
                        margin: '0.25rem 0 0 0',
                        fontSize: '14px',
                        fontStyle: 'italic',
                        color: isDark ? '#aaa' : '#666',
                    }}>
                        {angleInfo.coreTheme[lang]}
                    </p>
                </div>

                {/* Angle Intro */}
                <p style={{
                    margin: '0 0 0.75rem 0',
                    fontSize: '13px',
                    color: isDark ? '#ccc' : '#555',
                    lineHeight: 1.6,
                }}>
                    {angleInfo.intro[lang]}
                </p>

                {/* Light & Shadow */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.5rem',
                    marginBottom: '0.75rem',
                }}>
                    <div style={{
                        padding: '0.5rem',
                        borderRadius: '6px',
                        backgroundColor: isDark ? 'rgba(100, 200, 100, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                    }}>
                        <h4 style={{
                            margin: '0 0 0.25rem 0',
                            fontSize: '12px',
                            color: isDark ? '#86efac' : '#16a34a',
                        }}>
                            {t.lightQualities}
                        </h4>
                        <ListRenderer items={angleInfo.light[lang]} theme={theme} />
                    </div>
                    <div style={{
                        padding: '0.5rem',
                        borderRadius: '6px',
                        backgroundColor: isDark ? 'rgba(200, 100, 100, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    }}>
                        <h4 style={{
                            margin: '0 0 0.25rem 0',
                            fontSize: '12px',
                            color: isDark ? '#fca5a5' : '#dc2626',
                        }}>
                            {t.shadowQualities}
                        </h4>
                        <ListRenderer items={angleInfo.shadow[lang]} theme={theme} />
                    </div>
                </div>

                {/* Questions */}
                <ExpandableSection title={t.questions} theme={theme}>
                    <ListRenderer items={angleInfo.questions[lang]} theme={theme} />
                </ExpandableSection>

                {/* Chart Hint */}
                <ExpandableSection title={t.chartHints} theme={theme}>
                    <p style={{ margin: 0, fontSize: '13px', color: isDark ? '#ccc' : '#555' }}>
                        {angleInfo.chartHint[lang]}
                    </p>
                </ExpandableSection>

                {/* Sign info if available */}
                {sign && (
                    <ExpandableSection title={`${t.sign}: ${infoSignos[signToInfoKey[sign]].label[lang]}`} theme={theme}>
                        <p style={{ margin: 0, fontSize: '13px', color: isDark ? '#ccc' : '#555' }}>
                            <strong>{t.coreTheme}:</strong> {infoSignos[signToInfoKey[sign]].coreTheme[lang]}
                        </p>
                        <div style={{ marginTop: '0.5rem' }}>
                            <LinkItem
                                symbol={ZODIAC_SYMBOLS[sign]}
                                label={t.clickToLearnMore}
                                onClick={() => handleItemClick({ type: 'sign', sign })}
                                theme={theme}
                            />
                        </div>
                    </ExpandableSection>
                )}
            </>
        );
    };

    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: isDark ? '#1a1a2e' : '#fff',
            color: isDark ? '#e0e0e0' : '#333',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: isDark
                ? '0 4px 20px rgba(0,0,0,0.5)'
                : '0 4px 20px rgba(0,0,0,0.15)',
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                borderBottom: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
            }}>
                <span style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: isDark ? '#a8c8f0' : '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}>
                    ℹ️ {t.infoMode}
                </span>
                <button
                    onClick={onClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: isDark ? '#aaa' : '#666',
                        cursor: 'pointer',
                        fontSize: '18px',
                        padding: '0.25rem',
                        lineHeight: 1,
                    }}
                >
                    ✕
                </button>
            </div>

            {/* Content */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1rem',
            }}>
                {renderContent()}
            </div>
        </div>
    );
}
