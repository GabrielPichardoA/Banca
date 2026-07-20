'use client';

import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

interface HistoricalDraw {
  id: string;
  date: string;
  time: string;
  numbersPlayed: number[];
  numbersWon: number[];
  amountBet: number;
  prize: number;
  status: 'won' | 'lost' | 'partial';
}

// Dummy data - same as in parent page
const kinotvHistory: HistoricalDraw[] = [
  {
    id: 'kinotv-001',
    date: '09 Jun 2026',
    time: '20:30',
    numbersPlayed: [6, 14, 16, 19, 23, 26, 32, 33, 37, 42, 5, 12, 18, 22, 28, 31, 35, 40, 45, 50],
    numbersWon: [6, 14, 16, 19, 23, 26, 32, 33, 37, 42],
    amountBet: 25,
    prize: 1500,
    status: 'partial'
  },
  {
    id: 'kinotv-002',
    date: '08 Jun 2026',
    time: '20:30',
    numbersPlayed: [5, 12, 18, 22, 28, 31, 35, 40, 45, 50, 2, 8, 15, 25, 30, 38, 42, 48, 55, 60],
    numbersWon: [5, 12, 18, 22, 28, 31, 35, 40, 45, 50],
    amountBet: 25,
    prize: 1500,
    status: 'partial'
  },
  {
    id: 'kinotv-003',
    date: '07 Jun 2026',
    time: '20:30',
    numbersPlayed: [1, 15, 20, 25, 30, 38, 42, 48, 55, 60, 7, 11, 17, 24, 29, 36, 41, 47, 52, 65],
    numbersWon: [1, 15, 20, 25, 30, 38, 42, 48, 55, 60],
    amountBet: 25,
    prize: 1500,
    status: 'partial'
  },
  {
    id: 'kinotv-004',
    date: '06 Jun 2026',
    time: '20:30',
    numbersPlayed: [2, 11, 17, 24, 29, 36, 41, 47, 52, 65, 8, 13, 19, 27, 34, 39, 44, 51, 58, 66],
    numbersWon: [2, 11, 17, 24, 29, 36, 41, 47, 52, 65],
    amountBet: 25,
    prize: 1500,
    status: 'partial'
  },
  {
    id: 'kinotv-005',
    date: '05 Jun 2026',
    time: '20:30',
    numbersPlayed: [3, 9, 14, 21, 26, 33, 37, 43, 50, 57, 4, 10, 16, 23, 30, 35, 40, 46, 53, 60],
    numbersWon: [3, 9, 14, 21, 26, 33, 37, 43, 50, 57, 4, 10, 16, 23, 30, 35, 40, 46, 53, 60],
    amountBet: 25,
    prize: 250000,
    status: 'won'
  },
];

const lotoHistory: HistoricalDraw[] = [
  {
    id: 'loto-001',
    date: '09 Jun 2026',
    time: '21:00',
    numbersPlayed: [7, 14, 24, 25, 35, 36],
    numbersWon: [7, 14, 24, 25, 35, 36],
    amountBet: 10,
    prize: 150000,
    status: 'won'
  },
  {
    id: 'loto-002',
    date: '08 Jun 2026',
    time: '21:00',
    numbersPlayed: [7, 14, 24, 25, 35, 36],
    numbersWon: [7, 14, 24],
    amountBet: 10,
    prize: 500,
    status: 'partial'
  },
  {
    id: 'loto-003',
    date: '07 Jun 2026',
    time: '21:00',
    numbersPlayed: [5, 10, 20, 30, 40, 45],
    numbersWon: [],
    amountBet: 10,
    prize: 0,
    status: 'lost'
  },
  {
    id: 'loto-004',
    date: '06 Jun 2026',
    time: '21:00',
    numbersPlayed: [7, 14, 24, 25, 35, 36],
    numbersWon: [7, 14, 24, 25, 35, 36],
    amountBet: 10,
    prize: 150000,
    status: 'won'
  },
];

