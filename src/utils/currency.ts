/**
 * Currency formatting utilities for the POS system
 */

// Default currency configuration
const DEFAULT_CURRENCY = "TZS"; // Tanzanian Shilling
const DEFAULT_LOCALE = "sw-TZ"; // Swahili - Tanzania

/**
 * Format a number as currency string
 * @param amount - The amount to format
 * @param currency - The currency code (default: TZS)
 * @param locale - The locale for formatting (default: sw-TZ)
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  currency: string = DEFAULT_CURRENCY,
  locale: string = DEFAULT_LOCALE
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Parse a currency string to a number
 * @param currencyString - The currency string to parse
 * @returns Parsed number or null if invalid
 */
export const parseCurrency = (currencyString: string): number | null => {
  // Remove currency symbols, spaces, and commas
  const cleanString = currencyString.replace(/[^\d.-]/g, "");
  const parsed = parseFloat(cleanString);
  return isNaN(parsed) ? null : parsed;
};

/**
 * Add two currency amounts safely
 * @param amount1 - First amount
 * @param amount2 - Second amount
 * @returns Sum rounded to 2 decimal places
 */
export const addCurrency = (amount1: number, amount2: number): number => {
  return Math.round((amount1 + amount2) * 100) / 100;
};

/**
 * Subtract two currency amounts safely
 * @param amount1 - First amount
 * @param amount2 - Second amount
 * @returns Difference rounded to 2 decimal places
 */
export const subtractCurrency = (amount1: number, amount2: number): number => {
  return Math.round((amount1 - amount2) * 100) / 100;
};

/**
 * Multiply currency amount by quantity safely
 * @param amount - The amount
 * @param quantity - The quantity
 * @returns Product rounded to 2 decimal places
 */
export const multiplyCurrency = (amount: number, quantity: number): number => {
  return Math.round(amount * quantity * 100) / 100;
};

/**
 * Calculate percentage of an amount
 * @param amount - The base amount
 * @param percentage - The percentage (e.g., 15 for 15%)
 * @returns Calculated percentage amount rounded to 2 decimal places
 */
export const calculatePercentage = (
  amount: number,
  percentage: number
): number => {
  return Math.round(((amount * percentage) / 100) * 100) / 100;
};

/**
 * Calculate tax amount
 * @param subtotal - The subtotal amount
 * @param taxRate - The tax rate (e.g., 8.5 for 8.5%)
 * @returns Tax amount rounded to 2 decimal places
 */
export const calculateTax = (subtotal: number, taxRate: number): number => {
  return calculatePercentage(subtotal, taxRate);
};

/**
 * Calculate tip amount
 * @param subtotal - The subtotal amount
 * @param tipPercentage - The tip percentage (e.g., 15 for 15%)
 * @returns Tip amount rounded to 2 decimal places
 */
export const calculateTip = (
  subtotal: number,
  tipPercentage: number
): number => {
  return calculatePercentage(subtotal, tipPercentage);
};

/**
 * Calculate total amount including tax and tip
 * @param subtotal - The subtotal amount
 * @param taxRate - The tax rate (e.g., 8.5 for 8.5%)
 * @param tipPercentage - The tip percentage (e.g., 15 for 15%)
 * @returns Total amount rounded to 2 decimal places
 */
export const calculateTotal = (
  subtotal: number,
  taxRate: number = 0,
  tipPercentage: number = 0
): number => {
  const tax = calculateTax(subtotal, taxRate);
  const tip = calculateTip(subtotal, tipPercentage);
  return addCurrency(addCurrency(subtotal, tax), tip);
};

/**
 * Format currency for display without currency symbol
 * @param amount - The amount to format
 * @returns Formatted number string
 */
export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Validate if a number is a valid currency amount
 * @param amount - The amount to validate
 * @returns True if valid currency amount
 */
export const isValidCurrencyAmount = (amount: number): boolean => {
  return !isNaN(amount) && isFinite(amount) && amount >= 0;
};

/**
 * Convert cents to shillings
 * @param cents - Amount in cents
 * @returns Amount in shillings
 */
export const centsToShillings = (cents: number): number => {
  return Math.round(cents) / 100;
};

/**
 * Convert shillings to cents
 * @param shillings - Amount in shillings
 * @returns Amount in cents
 */
export const shillingsToCents = (shillings: number): number => {
  return Math.round(shillings * 100);
};
