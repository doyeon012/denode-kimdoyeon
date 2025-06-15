import { Injectable } from '@nestjs/common';
import { InventoryDao } from '../dao/inventory.dao';

@Injectable()
export class InventoryComponent {
  constructor(private inventoryDao: InventoryDao) {}
}
