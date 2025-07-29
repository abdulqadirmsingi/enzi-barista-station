export const formatCurrency = (amount: number): string => {
  return `TSh ${amount.toLocaleString('en-TZ')}`;
};