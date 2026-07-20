'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { gameConfig } from '@/lib/gameConfig';
import { generateRandomNumbers } from '@/lib/numbers';
import { GameType } from '@/types';

interface KinoTVGameProps {
  onSelect: (numbers: number[]) => void;
  isLoading?: boolean;
}

export function KinoTVGame({ onSelect, isLoading = false }: KinoTVGameProps) {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const game = gameConfig[GameType.KINO_TV];
  const { minNumbers, maxNumbers, pricePerTicket } = game;

  const handleNumberClick = (num: number) => {
    const newSelected = selectedNumbers.includes(num)
      ? selectedNumbers.filter(n => n !== num)
      : selectedNumbers.length < maxNumbers
      ? [...selectedNumbers, num]
      : selectedNumbers;
    setSelectedNumbers(newSelected);
  };

  const handleQuickPick = () => {
    const randomNumbers = generateRandomNumbers(1, 80, maxNumbers);
    setSelectedNumbers(randomNumbers);
  };

  const handleClear = () => {
    setSelectedNumbers([]);
  };

  const isValid = selectedNumbers.length === maxNumbers;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white p-6 rounded-xl">
        <h2 className="text-3xl font-bold mb-2">{game.name}</h2>
        <p className="text-blue-100 text-lg">Selecciona exactamente 20 números • Premios Fijos Diarios</p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg text-white">
          <p className="text-sm text-gray-300">Números</p>
          <p className="text-2xl font-bold text-white">{maxNumbers}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg text-white">
          <p className="text-sm text-gray-300">Rango</p>
          <p className="text-2xl font-bold text-white">1-80</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg text-white">
          <p className="text-sm text-gray-300">Precio</p>
          <p className="text-2xl font-bold text-white">${pricePerTicket} USD</p>
        </div>
      </div>

      {/* Selection Progress */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-white text-lg">
            {selectedNumbers.length} / {maxNumbers} números seleccionados
          </span>
          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
            isValid
              ? 'bg-green-500/30 text-green-200 border border-green-500/50'
              : 'bg-blue-500/30 text-blue-200 border border-blue-500/50'
          }`}>
            {isValid ? '✓ Listo' : `Faltan ${maxNumbers - selectedNumbers.length}`}
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3 border border-white/20 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${(selectedNumbers.length / maxNumbers) * 100}%` }}
          />
        </div>
      </div>

      {/* Number Grid - 8x10 (80 numbers) */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Selecciona exactamente 20 números</h3>
        <div className="grid grid-cols-8 sm:grid-cols-10 gap-0">
          {Array.from({ length: 80 }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className={`aspect-square rounded-sm font-bold text-[10px] leading-none p-0.5 transition-all transform ${
                selectedNumbers.includes(num)
                  ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50 scale-105'
                  : selectedNumbers.length === maxNumbers
                  ? 'bg-white/5 text-gray-400 cursor-not-allowed opacity-50'
                  : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30 cursor-pointer'
              }`}
              disabled={selectedNumbers.length === maxNumbers && !selectedNumbers.includes(num)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Numbers Display */}
      {selectedNumbers.length > 0 && (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4">
          <p className="text-sm font-semibold text-gray-300 mb-3">Números seleccionados:</p>
          <div className="flex flex-wrap gap-2">
            {selectedNumbers
              .slice()
              .sort((a, b) => a - b)
              .map((num) => (
                <span
                  key={num}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full font-semibold text-sm"
                >
                  {num}
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Prize Info */}
      <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-lg p-4">
        <h4 className="font-semibold text-white mb-3">Tabla de Premios</h4>
        <div className="space-y-2 text-sm">
          {game.prizes.fixed.map((prize, idx) => (
            <div key={idx} className="flex justify-between text-gray-300">
              <span>
                {prize.matches === 0
                  ? 'CERO (0 números acertados)'
                  : `${prize.matches} número${prize.matches > 1 ? 's' : ''} acertado${prize.matches > 1 ? 's' : ''}`}
              </span>
              <span className={`font-bold ${
                prize.matches === 10
                  ? 'text-green-400'
                  : prize.matches === 9
                  ? 'text-blue-400'
                  : prize.matches >= 7
                  ? 'text-cyan-400'
                  : 'text-gray-400'
              }`}>
                ${typeof prize.fixed === 'number' ? prize.fixed.toFixed(2) : '0.00'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Button
          onClick={handleQuickPick}
          variant="outline"
          size="lg"
          className="text-white border-white/30 hover:bg-white/10"
        >
          🎰 Quick Pick
        </Button>
        <Button
          onClick={handleClear}
          variant="ghost"
          size="lg"
          disabled={selectedNumbers.length === 0}
          className="text-white hover:bg-white/10"
        >
          Limpiar
        </Button>
        <Button
          onClick={() => onSelect(selectedNumbers)}
          disabled={!isValid || isLoading}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold"
        >
          {isLoading ? '⏳ Procesando...' : '💳 Pagar Ahora'}
        </Button>
      </div>

      {/* Game Description Section */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 text-white">
        <h3 className="text-2xl font-bold mb-4 text-center text-blue-400">
          ¿Por qué jugar 🎬 KinoTV?
        </h3>

        <div className="space-y-6">
          {/* Description */}
          <div>
            <p className="text-gray-200 mb-4">
              KinoTV es el juego favorito de LEIDSA con los premios más grandes. 
              Selecciona 10 números del 1 al 80 y gana premios fijos diarios. 
              Cada noche, 20 números ganadores son extraídos en 4 rondas diferentes. 
              Puedes ganar dinero haciendo coincidir desde 5 hasta 10 números. 
              Todos los premios se pagan en USD (USDT Crypto).
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="font-semibold text-blue-400 mb-3">✨ Razones para Jugar:</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• 💰 Premio mayor de hasta $25,000 USD</li>
              <li>• 🎯 7 diferentes niveles de premios (aciertos de 5 a 10)</li>
              <li>• 📊 Premios fijos garantizados en cada categoría</li>
              <li>• 🎰 Selecciona tus números o usa Quick Pick automático</li>
              <li>• 🔐 Pagos seguros en criptomonedas (USDT)</li>
              <li>• ⏰ Sorteos diarios a las 20:30 (8:30 PM)</li>
            </ul>
          </div>

          {/* Prize Table */}
          <div>
            <h4 className="font-semibold text-blue-400 mb-3">🏆 Tabla de Premios:</h4>
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
                    <td className="border border-white/20 p-2">10 números</td>
                    <td className="border border-white/20 p-2 text-right font-semibold">$25,000.00</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="border border-white/20 p-2">9 números</td>
                    <td className="border border-white/20 p-2 text-right">$150.00</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="border border-white/20 p-2">8 números</td>
                    <td className="border border-white/20 p-2 text-right">$10.00</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="border border-white/20 p-2">7 números</td>
                    <td className="border border-white/20 p-2 text-right">$1.00</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="border border-white/20 p-2">6 números</td>
                    <td className="border border-white/20 p-2 text-right">$0.30</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="border border-white/20 p-2">5 números</td>
                    <td className="border border-white/20 p-2 text-right">$0.06</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="border border-white/20 p-2">CERO (0 aciertos)</td>
                    <td className="border border-white/20 p-2 text-right">$0.08</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2 italic">
              Nota: Los premios mostrados son fijos por categoría de aciertos.
            </p>
          </div>

          {/* How to Win */}
          <div>
            <h4 className="font-semibold text-blue-400 mb-3">🎯 Cómo Ganar:</h4>
            <ol className="space-y-2 text-sm text-gray-300">
              <li><strong>1.</strong> Selecciona exactamente 10 números entre 1 y 80</li>
              <li><strong>2.</strong> Tu boleto será verificado contra las 4 rondas de sorteo del día</li>
              <li><strong>3.</strong> Ganas si aciertas mínimo 5 números correctos</li>
              <li><strong>4.</strong> Los premios se acreditan automáticamente en tu cuenta en USDT</li>
            </ol>
          </div>

          {/* Price Info */}
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-300 text-sm">Precio por boleto</p>
                <p className="text-3xl font-bold text-blue-400">${pricePerTicket}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-300 text-sm">Sorteo Diario</p>
                <p className="font-semibold text-white">4 rondas</p>
                <p className="text-blue-300 text-sm">20:30 (8:30 PM)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
