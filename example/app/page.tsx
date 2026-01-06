'use client';

import { AstroMandala, AstroMandalaWithModal, getTranslations } from 'astromandala';
import type { AstrologicalChart, SynastryAspect, ZodiacSign, PlanetName, AspectType, MandalaTheme, MandalaLanguage } from 'astromandala';
import { useState, useMemo, useEffect } from 'react';
// @ts-ignore - no types available
import { Horoscope, Origin } from 'circular-natal-horoscope-js';

// Buenos Aires coordinates
const DEFAULT_LAT = -34.6037;
const DEFAULT_LNG = -58.3816;

// Map from library sign keys to our ZodiacSign type
const SIGN_MAP: Record<string, ZodiacSign> = {
    aries: 'Aries',
    taurus: 'Taurus',
    gemini: 'Gemini',
    cancer: 'Cancer',
    leo: 'Leo',
    virgo: 'Virgo',
    libra: 'Libra',
    scorpio: 'Scorpio',
    sagittarius: 'Sagittarius',
    capricorn: 'Capricorn',
    aquarius: 'Aquarius',
    pisces: 'Pisces',
};

// Map from library planet keys to our PlanetName type
const PLANET_MAP: Record<string, PlanetName> = {
    sun: 'Sun',
    moon: 'Moon',
    mercury: 'Mercury',
    venus: 'Venus',
    mars: 'Mars',
    jupiter: 'Jupiter',
    saturn: 'Saturn',
    uranus: 'Uranus',
    neptune: 'Neptune',
    pluto: 'Pluto',
    chiron: 'Chiron',
    sirius: 'Lilith', // Using sirius slot for Lilith if available
};

// Map aspect names
const ASPECT_MAP: Record<string, AspectType> = {
    conjunction: 'conjunction',
    opposition: 'opposition',
    trine: 'trine',
    square: 'square',
    sextile: 'sextile',
    quincunx: 'quincunx',
    semisextile: 'semisextile',
    semisquare: 'semisquare',
    sesquiquadrate: 'sesquiquadrate',
    quintile: 'quintile',
    biquintile: 'biquintile',
};

