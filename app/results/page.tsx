'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface LotoModality {
  name: string;
  emoji: string;
  baseNumbers: number[];
  bonus1?: number;
  bonus2?: number;
  jackpot: string;
}

// Fake data based on LEIDSA structure
// All modalities share the same 6 base numbers
const baseNumbers = [7, 14, 24, 25, 35, 36];

const lotoResults: LotoModality[] = [
  {
    name: 'LOTO',
    emoji: '🎯',
    baseNumbers: baseNumbers,
    jackpot: '$125,000.00',
  },
  {
    name: 'Más',
    emoji: '⭐',
    baseNumbers: baseNumbers,
    bonus1: 8,
    jackpot: '$250,000.00',
  },
  {
    name: 'Supermas',
    emoji: '👑',
    baseNumbers: baseNumbers,
    bonus1: 8,
    bonus2: 12,
    jackpot: '$500,000.00',
  },
];

interface KinoTVResult {
  id: string;
  numbers: number[];
  drawDate: string;
  drawTime: string;
}

interface OtherDrawResult {
  id: string;
  game: string;
  numbers: number[];
  drawDate: string;
  drawTime: string;
  jackpot: string;
}

const kinotvResult: KinoTVResult = {
  id: 'kinotv-20260609',
  numbers: [6, 14, 16, 19, 23, 26, 32, 33, 37, 42, 5, 12, 18, 22, 28, 31, 35, 40, 45, 50],
  drawDate: 'sábado, 09 jun',
  drawTime: '20:30',
};

const otherResults: OtherDrawResult[] = [
  {
    id: 'lotopool-20260609',
    game: 'Loto Pool',
    numbers: [9, 16, 17, 24, 31],
    drawDate: 'lunes, 08 jun',
    drawTime: '21:00',
    jackpot: '$45,750.00',
  },
  {
    id: 'quiniela-20260609',
    game: 'Quiniela',
    numbers: [33, 61],
    drawDate: 'lunes, 08 jun',
    drawTime: '21:00',
    jackpot: '$75,000.00',
  },
  {
    id: 'pega3-20260609',
    game: 'Pega3Más',
    numbers: [5, 2, 3],
    drawDate: 'lunes, 08 jun',
    drawTime: '21:00',
    jackpot: '$5,000.00',
  },
];

// Dummy historical draws data
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
    numbersWon: [7, 14, 24, 25],
    amountBet: 1,
    prize: 50,
    status: 'partial'
  },
  {
    id: 'loto-002',
    date: '06 Jun 2026',
    time: '21:00',
    numbersPlayed: [3, 12, 18, 28, 32, 40],
    numbersWon: [3, 12, 18],
    amountBet: 1,
    prize: 15,
    status: 'partial'
  },
  {
    id: 'loto-003',
    date: '03 Jun 2026',
    time: '21:00',
    numbersPlayed: [5, 15, 22, 26, 38, 39],
    numbersWon: [],
    amountBet: 1,
    prize: 0,
    status: 'lost'
  },
  {
    id: 'loto-004',
    date: '31 May 2026',
    time: '21:00',
    numbersPlayed: [1, 10, 20, 30, 35, 40],
    numbersWon: [1, 10, 20, 30, 35, 40],
    amountBet: 2,
    prize: 150000,
    status: 'won'
  },
];

