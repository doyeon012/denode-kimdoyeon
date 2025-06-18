import { ApiProperty } from '@nestjs/swagger';

export class InventoryInboundResponse {
  @ApiProperty({ example: 1 })
  inventoryId: number;
}
