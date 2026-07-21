'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface WinnerEntry {
  id: string;
  date: string;
  game: string;
  numbers: number[];
  bonusNumbers?: number[];
  walletAddress: string;
  txHash: string;
  amount: number;
  crypto: 'USDT' | 'USDC';
}

// Datos de demostración. En producción estos vendrían de las transacciones
// de pago confirmadas en blockchain.
const winners: WinnerEntry[] = [
  { id: 'w-01', date: '09 Jun 2026', game: 'Super KinoTV', numbers: [5, 6, 12, 14, 16, 18, 19, 22, 23, 26, 28, 31, 32, 33, 35, 37, 40, 42, 45, 50], walletAddress: '0x8f3Ab21eC9d4F0a17b6C5e2D9F4a1B8c3D6E7F90', txHash: '0x4a1c...9e3f', amount: 250000, crypto: 'USDT' },
  { id: 'w-02', date: '08 Jun 2026', game: 'LEIDSA Loto (Más)', numbers: [7, 14, 24, 25, 35, 36], bonusNumbers: [8], walletAddress: '0x2C7d9E1fA6b83D4c0e5F7a9B1c2D3e4F5a6B7c8D', txHash: '0x7b2d...1a4c', amount: 150000, crypto: 'USDT' },
  { id: 'w-03', date: '08 Jun 2026', game: 'Quiniela Pale', numbers: [33, 61], walletAddress: '0x5B1e9A2c3D4f6E7a8B9c0D1e2F3a4B5c6D7e8F9a', txHash: '0x9f0a...6d2b', amount: 75000, crypto: 'USDC' },
  { id: 'w-04', date: '05 Jun 2026', game: 'Quiniela Pale', numbers: [27, 54], walletAddress: '0xA3c4D5e6F7a8B9c0D1e2F3a4B5c6D7e8F9a0B1c2', txHash: '0x2e5c...8b1a', amount: 75000, crypto: 'USDT' },
  { id: 'w-05', date: '31 May 2026', game: 'LEIDSA Loto', numbers: [1, 10, 20, 30, 35, 40], walletAddress: '0x9D0e1F2a3B4c5D6e7F8a9B0c1D2e3F4a5B6c7D8e', txHash: '0x1d3f...4c7e', amount: 20000, crypto: 'USDT' },
  { id: 'w-06', date: '21 May 2026', game: 'Loto Pool', numbers: [3, 6, 10, 15, 18, 22, 30], walletAddress: '0xF6a7B8c9D0e1F2a3B4c5D6e7F8a9B0c1D2e3F4a5', txHash: '0x8c4b...2f9d', amount: 8500, crypto: 'USDC' },
  { id: 'w-07', date: '18 May 2026', game: 'Lotería Real', numbers: [12, 45, 78], walletAddress: '0x3B4c5D6e7F8a9B0c1D2e3F4a5B6c7D8e9F0a1B2c', txHash: '0x6a9e...3d5c', amount: 5000, crypto: 'USDT' },
  { id: 'w-08', date: '14 May 2026', game: 'Super KinoTV', numbers: [2, 8, 14, 19, 26, 29, 34, 38, 44, 52], walletAddress: '0xD8e9F0a1B2c3D4e5F6a7B8c9D0e1F2a3B4c5D6e7', txHash: '0x0f2a...7e6b', amount: 1500, crypto: 'USDT' },
  { id: 'w-09', date: '10 May 2026', game: 'Loteka', numbers: [8, 34, 67], walletAddress: '0x1A2b3C4d5E6f7A8b9C0d1E2f3A4b5C6d7E8f9A0b', txHash: '0x5d8c...1a3f', amount: 3000, crypto: 'USDC' },
  { id: 'w-10', date: '06 May 2026', game: 'Pega3Más', numbers: [4, 7, 2], walletAddress: '0x7E8f9A0b1C2d3E4f5A6b7C8d9E0f1A2b3C4d5E6f', txHash: '0x3b7f...9c2e', amount: 1200, crypto: 'USDT' },
];

