export const ErrorMessageType = {
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
  USER_NOT_FOUND: '사용자를 찾을 수 없습니다.',
  INVALID_PASSWORD: '잘못된 비밀번호입니다.',
} as const;
export type ErrorMessageEnumType = (typeof ErrorMessageType)[keyof typeof ErrorMessageType];
