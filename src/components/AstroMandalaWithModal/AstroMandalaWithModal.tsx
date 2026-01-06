'use client';

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AstroMandala } from '../AstroMandala';
import { ChartInfoPanel } from '../ChartInfoPanel';
import { AstroMandalaProps, AspectType, MandalaLanguage, MandalaTheme, BirthData } from '../../types';
import { getTranslations } from '../../constants';

// CSS reset for modal isolation - prevents host page styles from affecting the modal
const MODAL_CSS_RESET = `
  .astromandala-modal-root,
  .astromandala-modal-root *,
  .astromandala-modal-root *::before,
  .astromandala-modal-root *::after {
    box-sizing: border-box !important;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
  }
  .astromandala-modal-root {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    height: 100dvh !important;
    z-index: 2147483647 !important;
    isolation: isolate !important;
  }
  .astromandala-modal-root button {
    font-family: inherit !important;
    cursor: pointer !important;
  }
  .astromandala-modal-root select {
    font-family: inherit !important;
    cursor: pointer !important;
  }
  .astromandala-modal-root input[type="checkbox"] {
    cursor: pointer !important;
    width: 16px !important;
    height: 16px !important;
  }
  .astromandala-modal-root label {
    cursor: pointer !important;
  }
  body.astromandala-modal-open {
    overflow: hidden !important;
    position: fixed !important;
    width: 100% !important;
    height: 100% !important;
  }
`;

