import { FC } from 'react';
const Tool: FC<{ width?: number; height?: number }> = ({ width = 321, height = 321 }) => (
  <svg width={width} height={height} viewBox="0 0 100 100">
    <rect x="42" y="2" width="16" height="30" fill="#78909c" />
    <path d="M42 32 H58 L56 85 L50 98 L44 85 Z" fill="#b0bec5" stroke="#455a64" />
    <path d="M44 40 L56 46 M44 52 L56 58 M44 64 L56 70 M45 76 L55 80"
      stroke="#455a64" strokeWidth="2" />
  </svg>
);
export default Tool;