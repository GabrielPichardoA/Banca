'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { gameConfig } from '@/lib/gameConfig';
import { GameType } from '@/types';

interface QuinielaSubGameProps {
  gameType?: GameType;
  onSelect: (numbers: number[], modalidad: string) => void;
  isLoading?: boolean;
}

export function QuinielaSubGame({ gameType = GameType.QUINIELA, onSelect, isLoading = false }: QuinielaSubGameProps) {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const game = gameConfig[gameType];
  const prizes = game.quinielaPalePrizes?.quiniela;

  const handleQuickPick = () => {
    setSelectedNumber(Math.floor(Math.random() * 100));
  };

  const handleClear = () => {
    setSelectedNumber(null);
  };

  const isComplete = selectedNumber !== null;

  return (
    <div className="space-y-6">
      {/* Info Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Números a Seleccionar</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">1</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Rango</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">0-99</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Unidad de Apuesta</p>
          <p className="text-2xl font-bold text-orange-600">${game.pricePerTicket}</p>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg border-l-4 border-blue-600">
        <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">¿Cómo ganar en Quiniela?</p>
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          El sorteo saca 3 números ganadores: 1er, 2do y 3er premio. Ganas si tu número coincide con
          cualquiera de las 3 posiciones, y el premio depende de cuál sea.
        </p>
      </div>

      {/* Number Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Selecciona tu número (0-99)
        </h3>

        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {Array.from({ length: 100 }, (_, i) => i).map((num) => (
            <button
              key={num}
              onClick={() => setSelectedNumber(num)}
              className={`p-2 rounded-lg font-bold text-sm transition-all ${
                selectedNumber === num
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-orange-200 dark:hover:bg-orange-700'
              }`}
            >
              {num < 10 ? `0${num}` : num}
            </button>
          ))}
        </div>

        <div className="flex gap-2 justify-center">
          <Button onClick={handleQuickPick} variant="outline" size="sm">
            Quick Pick
          </Button>
          <Button onClick={handleClear} variant="ghost" size="sm" disabled={selectedNumber === null}>
            Limpiar
          </Button>
        </div>
      </div>

      {/* Payout Table */}
      {prizes && (
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white dark:bg-gray-800 border-2 border-orange-500 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">1er Premio</p>
            <p className="text-xl font-bold text-orange-600">{prizes.first}x</p>
          </div>
          <div className="bg-white dark:bg-gray-800 border-2 border-orange-300 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">2do Premio</p>
            <p className="text-xl font-bold text-orange-500">{prizes.second}x</p>
          </div>
          <div className="bg-white dark:bg-gray-800 border-2 border-orange-200 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">3er Premio</p>
            <p className="text-xl font-bold text-orange-400">{prizes.third}x</p>
          </div>
        </div>
      )}

      {/* Display Selected */}
      {isComplete && prizes && (
        <div className="bg-white dark:bg-gray-800 border-2 border-orange-600 rounded-lg p-4">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Tu selección:</p>
          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold text-orange-600">
              {selectedNumber! < 10 ? `0${selectedNumber}` : selectedNumber}
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-orange-600">${game.pricePerTicket} por unidad</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mt-2">
                Si sale 1ero: ${(game.pricePerTicket * prizes.first).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      <Button
        onClick={() => onSelect([selectedNumber as number], 'quiniela')}
        disabled={!isComplete || isLoading}
        size="lg"
        className="w-full"
      >
        {isLoading ? '⏳ Procesando...' : '💳 Pagar Ahora'}
      </Button>
    </div>
  );
}
