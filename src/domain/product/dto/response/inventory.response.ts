import { ApiProperty } from "@nestjs/swagger";

export class InventoryItemResponse{
  @ApiProperty({ example: 1 })
  id: number;
  
  @ApiProperty({ example: 1 })
  productId: number;

  @ApiProperty({ example: 100 })
  quantity: number;

  @ApiProperty({ example: '2023-12-31' })
  expiryDate: Date;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  createdAt: Date;
  
  @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  updatedAt: Date;
}