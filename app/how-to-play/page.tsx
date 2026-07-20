'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GAMES_CONFIG } from '@/lib/gameConfig';
import { GameType } from '@/types';

// Full class strings (not interpolated) so Tailwind's scanner picks them up
const THEME = {
  orange: {
    text: 'text-orange-300',
    subtext: 'text-orange-200',
    box: 'bg-orange-500/20 dark:bg-orange-500/10 border-orange-500/30 dark:border-orange-500/20',
  },
  green: {
    text: 'text-green-300',
    subtext: 'text-green-200',
    box: 'bg-green-500/20 dark:bg-green-500/10 border-green-500/30 dark:border-green-500/20',
  },
  blue: {
    text: 'text-blue-300',
    subtext: 'text-blue-200',
    box: 'bg-blue-500/20 dark:bg-blue-500/10 border-blue-500/30 dark:border-blue-500/20',
  },
  red: {
    text: 'text-red-300',
    subtext: 'text-red-200',
    box: 'bg-red-500/20 dark:bg-red-500/10 border-red-500/30 dark:border-red-500/20',
  },
  amber: {
    text: 'text-amber-300',
    subtext: 'text-amber-200',
    box: 'bg-amber-500/20 dark:bg-amber-500/10 border-amber-500/30 dark:border-amber-500/20',
  },
} as const;

// Order + emoji shown in the game picker dropdown
const GAME_OPTIONS: { type: GameType; emoji: string }[] = [
  { type: GameType.LOTO, emoji: '🎰' },
  { type: GameType.KINO_TV, emoji: '🎮' },
  { type: GameType.LOTO_POOL, emoji: '🏊' },
  { type: GameType.QUINIELA, emoji: '🎪' },
  { type: GameType.LOTERIA_NACIONAL, emoji: '🍀' },
  { type: GameType.LOTEKA, emoji: '🔵' },
  { type: GameType.LA_SUERTE, emoji: '🔴' },
  { type: GameType.LOTERIA_REAL, emoji: '🟡' },
  { type: GameType.PEGA3, emoji: '🔢' },
];

interface QuinielaPaleBankSectionProps {
  gameType: GameType;
  emoji: string;
  theme: keyof typeof THEME;
  schedule: string;
  intro: string;
  showSuperPale?: boolean;
}

