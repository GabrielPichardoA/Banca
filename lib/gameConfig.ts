import { GameConfig, GameType, PrizeStructure, LotoModality, QuinielaPalePrizeTable } from '@/types';

// ============================================
// Prize structures for each game
// ============================================

const lotoPrizes: PrizeStructure = {
  jackpot: [
    { matches: 6, percentage: 50 },
    { matches: 5, percentage: 20 },
    { matches: 4, percentage: 15 },
    { matches: 3, percentage: 15 }
  ],
  fixed: []
};

// LOTO - 6/40 basic game
const lotoGamePrizes: PrizeStructure = {
  jackpot: [
    { matches: 6, percentage: 100 }, // $20,000+ min jackpot (USD)
    { matches: 5, percentage: 50 },
    { matches: 4, percentage: 25 },
    { matches: 3, percentage: 25 }
  ],
  fixed: []
};

// MAS - 6/40 + 1 bono (1-12)
const masGamePrizes: PrizeStructure = {
  jackpot: [
    { matches: 7, percentage: 100 }, // 6 + bono = $150,000+ min jackpot (USD)
    { matches: 6, percentage: 50 },
    { matches: 5, percentage: 25 },
    { matches: 4, percentage: 25 }
  ],
  fixed: []
};

// SUPERMAS - 6/40 + 2 bonos (1-12, 1-15)
const supermasGamePrizes: PrizeStructure = {
  jackpot: [
    { matches: 8, percentage: 100 }, // 6 + both bonos = $250,000+ jackpot (USD)
    { matches: 7, percentage: 50 },
    { matches: 6, percentage: 25 },
    { matches: 2, percentage: 5 } // Just the 2 bonos
  ],
  fixed: []
};

const kinotvPrizes: PrizeStructure = {
  jackpot: [],
  fixed: [
    { matches: 20, fixed: 250000 },   // $250,000 (USD) - 20/20
    { matches: 19, fixed: 100000 },   // $100,000 (USD) - 19/20
    { matches: 18, fixed: 50000 },    // $50,000 (USD) - 18/20
    { matches: 17, fixed: 25000 },    // $25,000 (USD) - 17/20
    { matches: 16, fixed: 10000 },    // $10,000 (USD) - 16/20
    { matches: 15, fixed: 5000 },     // $5,000 (USD) - 15/20
    { matches: 14, fixed: 2000 },     // $2,000 (USD) - 14/20
    { matches: 13, fixed: 1000 },     // $1,000 (USD) - 13/20
    { matches: 12, fixed: 500 },      // $500 (USD) - 12/20
    { matches: 11, fixed: 150 },      // $150 (USD) - 11/20
    { matches: 10, fixed: 50 },       // $50 (USD) - 10/20
    { matches: 9, fixed: 10 },        // $10 (USD) - 9/20
    { matches: 8, fixed: 3 },         // $3 (USD) - 8/20
    { matches: 7, fixed: 1 },         // $1 (USD) - 7/20
    { matches: 6, fixed: 0.5 },       // $0.50 (USD) - 6/20
    { matches: 5, fixed: 0.2 },       // $0.20 (USD) - 5/20
    { matches: 0, fixed: 0.1 }        // $0.10 (USD) - CERO prize
  ]
};

const lotopoolPrizes: PrizeStructure = {
  jackpot: [
    { matches: 5, percentage: 60 },
    { matches: 4, percentage: 25 },
    { matches: 3, percentage: 15 }
  ],
  fixed: []
};

// ============================================
// QUINIELA PALE - Sorteos reales de bancas dominicanas
// Cada sorteo saca 3 números (00-99): 1er, 2do y 3er premio.
// Quiniela = apuesta 1 número, Pale = 2 números, Tripleta = 3 números.
// Los valores son el multiplicador pagado por cada $1 apostado
// (equivalente a "pesos por cada peso apostado" en las bancas reales).
// ============================================

