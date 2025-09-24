import { useState, useCallback, useRef } from 'react';
import { FortuneWheelItem, SpinResult } from '@/types/fortune-wheel';
import { calculateWinner, generateSpinRotation } from '@/utils/wheel-utils';

export const useFortuneWheel = (items: FortuneWheelItem[]) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [winner, setWinner] = useState<FortuneWheelItem | null>(null);
  const spinTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const spin = useCallback((
    onComplete?: (result: SpinResult) => void,
    duration: number = 3000
  ) => {
    if (isSpinning || items.length === 0) return;

    setIsSpinning(true);
    setWinner(null);

    const finalRotation = currentRotation + generateSpinRotation();
    setCurrentRotation(finalRotation);

    // Clear any existing timeout
    if (spinTimeoutRef.current) {
      clearTimeout(spinTimeoutRef.current);
    }

    spinTimeoutRef.current = setTimeout(() => {
      const winningItem = calculateWinner(items, finalRotation);
      setWinner(winningItem);
      setIsSpinning(false);

      const result: SpinResult = {
        winner: winningItem,
        finalRotation,
        spinDuration: duration
      };

      onComplete?.(result);
    }, duration);
  }, [isSpinning, items, currentRotation]);

  const reset = useCallback(() => {
    if (spinTimeoutRef.current) {
      clearTimeout(spinTimeoutRef.current);
    }
    setIsSpinning(false);
    setCurrentRotation(0);
    setWinner(null);
  }, []);

  return {
    isSpinning,
    currentRotation,
    winner,
    spin,
    reset
  };
};