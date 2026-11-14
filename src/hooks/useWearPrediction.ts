import { useEffect, useState } from 'react';
import * as ort from 'onnxruntime-web';

export interface WearPrediction {
  wearRisk: number;       // 0..1 (нормализованный k_wear)
  rawValue: number;       // сырое значение k_wear
  advice: string;
  severity: 'success' | 'info' | 'warning';
}

const MODEL_URL = '/models/wear_predictor.onnx';

// Нормализация: k_wear в датасете может выходить за [0,1],
// поэтому аккуратно ограничиваем для UI.
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function useWearPrediction(
  feed: number | null,
  cuttingSpeed: number | null,
  depth: number | null,
  torque: number | null,
) {
  const [session, setSession] = useState<ort.InferenceSession | null>(null);
  const [prediction, setPrediction] = useState<WearPrediction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка модели один раз
  useEffect(() => {
    let cancelled = false;
    ort.InferenceSession.create(MODEL_URL)
      .then((s) => { if (!cancelled) setSession(s); })
      .catch((e) => { if (!cancelled) setError(String(e)); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  // Инференс при изменении входных данных
  useEffect(() => {
    if (!session || feed == null || cuttingSpeed == null || depth == null || torque == null) {
      setPrediction(null);
      return;
    }

    const input = new ort.Tensor('float32', [feed, cuttingSpeed, depth, torque], [1, 4]);

    session.run({ float_input: input })
      .then((out) => {
        const raw = (out[session.outputNames[0]].data as Float32Array)[0];
        const risk = clamp01(raw);

        let advice: string;
        let severity: WearPrediction['severity'];

        if (risk > 0.7) {
          severity = 'warning';
          advice = 'Высокий риск износа: снизьте подачу или обороты на 10–15%.';
        } else if (risk > 0.4) {
          severity = 'info';
          advice = 'Умеренный износ: следите за стружкой и состоянием кромки.';
        } else {
          severity = 'success';
          advice = 'Режим в безопасной зоне по износу.';
        }

        setPrediction({ wearRisk: risk, rawValue: raw, advice, severity });
      })
      .catch((e) => setError(String(e)));
  }, [session, feed, cuttingSpeed, depth, torque]);

  return { prediction, loading, error };
}