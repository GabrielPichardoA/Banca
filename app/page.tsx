'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GameCard from '@/components/GameCard';
import { GAMES_CONFIG } from '@/lib/gameConfig';

export default function Home() {
  const { user } = useAuth();

  const games = Object.values(GAMES_CONFIG);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Lotería con Criptomonedas
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                La plataforma de lotería más segura y transparente. Juega con Bitcoin, Ethereum y USDT. ¡Gana premios en cripto todos los días!
              </p>
              <div className="flex gap-4">
                {user ? (
                  <Link href="/play" className="bg-white text-purple-900 hover:bg-purple-50 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                    Jugar Ahora
                  </Link>
                ) : (
                  <>
                    <Link href="/auth/register" className="bg-white text-purple-900 hover:bg-purple-50 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                      Registrarse
                    </Link>
                    <Link href="/auth/login" className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                      Ingresar
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <span>Saldo Disponible</span>
                  <span className="font-bold text-2xl">{user ? '$800 USD' : '-'}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <span>Próximo Sorteo</span>
                  <span className="font-bold">En 2 horas</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <span>Ganadores Hoy</span>
                  <span className="font-bold">1,234</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="flex-1 py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Juegos Disponibles
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Elige tu juego favorito y comienza a jugar hoy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                jackpot={Math.floor(Math.random() * 500000) + 100000}
                drawTime={game.drawSchedule.times[0] || 'Próximamente'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Seguro y Transparente</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Todas las transacciones en blockchain. Sin intermediarios.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Resultados Instantáneos</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sorteos frecuentes y pagos automáticos de premios.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Premios Grandes</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Jackpots acumulativos que crecen cada día.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

