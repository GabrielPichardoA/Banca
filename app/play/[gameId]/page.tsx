'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import LotoSelector from '@/components/games/LotoSelector';
import { KinoTVGame } from '@/components/games/KinoTVGame';
import { LotoPoolGame } from '@/components/games/LotoPoolGame';
import { QuinielaPaleSelector } from '@/components/games/QuinielaPaleSelector';
import { Pega3Game } from '@/components/games/Pega3Game';
import { gameConfig } from '@/lib/gameConfig';
import { GameType } from '@/types';
import { createTicket } from '@/lib/games';

interface CartItem {
  id?: string;
  numbers: number[];
  modalidad?: string;
  bonus1?: number;
  bonus2?: number;
  quantity: number;
  price?: number; // Para juegos con precios variables como Loto
}

export default function PlayGamePage() {
  const router = useRouter();
  const params = useParams();
  const { user, balance, updateBalance } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const gameId = params.gameId as string;
  const gameType = Object.values(GameType).find(type => type === gameId) as GameType | undefined;
  const game = gameType ? gameConfig[gameType] : undefined;

  if (!game || !gameType) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl font-semibold mb-4">Juego no encontrado</p>
            <Button onClick={() => router.push('/play')}>Volver a Juegos</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSelectNumbers = (data: any, modalidad?: string) => {
    // Si data es un array de TicketSelection (múltiples jugadas)
    if (Array.isArray(data) && data.length > 0 && data[0].modalidad !== undefined) {
      // Múltiples tickets
      const newItems = data.map((ticket: any) => ({
        id: ticket.id,
        numbers: ticket.numbers,
        modalidad: ticket.modalidad,
        bonus1: ticket.bonus1,
        bonus2: ticket.bonus2,
        quantity: 1,
        price: ticket.price
      }));
      setCartItems([...cartItems, ...newItems]);
    } else {
      // Un solo ticket (backward compatibility)
      const newItem: CartItem = { 
        numbers: data, 
        modalidad, 
        quantity: 1,
        price: game?.pricePerTicket 
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(index);
      return;
    }
    const newItems = [...cartItems];
    newItems[index].quantity = quantity;
    setCartItems(newItems);
  };

  const totalCost = cartItems.reduce((sum, item) => {
    const itemPrice = item.price || game.pricePerTicket;
    return sum + itemPrice * item.quantity;
  }, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    setIsProcessing(true);
    try {
      // Verificar que hay suficiente balance
      const balanceAmount = balance?.totalUsdValue || 0;
      if (balanceAmount < totalCost) {
        alert('Saldo insuficiente para completar esta compra');
        setIsProcessing(false);
        return;
      }

      // Crear tickets y actualizar balance
      for (const item of cartItems) {
        for (let i = 0; i < item.quantity; i++) {
          const ticket = createTicket(
            user!.id,
            gameType,
            item.numbers,
            1,
            game.pricePerTicket,
            'USDT',
            game.pricePerTicket,
            item.modalidad
          );
          // El ticket se guardará en localStorage en el contexto/hook
        }
      }

      // Actualizar balance (deducir costo total)
      updateBalance(-totalCost, 'USDT');

      // Mostrar confirmación
      alert(`¡Compra exitosa! ${totalItems} boleto(s) por $${totalCost}`);

      // Limpiar carrito y volver a la página de juegos
      setCartItems([]);
      router.push('/my-tickets');
    } catch (error) {
      console.error('Error en checkout:', error);
      alert('Hubo un error al procesar la compra');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
        {/* Game Selector */}
        <div className="lg:col-span-2">
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-lg shadow-2xl p-6 border border-white/20 dark:border-white/10">
            {gameType === GameType.LOTO && <LotoSelector onSelect={handleSelectNumbers} isLoading={isProcessing} />}
            {gameType === GameType.KINO_TV && <KinoTVGame onSelect={handleSelectNumbers} isLoading={isProcessing} />}
            {gameType === GameType.LOTO_POOL && <LotoPoolGame onSelect={handleSelectNumbers} isLoading={isProcessing} />}
            {game.quinielaPalePrizes && <QuinielaPaleSelector gameType={gameType} onSelect={handleSelectNumbers} isLoading={isProcessing} />}
            {gameType === GameType.PEGA3 && <Pega3Game onSelect={handleSelectNumbers} isLoading={isProcessing} />}
          </div>
        </div>

        {/* Cart Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-lg shadow-2xl p-6 sticky top-6 border border-white/20 dark:border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-white">Tu Carrito</h2>

            {cartItems.length === 0 ? (
              <p className="text-gray-300 text-center py-8">Selecciona números para agregar al carrito</p>
            ) : (
              <>
                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {cartItems.map((item, index) => (
                    <div key={index} className="border-b border-white/10 pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-white">
                            {item.numbers.join(', ')}
                            {item.bonus1 !== undefined && <span className="text-xs text-purple-300"> • Bono 1: {item.bonus1}</span>}
                            {item.bonus2 !== undefined && <span className="text-xs text-purple-300"> • Bono 2: {item.bonus2}</span>}
                          </p>
                          {item.modalidad && <p className="text-xs text-gray-400 mt-1">{item.modalidad}</p>}
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(index)}
                          className="text-red-400 hover:text-red-300 text-sm font-semibold transition-colors"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(index, item.quantity - 1)}
                            className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition-colors text-white"
                            disabled={isProcessing}
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-semibold text-white">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(index, item.quantity + 1)}
                            className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition-colors text-white"
                            disabled={isProcessing}
                          >
                            +
                          </button>
                        </div>
                        <p className="font-semibold text-white">${((item.price || game.pricePerTicket) * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-white/10 pt-4 space-y-2 mb-6">
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Boletos:</span>
                    <span>{totalItems}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-white">
                    <span>Total:</span>
                    <span>${totalCost}</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 text-sm">
                    <p className="text-gray-300">Saldo disponible:</p>
                    <p className="font-semibold text-white">${balance?.totalUsdValue || 0}</p>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0 || isProcessing || (balance?.totalUsdValue || 0) < totalCost}
                  size="lg"
                  className="w-full mb-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
                >
                  {isProcessing ? 'Procesando...' : 'Pagar Ahora'}
                </Button>

                <Button
                  onClick={() => setCartItems([])}
                  variant="ghost"
                  size="sm"
                  className="w-full text-gray-300 hover:text-white hover:bg-white/10"
                >
                  Limpiar Carrito
                </Button>
              </>
            )}

            {/* Back Button */}
            <Button
              onClick={() => router.push('/play')}
              variant="outline"
              size="sm"
              className="w-full mt-4 border-white/20 text-gray-300 hover:text-white hover:bg-white/10"
            >
              Volver a Juegos
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
