import { FC } from 'react';
import { Alert, Typography } from '@mui/material';
import Card from '../Card/Card';
import { Result as R } from '../../calc';

const Result: FC<{ result: R | null }> = ({ result }) => (
  <Card title="Результат подбора">
    {!result ? (
      <Typography>Заполните все параметры.</Typography>
    ) : (
      <>
        <Typography><b>Рекомендуемый инструмент:</b> {result.recommended}</Typography>
        <Typography>Частота вращения: {result.rpm.toFixed(0)} об/мин</Typography>
        <Typography>Скорость резания: {result.speed.toFixed(1)} м/мин</Typography>
        <Typography>Подача: {result.feed.toFixed(3)} мм/об</Typography>
        <Typography>Крутящий момент: {result.torque.toFixed(2)} Н·м</Typography>
        <Typography>Мощность резания: {result.power.toFixed(2)} кВт</Typography>
        <Typography>Машинное время: {result.time.toFixed(2)} мин</Typography>
        {result.warnings.map((w) => <Alert key={w} severity="warning">{w}</Alert>)}
      </>
    )}
  </Card>
);
export default Result;