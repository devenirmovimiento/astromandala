# Astromandala

A React/Next.js component library for displaying beautiful astrological charts (birth charts/mandalas). Supports single chart visualization, synastry (two charts comparison), themes (light/dark), multiple languages (English/Spanish), and an expandable modal with settings panel.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue?style=for-the-badge)](https://devenirmovimiento.github.io/astromandala/)

![Astromandala Example](https://raw.githubusercontent.com/devenirmovimiento/astromandala/main/example.png)

## Features

- 🌟 **Single Chart & Synastry** - Display individual birth charts or compare two charts
- 🎨 **Light/Dark Themes** - Built-in theme support
- 🌍 **Multi-language** - English and Spanish translations
- 📱 **Responsive** - Works on desktop and mobile
- ⚙️ **Configurable** - Show/hide aspects, degrees, houses, projections
- 📊 **Chart Info Panel** - Display planet positions, houses, and elements
- 🔍 **Expandable Modal** - Full-screen view with settings panel
- 🎯 **Aspect Filtering** - Filter by major/minor aspects

## Installation

```bash
npm install git+https://github.com/devenirmovimiento/astromandala.git
```

Or with yarn:

```bash
yarn add git+https://github.com/devenirmovimiento/astromandala.git
```

## Quick Start

### Basic Usage

```tsx
"use client";

import { AstroMandala } from "astromandala";
import type { AstrologicalChart } from "astromandala";

const chart: AstrologicalChart = {
	label: "John Doe",
	planets: [
		{ planet: "Sun", sign: "Leo", degree: 24.15 },
		{ planet: "Moon", sign: "Aries", degree: 21.58 },
		{ planet: "Mercury", sign: "Virgo", degree: 13.2, retrograde: true },
		{ planet: "Venus", sign: "Virgo", degree: 11.15 },
		{ planet: "Mars", sign: "Scorpio", degree: 29.5 },
		{ planet: "Jupiter", sign: "Capricorn", degree: 3.4, retrograde: true },
		{ planet: "Saturn", sign: "Scorpio", degree: 10.67 },
		{ planet: "Uranus", sign: "Sagittarius", degree: 9.53, retrograde: true },
		{ planet: "Neptune", sign: "Sagittarius", degree: 28.8, retrograde: true },
		{ planet: "Pluto", sign: "Libra", degree: 29.73 },
		{ planet: "NorthNode", sign: "Gemini", degree: 2.42 },
		{ planet: "Chiron", sign: "Gemini", degree: 8.72 },
		{ planet: "Lilith", sign: "Aries", degree: 1.77 },
		{ planet: "Ascendant", sign: "Aquarius", degree: 23.22 },
		{ planet: "Midheaven", sign: "Scorpio", degree: 18.27 },
	],
	houses: [
		{ house: 1, sign: "Aquarius", degree: 23.22 },
		{ house: 2, sign: "Pisces", degree: 17.13 },
		{ house: 3, sign: "Aries", degree: 15.63 },
		{ house: 4, sign: "Taurus", degree: 18.27 },
		{ house: 5, sign: "Gemini", degree: 22.17 },
		{ house: 6, sign: "Cancer", degree: 24.23 },
		{ house: 7, sign: "Leo", degree: 23.22 },
		{ house: 8, sign: "Virgo", degree: 17.13 },
		{ house: 9, sign: "Libra", degree: 15.63 },
		{ house: 10, sign: "Scorpio", degree: 18.27 },
		{ house: 11, sign: "Sagittarius", degree: 22.17 },
		{ house: 12, sign: "Capricorn", degree: 24.23 },
	],
	aspects: [],
};

export default function ChartPage() {
	return (
		<AstroMandala
			chart={chart}
			size={600}
			showAspects={true}
			showDegrees={true}
			theme="dark"
		/>
	);
}
```

### With Modal and Settings

```tsx
"use client";

import { AstroMandalaWithModal } from "astromandala";

export default function ChartPage() {
	return (
		<AstroMandalaWithModal
			chart={chart}
			size={500}
			showExpandButton={true}
			showChartInfo={false}
			theme="dark"
			language="es"
		/>
	);
}
```

### Synastry (Two Charts)

```tsx
'use client';

import { AstroMandalaWithModal } from 'astromandala';
import type { AstrologicalChart, SynastryAspect } from 'astromandala';

const chart1: AstrologicalChart = {
  label: 'Person A',
  planets: [...],
  houses: [...],
  aspects: [],
};

const chart2: AstrologicalChart = {
  label: 'Person B',
  planets: [...],
  houses: [...],
  aspects: [],
};

// Calculate synastry aspects between charts
const synastryAspects: SynastryAspect[] = [
  {
    planet1: 'Sun',
    chart1Owner: 'chart1',
    planet2: 'Moon',
    chart2Owner: 'chart2',
    aspect: 'trine',
    orb: 1.5
  },
  // ... more aspects
];

export default function SynastryPage() {
  return (
    <AstroMandalaWithModal
      chart={chart1}
      secondChart={chart2}
      synastryAspects={synastryAspects}
      size={600}
      showChartInfo={true}
      theme="dark"
      language="es"
    />
  );
}
```

## Components

### `AstroMandala`

The base chart component without modal functionality.

### `AstroMandalaWithModal`

Extended component with expand button, fullscreen modal, and settings panel.

### `ChartInfoPanel`

Standalone component to display planet positions, houses, and elements.

```tsx
import { ChartInfoPanel } from "astromandala";

<ChartInfoPanel
	chart={chart}
	secondChart={chart2} // Optional - for synastry view
	theme="dark"
	language="es"
/>;
```

## Props

### AstroMandala Props

| Prop                      | Type                | Default       | Description                          |
| ------------------------- | ------------------- | ------------- | ------------------------------------ |
| `chart`                   | `AstrologicalChart` | required      | Primary chart data                   |
| `secondChart`             | `AstrologicalChart` | undefined     | Secondary chart for synastry         |
| `synastryAspects`         | `SynastryAspect[]`  | undefined     | Aspects between two charts           |
| `size`                    | `number`            | 500           | Size in pixels                       |
| `showAspects`             | `boolean`           | true          | Show aspect lines                    |
| `showDegrees`             | `boolean`           | false         | Show degree numbers                  |
| `showHouses`              | `boolean`           | true          | Show house divisions                 |
| `showSecondChartHouses`   | `boolean`           | true          | Show second chart houses in synastry |
| `showPlanetProjections`   | `boolean`           | true          | Show planet projection lines         |
| `aspectTypesFilter`       | `AspectType[]`      | major aspects | Filter which aspects to show         |
| `includeAnglesInSynastry` | `boolean`           | false         | Include AC/MC in synastry aspects    |
| `innerChartColor`         | `string`            | '#4a90d9'     | Color for inner chart                |
| `outerChartColor`         | `string`            | '#d94a4a'     | Color for outer chart                |
| `theme`                   | `'light' \| 'dark'` | 'light'       | Theme                                |
| `className`               | `string`            | undefined     | CSS class                            |

### AstroMandalaWithModal Additional Props

| Prop               | Type                 | Default   | Description              |
| ------------------ | -------------------- | --------- | ------------------------ |
| `language`         | `'en' \| 'es'`       | 'en'      | UI language              |
| `showExpandButton` | `boolean`            | true      | Show expand button       |
| `showChartInfo`    | `boolean`            | false     | Show chart info panel    |
| `onSettingsChange` | `(settings) => void` | undefined | Settings change callback |

## Types

```typescript
type ZodiacSign =
	| "Aries"
	| "Taurus"
	| "Gemini"
	| "Cancer"
	| "Leo"
	| "Virgo"
	| "Libra"
	| "Scorpio"
	| "Sagittarius"
	| "Capricorn"
	| "Aquarius"
	| "Pisces";

type PlanetName =
	| "Sun"
	| "Moon"
	| "Mercury"
	| "Venus"
	| "Mars"
	| "Jupiter"
	| "Saturn"
	| "Uranus"
	| "Neptune"
	| "Pluto"
	| "NorthNode"
	| "SouthNode"
	| "Chiron"
	| "Lilith"
	| "Ascendant"
	| "Midheaven";

type AspectType =
	| "conjunction"
	| "opposition"
	| "trine"
	| "square"
	| "sextile"
	| "quincunx"
	| "semisextile"
	| "semisquare"
	| "sesquiquadrate"
	| "quintile"
	| "biquintile";

interface PlanetPosition {
	planet: PlanetName;
	sign: ZodiacSign;
	degree: number;
	retrograde?: boolean;
}

interface HousePosition {
	house: number; // 1-12
	sign: ZodiacSign;
	degree: number;
}

interface AstrologicalChart {
	label?: string;
	planets: PlanetPosition[];
	houses: HousePosition[];
	aspects: Aspect[];
}
```

## Integration with circular-natal-horoscope-js

This library provides seamless integration with [circular-natal-horoscope-js](https://www.npmjs.com/package/circular-natal-horoscope-js) through the `convertHoroscopeToChart` utility function. **No manual data conversion needed!**

### Installation

```bash
npm install circular-natal-horoscope-js
```

### Direct Usage (Recommended)

```tsx
"use client";

import { Origin, Horoscope } from "circular-natal-horoscope-js";
import {
	AstroMandalaWithModal,
	convertHoroscopeToChart,
	calculateSynastryAspects,
} from "astromandala";

// Create birth data
const origin = new Origin({
	year: 1984,
	month: 7, // 0-indexed (August)
	date: 16,
	hour: 18,
	minute: 15,
	latitude: -34.6037,
	longitude: -58.3816,
});

// Calculate horoscope
const horoscope = new Horoscope({
	origin,
	houseSystem: "placidus",
	zodiac: "tropical",
	aspectPoints: ["bodies", "points", "angles"],
	aspectWithPoints: ["bodies", "points", "angles"],
	aspectTypes: ["major", "minor"],
});

// Convert directly to AstrologicalChart - no manual mapping needed!
const chart = convertHoroscopeToChart(horoscope, "John Doe");

export default function ChartPage() {
	return (
		<AstroMandalaWithModal
			chart={chart}
			size={500}
			showChartInfo={true}
			theme="dark"
			language="es"
		/>
	);
}
```

### Synastry with Two Charts

```tsx
"use client";

import { Origin, Horoscope } from "circular-natal-horoscope-js";
import {
	AstroMandalaWithModal,
	convertHoroscopeToChart,
	calculateSynastryAspects,
} from "astromandala";

// Person A
const origin1 = new Origin({
	year: 1984,
	month: 7,
	date: 16,
	hour: 18,
	minute: 15,
	latitude: -34.6037,
	longitude: -58.3816,
});

const horoscope1 = new Horoscope({
	origin: origin1,
	houseSystem: "placidus",
	zodiac: "tropical",
});

// Person B
const origin2 = new Origin({
	year: 1990,
	month: 2,
	date: 21,
	hour: 10,
	minute: 30,
	latitude: -34.6037,
	longitude: -58.3816,
});

const horoscope2 = new Horoscope({
	origin: origin2,
	houseSystem: "placidus",
	zodiac: "tropical",
});

// Convert both charts
const chart1 = convertHoroscopeToChart(horoscope1, "Person A");
const chart2 = convertHoroscopeToChart(horoscope2, "Person B");

// Calculate synastry aspects automatically
const synastryAspects = calculateSynastryAspects(horoscope1, horoscope2);

export default function SynastryPage() {
	return (
		<AstroMandalaWithModal
			chart={chart1}
			secondChart={chart2}
			synastryAspects={synastryAspects}
			size={600}
			showChartInfo={true}
			theme="dark"
			language="es"
		/>
	);
}
```

### Utility Functions

| Function                     | Description                                                   |
| ---------------------------- | ------------------------------------------------------------- |
| `convertHoroscopeToChart()`  | Converts a Horoscope result to AstrologicalChart format       |
| `calculateSynastryAspects()` | Calculates aspects between two Horoscope results for synastry |
| `calculateNatalAspects()`    | Calculates aspects within a single chart                      |
| `getOrbForPlanets()`         | Gets the orb for an aspect between two specific planets       |

```typescript
// Convert horoscope to chart
const chart = convertHoroscopeToChart(horoscope, "Optional Label");

// Calculate synastry aspects with default orbs
const aspects = calculateSynastryAspects(horoscope1, horoscope2);

// Calculate natal aspects
const natalAspects = calculateNatalAspects(horoscope);
```

### Configuring Aspect Orbs

The library uses configurable orbs based on planet categories. By default:

| Category        | Planets                | Default Orb |
| --------------- | ---------------------- | ----------- |
| `luminaries`    | Sun, Moon              | 10°         |
| `personal`      | Mercury, Venus, Mars   | 8°          |
| `social`        | Jupiter, Saturn        | 6°          |
| `transpersonal` | Uranus, Neptune, Pluto | 5°          |
| `points`        | Nodes, Chiron, Lilith  | 5°          |
| `angles`        | Ascendant, Midheaven   | 5°          |

When calculating aspects between two planets, the library uses the **average** of both planets' orbs.

```typescript
import {
	calculateSynastryAspects,
	calculateNatalAspects,
	DEFAULT_ORBS,
	type OrbConfiguration,
} from "astromandala";

// Use default orbs
const aspects = calculateSynastryAspects(horoscope1, horoscope2);

// Use custom orbs (partial configuration - unspecified use defaults)
const customOrbs: OrbConfiguration = {
	luminaries: 12, // Sun, Moon: 12°
	personal: 10, // Mercury, Venus, Mars: 10°
	transpersonal: 4, // Uranus, Neptune, Pluto: 4°
};

const aspectsWithCustomOrbs = calculateSynastryAspects(
	horoscope1,
	horoscope2,
	customOrbs
);

// Calculate natal aspects with custom orbs
const natalAspects = calculateNatalAspects(horoscope, customOrbs);

// Calculate only major aspects
const majorAspects = calculateNatalAspects(horoscope, customOrbs, [
	"conjunction",
	"opposition",
	"trine",
	"square",
	"sextile",
]);
```

---

## 🤖 AI Agent Implementation Prompt

Use this prompt to ask an AI coding agent (like GitHub Copilot, Cursor, or similar) to implement astromandala in your Next.js project:

```
Implement the astromandala library in my Next.js project for displaying astrological birth charts.

Requirements:
1. Install dependencies:
   - npm install git+https://github.com/devenirmovimiento/astromandala.git
   - npm install circular-natal-horoscope-js

2. Create a page/component that:
   - Takes birth data input (date, time, location with latitude/longitude)
   - Calculates the astrological chart using circular-natal-horoscope-js
   - Uses the convertHoroscopeToChart() utility to convert the horoscope result
   - Displays the chart using AstroMandalaWithModal component
   - Supports both single charts and synastry (two charts comparison)
   - Uses dark theme and Spanish language
   - Shows the chart info panel with planet positions

Key imports:
import { Origin, Horoscope } from 'circular-natal-horoscope-js';
import {
  AstroMandalaWithModal,
  convertHoroscopeToChart,
  calculateSynastryAspects,
} from 'astromandala';

The component must use 'use client' directive since it uses React hooks.

Usage pattern:
1. Create Origin with birth data (year, month 0-indexed, date, hour, minute, latitude, longitude)
2. Create Horoscope with origin and options (houseSystem: 'placidus', zodiac: 'tropical', aspectTypes: ['major', 'minor'])
3. Convert with: const chart = convertHoroscopeToChart(horoscope, 'Person Name')
4. For synastry, use: const aspects = calculateSynastryAspects(horoscope1, horoscope2)
5. Render: <AstroMandalaWithModal chart={chart} secondChart={chart2} synastryAspects={aspects} />

No manual data mapping is required - the convertHoroscopeToChart function handles all conversions automatically.
```

---

## License

MIT

## Author

[devenirmovimiento](https://github.com/devenirmovimiento)
