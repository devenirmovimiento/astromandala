'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { AstroMandala } from '../AstroMandala';
import { ChartInfoPanel } from '../ChartInfoPanel';
import { AstroMandalaProps, AspectType, MandalaLanguage, MandalaTheme } from '../../types';
import { getTranslations } from '../../constants';

export interface AstroMandalaWithModalProps extends AstroMandalaProps {
    /** Initial language setting */
    language?: MandalaLanguage;
    /** Whether to show the expand button */
    showExpandButton?: boolean;
    /** Whether to show chart info panel (default: false) */
    showChartInfo?: boolean;
    /** Callback when settings change */
    onSettingsChange?: (settings: ModalSettings) => void;
}

export interface ModalSettings {
    showAspects: boolean;
    showDegrees: boolean;
    showHouses: boolean;
    showSecondChartHouses: boolean;
    showPlanetProjections: boolean;
    showChartInfo: boolean;
    includeAnglesInSynastry: boolean;
    aspectTypesFilter: AspectType[];
    theme: MandalaTheme;
    language: MandalaLanguage;
}

const ALL_ASPECT_TYPES: AspectType[] = [
    'conjunction', 'opposition', 'trine', 'square', 'sextile',
    'quincunx', 'semisextile', 'semisquare', 'sesquiquadrate', 'quintile', 'biquintile'
];

const MAJOR_ASPECTS: AspectType[] = ['conjunction', 'opposition', 'trine', 'square', 'sextile'];

/**
 * AstroMandala with an expand button and fullscreen modal with settings
 */
