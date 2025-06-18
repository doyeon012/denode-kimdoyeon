import { ApiProperty } from '@nestjs/swagger';

export class InventoryItemResponse {
  @ApiProperty({ example: '2025-06-17T16:33:33.294Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-06-17T16:33:35.000Z' })
  updatedAt: Date;

  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 100 })
  quantity: number;

  @ApiProperty({ example: '2025-06-25T00:00:00.000Z' })
  expiryDate: Date;

  @ApiProperty({ example: 1 })
  productId: number;

  @ApiProperty({ example: 1 })
  userId: number;
}
