'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { gameConfig } from '@/lib/gameConfig';
import { GameType } from '@/types';

interface Pega3GameProps {
  onSelect: (numbers: number[], modalidad: string) => void;
  isLoading?: boolean;
}

export function Pega3Game({ onSelect, isLoading = false }: Pega3GameProps) {
  const [digits, setDigits] = useState<(number | null)[]>([null, null, null]);
  const [modalidad, setModalidad] = useState('pega3');
  const game = gameConfig[GameType.PEGA3];

  const handleDigitChange = (index: number, value: string) => {
    const num = value === '' ? null : Math.min(9, Math.max(0, parseInt(value) || 0));
    const newDigits = [...digits];
    newDigits[index] = num;
    setDigits(newDigits);
  };

  const handleQuickPick = () => {
    setDigits([
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ]);
  };

  const handleClear = () => {
    setDigits([null, null, null]);
  };

  const isComplete = digits.every((d) => d !== null);
  const numbers = digits.filter((d) => d !== null) as number[];

  const modalidades = [
    {
      id: 'pega3',
      name: 'Pega 3',
      description: 'Aciertas todos los 3 dígitos en orden exacto',
      prize: 500,
    },
    {
      id: 'pega2',
      name: 'Pega 2',
      description: 'Aciertas 2 de los 3 dígitos en orden exacto',
      prize: 50,
    },
    {
      id: 'pega1',
      name: 'Pega 1',
      description: 'Aciertas 1 de los 3 dígitos en su posición',
      prize: 5,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-2">{game.name}</h2>
        <p className="text-red-100">{game.description}</p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Tipo de Juego</p>
          <p className="text-2xl font-bold text-gray-900">3 Dígitos</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Rango</p>
          <p className="text-2xl font-bold text-gray-900">0-9</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Precio</p>
          <p className="text-2xl font-bold text-gray-900">${game.pricePerTicket}</p>
        </div>
      </div>

      {/* Digit Input */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Ingresa tus dígitos</h3>

        <div className="flex gap-4 justify-center items-center">
          {digits.map((digit, index) => (
            <div key={index} className="flex flex-col items-center">
              <label className="text-sm text-gray-600 mb-2">Posición {index + 1}</label>
              <input
                type="number"
                min="0"
                max="9"
                value={digit ?? ''}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                placeholder="-"
                className="w-16 h-16 text-center text-2xl font-bold border-2 border-red-400 rounded-lg focus:outline-none focus:border-red-600"
              />
            </div>
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
            disabled={digits.every((d) => d === null)}
          >
            Limpiar
          </Button>
        </div>
      </div>

      {/* Modalidades */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Elige la modalidad de premio</h3>
        <div className="grid grid-cols-1 gap-3">
          {modalidades.map((mod) => (
            <label
              key={mod.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                modalidad === mod.id
                  ? 'border-red-600 bg-red-50'
                  : 'border-gray-200 bg-white hover:border-red-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="modalidad"
                    value={mod.id}
                    checked={modalidad === mod.id}
                    onChange={(e) => setModalidad(e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{mod.name}</p>
                    <p className="text-sm text-gray-600">{mod.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-600">${mod.prize}</p>
                  <p className="text-xs text-gray-500">si ganas</p>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Display Selected */}
      {isComplete && (
        <div className="bg-white border-2 border-red-600 rounded-lg p-4">
          <p className="text-sm font-semibold text-gray-600 mb-2">Tu selección:</p>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-red-600">
              {digits.map((d) => d).join('')}
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{modalidades.find((m) => m.id === modalidad)?.name}</p>
              <p className="text-sm text-gray-600">Premio: ${modalidades.find((m) => m.id === modalidad)?.prize}</p>
              <p className="text-sm text-gray-600">Costo: ${game.pricePerTicket}</p>
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      <Button
        onClick={() => onSelect(numbers, modalidad)}
        disabled={!isComplete || isLoading}
        size="lg"
        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold"
      >
        {isLoading ? '⏳ Procesando...' : '💳 Pagar Ahora'}
      </Button>

      {/* Game Description Section */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 text-white">
        <h3 className="text-2xl font-bold mb-4 text-center text-red-400">
          ¿Por qué jugar 🔴 Pega3Más?
        </h3>

        <div className="space-y-6">
          {/* Description */}
          <div>
            <p className="text-gray-200 mb-4">
              Pega3Más es un juego rápido y emocionante donde seleccionas 3 dígitos (0-9) 
              y tienes múltiples formas de ganar. El juego consiste en 51 bolas (0 al 50), 
              de los cuales ganas acertando con 3, 2 o 1 número. 
              Todos los premios se pagan en USD (USDT Crypto).
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="font-semibold text-red-400 mb-3">✨ Razones para Jugar:</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• 💰 Premios altos: hasta USD $30,000 con 3 números exactos</li>
              <li>• 🎯 3 formas diferentes de ganar (Pega 3, Pega 2, Pega 1)</li>
              <li>• ⚡ Juego rápido y simple de jugar</li>
              <li>• 📊 Costo mínimo de USD $10 por jugada</li>
              <li>• 🔐 Pagos seguros en criptomonedas (USDT)</li>
              <li>• ⏰ Sorteos diarios</li>
            </ul>
          </div>

          {/* Prize Table */}
          <div>
            <h4 className="font-semibold text-red-400 mb-3">🏆 Tabla de Premios:</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-white/10">
                    <th className="border border-white/20 p-2 text-left">Modalidad</th>
                    <th className="border border-white/20 p-2 text-left">Descripción</th>
                    <th className="border border-white/20 p-2 text-right">Premio por USD $10</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr className="hover:bg-white/5">
                    <td className="border border-white/20 p-2 font-semibold text-red-300">Pega 3</td>
                    <td className="border border-white/20 p-2">Aciertas los 3 dígitos exactos</td>
                    <td className="border border-white/20 p-2 text-right font-bold">USD $30,000.00</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="border border-white/20 p-2 font-semibold text-orange-300">Pega 2</td>
                    <td className="border border-white/20 p-2">Aciertas 2 de los 3 dígitos</td>
                    <td className="border border-white/20 p-2 text-right font-bold">USD $600.00</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="border border-white/20 p-2 font-semibold text-yellow-300">Pega 1</td>
                    <td className="border border-white/20 p-2">Aciertas 1 de los 3 dígitos</td>
                    <td className="border border-white/20 p-2 text-right font-bold">USD $60.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2 italic">
              Nota: Los premios mostrados son por USD $10 apostados. Aumenta tu apuesta para ganar más.
            </p>
          </div>

          {/* How to Win */}
          <div>
            <h4 className="font-semibold text-red-400 mb-3">🎯 Cómo Ganar:</h4>
            <ol className="space-y-2 text-sm text-gray-300">
              <li><strong>1.</strong> Selecciona 3 dígitos (0-9) - uno por cada posición</li>
              <li><strong>2.</strong> Elige tu modalidad de premio (Pega 3, Pega 2 o Pega 1)</li>
              <li><strong>3.</strong> Presiona "💳 Pagar Ahora" para ir directamente al checkout</li>
              <li><strong>4.</strong> Tu boleto será verificado contra el sorteo diario oficial</li>
              <li><strong>5.</strong> Ganas si aciertas los dígitos según tu modalidad elegida</li>
              <li><strong>6.</strong> Los premios se acreditan automáticamente en tu cuenta en USDT</li>
            </ol>
          </div>

          {/* Modalidades Info */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-red-500/20 border border-red-500/50 rounded p-3">
              <p className="text-red-400 font-semibold text-sm mb-1">Pega 3</p>
              <p className="text-xs text-gray-300">Máxima precisión = Máximo premio</p>
              <p className="text-red-300 font-bold mt-2">USD $30,000</p>
            </div>
            <div className="bg-orange-500/20 border border-orange-500/50 rounded p-3">
              <p className="text-orange-400 font-semibold text-sm mb-1">Pega 2</p>
              <p className="text-xs text-gray-300">2 aciertos = Premio medio</p>
              <p className="text-orange-300 font-bold mt-2">USD $600</p>
            </div>
            <div className="bg-yellow-500/20 border border-yellow-500/50 rounded p-3">
              <p className="text-yellow-400 font-semibold text-sm mb-1">Pega 1</p>
              <p className="text-xs text-gray-300">1 acierto = Premio seguro</p>
              <p className="text-yellow-300 font-bold mt-2">USD $60</p>
            </div>
          </div>

          {/* Price Info */}
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-300 text-sm">Precio mínimo por jugada</p>
                <p className="text-3xl font-bold text-red-400">USD $10</p>
              </div>
              <div className="text-right">
                <p className="text-gray-300 text-sm">Rango de Dígitos</p>
                <p className="font-semibold text-white">0 a 9</p>
                <p className="text-red-300 text-sm">3 posiciones</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
