'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { gameConfig } from '@/lib/gameConfig';
import { GameType } from '@/types';

interface QuinielaGameProps {
  onSelect: (numbers: number[], modalidad: string) => void;
  isLoading?: boolean;
}

export function QuinielaGame({ onSelect, isLoading = false }: QuinielaGameProps) {
  const [digits, setDigits] = useState<(number | null)[]>([null, null, null]);
  const [modalidad, setModalidad] = useState('exacto');
  const game = gameConfig[GameType.QUINIELA];

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
      id: 'exacto',
      name: 'Exacto',
      description: 'Los 3 dígitos deben coincidir en el MISMO ORDEN exacto del sorteo',
      rules: 'Gana si tus 3 números aparecen en el mismo orden',
      prize: 200,
    },
    {
      id: 'mixto',
      name: 'Mixto',
      description: 'Los 3 dígitos pueden coincidir en CUALQUIER ORDEN',
      rules: 'Gana si tus 3 números aparecen (en cualquier orden)',
      prize: 30,
    },
    {
      id: 'combinado',
      name: 'Combinado',
      description: 'Necesitas que CUALQUIER 2 de tus 3 dígitos coincidan',
      rules: 'Gana si al menos 2 de tus números aparecen en el sorteo',
      prize: 5,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-2">{game.name}</h2>
        <p className="text-orange-100">{game.description}</p>
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
          <p className="text-sm text-gray-600">Precio Base</p>
          <p className="text-2xl font-bold text-gray-900">${game.pricePerTicket}</p>
        </div>
      </div>

      {/* Digit Input */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Ingresa tus 3 dígitos (0-9)</h3>

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
                className="w-16 h-16 text-center text-2xl font-bold border-2 border-orange-400 rounded-lg focus:outline-none focus:border-orange-600"
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

      {/* Modalidades con reglas detalladas */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Selecciona la modalidad</h3>
        <div className="grid grid-cols-1 gap-3">
          {modalidades.map((mod) => (
            <label
              key={mod.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                modalidad === mod.id
                  ? 'border-orange-600 bg-orange-50'
                  : 'border-gray-200 bg-white hover:border-orange-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="modalidad"
                  value={mod.id}
                  checked={modalidad === mod.id}
                  onChange={(e) => setModalidad(e.target.value)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{mod.name}</p>
                  <p className="text-sm text-gray-600">{mod.description}</p>
                  <p className="text-xs text-orange-700 mt-1 font-medium">✓ {mod.rules}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-orange-600">${mod.prize}</p>
                  <p className="text-xs text-gray-500">máximo</p>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Display Selected */}
      {isComplete && (
        <div className="bg-white border-2 border-orange-600 rounded-lg p-4">
          <p className="text-sm font-semibold text-gray-600 mb-3">Tu selección:</p>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {digits.map((d) => d).join('')}
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">{modalidades.find((m) => m.id === modalidad)?.name}</p>
                <p className="text-sm text-gray-600">
                  {modalidades.find((m) => m.id === modalidad)?.description}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-orange-600">
                ${game.pricePerTicket}
              </p>
              <p className="text-xs text-gray-500">por boleto</p>
              <p className="text-sm font-semibold text-gray-900 mt-2">
                Premio: ${modalidades.find((m) => m.id === modalidad)?.prize}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      <Button
        onClick={() => onSelect(numbers, modalidad)}
        disabled={!isComplete || isLoading}
        size="lg"
        className="w-full"
      >
        {isLoading ? '⏳ Procesando...' : '💳 Pagar Ahora'}
      </Button>
    </div>
  );
}
