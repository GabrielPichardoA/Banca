'use client';

import { useState } from 'react';
import { gameConfig } from '@/lib/gameConfig';
import { GameType } from '@/types';
import { QuinielaSubGame } from './QuinielaSubGame';
import { PaleGame } from './PaleGame';
import { TripleGame } from './TripleGame';
import { SuperPaleGame } from './SuperPaleGame';

interface QuinielaPaleSelectorProps {
  gameType?: GameType;
  onSelect: (numbers: number[], modalidad: string, subModality?: string) => void;
  isLoading?: boolean;
}

export function QuinielaPaleSelector({ gameType = GameType.QUINIELA, onSelect, isLoading = false }: QuinielaPaleSelectorProps) {
  const [selectedModality, setSelectedModality] = useState<string | null>(null);
  const game = gameConfig[gameType];
  const prizes = game.quinielaPalePrizes;
  // Super Pale is Leidsa-exclusive (bets against Leidsa + Lotería Nacional's draws together)
  const hasSuperPale = gameType === GameType.QUINIELA;

  if (selectedModality) {
    return (
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSelectedModality(null)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            ← Atrás
          </button>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {selectedModality === 'quiniela' && 'Quiniela'}
            {selectedModality === 'pale' && 'Pale'}
            {selectedModality === 'tripleta' && 'Tripleta'}
            {selectedModality === 'super-pale' && 'Super Pale'}
          </h2>
        </div>

        {/* Render appropriate component based on modality */}
        {selectedModality === 'quiniela' && (
          <QuinielaSubGame gameType={gameType} onSelect={onSelect} isLoading={isLoading} />
        )}
        {selectedModality === 'pale' && (
          <PaleGame gameType={gameType} onSelect={onSelect} isLoading={isLoading} />
        )}
        {selectedModality === 'tripleta' && (
          <TripleGame gameType={gameType} onSelect={onSelect} isLoading={isLoading} />
        )}
        {selectedModality === 'super-pale' && (
          <SuperPaleGame onSelect={onSelect} isLoading={isLoading} />
        )}
      </div>
    );
  }

  // Main selector view
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-2">{game?.name}</h2>
        <p className="text-purple-100">{game?.description}</p>
      </div>

      {/* Modality Cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Elige tu modalidad favorita
        </h3>

        <div className={`grid grid-cols-1 md:grid-cols-2 ${hasSuperPale ? '' : 'lg:grid-cols-3'} gap-4`}>
          {/* QUINIELA Card */}
          <button
            onClick={() => setSelectedModality('quiniela')}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-orange-600 text-left"
          >
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Quiniela</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              Apuesta 1 número (0-99). Gana según en qué posición del sorteo salga.
            </p>
            {prizes && (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500">Números</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">1</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Rango</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">0-99</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">1er Premio</p>
                  <p className="text-lg font-bold text-orange-600">{prizes.quiniela.first}x</p>
                </div>
              </div>
            )}
          </button>

          {/* PALE Card */}
          <button
            onClick={() => setSelectedModality('pale')}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-green-600 text-left"
          >
            <div className="text-4xl mb-3">🎪</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pale</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              Apuesta 2 números (0-99). Gana si coinciden con 2 de las 3 posiciones del sorteo.
            </p>
            {prizes && (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500">Números</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">2</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Rango</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">0-99</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Máximo</p>
                  <p className="text-lg font-bold text-green-600">{prizes.pale.firstSecond}x</p>
                </div>
              </div>
            )}
          </button>

          {/* TRIPLETA Card */}
          <button
            onClick={() => setSelectedModality('tripleta')}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-red-600 text-left"
          >
            <div className="text-4xl mb-3">🎲</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Tripleta</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              Apuesta 3 números (0-99). Gana acertando 2 o 3 de las posiciones del sorteo.
            </p>
            {prizes && (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500">Números</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">3</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Rango</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">0-99</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Máximo</p>
                  <p className="text-lg font-bold text-red-600">{prizes.tripleta.allThree.toLocaleString()}x</p>
                </div>
              </div>
            )}
          </button>

          {/* SUPER PALE Card — Leidsa only */}
          {hasSuperPale && (
            <button
              onClick={() => setSelectedModality('super-pale')}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-yellow-600 text-left"
            >
              <div className="text-4xl mb-3">👑</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Super Pale</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                Acierta el 1er premio de Leidsa Y el 1er premio de Lotería Nacional a la vez.
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500">Números</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">2</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Rango</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">0-99</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Premio Máx</p>
                  <p className="text-lg font-bold text-yellow-600">$667</p>
                </div>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Game Description Section */}
      {prizes && (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 text-white">
          <h3 className="text-2xl font-bold mb-4 text-center text-purple-400">
            Más Sobre {game.name}
          </h3>

          <div className="space-y-6">
            <div>
              <p className="text-gray-200 mb-4">
                Cada sorteo saca 3 números ganadores (00-99): 1er, 2do y 3er premio. Elige Quiniela,
                Pale o Tripleta según cuántos números quieras apostar. Todos los premios se pagan en
                USD (USDT Crypto).
              </p>
            </div>

            {/* Quiniela */}
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-semibold text-orange-400 mb-3 text-lg">🎯 Quiniela</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Apuesta 1 número (00-99)</li>
                <li>• 1er premio: {prizes.quiniela.first}x tu apuesta</li>
                <li>• 2do premio: {prizes.quiniela.second}x tu apuesta</li>
                <li>• 3er premio: {prizes.quiniela.third}x tu apuesta</li>
              </ul>
            </div>

            {/* Pale */}
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-green-400 mb-3 text-lg">🎪 Pale</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Apuesta 2 números (00-99)</li>
                <li>• 1er + 2do o 1er + 3er premio: {prizes.pale.firstSecond}x tu apuesta</li>
                <li>• 2do + 3er premio: {prizes.pale.secondThird}x tu apuesta</li>
              </ul>
            </div>

            {/* Tripleta */}
            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="font-semibold text-red-400 mb-3 text-lg">🎲 Tripleta</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Apuesta 3 números (00-99)</li>
                <li>• Aciertas los 3: {prizes.tripleta.allThree.toLocaleString()}x tu apuesta</li>
                <li>• Aciertas 2 de 3: {prizes.tripleta.twoOfThree}x tu apuesta</li>
              </ul>
            </div>

            {hasSuperPale && (
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold text-yellow-400 mb-3 text-lg">👑 Super Pale</h4>
                <p className="text-gray-300 text-sm">
                  Exclusivo de Leidsa: acierta el 1er premio de Leidsa Y el 1er premio de Lotería
                  Nacional a la vez. Premio fijo de hasta $667 USD.
                </p>
              </div>
            )}

            {/* How to Play */}
            <div>
              <h4 className="font-semibold text-purple-400 mb-3">🎯 Cómo Jugar:</h4>
              <ol className="space-y-2 text-sm text-gray-300">
                <li><strong>1.</strong> Selecciona la modalidad que prefieres</li>
                <li><strong>2.</strong> Elige tus números según las reglas de cada juego</li>
                <li><strong>3.</strong> Presiona &quot;💳 Pagar Ahora&quot; para ir directamente al checkout</li>
                <li><strong>4.</strong> Tu boleto será verificado contra el sorteo oficial</li>
                <li><strong>5.</strong> Los premios se acreditan automáticamente en tu cuenta en USDT</li>
              </ol>
            </div>

            {/* Price Info */}
            <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/50 rounded-lg p-4">
              <p className="text-gray-300 text-sm text-center">
                Unidad de apuesta: <span className="font-bold text-white">${game.pricePerTicket}</span> — aumenta
                la cantidad para apostar más y ganar proporcionalmente más.
              </p>
              <p className="text-gray-400 text-sm mt-2 text-center">
                Sorteos: {game.drawSchedule.times.join(', ')} • Premios en USD (USDT Crypto)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Info section */}
      <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
        <p className="text-blue-900 dark:text-blue-100 text-sm">
          ℹ️ Los premios varían según la modalidad y la posición acertada (1er, 2do o 3er premio).
          Elige la que más te guste y aumenta tus posibilidades de ganar.
        </p>
      </div>
    </div>
  );
}
