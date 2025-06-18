export const OrderingOptionEnum = {
  LATEST: 'LATEST',
  OLDEST: 'OLDEST',
} as const;

export type OrderingOptionEnumType = (typeof OrderingOptionEnum)[keyof typeof OrderingOptionEnum];