function QuinielaPaleBankSection({ gameType, emoji, theme, schedule, intro, showSuperPale }: QuinielaPaleBankSectionProps) {
  const game = GAMES_CONFIG[gameType];
  const prizes = game.quinielaPalePrizes!;
  const t = THEME[theme];

  return (
    <section className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-lg p-8 shadow-2xl border border-white/20 dark:border-white/10">
      <h2 className="text-2xl font-bold text-white mb-4">
        {emoji} {game.name}
      </h2>
      <p className="text-gray-300 mb-6">{intro}</p>

      <div className="mb-6 p-3 rounded-lg bg-white/5 border border-white/10">
        <p className="text-sm text-gray-300">
          📅 <strong>Sorteo:</strong> {schedule} &nbsp;·&nbsp; 💵 <strong>Unidad de apuesta:</strong> ${game.pricePerTicket} (aumenta la cantidad para apostar más)
        </p>
      </div>

      {/* QUINIELA */}
      <div className="mb-8 border-b border-white/10 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🎯</span>
          <h3 className="text-xl font-bold text-white">Quiniela</h3>
        </div>
        <p className="text-gray-300 mb-4">
          Apuesta a UN número (00-99). El sorteo saca 3 números ganadores — 1er, 2do y 3er premio —
          y ganas según en cuál de las 3 posiciones cae tu número.
        </p>
        <div className={`${t.box} p-4 rounded-lg space-y-2 border`}>
          <p className={`font-semibold ${t.text}`}>1er premio: {prizes.quiniela.first}x tu apuesta</p>
          <p className={`font-semibold ${t.text}`}>2do premio: {prizes.quiniela.second}x tu apuesta</p>
          <p className={`font-semibold ${t.text}`}>3er premio: {prizes.quiniela.third}x tu apuesta</p>
        </div>
      </div>

      {/* PALE */}
      <div className="mb-8 border-b border-white/10 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🎪</span>
          <h3 className="text-xl font-bold text-white">Pale</h3>
        </div>
        <p className="text-gray-300 mb-4">
          Apuesta a DOS números (00-99). Ganas si ambos coinciden con 2 de las 3 posiciones del
          sorteo, sin importar el orden.
        </p>
        <div className={`${t.box} p-4 rounded-lg space-y-2 border`}>
          <p className={`font-semibold ${t.text}`}>1er + 2do premio: {prizes.pale.firstSecond}x tu apuesta</p>
          <p className={`font-semibold ${t.text}`}>1er + 3er premio: {prizes.pale.firstThird}x tu apuesta</p>
          <p className={`font-semibold ${t.text}`}>2do + 3er premio: {prizes.pale.secondThird}x tu apuesta</p>
        </div>
      </div>

      {/* TRIPLETA */}
      <div className={showSuperPale ? 'mb-8 border-b border-white/10 pb-8' : 'mb-2'}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🎲</span>
          <h3 className="text-xl font-bold text-white">Tripleta</h3>
        </div>
        <p className="text-gray-300 mb-4">
          Apuesta a TRES números (00-99). Ganas si aciertas los 3 números del sorteo (en cualquier
          orden) o al menos 2 de los 3.
        </p>
        <div className={`${t.box} p-4 rounded-lg space-y-2 border`}>
          <p className={`font-semibold ${t.text}`}>Aciertas los 3 (3/3): {prizes.tripleta.allThree.toLocaleString()}x tu apuesta</p>
          <p className={`font-semibold ${t.text}`}>Aciertas 2 de 3: {prizes.tripleta.twoOfThree}x tu apuesta</p>
        </div>
      </div>

      {/* SUPER PALE - Leidsa only */}
      {showSuperPale && (
        <div className="mb-2">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">👑</span>
            <h3 className="text-xl font-bold text-white">Super Pale — ¡El Premio Mayor!</h3>
          </div>
          <p className="text-gray-300 mb-4">
            Selecciona 2 números de 0-99. Exclusivo de Leidsa: exige acertar el 1er premio de Leidsa
            Pale Y el 1er premio de Lotería Nacional Pale a la vez.
          </p>
          <div className="bg-yellow-500/20 dark:bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30 dark:border-yellow-500/20">
            <p className="font-semibold text-yellow-300">🏆 Super Pale (2/2): premio fijo de hasta $667</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default function HowToPlayPage() {
  const [selectedGame, setSelectedGame] = useState<GameType>(GameType.LOTO);

  const kinotv = GAMES_CONFIG[GameType.KINO_TV];
  const lotopool = GAMES_CONFIG[GameType.LOTO_POOL];
  const pega3 = GAMES_CONFIG[GameType.PEGA3];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Navbar />

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">
            Cómo Jugar
          </h1>

          {/* Game picker */}
          <div className="mb-8">
            <label htmlFor="game-picker" className="block text-sm font-semibold text-gray-300 mb-2">
              Elige un juego para ver sus reglas
            </label>
            <select
              id="game-picker"
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value as GameType)}
              className="w-full sm:w-auto min-w-[280px] bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-md"
            >
              {GAME_OPTIONS.map(({ type, emoji }) => (
                <option key={type} value={type} className="bg-gray-900 text-white">
                  {emoji} {GAMES_CONFIG[type].name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-8">
            {/* LOTO - 3 Modalidades */}
            {selectedGame === GameType.LOTO && (
              <section className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-lg p-8 shadow-2xl border border-white/20 dark:border-white/10">
                <h2 className="text-2xl font-bold text-white mb-4">
                  🎰 LEIDSA LOTO - 3 Modalidades
                </h2>
                <p className="text-gray-300 mb-6">
                  LEIDSA ofrece 3 juegos diferentes bajo LOTO: Loto, Más y Supermas.
                  Cada uno tiene sus propias reglas y premios cada vez mayores. Elige el que más te guste.
                </p>

                {/* LOTO */}
                <div className="mb-8 border-b border-white/10 pb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">🎯</span>
                    <h3 className="text-xl font-bold text-white">LOTO (6/40)</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    El juego clásico: selecciona 6 números de 1 a 40.
                  </p>
                  <div className="bg-orange-500/20 dark:bg-orange-500/10 p-4 rounded-lg space-y-3 border border-orange-500/30 dark:border-orange-500/20">
                    <div>
                      <p className="font-semibold text-orange-300">💰 Cómo Ganar</p>
                      <p className="text-sm text-orange-200">
                        Acierta 3 o más números para ganar premios. Acierta los 6 para ganar el premio mayor garantizado de $20,000+
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-orange-300">💵 Precio</p>
                      <p className="text-sm text-orange-200">
                        $1 USD
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-orange-300">📅 Sorteos</p>
                      <p className="text-sm text-orange-200">
                        Miércoles y Sábados a las 8:55 PM
                      </p>
                    </div>
                  </div>
                </div>

                {/* MAS */}
                <div className="mb-8 border-b border-white/10 pb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">⭐</span>
                    <h3 className="text-xl font-bold text-white">MÁS (6/40 + 1 Bono)</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Mayor emoción: selecciona 6 números + 1 número Bono adicional.
                  </p>
                  <div className="bg-yellow-500/20 dark:bg-yellow-500/10 p-4 rounded-lg space-y-3 border border-yellow-500/30 dark:border-yellow-500/20">
                    <div>
                      <p className="font-semibold text-yellow-300">💰 Cómo Ganar</p>
                      <p className="text-sm text-yellow-200">
                        Acierta 4+ números para ganar. Acierta 6 números + el Bono para ganar el premio mayor garantizado de $150,000+
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-yellow-300">🎯 Selección</p>
                      <p className="text-sm text-yellow-200">
                        6 números (1-40) + 1 número Bono (1-12)
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-yellow-300">💵 Precio</p>
                      <p className="text-sm text-yellow-200">
                        $2 USD
                      </p>
                    </div>
                  </div>
                </div>

                {/* SUPERMAS */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">👑</span>
                    <h3 className="text-xl font-bold text-white">SUPERMAS (6/40 + 2 Bonos)</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    ¡El juego con mayor premio! Selecciona 6 números + 2 números Bono diferentes.
                  </p>
                  <div className="bg-purple-500/20 dark:bg-purple-500/10 p-4 rounded-lg space-y-3 border border-purple-500/30 dark:border-purple-500/20">
                    <div>
                      <p className="font-semibold text-purple-300">💰 Cómo Ganar</p>
                      <p className="text-sm text-purple-200">
                        Acierta 2+ bonos para ganar premios. Acierta 6 números + ambos bonos para ganar el PREMIO MAYOR de ¡$250,000+!
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-purple-300">🎯 Selección</p>
                      <p className="text-sm text-purple-200">
                        6 números (1-40) + Bono #1 (1-12) + Bono #2 (1-15)
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-purple-300">💵 Precio</p>
                      <p className="text-sm text-purple-200">
                        $3 USD
                      </p>
                    </div>
                    <div className="mt-3 p-2 bg-purple-500/30 rounded border border-purple-500/40">
                      <p className="text-sm font-semibold text-purple-200">
                        ✨ ¡EL MAYOR PREMIO! Hasta $250,000
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* KinoTV */}
            {selectedGame === GameType.KINO_TV && (
              <section className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-lg p-8 shadow-2xl border border-white/20 dark:border-white/10">
                <h2 className="text-2xl font-bold text-white mb-4">
                  🎮 Super KinoTV
                </h2>
                <p className="text-gray-300 mb-4">
                  Un juego diario de LEIDSA diseñado para ofrecer grandes premios y muchas formas de ganar.
                  Selecciona exactamente {kinotv.minNumbers} números de {kinotv.numberRange[0]} a {kinotv.numberRange[1]} con premios fijos garantizados.
                </p>
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 dark:from-blue-500/10 dark:to-cyan-500/10 p-6 rounded-lg space-y-4 border border-blue-500/30 dark:border-blue-500/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-blue-300">🎯 Selección</p>
                      <p className="text-sm text-blue-200">
                        Exactamente {kinotv.minNumbers} números (del {kinotv.numberRange[0]} al {kinotv.numberRange[1]})
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-cyan-300">💵 Precio</p>
                      <p className="text-sm text-cyan-200">
                        ${kinotv.pricePerTicket} USD por boleto
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-300 mb-2">💰 Tabla de Premios (Premios Fijos)</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">20 números acertados</span>
                        <span className="font-bold text-green-400">$250,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">19 números acertados</span>
                        <span className="font-bold text-blue-400">$100,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">18 números acertados</span>
                        <span className="text-cyan-400">$50,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">17 números acertados</span>
                        <span className="text-cyan-400">$25,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">16 números acertados</span>
                        <span className="text-gray-400">$10,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">... hasta 5 números</span>
                        <span className="text-gray-400">desde $0.20</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">0 números (CERO)</span>
                        <span className="text-gray-400">$0.10</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-blue-500/30 pt-3">
                    <p className="text-sm text-blue-200">
                      📅 <strong>Sorteos:</strong> Diarios a las {kinotv.drawSchedule.times[0]}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Loto Pool */}
            {selectedGame === GameType.LOTO_POOL && (
              <section className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-lg p-8 shadow-2xl border border-white/20 dark:border-white/10">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Loto Pool
                </h2>
                <p className="text-gray-300 mb-4">
                  Selecciona {lotopool.minNumbers} números de {lotopool.numberRange[0]} a {lotopool.numberRange[1]}. Gana desde 3 números coincidentes; los premios se comparten entre los ganadores.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Sorteos: Lunes, Miércoles, Viernes y Domingo a las {lotopool.drawSchedule.times[0]}</li>
                  <li>Selecciona {lotopool.minNumbers} números diferentes</li>
                  <li>Rango: {lotopool.numberRange[0]} a {lotopool.numberRange[1]}</li>
                  <li>Precio: ${lotopool.pricePerTicket} USDT</li>
                  <li>Premios: Compartidos en el pool</li>
                </ul>
              </section>
            )}

            {/* Quiniela Pale - Leidsa (con Super Pale) */}
            {selectedGame === GameType.QUINIELA && (
              <QuinielaPaleBankSection
                gameType={GameType.QUINIELA}
                emoji="🎪"
                theme="orange"
                schedule="Todos los días a las 8:55 PM (domingos 3:55 PM)"
                intro="LEIDSA ofrece 4 modalidades bajo Quiniela Pale. Cada sorteo saca 3 números ganadores (00-99): 1er, 2do y 3er premio. Elige Quiniela, Pale, Tripleta o el exclusivo Super Pale."
                showSuperPale
              />
            )}

            {/* Lotería Nacional */}
            {selectedGame === GameType.LOTERIA_NACIONAL && (
              <QuinielaPaleBankSection
                gameType={GameType.LOTERIA_NACIONAL}
                emoji="🍀"
                theme="green"
                schedule="Lunes a Sábado a las 2:30 PM y 9:00 PM (domingos 6:00 PM)"
                intro="Mismo formato de Quiniela, Pale y Tripleta, pero Lotería Nacional paga distinto: su Pale multiplica hasta 3,000x en vez de 1,000x, y su 3er premio en Quiniela paga un poco más."
              />
            )}

            {/* Loteka */}
            {selectedGame === GameType.LOTEKA && (
              <QuinielaPaleBankSection
                gameType={GameType.LOTEKA}
                emoji="🔵"
                theme="blue"
                schedule="Todos los días a las 7:55 PM"
                intro="Quiniela Loteka usa la misma estructura estándar de premios que Leidsa, Real y La Suerte: paga según en qué posición del sorteo cae tu número (o números)."
              />
            )}

            {/* La Suerte Dominicana */}
            {selectedGame === GameType.LA_SUERTE && (
              <QuinielaPaleBankSection
                gameType={GameType.LA_SUERTE}
                emoji="🔴"
                theme="red"
                schedule="Todos los días a las 12:30 PM y 6:00 PM"
                intro="La Suerte Dominicana ofrece dos sorteos diarios (mediodía y tarde) con la misma tabla de premios estándar de Quiniela, Pale y Tripleta."
              />
            )}

            {/* Lotería Real */}
            {selectedGame === GameType.LOTERIA_REAL && (
              <QuinielaPaleBankSection
                gameType={GameType.LOTERIA_REAL}
                emoji="🟡"
                theme="amber"
                schedule="Todos los días a la 12:55 PM"
                intro="Lotería Real es uno de los sorteos más populares del mediodía, con la misma tabla de premios estándar de Quiniela, Pale y Tripleta."
              />
            )}

            {/* Pega3 */}
            {selectedGame === GameType.PEGA3 && (
              <section className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-lg p-8 shadow-2xl border border-white/20 dark:border-white/10">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Pega3Más
                </h2>
                <p className="text-gray-300 mb-4">
                  Similar a Quiniela con variantes en premios y modalidades.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Sorteos: 3 veces al día ({pega3.drawSchedule.times.join(', ')})</li>
                  <li>Selecciona 3 dígitos (00-99)</li>
                  <li>Modalidades: Exacto, Mixto, Combinado</li>
                  <li>Precio: ${pega3.pricePerTicket} USDT</li>
                  <li>Premios: Fijos según modalidad</li>
                </ul>
              </section>
            )}

            {/* General Info - always visible */}
            <section className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 shadow-2xl text-white">
              <h2 className="text-2xl font-bold mb-4">
                ¿Por qué jugar en Lotería Cripto?
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Transacciones transparentes en blockchain</li>
                <li>Sin intermediarios - pagos directos</li>
                <li>Privacidad y seguridad garantizadas</li>
                <li>Acceso 24/7 desde cualquier país</li>
                <li>Premios instantáneos en tu billetera cripto</li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
