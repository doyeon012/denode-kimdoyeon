import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductStatusEnum, ProductStatusType } from '@enums/product.status.enum';

export class ProductCreateRequest {
  @ApiProperty({ example: 'product1' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty( { example: 1000 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 'A great product' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    enum: ProductStatusEnum,
    default: ProductStatusEnum.valid,
  })
  @IsEnum(ProductStatusEnum)
  @IsNotEmpty()
  status: ProductStatusType;
}
