'use client';

import { useState, useEffect } from 'react';
import FortuneWheel from '@/components/FortuneWheel';
import { FortuneWheelItem, SpinResult } from '@/types/fortune-wheel';
import { generateDefaultColors } from '@/utils/wheel-utils';
import { useResponsiveSize } from '@/hooks/useResponsiveSize';

const defaultItems: FortuneWheelItem[] = [
  { id: '1', label: 'Premio 1', color: '#3B82F6' },
  { id: '2', label: 'Premio 2', color: '#EF4444' },
  { id: '3', label: 'Premio 3', color: '#10B981' },
  { id: '4', label: 'Premio 4', color: '#F59E0B' },
  { id: '5', label: 'Premio 5', color: '#8B5CF6' },
  { id: '6', label: 'Premio 6', color: '#EC4899' },
];

export default function HomePage() {
  const [items, setItems] = useState<FortuneWheelItem[]>(defaultItems);
  const [newItemLabel, setNewItemLabel] = useState('');
  const [lastWinner, setLastWinner] = useState<FortuneWheelItem | null>(null);
  const [spinHistory, setSpinHistory] = useState<SpinResult[]>([]);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState<string | null>(null);
  const wheelSize = useResponsiveSize();

  // Predefined colors for color picker
  const availableColors = [
    // Primera fila - Colores específicos solicitados
    '#FA345E', '#B2A8E7', '#1B1B1B', '#146787', '#45C1AD', '#FFFFFF',
    // Segunda fila - Colores adicionales vibrantes
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899',
    // Tercera fila - Más opciones de colores
    '#14B8A6', '#F97316', '#6366F1', '#84CC16', '#06B6D4', '#DC2626',
    // Cuarta fila - Colores complementarios
    '#7C3AED', '#DB2777', '#059669', '#D97706', '#0891B2', '#BE185D'
  ];

  const handleSpinComplete = (winner: FortuneWheelItem) => {
    setLastWinner(winner);
    const result: SpinResult = {
      winner,
      finalRotation: 0, // You may need to get this from the wheel component
      spinDuration: 3000
    };
    setSpinHistory(prev => [result, ...prev.slice(0, 4)]); // Keep last 5 results
  };

  const addItem = () => {
    if (!newItemLabel.trim()) return;
    
    const colors = generateDefaultColors(items.length + 1);
    const newItem: FortuneWheelItem = {
      id: Date.now().toString(),
      label: newItemLabel.trim(),
      color: colors[items.length]
    };
    
    setItems([...items, newItem]);
    setNewItemLabel('');
  };

  const removeItem = (id: string) => {
    if (items.length <= 2) return; // Minimum 2 items
    setItems(items.filter(item => item.id !== id));
  };

  const resetWheel = () => {
    setItems(defaultItems);
    setLastWinner(null);
    setSpinHistory([]);
  };

  const changeItemColor = (itemId: string, newColor: string) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, color: newColor } : item
    ));
    setColorPickerOpen(null);
  };

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('.color-picker-container')) {
          setColorPickerOpen(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [colorPickerOpen]);

  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Header - Simple */}
      <header className="text-center py-8">
        <h1 className="text-6xl font-bold text-gray-800">
          Ruleta Apprecio
        </h1>
      </header>

      {/* Main Content - Centered Wheel */}
      <div className="flex-1 flex items-center justify-center relative">
        <div className="wheel-container">
          <FortuneWheel
            items={items}
            size={wheelSize}
            onSpinComplete={handleSpinComplete}
            spinDuration={3000}
          />
        </div>

        {/* Config Toggle Button - Fixed Position */}
        <button
          onClick={() => setIsConfigOpen(!isConfigOpen)}
          className="fixed top-6 right-6 z-50 p-3 bg-[#FA345E] text-white rounded-full shadow-lg hover:bg-[#e02a52] transition-all duration-200 hover:scale-105"
          title="Configuración"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* Configuration Modal - Sliding from right */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-40 ${
        isConfigOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Configuración</h2>
            <button
              onClick={() => setIsConfigOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Add Item */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Agregar Elemento</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newItemLabel}
                  onChange={(e) => setNewItemLabel(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addItem()}
                  placeholder="Nombre del premio..."
                  className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={20}
                />
                <button
                  onClick={addItem}
                  disabled={!newItemLabel.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Items List */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">
                Elementos ({items.length})
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="relative color-picker-container">
                    <div className="flex items-center gap-3 p-2 bg-white rounded">
                      <button
                        onClick={() => setColorPickerOpen(colorPickerOpen === item.id ? null : item.id)}
                        className="w-4 h-4 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors cursor-pointer"
                        style={{ backgroundColor: item.color }}
                        title="Cambiar color"
                      />
                      <span className="flex-1 text-sm">{item.label}</span>
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={items.length <= 2}
                        className="text-red-500 hover:text-red-700 disabled:text-gray-400 transition-colors text-sm p-1"
                      >
                        ✕
                      </button>
                    </div>
                    
                    {/* Color Picker */}
                    {colorPickerOpen === item.id && (
                      <div className="absolute left-0 top-full mt-1 bg-white border rounded-lg shadow-lg p-3 z-50 w-64">
                        <div className="grid grid-cols-6 gap-2">
                          {availableColors.map((color, index) => (
                            <button
                              key={`${color}-${index}`}
                              onClick={() => changeItemColor(item.id, color)}
                              className="w-7 h-7 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Winner Display */}
            {lastWinner && (
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  🎉 ¡Último Ganador!
                </h3>
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: lastWinner.color }}
                  />
                  <span className="text-lg font-bold text-green-700">
                    {lastWinner.label}
                  </span>
                </div>
              </div>
            )}

            {/* Spin History */}
            {spinHistory.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Historial</h3>
                <div className="space-y-2">
                  {spinHistory.map((result, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm bg-white p-2 rounded">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: result.winner.color }}
                      />
                      <span>{result.winner.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reset Button */}
            <button
              onClick={resetWheel}
              className="w-full px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-semibold"
            >
              Reiniciar Todo
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isConfigOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={() => {
            setIsConfigOpen(false);
            setColorPickerOpen(null);
          }}
        />
      )}

      {/* Footer */}
      <footer className="text-center py-4 text-gray-500">
        <p>Hecho con Apprecio</p>
      </footer>
    </main>
  );
}