export enum Material { Steel = 'steel', Iron = 'iron', Aluminum = 'aluminum', Copper = 'copper' }

export interface BlankMaterial { id: Material; label: string; hb: number; cutSpeedHSS: number }
export interface Machine { id: string; label: string; power: number; maxRpm: number; maxFeed: number }
export interface Option { id: string; label: string; k?: number }

export interface State {
  material: BlankMaterial | null;
  machine: Machine | null;
  drillType: Option | null;
  toolMaterial: Option | null;
  diameter: number;
  depth: number;
  holeType: Option | null;
}