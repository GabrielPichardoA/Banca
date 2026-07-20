'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface SuperPaleGameProps {
  onSelect: (numbers: number[], modalidad: string) => void;
  isLoading?: boolean;
}

// Super Pale is Leidsa-exclusive: it requires matching the 1er premio of Leidsa's own
// Pale AND the 1er premio of Lotería Nacional's Pale at once (RD$1,000,000 ≈ $667 USD
// fixed prize), so it doesn't fit the per-bank position-based prize table.
const SUPER_PALE_PRICE = 5;
const SUPER_PALE_MAX_PRIZE = 667;

export function SuperPaleGame({ onSelect, isLoading = false }: SuperPaleGameProps) {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const config = { price: SUPER_PALE_PRICE, maxPrize: SUPER_PALE_MAX_PRIZE, minNumbers: 2 };

  const handleNumberSelect = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== num));
    } else if (selectedNumbers.length < 2) {
      setSelectedNumbers([...selectedNumbers, num].sort((a, b) => a - b));
    }
  };

  const handleQuickPick = () => {
    const picked: number[] = [];
    while (picked.length < 2) {
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

  const isComplete = selectedNumbers.length === 2;

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white p-6 rounded-lg">
        <h3 className="text-2xl font-bold mb-2">Super Pale - ¡El Premio Mayor!</h3>
        <p className="text-yellow-100">
          Selecciona 2 números exactos y gana hasta ${config?.maxPrize} USD
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Números a Seleccionar</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {config?.minNumbers}
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Rango</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">0-99</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Precio</p>
          <p className="text-2xl font-bold text-yellow-600">${config?.price}</p>
        </div>
      </div>

      {/* How to Win */}
      <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg border-l-4 border-blue-600">
        <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          ¿Cómo ganar en Super Pale?
        </p>
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          Debes acertar el primer número sorteado en LEIDSA Pale Y el primer número sorteado en 
          Lotería Nacional Pale. Ambos números deben coincidir exactamente en tu selección.
        </p>
      </div>

      {/* Number Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Selecciona 2 números (0-99)
        </h3>

        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {Array.from({ length: 100 }, (_, i) => i).map((num) => (
            <button
              key={num}
              onClick={() => handleNumberSelect(num)}
              className={`p-2 rounded-lg font-bold text-sm transition-all ${
                selectedNumbers.includes(num)
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-yellow-200 dark:hover:bg-yellow-700'
              } ${selectedNumbers.length === 2 && !selectedNumbers.includes(num) ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={selectedNumbers.length === 2 && !selectedNumbers.includes(num)}
            >
              {num < 10 ? `0${num}` : num}
            </button>
          ))}
        </div>

        <div className="flex gap-2 justify-center">
          <Button onClick={handleQuickPick} variant="outline" size="sm">
            Quick Pick
          </Button>
          <Button
            onClick={handleClear}
            variant="ghost"
            size="sm"
            disabled={selectedNumbers.length === 0}
          >
            Limpiar
          </Button>
        </div>
      </div>

      {/* Display Selected */}
      {isComplete && (
        <div className="bg-white dark:bg-gray-800 border-2 border-yellow-600 rounded-lg p-4">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
            Tu selección:
          </p>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold text-yellow-600 mb-2">
                {selectedNumbers.map((n) => (n < 10 ? `0${n}` : n)).join(', ')}
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Super Pale - 2 números exactos
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Gana si ambos números coinciden exactamente
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-yellow-600">${config?.price}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">por boleto</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mt-2">
                Premio: ${config?.maxPrize}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      <Button
        onClick={() => onSelect(selectedNumbers, 'super-pale')}
        disabled={!isComplete || isLoading}
        size="lg"
        className="w-full"
      >
        {isLoading ? '⏳ Procesando...' : '💳 Pagar Ahora'}
      </Button>
    </div>
  );
}
