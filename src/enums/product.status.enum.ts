export const ProductStatusEnum = {
  valid: 'VALID',
  expired: 'EXPIRED',
} as const;

export type ProductStatusType = (typeof ProductStatusEnum)[keyof typeof ProductStatusEnum];
