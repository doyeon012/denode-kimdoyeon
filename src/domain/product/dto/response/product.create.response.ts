import { ApiProperty } from '@nestjs/swagger';

export class ProductCreateResponse {
  @ApiProperty({ example: 1 })
  productId: number;
}
