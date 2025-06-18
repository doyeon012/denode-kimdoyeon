import { Injectable } from '@nestjs/common';
import { InventoryDao } from '@domain/product/dao/inventory.dao';
import { CreateInventoryDto } from '@domain/product/dto/request/create.invetory.dto';
import { Inventory } from '@domain/product/entity/inventory.entity';

@Injectable()
export class InventoryComponent {
  constructor(private inventoryDao: InventoryDao) {}

  public async create(createInventoryDto: CreateInventoryDto): Promise<number> {
    return this.inventoryDao.create(createInventoryDto);
  }


  public async findById(id: number): Promise<Inventory | null> {
    return this.inventoryDao.findById(id);
  }

  public async findByProductAndDate(productId: number, dateOnly: string): Promise<Inventory | null> {
    return this.inventoryDao.findByProductAndDate(productId, dateOnly);
  }

  public async updateQuantity(id: number, quantity: number): Promise<void> {
    await this.inventoryDao.updateQuantity(id, quantity);
  }

  public async findByProductIdOrderByExpiryDate(productId: number): Promise<Inventory[]> {
    return this.inventoryDao.findByProductIdOrderByExpiryDate(productId);
  }

  public async findByProductId(productId: number): Promise<Inventory[]> {
    return this.inventoryDao.findByProductId(productId);
  }

  public async findAll(): Promise<Inventory[]> {
    return this.inventoryDao.findAll();
  }
}