export interface AstroMandalaWithModalProps extends AstroMandalaProps {
    /** Initial language setting */
    language?: MandalaLanguage;
    /** Whether to show the expand button */
    showExpandButton?: boolean;
    /** Whether to show chart info panel (default: false) */
    showChartInfo?: boolean;
    /** Title to display in the modal header when expanded */
    title?: string;
    /** Birth data for the primary chart */
    birthData?: BirthData;
    /** Birth data for the secondary chart (synastry) */
    secondBirthData?: BirthData;
    /** Whether to show birth data on the chart by default (default: false) */
    showBirthData?: boolean;
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
    showBirthData: boolean;
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
    showBirthData: initialShowBirthData = false,
    aspectTypesFilter: initialAspectTypesFilter,
    includeAnglesInSynastry: initialIncludeAnglesInSynastry = false,
    innerChartColor = '#4a90d9',
    outerChartColor = '#d94a4a',
    aspectColors,
    theme: initialTheme = 'light',
    language: initialLanguage = 'en',
    className,
    showExpandButton = true,
    title,
    birthData,
    secondBirthData,
    onSettingsChange,
}: AstroMandalaWithModalProps) {
    // Ref for portal container and mandala for image export
    const portalContainerRef = useRef<HTMLDivElement | null>(null);
    const mandalaContainerRef = useRef<HTMLDivElement | null>(null);
    const scrollPositionRef = useRef<number>(0);

    // Mobile detection and window size tracking
    const [isMobile, setIsMobile] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: 600, height: 600 });
    const [isMounted, setIsMounted] = useState(false);

    // Handle initial mount for SSR compatibility
    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const handleResize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            setIsMobile(w <= 600);
            setWindowSize({ width: w, height: h });
        };
        // Call immediately
        handleResize();
        window.addEventListener('resize', handleResize);

        // Also listen for orientation change on mobile
        window.addEventListener('orientationchange', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        };
    }, [isMounted]);

    // Modal state - settings start closed on mobile
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModalSettings, setShowModalSettings] = useState(false);

    // Create/cleanup portal container and manage body scroll lock
    useEffect(() => {
        if (!isMounted) return;

        if (isModalOpen) {
            // Save current scroll position
            scrollPositionRef.current = window.scrollY;

            // Create portal container
            const container = document.createElement('div');
            container.id = 'astromandala-modal-portal';
            document.body.appendChild(container);
            portalContainerRef.current = container;

            // Inject CSS reset styles
            const styleElement = document.createElement('style');
            styleElement.id = 'astromandala-modal-styles';
            styleElement.textContent = MODAL_CSS_RESET;
            document.head.appendChild(styleElement);

            // Lock body scroll
            document.body.classList.add('astromandala-modal-open');
            document.body.style.top = `-${scrollPositionRef.current}px`;

            // Force update to trigger portal render
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });

            return () => {
                // Remove portal container
                if (portalContainerRef.current && document.body.contains(portalContainerRef.current)) {
                    document.body.removeChild(portalContainerRef.current);
                    portalContainerRef.current = null;
                }

                // Remove CSS reset styles
                const styleEl = document.getElementById('astromandala-modal-styles');
                if (styleEl) {
                    document.head.removeChild(styleEl);
                }

                // Unlock body scroll and restore position
                document.body.classList.remove('astromandala-modal-open');
                document.body.style.top = '';
                window.scrollTo(0, scrollPositionRef.current);
            };
        }
    }, [isModalOpen, isMounted]);

    // Handle Escape key to close modal
    useEffect(() => {
        if (!isModalOpen || !isMounted) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                setIsModalOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown, { capture: true });
        return () => {
            document.removeEventListener('keydown', handleKeyDown, { capture: true });
        };
    }, [isModalOpen, isMounted]);

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
    const [showBirthDataOnChart, setShowBirthDataOnChart] = useState(initialShowBirthData);
    const [includeAnglesInSynastry, setIncludeAnglesInSynastry] = useState(initialIncludeAnglesInSynastry);
    const [theme, setTheme] = useState<MandalaTheme>(initialTheme);
    const [language, setLanguage] = useState<MandalaLanguage>(initialLanguage);

    // Function to download the chart as PNG image
    const downloadChartAsImage = useCallback(async () => {
        if (!mandalaContainerRef.current) return;

        try {
            const container = mandalaContainerRef.current;
            const svg = container.querySelector('svg');
            if (!svg) return;

            // Clone the SVG and add birth data text if enabled
            const svgClone = svg.cloneNode(true) as SVGSVGElement;
            const svgSize = parseInt(svg.getAttribute('width') || '500');

            // Add birth data text to SVG if enabled
            if (showBirthDataOnChart && birthData) {
                const textGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                const isDarkTheme = theme === 'dark';
                const textColor = isDarkTheme ? '#e0e0e0' : '#333';
                const fontSize = Math.max(10, svgSize * 0.022);
                let yOffset = svgSize + fontSize + 5;

                const addTextLine = (text: string) => {
                    const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    textEl.setAttribute('x', (svgSize / 2).toString());
                    textEl.setAttribute('y', yOffset.toString());
                    textEl.setAttribute('text-anchor', 'middle');
                    textEl.setAttribute('fill', textColor);
                    textEl.setAttribute('font-size', fontSize.toString());
                    textEl.setAttribute('font-family', 'Arial, sans-serif');
                    textEl.textContent = text;
                    textGroup.appendChild(textEl);
                    yOffset += fontSize + 4;
                };

                if (birthData.name) addTextLine(birthData.name);
                if (birthData.date) addTextLine(birthData.date + (birthData.time ? ` - ${birthData.time}` : ''));
                if (birthData.location) addTextLine(birthData.location);

                if (secondBirthData) {
                    yOffset += 5;
                    if (secondBirthData.name) addTextLine(secondBirthData.name);
                    if (secondBirthData.date) addTextLine(secondBirthData.date + (secondBirthData.time ? ` - ${secondBirthData.time}` : ''));
                    if (secondBirthData.location) addTextLine(secondBirthData.location);
                }

                // Expand viewBox to include text
                const extraHeight = yOffset - svgSize;
                svgClone.setAttribute('height', (svgSize + extraHeight).toString());
                svgClone.setAttribute('viewBox', `0 0 ${svgSize} ${svgSize + extraHeight}`);
                svgClone.appendChild(textGroup);
            }

            // Convert SVG to canvas
            const svgData = new XMLSerializer().serializeToString(svgClone);
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const svgUrl = URL.createObjectURL(svgBlob);

            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const scale = 2; // Higher resolution
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;

                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                // Fill background
                ctx.fillStyle = theme === 'dark' ? '#1a1a2e' : '#fafafa';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.scale(scale, scale);
                ctx.drawImage(img, 0, 0);

                // Download
                const link = document.createElement('a');
                // Build filename from title and/or names
                let fileName = 'astromandala_chart.png';
                const sanitize = (str: string) => str.replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s]/g, '').replace(/\s+/g, '_').trim();

                if (title && birthData?.name && secondBirthData?.name) {
                    // Title + both names
                    fileName = `${sanitize(title)}_${sanitize(birthData.name)}_${sanitize(secondBirthData.name)}.png`;
                } else if (title && birthData?.name) {
                    // Title + first name
                    fileName = `${sanitize(title)}_${sanitize(birthData.name)}.png`;
                } else if (birthData?.name && secondBirthData?.name) {
                    // Both names (synastry)
                    fileName = `sinastria_${sanitize(birthData.name)}_${sanitize(secondBirthData.name)}.png`;
                } else if (title) {
                    // Only title
                    fileName = `${sanitize(title)}.png`;
                } else if (birthData?.name) {
                    // Only first name
                    fileName = `carta_${sanitize(birthData.name)}.png`;
                }
                link.download = fileName;
                link.href = canvas.toDataURL('image/png');
                link.click();

                URL.revokeObjectURL(svgUrl);
            };
            img.src = svgUrl;
        } catch (error) {
            console.error('Error downloading chart:', error);
        }
    }, [showBirthDataOnChart, birthData, secondBirthData, theme, title]);

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
                showBirthData: showBirthDataOnChart,
                includeAnglesInSynastry,
                aspectTypesFilter,
                theme,
                language,
            });
        }
    }, [showAspects, showDegrees, showHouses, showSecondChartHouses, showPlanetProjections, showChartInfo, showBirthDataOnChart, includeAnglesInSynastry, aspectTypesFilter, theme, language, onSettingsChange]);

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

    // Modal content - rendered via portal for isolation
    const modalContent = isModalOpen && isMounted && portalContainerRef.current ? (
        <div
            className="astromandala-modal-root"
            style={{
                backgroundColor: isDark ? '#121212' : '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                overflow: isMobile ? 'auto' : 'hidden',
            }}
            // Prevent click events from propagating to parent
            onClick={(e) => e.stopPropagation()}
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
                    overflow: isMobile ? 'auto' : 'hidden',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.25rem' : '1rem', flexShrink: 1, overflow: 'hidden' }}>
                    {/* Title */}
                    {title && (
                        <h1 style={{
                            margin: 0,
                            fontSize: isMobile ? '14px' : '18px',
                            fontWeight: 600,
                            color: isDark ? '#fff' : '#333',
                            whiteSpace: 'nowrap',
                            overflow: isMobile ? 'auto' : 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: isMobile ? '120px' : '300px',
                        }}>
                            {title}
                        </h1>
                    )}
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

                    {/* Download image button */}
                    <button
                        onClick={downloadChartAsImage}
                        style={{
                            ...buttonStyle,
                            padding: isMobile ? '0.25rem 0.4rem' : buttonStyle.padding,
                            fontSize: isMobile ? '14px' : buttonStyle.fontSize,
                            minWidth: isMobile ? 'auto' : undefined,
                            backgroundColor: isDark ? 'rgba(74, 144, 217, 0.3)' : 'rgba(74, 144, 217, 0.15)',
                        }}
                        title={t.downloadImage}
                    >
                        📥{isMobile ? '' : ` ${t.downloadImage}`}
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
                    overflow: isMobile ? 'auto' : 'hidden',
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

                            {(birthData || secondBirthData) && (
                                <label style={checkboxLabelStyle}>
                                    <input
                                        type="checkbox"
                                        checked={showBirthDataOnChart}
                                        onChange={(e) => setShowBirthDataOnChart(e.target.checked)}
                                    />
                                    {t.showBirthData}
                                </label>
                            )}

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
                        overflow: isMobile ? 'auto' : 'hidden',
                        boxSizing: 'border-box',
                        minHeight: 0,
                        gap: '0.5rem',
                        width: '100%',
                        maxWidth: '100%',
                    }}
                >
                    <div
                        ref={mandalaContainerRef}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.5rem',
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

                        {/* Birth data display */}
                        {showBirthDataOnChart && (birthData || secondBirthData) && (
                            <div style={{
                                textAlign: 'center',
                                color: isDark ? '#e0e0e0' : '#333',
                                fontSize: isMobile ? '11px' : '13px',
                                lineHeight: 1.4,
                                maxWidth: modalMandalaSize,
                                padding: '0.5rem',
                            }}>
                                {birthData && (
                                    <div style={{ marginBottom: secondBirthData ? '0.5rem' : 0, color: innerChartColor }}>
                                        {birthData.name && <div style={{ fontWeight: 600 }}>{birthData.name}</div>}
                                        {(birthData.date || birthData.time) && (
                                            <div>{birthData.date}{birthData.time ? ` - ${birthData.time}` : ''}</div>
                                        )}
                                        {birthData.location && <div>{birthData.location}</div>}
                                    </div>
                                )}
                                {secondBirthData && (
                                    <div style={{ color: outerChartColor }}>
                                        {secondBirthData.name && <div style={{ fontWeight: 600 }}>{secondBirthData.name}</div>}
                                        {(secondBirthData.date || secondBirthData.time) && (
                                            <div>{secondBirthData.date}{secondBirthData.time ? ` - ${secondBirthData.time}` : ''}</div>
                                        )}
                                        {secondBirthData.location && <div>{secondBirthData.location}</div>}
                                    </div>
                                )}
                            </div>
                        )}
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
        </div>
    ) : null;

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

            {/* Render modal via portal for isolation from parent page */}
            {modalContent && portalContainerRef.current && createPortal(modalContent, portalContainerRef.current)}
        </>
    );
}
