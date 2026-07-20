'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTickets } from '@/hooks/useTickets';
import { useState } from 'react';
import Link from 'next/link';

interface MockTicketData {
  id: string;
  userId: string;
  gameType: string;
  selectedNumbers: number[];
  drawNumbers?: number[];
  totalPrice: number;
  crypto: string;
  status: 'active' | 'drawn' | 'paid';
  winnings?: number;
  numberMatches?: number;
  createdAt: string;
}

interface ConfirmationModal {
  isOpen: boolean;
  ticketId?: string;
  winnings?: number;
  gameType?: string;
  drawNumbers?: number[];
  selectedNumbers?: number[];
  isSuccess?: boolean;
}

export default function MyTicketsPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [confirmation, setConfirmation] = useState<ConfirmationModal>({ isOpen: false });
  const [paidTickets, setPaidTickets] = useState<Set<string>>(new Set());

  // Usuario de prueba si no hay usuario autenticado
  const currentUser = user || { id: 'demo-user-1', email: 'demo@test.com', name: 'Demo User' };

  const mockTickets = [
    {
      id: 'ticket-15',
      userId: currentUser.id,
      gameType: 'LOTO',
      selectedNumbers: [5, 12, 18, 25, 32, 39],
      drawNumbers: undefined,
      totalPrice: 10,
      crypto: 'USDT',
      status: 'active',
      winnings: undefined,
      numberMatches: undefined,
      createdAt: '2026-06-22T11:45:00Z'
    },
    {
      id: 'ticket-14',
      userId: currentUser.id,
      gameType: 'KinoTV',
      selectedNumbers: [10, 20, 30, 40, 50, 60, 70, 1, 11, 21, 31, 41, 51, 61, 71, 2, 12, 22, 32, 42],
      drawNumbers: undefined,
      totalPrice: 5,
      crypto: 'USDT',
      status: 'active',
      winnings: undefined,
      numberMatches: undefined,
      createdAt: '2026-06-22T11:00:00Z'
    },
    {
      id: 'ticket-13',
      userId: currentUser.id,
      gameType: 'Loto Pool',
      selectedNumbers: [2, 8, 14, 19, 28, 4, 12],
      drawNumbers: undefined,
      totalPrice: 5,
      crypto: 'USDT',
      status: 'active',
      winnings: undefined,
      numberMatches: undefined,
      createdAt: '2026-06-22T10:30:00Z'
    },
    {
      id: 'ticket-12',
      userId: currentUser.id,
      gameType: 'Quiniela',
      selectedNumbers: [42, 88],
      drawNumbers: undefined,
      totalPrice: 2,
      crypto: 'USDT',
      status: 'active',
      winnings: undefined,
      numberMatches: undefined,
      createdAt: '2026-06-22T10:00:00Z'
    },
    {
      id: 'ticket-11',
      userId: currentUser.id,
      gameType: 'LOTO',
      selectedNumbers: [3, 9, 15, 21, 27, 33],
      drawNumbers: undefined,
      totalPrice: 10,
      crypto: 'USDT',
      status: 'active',
      winnings: undefined,
      numberMatches: undefined,
      createdAt: '2026-06-22T09:15:00Z'
    },
    {
      id: 'ticket-10',
      userId: currentUser.id,
      gameType: 'KinoTV',
      selectedNumbers: [1, 7, 13, 19, 25, 31, 37, 43, 49, 55, 2, 8, 14, 20, 26, 32, 38, 44, 50, 56],
      drawNumbers: undefined,
      totalPrice: 5,
      crypto: 'USDT',
      status: 'active',
      winnings: undefined,
      numberMatches: undefined,
      createdAt: '2026-06-22T08:00:00Z'
    },
    {
      id: 'ticket-01',
      userId: currentUser.id,
      gameType: 'KinoTV',
      selectedNumbers: [5, 12, 18, 22, 28, 31, 35, 40, 45, 50, 3, 9, 14, 21, 26, 33, 37, 43, 50, 57],
      drawNumbers: [5, 12, 18, 22, 28, 31, 35, 40, 45, 50, 3, 9, 14, 21, 26, 33, 37, 43, 50, 57],
      totalPrice: 5,
      crypto: 'USDT',
      status: 'drawn',
      winnings: 5000,
      numberMatches: 20,
      createdAt: '2026-06-22T10:30:00Z'
    },
    {
      id: 'ticket-02',
      userId: currentUser.id,
      gameType: 'LOTO',
      selectedNumbers: [7, 14, 24, 25, 35, 36],
      drawNumbers: [7, 14, 24, 25, 35, 36],
      totalPrice: 10,
      crypto: 'USDT',
      status: 'drawn',
      winnings: 150000,
      numberMatches: 6,
      createdAt: '2026-06-21T15:45:00Z'
    },
    {
      id: 'ticket-03',
      userId: currentUser.id,
      gameType: 'Quiniela',
      selectedNumbers: [33, 61],
      drawNumbers: [33, 61],
      totalPrice: 2,
      crypto: 'USDT',
      status: 'drawn',
      winnings: 75000,
      numberMatches: 2,
      createdAt: '2026-06-21T12:00:00Z'
    },
    {
      id: 'ticket-16',
      userId: currentUser.id,
      gameType: 'Loto Pool',
      selectedNumbers: [3, 10, 15, 22, 30, 6, 18],
      drawNumbers: [3, 10, 15, 22, 30, 6, 18],
      totalPrice: 5,
      crypto: 'USDT',
      status: 'drawn',
      winnings: 8500,
      numberMatches: 7,
      createdAt: '2026-06-21T14:30:00Z'
    },
    {
      id: 'ticket-17',
      userId: currentUser.id,
      gameType: 'Quiniela',
      selectedNumbers: [27, 54],
      drawNumbers: [27, 54],
      totalPrice: 2,
      crypto: 'USDT',
      status: 'drawn',
      winnings: 75000,
      numberMatches: 2,
      createdAt: '2026-06-20T10:20:00Z'
    },
    {
      id: 'ticket-04',
      userId: currentUser.id,
      gameType: 'Loto Pool',
      selectedNumbers: [9, 16, 17, 24, 31],
      drawNumbers: [9, 16, 17, 24, 31],
      totalPrice: 5,
      crypto: 'USDT',
      status: 'drawn',
      winnings: 2500,
      numberMatches: 5,
      createdAt: '2026-06-20T18:20:00Z'
    },
    {
      id: 'ticket-05',
      userId: currentUser.id,
      gameType: 'KinoTV',
      selectedNumbers: [1, 8, 15, 22, 30, 38, 42, 48, 55, 60, 2, 11, 17, 24, 29, 36, 41, 47, 52, 65],
      drawNumbers: [5, 12, 18, 22, 28, 31, 35, 40, 45, 50, 3, 9, 14, 21, 26, 33, 37, 43, 50, 57],
      totalPrice: 5,
      crypto: 'USDT',
      status: 'drawn',
      winnings: 0,
      numberMatches: 2,
      createdAt: '2026-06-20T14:15:00Z'
    },
    {
      id: 'ticket-06',
      userId: currentUser.id,
      gameType: 'LOTO',
      selectedNumbers: [5, 10, 20, 30, 40, 45],
      drawNumbers: [7, 14, 24, 25, 35, 36],
      totalPrice: 10,
      crypto: 'USDT',
      status: 'drawn',
      winnings: 0,
      numberMatches: 0,
      createdAt: '2026-06-19T11:30:00Z'
    },
    {
      id: 'ticket-07',
      userId: currentUser.id,
      gameType: 'Quiniela',
      selectedNumbers: [15, 75],
      drawNumbers: [33, 61],
      totalPrice: 2,
      crypto: 'USDT',
      status: 'drawn',
      winnings: 0,
      numberMatches: 0,
      createdAt: '2026-06-18T09:45:00Z'
    },
    {
      id: 'ticket-08',
      userId: currentUser.id,
      gameType: 'KinoTV',
      selectedNumbers: [6, 13, 19, 27, 34, 39, 44, 51, 58, 66, 8, 13, 19, 27, 34, 39, 44, 51, 58, 66],
      drawNumbers: [6, 13, 19, 27, 34, 39, 44, 51, 58, 66, 8, 13, 19, 27, 34, 39, 44, 51, 58, 66],
      totalPrice: 5,
      crypto: 'USDT',
      status: 'paid',
      winnings: 250000,
      numberMatches: 20,
      createdAt: '2026-06-17T16:20:00Z'
    },
    {
      id: 'ticket-09',
      userId: currentUser.id,
      gameType: 'LOTO',
      selectedNumbers: [2, 8, 14, 19, 28, 4],
      drawNumbers: [2, 8, 14, 19, 28, 4],
      totalPrice: 10,
      crypto: 'USDT',
      status: 'paid',
      winnings: 5000,
      numberMatches: 6,
      createdAt: '2026-06-16T13:10:00Z'
    },
  ];

  const userTickets = mockTickets;

  const handleClaimClick = (ticket: any) => {
    setConfirmation({
      isOpen: true,
      ticketId: ticket.id,
      winnings: ticket.winnings,
      gameType: ticket.gameType,
      drawNumbers: ticket.drawNumbers,
      selectedNumbers: ticket.selectedNumbers
    });
  };

  const handleConfirmClaim = () => {
    if (confirmation.ticketId) {
      setPaidTickets(new Set([...paidTickets, confirmation.ticketId]));
      setConfirmation(prev => ({ ...prev, isSuccess: true }));
      setTimeout(() => {
        setConfirmation({ isOpen: false });
      }, 3500);
    }
  };

  // Ordenar por fecha (más reciente primero) sin categorías
  const sortedTickets = [...userTickets].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Confirmation Modal */}
      {confirmation.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8">
            {!confirmation.isSuccess ? (
              <>
                <div className="text-center mb-6">
                  <div className="inline-block bg-green-100 dark:bg-green-900/30 p-4 rounded-full mb-4">
                    <p className="text-3xl font-bold text-green-600">✓</p>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {t('myTickets.confirmClaim')}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {confirmation.gameType}
                  </p>
                </div>

                <div className="space-y-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('myTickets.playedNumbers')}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {confirmation.selectedNumbers?.join(', ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('myTickets.winningNumbers')}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {confirmation.drawNumbers?.join(', ')}
                    </p>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('myTickets.amountToClaim')}</p>
                    <p className="text-4xl font-bold text-green-600">
                      ${confirmation.winnings?.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setConfirmation({ isOpen: false })}
                    className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold py-3 px-4 rounded-lg transition-all"
                  >
                    {t('myTickets.cancel')}
                  </button>
                  <button
                    onClick={handleConfirmClaim}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg"
                  >
                    {t('myTickets.confirmClaim')}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="inline-block bg-green-100 dark:bg-green-900/30 p-6 rounded-full mb-4 animate-bounce">
                  <p className="text-5xl font-bold text-green-600">✓</p>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {t('myTickets.successTitle')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {t('myTickets.successMessage')}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  ${confirmation.winnings?.toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">
            {t('myTickets.title')}
          </h1>

          {userTickets.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('myTickets.noTickets')}
              </p>
              <Link
                href="/play"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
              >
                {t('myTickets.goPlay')}
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedTickets.map((ticket) => {
                const date = new Date(ticket.createdAt);
                const dateStr = date.toLocaleDateString('es-ES', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });

                let statusColor = 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
                let statusLabel = t('myTickets.active');
                let statusIcon = '⏳';

                if (ticket.status === 'paid') {
                  statusColor = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
                  statusLabel = t('myTickets.paid');
                  statusIcon = '✓';
                } else if (ticket.status === 'drawn') {
                  if (ticket.winnings && ticket.winnings > 0) {
                    statusColor = 'border-green-500 bg-green-50 dark:bg-green-900/20';
                    statusLabel = t('myTickets.winner');
                    statusIcon = '🎉';
                  } else {
                    statusColor = 'border-red-500 bg-red-50 dark:bg-red-900/20';
                    statusLabel = t('myTickets.loser');
                    statusIcon = '✗';
                  }
                }

                return (
                  <div
                    key={ticket.id}
                    className={`border-2 ${statusColor} rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">{t('myTickets.date')}</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {dateStr}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">{t('myTickets.game')}</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {ticket.gameType}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">{t('myTickets.numbers')}</p>
                        <p className="text-xs font-semibold text-gray-900 dark:text-white">
                          {ticket.selectedNumbers.join(', ')}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">{t('myTickets.cost')}</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          ${ticket.totalPrice.toFixed(2)} {ticket.crypto}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">{t('myTickets.status')}</p>
                        <p className="text-sm font-bold">
                          {statusIcon} {statusLabel}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">{t('myTickets.result')}</p>
                        {ticket.status === 'active' ? (
                          <p className="text-sm font-semibold text-gray-500">{t('myTickets.pending')}</p>
                        ) : (
                          <>
                            <p className="text-xs font-semibold text-gray-900 dark:text-white">
                              {ticket.numberMatches}/{ticket.selectedNumbers.length} aciertos
                            </p>
                            {ticket.winnings && ticket.winnings > 0 && (
                              <>
                                {ticket.status === 'drawn' && !paidTickets.has(ticket.id) && (
                                  <button
                                    onClick={() => handleClaimClick(ticket)}
                                    className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 px-3 rounded transition-all"
                                  >
                                    {t('myTickets.claim')} ${ticket.winnings.toFixed(2)}
                                  </button>
                                )}
                                {paidTickets.has(ticket.id) && (
                                  <p className="mt-2 text-xs font-bold text-emerald-600">
                                    ✓ ${ticket.winnings.toFixed(2)}
                                  </p>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Botón Volver a Jugar */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Link
                        href={`/play?gameType=${encodeURIComponent(ticket.gameType)}&numbers=${ticket.selectedNumbers.join(',')}`}
                        className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1.5 px-3 rounded transition-all duration-300 text-xs"
                      >
                        {t('myTickets.replayGame')}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