// Estructura estándar compartida por Leidsa, Loteka, La Suerte Dominicana y Lotería Real
const STANDARD_QUINIELA_PALE_PRIZES: QuinielaPalePrizeTable = {
  quiniela: { first: 60, second: 8, third: 4 },
  pale: { firstSecond: 1000, firstThird: 1000, secondThird: 100 },
  tripleta: { allThree: 20000, twoOfThree: 100 }
};

// Lotería Nacional paga distinto: 3er premio más alto en Quiniela y Pale con multiplicadores mayores
const LOTERIA_NACIONAL_PRIZES: QuinielaPalePrizeTable = {
  quiniela: { first: 60, second: 8, third: 5 },
  pale: { firstSecond: 3000, firstThird: 3000, secondThird: 150 },
  tripleta: { allThree: 20000, twoOfThree: 100 }
};

// Empty placeholder — Quiniela Pale games use `quinielaPalePrizes`, not the jackpot/fixed model
const NO_PRIZES: PrizeStructure = { jackpot: [], fixed: [] };

function quinielaPaleBank(
  id: GameType,
  name: string,
  drawSchedule: GameConfig['drawSchedule'],
  prizeTable: QuinielaPalePrizeTable,
  logo?: string
): GameConfig {
  return {
    id,
    name,
    description: 'Quiniela, Pale y Tripleta — apuesta a la posición del sorteo (1er, 2do y 3er premio)',
    minNumbers: 1,
    maxNumbers: 3,
    numberRange: [0, 99],
    pricePerTicket: 1, // $1 = unidad base de apuesta; el monto apostado se controla con la cantidad
    logo,
    drawSchedule,
    prizes: NO_PRIZES,
    modalidades: ['quiniela', 'pale', 'tripleta'],
    quinielaPalePrizes: prizeTable
  };
}

const pega3Prizes: PrizeStructure = {
  jackpot: [],
  fixed: [
    { matches: 3, modalidad: 'exacto', fixed: 5000 },
    { matches: 3, modalidad: 'mixto', fixed: 700 },
    { matches: 3, modalidad: 'combinado', fixed: 140 }
  ]
};

