export const ProductStatusEnum = {
  valid: 'valid',
  expired: 'expired',
} as const;

export type ProductStatusType = (typeof ProductStatusEnum)[keyof typeof ProductStatusEnum];
