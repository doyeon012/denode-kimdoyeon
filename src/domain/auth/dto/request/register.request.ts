import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterRequest {
  @ApiProperty( {example: 'doyeon123'})
  @IsString()
  @IsNotEmpty()
  loginId: string;

  @ApiProperty( {example: 'password123'})
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty( {example: 'password123'})
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @ApiProperty( {example: 'Doyeon Kim'})
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty( {example: 'doyeon'})
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty( {example: 28})
  @IsNumber()
  @IsNotEmpty()
  age: number;
}
