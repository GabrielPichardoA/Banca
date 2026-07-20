'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { gameConfig } from '@/lib/gameConfig';
import { GameType } from '@/types';

interface LotoGameProps {
  onSelect: (numbers: number[], modalidad?: string) => void;
  isLoading?: boolean;
}

export default function LotoGame({ onSelect, isLoading = false }: LotoGameProps) {
  const config = gameConfig[GameType.LOTO];
  const lotoConfig = config.lotoModalities?.loto;

  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  const handleNumberClick = (num: number) => {
    setSelectedNumbers((prev) => {
      if (prev.includes(num)) {
        return prev.filter((n) => n !== num);
      }
      if (prev.length < 6) {
        return [...prev, num].sort((a, b) => a - b);
      }
      return prev;
    });
  };

  const handleQuickPick = () => {
    const numbers: number[] = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 40) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    setSelectedNumbers(numbers.sort((a, b) => a - b));
  };

  const handleClear = () => {
    setSelectedNumbers([]);
  };

  const handleAddToCart = () => {
    if (selectedNumbers.length === 6) {
      onSelect(selectedNumbers, 'loto');
      setSelectedNumbers([]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-lg p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">🎯 Loto - 6/40</h2>
        <p className="text-orange-100">
          Selecciona 6 números del 1 al 40. Acierta 3 o más para ganar. 
          Premio mayor: $20,000+ (miércoles y sábados 20:55)
        </p>
      </div>

      {/* Number Grid */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Selecciona 6 números (1-40)</h3>
        <div className="grid grid-cols-5 md:grid-cols-8 gap-2">
          {Array.from({ length: 40 }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              disabled={selectedNumbers.length === 6 && !selectedNumbers.includes(num)}
              className={`
                w-full aspect-square rounded-lg font-semibold text-sm transition-all
                ${
                  selectedNumbers.includes(num)
                    ? 'bg-orange-500 text-white border-2 border-orange-600'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-700 hover:border-orange-400'
                }
                ${selectedNumbers.length === 6 && !selectedNumbers.includes(num) ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleQuickPick}
          variant="outline"
          className="flex-1"
        >
          🎲 Quick Pick
        </Button>
        <Button
          onClick={handleClear}
          variant="ghost"
          className="flex-1"
        >
          🗑️ Limpiar
        </Button>
      </div>

      {/* Selection Preview */}
      {selectedNumbers.length > 0 && (
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              ✓ Números Seleccionados ({selectedNumbers.length}/6)
            </h3>
            {selectedNumbers.length === 6 && (
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">¡Completo!</span>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedNumbers.map((num) => (
              <span
                key={num}
                className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
              >
                {num}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Precio por apuesta</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">${lotoConfig?.price}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Premio máximo (6/6)</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">$20,000+</p>
            </div>
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        disabled={selectedNumbers.length !== 6 || isLoading}
        variant="default"
        className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold"
      >
        {isLoading
          ? '⏳ Procesando...'
          : selectedNumbers.length === 6
          ? `💳 Pagar Ahora - $${lotoConfig?.price}`
          : `Selecciona 6 números (${selectedNumbers.length}/6)`}
      </Button>
    </div>
  );
}
