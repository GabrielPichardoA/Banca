'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { gameConfig } from '@/lib/gameConfig';
import { GameType } from '@/types';

interface TripleGameProps {
  gameType?: GameType;
  onSelect: (numbers: number[], modalidad: string) => void;
  isLoading?: boolean;
}

export function TripleGame({ gameType = GameType.QUINIELA, onSelect, isLoading = false }: TripleGameProps) {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const game = gameConfig[gameType];
  const prizes = game.quinielaPalePrizes?.tripleta;

  const handleNumberSelect = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== num));
    } else if (selectedNumbers.length < 3) {
      setSelectedNumbers([...selectedNumbers, num].sort((a, b) => a - b));
    }
  };

  const handleQuickPick = () => {
    const picked: number[] = [];
    while (picked.length < 3) {
      const num = Math.floor(Math.random() * 100);
      if (!picked.includes(num)) {
        picked.push(num);
      }
    }
    setSelectedNumbers(picked.sort((a, b) => a - b));
  };

  const handleClear = () => {
    setSelectedNumbers([]);
  };

  const isComplete = selectedNumbers.length === 3;

  return (
    <div className="space-y-6">
      {/* Info Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Números a Seleccionar</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Rango</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">0-99</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Unidad de Apuesta</p>
          <p className="text-2xl font-bold text-red-600">${game.pricePerTicket}</p>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg border-l-4 border-blue-600">
        <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">¿Cómo ganar en Tripleta?</p>
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          Selecciona 3 números. Si los 3 coinciden con el 1er, 2do y 3er premio del sorteo ganas el
          premio mayor; si aciertas solo 2 de las 3 posiciones, ganas un premio menor.
        </p>
      </div>

      {/* Number Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Selecciona 3 números (0-99)
        </h3>

        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {Array.from({ length: 100 }, (_, i) => i).map((num) => (
            <button
              key={num}
              onClick={() => handleNumberSelect(num)}
              className={`p-2 rounded-lg font-bold text-sm transition-all ${
                selectedNumbers.includes(num)
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-red-200 dark:hover:bg-red-700'
              } ${selectedNumbers.length === 3 && !selectedNumbers.includes(num) ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={selectedNumbers.length === 3 && !selectedNumbers.includes(num)}
            >
              {num < 10 ? `0${num}` : num}
            </button>
          ))}
        </div>

        <div className="flex gap-2 justify-center">
          <Button onClick={handleQuickPick} variant="outline" size="sm">
            Quick Pick
          </Button>
          <Button onClick={handleClear} variant="ghost" size="sm" disabled={selectedNumbers.length === 0}>
            Limpiar
          </Button>
        </div>
      </div>

      {/* Payout Table */}
      {prizes && (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-gray-800 border-2 border-red-500 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Aciertas los 3 (3/3)</p>
            <p className="text-xl font-bold text-red-600">{prizes.allThree.toLocaleString()}x</p>
          </div>
          <div className="bg-white dark:bg-gray-800 border-2 border-red-300 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Aciertas 2 de 3</p>
            <p className="text-xl font-bold text-red-500">{prizes.twoOfThree}x</p>
          </div>
        </div>
      )}

      {/* Display Selected */}
      {isComplete && prizes && (
        <div className="bg-white dark:bg-gray-800 border-2 border-red-600 rounded-lg p-4">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Tu selección:</p>
          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold text-red-600">
              {selectedNumbers.map((n) => (n < 10 ? `0${n}` : n)).join('-')}
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-red-600">${game.pricePerTicket} por unidad</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mt-2">
                Máximo: ${(game.pricePerTicket * prizes.allThree).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      <Button
        onClick={() => onSelect(selectedNumbers, 'tripleta')}
        disabled={!isComplete || isLoading}
        size="lg"
        className="w-full"
      >
        {isLoading ? '⏳ Procesando...' : '💳 Pagar Ahora'}
      </Button>
    </div>
  );
}