export function AstroMandalaWithModal({
    chart,
    secondChart,
    synastryAspects,
    size = 500,
    showAspects: initialShowAspects = true,
    showDegrees: initialShowDegrees = false,
    showHouses: initialShowHouses = true,
    showSecondChartHouses: initialShowSecondChartHouses = true,
    showPlanetProjections: initialShowPlanetProjections = true,
    showChartInfo: initialShowChartInfo = false,
    aspectTypesFilter: initialAspectTypesFilter,
    includeAnglesInSynastry: initialIncludeAnglesInSynastry = false,
    innerChartColor = '#4a90d9',
    outerChartColor = '#d94a4a',
    aspectColors,
    theme: initialTheme = 'light',
    language: initialLanguage = 'en',
    className,
    showExpandButton = true,
    onSettingsChange,
}: AstroMandalaWithModalProps) {
    // Mobile detection and window size tracking
    const [isMobile, setIsMobile] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: 600, height: 600 });

    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            setIsMobile(w <= 600);
            setWindowSize({ width: w, height: h });
        };
        // Call immediately
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Modal state - settings start closed on mobile
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModalSettings, setShowModalSettings] = useState(false);

    // Force recalculate size when modal opens
    useEffect(() => {
        if (isModalOpen) {
            // Immediately update window size when modal opens
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        }
    }, [isModalOpen]);

    // Open settings by default on desktop when modal opens
    useEffect(() => {
        if (isModalOpen && !isMobile) {
            setShowModalSettings(true);
        }
    }, [isModalOpen, isMobile]);

    // Settings state - showChartInfo needs to be before modalMandalaSize calculation
    const [showChartInfo, setShowChartInfo] = useState(initialShowChartInfo);

    // Calculate modal mandala size - recalculate when modal opens
    const modalMandalaSize = useMemo(() => {
        if (!isModalOpen) return 500; // Default when closed

        // Use windowSize state which updates on resize
        const width = windowSize.width;
        const height = windowSize.height;

        if (isMobile) {
            // On mobile, maximize space usage
            // Subtract header height and padding from dimensions
            const headerHeight = 45;
            const padding = 24; // Total horizontal padding (12px each side)
            const chartInfoHeight = showChartInfo ? Math.min(height * 0.30, 200) : 0;
            const availableWidth = width - padding;
            const availableHeight = height - headerHeight - chartInfoHeight - padding;
            // Use the smaller dimension to ensure it fits, with a minimum size
            const size = Math.min(availableWidth, availableHeight);
            return Math.max(size, 250);
        } else {
            // On desktop, account for settings panel if visible
            const availableWidth = showModalSettings ? width - 320 : width - 40;
            const availableHeight = height - 120;
            return Math.min(availableWidth, availableHeight);
        }
    }, [isMobile, windowSize, showModalSettings, isModalOpen, showChartInfo]);

    // Settings state
    const [showAspects, setShowAspects] = useState(initialShowAspects);
    const [showDegrees, setShowDegrees] = useState(initialShowDegrees);
    const [showHouses, setShowHouses] = useState(initialShowHouses);
    const [showSecondChartHouses, setShowSecondChartHouses] = useState(initialShowSecondChartHouses);
    const [showPlanetProjections, setShowPlanetProjections] = useState(initialShowPlanetProjections);
    const [includeAnglesInSynastry, setIncludeAnglesInSynastry] = useState(initialIncludeAnglesInSynastry);
    const [theme, setTheme] = useState<MandalaTheme>(initialTheme);
    const [language, setLanguage] = useState<MandalaLanguage>(initialLanguage);

    // Sync theme and language with props when they change
    useEffect(() => {
        setTheme(initialTheme);
    }, [initialTheme]);

    useEffect(() => {
        setLanguage(initialLanguage);
    }, [initialLanguage]);

    // Aspect filters
    const [aspectFilters, setAspectFilters] = useState<Record<AspectType, boolean>>(() => {
        const filters: Record<AspectType, boolean> = {} as Record<AspectType, boolean>;
        ALL_ASPECT_TYPES.forEach(aspect => {
            filters[aspect] = initialAspectTypesFilter
                ? initialAspectTypesFilter.includes(aspect)
                : MAJOR_ASPECTS.includes(aspect);
        });
        return filters;
    });

    const t = useMemo(() => getTranslations(language), [language]);
    const isDark = theme === 'dark';
    const isSynastry = Boolean(secondChart);

    const aspectTypesFilter = useMemo(() => {
        return ALL_ASPECT_TYPES.filter(aspect => aspectFilters[aspect]);
    }, [aspectFilters]);

    const toggleAspectFilter = useCallback((aspect: AspectType) => {
        setAspectFilters(prev => ({ ...prev, [aspect]: !prev[aspect] }));
    }, []);

    // Notify parent of settings changes
    const notifySettingsChange = useCallback(() => {
        if (onSettingsChange) {
            onSettingsChange({
                showAspects,
                showDegrees,
                showHouses,
                showSecondChartHouses,
                showPlanetProjections,
                showChartInfo,
                includeAnglesInSynastry,
                aspectTypesFilter,
                theme,
                language,
            });
        }
    }, [showAspects, showDegrees, showHouses, showSecondChartHouses, showPlanetProjections, showChartInfo, includeAnglesInSynastry, aspectTypesFilter, theme, language, onSettingsChange]);

    // Common mandala props for MODAL (uses internal state)
    const modalMandalaProps = {
        chart,
        secondChart,
        synastryAspects,
        showAspects,
        showDegrees,
        showHouses,
        showSecondChartHouses,
        showPlanetProjections,
        aspectTypesFilter,
        includeAnglesInSynastry,
        innerChartColor,
        outerChartColor,
        aspectColors,
        theme,
        language,
    };

    // Main mandala props (uses initial props from parent)
    const mainMandalaProps = {
        chart,
        secondChart,
        synastryAspects,
        showAspects: initialShowAspects,
        showDegrees: initialShowDegrees,
        showHouses: initialShowHouses,
        showSecondChartHouses: initialShowSecondChartHouses,
        showPlanetProjections: initialShowPlanetProjections,
        aspectTypesFilter: initialAspectTypesFilter,
        includeAnglesInSynastry: initialIncludeAnglesInSynastry,
        innerChartColor,
        outerChartColor,
        aspectColors,
        theme: initialTheme,
        language: initialLanguage,
    };

    // Styles
    const buttonStyle = {
        padding: '0.5rem 0.75rem',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)',
        color: isDark ? '#fff' : '#333',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
    };

    // Expand button needs more visibility
    const expandButtonStyle = {
        ...buttonStyle,
        backgroundColor: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.85)',
        border: isDark ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(0,0,0,0.15)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        position: 'absolute' as const,
        top: '0.5rem',
        right: '0.5rem',
        zIndex: 10,
    };

    const checkboxLabelStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
        fontSize: '14px',
        padding: '0.25rem 0',
    };

    const sectionStyle = {
        marginBottom: '1rem',
        padding: '0.75rem',
        backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
        borderRadius: '6px',
    };

    return (
        <>
            {/* Main container with expand button */}
            <div style={{ position: 'relative', display: 'inline-block' }} className={className}>
                {showExpandButton && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        style={expandButtonStyle}
                        title={t.expand}
                    >
                        ⛶
                    </button>
                )}
                <AstroMandala {...mainMandalaProps} size={size} />
            </div>

            {/* Fullscreen Modal */}
            {isModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: '100vw',
                        maxWidth: '100vw',
                        backgroundColor: isDark ? '#121212' : '#ffffff',
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        boxSizing: 'border-box',
                    }}
                >
                    {/* Modal Header */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: isMobile ? '0.25rem 0.5rem' : '0.5rem 1rem',
                            borderBottom: isDark ? '1px solid #333' : '1px solid #ddd',
                            backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
                            flexShrink: 0,
                            minHeight: isMobile ? '40px' : '48px',
                            maxHeight: isMobile ? '40px' : '48px',
                            width: '100%',
                            boxSizing: 'border-box',
                            overflow: 'hidden',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.25rem' : '1rem', flexShrink: 1, overflow: 'hidden' }}>
                            <button
                                onClick={() => setShowModalSettings(!showModalSettings)}
                                style={{
                                    ...buttonStyle,
                                    padding: isMobile ? '0.25rem 0.4rem' : buttonStyle.padding,
                                    fontSize: isMobile ? '14px' : buttonStyle.fontSize,
                                    minWidth: isMobile ? 'auto' : undefined,
                                }}
                                title={t.settings}
                            >
                                ⚙{isMobile ? '' : ` ${showModalSettings ? '▼' : '▶'} ${t.settings}`}
                            </button>

                            {/* Language selector */}
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value as MandalaLanguage)}
                                style={{
                                    padding: isMobile ? '0.25rem' : '0.5rem',
                                    borderRadius: '4px',
                                    border: isDark ? '1px solid #444' : '1px solid #ccc',
                                    backgroundColor: isDark ? '#333' : '#fff',
                                    color: isDark ? '#fff' : '#333',
                                    cursor: 'pointer',
                                    fontSize: isMobile ? '14px' : '14px',
                                    minWidth: isMobile ? 'auto' : undefined,
                                }}
                            >
                                <option value="en">{isMobile ? '🇬🇧' : '🇬🇧 English'}</option>
                                <option value="es">{isMobile ? '🇪🇸' : '🇪🇸 Español'}</option>
                            </select>

                            {/* Theme toggle */}
                            <button
                                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                                style={{
                                    ...buttonStyle,
                                    padding: isMobile ? '0.25rem 0.4rem' : buttonStyle.padding,
                                    fontSize: isMobile ? '14px' : buttonStyle.fontSize,
                                    minWidth: isMobile ? 'auto' : undefined,
                                }}
                            >
                                {isDark ? '☀️' : '🌙'}
                            </button>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(false)}
                            style={{
                                ...buttonStyle,
                                backgroundColor: isDark ? '#c53030' : '#e53e3e',
                                color: '#fff',
                                padding: isMobile ? '0.25rem 0.5rem' : buttonStyle.padding,
                                fontSize: isMobile ? '14px' : buttonStyle.fontSize,
                                minWidth: isMobile ? 'auto' : undefined,
                                flexShrink: 0,
                                marginLeft: isMobile ? '0.25rem' : undefined,
                            }}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Settings Panel */}
                        {showModalSettings && (
                            <div
                                style={{
                                    width: '280px',
                                    minWidth: '280px',
                                    padding: '1rem',
                                    overflowY: 'auto',
                                    borderRight: isDark ? '1px solid #333' : '1px solid #ddd',
                                    backgroundColor: isDark ? '#1a1a1a' : '#fafafa',
                                    color: isDark ? '#e0e0e0' : '#333',
                                }}
                            >
                                {/* Display options */}
                                <div style={sectionStyle}>
                                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '13px', textTransform: 'uppercase', opacity: 0.7 }}>
                                        {t.settings}
                                    </h4>

                                    <label style={checkboxLabelStyle}>
                                        <input
                                            type="checkbox"
                                            checked={showAspects}
                                            onChange={(e) => setShowAspects(e.target.checked)}
                                        />
                                        {t.showAspects}
                                    </label>

                                    <label style={checkboxLabelStyle}>
                                        <input
                                            type="checkbox"
                                            checked={showDegrees}
                                            onChange={(e) => setShowDegrees(e.target.checked)}
                                        />
                                        {t.showDegrees}
                                    </label>

                                    <label style={checkboxLabelStyle}>
                                        <input
                                            type="checkbox"
                                            checked={showHouses}
                                            onChange={(e) => setShowHouses(e.target.checked)}
                                        />
                                        {t.showHouses}
                                    </label>

                                    {isSynastry && (
                                        <label style={checkboxLabelStyle}>
                                            <input
                                                type="checkbox"
                                                checked={showSecondChartHouses}
                                                onChange={(e) => setShowSecondChartHouses(e.target.checked)}
                                            />
                                            {t.showChart2Houses}
                                        </label>
                                    )}

                                    <label style={checkboxLabelStyle}>
                                        <input
                                            type="checkbox"
                                            checked={showPlanetProjections}
                                            onChange={(e) => setShowPlanetProjections(e.target.checked)}
                                        />
                                        {t.showPlanetProjections}
                                    </label>

                                    <label style={checkboxLabelStyle}>
                                        <input
                                            type="checkbox"
                                            checked={showChartInfo}
                                            onChange={(e) => setShowChartInfo(e.target.checked)}
                                        />
                                        {t.showChartInfo}
                                    </label>

                                    {isSynastry && showAspects && (
                                        <label style={checkboxLabelStyle}>
                                            <input
                                                type="checkbox"
                                                checked={includeAnglesInSynastry}
                                                onChange={(e) => setIncludeAnglesInSynastry(e.target.checked)}
                                            />
                                            {t.includeAnglesInSynastry}
                                        </label>
                                    )}
                                </div>

                                {/* Aspect Types */}
                                {showAspects && (
                                    <div style={sectionStyle}>
                                        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '13px', textTransform: 'uppercase', opacity: 0.7 }}>
                                            {t.aspectTypes}
                                        </h4>

                                        <div style={{ marginBottom: '0.5rem' }}>
                                            <span style={{ fontSize: '12px', opacity: 0.6 }}>{t.majorAspects}</span>
                                        </div>

                                        {MAJOR_ASPECTS.map(aspect => (
                                            <label key={aspect} style={{ ...checkboxLabelStyle, fontSize: '13px' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={aspectFilters[aspect]}
                                                    onChange={() => toggleAspectFilter(aspect)}
                                                />
                                                {t[aspect]}
                                            </label>
                                        ))}

                                        <div style={{ marginTop: '0.75rem', marginBottom: '0.5rem' }}>
                                            <span style={{ fontSize: '12px', opacity: 0.6 }}>{t.minorAspects}</span>
                                        </div>

                                        {ALL_ASPECT_TYPES.filter(a => !MAJOR_ASPECTS.includes(a)).map(aspect => (
                                            <label key={aspect} style={{ ...checkboxLabelStyle, fontSize: '13px' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={aspectFilters[aspect]}
                                                    onChange={() => toggleAspectFilter(aspect)}
                                                />
                                                {t[aspect]}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Mandala Container */}
                        <div
                            style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: isMobile ? 'column' : 'row',
                                justifyContent: isMobile ? 'flex-start' : 'center',
                                alignItems: 'center',
                                padding: isMobile ? '0.5rem' : '1rem',
                                backgroundColor: isDark ? '#0d0d1a' : '#f0f0f0',
                                overflow: 'hidden',
                                boxSizing: 'border-box',
                                minHeight: 0,
                                gap: '0.5rem',
                                width: '100%',
                                maxWidth: '100%',
                            }}
                        >
                            <div style={{
                                width: modalMandalaSize,
                                height: modalMandalaSize,
                                maxWidth: '100%',
                                maxHeight: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexShrink: 1,
                            }}>
                                <AstroMandala
                                    {...modalMandalaProps}
                                    size={modalMandalaSize}
                                    key={`modal-mandala-${modalMandalaSize}-${showChartInfo}`}
                                />
                            </div>

                            {/* Chart Info Panel - shows next to mandala on desktop (vertically centered) */}
                            {showChartInfo && !isMobile && (
                                <div style={{
                                    alignSelf: 'center',
                                    maxHeight: modalMandalaSize * 0.85,
                                    overflowY: 'auto',
                                }}>
                                    <ChartInfoPanel
                                        chart={chart}
                                        secondChart={secondChart}
                                        theme={theme}
                                        language={language}
                                    />
                                </div>
                            )}

                            {/* Chart Info Panel for Mobile - shows below mandala (horizontally centered) */}
                            {showChartInfo && isMobile && (
                                <div style={{
                                    width: '100%',
                                    maxWidth: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}>
                                    <ChartInfoPanel
                                        chart={chart}
                                        secondChart={secondChart}
                                        theme={theme}
                                        language={language}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile: Toggle settings button (shown only on small screens) */}
                    <style>{`
            @media (max-width: 600px) {
              .modal-settings-panel {
                position: absolute !important;
                left: 0 !important;
                top: 60px !important;
                bottom: 0 !important;
                width: 100% !important;
                z-index: 100 !important;
              }
            }
          `}</style>
                </div>
            )}
        </>
    );
}
