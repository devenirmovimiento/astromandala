# Astromandala

A React/Next.js component library for displaying astrological mandalas (birth charts). Supports single chart visualization and synastry (two charts overlapping).

## Installation

```bash
# From GitHub
npm install git+https://github.com/devenirmovimiento/astromandala.git

# Or using yarn
yarn add git+https://github.com/devenirmovimiento/astromandala.git
```

## Usage

### Single Chart

```tsx
import { AstroMandala } from 'astromandala';
import type { AstrologicalChart } from 'astromandala';

const chart: AstrologicalChart = {
  planets: [
    { planet: 'Sun', sign: 'Aries', degree: 15.5 },
    { planet: 'Moon', sign: 'Cancer', degree: 22.3 },
    { planet: 'Mercury', sign: 'Pisces', degree: 8.7 },
    // ... more planets
  ],
  houses: [
    { house: 1, sign: 'Leo', degree: 0 },
    { house: 2, sign: 'Virgo', degree: 0 },
    // ... all 12 houses
  ],
  aspects: [
    { planet1: 'Sun', planet2: 'Moon', aspect: 'square', orb: 2.5 },
    { planet1: 'Venus', planet2: 'Mars', aspect: 'conjunction', orb: 1.2 },
    // ... more aspects
  ],
};

function MyComponent() {
  return (
    <AstroMandala
      chart={chart}
      size={600}
      showAspects={true}
      showDegrees={true}
    />
  );
}
```

### Synastry (Two Charts)

```tsx
import { AstroMandala } from 'astromandala';
import type { AstrologicalChart, SynastryAspect } from 'astromandala';

const chart1: AstrologicalChart = {
  // First person's chart
  planets: [...],
  houses: [...],
  aspects: [...],
};

const chart2: AstrologicalChart = {
  // Second person's chart
  planets: [...],
  houses: [...],
  aspects: [...],
};

const synastryAspects: SynastryAspect[] = [
  { 
    planet1: 'Sun', 
    chart1Owner: 'chart1',
    planet2: 'Moon', 
    chart2Owner: 'chart2',
    aspect: 'trine', 
    orb: 1.5 
  },
  // ... more synastry aspects
];

function SynastryComponent() {
  return (
    <AstroMandala
      chart={chart1}
      secondChart={chart2}
      synastryAspects={synastryAspects}
      size={700}
      showAspects={true}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `chart` | `AstrologicalChart` | required | Primary astrological chart data |
| `secondChart` | `AstrologicalChart` | undefined | Secondary chart for synastry |
| `synastryAspects` | `SynastryAspect[]` | undefined | Aspects between two charts |
| `size` | `number` | 500 | Size of the mandala in pixels |
| `showAspects` | `boolean` | true | Whether to display aspect lines |
| `showDegrees` | `boolean` | false | Whether to display degree numbers |
| `showHouses` | `boolean` | true | Whether to display house divisions |
| `innerChartColor` | `string` | '#4a90d9' | Color for inner chart planets |
| `outerChartColor` | `string` | '#d94a4a' | Color for outer chart planets (synastry) |
| `aspectColors` | `AspectColors` | default colors | Custom colors for aspect lines |
| `className` | `string` | undefined | Additional CSS class name |

## Types

### Planet Names
`'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'NorthNode' | 'SouthNode' | 'Chiron' | 'Lilith' | 'Ascendant' | 'Midheaven'`

### Zodiac Signs
`'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces'`

### Aspect Types
`'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile' | 'quincunx' | 'semisextile' | 'semisquare' | 'sesquiquadrate' | 'quintile' | 'biquintile'`

## License

MIT
