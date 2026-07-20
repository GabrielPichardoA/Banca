/**
 * Cryptocurrency and price conversion utilities
 * Simplified to use stablecoins (USDT, USDC) only
 */

export interface CryptoPrices {
  USDT: number; // Always 1:1 with USD
  USDC: number; // Always 1:1 with USD
  USD: number; // Reference rate
}

// All stablecoins maintain 1:1 parity with USD
export const CURRENT_PRICES: CryptoPrices = {
  USDT: 1,
  USDC: 1,
  USD: 1
};

/**
 * Convert USD to stablecoin amount
 * Since stablecoins are 1:1 with USD, this is a direct conversion
 * @param usdAmount - Amount in USD
 * @param crypto - Crypto type (USDT, USDC, or USD)
 * @returns Amount in stablecoin
 */
export function usdToCrypto(usdAmount: number, crypto: string = 'USDT'): number {
  // All stablecoins are 1:1 with USD
  return usdAmount;
}

/**
 * Convert stablecoin to USD
 * Since stablecoins are 1:1 with USD, this is a direct conversion
 * @param cryptoAmount - Amount in stablecoin
 * @param crypto - Crypto type (USDT, USDC, or USD)
 * @returns Amount in USD
 */
export function cryptoToUsd(cryptoAmount: number, crypto: string = 'USDT'): number {
  // All stablecoins are 1:1 with USD
  return cryptoAmount;
}

/**
 * Format stablecoin amount for display
 * @param amount - Amount in stablecoin
 * @param crypto - Crypto type
 * @param decimals - Number of decimal places
 * @returns Formatted string (e.g., "100.00 USDT")
 */
export function formatCrypto(amount: number, crypto: string = 'USDT', decimals: number = 2): string {
  return `${amount.toFixed(decimals)} ${crypto}`;
}

/**
 * Format USD amount for display
 * @param amount - Amount in USD
 * @param decimals - Number of decimal places
 * @returns Formatted string (e.g., "$123.45")
 */
export function formatUsd(amount: number, decimals: number = 2): string {
  return `$${amount.toFixed(decimals)}`;
}

/**
 * Get the current exchange rate
 * All stablecoins are always 1:1
 */
export function getExchangeRate(crypto: string = 'USDT'): number {
  return CURRENT_PRICES[crypto as keyof CryptoPrices] || 1;
}

/**
 * Update stablecoin prices (rarely needed as they're pegged to USD)
 */
export function updatePrices(newPrices: Partial<CryptoPrices>): void {
  Object.assign(CURRENT_PRICES, newPrices);
}
