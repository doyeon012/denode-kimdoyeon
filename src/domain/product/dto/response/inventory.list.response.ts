import { ApiProperty } from '@nestjs/swagger';
import { InventoryItemResponse } from '@domain/product/dto/response/inventory.response';

export class InventoryListResponse {
  @ApiProperty({ type: [InventoryItemResponse] })
  items: InventoryItemResponse[];
}
