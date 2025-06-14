export const ErrorMessageType = {} as const;
export type ErrorMessageEnumType = (typeof ErrorMessageType)[keyof typeof ErrorMessageType];
