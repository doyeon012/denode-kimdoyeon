export const ErrorMessageType = {
  USER_NOT_FOUND: '사용자를 찾을 수 없습니다.',
  UNAUTHORIZED: '인증되지 않은 사용자입니다.',
  USER_ALREADY_EXISTS: '이미 존재하는 사용자입니다.',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
  INVALID_PASSWORD: '잘못된 비밀번호입니다.',

  PRODUCT_ALREADY_EXISTS: '이미 존재하는 상품입니다.',
  NOT_FOUND_INVENTORY: '재고를 찾을 수 없습니다.',
  NOT_FOUND_STOCK_HISTORY: '재고 기록을 찾을 수 없습니다.',
  NOT_FOUND_PRODUCT: '상품을 찾을 수 없습니다.',
  INSUFFICIENT_STOCK: '재고가 부족합니다.',

  TOKEN_NOT_PROVIDED: '토큰이 제공되지 않았습니다.',
  INVALID_TOKEN: '유효하지 않은 토큰입니다.',
  DB_CONFIG_NOT_FOUND: 'DB 설정을 찾을 수 없습니다.',
} as const;

export type ErrorMessageEnumType = (typeof ErrorMessageType)[keyof typeof ErrorMessageType];
