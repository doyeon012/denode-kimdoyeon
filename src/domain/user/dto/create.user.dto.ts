export interface CreateUserDto {
  loginId: string;
  password: string;
  confirmPassword: string;
  name: string;
  nickname: string;
  age: number;
}
