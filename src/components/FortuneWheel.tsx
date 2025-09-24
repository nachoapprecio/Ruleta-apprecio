'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FortuneWheelProps } from '@/types/fortune-wheel';
import { useFortuneWheel } from '@/hooks/useFortuneWheel';
import { createWheelSegmentPath, getTextPosition } from '@/utils/wheel-utils';

const FortuneWheel: React.FC<FortuneWheelProps> = ({
  items,
  size = 400,
  strokeWidth = 4,
  strokeColor = '#374151',
  pointerColor = '#DC2626',
  onSpinComplete,
  spinDuration = 3000,
  disabled = false
}) => {
  const { isSpinning, currentRotation, winner, spin } = useFortuneWheel(items);

  const handleSpin = () => {
    if (disabled || isSpinning) return;
    spin((result) => {
      if (onSpinComplete && result.winner) {
        onSpinComplete(result.winner);
      }
    }, spinDuration);
  };

  const radius = (size - strokeWidth) / 2;
  const centerX = size / 2;
  const centerY = size / 2;
  const anglePerSegment = 360 / items.length;
  
  // Calculate responsive font size based on wheel size and number of items
  const baseFontSize = Math.max(8, Math.min(16, size / 25));
  const adjustedFontSize = Math.max(8, baseFontSize * (6 / Math.max(6, items.length)));
  const fontSize = `${adjustedFontSize}px`;
  
  // Calculate max text length based on segment size
  const maxTextLength = Math.max(8, Math.floor(size / 30) - Math.floor(items.length / 3));
  
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 1) + '…';
  };

  return (
    <div className="relative inline-block">
      {/* Wheel Container */}
      <div className="relative" style={{ width: size, height: size }}>
        {/* SVG Wheel */}
        <motion.svg
          width={size}
          height={size}
          className="drop-shadow-lg"
          animate={{ rotate: currentRotation }}
          transition={{
            duration: isSpinning ? spinDuration / 1000 : 0,
            ease: [0.17, 0.67, 0.12, 0.99]
          }}
        >


          {/* Wheel Segments */}
          {items.map((item, index) => {
            const startAngle = index * anglePerSegment;
            const endAngle = (index + 1) * anglePerSegment;
            const segmentPath = createWheelSegmentPath(
              centerX,
              centerY,
              radius,
              startAngle,
              endAngle
            );
            
            const textAngle = startAngle + anglePerSegment / 2;
            const textPosition = getTextPosition(centerX, centerY, radius, textAngle, items.length);

            // Use solid color fill
            const fillValue = item.color;

            return (
              <g key={item.id}>
                {/* Segment */}
                <path
                  d={segmentPath}
                  fill={fillValue}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  className="transition-opacity hover:opacity-90"
                />
                
                {/* Text Label */}
                <text
                  x={textPosition.x}
                  y={textPosition.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-white font-semibold pointer-events-none select-none"
                  style={{
                    fontSize: fontSize,
                    fontFamily: 'Montserrat, sans-serif',
                    filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))'
                  }}
                  transform={`rotate(${textAngle}, ${textPosition.x}, ${textPosition.y})`}
                >
                  {truncateText(item.label, maxTextLength)}
                </text>
              </g>
            );
          })}
          
          {/* Center Circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={30}
            fill={strokeColor}
            className="drop-shadow-md"
          />
          
          {/* Center Button */}
          <circle
            cx={centerX}
            cy={centerY}
            r={25}
            fill="white"
            className="hover:fill-gray-100 transition-colors"
          />
        </motion.svg>

        {/* Center Logo - Outside SVG */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ zIndex: 15 }}
        >
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="w-10 h-10 object-contain"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
          />
        </div>

        {/* Pointer */}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-1"
          style={{ zIndex: 10 }}
        >
          <div
            className="w-0 h-0 drop-shadow-md"
            style={{
              borderLeft: '15px solid transparent',
              borderRight: '15px solid transparent',
              borderTop: `30px solid ${pointerColor}`,
            }}
          />
        </div>
      </div>

      {/* Spin Button */}
      <div className="text-center mt-8">
        <button
          onClick={handleSpin}
          disabled={disabled || isSpinning}
          className={`
            px-12 py-4 rounded-xl font-bold text-white text-lg transition-all duration-200 transform
            ${isSpinning || disabled
              ? 'bg-gray-400 cursor-not-allowed scale-100'
              : 'bg-[#FA345E] hover:bg-[#e02a52] active:scale-95 shadow-lg hover:shadow-xl hover:scale-105'
            }
          `}
        >
          {isSpinning ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Girando...
            </span>
          ) : (
            '¡Gira la Ruleta!'
          )}
        </button>
      </div>

      {/* Winner Display */}
      {winner && !isSpinning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mt-4 p-4 bg-green-100 rounded-lg border-2 border-green-300"
        >
          <h3 className="text-lg font-bold text-green-800">¡Ganador!</h3>
          <p className="text-xl font-semibold text-green-700">{winner.label}</p>
        </motion.div>
      )}
    </div>
  );
};

export default FortuneWheel;