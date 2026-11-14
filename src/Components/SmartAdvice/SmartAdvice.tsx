import type { FC } from 'react';
import { Alert, Box, CircularProgress, LinearProgress, Typography } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import Card from '../Card/Card';
import { useWearPrediction } from '../../hooks/useWearPrediction';
import type { Result } from '../../calc';
import type { State } from '../../types';

interface Props {
  state: State;
  result: Result | null;
}

const SmartAdvice: FC<Props> = ({ state, result }) => {
  const { prediction, loading, error } = useWearPrediction(
    result?.feed ?? null,
    result?.speed ?? null,
    state.depth > 0 ? state.depth : null,   // ← реальная глубина из state
    result?.torque ?? null,
  );

  return (
    <Card
      title="Интеллектуальные рекомендации"
      icon={<PsychologyIcon fontSize="small" />}
      accent="#16a34a"
    >
      {loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <CircularProgress size={20} />
          <Typography variant="body2" color="text.secondary">
            Загрузка ML-модели…
          </Typography>
        </Box>
      )}

      {error && <Alert severity="error">Не удалось загрузить модель: {error}</Alert>}

      {!loading && !error && !prediction && (
        <Typography variant="body2" color="text.secondary">
          Заполните все параметры, чтобы получить ML-рекомендацию.
        </Typography>
      )}

      {prediction && (
        <>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Прогнозируемый риск износа
            </Typography>
            <LinearProgress
              variant="determinate"
              value={prediction.wearRisk * 100}
              color={
                prediction.wearRisk > 0.7
                  ? 'error'
                  : prediction.wearRisk > 0.4
                  ? 'warning'
                  : 'success'
              }
              sx={{ height: 8, borderRadius: 4, mt: 0.5, mb: 0.5 }}
            />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {(prediction.wearRisk * 100).toFixed(0)}%
            </Typography>
          </Box>

          <Alert severity={prediction.severity} sx={{ mt: 1 }}>
            {prediction.advice}
          </Alert>
        </>
      )}
    </Card>
  );
};

export default SmartAdvice;