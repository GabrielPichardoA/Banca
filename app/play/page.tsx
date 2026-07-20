'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GameCard from '@/components/GameCard';
import { GAMES_CONFIG } from '@/lib/gameConfig';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function PlayPage() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const games = Object.values(GAMES_CONFIG);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Navbar />

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              {t('games.selectGame')}
            </h1>
            <p className="text-xl text-gray-300">
              {t('games.selectGameDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                jackpot={Math.floor(Math.random() * 500000) + 100000}
                drawTime={game.drawSchedule.times[0] || t('games.upcoming')}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
