import { ApiProperty } from '@nestjs/swagger';
import { ProductStatusEnum, ProductStatusType } from '@enums/product.status.enum';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductUpdateRequest {
  @ApiProperty( { example: 1 })
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty( { example: 'Product Name update' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty( { example: 8000 })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty( { example: 'Product Description update' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    enum: ProductStatusEnum,
    example: ProductStatusEnum.expired,
  })
  @IsOptional()
  status?: ProductStatusType;
}