function calculateChart(
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    latitude: number,
    longitude: number,
    label: string
): AstrologicalChart {
    const origin = new Origin({
        year,
        month: month - 1, // Library uses 0-indexed months
        date: day,
        hour,
        minute,
        latitude,
        longitude,
    });

    const horoscope = new Horoscope({
        origin,
        houseSystem: 'placidus',
        zodiac: 'tropical',
        aspectPoints: ['bodies', 'points', 'angles'],
        aspectWithPoints: ['bodies', 'points', 'angles'],
        aspectTypes: ['major', 'minor'],
        customOrbs: {},
        language: 'en',
    });

    // Extract planets
    const planets: AstrologicalChart['planets'] = [];

    // Process celestial bodies
    if (horoscope.CelestialBodies) {
        for (const body of horoscope.CelestialBodies.all) {
            const planetName = PLANET_MAP[body.key];
            if (planetName && body.Sign) {
                planets.push({
                    planet: planetName,
                    sign: SIGN_MAP[body.Sign.key] || 'Aries',
                    degree: body.ChartPosition?.Ecliptic?.DecimalDegrees % 30 || 0,
                    retrograde: body.isRetrograde || false,
                });
            }
        }
    }

    // Add Ascendant and Midheaven
    if (horoscope.Ascendant) {
        planets.push({
            planet: 'Ascendant',
            sign: SIGN_MAP[horoscope.Ascendant.Sign?.key] || 'Aries',
            degree: horoscope.Ascendant.ChartPosition?.Ecliptic?.DecimalDegrees % 30 || 0,
        });
    }

    if (horoscope.Midheaven) {
        planets.push({
            planet: 'Midheaven',
            sign: SIGN_MAP[horoscope.Midheaven.Sign?.key] || 'Aries',
            degree: horoscope.Midheaven.ChartPosition?.Ecliptic?.DecimalDegrees % 30 || 0,
        });
    }

    // Add North Node if available
    if (horoscope.CelestialPoints) {
        const northNode = horoscope.CelestialPoints.all.find((p: any) => p.key === 'northnode');
        if (northNode && northNode.Sign) {
            planets.push({
                planet: 'NorthNode',
                sign: SIGN_MAP[northNode.Sign.key] || 'Aries',
                degree: northNode.ChartPosition?.Ecliptic?.DecimalDegrees % 30 || 0,
            });
        }
        const southNode = horoscope.CelestialPoints.all.find((p: any) => p.key === 'southnode');
        if (southNode && southNode.Sign) {
            planets.push({
                planet: 'SouthNode',
                sign: SIGN_MAP[southNode.Sign.key] || 'Aries',
                degree: southNode.ChartPosition?.Ecliptic?.DecimalDegrees % 30 || 0,
            });
        }
    }

    // Extract houses
    const houses: AstrologicalChart['houses'] = [];
    if (horoscope.Houses) {
        for (let i = 0; i < horoscope.Houses.length; i++) {
            const house = horoscope.Houses[i];
            if (house && house.Sign) {
                houses.push({
                    house: i + 1,
                    sign: SIGN_MAP[house.Sign.key] || 'Aries',
                    degree: house.ChartPosition?.StartPosition?.Ecliptic?.DecimalDegrees % 30 || 0,
                });
            }
        }
    }

    // Extract aspects
    const aspects: AstrologicalChart['aspects'] = [];
    if (horoscope.Aspects && horoscope.Aspects.all) {
        for (const aspect of horoscope.Aspects.all) {
            const planet1 = PLANET_MAP[aspect.point1Key] || (aspect.point1Key === 'ascendant' ? 'Ascendant' : null) || (aspect.point1Key === 'midheaven' ? 'Midheaven' : null);
            const planet2 = PLANET_MAP[aspect.point2Key] || (aspect.point2Key === 'ascendant' ? 'Ascendant' : null) || (aspect.point2Key === 'midheaven' ? 'Midheaven' : null);
            const aspectType = ASPECT_MAP[aspect.aspectKey];

            if (planet1 && planet2 && aspectType) {
                aspects.push({
                    planet1: planet1 as PlanetName,
                    planet2: planet2 as PlanetName,
                    aspect: aspectType,
                    orb: Math.abs(aspect.orb) || 0,
                });
            }
        }
    }

    return {
        label,
        planets,
        houses,
        aspects,
    };
}

function calculateSynastryAspects(chart1: AstrologicalChart, chart2: AstrologicalChart): SynastryAspect[] {
    const synastryAspects: SynastryAspect[] = [];
    const aspectAngles: Record<AspectType, number> = {
        conjunction: 0,
        opposition: 180,
        trine: 120,
        square: 90,
        sextile: 60,
        quincunx: 150,
        semisextile: 30,
        semisquare: 45,
        sesquiquadrate: 135,
        quintile: 72,
        biquintile: 144,
    };
    const orbs: Record<AspectType, number> = {
        conjunction: 8,
        opposition: 8,
        trine: 8,
        square: 7,
        sextile: 6,
        quincunx: 3,
        semisextile: 2,
        semisquare: 2,
        sesquiquadrate: 2,
        quintile: 2,
        biquintile: 2,
    };

    const signDegrees: Record<ZodiacSign, number> = {
        Aries: 0, Taurus: 30, Gemini: 60, Cancer: 90, Leo: 120, Virgo: 150,
        Libra: 180, Scorpio: 210, Sagittarius: 240, Capricorn: 270, Aquarius: 300, Pisces: 330,
    };

    const getAbsoluteDegree = (sign: ZodiacSign, degree: number) => signDegrees[sign] + degree;

    for (const p1 of chart1.planets) {
        for (const p2 of chart2.planets) {
            const deg1 = getAbsoluteDegree(p1.sign, p1.degree);
            const deg2 = getAbsoluteDegree(p2.sign, p2.degree);
            let diff = Math.abs(deg1 - deg2);
            if (diff > 180) diff = 360 - diff;

            for (const [aspectName, aspectAngle] of Object.entries(aspectAngles)) {
                const orb = Math.abs(diff - aspectAngle);
                const maxOrb = orbs[aspectName as AspectType];
                if (orb <= maxOrb) {
                    synastryAspects.push({
                        planet1: p1.planet,
                        chart1Owner: 'chart1',
                        planet2: p2.planet,
                        chart2Owner: 'chart2',
                        aspect: aspectName as AspectType,
                        orb,
                    });
                    break;
                }
            }
        }
    }

    return synastryAspects;
}

