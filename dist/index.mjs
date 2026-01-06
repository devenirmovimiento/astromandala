import { useState, useCallback, useMemo, useRef, useEffect, createElement } from 'react';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { createPortal } from 'react-dom';

// src/components/AstroMandala/AstroMandala.tsx

// src/constants/translations.ts
var TRANSLATIONS = {
  en: {
    // Angle labels
    ASC: "ASC",
    DSC: "DSC",
    MC: "MC",
    IC: "IC",
    // UI labels
    settings: "Settings",
    close: "Close",
    expand: "Expand",
    showSynastry: "Show Synastry (Two Charts)",
    showAspects: "Show Aspects",
    showDegrees: "Show Degrees",
    showHouses: "Show Houses",
    showChart2Houses: "Show Chart 2 Houses",
    showPlanetProjections: "Show Planet Projections",
    showChartInfo: "Show Chart Info Panel",
    includeAnglesInSynastry: "Include AC/MC in Synastry Aspects",
    aspectTypes: "Aspect Types",
    majorAspects: "Major Aspects",
    minorAspects: "Minor Aspects",
    theme: "Theme",
    language: "Language",
    light: "Light",
    dark: "Dark",
    english: "English",
    spanish: "Espa\xF1ol",
    // Aspect names
    conjunction: "Conjunction",
    opposition: "Opposition",
    trine: "Trine",
    square: "Square",
    sextile: "Sextile",
    quincunx: "Quincunx",
    semisextile: "Semisextile",
    semisquare: "Semisquare",
    sesquiquadrate: "Sesquiquadrate",
    quintile: "Quintile",
    biquintile: "Biquintile",
    // Chart labels
    chart1: "Chart 1",
    chart2: "Chart 2",
    innerChart: "Inner Chart",
    outerChart: "Outer Chart",
    // Size labels
    desktop: "Desktop",
    tablet: "Tablet",
    mobile: "Mobile",
    // Legend
    legend: "Legend",
    aspectColors: "Aspect colors",
    // Birth data display
    showBirthData: "Show Birth Data on Chart",
    downloadImage: "Download Image",
    birthDate: "Date",
    birthTime: "Time",
    birthLocation: "Location"
  },
  es: {
    // Angle labels
    ASC: "ASC",
    DSC: "DSC",
    MC: "MC",
    IC: "IC",
    // UI labels
    settings: "Configuraci\xF3n",
    close: "Cerrar",
    expand: "Expandir",
    showSynastry: "Mostrar Sinastr\xEDa (Dos Cartas)",
    showAspects: "Mostrar Aspectos",
    showDegrees: "Mostrar Grados",
    showHouses: "Mostrar Casas",
    showChart2Houses: "Mostrar Casas de Carta 2",
    showPlanetProjections: "Mostrar Proyecciones Planetarias",
    showChartInfo: "Mostrar Panel de Info",
    includeAnglesInSynastry: "Incluir AC/MC en Aspectos de Sinastr\xEDa",
    aspectTypes: "Tipos de Aspectos",
    majorAspects: "Aspectos Mayores",
    minorAspects: "Aspectos Menores",
    theme: "Tema",
    language: "Idioma",
    light: "Claro",
    dark: "Oscuro",
    english: "English",
    spanish: "Espa\xF1ol",
    // Aspect names
    conjunction: "Conjunci\xF3n",
    opposition: "Oposici\xF3n",
    trine: "Tr\xEDgono",
    square: "Cuadratura",
    sextile: "Sextil",
    quincunx: "Quincuncio",
    semisextile: "Semisextil",
    semisquare: "Semicuadratura",
    sesquiquadrate: "Sesquicuadratura",
    quintile: "Quintil",
    biquintile: "Biquintil",
    // Chart labels
    chart1: "Carta 1",
    chart2: "Carta 2",
    innerChart: "Carta Interior",
    outerChart: "Carta Exterior",
    // Size labels
    desktop: "Escritorio",
    tablet: "Tableta",
    mobile: "M\xF3vil",
    // Legend
    legend: "Leyenda",
    aspectColors: "Colores de aspectos",
    // Birth data display
    showBirthData: "Mostrar Datos de Nacimiento",
    downloadImage: "Descargar Imagen",
    birthDate: "Fecha",
    birthTime: "Hora",
    birthLocation: "Lugar"
  }
};
function getTranslations(language = "en") {
  return TRANSLATIONS[language];
}

// src/constants/index.ts
var ZODIAC_SYMBOLS = {
  Aries: "\u2648",
  Taurus: "\u2649",
  Gemini: "\u264A",
  Cancer: "\u264B",
  Leo: "\u264C",
  Virgo: "\u264D",
  Libra: "\u264E",
  Scorpio: "\u264F",
  Sagittarius: "\u2650",
  Capricorn: "\u2651",
  Aquarius: "\u2652",
  Pisces: "\u2653"
};
var PLANET_SYMBOLS = {
  Sun: "\u2609",
  Moon: "\u263D",
  Mercury: "\u263F",
  Venus: "\u2640",
  Mars: "\u2642",
  Jupiter: "\u2643",
  Saturn: "\u2644",
  Uranus: "\u2645",
  Neptune: "\u2646",
  Pluto: "\u2BD3",
  NorthNode: "\u260A",
  SouthNode: "\u260B",
  Chiron: "\u26B7",
  Lilith: "\u26B8",
  Ascendant: "AC",
  Midheaven: "MC"
};
var SIGN_START_DEGREES = {
  Aries: 0,
  Taurus: 30,
  Gemini: 60,
  Cancer: 90,
  Leo: 120,
  Virgo: 150,
  Libra: 180,
  Scorpio: 210,
  Sagittarius: 240,
  Capricorn: 270,
  Aquarius: 300,
  Pisces: 330
};
var ZODIAC_ORDER = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces"
];
var ELEMENT_COLORS = {
  fire: "#e63946",
  // Aries, Leo, Sagittarius
  earth: "#588157",
  // Taurus, Virgo, Capricorn
  air: "#457b9d",
  // Gemini, Libra, Aquarius
  water: "#5a9fd4"
  // Cancer, Scorpio, Pisces - lighter blue for visibility
};
var SIGN_ELEMENTS = {
  Aries: "fire",
  Taurus: "earth",
  Gemini: "air",
  Cancer: "water",
  Leo: "fire",
  Virgo: "earth",
  Libra: "air",
  Scorpio: "water",
  Sagittarius: "fire",
  Capricorn: "earth",
  Aquarius: "air",
  Pisces: "water"
};
var DEFAULT_ASPECT_COLORS = {
  conjunction: "#ffcc00",
  opposition: "#ff0000",
  trine: "#00cc00",
  square: "#cc0000",
  sextile: "#0066cc",
  quincunx: "#9933cc",
  semisextile: "#66cc99",
  semisquare: "#cc6666",
  sesquiquadrate: "#cc9966",
  quintile: "#cc66cc",
  biquintile: "#66cccc"
};
var ASPECT_ANGLES = {
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
  biquintile: 144
};
var ASPECT_LINE_STYLES = {
  conjunction: { strokeWidth: 2 },
  opposition: { strokeWidth: 2 },
  trine: { strokeWidth: 1.5 },
  square: { strokeWidth: 1.5 },
  sextile: { strokeWidth: 1 },
  quincunx: { dashArray: "5,3", strokeWidth: 1 },
  semisextile: { dashArray: "3,3", strokeWidth: 0.75 },
  semisquare: { dashArray: "4,2", strokeWidth: 0.75 },
  sesquiquadrate: { dashArray: "4,2", strokeWidth: 0.75 },
  quintile: { dashArray: "2,2", strokeWidth: 0.75 },
  biquintile: { dashArray: "2,2", strokeWidth: 0.75 }
};

// src/utils/geometry.ts
function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}
function getAbsoluteDegree(sign, degree) {
  return SIGN_START_DEGREES[sign] + degree;
}
function normalizeAngle(angle) {
  let normalized = angle % 360;
  if (normalized < 0) {
    normalized += 360;
  }
  return normalized;
}
function getMandalaAngle(absoluteDegree, ascendantDegree) {
  const offset = ascendantDegree ?? 0;
  return normalizeAngle(absoluteDegree - offset + 180);
}
function getPointOnCircle(centerX, centerY, radius, angleDegrees) {
  const angleRadians = degreesToRadians(angleDegrees);
  return {
    x: centerX + radius * Math.cos(angleRadians),
    y: centerY - radius * Math.sin(angleRadians)
    // Negative because SVG y-axis is inverted
  };
}
function getPlanetAbsoluteDegree(planet) {
  return getAbsoluteDegree(planet.sign, planet.degree);
}
function formatDegree(degree) {
  const wholeDegrees = Math.floor(degree);
  const minutes = Math.round((degree - wholeDegrees) * 60);
  return `${wholeDegrees}\xB0${minutes.toString().padStart(2, "0")}'`;
}
var ANGLE_LABEL_ZONES = [
  { house: 1, label: "AS", relativeOffset: 0 },
  // Ascendant at 0°
  { house: 4, label: "IC", relativeOffset: 270 },
  // IC at 270° (bottom)
  { house: 7, label: "DS", relativeOffset: 180 },
  // Descendant at 180°
  { house: 10, label: "MC", relativeOffset: 90 }
  // Midheaven at 90° (top)
];
function isInAngleLabelZone(displayAngle, ascendantDegree, threshold = 10) {
  for (const zone of ANGLE_LABEL_ZONES) {
    const zoneDegree = normalizeAngle(zone.relativeOffset);
    const diff = displayAngle - zoneDegree;
    const normalizedDiff = (diff + 180) % 360 - 180;
    if (Math.abs(normalizedDiff) < threshold) {
      return {
        inZone: true,
        pushDirection: normalizedDiff > 0 ? 1 : -1,
        zoneDegree
      };
    }
  }
  return { inZone: false, pushDirection: 0, zoneDegree: 0 };
}
function adjustPlanetPositions(planets, threshold = 8, ascendantDegree = 0) {
  if (planets.length === 0) return [];
  if (planets.length === 1) {
    const p = planets[0];
    const displayAngle = getMandalaAngle(p.absoluteDegree, ascendantDegree);
    const angleCheck = isInAngleLabelZone(displayAngle, ascendantDegree, 10);
    const offset = angleCheck.inZone ? angleCheck.pushDirection * 12 : 0;
    return [{ ...p, offset }];
  }
  const result = planets.map((p) => ({
    ...p,
    offset: 0,
    displayDegree: p.absoluteDegree,
    displayAngle: getMandalaAngle(p.absoluteDegree, ascendantDegree)
  }));
  result.sort((a, b) => a.absoluteDegree - b.absoluteDegree);
  const minSpacing = threshold;
  const maxIterations = 80;
  const angleLabelThreshold = 10;
  for (let iteration = 0; iteration < maxIterations; iteration++) {
    let hasCollision = false;
    result.forEach((p) => {
      p.displayDegree = normalizeAngle(p.absoluteDegree + p.offset);
      p.displayAngle = getMandalaAngle(p.displayDegree, ascendantDegree);
    });
    for (const planet of result) {
      const angleCheck = isInAngleLabelZone(planet.displayAngle, ascendantDegree, angleLabelThreshold);
      if (angleCheck.inZone) {
        hasCollision = true;
        planet.offset += angleCheck.pushDirection * 2;
      }
    }
    const sortedByDisplay = [...result].sort((a, b) => a.displayDegree - b.displayDegree);
    for (let i = 0; i < sortedByDisplay.length; i++) {
      const current = sortedByDisplay[i];
      const next = sortedByDisplay[(i + 1) % sortedByDisplay.length];
      let distance = next.displayDegree - current.displayDegree;
      if (distance < 0) distance += 360;
      if (distance < minSpacing && distance > 0) {
        hasCollision = true;
        const overlap = minSpacing - distance;
        const pushAmount = overlap / 2 + 0.5;
        current.offset -= pushAmount;
        next.offset += pushAmount;
      }
    }
    if (!hasCollision) break;
    result.forEach((p) => {
      p.offset *= 0.92;
    });
  }
  const maxOffset = 30;
  result.forEach((p) => {
    p.offset = Math.max(-maxOffset, Math.min(maxOffset, p.offset));
  });
  return result;
}

