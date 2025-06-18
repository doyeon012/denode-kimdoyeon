import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class InventoryOutboundRequest {
  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  quantity: number;

  @ApiProperty({ example: '2023-12-31' })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  expiryDate: Date;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({ example: '출고 사유' })
  @IsString()
  @IsNotEmpty()
  reason: string;
}
