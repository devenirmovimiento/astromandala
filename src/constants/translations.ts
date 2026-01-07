import { MandalaLanguage } from '../types';

/**
 * Translations for UI labels
 */
export interface Translations {
    // Angle labels
    ASC: string;
    DSC: string;
    MC: string;
    IC: string;

    // UI labels for modal/settings
    settings: string;
    close: string;
    expand: string;
    showSynastry: string;
    showAspects: string;
    showDegrees: string;
    showHouses: string;
    showChart2Houses: string;
    showPlanetProjections: string;
    showChartInfo: string;
    includeAnglesInSynastry: string;
    aspectTypes: string;
    majorAspects: string;
    minorAspects: string;
    theme: string;
    language: string;
    light: string;
    dark: string;
    english: string;
    spanish: string;

    // Aspect names
    conjunction: string;
    opposition: string;
    trine: string;
    square: string;
    sextile: string;
    quincunx: string;
    semisextile: string;
    semisquare: string;
    sesquiquadrate: string;
    quintile: string;
    biquintile: string;

    // Chart labels
    chart1: string;
    chart2: string;
    innerChart: string;
    outerChart: string;

    // Size labels
    desktop: string;
    tablet: string;
    mobile: string;

    // Legend
    legend: string;
    aspectColors: string;

    // Birth data display
    showBirthData: string;
    downloadImage: string;
    birthDate: string;
    birthTime: string;
    birthLocation: string;

    // Educational mode
    infoMode: string;
    infoModeDescription: string;
    clickToLearnMore: string;
    showMore: string;
    showLess: string;
    element: string;
    sign: string;
    house: string;
    planet: string;
    aspect: string;
    retrograde: string;
    coreTheme: string;
    lightQualities: string;
    shadowQualities: string;
    questions: string;
    chartHints: string;
    relatedPositions: string;
    aspectsTable: string;
    inSign: string;
    inHouse: string;
    atDegree: string;
    isRetrograde: string;
    balance: string;
    balanced: string;
    excess: string;
    lack: string;
    microTip: string;
    keyIdeas: string;
    howItFeels: string;
    inNatalChart: string;
    inTransit: string;
    notAProblem: string;
    commonPatterns: string;
    examples: string;
    intro: string;
    learning: string;
}

