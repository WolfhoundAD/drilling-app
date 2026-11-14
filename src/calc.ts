import { State } from './types';

export interface Result {
  rpm: number; speed: number; feed: number; power: number;
  time: number; torque: number; recommended: string; warnings: string[];
}

export function calculate(s: State): Result | null {
  if (!s.material || !s.machine || !s.drillType || !s.toolMaterial || s.diameter <= 0 || s.depth <= 0)
    return null;
  const D = s.diameter;
  const warnings: string[] = [];

  // Скорость резания, м/мин
  const v = s.material.cutSpeedHSS * (s.toolMaterial.k ?? 1) * (s.drillType.k ?? 1);
  let n = (1000 * v) / (Math.PI * D);
  if (n > s.machine.maxRpm) {
    n = s.machine.maxRpm;
    warnings.push('Частота вращения ограничена станком');
  }
  const speed = (Math.PI * D * n) / 1000;

  // Подача, мм/об (по твёрдости и диаметру)
  let feed = 0.02 * D * (200 / (s.material.hb + 100)) * 1.5;
  feed = Math.min(feed, s.machine.maxFeed);

  // Крутящий момент, Н·м и мощность, кВт (упрощённые эмпирические формулы)
  const torque = 0.0345 * s.material.hb * Math.pow(D, 1.9) * Math.pow(feed, 0.8) / 10;
  const power = (torque * n) / 9550;
  if (power > s.machine.power) warnings.push('Мощность станка недостаточна: уменьшите диаметр или выберите другой станок');
  if (s.depth > 5 * D) warnings.push('Глубина больше 5D: используйте циклы с выводом сверла');
  if (s.depth > 3 * D && s.drillType.id === 'center') warnings.push('Центровочное сверло не подходит для глубоких отверстий');

  const approach = s.holeType?.id === 'through' ? 0.3 * D : 0;
  const time = (s.depth + approach) / (feed * n);

  const recommended = `${s.toolMaterial.label}, ${s.drillType.label.toLowerCase()} Ø${D} мм`;
  return { rpm: n, speed, feed, power, time, torque, recommended, warnings };
}