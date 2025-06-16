import { Injectable } from '@nestjs/common';
import { InventoryDao } from '../dao/inventory.dao';
import { CreateInventoryDto } from '../dto/request/create.invetory.dto';
import { Inventory } from '../entity/inventory.entity';

@Injectable()
export class InventoryComponent {
  constructor(private inventoryDao: InventoryDao) { }
  
  public async create(createInventoryDto: CreateInventoryDto): Promise<number> {
    return this.inventoryDao.create(createInventoryDto);
  }

  public async delete(inventoryId: number): Promise<void> {
    await this.inventoryDao.delete(inventoryId);
  }

  public async findById(inventoryId: number): Promise<Inventory | null> {
    return this.inventoryDao.findById(inventoryId);
  }

  public async findByProductAndDate(productId: number, dateOnly: string): Promise<Inventory | null> {
    return this.inventoryDao.findByProductAndDate(productId, dateOnly);
  }

  public async updateQuantity(inventoryId: number, quantity: number): Promise<void> {
    await this.inventoryDao.updateQuantity(inventoryId, quantity);
  }

  public async findByProductIdOrderByExpiryDate(productId: number): Promise<Inventory[]> {
    return this.inventoryDao.findByProductIdOrderByExpiryDate(productId);
  }

}