export default function Home() {
    // Chart 1 - Default: 16/08/1984 18:15 Buenos Aires
    const [date1, setDate1] = useState('1984-08-16');
    const [time1, setTime1] = useState('18:15');
    const [lat1, setLat1] = useState(DEFAULT_LAT.toString());
    const [lng1, setLng1] = useState(DEFAULT_LNG.toString());
    const [label1, setLabel1] = useState('Person A');

    // Chart 2
    const [date2, setDate2] = useState('1997-08-07');
    const [time2, setTime2] = useState('09:30');
    const [lat2, setLat2] = useState(DEFAULT_LAT.toString());
    const [lng2, setLng2] = useState(DEFAULT_LNG.toString());
    const [label2, setLabel2] = useState('Person B');

    // Display options
    const [showSynastry, setShowSynastry] = useState(false);
    const [showAspects, setShowAspects] = useState(true);
    const [showDegrees, setShowDegrees] = useState(false);
    const [showHouses, setShowHouses] = useState(true);
    const [showSecondChartHouses, setShowSecondChartHouses] = useState(true);
    const [showPlanetProjections, setShowPlanetProjections] = useState(true);
    const [showChartInfo, setShowChartInfo] = useState(false);
    const [includeAnglesInSynastry, setIncludeAnglesInSynastry] = useState(false);
    const [theme, setTheme] = useState<MandalaTheme>('light');
    const [language, setLanguage] = useState<MandalaLanguage>('es');
    
    // Get translations
    const t = useMemo(() => getTranslations(language), [language]);

    // Detect system preference for dark mode
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light');
        }
    }, []);

    // Aspect type filters
    const [aspectFilters, setAspectFilters] = useState<Record<AspectType, boolean>>({
        conjunction: true,
        opposition: true,
        trine: true,
        square: true,
        sextile: true,
        quincunx: false,
        semisextile: false,
        semisquare: false,
        sesquiquadrate: false,
        quintile: false,
        biquintile: false,
    });

    const toggleAspectFilter = (aspect: AspectType) => {
        setAspectFilters(prev => ({ ...prev, [aspect]: !prev[aspect] }));
    };

    const aspectTypesFilter = useMemo(() => {
        return (Object.entries(aspectFilters) as [AspectType, boolean][])
            .filter(([_, enabled]) => enabled)
            .map(([aspect]) => aspect);
    }, [aspectFilters]);

    // Calculate charts
    const chart1 = useMemo(() => {
        const [year, month, day] = date1.split('-').map(Number);
        const [hour, minute] = time1.split(':').map(Number);
        return calculateChart(year, month, day, hour, minute, parseFloat(lat1), parseFloat(lng1), label1);
    }, [date1, time1, lat1, lng1, label1]);

    const chart2 = useMemo(() => {
        const [year, month, day] = date2.split('-').map(Number);
        const [hour, minute] = time2.split(':').map(Number);
        return calculateChart(year, month, day, hour, minute, parseFloat(lat2), parseFloat(lng2), label2);
    }, [date2, time2, lat2, lng2, label2]);

    const synastryAspects = useMemo(() => {
        if (!showSynastry) return undefined;
        return calculateSynastryAspects(chart1, chart2);
    }, [chart1, chart2, showSynastry]);

    const isDark = theme === 'dark';
    
    const pageStyle = {
        padding: '1rem',
        fontFamily: 'system-ui, sans-serif',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: isDark ? '#121212' : '#fff',
        color: isDark ? '#e0e0e0' : '#333',
        minHeight: '100vh',
    };

    const inputStyle = {
        padding: '0.5rem',
        borderRadius: '4px',
        border: isDark ? '1px solid #444' : '1px solid #ccc',
        fontSize: '14px',
        backgroundColor: isDark ? '#2a2a2a' : '#fff',
        color: isDark ? '#e0e0e0' : '#333',
    };

    const labelStyle = {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '0.25rem',
        fontSize: '14px',
    };

    return (
        <main style={pageStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h1 style={{ margin: 0 }}>Astromandala Test</h1>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as MandalaLanguage)}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '4px',
                            border: isDark ? '1px solid #444' : '1px solid #ccc',
                            backgroundColor: isDark ? '#333' : '#fff',
                            color: isDark ? '#fff' : '#333',
                            cursor: 'pointer',
                            fontSize: '14px',
                        }}
                    >
                        <option value="en">🇬🇧 English</option>
                        <option value="es">🇪🇸 Español</option>
                    </select>
                    <button
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            border: 'none',
                            backgroundColor: isDark ? '#333' : '#eee',
                            color: isDark ? '#fff' : '#333',
                            cursor: 'pointer',
                            fontSize: '14px',
                        }}
                    >
                        {isDark ? '☀️' : '🌙'}
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: showSynastry ? '1fr 1fr' : '1fr', gap: '2rem', marginBottom: '1.5rem' }}>
                {/* Chart 1 inputs */}
                <div style={{ padding: '1rem', background: isDark ? '#1e3a4d' : '#e8f4fc', borderRadius: '8px' }}>
                    <h3 style={{ marginBottom: '1rem', color: '#4a90d9' }}>Chart 1 (Inner)</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                        <label style={labelStyle}>
                            Name
                            <input type="text" value={label1} onChange={(e) => setLabel1(e.target.value)} style={inputStyle} />
                        </label>
                        <label style={labelStyle}>
                            Date
                            <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} style={inputStyle} />
                        </label>
                        <label style={labelStyle}>
                            Time
                            <input type="time" value={time1} onChange={(e) => setTime1(e.target.value)} style={inputStyle} />
                        </label>
                        <label style={labelStyle}>
                            Latitude
                            <input type="number" step="0.0001" value={lat1} onChange={(e) => setLat1(e.target.value)} style={inputStyle} />
                        </label>
                        <label style={labelStyle}>
                            Longitude
                            <input type="number" step="0.0001" value={lng1} onChange={(e) => setLng1(e.target.value)} style={inputStyle} />
                        </label>
                    </div>
                </div>

                {/* Chart 2 inputs */}
                {showSynastry && (
                    <div style={{ padding: '1rem', background: isDark ? '#4d1e1e' : '#fce8e8', borderRadius: '8px' }}>
                        <h3 style={{ marginBottom: '1rem', color: '#d94a4a' }}>Chart 2 (Outer)</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            <label style={labelStyle}>
                                Name
                                <input type="text" value={label2} onChange={(e) => setLabel2(e.target.value)} style={inputStyle} />
                            </label>
                            <label style={labelStyle}>
                                Date
                                <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} style={inputStyle} />
                            </label>
                            <label style={labelStyle}>
                                Time
                                <input type="time" value={time2} onChange={(e) => setTime2(e.target.value)} style={inputStyle} />
                            </label>
                            <label style={labelStyle}>
                                Latitude
                                <input type="number" step="0.0001" value={lat2} onChange={(e) => setLat2(e.target.value)} style={inputStyle} />
                            </label>
                            <label style={labelStyle}>
                                Longitude
                                <input type="number" step="0.0001" value={lng2} onChange={(e) => setLng2(e.target.value)} style={inputStyle} />
                            </label>
                        </div>
                    </div>
                )}
            </div>

            {/* Display options */}
            <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={showSynastry} onChange={(e) => setShowSynastry(e.target.checked)} />
                    Show Synastry (Two Charts)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={showAspects} onChange={(e) => setShowAspects(e.target.checked)} />
                    Show Aspects
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={showDegrees} onChange={(e) => setShowDegrees(e.target.checked)} />
                    Show Degrees
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={showHouses} onChange={(e) => setShowHouses(e.target.checked)} />
                    Show Houses
                </label>
                {showSynastry && (
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="checkbox" checked={showSecondChartHouses} onChange={(e) => setShowSecondChartHouses(e.target.checked)} />
                        Show Chart 2 Houses
                    </label>
                )}
                {showSynastry && showAspects && (
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="checkbox" checked={includeAnglesInSynastry} onChange={(e) => setIncludeAnglesInSynastry(e.target.checked)} />
                        Include AC/MC in Synastry Aspects
                    </label>
                )}
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={showPlanetProjections} onChange={(e) => setShowPlanetProjections(e.target.checked)} />
                    Show Planet Projections
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={showChartInfo} onChange={(e) => setShowChartInfo(e.target.checked)} />
                    Show Chart Info Panel
                </label>
            </div>

            {/* Aspect Type Filters */}
            {showAspects && (
                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: isDark ? '#1a1a1a' : '#f9f9f9', borderRadius: '8px' }}>
                    <h4 style={{ marginBottom: '0.75rem', fontSize: '14px', color: isDark ? '#aaa' : '#555' }}>Aspect Types:</h4>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {/* Major aspects */}
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer', fontSize: '13px' }}>
                                <input type="checkbox" checked={aspectFilters.conjunction} onChange={() => toggleAspectFilter('conjunction')} />
                                <span style={{ color: '#ffcc00' }}>☌</span> Conjunction
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer', fontSize: '13px' }}>
                                <input type="checkbox" checked={aspectFilters.opposition} onChange={() => toggleAspectFilter('opposition')} />
                                <span style={{ color: '#ff0000' }}>☍</span> Opposition
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer', fontSize: '13px' }}>
                                <input type="checkbox" checked={aspectFilters.trine} onChange={() => toggleAspectFilter('trine')} />
                                <span style={{ color: '#00cc00' }}>△</span> Trine
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer', fontSize: '13px' }}>
                                <input type="checkbox" checked={aspectFilters.square} onChange={() => toggleAspectFilter('square')} />
                                <span style={{ color: '#cc0000' }}>□</span> Square
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer', fontSize: '13px' }}>
                                <input type="checkbox" checked={aspectFilters.sextile} onChange={() => toggleAspectFilter('sextile')} />
                                <span style={{ color: '#0066cc' }}>✶</span> Sextile
                            </label>
                        </div>
                        {/* Minor aspects */}
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', opacity: 0.8 }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer', fontSize: '13px' }}>
                                <input type="checkbox" checked={aspectFilters.quincunx} onChange={() => toggleAspectFilter('quincunx')} />
                                Quincunx
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer', fontSize: '13px' }}>
                                <input type="checkbox" checked={aspectFilters.semisextile} onChange={() => toggleAspectFilter('semisextile')} />
                                Semisextile
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer', fontSize: '13px' }}>
                                <input type="checkbox" checked={aspectFilters.semisquare} onChange={() => toggleAspectFilter('semisquare')} />
                                Semisquare
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer', fontSize: '13px' }}>
                                <input type="checkbox" checked={aspectFilters.sesquiquadrate} onChange={() => toggleAspectFilter('sesquiquadrate')} />
                                Sesquiquadrate
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer', fontSize: '13px' }}>
                                <input type="checkbox" checked={aspectFilters.quintile} onChange={() => toggleAspectFilter('quintile')} />
                                Quintile
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer', fontSize: '13px' }}>
                                <input type="checkbox" checked={aspectFilters.biquintile} onChange={() => toggleAspectFilter('biquintile')} />
                                Biquintile
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {/* Mandalas at different sizes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Desktop size - Using AstroMandalaWithModal */}
                <div>
                    <h3 style={{ marginBottom: '0.5rem', fontSize: '14px', color: isDark ? '#aaa' : '#666' }}>
                        {t.desktop} (650px) - AstroMandalaWithModal
                    </h3>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        background: isDark ? '#1a1a2e' : '#f5f5f5', 
                        padding: '1rem', 
                        borderRadius: '8px',
                        overflow: 'hidden',
                    }}>
                        <AstroMandalaWithModal
                            chart={chart1}
                            secondChart={showSynastry ? chart2 : undefined}
                            synastryAspects={synastryAspects}
                            size={650}
                            showAspects={showAspects}
                            showDegrees={showDegrees}
                            showHouses={showHouses}
                            showSecondChartHouses={showSecondChartHouses}
                            showPlanetProjections={showPlanetProjections}
                            showChartInfo={showChartInfo}
                            aspectTypesFilter={aspectTypesFilter}
                            includeAnglesInSynastry={includeAnglesInSynastry}
                            innerChartColor="#4a90d9"
                            outerChartColor="#d94a4a"
                            theme={theme}
                            language={language}
                        />
                    </div>
                </div>

                {/* Tablet size */}
                <div>
                    <h3 style={{ marginBottom: '0.5rem', fontSize: '14px', color: isDark ? '#aaa' : '#666' }}>
                        {t.tablet} (450px)
                    </h3>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        background: isDark ? '#1a1a2e' : '#f5f5f5', 
                        padding: '1rem', 
                        borderRadius: '8px',
                        overflow: 'hidden',
                    }}>
                        <AstroMandala
                            chart={chart1}
                            secondChart={showSynastry ? chart2 : undefined}
                            synastryAspects={synastryAspects}
                            size={450}
                            showAspects={showAspects}
                            showDegrees={showDegrees}
                            showHouses={showHouses}
                            showSecondChartHouses={showSecondChartHouses}
                            showPlanetProjections={showPlanetProjections}
                            aspectTypesFilter={aspectTypesFilter}
                            includeAnglesInSynastry={includeAnglesInSynastry}
                            innerChartColor="#4a90d9"
                            outerChartColor="#d94a4a"
                            theme={theme}
                        />
                    </div>
                </div>

                {/* Mobile size */}
                <div>
                    <h3 style={{ marginBottom: '0.5rem', fontSize: '14px', color: isDark ? '#aaa' : '#666' }}>
                        {t.mobile} (320px)
                    </h3>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        background: isDark ? '#1a1a2e' : '#f5f5f5', 
                        padding: '0.5rem', 
                        borderRadius: '8px',
                        overflow: 'hidden',
                        maxWidth: '340px',
                    }}>
                        <AstroMandala
                            chart={chart1}
                            secondChart={showSynastry ? chart2 : undefined}
                            synastryAspects={synastryAspects}
                            size={320}
                            showAspects={showAspects}
                            showDegrees={showDegrees}
                            showHouses={showHouses}
                            showSecondChartHouses={showSecondChartHouses}
                            showPlanetProjections={showPlanetProjections}
                            aspectTypesFilter={aspectTypesFilter}
                            includeAnglesInSynastry={includeAnglesInSynastry}
                            innerChartColor="#4a90d9"
                            outerChartColor="#d94a4a"
                            theme={theme}
                        />
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: isDark ? '#aaa' : '#666' }}>
                <h3>{t.legend}:</h3>
                <p><span style={{ color: '#4a90d9' }}>● Blue</span> = {label1} ({t.innerChart})</p>
                {showSynastry && <p><span style={{ color: '#d94a4a' }}>● Red</span> = {label2} ({t.outerChart})</p>}
                <p style={{ marginTop: '0.5rem' }}>
                    {t.aspectColors}:
                    <span style={{ color: '#00cc00' }}> ▲ {t.trine}</span>,
                    <span style={{ color: '#cc0000' }}> ■ {t.square}</span>,
                    <span style={{ color: '#0066cc' }}> ✶ {t.sextile}</span>,
                    <span style={{ color: '#ff0000' }}> ⊖ {t.opposition}</span>,
                    <span style={{ color: '#ffcc00' }}> ☌ {t.conjunction}</span>
                </p>
            </div>

            {/* Debug info */}
            <details style={{ marginTop: '2rem' }}>
                <summary style={{ cursor: 'pointer', color: isDark ? '#888' : '#666' }}>Debug: Chart Data</summary>
                <pre style={{ background: isDark ? '#1a1a1a' : '#f0f0f0', padding: '1rem', borderRadius: '4px', fontSize: '12px', overflow: 'auto', color: isDark ? '#ccc' : '#333' }}>
                    {JSON.stringify({ chart1, chart2: showSynastry ? chart2 : undefined, synastryAspects }, null, 2)}
                </pre>
            </details>
        </main>
    );
}