export const TRANSLATIONS: Record<MandalaLanguage, Translations> = {
    en: {
        // Angle labels
        ASC: 'ASC',
        DSC: 'DSC',
        MC: 'MC',
        IC: 'IC',

        // UI labels
        settings: 'Settings',
        close: 'Close',
        expand: 'Expand',
        showSynastry: 'Show Synastry (Two Charts)',
        showAspects: 'Show Aspects',
        showDegrees: 'Show Degrees',
        showHouses: 'Show Houses',
        showChart2Houses: 'Show Chart 2 Houses',
        showPlanetProjections: 'Show Planet Projections',
        showChartInfo: 'Show Chart Info Panel',
        includeAnglesInSynastry: 'Include AC/MC in Synastry Aspects',
        aspectTypes: 'Aspect Types',
        majorAspects: 'Major Aspects',
        minorAspects: 'Minor Aspects',
        theme: 'Theme',
        language: 'Language',
        light: 'Light',
        dark: 'Dark',
        english: 'English',
        spanish: 'Español',

        // Aspect names
        conjunction: 'Conjunction',
        opposition: 'Opposition',
        trine: 'Trine',
        square: 'Square',
        sextile: 'Sextile',
        quincunx: 'Quincunx',
        semisextile: 'Semisextile',
        semisquare: 'Semisquare',
        sesquiquadrate: 'Sesquiquadrate',
        quintile: 'Quintile',
        biquintile: 'Biquintile',

        // Chart labels
        chart1: 'Chart 1',
        chart2: 'Chart 2',
        innerChart: 'Inner Chart',
        outerChart: 'Outer Chart',

        // Size labels
        desktop: 'Desktop',
        tablet: 'Tablet',
        mobile: 'Mobile',

        // Legend
        legend: 'Legend',
        aspectColors: 'Aspect colors',

        // Birth data display
        showBirthData: 'Show Birth Data on Chart',
        downloadImage: 'Download Image',
        birthDate: 'Date',
        birthTime: 'Time',
        birthLocation: 'Location',

        // Educational mode
        infoMode: 'Info Mode',
        infoModeDescription: 'Click on any element of the chart to learn more',
        clickToLearnMore: 'Click to learn more',
        showMore: 'Show more',
        showLess: 'Show less',
        element: 'Element',
        sign: 'Sign',
        house: 'House',
        planet: 'Planet',
        aspect: 'Aspect',
        retrograde: 'Retrograde',
        coreTheme: 'Core Theme',
        lightQualities: 'Light Qualities',
        shadowQualities: 'Shadow Aspects',
        questions: 'Reflective Questions',
        chartHints: 'Chart Hints',
        relatedPositions: 'Related Positions',
        aspectsTable: 'Aspects',
        inSign: 'in',
        inHouse: 'in House',
        atDegree: 'at',
        isRetrograde: 'is retrograde',
        balance: 'Balance',
        balanced: 'Balanced',
        excess: 'Excess',
        lack: 'Lack',
        microTip: 'Quick Tip',
        keyIdeas: 'Key Ideas',
        howItFeels: 'How It Feels',
        inNatalChart: 'In Natal Chart',
        inTransit: 'In Transit',
        notAProblem: 'Remember',
        commonPatterns: 'Common Patterns',
        examples: 'Examples',
        intro: 'Introduction',
        learning: 'Learning',
    },
    es: {
        // Angle labels
        ASC: 'ASC',
        DSC: 'DSC',
        MC: 'MC',
        IC: 'IC',

        // UI labels
        settings: 'Configuración',
        close: 'Cerrar',
        expand: 'Expandir',
        showSynastry: 'Mostrar Sinastría (Dos Cartas)',
        showAspects: 'Mostrar Aspectos',
        showDegrees: 'Mostrar Grados',
        showHouses: 'Mostrar Casas',
        showChart2Houses: 'Mostrar Casas de Carta 2',
        showPlanetProjections: 'Mostrar Proyecciones Planetarias',
        showChartInfo: 'Mostrar Panel de Info',
        includeAnglesInSynastry: 'Incluir AC/MC en Aspectos de Sinastría',
        aspectTypes: 'Tipos de Aspectos',
        majorAspects: 'Aspectos Mayores',
        minorAspects: 'Aspectos Menores',
        theme: 'Tema',
        language: 'Idioma',
        light: 'Claro',
        dark: 'Oscuro',
        english: 'English',
        spanish: 'Español',

        // Aspect names
        conjunction: 'Conjunción',
        opposition: 'Oposición',
        trine: 'Trígono',
        square: 'Cuadratura',
        sextile: 'Sextil',
        quincunx: 'Quincuncio',
        semisextile: 'Semisextil',
        semisquare: 'Semicuadratura',
        sesquiquadrate: 'Sesquicuadratura',
        quintile: 'Quintil',
        biquintile: 'Biquintil',

        // Chart labels
        chart1: 'Carta 1',
        chart2: 'Carta 2',
        innerChart: 'Carta Interior',
        outerChart: 'Carta Exterior',

        // Size labels
        desktop: 'Escritorio',
        tablet: 'Tableta',
        mobile: 'Móvil',

        // Legend
        legend: 'Leyenda',
        aspectColors: 'Colores de aspectos',

        // Birth data display
        showBirthData: 'Mostrar Datos de Nacimiento',
        downloadImage: 'Descargar Imagen',
        birthDate: 'Fecha',
        birthTime: 'Hora',
        birthLocation: 'Lugar',

        // Educational mode
        infoMode: 'Modo Info',
        infoModeDescription: 'Haz clic en cualquier elemento del gráfico para aprender más',
        clickToLearnMore: 'Clic para más información',
        showMore: 'Ver más',
        showLess: 'Ver menos',
        element: 'Elemento',
        sign: 'Signo',
        house: 'Casa',
        planet: 'Planeta',
        aspect: 'Aspecto',
        retrograde: 'Retrógrado',
        coreTheme: 'Tema Central',
        lightQualities: 'Cualidades Luminosas',
        shadowQualities: 'Aspectos de Sombra',
        questions: 'Preguntas Reflexivas',
        chartHints: 'Pistas en la Carta',
        relatedPositions: 'Posiciones Relacionadas',
        aspectsTable: 'Aspectos',
        inSign: 'en',
        inHouse: 'en Casa',
        atDegree: 'a',
        isRetrograde: 'está retrógrado',
        balance: 'Balance',
        balanced: 'Equilibrado',
        excess: 'Exceso',
        lack: 'Falta',
        microTip: 'Tip Rápido',
        keyIdeas: 'Ideas Clave',
        howItFeels: 'Cómo Se Vive',
        inNatalChart: 'En Carta Natal',
        inTransit: 'En Tránsito',
        notAProblem: 'Recordar',
        commonPatterns: 'Patrones Comunes',
        examples: 'Ejemplos',
        intro: 'Introducción',
        learning: 'Aprendizaje',
    },
};

/**
 * Get translations for a language
 */
export function getTranslations(language: MandalaLanguage = 'en'): Translations {
    return TRANSLATIONS[language];
}
