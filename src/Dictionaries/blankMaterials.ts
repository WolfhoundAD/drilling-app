import { BlankMaterial, Material } from '../types';
export const blankMaterials: BlankMaterial[] = [
  { id: Material.Steel, label: 'Сталь', hb: 200, cutSpeedHSS: 25 },
  { id: Material.Iron, label: 'Чугун', hb: 190, cutSpeedHSS: 22 },
  { id: Material.Aluminum, label: 'Алюминий', hb: 60, cutSpeedHSS: 60 },
  { id: Material.Copper, label: 'Медь', hb: 80, cutSpeedHSS: 40 },
];