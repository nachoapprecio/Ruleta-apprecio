export interface FortuneWheelItem {
  id: string;
  label: string;
  color: string;
  value?: any;
}

export interface FortuneWheelProps {
  items: FortuneWheelItem[];
  size?: number;
  strokeWidth?: number;
  strokeColor?: string;
  pointerColor?: string;
  onSpinComplete?: (winner: FortuneWheelItem) => void;
  spinDuration?: number;
  disabled?: boolean;
}

export interface SpinResult {
  winner: FortuneWheelItem;
  finalRotation: number;
  spinDuration: number;
}