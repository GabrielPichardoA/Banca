'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { gameConfig } from '@/lib/gameConfig';
import { GameType } from '@/types';

interface SupermasGameProps {
  onSelect: (numbers: number[], modalidad?: string) => void;
  isLoading?: boolean;
}

export default function SupermasGame({ onSelect, isLoading = false }: SupermasGameProps) {
  const config = gameConfig[GameType.LOTO];
  const supermasConfig = config.lotoModalities?.supermas;

  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [selectedBonus1, setSelectedBonus1] = useState<number | null>(null);
  const [selectedBonus2, setSelectedBonus2] = useState<number | null>(null);

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

  const handleBonus1Click = (num: number) => {
    setSelectedBonus1(selectedBonus1 === num ? null : num);
  };

  const handleBonus2Click = (num: number) => {
    setSelectedBonus2(selectedBonus2 === num ? null : num);
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
    setSelectedBonus1(Math.floor(Math.random() * 12) + 1);
    setSelectedBonus2(Math.floor(Math.random() * 15) + 1);
  };

  const handleClear = () => {
    setSelectedNumbers([]);
    setSelectedBonus1(null);
    setSelectedBonus2(null);
  };

  const handleAddToCart = () => {
    if (selectedNumbers.length === 6 && selectedBonus1 !== null && selectedBonus2 !== null) {
      onSelect(selectedNumbers, 'supermas');
      setSelectedNumbers([]);
      setSelectedBonus1(null);
      setSelectedBonus2(null);
    }
  };

  const isComplete = selectedNumbers.length === 6 && selectedBonus1 !== null && selectedBonus2 !== null;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">👑 Supermas - 6/40 + 2 Bonos</h2>
        <p className="text-purple-100">
          Selecciona 6 números (1-40) + 2 números Bono (1-12 y 1-15). Acierta 2+ bonos para ganar.
          Premio mayor: ¡$250,000+! (miércoles y sábados 20:55)
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
                  ? 'bg-purple-500 text-white border-2 border-purple-600'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-700 hover:border-purple-400'
                }
                ${selectedNumbers.length === 6 && !selectedNumbers.includes(num) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Selecciona Bono #1 (1-12)</h3>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
            <button
              key={`bonus1-${num}`}
              onClick={() => handleBonus1Click(num)}
              className={`w-full aspect-square rounded-lg font-semibold text-sm transition-all
                ${selectedBonus1 === num
                  ? 'bg-pink-500 text-white border-2 border-pink-600 ring-2 ring-pink-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-700 hover:border-pink-400'
                }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Selecciona Bono #2 (1-15)</h3>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
            <button
              key={`bonus2-${num}`}
              onClick={() => handleBonus2Click(num)}
              className={`w-full aspect-square rounded-lg font-semibold text-sm transition-all
                ${selectedBonus2 === num
                  ? 'bg-fuchsia-500 text-white border-2 border-fuchsia-600 ring-2 ring-fuchsia-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-700 hover:border-fuchsia-400'
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

      {(selectedNumbers.length > 0 || selectedBonus1 !== null || selectedBonus2 !== null) && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">✓ Selección</h3>
            {isComplete && <span className="text-sm font-semibold text-green-600 dark:text-green-400">¡Completo!</span>}
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">6 Números ({selectedNumbers.length}/6)</p>
              <div className="flex flex-wrap gap-2">
                {selectedNumbers.map((num) => (
                  <span key={num} className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {num}
                  </span>
                ))}
              </div>
            </div>
            {selectedBonus1 !== null && (
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Bono #1 (1-12)</p>
                <span className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold ring-2 ring-pink-300">
                  🎯 {selectedBonus1}
                </span>
              </div>
            )}
            {selectedBonus2 !== null && (
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Bono #2 (1-15)</p>
                <span className="bg-fuchsia-500 text-white px-4 py-2 rounded-full text-sm font-bold ring-2 ring-fuchsia-300">
                  🎯 {selectedBonus2}
                </span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-purple-200 dark:border-purple-800">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Precio</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">${supermasConfig?.price}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Premio máximo</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">¡$250,000+!</p>
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={handleAddToCart}
        disabled={!isComplete || isLoading}
        variant="default"
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold"
      >
        {isLoading
          ? '⏳ Procesando...'
          : isComplete
          ? `💳 Pagar Ahora - $${supermasConfig?.price}`
          : `Completa: 6 números (${selectedNumbers.length}/6) + 2 Bonos ${selectedBonus1 ? '✓' : ''} ${selectedBonus2 ? '✓' : ''}`}
      </Button>
    </div>
  );
}
