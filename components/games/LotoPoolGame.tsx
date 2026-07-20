'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { gameConfig } from '@/lib/gameConfig';
import { generateRandomNumbers } from '@/lib/numbers';
import { GameType } from '@/types';

interface LotoPoolGameProps {
  onSelect: (numbers: number[]) => void;
  isLoading?: boolean;
}

export function LotoPoolGame({ onSelect, isLoading = false }: LotoPoolGameProps) {
  const [selectedNumbers, setSelectedNumbers] = useState<Set<number>>(new Set());
  const game = gameConfig[GameType.LOTO_POOL];
  const { minNumbers, maxNumbers } = game;

  const handleNumberClick = (num: number) => {
    const newSelected = new Set(selectedNumbers);
    if (newSelected.has(num)) {
      newSelected.delete(num);
    } else {
      if (newSelected.size < maxNumbers) {
        newSelected.add(num);
      }
    }
    setSelectedNumbers(newSelected);
  };

  const handleQuickPick = () => {
    const [min, max] = game.numberRange;
    const randomNumbers = generateRandomNumbers(min, max, minNumbers);
    setSelectedNumbers(new Set(randomNumbers));
  };

  const handleClear = () => {
    setSelectedNumbers(new Set());
  };

  const isFull = selectedNumbers.size === minNumbers;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-2">{game.name}</h2>
        <p className="text-green-100">{game.description}</p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Selecciona</p>
          <p className="text-2xl font-bold text-gray-900">{minNumbers} números</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Del 1 al</p>
          <p className="text-2xl font-bold text-gray-900">{game.numberRange[1]}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Precio</p>
          <p className="text-2xl font-bold text-gray-900">${game.pricePerTicket}</p>
        </div>
      </div>

      {/* Number Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Selecciona tus números</h3>
          <div className="flex gap-2">
            <Button
              onClick={handleQuickPick}
              variant="outline"
              size="sm"
            >
              Quick Pick
            </Button>
            <Button
              onClick={handleClear}
              variant="ghost"
              size="sm"
              disabled={selectedNumbers.size === 0}
            >
              Limpiar
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-green-900">
              {selectedNumbers.size} / {minNumbers} números seleccionados
            </span>
            <span className="text-sm text-green-700">
              {isFull ? '✓ Listo para jugar' : `Falta${minNumbers - selectedNumbers.size === 1 ? '' : 'n'} ${minNumbers - selectedNumbers.size}`}
            </span>
          </div>
          <div className="w-full bg-green-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all"
              style={{ width: `${(selectedNumbers.size / minNumbers) * 100}%` }}
            />
          </div>
        </div>

        {/* Number Grid */}
        <div className="grid grid-cols-8 gap-1">
          {Array.from({ length: 31 }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className={`aspect-square rounded-lg font-semibold text-xs transition-all ${
                selectedNumbers.has(num)
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              } ${selectedNumbers.size === minNumbers && !selectedNumbers.has(num) ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={selectedNumbers.size === minNumbers && !selectedNumbers.has(num)}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Selected Numbers Display */}
        {selectedNumbers.size > 0 && (
          <div className="bg-white border-2 border-green-600 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-600 mb-2">Números seleccionados:</p>
            <div className="flex flex-wrap gap-2">
              {Array.from(selectedNumbers)
                .sort((a, b) => a - b)
                .map((num) => (
                  <span
                    key={num}
                    className="bg-green-100 text-green-900 px-3 py-1 rounded-full font-semibold text-sm"
                  >
                    {num}
                  </span>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <Button
        onClick={() => onSelect(Array.from(selectedNumbers))}
        disabled={!isFull || isLoading}
        size="lg"
        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold"
      >
        {isLoading ? '⏳ Procesando...' : '💳 Pagar Ahora'}
      </Button>

      {/* Game Description Section */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 text-white">
        <h3 className="text-2xl font-bold mb-4 text-center text-green-400">
          ¿Por qué jugar 🏊 Loto Pool?
        </h3>

        <div className="space-y-6">
          {/* Description */}
          <div>
            <p className="text-gray-200 mb-4">
              Loto Pool es un juego emocionante donde seleccionas 7 números del 1 al 31. 
              Con un rango más pequeño, tienes mayores probabilidades de ganar. 
              Los sorteos son diarios y los premios pueden alcanzar cifras significativas. 
              Todos los premios se pagan en USD (USDT Crypto).
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="font-semibold text-green-400 mb-3">✨ Razones para Jugar:</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• 💰 Premios progresivos con bote acumulado</li>
              <li>• 🎯 Solo 7 números del 1 al 31 (menor rango = más oportunidades)</li>
              <li>• 📊 Múltiples categorías de premios por aciertos</li>
              <li>• 🎰 Selecciona tus números o usa Quick Pick automático</li>
              <li>• 🔐 Pagos seguros en criptomonedas (USDT)</li>
              <li>• ⏰ Sorteos diarios a las 21:00 (9:00 PM)</li>
            </ul>
          </div>

          {/* Prize Table */}
          <div>
            <h4 className="font-semibold text-green-400 mb-3">🏆 Estructura de Premios:</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-white/10">
                    <th className="border border-white/20 p-2 text-left">Aciertos</th>
                    <th className="border border-white/20 p-2 text-right">Premio</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr className="hover:bg-white/5">
                    <td className="border border-white/20 p-2">7 números (Pleno)</td>
                    <td className="border border-white/20 p-2 text-right font-semibold">Bote Progresivo</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="border border-white/20 p-2">6 números</td>
                    <td className="border border-white/20 p-2 text-right">$5,000.00</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="border border-white/20 p-2">5 números</td>
                    <td className="border border-white/20 p-2 text-right">$500.00</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="border border-white/20 p-2">4 números</td>
                    <td className="border border-white/20 p-2 text-right">$100.00</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="border border-white/20 p-2">3 números</td>
                    <td className="border border-white/20 p-2 text-right">$20.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Win */}
          <div>
            <h4 className="font-semibold text-green-400 mb-3">🎯 Cómo Ganar:</h4>
            <ol className="space-y-2 text-sm text-gray-300">
              <li><strong>1.</strong> Selecciona exactamente 7 números entre 1 y 31</li>
              <li><strong>2.</strong> Tu boleto será verificado contra el sorteo diario oficial</li>
              <li><strong>3.</strong> Ganas si aciertas mínimo 3 números correctos</li>
              <li><strong>4.</strong> Los premios se acreditan automáticamente en tu cuenta en USDT</li>
            </ol>
          </div>

          {/* Price Info */}
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-300 text-sm">Precio por boleto</p>
                <p className="text-3xl font-bold text-green-400">${game.pricePerTicket}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-300 text-sm">Sorteo</p>
                <p className="font-semibold text-white">Diario</p>
                <p className="text-green-300 text-sm">21:00 (9:00 PM)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
