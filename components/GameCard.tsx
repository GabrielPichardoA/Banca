'use client';

import Link from 'next/link';
import { GameType, GameConfig } from '@/types';
import { formatCrypto, formatUsd, cryptoToUsd } from '@/lib/crypto';
import { useLanguage } from '@/context/LanguageContext';

interface GameCardProps {
  game: GameConfig;
  jackpot?: number;
  drawTime?: string;
  lastNumbers?: number[];
}

// Mapping of game IDs to translation keys
const gameNameKeys: Record<string, string> = {
  'loto': 'games.lotoName',
  'kino-tv': 'games.kinoTVName',
  'loto-pool': 'games.lotoPoolName',
  'quiniela': 'games.quinielaName',
  'pega3': 'games.pega3Name',
};

const gameDescriptionKeys: Record<string, string> = {
  'loto': 'games.lotoDescription',
  'kino-tv': 'games.kinoTVDescription',
  'loto-pool': 'games.lotoPoolDescription',
  'quiniela': 'games.quinielaDescription',
  'pega3': 'games.pega3Description',
};

export default function GameCard({
  game,
  jackpot = 100000,
  drawTime = 'Próximamente',
  lastNumbers = []
}: GameCardProps) {
  const { t } = useLanguage();

  const gameName = gameNameKeys[game.id] ? t(gameNameKeys[game.id]) : game.name;
  const gameDescription = gameDescriptionKeys[game.id] ? t(gameDescriptionKeys[game.id]) : game.description;

  return (
    <Link href={`/play/${game.id}`}>
      <div className="group bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden cursor-pointer h-full border border-white/20 dark:border-white/10 hover:border-white/30 dark:hover:border-white/20">
        {/* Logo Header */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 h-32 flex items-center justify-center border-b border-white/10">
          {game.logo ? (
            <img 
              src={game.logo} 
              alt={gameName}
              className="max-h-24 max-w-full object-contain drop-shadow-lg"
            />
          ) : (
            <span className="text-white/50 text-sm">{gameName}</span>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-white font-bold text-lg mb-2">{gameName}</h3>
            <p className="text-gray-300 text-sm">{gameDescription}</p>
          </div>
          {/* Draw Info */}
          <div className="border-t border-white/10 pt-4">
            <p className="text-gray-400 text-sm mb-2">{t('games.nextDraw')}</p>
            <p className="text-lg font-semibold text-white">{drawTime}</p>
          </div>

          {/* Last Numbers */}
          {lastNumbers.length > 0 && (
            <div className="border-t border-white/10 pt-4">
              <p className="text-gray-400 text-sm mb-2">{t('games.lastNumbers')}</p>
              <div className="flex flex-wrap gap-2">
                {lastNumbers.slice(0, 6).map((num, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center justify-center w-8 h-8 bg-white/20 text-white rounded-full font-semibold text-sm border border-white/30"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Play Button */}
          <div className="border-t border-white/10 pt-4">
            <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 group-hover:shadow-lg shadow-lg">
              {t('games.playNow')}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
