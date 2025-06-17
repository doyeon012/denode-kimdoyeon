import { ApiProperty } from '@nestjs/swagger';
import { InventoryItemResponse } from './inventory.response';

export class InventoryListResponse {
  @ApiProperty({ type: [InventoryItemResponse] })
  items: InventoryItemResponse[];
}
