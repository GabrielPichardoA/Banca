'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { gameConfig } from '@/lib/gameConfig';
import { GameType } from '@/types';

type LotoModalityType = 'loto' | 'mas' | 'supermas';

interface TicketSelection {
  id: string;
  modalidad: LotoModalityType;
  numbers: number[];
  bonus1?: number;
  bonus2?: number;
  price: number;
}

interface UnifiedLotoGameProps {
  onSelect: (tickets: TicketSelection[]) => void;
  isLoading?: boolean;
}

export default function UnifiedLotoGame({ onSelect, isLoading = false }: UnifiedLotoGameProps) {
  const config = gameConfig[GameType.LOTO];
  const [activeTab, setActiveTab] = useState<LotoModalityType>('loto');
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [bonus1, setBonus1] = useState<number | undefined>();
  const [bonus2, setBonus2] = useState<number | undefined>();

  const modalityConfigs = {
    loto: {
      name: '🎯 Loto',
      config: config.lotoModalities?.loto,
      color: 'from-orange-500 to-amber-600',
      description: 'Elige 6 números del 1 al 40',
      bonus: false
    },
    mas: {
      name: '⭐ Más',
      config: config.lotoModalities?.mas,
      color: 'from-yellow-500 to-amber-600',
      description: 'Elige 6 números (1-40) + 1 Bono (1-12)',
      bonus: true,
      bonusRange: [1, 12]
    },
    supermas: {
      name: '👑 Supermas',
      config: config.lotoModalities?.supermas,
      color: 'from-purple-600 to-blue-600',
      description: 'Elige 6 números (1-40) + 2 Bonos (1-12, 1-15)',
      bonus: true,
      bonusRanges: [[1, 12], [1, 15]]
    }
  };

  const currentModality = modalityConfigs[activeTab];
  const currentConfig = currentModality.config;
  const isNumbersValid = selectedNumbers.length === 6;
  const isBonusValid = activeTab === 'loto' ? true : activeTab === 'mas' ? bonus1 !== undefined : bonus1 !== undefined && bonus2 !== undefined;
  const isReadyToAdd = isNumbersValid && isBonusValid;

  const handleNumberClick = (num: number) => {
    setSelectedNumbers((prev) => {
      if (prev.includes(num)) {
        return prev.filter((n) => n !== num);
      }
      if (prev.length < 6) {
        return [...prev, num].sort((a, b) => a - b);
      }
      return prev;
    });
  };

  const handleQuickPick = () => {
    // Generar 6 números aleatorios (1-40)
    const numbers: number[] = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 40) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    setSelectedNumbers(numbers.sort((a, b) => a - b));

    // Generar bonos aleatorios según la modalidad
    if (activeTab === 'mas') {
      const randomBonus1 = Math.floor(Math.random() * 12) + 1;
      setBonus1(randomBonus1);
    } else if (activeTab === 'supermas') {
      const randomBonus1 = Math.floor(Math.random() * 12) + 1;
      const randomBonus2 = Math.floor(Math.random() * 15) + 1;
      setBonus1(randomBonus1);
      setBonus2(randomBonus2);
    }
  };

  const handleClear = () => {
    setSelectedNumbers([]);
    setBonus1(undefined);
    setBonus2(undefined);
  };

  const handlePayNow = () => {
    if (!isReadyToAdd || !currentConfig) return;

    const ticket: TicketSelection = {
      id: `${activeTab}-${Date.now()}`,
      modalidad: activeTab,
      numbers: selectedNumbers,
      bonus1: activeTab === 'mas' || activeTab === 'supermas' ? bonus1 : undefined,
      bonus2: activeTab === 'supermas' ? bonus2 : undefined,
      price: currentConfig.price || 0
    };

    // Enviar directamente a checkout
    onSelect([ticket]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`bg-gradient-to-r ${currentModality.color} text-white p-6 rounded-xl`}>
        <h2 className="text-3xl font-bold mb-2">🎰 LEIDSA Loto</h2>
        <p className="text-white/90">
          Cambiar entre modalidades sin perder tus selecciones. Miércoles y Sábados a las 20:55 (8:55 PM)
        </p>
      </div>

      {/* Modalidad Tabs */}
      <div className="flex gap-2">
        {(Object.entries(modalityConfigs) as Array<[LotoModalityType, typeof modalityConfigs['loto']]>).map(
          ([key, modality]) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key);
              }}
              className={`flex-1 p-4 rounded-lg font-semibold transition-all ${
                activeTab === key
                  ? 'bg-gradient-to-r ' + modality.color + ' text-white shadow-lg'
                  : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
              }`}
            >
              <div className="text-lg">{modality.name}</div>
              <div className="text-sm opacity-90">${modality.config?.price}</div>
            </button>
          )
        )}
      </div>

      {/* Main Game Area */}
      <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">{currentModality.description}</h3>

        {/* Number Grid */}
        <div className="mb-6">
          <p className="text-xs text-gray-400 mb-2">Selecciona exactamente 6 números (1-40)</p>
          <div className="grid grid-cols-8 sm:grid-cols-10 gap-1">
            {Array.from({ length: 40 }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => handleNumberClick(num)}
                disabled={selectedNumbers.length === 6 && !selectedNumbers.includes(num)}
                className={`aspect-square rounded text-xs font-semibold transition-all ${
                  selectedNumbers.includes(num)
                    ? `bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg scale-100`
                    : selectedNumbers.length === 6
                    ? 'bg-white/5 text-gray-400 cursor-not-allowed opacity-50'
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 cursor-pointer'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Bonus Selection */}
        {currentModality.bonus && (
          <div className="mb-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-2 text-gray-300">
                Bono 1: 1-{activeTab === 'mas' ? '12' : '12'}
              </label>
              <div className="grid grid-cols-6 sm:grid-cols-12 gap-1">
                {Array.from({ length: activeTab === 'mas' ? 12 : 12 }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => setBonus1(num)}
                    className={`aspect-square rounded text-xs font-semibold transition-all ${
                      bonus1 === num
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-100'
                        : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 cursor-pointer'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'supermas' && (
              <div>
                <label className="block text-xs font-semibold mb-2 text-gray-300">Bono 2: 1-15</label>
                <div className="grid grid-cols-[repeat(8,minmax(0,1fr))] sm:grid-cols-[repeat(15,minmax(0,1fr))] gap-1">
                  {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => setBonus2(num)}
                      className={`aspect-square rounded text-xs font-semibold transition-all ${
                        bonus2 === num
                          ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-100'
                          : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 cursor-pointer'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Selection Display */}
        {selectedNumbers.length > 0 && (
          <div className="mb-6 bg-white/10 rounded-lg p-4 border border-white/20">
            <p className="text-sm text-gray-300 mb-2">Números seleccionados:</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedNumbers.map((num) => (
                <span key={num} className="bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full text-sm font-semibold">
                  {num}
                </span>
              ))}
            </div>
            {(activeTab === 'mas' || activeTab === 'supermas') && (
              <div className="flex gap-2 text-sm">
                {bonus1 !== undefined && (
                  <span className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full font-semibold">
                    Bono 1: {bonus1}
                  </span>
                )}
                {activeTab === 'supermas' && bonus2 !== undefined && (
                  <span className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full font-semibold">
                    Bono 2: {bonus2}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            onClick={handleQuickPick}
            variant="outline"
            className="text-white border-white/30 hover:bg-white/10"
          >
            🎰 Random
          </Button>
          <Button
            onClick={handleClear}
            variant="ghost"
            disabled={selectedNumbers.length === 0 && !bonus1 && !bonus2}
            className="text-white hover:bg-white/10"
          >
            Limpiar
          </Button>
          <Button
            onClick={handlePayNow}
            disabled={!isReadyToAdd || isLoading}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold"
          >
            {isLoading ? '⏳ Procesando...' : '💳 Pagar Ahora'}
          </Button>
        </div>
      </div>

      {/* Game Description Section */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 text-white">
        <h3 className="text-2xl font-bold mb-4 text-center text-amber-400">
          ¿Por qué jugar {currentModality.name}?
        </h3>
        
        <div className="space-y-6">
          {/* Description */}
          <div>
            <p className="text-gray-200 mb-4">
              LEIDSA Loto es uno de los juegos más populares en República Dominicana. 
              {activeTab === 'loto' && ' Selecciona 6 números del 1 al 40 y gana premios fijos cuando aciertes.'} 
              {activeTab === 'mas' && ' Agrega un bono adicional para más oportunidades de ganar premios mayores.'} 
              {activeTab === 'supermas' && ' Selecciona dos bonos adicionales para triplicar tus oportunidades de ganar.'} 
              Todos los premios se pagan en USD (USDT Crypto).
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="font-semibold text-amber-400 mb-3">✨ Razones para Jugar:</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• 💰 Premios fijos garantizados en cada categoría</li>
              <li>• 🎯 Selecciona tus propios números o usa Random</li>
              {activeTab === 'mas' && <li>• ⭐ 1 bono adicional (1-12) para aumentar premios</li>}
              {activeTab === 'supermas' && <li>• 👑 2 bonos adicionales para máximas ganancias</li>}
              <li>• 🔐 Pagos seguros en criptomonedas (USDT)</li>
              <li>• ⏰ Sorteos diarios a las 20:55 (8:55 PM)</li>
            </ul>
          </div>

          {/* Prize Table */}
          <div>
            <h4 className="font-semibold text-amber-400 mb-3">🏆 Tabla de Premios:</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-white/10">
                    <th className="border border-white/20 p-2 text-left">Aciertos</th>
                    {activeTab === 'loto' && <th className="border border-white/20 p-2 text-right">Premio Loto</th>}
                    {activeTab === 'mas' && (
                      <>
                        <th className="border border-white/20 p-2 text-right">Premio Loto</th>
                        <th className="border border-white/20 p-2 text-right">Premio Más</th>
                      </>
                    )}
                    {activeTab === 'supermas' && (
                      <>
                        <th className="border border-white/20 p-2 text-right">Premio Loto</th>
                        <th className="border border-white/20 p-2 text-right">Premio Más</th>
                        <th className="border border-white/20 p-2 text-right">Premio Supermas</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr className="hover:bg-white/5">
                    <td className="border border-white/20 p-2">6 números</td>
                    {activeTab === 'loto' && <td className="border border-white/20 p-2 text-right font-semibold">$4,000.00</td>}
                    {activeTab === 'mas' && (
                      <>
                        <td className="border border-white/20 p-2 text-right">$4,000.00</td>
                        <td className="border border-white/20 p-2 text-right font-semibold">$10,000.00</td>
                      </>
                    )}
                    {activeTab === 'supermas' && (
                      <>
                        <td className="border border-white/20 p-2 text-right">$4,000.00</td>
                        <td className="border border-white/20 p-2 text-right">$10,000.00</td>
                        <td className="border border-white/20 p-2 text-right font-semibold">$50,000.00</td>
                      </>
                    )}
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="border border-white/20 p-2">5 números</td>
                    {activeTab === 'loto' && <td className="border border-white/20 p-2 text-right">$400.00</td>}
                    {activeTab === 'mas' && (
                      <>
                        <td className="border border-white/20 p-2 text-right">$400.00</td>
                        <td className="border border-white/20 p-2 text-right">$1,000.00</td>
                      </>
                    )}
                    {activeTab === 'supermas' && (
                      <>
                        <td className="border border-white/20 p-2 text-right">$400.00</td>
                        <td className="border border-white/20 p-2 text-right">$1,000.00</td>
                        <td className="border border-white/20 p-2 text-right">$5,000.00</td>
                      </>
                    )}
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="border border-white/20 p-2">4 números</td>
                    {activeTab === 'loto' && <td className="border border-white/20 p-2 text-right">$25.00</td>}
                    {activeTab === 'mas' && (
                      <>
                        <td className="border border-white/20 p-2 text-right">$25.00</td>
                        <td className="border border-white/20 p-2 text-right">$50.00</td>
                      </>
                    )}
                    {activeTab === 'supermas' && (
                      <>
                        <td className="border border-white/20 p-2 text-right">$25.00</td>
                        <td className="border border-white/20 p-2 text-right">$50.00</td>
                        <td className="border border-white/20 p-2 text-right">$200.00</td>
                      </>
                    )}
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="border border-white/20 p-2">3 números</td>
                    {activeTab === 'loto' && <td className="border border-white/20 p-2 text-right">$5.00</td>}
                    {activeTab === 'mas' && (
                      <>
                        <td className="border border-white/20 p-2 text-right">$5.00</td>
                        <td className="border border-white/20 p-2 text-right">$10.00</td>
                      </>
                    )}
                    {activeTab === 'supermas' && (
                      <>
                        <td className="border border-white/20 p-2 text-right">$5.00</td>
                        <td className="border border-white/20 p-2 text-right">$10.00</td>
                        <td className="border border-white/20 p-2 text-right">$20.00</td>
                      </>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2 italic">
              Nota: Los premios mostrados son ejemplos. Los premios exactos dependen del número de ganadores.
            </p>
          </div>

          {/* How to Win */}
          <div>
            <h4 className="font-semibold text-amber-400 mb-3">🎯 Cómo Ganar:</h4>
            <ol className="space-y-2 text-sm text-gray-300">
              <li><strong>1.</strong> Selecciona {activeTab === 'loto' ? '6' : activeTab === 'mas' ? '6' : '6'} números entre 1 y 40</li>
              {(activeTab === 'mas' || activeTab === 'supermas') && (
                <li><strong>2.</strong> Selecciona {activeTab === 'mas' ? 'un bono (1-12)' : '2 bonos (1-12 y 1-15)'}</li>
              )}
              <li><strong>{activeTab === 'loto' ? '2' : '3'}.</strong> Tu boleto será verificado contra el sorteo oficial de LEIDSA</li>
              <li><strong>{activeTab === 'loto' ? '3' : '4'}.</strong> Ganas si aciertas mínimo 3 números correctos</li>
              <li><strong>{activeTab === 'loto' ? '4' : '5'}.</strong> Los premios se acreditan automáticamente en tu cuenta en USDT</li>
            </ol>
          </div>

          {/* Price Info */}
          <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-300 text-sm">Precio por boleto</p>
                <p className="text-3xl font-bold text-amber-400">${currentConfig?.price}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-300 text-sm">Sorteo</p>
                <p className="font-semibold text-white">Miércoles y Sábados</p>
                <p className="text-amber-300 text-sm">20:55 (8:55 PM)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">ℹ️ Cómo Funciona</h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Cambia entre Loto, Más y Supermas usando las pestañas arriba</li>
          <li>• Selecciona exactamente 6 números y los bonos requeridos</li>
          <li>• Presiona "💳 Pagar Ahora" para ir directamente al checkout</li>
        </ul>
      </div>
    </div>
  );
}