const lotopoolHistory: HistoricalDraw[] = [
  {
    id: 'lotopool-001',
    date: '08 Jun 2026',
    time: '20:00',
    numbersPlayed: [9, 16, 17, 24, 31],
    numbersWon: [9, 16, 17, 24, 31],
    amountBet: 2,
    prize: 150,
    status: 'won'
  },
  {
    id: 'lotopool-002',
    date: '06 Jun 2026',
    time: '20:00',
    numbersPlayed: [2, 8, 14, 19, 28, 4, 12],
    numbersWon: [2, 8, 14],
    amountBet: 2,
    prize: 45,
    status: 'partial'
  },
  {
    id: 'lotopool-003',
    date: '05 Jun 2026',
    time: '20:00',
    numbersPlayed: [3, 10, 15, 22, 30, 6, 18],
    numbersWon: [],
    amountBet: 2,
    prize: 0,
    status: 'lost'
  },
];

const quinielaHistory: HistoricalDraw[] = [
  {
    id: 'quiniela-001',
    date: '08 Jun 2026',
    time: '21:00',
    numbersPlayed: [33, 61],
    numbersWon: [33, 61],
    amountBet: 5,
    prize: 75000,
    status: 'won'
  },
  {
    id: 'quiniela-002',
    date: '07 Jun 2026',
    time: '17:00',
    numbersPlayed: [42, 88],
    numbersWon: [42],
    amountBet: 5,
    prize: 0,
    status: 'partial'
  },
  {
    id: 'quiniela-003',
    date: '06 Jun 2026',
    time: '12:00',
    numbersPlayed: [15, 75],
    numbersWon: [],
    amountBet: 5,
    prize: 0,
    status: 'lost'
  },
  {
    id: 'quiniela-004',
    date: '05 Jun 2026',
    time: '20:00',
    numbersPlayed: [27, 54],
    numbersWon: [27, 54],
    amountBet: 5,
    prize: 75000,
    status: 'won'
  },
];

const pega3History: HistoricalDraw[] = [
  {
    id: 'pega3-001',
    date: '08 Jun 2026',
    time: '21:00',
    numbersPlayed: [5, 2, 3],
    numbersWon: [5, 2, 3],
    amountBet: 10,
    prize: 5000,
    status: 'won'
  },
  {
    id: 'pega3-002',
    date: '07 Jun 2026',
    time: '21:00',
    numbersPlayed: [1, 4, 7],
    numbersWon: [1, 4],
    amountBet: 10,
    prize: 700,
    status: 'partial'
  },
  {
    id: 'pega3-003',
    date: '06 Jun 2026',
    time: '21:00',
    numbersPlayed: [8, 9, 2],
    numbersWon: [],
    amountBet: 10,
    prize: 0,
    status: 'lost'
  },
  {
    id: 'pega3-004',
    date: '05 Jun 2026',
    time: '21:00',
    numbersPlayed: [3, 6, 1],
    numbersWon: [3, 6, 1],
    amountBet: 10,
    prize: 5000,
    status: 'won'
  },
];

const gameLogos: { [key: string]: string } = {
  kinotv: '/images/games/kinotv.png',
  loto: '/images/games/loto.png',
  'loto-pool': '/images/games/loto-pool.png',
  quiniela: '/images/games/quiniela.png',
  pega3: '/images/games/pega3.png',
};

const gameHistories: { [key: string]: HistoricalDraw[] } = {
  kinotv: kinotvHistory,
  loto: lotoHistory,
  'loto-pool': lotopoolHistory,
  quiniela: quinielaHistory,
  pega3: pega3History,
};

const gameNames: { [key: string]: string } = {
  kinotv: 'KinoTV',
  loto: 'LOTO',
  'loto-pool': 'Loto Pool',
  quiniela: 'Quiniela',
  pega3: 'Pega3Más',
};