// src/types/index.ts
var DEFAULT_ORBS = {
  luminaries: 10,
  personal: 8,
  social: 6,
  transpersonal: 5,
  points: 5,
  angles: 5
};
var PLANET_CATEGORIES = {
  Sun: "luminaries",
  Moon: "luminaries",
  Mercury: "personal",
  Venus: "personal",
  Mars: "personal",
  Jupiter: "social",
  Saturn: "social",
  Uranus: "transpersonal",
  Neptune: "transpersonal",
  Pluto: "transpersonal",
  NorthNode: "points",
  SouthNode: "points",
  Chiron: "points",
  Lilith: "points",
  Ascendant: "angles",
  Midheaven: "angles"
};

// src/utils/horoscopeConverter.ts
var SIGN_KEY_MAP = {
  aries: "Aries",
  taurus: "Taurus",
  gemini: "Gemini",
  cancer: "Cancer",
  leo: "Leo",
  virgo: "Virgo",
  libra: "Libra",
  scorpio: "Scorpio",
  sagittarius: "Sagittarius",
  capricorn: "Capricorn",
  aquarius: "Aquarius",
  pisces: "Pisces"
};
var PLANET_KEY_MAP = {
  sun: "Sun",
  moon: "Moon",
  mercury: "Mercury",
  venus: "Venus",
  mars: "Mars",
  jupiter: "Jupiter",
  saturn: "Saturn",
  uranus: "Uranus",
  neptune: "Neptune",
  pluto: "Pluto",
  northnode: "NorthNode",
  southnode: "SouthNode",
  chiron: "Chiron",
  lilith: "Lilith",
  ascendant: "Ascendant",
  midheaven: "Midheaven"
};
var ASPECT_KEY_MAP = {
  conjunction: "conjunction",
  opposition: "opposition",
  trine: "trine",
  square: "square",
  sextile: "sextile",
  quincunx: "quincunx",
  quintile: "quintile",
  septile: "semisextile",
  // septile not supported, map to semisextile
  "semi-square": "semisquare",
  "semi-sextile": "semisextile"
};
function convertSignKey(key) {
  const normalizedKey = key.toLowerCase();
  return SIGN_KEY_MAP[normalizedKey] || "Aries";
}
function convertPlanetKey(key) {
  const normalizedKey = key.toLowerCase();
  return PLANET_KEY_MAP[normalizedKey] || null;
}
function convertAspectKey(key) {
  const normalizedKey = key.toLowerCase();
  return ASPECT_KEY_MAP[normalizedKey] || null;
}
function getDegreeInSign(eclipticDegrees) {
  return eclipticDegrees % 30;
}
function getSignFromDegrees(eclipticDegrees) {
  const signs = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces"
  ];
  const signIndex = Math.floor(eclipticDegrees / 30) % 12;
  return signs[signIndex];
}
function convertCelestialBody(body) {
  const planetName = convertPlanetKey(body.key);
  if (!planetName) return null;
  const eclipticDegrees = body.ChartPosition.Ecliptic.DecimalDegrees;
  return {
    planet: planetName,
    sign: body.Sign?.key ? convertSignKey(body.Sign.key) : getSignFromDegrees(eclipticDegrees),
    degree: getDegreeInSign(eclipticDegrees),
    retrograde: body.isRetrograde || false
  };
}
function convertCelestialPoint(point) {
  const planetName = convertPlanetKey(point.key);
  if (!planetName) return null;
  const eclipticDegrees = point.ChartPosition.Ecliptic.DecimalDegrees;
  return {
    planet: planetName,
    sign: point.Sign?.key ? convertSignKey(point.Sign.key) : getSignFromDegrees(eclipticDegrees),
    degree: getDegreeInSign(eclipticDegrees)
  };
}
function convertAngle(angle) {
  const planetName = convertPlanetKey(angle.key);
  if (!planetName) return null;
  const eclipticDegrees = angle.ChartPosition.Ecliptic.DecimalDegrees;
  return {
    planet: planetName,
    sign: angle.Sign?.key ? convertSignKey(angle.Sign.key) : getSignFromDegrees(eclipticDegrees),
    degree: getDegreeInSign(eclipticDegrees)
  };
}
function convertHouse(house) {
  const eclipticDegrees = house.ChartPosition.StartPosition.Ecliptic.DecimalDegrees;
  return {
    house: house.id,
    sign: house.Sign?.key ? convertSignKey(house.Sign.key) : getSignFromDegrees(eclipticDegrees),
    degree: getDegreeInSign(eclipticDegrees)
  };
}
function convertAspect(aspect) {
  const planet1 = convertPlanetKey(aspect.point1Key);
  const planet2 = convertPlanetKey(aspect.point2Key);
  const aspectType = convertAspectKey(aspect.aspectKey);
  if (!planet1 || !planet2 || !aspectType) return null;
  return {
    planet1,
    planet2,
    aspect: aspectType,
    orb: aspect.orb
  };
}
function convertHoroscopeToChart(horoscope, label) {
  const planets = [];
  const houses = [];
  const aspects = [];
  if (horoscope.CelestialBodies?.all) {
    for (const body of horoscope.CelestialBodies.all) {
      const converted = convertCelestialBody(body);
      if (converted) planets.push(converted);
    }
  }
  if (horoscope.CelestialPoints?.all) {
    for (const point of horoscope.CelestialPoints.all) {
      const converted = convertCelestialPoint(point);
      if (converted) planets.push(converted);
    }
  }
  if (horoscope.Ascendant) {
    const ascendant = convertAngle(horoscope.Ascendant);
    if (ascendant) planets.push(ascendant);
  }
  if (horoscope.Midheaven) {
    const midheaven = convertAngle(horoscope.Midheaven);
    if (midheaven) planets.push(midheaven);
  }
  if (horoscope.Houses) {
    for (const house of horoscope.Houses) {
      houses.push(convertHouse(house));
    }
  }
  if (horoscope.Aspects?.all) {
    for (const aspect of horoscope.Aspects.all) {
      const converted = convertAspect(aspect);
      if (converted) aspects.push(converted);
    }
  }
  return {
    label,
    planets,
    houses,
    aspects
  };
}
var ASPECT_ANGLES2 = {
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
  biquintile: 144
};
function shouldSkipAspect(planet1, planet2, aspectType) {
  if (aspectType === "opposition") {
    const isNodePair = planet1 === "NorthNode" && planet2 === "SouthNode" || planet1 === "SouthNode" && planet2 === "NorthNode";
    if (isNodePair) return true;
  }
  return false;
}
function getOrbForPlanets(planet1, planet2, orbConfig = {}) {
  const config = { ...DEFAULT_ORBS, ...orbConfig };
  const cat1 = PLANET_CATEGORIES[planet1];
  const cat2 = PLANET_CATEGORIES[planet2];
  const orb1 = config[cat1];
  const orb2 = config[cat2];
  return (orb1 + orb2) / 2;
}
function getPlanetsWithDegrees(horoscope) {
  const result = [];
  if (horoscope.CelestialBodies?.all) {
    for (const body of horoscope.CelestialBodies.all) {
      result.push({ key: body.key, degrees: body.ChartPosition.Ecliptic.DecimalDegrees });
    }
  }
  if (horoscope.CelestialPoints?.all) {
    for (const point of horoscope.CelestialPoints.all) {
      result.push({ key: point.key, degrees: point.ChartPosition.Ecliptic.DecimalDegrees });
    }
  }
  if (horoscope.Ascendant) {
    result.push({ key: "ascendant", degrees: horoscope.Ascendant.ChartPosition.Ecliptic.DecimalDegrees });
  }
  if (horoscope.Midheaven) {
    result.push({ key: "midheaven", degrees: horoscope.Midheaven.ChartPosition.Ecliptic.DecimalDegrees });
  }
  return result;
}
function calculateSynastryAspects(horoscope1, horoscope2, orbConfig = {}) {
  const synastryAspects = [];
  const planets1 = getPlanetsWithDegrees(horoscope1);
  const planets2 = getPlanetsWithDegrees(horoscope2);
  for (const p1 of planets1) {
    for (const p2 of planets2) {
      const planet1 = convertPlanetKey(p1.key);
      const planet2 = convertPlanetKey(p2.key);
      if (!planet1 || !planet2) continue;
      const diff = Math.abs(p1.degrees - p2.degrees);
      const normalizedDiff = diff > 180 ? 360 - diff : diff;
      const maxOrb = getOrbForPlanets(planet1, planet2, orbConfig);
      for (const [aspectType, angle] of Object.entries(ASPECT_ANGLES2)) {
        const aspectDiff = Math.abs(normalizedDiff - angle);
        if (aspectDiff <= maxOrb) {
          if (shouldSkipAspect(planet1, planet2, aspectType)) {
            break;
          }
          synastryAspects.push({
            planet1,
            chart1Owner: "chart1",
            planet2,
            chart2Owner: "chart2",
            aspect: aspectType,
            orb: aspectDiff
          });
          break;
        }
      }
    }
  }
  return synastryAspects;
}
function calculateNatalAspects(horoscope, orbConfig = {}, aspectTypes) {
  const aspects = [];
  const planets = getPlanetsWithDegrees(horoscope);
  const typesToCheck = aspectTypes || Object.keys(ASPECT_ANGLES2);
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const p1 = planets[i];
      const p2 = planets[j];
      const planet1 = convertPlanetKey(p1.key);
      const planet2 = convertPlanetKey(p2.key);
      if (!planet1 || !planet2) continue;
      const diff = Math.abs(p1.degrees - p2.degrees);
      const normalizedDiff = diff > 180 ? 360 - diff : diff;
      const maxOrb = getOrbForPlanets(planet1, planet2, orbConfig);
      for (const aspectType of typesToCheck) {
        const angle = ASPECT_ANGLES2[aspectType];
        const aspectDiff = Math.abs(normalizedDiff - angle);
        if (aspectDiff <= maxOrb) {
          if (shouldSkipAspect(planet1, planet2, aspectType)) {
            break;
          }
          aspects.push({
            planet1,
            planet2,
            aspect: aspectType,
            orb: aspectDiff
          });
          break;
        }
      }
    }
  }
  return aspects;
}
function ZodiacWheel({
  centerX,
  centerY,
  outerRadius,
  innerRadius,
  ascendantDegree = 0,
  theme = "light",
  onSignHover,
  hoveredSign
}) {
  const signArcAngle = 30;
  const middleRadius = (outerRadius + innerRadius) / 2;
  const isDark = theme === "dark";
  const strokeColor = isDark ? "#555" : "#333";
  const segmentStroke = isDark ? "#777" : "#666";
  const markerColor = isDark ? "#666" : "#999";
  return /* @__PURE__ */ jsxs("g", { className: "zodiac-wheel", children: [
    /* @__PURE__ */ jsx(
      "circle",
      {
        cx: centerX,
        cy: centerY,
        r: outerRadius,
        fill: "none",
        stroke: strokeColor,
        strokeWidth: 1
      }
    ),
    /* @__PURE__ */ jsx(
      "circle",
      {
        cx: centerX,
        cy: centerY,
        r: innerRadius,
        fill: "none",
        stroke: strokeColor,
        strokeWidth: 1
      }
    ),
    ZODIAC_ORDER.map((sign, index) => {
      const startDegree = index * signArcAngle;
      const startAngle = getMandalaAngle(startDegree, ascendantDegree);
      const endAngle = getMandalaAngle(startDegree + signArcAngle, ascendantDegree);
      const outerStart = getPointOnCircle(centerX, centerY, outerRadius, startAngle);
      const outerEnd = getPointOnCircle(centerX, centerY, outerRadius, endAngle);
      const innerStart = getPointOnCircle(centerX, centerY, innerRadius, startAngle);
      const innerEnd = getPointOnCircle(centerX, centerY, innerRadius, endAngle);
      const symbolAngle = getMandalaAngle(startDegree + signArcAngle / 2, ascendantDegree);
      const symbolPos = getPointOnCircle(centerX, centerY, middleRadius, symbolAngle);
      const element = SIGN_ELEMENTS[sign];
      const baseColor = ELEMENT_COLORS[element];
      const isHovered = hoveredSign === sign;
      const fillOpacity = isHovered ? isDark ? "70" : "55" : isDark ? "40" : "30";
      const fillColor = baseColor + fillOpacity;
      const pathD = `
          M ${outerStart.x} ${outerStart.y}
          A ${outerRadius} ${outerRadius} 0 0 0 ${outerEnd.x} ${outerEnd.y}
          L ${innerEnd.x} ${innerEnd.y}
          A ${innerRadius} ${innerRadius} 0 0 1 ${innerStart.x} ${innerStart.y}
          Z
        `;
      return /* @__PURE__ */ jsxs(
        "g",
        {
          className: `sign-segment sign-${sign.toLowerCase()}${isHovered ? " hovered" : ""}`,
          style: { cursor: "pointer" },
          onMouseEnter: () => onSignHover?.(sign),
          onMouseLeave: () => onSignHover?.(null),
          children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                d: pathD,
                fill: fillColor,
                stroke: isHovered ? baseColor : segmentStroke,
                strokeWidth: isHovered ? 1.5 : 0.5,
                style: { transition: "fill 0.15s ease-out, stroke 0.15s ease-out" }
              }
            ),
            /* @__PURE__ */ jsxs(
              "text",
              {
                x: symbolPos.x,
                y: symbolPos.y,
                textAnchor: "middle",
                dominantBaseline: "central",
                fontSize: isHovered ? outerRadius * 0.095 : outerRadius * 0.08,
                fill: ELEMENT_COLORS[element],
                fontWeight: "bold",
                style: {
                  fontFamily: "Segoe UI Symbol, Symbola, sans-serif",
                  transition: "font-size 0.15s ease-out"
                },
                children: [
                  ZODIAC_SYMBOLS[sign],
                  "\uFE0E"
                ]
              }
            )
          ]
        },
        sign
      );
    }),
    Array.from({ length: 72 }, (_, i) => {
      const degree = i * 5;
      const angle = getMandalaAngle(degree, ascendantDegree);
      const isMainDivision = degree % 30 === 0;
      const markerLength = isMainDivision ? (outerRadius - innerRadius) * 0.5 : (outerRadius - innerRadius) * 0.2;
      const outer = getPointOnCircle(centerX, centerY, innerRadius, angle);
      const inner = getPointOnCircle(centerX, centerY, innerRadius - markerLength, angle);
      return /* @__PURE__ */ jsx(
        "line",
        {
          x1: outer.x,
          y1: outer.y,
          x2: inner.x,
          y2: inner.y,
          stroke: markerColor,
          strokeWidth: isMainDivision ? 1 : 0.5
        },
        `marker-${degree}`
      );
    })
  ] });
}
var ANGLE_LABELS = {
  1: "AS",
  4: "IC",
  7: "DS",
  10: "MC"
};
function HouseWheel({
  centerX,
  centerY,
  outerRadius,
  innerRadius,
  houses,
  ascendantDegree = 0,
  isSecondChart = false,
  color,
  theme = "light"
}) {
  const sortedHouses = [...houses].sort((a, b) => a.house - b.house);
  const isDark = theme === "dark";
  const lineColor = isSecondChart ? color || "#d94a4a" : isDark ? "#ddd" : "#000";
  const textColor = isSecondChart ? color || "#d94a4a" : isDark ? "#bbb" : "#555";
  const angleLabelColor = isDark ? "#fff" : "#000";
  const nonAngularLineColor = isDark ? "#666" : "#999";
  return /* @__PURE__ */ jsx("g", { className: `house-wheel ${isSecondChart ? "house-wheel-second" : ""}`, children: sortedHouses.map((house, index) => {
    const houseDegree = getAbsoluteDegree(house.sign, house.degree);
    const angle = getMandalaAngle(houseDegree, ascendantDegree);
    const outer = getPointOnCircle(centerX, centerY, outerRadius, angle);
    const inner = getPointOnCircle(centerX, centerY, innerRadius, angle);
    const nextHouse = sortedHouses[(index + 1) % 12];
    const nextHouseDegree = getAbsoluteDegree(nextHouse.sign, nextHouse.degree);
    let midDegree = (houseDegree + nextHouseDegree) / 2;
    if (nextHouseDegree < houseDegree) {
      midDegree = (houseDegree + nextHouseDegree + 360) / 2 % 360;
    }
    const numberAngle = getMandalaAngle(midDegree, ascendantDegree);
    const numberRadius = innerRadius * 0.7;
    const numberPos = getPointOnCircle(centerX, centerY, numberRadius, numberAngle);
    const isAngularHouse = [1, 4, 7, 10].includes(house.house);
    const angleLabel = ANGLE_LABELS[house.house];
    const labelRadius = isSecondChart ? innerRadius * 0.92 : outerRadius * 1.02;
    const labelPos = getPointOnCircle(centerX, centerY, labelRadius, angle);
    return /* @__PURE__ */ jsxs("g", { className: `house-division house-${house.house}`, children: [
      /* @__PURE__ */ jsx(
        "line",
        {
          x1: outer.x,
          y1: outer.y,
          x2: inner.x,
          y2: inner.y,
          stroke: isSecondChart ? lineColor : isAngularHouse ? lineColor : nonAngularLineColor,
          strokeWidth: isAngularHouse ? isSecondChart ? 1.5 : 2 : 0.5,
          strokeDasharray: isSecondChart ? "4,2" : isAngularHouse ? void 0 : "2,2",
          opacity: isSecondChart ? 0.7 : 1
        }
      ),
      /* @__PURE__ */ jsx(
        "text",
        {
          x: numberPos.x,
          y: numberPos.y,
          textAnchor: "middle",
          dominantBaseline: "central",
          fontSize: outerRadius * 0.055,
          fill: textColor,
          fontWeight: isAngularHouse ? "bold" : "normal",
          children: house.house
        }
      ),
      angleLabel && /* @__PURE__ */ jsx(
        "text",
        {
          x: labelPos.x,
          y: labelPos.y,
          textAnchor: "middle",
          dominantBaseline: "central",
          fontSize: outerRadius * (isSecondChart ? 0.05 : 0.06),
          fill: angleLabelColor,
          fontWeight: "bold",
          opacity: isSecondChart ? 0.85 : 1,
          children: angleLabel
        }
      ),
      isSecondChart && index === 0 && /* @__PURE__ */ jsx(
        "circle",
        {
          cx: centerX,
          cy: centerY,
          r: innerRadius,
          fill: "none",
          stroke: lineColor,
          strokeWidth: 0.5,
          opacity: 0.5
        }
      )
    ] }, `house-${house.house}${isSecondChart ? "-second" : ""}`);
  }) });
}
function PlanetDisplay({
  centerX,
  centerY,
  radius,
  planets,
  ascendantDegree = 0,
  color = "#4a90d9",
  showDegrees = false,
  isOuter = false,
  theme = "light",
  onPlanetHover,
  hoveredPlanet,
  highlightedSign
}) {
  const filteredPlanets = planets.filter(
    (planet) => planet.planet !== "Ascendant" && planet.planet !== "Midheaven"
  );
  const planetsWithDegrees = filteredPlanets.map((planet) => ({
    planet,
    absoluteDegree: getPlanetAbsoluteDegree(planet)
  }));
  const adjustedPlanets = adjustPlanetPositions(planetsWithDegrees, 8, ascendantDegree);
  const planetRadius = isOuter ? radius * 1.08 : radius * 0.88;
  const lineRadius = isOuter ? radius * 1 : radius * 0.95;
  const degreeRadius = isOuter ? radius * 1.18 : radius * 0.78;
  return /* @__PURE__ */ jsx("g", { className: `planets ${isOuter ? "outer-planets" : "inner-planets"}`, children: adjustedPlanets.map(({ planet, absoluteDegree, offset }) => {
    const actualAngle = getMandalaAngle(absoluteDegree, ascendantDegree);
    const actualPos = getPointOnCircle(centerX, centerY, lineRadius, actualAngle);
    const displayAngle = getMandalaAngle(absoluteDegree + offset, ascendantDegree);
    const symbolPos = getPointOnCircle(centerX, centerY, planetRadius, displayAngle);
    const degreePos = getPointOnCircle(centerX, centerY, degreeRadius, displayAngle);
    const symbol = PLANET_SYMBOLS[planet.planet];
    const isAngle = planet.planet === "Ascendant" || planet.planet === "Midheaven";
    const fontSize = isAngle ? radius * 0.09 : radius * 0.14;
    const isHighlighted = highlightedSign && planet.sign === highlightedSign;
    const isHovered = hoveredPlanet === planet.planet;
    const baseOpacity = 1;
    const highlightOpacity = isHighlighted ? 1 : highlightedSign ? 0.4 : baseOpacity;
    return /* @__PURE__ */ jsxs(
      "g",
      {
        className: `planet planet-${planet.planet.toLowerCase()}${isHighlighted ? " highlighted" : ""}${isHovered ? " hovered" : ""}`,
        "data-degree": absoluteDegree,
        "data-actual-x": actualPos.x,
        "data-actual-y": actualPos.y,
        style: { cursor: "pointer" },
        onMouseEnter: () => onPlanetHover?.(planet.planet),
        onMouseLeave: () => onPlanetHover?.(null),
        opacity: highlightOpacity,
        children: [
          isHighlighted && /* @__PURE__ */ jsx(
            "circle",
            {
              cx: symbolPos.x,
              cy: symbolPos.y,
              r: fontSize * 0.8,
              fill: color,
              opacity: 0.25,
              style: { filter: "blur(4px)" }
            }
          ),
          Math.abs(offset) > 2 && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "circle",
              {
                cx: actualPos.x,
                cy: actualPos.y,
                r: 2,
                fill: color,
                opacity: 0.6 * highlightOpacity
              }
            ),
            /* @__PURE__ */ jsx(
              "line",
              {
                x1: actualPos.x,
                y1: actualPos.y,
                x2: symbolPos.x,
                y2: symbolPos.y,
                stroke: color,
                strokeWidth: 0.75,
                strokeDasharray: "3,2",
                opacity: 0.5 * highlightOpacity
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            "text",
            {
              x: symbolPos.x,
              y: symbolPos.y,
              textAnchor: "middle",
              dominantBaseline: "central",
              fontSize: isHighlighted ? fontSize * 1.15 : fontSize,
              fill: color,
              fontWeight: isAngle || isHighlighted ? "bold" : "normal",
              style: {
                fontFamily: "Segoe UI Symbol, Symbola, sans-serif",
                transition: "font-size 0.15s ease-out"
              },
              children: [
                symbol,
                "\uFE0E"
              ]
            }
          ),
          planet.retrograde && /* @__PURE__ */ jsx(
            "text",
            {
              x: symbolPos.x + fontSize * 0.45,
              y: symbolPos.y - fontSize * 0.35,
              textAnchor: "start",
              dominantBaseline: "central",
              fontSize: fontSize * 0.32,
              fill: color,
              opacity: 0.9,
              style: {
                fontFamily: "Segoe UI Symbol, Symbola, sans-serif"
              },
              children: "R"
            }
          ),
          showDegrees && /* @__PURE__ */ jsx(
            "text",
            {
              x: degreePos.x,
              y: degreePos.y,
              textAnchor: "middle",
              dominantBaseline: "central",
              fontSize: fontSize * 0.35,
              fill: color,
              opacity: 0.8,
              children: formatDegree(planet.degree)
            }
          )
        ]
      },
      planet.planet
    );
  }) });
}
var ANGLE_POINTS = ["Ascendant", "Midheaven"];
function shouldSkipAspect2(planet1, planet2, aspectType) {
  if (aspectType === "opposition") {
    const isNodePair = planet1 === "NorthNode" && planet2 === "SouthNode" || planet1 === "SouthNode" && planet2 === "NorthNode";
    if (isNodePair) return true;
  }
  return false;
}
function findPlanet(planets, name) {
  return planets.find((p) => p.planet === name);
}
function AspectLines({
  centerX,
  centerY,
  radius,
  aspects = [],
  synastryAspects = [],
  planets,
  secondChartPlanets = [],
  ascendantDegree = 0,
  aspectColors = {},
  includeAnglesInSynastry = false,
  hoveredPlanet = null
}) {
  const colors = { ...DEFAULT_ASPECT_COLORS, ...aspectColors };
  const aspectRadius = radius * 0.7;
  let filteredNatalAspects = aspects.filter((a) => !shouldSkipAspect2(a.planet1, a.planet2, a.aspect)).filter((a) => includeAnglesInSynastry || !ANGLE_POINTS.includes(a.planet1) && !ANGLE_POINTS.includes(a.planet2));
  let filteredSynastryAspects = synastryAspects.filter((a) => !shouldSkipAspect2(a.planet1, a.planet2, a.aspect)).filter((a) => includeAnglesInSynastry || !ANGLE_POINTS.includes(a.planet1) && !ANGLE_POINTS.includes(a.planet2));
  if (hoveredPlanet) {
    filteredNatalAspects = filteredNatalAspects.filter(
      (a) => a.planet1 === hoveredPlanet || a.planet2 === hoveredPlanet
    );
    filteredSynastryAspects = filteredSynastryAspects.filter(
      (a) => a.planet1 === hoveredPlanet || a.planet2 === hoveredPlanet
    );
  }
  const getPlanetCoords = (planetName, isSecondChart = false) => {
    const planetList = isSecondChart ? secondChartPlanets : planets;
    const planet = findPlanet(planetList, planetName);
    if (!planet) return null;
    const absoluteDegree = getPlanetAbsoluteDegree(planet);
    const angle = getMandalaAngle(absoluteDegree, ascendantDegree);
    return getPointOnCircle(centerX, centerY, aspectRadius, angle);
  };
  return /* @__PURE__ */ jsxs("g", { className: "aspect-lines", children: [
    filteredNatalAspects.map((aspect, index) => {
      const pos1 = getPlanetCoords(aspect.planet1);
      const pos2 = getPlanetCoords(aspect.planet2);
      if (!pos1 || !pos2) return null;
      const color = colors[aspect.aspect];
      const style = ASPECT_LINE_STYLES[aspect.aspect];
      const maxOrb = 10;
      const opacity = Math.max(0.3, 1 - aspect.orb / maxOrb);
      return /* @__PURE__ */ jsx(
        "line",
        {
          x1: pos1.x,
          y1: pos1.y,
          x2: pos2.x,
          y2: pos2.y,
          stroke: color,
          strokeWidth: style.strokeWidth,
          strokeDasharray: style.dashArray,
          opacity,
          className: `aspect-line aspect-${aspect.aspect}`
        },
        `natal-${index}-${aspect.planet1}-${aspect.planet2}`
      );
    }),
    filteredSynastryAspects.map((aspect, index) => {
      const isP1SecondChart = aspect.chart1Owner === "chart2";
      const isP2SecondChart = aspect.chart2Owner === "chart2";
      const pos1 = getPlanetCoords(aspect.planet1, isP1SecondChart);
      const pos2 = getPlanetCoords(aspect.planet2, isP2SecondChart);
      if (!pos1 || !pos2) return null;
      const color = colors[aspect.aspect];
      const style = ASPECT_LINE_STYLES[aspect.aspect];
      const maxOrb = 10;
      const opacity = Math.max(0.3, 1 - aspect.orb / maxOrb);
      return /* @__PURE__ */ jsx(
        "line",
        {
          x1: pos1.x,
          y1: pos1.y,
          x2: pos2.x,
          y2: pos2.y,
          stroke: color,
          strokeWidth: style.strokeWidth * 1.2,
          strokeDasharray: style.dashArray,
          opacity,
          className: `aspect-line synastry-aspect aspect-${aspect.aspect}`
        },
        `synastry-${index}-${aspect.planet1}-${aspect.planet2}`
      );
    })
  ] });
}
function PlanetProjections({
  centerX,
  centerY,
  outerRadius,
  innerRadius,
  planets,
  secondChartPlanets,
  ascendantDegree = 0,
  innerChartColor = "#4a90d9",
  outerChartColor = "#d94a4a"
}) {
  const tickLength = (outerRadius - innerRadius) * 0.3;
  const filteredPlanets = planets.filter(
    (p) => p.planet !== "Ascendant" && p.planet !== "Midheaven"
  );
  const filteredSecondPlanets = secondChartPlanets?.filter(
    (p) => p.planet !== "Ascendant" && p.planet !== "Midheaven"
  );
  const renderProjection = (planet, color, isOuter, key) => {
    const absoluteDegree = getAbsoluteDegree(planet.sign, planet.degree);
    const angle = getMandalaAngle(absoluteDegree, ascendantDegree);
    const startRadius = innerRadius;
    const endRadius = innerRadius + tickLength;
    const start = getPointOnCircle(centerX, centerY, startRadius, angle);
    const end = getPointOnCircle(centerX, centerY, endRadius, angle);
    return /* @__PURE__ */ jsx(
      "line",
      {
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y,
        stroke: color,
        strokeWidth: 2,
        opacity: 0.8
      },
      key
    );
  };
  return /* @__PURE__ */ jsxs("g", { className: "planet-projections", children: [
    filteredPlanets.map(
      (planet, index) => renderProjection(planet, innerChartColor, false, `proj-1-${index}`)
    ),
    filteredSecondPlanets?.map(
      (planet, index) => renderProjection(planet, outerChartColor, true, `proj-2-${index}`)
    )
  ] });
}
function AstroMandala({
  chart,
  secondChart,
  synastryAspects,
  size = 500,
  showAspects = true,
  showDegrees = false,
  showHouses = true,
  showSecondChartHouses = false,
  showPlanetProjections = true,
  aspectTypesFilter,
  includeAnglesInSynastry = false,
  innerChartColor = "#4a90d9",
  outerChartColor = "#d94a4a",
  aspectColors,
  theme = "light",
  className
}) {
  const centerX = size / 2;
  const centerY = size / 2;
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [hoveredSign, setHoveredSign] = useState(null);
  const handlePlanetHover = useCallback((planet) => {
    setHoveredPlanet(planet);
  }, []);
  const handleSignHover = useCallback((sign) => {
    setHoveredSign(sign);
  }, []);
  const isDark = theme === "dark";
  const colors = {
    background: isDark ? "#1a1a2e" : "#fafafa",
    backgroundStroke: isDark ? "#333" : "#ddd",
    centerFill: isDark ? "#16162a" : "#fff",
    centerStroke: isDark ? "#444" : "#ccc"};
  const isSynastry = Boolean(secondChart);
  const showBothHouses = showSecondChartHouses && isSynastry && secondChart;
  const outerRadius = size * 0.45;
  const zodiacInnerRadius = size * 0.38;
  const outerHouseRingOuter = zodiacInnerRadius;
  const outerHouseRingInner = showBothHouses ? size * 0.3 : size * 0.15;
  const innerHouseRingOuter = showBothHouses ? size * 0.3 : size * 0.15;
  const innerHouseRingInner = showBothHouses ? size * 0.22 : size * 0.15;
  const planetRadius = showBothHouses ? size * 0.26 : size * 0.32;
  const centerCircleRadius = showBothHouses ? size * 0.12 : size * 0.15;
  const ascendantDegree = useMemo(() => {
    const ascendant = chart.planets.find((p) => p.planet === "Ascendant");
    if (ascendant) {
      return getAbsoluteDegree(ascendant.sign, ascendant.degree);
    }
    const firstHouse = chart.houses.find((h) => h.house === 1);
    if (firstHouse) {
      return getAbsoluteDegree(firstHouse.sign, firstHouse.degree);
    }
    return 0;
  }, [chart.planets, chart.houses]);
  const filteredChartAspects = useMemo(() => {
    if (!aspectTypesFilter || aspectTypesFilter.length === 0) {
      return chart.aspects;
    }
    return chart.aspects.filter((a) => aspectTypesFilter.includes(a.aspect));
  }, [chart.aspects, aspectTypesFilter]);
  const filteredSynastryAspects = useMemo(() => {
    if (!synastryAspects) return void 0;
    if (!aspectTypesFilter || aspectTypesFilter.length === 0) {
      return synastryAspects;
    }
    return synastryAspects.filter((a) => aspectTypesFilter.includes(a.aspect));
  }, [synastryAspects, aspectTypesFilter]);
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: `0 0 ${size} ${size}`,
      className,
      style: {
        fontFamily: "Arial, sans-serif",
        maxWidth: "100%",
        height: "auto",
        display: "block",
        overflow: "visible",
        // Prevent external CSS from affecting the SVG
        contain: "layout style"
      },
      preserveAspectRatio: "xMidYMid meet",
      children: [
        /* @__PURE__ */ jsx(
          "circle",
          {
            cx: centerX,
            cy: centerY,
            r: outerRadius + 5,
            fill: colors.background,
            stroke: colors.backgroundStroke,
            strokeWidth: 1
          }
        ),
        /* @__PURE__ */ jsx(
          "circle",
          {
            cx: centerX,
            cy: centerY,
            r: centerCircleRadius,
            fill: colors.centerFill,
            stroke: colors.centerStroke,
            strokeWidth: 0.5
          }
        ),
        /* @__PURE__ */ jsx(
          ZodiacWheel,
          {
            centerX,
            centerY,
            outerRadius,
            innerRadius: zodiacInnerRadius,
            ascendantDegree,
            theme,
            onSignHover: handleSignHover,
            hoveredSign
          }
        ),
        showPlanetProjections && /* @__PURE__ */ jsx(
          PlanetProjections,
          {
            centerX,
            centerY,
            outerRadius,
            innerRadius: zodiacInnerRadius,
            planets: chart.planets,
            secondChartPlanets: secondChart?.planets,
            ascendantDegree,
            innerChartColor,
            outerChartColor
          }
        ),
        showHouses && chart.houses.length > 0 && /* @__PURE__ */ jsx(
          HouseWheel,
          {
            centerX,
            centerY,
            outerRadius: outerHouseRingOuter,
            innerRadius: outerHouseRingInner,
            houses: chart.houses,
            ascendantDegree,
            theme
          }
        ),
        showSecondChartHouses && showBothHouses && secondChart.houses.length > 0 && /* @__PURE__ */ jsx(
          HouseWheel,
          {
            centerX,
            centerY,
            outerRadius: innerHouseRingOuter,
            innerRadius: innerHouseRingInner,
            houses: secondChart.houses,
            ascendantDegree,
            isSecondChart: true,
            color: outerChartColor,
            theme
          }
        ),
        showAspects && /* @__PURE__ */ jsx(
          AspectLines,
          {
            centerX,
            centerY,
            radius: planetRadius,
            aspects: filteredChartAspects,
            synastryAspects: filteredSynastryAspects,
            planets: chart.planets,
            secondChartPlanets: secondChart?.planets,
            ascendantDegree,
            aspectColors,
            includeAnglesInSynastry,
            hoveredPlanet
          }
        ),
        /* @__PURE__ */ jsx(
          PlanetDisplay,
          {
            centerX,
            centerY,
            radius: planetRadius,
            planets: chart.planets,
            ascendantDegree,
            color: innerChartColor,
            showDegrees,
            isOuter: false,
            theme,
            onPlanetHover: handlePlanetHover,
            hoveredPlanet,
            highlightedSign: hoveredSign
          }
        ),
        isSynastry && secondChart && /* @__PURE__ */ jsx(
          PlanetDisplay,
          {
            centerX,
            centerY,
            radius: planetRadius,
            planets: secondChart.planets,
            ascendantDegree,
            color: outerChartColor,
            showDegrees,
            isOuter: true,
            theme,
            onPlanetHover: handlePlanetHover,
            hoveredPlanet,
            highlightedSign: hoveredSign
          }
        )
      ]
    }
  );
}
var PLANET_NAMES = {
  en: {
    Sun: "Sun",
    Moon: "Moon",
    Mercury: "Mercury",
    Venus: "Venus",
    Mars: "Mars",
    Jupiter: "Jupiter",
    Saturn: "Saturn",
    Uranus: "Uranus",
    Neptune: "Neptune",
    Pluto: "Pluto",
    NorthNode: "Node",
    SouthNode: "S.Node",
    Chiron: "Chiron",
    Lilith: "Lilith",
    Ascendant: "ASC",
    Midheaven: "MC"
  },
  es: {
    Sun: "Sol",
    Moon: "Luna",
    Mercury: "Mercurio",
    Venus: "Venus",
    Mars: "Marte",
    Jupiter: "J\xFApiter",
    Saturn: "Saturno",
    Uranus: "Urano",
    Neptune: "Neptuno",
    Pluto: "Plut\xF3n",
    NorthNode: "Nodo",
    SouthNode: "Nodo S.",
    Chiron: "Quir\xF3n",
    Lilith: "Lilith",
    Ascendant: "ASC",
    Midheaven: "MC"
  }
};
function ChartInfoPanel({
  chart,
  secondChart,
  theme = "light",
  language = "en",
  showHouses = true,
  showElements = true,
  className
}) {
  const isDark = theme === "dark";
  const isSynastry = Boolean(secondChart);
  const chart1Color = "#4a90d9";
  const chart2Color = "#d94a4a";
  const planetOrder = [
    "Sun",
    "Moon",
    "Mercury",
    "Venus",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune",
    "Pluto",
    "NorthNode",
    "Lilith",
    "Chiron"
  ];
  const sortPlanets = (planets) => {
    return [...planets].filter((p) => planetOrder.includes(p.planet)).sort((a, b) => planetOrder.indexOf(a.planet) - planetOrder.indexOf(b.planet));
  };
  const sortedPlanets1 = useMemo(() => sortPlanets(chart.planets), [chart.planets]);
  const sortedPlanets2 = useMemo(() => secondChart ? sortPlanets(secondChart.planets) : [], [secondChart]);
  const formatDegree2 = (degree) => {
    const deg = Math.floor(degree);
    const min = Math.round((degree - deg) * 60);
    return `${deg}\xB0${min.toString().padStart(2, "0")}'`;
  };
  const getPlanetName = (planet) => {
    return PLANET_NAMES[language][planet] || planet;
  };
  const containerStyle = {
    backgroundColor: isDark ? "#1a1a2e" : "#fff",
    color: isDark ? "#e0e0e0" : "#333",
    padding: "1rem",
    borderRadius: "8px",
    border: isDark ? "1px solid #333" : "1px solid #ddd",
    fontSize: "14px",
    fontFamily: "system-ui, sans-serif",
    maxWidth: isSynastry ? "420px" : "320px"
  };
  const sectionTitleStyle = {
    fontWeight: "bold",
    fontSize: "14px",
    marginBottom: "0.5rem",
    marginTop: "0.75rem",
    color: isDark ? "#fff" : "#333"
  };
  const symbolStyle = {
    fontFamily: "Segoe UI Symbol, Symbola, sans-serif",
    fontSize: "16px"
  };
  const cellStyle = {
    padding: "0.3rem 0.25rem",
    borderBottom: isDark ? "1px solid #333" : "1px solid #eee",
    whiteSpace: "nowrap"
  };
  const renderPosition = (planet, color) => {
    if (!planet) return null;
    return /* @__PURE__ */ jsxs("span", { style: { color }, children: [
      /* @__PURE__ */ jsx("span", { style: symbolStyle, children: ZODIAC_SYMBOLS[planet.sign] }),
      " ",
      formatDegree2(planet.degree),
      planet.retrograde && /* @__PURE__ */ jsx("span", { style: { fontSize: "10px", marginLeft: "2px", color: isDark ? "#ff6b6b" : "#c00" }, children: "\u211C" })
    ] });
  };
  const houses1 = useMemo(() => [...chart.houses].sort((a, b) => a.house - b.house), [chart.houses]);
  const houses2 = useMemo(() => secondChart ? [...secondChart.houses].sort((a, b) => a.house - b.house) : [], [secondChart]);
  const getHouseLabel = (num) => {
    if (num === 1) return "ASC";
    if (num === 4) return "IC";
    if (num === 7) return "DSC";
    if (num === 10) return "MC";
    return "";
  };
  return /* @__PURE__ */ jsxs("div", { style: containerStyle, className, children: [
    isSynastry && /* @__PURE__ */ jsxs("div", { style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "2rem",
      marginBottom: "0.5rem",
      paddingBottom: "0.5rem",
      borderBottom: isDark ? "1px solid #444" : "1px solid #ddd"
    }, children: [
      /* @__PURE__ */ jsx("div", { style: { color: chart1Color, fontWeight: "bold", fontSize: "13px", minWidth: "90px", textAlign: "center" }, children: chart.label || (language === "es" ? "Persona A" : "Person A") }),
      /* @__PURE__ */ jsx("div", { style: { color: chart2Color, fontWeight: "bold", fontSize: "13px", minWidth: "90px", textAlign: "center" }, children: secondChart?.label || (language === "es" ? "Persona B" : "Person B") })
    ] }),
    /* @__PURE__ */ jsx("table", { style: { width: "100%", borderCollapse: "collapse" }, children: /* @__PURE__ */ jsx("tbody", { children: planetOrder.map((planetName) => {
      const planet1 = sortedPlanets1.find((p) => p.planet === planetName);
      const planet2 = sortedPlanets2.find((p) => p.planet === planetName);
      if (!planet1 && !planet2) return null;
      return /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { style: { ...cellStyle, ...symbolStyle, color: isDark ? "#888" : "#666", width: "24px" }, children: PLANET_SYMBOLS[planetName] }),
        /* @__PURE__ */ jsx("td", { style: { ...cellStyle, fontWeight: 500, minWidth: "70px" }, children: getPlanetName(planetName) }),
        /* @__PURE__ */ jsx("td", { style: { ...cellStyle, minWidth: "90px" }, children: renderPosition(planet1, isSynastry ? chart1Color : isDark ? "#e0e0e0" : "#333") }),
        isSynastry && /* @__PURE__ */ jsx("td", { style: { ...cellStyle, minWidth: "90px" }, children: renderPosition(planet2, chart2Color) })
      ] }, planetName);
    }) }) }),
    showHouses && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { style: sectionTitleStyle, children: [
        language === "es" ? "Casas:" : "Houses:",
        " (Placidus)"
      ] }),
      /* @__PURE__ */ jsx("table", { style: { width: "100%", borderCollapse: "collapse" }, children: /* @__PURE__ */ jsx("tbody", { children: [1, 4, 7, 10].map((num) => {
        const house1 = houses1.find((h) => h.house === num);
        const house2 = houses2.find((h) => h.house === num);
        const label = getHouseLabel(num);
        return /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsxs("td", { style: { ...cellStyle, fontWeight: "bold", width: "40px" }, children: [
            label,
            ":"
          ] }),
          /* @__PURE__ */ jsx("td", { style: { ...cellStyle, color: isSynastry ? chart1Color : isDark ? "#e0e0e0" : "#333" }, children: house1 && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { style: symbolStyle, children: ZODIAC_SYMBOLS[house1.sign] }),
            " ",
            formatDegree2(house1.degree)
          ] }) }),
          isSynastry && /* @__PURE__ */ jsx("td", { style: { ...cellStyle, color: chart2Color }, children: house2 && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { style: symbolStyle, children: ZODIAC_SYMBOLS[house2.sign] }),
            " ",
            formatDegree2(house2.degree)
          ] }) })
        ] }, num);
      }) }) })
    ] }),
    showElements && !isSynastry && /* @__PURE__ */ jsx(ElementsDisplay, { chart, language, isDark })
  ] });
}
function ElementsDisplay({ chart, language, isDark }) {
  const elementCounts = useMemo(() => {
    const counts = { fire: 0, earth: 0, air: 0, water: 0 };
    const mainPlanets = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];
    chart.planets.forEach((planet) => {
      if (mainPlanets.includes(planet.planet)) {
        const element = SIGN_ELEMENTS[planet.sign];
        if (element && counts[element] !== void 0) {
          counts[element]++;
        }
      }
    });
    return counts;
  }, [chart.planets]);
  const sectionTitleStyle = {
    fontWeight: "bold",
    fontSize: "14px",
    marginBottom: "0.5rem",
    marginTop: "0.75rem",
    color: isDark ? "#fff" : "#333"
  };
  const elementEmojis = { fire: "\u{1F525}", earth: "\u{1F30D}", air: "\u{1F4A8}", water: "\u{1F4A7}" };
  const elementNames = {
    fire: language === "es" ? "Fuego" : "Fire",
    earth: language === "es" ? "Tierra" : "Earth",
    air: language === "es" ? "Aire" : "Air",
    water: language === "es" ? "Agua" : "Water"
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { style: sectionTitleStyle, children: language === "es" ? "Elementos" : "Elements" }),
    /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }, children: Object.entries(elementCounts).map(([element, count]) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" }, children: [
      /* @__PURE__ */ jsxs("span", { children: [
        count,
        "x"
      ] }),
      /* @__PURE__ */ jsx("span", { children: elementEmojis[element] }),
      /* @__PURE__ */ jsx("span", { children: elementNames[element] })
    ] }, element)) })
  ] });
}
var MODAL_CSS_RESET = `
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
var ALL_ASPECT_TYPES = [
  "conjunction",
  "opposition",
  "trine",
  "square",
  "sextile",
  "quincunx",
  "semisextile",
  "semisquare",
  "sesquiquadrate",
  "quintile",
  "biquintile"
];
var MAJOR_ASPECTS = ["conjunction", "opposition", "trine", "square", "sextile"];
function AstroMandalaWithModal({
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
  chartInfoPosition = "right",
  showBirthData: initialShowBirthData = false,
  aspectTypesFilter: initialAspectTypesFilter,
  includeAnglesInSynastry: initialIncludeAnglesInSynastry = false,
  innerChartColor = "#4a90d9",
  outerChartColor = "#d94a4a",
  aspectColors,
  theme: initialTheme = "light",
  language: initialLanguage = "en",
  className,
  showExpandButton = true,
  title,
  birthData,
  secondBirthData,
  onSettingsChange
}) {
  const portalContainerRef = useRef(null);
  const mandalaContainerRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 600, height: 600 });
  const [isMounted, setIsMounted] = useState(false);
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
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [isMounted]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModalSettings, setShowModalSettings] = useState(false);
  useEffect(() => {
    if (!isMounted) return;
    if (isModalOpen) {
      scrollPositionRef.current = window.scrollY;
      const container = document.createElement("div");
      container.id = "astromandala-modal-portal";
      document.body.appendChild(container);
      portalContainerRef.current = container;
      const styleElement = document.createElement("style");
      styleElement.id = "astromandala-modal-styles";
      styleElement.textContent = MODAL_CSS_RESET;
      document.head.appendChild(styleElement);
      document.body.classList.add("astromandala-modal-open");
      document.body.style.top = `-${scrollPositionRef.current}px`;
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      return () => {
        if (portalContainerRef.current && document.body.contains(portalContainerRef.current)) {
          document.body.removeChild(portalContainerRef.current);
          portalContainerRef.current = null;
        }
        const styleEl = document.getElementById("astromandala-modal-styles");
        if (styleEl) {
          document.head.removeChild(styleEl);
        }
        document.body.classList.remove("astromandala-modal-open");
        document.body.style.top = "";
        window.scrollTo(0, scrollPositionRef.current);
      };
    }
  }, [isModalOpen, isMounted]);
  useEffect(() => {
    if (!isModalOpen || !isMounted) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        setIsModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => {
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, [isModalOpen, isMounted]);
  useEffect(() => {
    if (isModalOpen && !isMobile) {
      setShowModalSettings(true);
    }
  }, [isModalOpen, isMobile]);
  const [showChartInfo, setShowChartInfo] = useState(initialShowChartInfo);
  const modalMandalaSize = useMemo(() => {
    if (!isModalOpen) return 500;
    const width = windowSize.width;
    const height = windowSize.height;
    if (isMobile) {
      const headerHeight = 45;
      const padding = 24;
      const chartInfoHeight = showChartInfo ? Math.min(height * 0.3, 200) : 0;
      const availableWidth = width - padding;
      const availableHeight = height - headerHeight - chartInfoHeight - padding;
      const size2 = Math.min(availableWidth, availableHeight);
      return Math.max(size2, 250);
    } else {
      const availableWidth = showModalSettings ? width - 320 : width - 40;
      const availableHeight = height - 120;
      return Math.min(availableWidth, availableHeight);
    }
  }, [isMobile, windowSize, showModalSettings, isModalOpen, showChartInfo]);
  const [showAspects, setShowAspects] = useState(initialShowAspects);
  const [showDegrees, setShowDegrees] = useState(initialShowDegrees);
  const [showHouses, setShowHouses] = useState(initialShowHouses);
  const [showSecondChartHouses, setShowSecondChartHouses] = useState(initialShowSecondChartHouses);
  const [showPlanetProjections, setShowPlanetProjections] = useState(initialShowPlanetProjections);
  const [showBirthDataOnChart, setShowBirthDataOnChart] = useState(initialShowBirthData);
  const [includeAnglesInSynastry, setIncludeAnglesInSynastry] = useState(initialIncludeAnglesInSynastry);
  const [theme, setTheme] = useState(initialTheme);
  const [language, setLanguage] = useState(initialLanguage);
  const downloadChartAsImage = useCallback(async () => {
    if (!mandalaContainerRef.current) return;
    try {
      const container = mandalaContainerRef.current;
      const svg = container.querySelector("svg");
      if (!svg) return;
      const svgClone = svg.cloneNode(true);
      const svgSize = parseInt(svg.getAttribute("width") || "500");
      if (showBirthDataOnChart && birthData) {
        const textGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        const isDarkTheme = theme === "dark";
        const textColor = isDarkTheme ? "#e0e0e0" : "#333";
        const fontSize = Math.max(10, svgSize * 0.022);
        let yOffset = svgSize + fontSize + 5;
        const addTextLine = (text) => {
          const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
          textEl.setAttribute("x", (svgSize / 2).toString());
          textEl.setAttribute("y", yOffset.toString());
          textEl.setAttribute("text-anchor", "middle");
          textEl.setAttribute("fill", textColor);
          textEl.setAttribute("font-size", fontSize.toString());
          textEl.setAttribute("font-family", "Arial, sans-serif");
          textEl.textContent = text;
          textGroup.appendChild(textEl);
          yOffset += fontSize + 4;
        };
        if (birthData.name) addTextLine(birthData.name);
        if (birthData.date) addTextLine(birthData.date + (birthData.time ? ` - ${birthData.time}` : ""));
        if (birthData.location) addTextLine(birthData.location);
        if (secondBirthData) {
          yOffset += 5;
          if (secondBirthData.name) addTextLine(secondBirthData.name);
          if (secondBirthData.date) addTextLine(secondBirthData.date + (secondBirthData.time ? ` - ${secondBirthData.time}` : ""));
          if (secondBirthData.location) addTextLine(secondBirthData.location);
        }
        const extraHeight = yOffset - svgSize;
        svgClone.setAttribute("height", (svgSize + extraHeight).toString());
        svgClone.setAttribute("viewBox", `0 0 ${svgSize} ${svgSize + extraHeight}`);
        svgClone.appendChild(textGroup);
      }
      const svgData = new XMLSerializer().serializeToString(svgClone);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const svgUrl = URL.createObjectURL(svgBlob);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = 2;
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.fillStyle = theme === "dark" ? "#1a1a2e" : "#fafafa";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);
        const link = document.createElement("a");
        let fileName = "astromandala_chart.png";
        const sanitize = (str) => str.replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s]/g, "").replace(/\s+/g, "_").trim();
        if (title && birthData?.name && secondBirthData?.name) {
          fileName = `${sanitize(title)}_${sanitize(birthData.name)}_${sanitize(secondBirthData.name)}.png`;
        } else if (title && birthData?.name) {
          fileName = `${sanitize(title)}_${sanitize(birthData.name)}.png`;
        } else if (birthData?.name && secondBirthData?.name) {
          fileName = `sinastria_${sanitize(birthData.name)}_${sanitize(secondBirthData.name)}.png`;
        } else if (title) {
          fileName = `${sanitize(title)}.png`;
        } else if (birthData?.name) {
          fileName = `carta_${sanitize(birthData.name)}.png`;
        }
        link.download = fileName;
        link.href = canvas.toDataURL("image/png");
        link.click();
        URL.revokeObjectURL(svgUrl);
      };
      img.src = svgUrl;
    } catch (error) {
      console.error("Error downloading chart:", error);
    }
  }, [showBirthDataOnChart, birthData, secondBirthData, theme, title]);
  useEffect(() => {
    setTheme(initialTheme);
  }, [initialTheme]);
  useEffect(() => {
    setLanguage(initialLanguage);
  }, [initialLanguage]);
  const [aspectFilters, setAspectFilters] = useState(() => {
    const filters = {};
    ALL_ASPECT_TYPES.forEach((aspect) => {
      filters[aspect] = initialAspectTypesFilter ? initialAspectTypesFilter.includes(aspect) : MAJOR_ASPECTS.includes(aspect);
    });
    return filters;
  });
  const t = useMemo(() => getTranslations(language), [language]);
  const isDark = theme === "dark";
  const isSynastry = Boolean(secondChart);
  const aspectTypesFilter = useMemo(() => {
    return ALL_ASPECT_TYPES.filter((aspect) => aspectFilters[aspect]);
  }, [aspectFilters]);
  const toggleAspectFilter = useCallback((aspect) => {
    setAspectFilters((prev) => ({ ...prev, [aspect]: !prev[aspect] }));
  }, []);
  useCallback(() => {
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
        language
      });
    }
  }, [showAspects, showDegrees, showHouses, showSecondChartHouses, showPlanetProjections, showChartInfo, showBirthDataOnChart, includeAnglesInSynastry, aspectTypesFilter, theme, language, onSettingsChange]);
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
    language
  };
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
    language: initialLanguage
  };
  const buttonStyle = {
    padding: "0.5rem 0.75rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)",
    color: isDark ? "#fff" : "#333",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem"
  };
  const expandButtonStyle = {
    ...buttonStyle,
    backgroundColor: isDark ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.85)",
    border: isDark ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(0,0,0,0.15)",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    position: "absolute",
    top: "0.5rem",
    right: "0.5rem",
    zIndex: 10
  };
  const checkboxLabelStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
    fontSize: "14px",
    padding: "0.25rem 0"
  };
  const sectionStyle = {
    marginBottom: "1rem",
    padding: "0.75rem",
    backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
    borderRadius: "6px"
  };
  const modalContent = isModalOpen && isMounted && portalContainerRef.current ? /* @__PURE__ */ jsxs(
    "div",
    {
      className: "astromandala-modal-root",
      style: {
        backgroundColor: isDark ? "#121212" : "#ffffff",
        display: "flex",
        flexDirection: "column",
        overflow: isMobile ? "auto" : "hidden"
      },
      onClick: (e) => e.stopPropagation(),
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: isMobile ? "0.25rem 0.5rem" : "0.5rem 1rem",
              borderBottom: isDark ? "1px solid #333" : "1px solid #ddd",
              backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5",
              flexShrink: 0,
              minHeight: isMobile ? "40px" : "48px",
              maxHeight: isMobile ? "40px" : "48px",
              width: "100%",
              boxSizing: "border-box",
              overflow: isMobile ? "auto" : "hidden"
            },
            children: [
              /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: isMobile ? "0.25rem" : "1rem", flexShrink: 1, overflow: "hidden" }, children: [
                title && /* @__PURE__ */ jsx("h1", { style: {
                  margin: 0,
                  fontSize: isMobile ? "14px" : "18px",
                  fontWeight: 600,
                  color: isDark ? "#fff" : "#333",
                  whiteSpace: "nowrap",
                  overflow: isMobile ? "auto" : "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: isMobile ? "120px" : "300px"
                }, children: title }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => setShowModalSettings(!showModalSettings),
                    style: {
                      ...buttonStyle,
                      padding: isMobile ? "0.25rem 0.4rem" : buttonStyle.padding,
                      fontSize: isMobile ? "14px" : buttonStyle.fontSize,
                      minWidth: isMobile ? "auto" : void 0
                    },
                    title: t.settings,
                    children: [
                      "\u2699",
                      isMobile ? "" : ` ${showModalSettings ? "\u25BC" : "\u25B6"} ${t.settings}`
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: language,
                    onChange: (e) => setLanguage(e.target.value),
                    style: {
                      padding: isMobile ? "0.25rem" : "0.5rem",
                      borderRadius: "4px",
                      border: isDark ? "1px solid #444" : "1px solid #ccc",
                      backgroundColor: isDark ? "#333" : "#fff",
                      color: isDark ? "#fff" : "#333",
                      cursor: "pointer",
                      fontSize: isMobile ? "14px" : "14px",
                      minWidth: isMobile ? "auto" : void 0
                    },
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "en", children: isMobile ? "\u{1F1EC}\u{1F1E7}" : "\u{1F1EC}\u{1F1E7} English" }),
                      /* @__PURE__ */ jsx("option", { value: "es", children: isMobile ? "\u{1F1EA}\u{1F1F8}" : "\u{1F1EA}\u{1F1F8} Espa\xF1ol" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setTheme(theme === "light" ? "dark" : "light"),
                    style: {
                      ...buttonStyle,
                      padding: isMobile ? "0.25rem 0.4rem" : buttonStyle.padding,
                      fontSize: isMobile ? "14px" : buttonStyle.fontSize,
                      minWidth: isMobile ? "auto" : void 0
                    },
                    children: isDark ? "\u2600\uFE0F" : "\u{1F319}"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: downloadChartAsImage,
                    style: {
                      ...buttonStyle,
                      padding: isMobile ? "0.25rem 0.4rem" : buttonStyle.padding,
                      fontSize: isMobile ? "14px" : buttonStyle.fontSize,
                      minWidth: isMobile ? "auto" : void 0,
                      backgroundColor: isDark ? "rgba(74, 144, 217, 0.3)" : "rgba(74, 144, 217, 0.15)"
                    },
                    title: t.downloadImage,
                    children: [
                      "\u{1F4E5}",
                      isMobile ? "" : ` ${t.downloadImage}`
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setIsModalOpen(false),
                  style: {
                    ...buttonStyle,
                    backgroundColor: isDark ? "#c53030" : "#e53e3e",
                    color: "#fff",
                    padding: isMobile ? "0.25rem 0.5rem" : buttonStyle.padding,
                    fontSize: isMobile ? "14px" : buttonStyle.fontSize,
                    minWidth: isMobile ? "auto" : void 0,
                    flexShrink: 0,
                    marginLeft: isMobile ? "0.25rem" : void 0
                  },
                  children: "\u2715"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              flex: 1,
              display: "flex",
              overflow: isMobile ? "auto" : "hidden"
            },
            children: [
              showModalSettings && /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    width: "280px",
                    minWidth: "280px",
                    padding: "1rem",
                    overflowY: "auto",
                    borderRight: isDark ? "1px solid #333" : "1px solid #ddd",
                    backgroundColor: isDark ? "#1a1a1a" : "#fafafa",
                    color: isDark ? "#e0e0e0" : "#333"
                  },
                  children: [
                    /* @__PURE__ */ jsxs("div", { style: sectionStyle, children: [
                      /* @__PURE__ */ jsx("h4", { style: { margin: "0 0 0.5rem 0", fontSize: "13px", textTransform: "uppercase", opacity: 0.7 }, children: t.settings }),
                      /* @__PURE__ */ jsxs("label", { style: checkboxLabelStyle, children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: showAspects,
                            onChange: (e) => setShowAspects(e.target.checked)
                          }
                        ),
                        t.showAspects
                      ] }),
                      /* @__PURE__ */ jsxs("label", { style: checkboxLabelStyle, children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: showDegrees,
                            onChange: (e) => setShowDegrees(e.target.checked)
                          }
                        ),
                        t.showDegrees
                      ] }),
                      /* @__PURE__ */ jsxs("label", { style: checkboxLabelStyle, children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: showHouses,
                            onChange: (e) => setShowHouses(e.target.checked)
                          }
                        ),
                        t.showHouses
                      ] }),
                      isSynastry && /* @__PURE__ */ jsxs("label", { style: checkboxLabelStyle, children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: showSecondChartHouses,
                            onChange: (e) => setShowSecondChartHouses(e.target.checked)
                          }
                        ),
                        t.showChart2Houses
                      ] }),
                      /* @__PURE__ */ jsxs("label", { style: checkboxLabelStyle, children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: showPlanetProjections,
                            onChange: (e) => setShowPlanetProjections(e.target.checked)
                          }
                        ),
                        t.showPlanetProjections
                      ] }),
                      /* @__PURE__ */ jsxs("label", { style: checkboxLabelStyle, children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: showChartInfo,
                            onChange: (e) => setShowChartInfo(e.target.checked)
                          }
                        ),
                        t.showChartInfo
                      ] }),
                      (birthData || secondBirthData) && /* @__PURE__ */ jsxs("label", { style: checkboxLabelStyle, children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: showBirthDataOnChart,
                            onChange: (e) => setShowBirthDataOnChart(e.target.checked)
                          }
                        ),
                        t.showBirthData
                      ] }),
                      isSynastry && showAspects && /* @__PURE__ */ jsxs("label", { style: checkboxLabelStyle, children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: includeAnglesInSynastry,
                            onChange: (e) => setIncludeAnglesInSynastry(e.target.checked)
                          }
                        ),
                        t.includeAnglesInSynastry
                      ] })
                    ] }),
                    showAspects && /* @__PURE__ */ jsxs("div", { style: sectionStyle, children: [
                      /* @__PURE__ */ jsx("h4", { style: { margin: "0 0 0.5rem 0", fontSize: "13px", textTransform: "uppercase", opacity: 0.7 }, children: t.aspectTypes }),
                      /* @__PURE__ */ jsx("div", { style: { marginBottom: "0.5rem" }, children: /* @__PURE__ */ jsx("span", { style: { fontSize: "12px", opacity: 0.6 }, children: t.majorAspects }) }),
                      MAJOR_ASPECTS.map((aspect) => /* @__PURE__ */ jsxs("label", { style: { ...checkboxLabelStyle, fontSize: "13px" }, children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: aspectFilters[aspect],
                            onChange: () => toggleAspectFilter(aspect)
                          }
                        ),
                        t[aspect]
                      ] }, aspect)),
                      /* @__PURE__ */ jsx("div", { style: { marginTop: "0.75rem", marginBottom: "0.5rem" }, children: /* @__PURE__ */ jsx("span", { style: { fontSize: "12px", opacity: 0.6 }, children: t.minorAspects }) }),
                      ALL_ASPECT_TYPES.filter((a) => !MAJOR_ASPECTS.includes(a)).map((aspect) => /* @__PURE__ */ jsxs("label", { style: { ...checkboxLabelStyle, fontSize: "13px" }, children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: aspectFilters[aspect],
                            onChange: () => toggleAspectFilter(aspect)
                          }
                        ),
                        t[aspect]
                      ] }, aspect))
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    flex: 1,
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: isMobile ? "flex-start" : "center",
                    alignItems: "center",
                    padding: isMobile ? "0.5rem" : "1rem",
                    backgroundColor: isDark ? "#0d0d1a" : "#f0f0f0",
                    overflow: isMobile ? "auto" : "hidden",
                    boxSizing: "border-box",
                    minHeight: 0,
                    gap: "0.5rem",
                    width: "100%",
                    maxWidth: "100%"
                  },
                  children: [
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        ref: mandalaContainerRef,
                        style: {
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "0.5rem"
                        },
                        children: [
                          /* @__PURE__ */ jsx("div", { style: {
                            width: modalMandalaSize,
                            height: modalMandalaSize,
                            maxWidth: "100%",
                            maxHeight: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexShrink: 1
                          }, children: /* @__PURE__ */ createElement(
                            AstroMandala,
                            {
                              ...modalMandalaProps,
                              size: modalMandalaSize,
                              key: `modal-mandala-${modalMandalaSize}-${showChartInfo}`
                            }
                          ) }),
                          showBirthDataOnChart && (birthData || secondBirthData) && /* @__PURE__ */ jsxs("div", { style: {
                            textAlign: "center",
                            color: isDark ? "#e0e0e0" : "#333",
                            fontSize: isMobile ? "11px" : "13px",
                            lineHeight: 1.4,
                            maxWidth: modalMandalaSize,
                            padding: "0.5rem"
                          }, children: [
                            birthData && /* @__PURE__ */ jsxs("div", { style: { marginBottom: secondBirthData ? "0.5rem" : 0, color: innerChartColor }, children: [
                              birthData.name && /* @__PURE__ */ jsx("div", { style: { fontWeight: 600 }, children: birthData.name }),
                              (birthData.date || birthData.time) && /* @__PURE__ */ jsxs("div", { children: [
                                birthData.date,
                                birthData.time ? ` - ${birthData.time}` : ""
                              ] }),
                              birthData.location && /* @__PURE__ */ jsx("div", { children: birthData.location })
                            ] }),
                            secondBirthData && /* @__PURE__ */ jsxs("div", { style: { color: outerChartColor }, children: [
                              secondBirthData.name && /* @__PURE__ */ jsx("div", { style: { fontWeight: 600 }, children: secondBirthData.name }),
                              (secondBirthData.date || secondBirthData.time) && /* @__PURE__ */ jsxs("div", { children: [
                                secondBirthData.date,
                                secondBirthData.time ? ` - ${secondBirthData.time}` : ""
                              ] }),
                              secondBirthData.location && /* @__PURE__ */ jsx("div", { children: secondBirthData.location })
                            ] })
                          ] })
                        ]
                      }
                    ),
                    showChartInfo && !isMobile && chartInfoPosition === "right" && /* @__PURE__ */ jsx("div", { style: {
                      alignSelf: "center",
                      maxHeight: modalMandalaSize * 0.85,
                      overflowY: "auto"
                    }, children: /* @__PURE__ */ jsx(
                      ChartInfoPanel,
                      {
                        chart,
                        secondChart,
                        theme,
                        language
                      }
                    ) }),
                    showChartInfo && (isMobile || chartInfoPosition === "bottom") && /* @__PURE__ */ jsx("div", { style: {
                      width: "100%",
                      maxWidth: "100%",
                      display: "flex",
                      justifyContent: "center"
                    }, children: /* @__PURE__ */ jsx(
                      ChartInfoPanel,
                      {
                        chart,
                        secondChart,
                        theme,
                        language
                      }
                    ) })
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  ) : null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { style: { position: "relative", display: "inline-block" }, className, children: [
      showExpandButton && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setIsModalOpen(true),
          style: expandButtonStyle,
          title: t.expand,
          children: "\u26F6"
        }
      ),
      /* @__PURE__ */ jsx(AstroMandala, { ...mainMandalaProps, size })
    ] }),
    modalContent && portalContainerRef.current && createPortal(modalContent, portalContainerRef.current)
  ] });
}

export { ASPECT_ANGLES, AspectLines, AstroMandala, AstroMandalaWithModal, DEFAULT_ASPECT_COLORS, DEFAULT_ORBS, ELEMENT_COLORS, HouseWheel, PLANET_CATEGORIES, PLANET_SYMBOLS, PlanetDisplay, SIGN_ELEMENTS, SIGN_START_DEGREES, TRANSLATIONS, ZODIAC_ORDER, ZODIAC_SYMBOLS, ZodiacWheel, calculateNatalAspects, calculateSynastryAspects, convertHoroscopeToChart, formatDegree, getAbsoluteDegree, getMandalaAngle, getOrbForPlanets, getPlanetAbsoluteDegree, getPointOnCircle, getTranslations, normalizeAngle };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map