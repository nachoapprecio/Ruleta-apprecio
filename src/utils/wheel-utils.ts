import { FortuneWheelItem } from '@/types/fortune-wheel';

export const generateDefaultColors = (count: number): string[] => {
  const colors = [
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#14B8A6', // Teal
    '#F97316', // Orange
    '#6366F1', // Indigo
    '#84CC16', // Lime
  ];
  
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(colors[i % colors.length]);
  }
  return result;
};

export const calculateWinner = (
  items: FortuneWheelItem[],
  finalRotation: number
): FortuneWheelItem => {
  const normalizedRotation = ((finalRotation % 360) + 360) % 360;
  const anglePerSegment = 360 / items.length;
  
  // The pointer is at the top (0 degrees)
  // When the wheel rotates, we need to find which segment ends up under the pointer
  // We need to invert the rotation since the wheel spins but the pointer stays fixed
  const adjustedRotation = (360 - normalizedRotation) % 360;
  const segmentIndex = Math.floor(adjustedRotation / anglePerSegment);
  
  // Return the item at the calculated index
  return items[segmentIndex];
};

export const generateSpinRotation = (
  minSpins: number = 3,
  maxSpins: number = 6
): number => {
  const baseRotation = Math.random() * 360;
  const additionalSpins = Math.random() * (maxSpins - minSpins) + minSpins;
  return baseRotation + (additionalSpins * 360);
};

export const createWheelSegmentPath = (
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string => {
  const start = polarToCartesian(centerX, centerY, radius, endAngle);
  const end = polarToCartesian(centerX, centerY, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  
  return [
    "M", centerX, centerY,
    "L", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    "Z"
  ].join(" ");
};

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
};

export const getTextPosition = (
  centerX: number,
  centerY: number,
  radius: number,
  angle: number,
  itemsCount: number = 6
) => {
  // Adjust text radius based on number of items - more items = closer to edge for readability
  const baseTextRadius = 0.7;
  const adjustment = Math.min(0.1, (itemsCount - 6) * 0.01);
  const textRadius = radius * (baseTextRadius + adjustment);
  
  const angleInRadians = (angle - 90) * Math.PI / 180.0;
  return {
    x: centerX + (textRadius * Math.cos(angleInRadians)),
    y: centerY + (textRadius * Math.sin(angleInRadians))
  };
};