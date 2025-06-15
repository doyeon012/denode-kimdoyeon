import { Injectable } from '@nestjs/common';
import { Inventory } from '../entity/inventory.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InventoryDao {
  constructor(@InjectRepository(Inventory) private inventoryRepository: Repository<Inventory>) {}
}
