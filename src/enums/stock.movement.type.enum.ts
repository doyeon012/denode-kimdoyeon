export const StockMovementEnum = {
  IN: 'IN',
  OUT: 'OUT',
} as const;

export type StockMovementType = (typeof StockMovementEnum)[keyof typeof StockMovementEnum];
