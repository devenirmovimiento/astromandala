/**
 * Example usage of the AstroMandala component
 * 
 * This file demonstrates how to use the component with sample data.
 */

import { AstrologicalChart, SynastryAspect } from '../types';

/**
 * Example natal chart data
 */
export const exampleChart: AstrologicalChart = {
  label: 'John Doe',
  planets: [
    { planet: 'Sun', sign: 'Aries', degree: 15.5 },
    { planet: 'Moon', sign: 'Cancer', degree: 22.3 },
    { planet: 'Mercury', sign: 'Pisces', degree: 28.7, retrograde: true },
    { planet: 'Venus', sign: 'Taurus', degree: 8.2 },
    { planet: 'Mars', sign: 'Leo', degree: 3.9 },
    { planet: 'Jupiter', sign: 'Sagittarius', degree: 17.4 },
    { planet: 'Saturn', sign: 'Capricorn', degree: 25.1, retrograde: true },
    { planet: 'Uranus', sign: 'Aquarius', degree: 12.8 },
    { planet: 'Neptune', sign: 'Pisces', degree: 5.6 },
    { planet: 'Pluto', sign: 'Capricorn', degree: 22.9 },
    { planet: 'NorthNode', sign: 'Gemini', degree: 10.3 },
    { planet: 'Chiron', sign: 'Aries', degree: 7.2 },
    { planet: 'Ascendant', sign: 'Leo', degree: 0 },
    { planet: 'Midheaven', sign: 'Taurus', degree: 0 },
  ],
  houses: [
    { house: 1, sign: 'Leo', degree: 0 },
    { house: 2, sign: 'Virgo', degree: 0 },
    { house: 3, sign: 'Libra', degree: 0 },
    { house: 4, sign: 'Scorpio', degree: 0 },
    { house: 5, sign: 'Sagittarius', degree: 0 },
    { house: 6, sign: 'Capricorn', degree: 0 },
    { house: 7, sign: 'Aquarius', degree: 0 },
    { house: 8, sign: 'Pisces', degree: 0 },
    { house: 9, sign: 'Aries', degree: 0 },
    { house: 10, sign: 'Taurus', degree: 0 },
    { house: 11, sign: 'Gemini', degree: 0 },
    { house: 12, sign: 'Cancer', degree: 0 },
  ],
  aspects: [
    { planet1: 'Sun', planet2: 'Moon', aspect: 'square', orb: 6.8 },
    { planet1: 'Sun', planet2: 'Mars', aspect: 'trine', orb: 1.6 },
    { planet1: 'Sun', planet2: 'Jupiter', aspect: 'trine', orb: 1.9 },
    { planet1: 'Moon', planet2: 'Venus', aspect: 'sextile', orb: 4.1 },
    { planet1: 'Venus', planet2: 'Mars', aspect: 'square', orb: 4.3 },
    { planet1: 'Mars', planet2: 'Jupiter', aspect: 'trine', orb: 3.5 },
    { planet1: 'Saturn', planet2: 'Pluto', aspect: 'conjunction', orb: 2.2 },
    { planet1: 'Uranus', planet2: 'Neptune', aspect: 'sextile', orb: 7.2 },
  ],
};

/**
 * Example second chart for synastry
 */
export const exampleSecondChart: AstrologicalChart = {
  label: 'Jane Doe',
  planets: [
    { planet: 'Sun', sign: 'Libra', degree: 20.3 },
    { planet: 'Moon', sign: 'Taurus', degree: 15.8 },
    { planet: 'Mercury', sign: 'Scorpio', degree: 5.2 },
    { planet: 'Venus', sign: 'Virgo', degree: 28.9 },
    { planet: 'Mars', sign: 'Sagittarius', degree: 12.4 },
    { planet: 'Jupiter', sign: 'Leo', degree: 8.7 },
    { planet: 'Saturn', sign: 'Pisces', degree: 3.1 },
    { planet: 'Uranus', sign: 'Capricorn', degree: 18.6 },
    { planet: 'Neptune', sign: 'Capricorn', degree: 22.4 },
    { planet: 'Pluto', sign: 'Scorpio', degree: 25.8 },
    { planet: 'NorthNode', sign: 'Sagittarius', degree: 5.7 },
    { planet: 'Chiron', sign: 'Cancer', degree: 12.3 },
    { planet: 'Ascendant', sign: 'Scorpio', degree: 15 },
    { planet: 'Midheaven', sign: 'Leo', degree: 15 },
  ],
  houses: [
    { house: 1, sign: 'Scorpio', degree: 15 },
    { house: 2, sign: 'Sagittarius', degree: 15 },
    { house: 3, sign: 'Capricorn', degree: 15 },
    { house: 4, sign: 'Aquarius', degree: 15 },
    { house: 5, sign: 'Pisces', degree: 15 },
    { house: 6, sign: 'Aries', degree: 15 },
    { house: 7, sign: 'Taurus', degree: 15 },
    { house: 8, sign: 'Gemini', degree: 15 },
    { house: 9, sign: 'Cancer', degree: 15 },
    { house: 10, sign: 'Leo', degree: 15 },
    { house: 11, sign: 'Virgo', degree: 15 },
    { house: 12, sign: 'Libra', degree: 15 },
  ],
  aspects: [
    { planet1: 'Sun', planet2: 'Moon', aspect: 'quincunx', orb: 4.5 },
    { planet1: 'Venus', planet2: 'Mars', aspect: 'square', orb: 1.5 },
    { planet1: 'Jupiter', planet2: 'Saturn', aspect: 'quincunx', orb: 5.6 },
  ],
};

/**
 * Example synastry aspects between the two charts
 */
export const exampleSynastryAspects: SynastryAspect[] = [
  {
    planet1: 'Sun',
    chart1Owner: 'chart1',
    planet2: 'Sun',
    chart2Owner: 'chart2',
    aspect: 'opposition',
    orb: 4.8,
  },
  {
    planet1: 'Moon',
    chart1Owner: 'chart1',
    planet2: 'Venus',
    chart2Owner: 'chart2',
    aspect: 'sextile',
    orb: 6.6,
  },
  {
    planet1: 'Venus',
    chart1Owner: 'chart1',
    planet2: 'Moon',
    chart2Owner: 'chart2',
    aspect: 'conjunction',
    orb: 7.6,
  },
  {
    planet1: 'Mars',
    chart1Owner: 'chart1',
    planet2: 'Jupiter',
    chart2Owner: 'chart2',
    aspect: 'conjunction',
    orb: 4.8,
  },
  {
    planet1: 'Jupiter',
    chart1Owner: 'chart1',
    planet2: 'Mars',
    chart2Owner: 'chart2',
    aspect: 'conjunction',
    orb: 5.0,
  },
  {
    planet1: 'Saturn',
    chart1Owner: 'chart1',
    planet2: 'Neptune',
    chart2Owner: 'chart2',
    aspect: 'conjunction',
    orb: 2.7,
  },
];
