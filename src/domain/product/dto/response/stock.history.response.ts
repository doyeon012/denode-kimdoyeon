import { ApiProperty } from "@nestjs/swagger";

export class StockHistoryItemResponse {
  @ApiProperty({ example: '2025-06-17T16:33:58.898Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-06-17T16:33:58.898Z' })
  updatedAt: Date;

  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'IN' })
  type: string;

  @ApiProperty({ example: 100 })
  quantity: number;

  @ApiProperty({ example: '출고 사유' })
  reason: string;

  @ApiProperty({ example: 1 })
  productId: number;

  @ApiProperty({ example: 1 })
  inventoryId: number;

}