const totalPaidOut = winners.reduce((sum, w) => sum + w.amount, 0);

function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatUsd(amount: number): string {
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function NumberChip({ value, bonus }: { value: number; bonus?: boolean }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-[10px] font-bold shadow-sm ${
        bonus
          ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-gray-900 ring-2 ring-amber-600'
          : 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
      }`}
    >
      {value}
    </span>
  );
}

function WinningNumbers({ winner }: { winner: WinnerEntry }) {
  return (
    <div className="flex flex-wrap gap-1 max-w-xs">
      {winner.numbers.map((n, idx) => (
        <NumberChip key={`${winner.id}-n-${idx}`} value={n} />
      ))}
      {winner.bonusNumbers?.map((n, idx) => (
        <NumberChip key={`${winner.id}-b-${idx}`} value={n} bonus />
      ))}
    </div>
  );
}

export default function WinnersPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-400 dark:to-cyan-400 mb-2">
              🏆 Ganadores Verificados
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Transparencia total: cada premio se paga directamente a la cartera cripto del ganador. Sin
              intermediarios, sin retrasos.
            </p>
            <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-transparent rounded-full max-w-xs mt-4"></div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Pagado</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{formatUsd(totalPaidOut)}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">Ganadores Pagados</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{winners.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">Tiempo Promedio de Pago</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">&lt; 24h</p>
            </div>
          </div>

          {/* Winners table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold">Fecha</th>
                    <th className="text-left px-6 py-4 font-semibold">Juego</th>
                    <th className="text-left px-6 py-4 font-semibold">Números Ganadores</th>
                    <th className="text-left px-6 py-4 font-semibold">Cartera Ganadora</th>
                    <th className="text-left px-6 py-4 font-semibold">Hash de Transacción</th>
                    <th className="text-right px-6 py-4 font-semibold">Premio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {winners.map((winner) => (
                    <tr key={winner.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">{winner.date}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white whitespace-nowrap">{winner.game}</td>
                      <td className="px-6 py-4">
                        <WinningNumbers winner={winner} />
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleCopy(winner.id, winner.walletAddress)}
                          className="font-mono text-xs text-blue-600 dark:text-blue-400 hover:underline"
                          title={winner.walletAddress}
                        >
                          {truncateAddress(winner.walletAddress)}
                        </button>
                        {copiedId === winner.id && (
                          <span className="ml-2 text-xs text-green-600 dark:text-green-400">✓ Copiado</span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-gray-500 dark:text-gray-400">{winner.txHash}</td>
                      <td className="px-6 py-4 text-right font-bold text-green-600 dark:text-green-400 whitespace-nowrap">
                        {formatUsd(winner.amount)} {winner.crypto}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-700">
              {winners.map((winner) => (
                <div key={winner.id} className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{winner.game}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{winner.date}</p>
                    </div>
                    <p className="font-bold text-green-600 dark:text-green-400">
                      {formatUsd(winner.amount)} {winner.crypto}
                    </p>
                  </div>
                  <WinningNumbers winner={winner} />
                  <div>
                    <button
                      onClick={() => handleCopy(winner.id, winner.walletAddress)}
                      className="font-mono text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {truncateAddress(winner.walletAddress)}
                    </button>
                    {copiedId === winner.id && (
                      <span className="ml-2 text-xs text-green-600 dark:text-green-400">✓ Copiado</span>
                    )}
                  </div>
                  <p className="font-mono text-xs text-gray-400 dark:text-gray-500">{winner.txHash}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Info banner */}
          <div className="mt-8 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🔒</div>
              <div>
                <h3 className="font-bold text-lg mb-2">¿Cómo funciona?</h3>
                <p className="text-blue-100">
                  Los premios se pagan directamente a la cartera cripto del ganador, sin pasar por
                  intermediarios. Cada pago queda registrado en blockchain con su propio hash de
                  transacción; las direcciones se muestran parcialmente por privacidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