// Game configurations
export const GAMES_CONFIG: Record<GameType, GameConfig> = {
  [GameType.LOTO]: {
    id: GameType.LOTO,
    name: 'LEIDSA Loto',
    description: '3 modalidades: Loto, Mas, Supermas',
    minNumbers: 6,
    maxNumbers: 6,
    numberRange: [1, 40],
    pricePerTicket: 5,
    logo: '/images/games/loto.png',
    drawSchedule: {
      days: ['Wednesday', 'Saturday'],
      times: ['21:00']
    },
    prizes: lotoPrizes,
    lotoModalities: {
      loto: {
        id: LotoModality.LOTO,
        name: 'Loto',
        description: 'Elige 6 números del 1 al 40. Acierta 3+ para ganar. 6/6 gana $20,000+ garantizado.',
        minNumbers: 6,
        maxNumbers: 6,
        numberRange: [1, 40],
        price: 1, // $1 USD
        maxPrize: 20000, // $20,000+ minimum jackpot
        bonusNumbers: 0
      },
      mas: {
        id: LotoModality.MAS,
        name: 'Más',
        description: 'Elige 6 números (1-40) + 1 Bono (1-12). Acierta 4+ para ganar. 6+1 gana $150,000+ garantizado.',
        minNumbers: 6,
        maxNumbers: 6,
        numberRange: [1, 40],
        price: 2, // $2 USD
        maxPrize: 150000, // $150,000+ minimum jackpot
        bonusNumbers: 1,
        bonusRanges: [[1, 12]]
      },
      supermas: {
        id: LotoModality.SUPERMAS,
        name: 'Supermas',
        description: 'Elige 6 números (1-40) + 2 Bonos (1-12, 1-15). Acierta 2+ bonos para ganar. 6+2 bonos gana $250,000+.',
        minNumbers: 6,
        maxNumbers: 6,
        numberRange: [1, 40],
        price: 3, // $3 USD
        maxPrize: 250000, // $250,000+ minimum jackpot
        bonusNumbers: 2,
        bonusRanges: [[1, 12], [1, 15]]
      }
    }
  },
  [GameType.KINO_TV]: {
    id: GameType.KINO_TV,
    name: 'Super KinoTV',
    description: 'Selecciona 20 números de 1 a 80. Premios fijos diarios.',
    minNumbers: 20,
    maxNumbers: 20,
    numberRange: [1, 80],
    pricePerTicket: 25,
    logo: '/images/games/kinotv.png',
    drawSchedule: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      times: ['21:00'] // Sorteos diarios
    },
    prizes: kinotvPrizes
  },
  [GameType.LOTO_POOL]: {
    id: GameType.LOTO_POOL,
    name: 'Loto Pool',
    description: 'Selecciona 7 números de 1 a 31. Gana desde 3 números coincidentes.',
    minNumbers: 7,
    maxNumbers: 7,
    numberRange: [1, 31],
    pricePerTicket: 2,
    logo: '/images/games/loto-pool.png',
    drawSchedule: {
      days: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
      times: ['20:00']
    },
    prizes: lotopoolPrizes
  },
  [GameType.QUINIELA]: {
    ...quinielaPaleBank(
      GameType.QUINIELA,
      'Quiniela Pale',
      { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], times: ['20:55'] },
      STANDARD_QUINIELA_PALE_PRIZES,
      '/images/games/quiniela.png'
    ),
    description: 'Quiniela, Pale, Tripleta y Super Pale — sorteo de Leidsa',
    // Super Pale es exclusivo de Leidsa: exige acertar el 1er premio de Leidsa Y el 1er premio
    // de Lotería Nacional a la vez, así que no usa la tabla de premios por posición.
    modalidades: ['quiniela', 'pale', 'tripleta', 'super-pale']
  },
  [GameType.LOTERIA_NACIONAL]: quinielaPaleBank(
    GameType.LOTERIA_NACIONAL,
    'Lotería Nacional',
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], times: ['14:30', '21:00'] },
    LOTERIA_NACIONAL_PRIZES,
    '/images/games/loteria-nacional.png'
  ),
  [GameType.LOTEKA]: quinielaPaleBank(
    GameType.LOTEKA,
    'Quiniela Loteka',
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], times: ['19:55'] },
    STANDARD_QUINIELA_PALE_PRIZES,
    '/images/games/loteka.png'
  ),
  [GameType.LA_SUERTE]: quinielaPaleBank(
    GameType.LA_SUERTE,
    'La Suerte Dominicana',
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], times: ['12:30', '18:00'] },
    STANDARD_QUINIELA_PALE_PRIZES,
    '/images/games/la-suerte.png'
  ),
  [GameType.LOTERIA_REAL]: quinielaPaleBank(
    GameType.LOTERIA_REAL,
    'Lotería Real',
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], times: ['12:55'] },
    STANDARD_QUINIELA_PALE_PRIZES,
    '/images/games/loteria-real.png'
  ),
  [GameType.PEGA3]: {
    id: GameType.PEGA3,
    name: 'Pega3Más',
    description: 'Selecciona 3 números con variantes. Grandes premios.',
    minNumbers: 3,
    maxNumbers: 3,
    numberRange: [0, 99],
    pricePerTicket: 1,
    logo: '/images/games/pega3.png',
    drawSchedule: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      times: ['13:00', '18:00', '21:00']
    },
    prizes: pega3Prizes,
    modalidades: ['exacto', 'mixto', 'combinado']
  }
};

export const GAME_NAMES: Record<GameType, string> = {
  [GameType.LOTO]: 'LEIDSA Loto',
  [GameType.KINO_TV]: 'KinoTV',
  [GameType.LOTO_POOL]: 'Loto Pool',
  [GameType.QUINIELA]: 'Quiniela Pale',
  [GameType.PEGA3]: 'Pega3Más',
  [GameType.LOTERIA_NACIONAL]: 'Lotería Nacional',
  [GameType.LOTEKA]: 'Quiniela Loteka',
  [GameType.LA_SUERTE]: 'La Suerte Dominicana',
  [GameType.LOTERIA_REAL]: 'Lotería Real'
};

export const ALL_GAMES = Object.values(GameType);

// Alias for backwards compatibility
export const gameConfig = GAMES_CONFIG;
