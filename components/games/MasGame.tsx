'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { gameConfig } from '@/lib/gameConfig';
import { GameType } from '@/types';

interface MasGameProps {
  onSelect: (numbers: number[], modalidad?: string) => void;
  isLoading?: boolean;
}

export default function MasGame({ onSelect, isLoading = false }: MasGameProps) {
  const config = gameConfig[GameType.LOTO];
  const masConfig = config.lotoModalities?.mas;

  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [selectedBonus, setSelectedBonus] = useState<number | null>(null);

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

  const handleBonusClick = (num: number) => {
    setSelectedBonus(selectedBonus === num ? null : num);
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
    setSelectedBonus(Math.floor(Math.random() * 12) + 1);
  };

  const handleClear = () => {
    setSelectedNumbers([]);
    setSelectedBonus(null);
  };

  const handleAddToCart = () => {
    if (selectedNumbers.length === 6 && selectedBonus !== null) {
      onSelect(selectedNumbers, 'mas');
      setSelectedNumbers([]);
      setSelectedBonus(null);
    }
  };

  const isComplete = selectedNumbers.length === 6 && selectedBonus !== null;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">⭐ Más - 6/40 + 1 Bono</h2>
        <p className="text-yellow-100">
          Selecciona 6 números (1-40) + 1 número Bono (1-12). Acierta 4+ para ganar.
          Premio mayor: $150,000+ (miércoles y sábados 20:55)
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Selecciona 6 números (1-40)</h3>
        <div className="grid grid-cols-5 md:grid-cols-8 gap-2">
          {Array.from({ length: 40 }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              disabled={selectedNumbers.length === 6 && !selectedNumbers.includes(num)}
              className={`w-full aspect-square rounded-lg font-semibold text-sm transition-all
                ${selectedNumbers.includes(num)
                  ? 'bg-amber-500 text-white border-2 border-amber-600'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-700 hover:border-amber-400'
                }
                ${selectedNumbers.length === 6 && !selectedNumbers.includes(num) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Selecciona 1 Número Bono (1-12)</h3>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
            <button
              key={`bonus-${num}`}
              onClick={() => handleBonusClick(num)}
              className={`w-full aspect-square rounded-lg font-semibold text-sm transition-all
                ${selectedBonus === num
                  ? 'bg-yellow-500 text-white border-2 border-yellow-600 ring-2 ring-yellow-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-700 hover:border-yellow-400'
                }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={handleQuickPick} variant="outline" className="flex-1">
          🎲 Quick Pick
        </Button>
        <Button onClick={handleClear} variant="ghost" className="flex-1">
          🗑️ Limpiar
        </Button>
      </div>

      {(selectedNumbers.length > 0 || selectedBonus !== null) && (
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">✓ Selección</h3>
            {isComplete && <span className="text-sm font-semibold text-green-600 dark:text-green-400">¡Completo!</span>}
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">6 Números ({selectedNumbers.length}/6)</p>
              <div className="flex flex-wrap gap-2">
                {selectedNumbers.map((num) => (
                  <span key={num} className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {num}
                  </span>
                ))}
              </div>
            </div>
            {selectedBonus !== null && (
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Número Bono</p>
                <span className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold ring-2 ring-yellow-300">
                  🎯 {selectedBonus}
                </span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-yellow-200 dark:border-yellow-800">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Precio</p>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">${masConfig?.price}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Premio máximo</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">$150,000+</p>
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={handleAddToCart}
        disabled={!isComplete || isLoading}
        variant="default"
        className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-bold"
      >
        {isLoading
          ? '⏳ Procesando...'
          : isComplete
          ? `💳 Pagar Ahora - $${masConfig?.price}`
          : `Completa: 6 números (${selectedNumbers.length}/6) + 1 Bono ${selectedBonus ? '✓' : ''}`}
      </Button>
    </div>
  );
}