export default function GameDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const gameId = (params.game as string)?.toLowerCase() || '';
  
  const history = gameHistories[gameId] || [];
  const logo = gameLogos[gameId];
  const gameName = gameNames[gameId];

  if (!history.length) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">Juego no encontrado</p>
            <button
              onClick={() => router.back()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Volver
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const totalWinnings = history.reduce((sum, draw) => sum + draw.prize, 0);
  const winRate = ((history.filter(d => d.prize > 0).length / history.length) * 100).toFixed(1);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
            {/* Logo Section */}
            <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-700 dark:via-cyan-600 dark:to-blue-700 p-12 flex items-center justify-center min-h-[220px]">
              <Image 
                src={logo} 
                alt={gameName} 
                width={160} 
                height={160} 
                className="rounded-lg drop-shadow-lg"
              />
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Sorteos Históricos</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{history.length}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Tasa de Ganancia</p>
                <p className="text-3xl font-bold text-green-600">{winRate}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Ganancias Total</p>
                <p className="text-3xl font-bold text-blue-600">${totalWinnings.toFixed(2)}</p>
              </div>
            </div>

            {/* Back Button */}
            <div className="p-6 bg-white dark:bg-gray-800">
              <button
                onClick={() => router.back()}
                className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold py-3 px-4 rounded-lg transition-all"
              >
                ← Volver a Resultados
              </button>
            </div>
          </div>

          {/* History List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Histórico de Sorteos</h2>
            
            {history.map((draw) => (
              <div
                key={draw.id}
                className={`p-6 rounded-lg border-l-4 transition-all bg-white dark:bg-gray-800 ${
                  draw.status === 'won'
                    ? 'bg-green-50 dark:bg-green-900/20 border-l-green-500'
                    : draw.status === 'partial'
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-l-blue-500'
                    : 'bg-red-50 dark:bg-red-900/20 border-l-red-500'
                }`}
              >
                {/* Draw Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-lg">
                      {draw.date} • {draw.time}
                    </p>
                    <p className={`text-sm font-bold mt-1 ${
                      draw.status === 'won'
                        ? 'text-green-600'
                        : draw.status === 'partial'
                        ? 'text-blue-600'
                        : 'text-red-600'
                    }`}>
                      {draw.status === 'won' ? '✓ GANADO' : draw.status === 'partial' ? '◐ PARCIAL' : '✗ PERDIDO'}
                    </p>
                  </div>
                </div>

                {/* Numbers Display */}
                {gameName === 'KinoTV' ? (
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3 font-semibold">
                      Números Ganadores
                    </p>
                    <div className="grid grid-cols-5 sm:grid-cols-10 gap-1 mb-4">
                      {draw.numbersWon.map((num) => (
                        <span
                          key={`${draw.id}-won-${num}`}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-md flex items-center justify-center text-xs font-bold bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-md"
                        >
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2 font-semibold">
                        Números Jugados
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {draw.numbersPlayed.map((num) => (
                          <span
                            key={`${draw.id}-played-${num}`}
                            className={`px-2 py-1 rounded-md text-xs font-bold transition-all ${
                              draw.numbersWon.includes(num)
                                ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-md'
                                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {num}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2 font-semibold">
                        Números Ganadores
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {draw.numbersWon.map((num) => (
                          <span
                            key={`${draw.id}-won-${num}`}
                            className="px-2 py-1 rounded-md text-xs font-bold bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-md"
                          >
                            {num}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Prize info */}
                <div className="pt-3 border-t border-gray-200 dark:border-gray-600 flex justify-between items-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Apuesta: ${draw.amountBet.toFixed(2)}
                  </p>
                  <p className={`text-lg font-bold ${
                    draw.status === 'won'
                      ? 'text-green-600'
                      : draw.status === 'partial'
                      ? 'text-blue-600'
                      : 'text-red-600'
                  }`}>
                    ${draw.prize.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