const lotopoolHistory: HistoricalDraw[] = [
  {
    id: 'lotopool-001',
    date: '08 Jun 2026',
    time: '20:00',
    numbersPlayed: [9, 16, 17, 24, 31, 5, 11],
    numbersWon: [9, 16, 17],
    amountBet: 2,
    prize: 45,
    status: 'partial'
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

// Component to display KinoTV result card with fixed prizes
function KinoTVResultCard({ result, onViewDetails }: { result: KinoTVResult; onViewDetails: () => void }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:scale-105">
      {/* Header with Logo */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 p-12 flex items-center justify-center min-h-[180px]">
        <Image src="/images/games/kinotv.png" alt="KinoTV" width={200} height={200} className="rounded" />
      </div>

      {/* Numbers Section */}
      <div className="bg-gradient-to-b from-blue-50/50 to-cyan-50/50 dark:from-gray-700/30 dark:to-gray-600/30 p-6 min-h-[200px] flex flex-col items-center justify-center">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 font-semibold">20 Números</p>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1">
          {result.numbers.map((num) => (
            <div
              key={`${result.id}-${num}`}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-lg hover:shadow-xl transition-shadow"
            >
              {num}
            </div>
          ))}
        </div>
      </div>

      {/* Draw Info */}
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-t border-gray-200 dark:border-gray-600">
        <div className="flex justify-between items-center text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-xs uppercase">Sorteo</p>
            <p className="font-bold text-gray-900 dark:text-white">{result.drawDate}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 dark:text-gray-400 text-xs uppercase">Hora</p>
            <p className="font-bold text-gray-900 dark:text-white">{result.drawTime}</p>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="px-6 py-4 bg-white dark:bg-gray-800">
        <button
          onClick={onViewDetails}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          VER DETALLE
        </button>
      </div>
    </div>
  );
}

// Component to display result card
function ResultCard({ result, onViewDetails }: { result: OtherDrawResult; onViewDetails: () => void }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:scale-105">
      {/* Header with Logo */}
      <div className="relative bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-12 flex items-center justify-center min-h-[180px]">
        <Image 
          src={
            result.game.includes('Loto Pool') 
              ? '/images/games/loto-pool.png' 
              : result.game.includes('Pega3') 
              ? '/images/games/pega3.png'
              : '/images/games/quiniela.png'
          } 
          alt={result.game} 
          width={200} 
          height={200} 
          className="rounded" 
        />
      </div>

      {/* Numbers Section */}
      <div className="bg-gradient-to-b from-orange-50/50 to-amber-50/50 dark:from-gray-700/30 dark:to-gray-600/30 p-6 min-h-[200px] flex flex-col items-center justify-center">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 font-semibold">{result.numbers.length} Números</p>
        <div className="flex flex-wrap gap-1 justify-center">
          {result.numbers.map((num) => (
            <div
              key={`${result.id}-${num}`}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-xs shadow-lg hover:shadow-xl transition-shadow"
            >
              {num}
            </div>
          ))}
        </div>
      </div>

      {/* Draw Info */}
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-t border-gray-200 dark:border-gray-600">
        <div className="flex justify-between items-center text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-xs uppercase">Sorteo</p>
            <p className="font-bold text-gray-900 dark:text-white">{result.drawDate}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 dark:text-gray-400 text-xs uppercase">Hora</p>
            <p className="font-bold text-gray-900 dark:text-white">{result.drawTime}</p>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="px-6 py-4 bg-white dark:bg-gray-800">
        <button
          onClick={onViewDetails}
          className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          VER DETALLE
        </button>
      </div>
    </div>
  );
}

// Loto result card
function LotoResultCard({ onViewDetails }: { onViewDetails: () => void }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:scale-105">
      {/* Header with Logo */}
      <div className="relative bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-12 flex items-center justify-center min-h-[180px]">
        <Image src="/images/games/loto.png" alt="LOTO" width={200} height={200} className="rounded" />
      </div>

      {/* Numbers Section */}
      <div className="bg-gradient-to-b from-orange-50/50 to-amber-50/50 dark:from-gray-700/30 dark:to-gray-600/30 p-6 min-h-[200px] flex flex-col items-center justify-center">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 font-semibold">6 Base + 2 Bonos</p>
        <div className="flex flex-wrap gap-1 justify-center mb-3">
          {/* Base numbers */}
          {baseNumbers.map((num) => (
            <div
              key={`loto-base-${num}`}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-xs shadow-lg hover:shadow-xl transition-shadow"
            >
              {num}
            </div>
          ))}
        </div>
        
        {/* Bonos */}
        <div className="flex gap-1 justify-center mt-2">
          {/* Bonus 1 */}
          {lotoResults[1].bonus1 !== undefined && (
            <div
              key="bonus1"
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-gray-900 font-bold text-xs shadow-lg hover:shadow-xl transition-shadow ring-2 ring-yellow-600"
            >
              {lotoResults[1].bonus1}
            </div>
          )}
          {/* Bonus 2 */}
          {lotoResults[2].bonus2 !== undefined && (
            <div
              key="bonus2"
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-xs shadow-lg hover:shadow-xl transition-shadow ring-2 ring-red-700"
            >
              {lotoResults[2].bonus2}
            </div>
          )}
        </div>
      </div>

      {/* Draw Info */}
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-t border-gray-200 dark:border-gray-600">
        <div className="flex justify-between items-center text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-xs uppercase">Sorteo</p>
            <p className="font-bold text-gray-900 dark:text-white">sábado, 09 jun</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 dark:text-gray-400 text-xs uppercase">Hora</p>
            <p className="font-bold text-gray-900 dark:text-white">21:00</p>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="px-6 py-4 bg-white dark:bg-gray-800">
        <button
          onClick={onViewDetails}
          className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          VER DETALLE
        </button>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-400 dark:to-cyan-400 mb-2">
                  Últimos Resultados
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Sorteos del día • Todos los números ganadores
                </p>
              </div>
              <div className="hidden sm:block">
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Actualizado</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">Hace 2h</p>
                </div>
              </div>
            </div>
            {/* Divider */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-transparent rounded-full max-w-xs"></div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Loto Card */}
<LotoResultCard onViewDetails={() => router.push('/results/loto')} />

            {/* KinoTV Card */}
            <KinoTVResultCard result={kinotvResult} onViewDetails={() => router.push('/results/kinotv')} />

            {/* Loto Pool Card */}
            <ResultCard
              result={otherResults[0]}
              onViewDetails={() => router.push('/results/loto-pool')}
            />

            {/* Quiniela Card */}
            <ResultCard
              result={otherResults[1]}
              onViewDetails={() => router.push('/results/quiniela')}
            />

            {/* Pega3Más Card */}
            <ResultCard
              result={otherResults[2]}
              onViewDetails={() => router.push('/results/pega3')}
            />
          </div>

          {/* Info Banner */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-start gap-4">
              <div className="text-3xl">ℹ️</div>
              <div>
                <h3 className="font-bold text-lg mb-2">¿Tienes un boleto ganador?</h3>
                <p className="text-blue-100">Verifica tus números en "Mis Boletos" y reclama tu premio. Todos los pagos se realizan en USD (USDT Crypto) dentro de 24 horas.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
