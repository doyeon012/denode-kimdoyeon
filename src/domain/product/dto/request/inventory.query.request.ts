import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, Max, Min } from 'class-validator';
import { OrderingOptionEnumType } from 'src/enums/ordering.option.enum';

export class InventoryQueryRequest {
  @ApiProperty({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  productId?: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @Min(1)
  @Type(() => Number)
  page: number;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit: number;

  @ApiProperty({ example: 'LATEST' })
  @IsNotEmpty()
  sort: OrderingOptionEnumType;
}
