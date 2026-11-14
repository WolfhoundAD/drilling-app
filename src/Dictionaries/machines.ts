import { Machine } from '../types';
export const machines: Machine[] = [
  { id: 'm1', label: '2M112 (настольный)', power: 0.6, maxRpm: 4500, maxFeed: 0.2 },
  { id: 'm2', label: '2H125', power: 2.2, maxRpm: 2800, maxFeed: 0.5 },
  { id: 'm3', label: '2H135', power: 4.0, maxRpm: 1400, maxFeed: 0.8 },
  { id: 'm4', label: '2A150', power: 7.5, maxRpm: 1000, maxFeed: 1.2 },
];