import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductStatusEnum, ProductStatusType } from '@enums/product.status.enum';

export class ProductCreateRequest {
  @ApiProperty({ example: 'kim' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
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
