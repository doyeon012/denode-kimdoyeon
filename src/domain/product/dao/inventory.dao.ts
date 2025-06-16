import { Injectable } from '@nestjs/common';
import { Inventory } from '../entity/inventory.entity';
import { Raw, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInventoryDto } from '../dto/request/create.invetory.dto';

@Injectable()
export class InventoryDao {
  constructor(@InjectRepository(Inventory) private inventoryRepository: Repository<Inventory>) {}

  async create(createInventoryDto: CreateInventoryDto): Promise<number> {
    const inventory = this.inventoryRepository.create(createInventoryDto);

    await this.inventoryRepository.save(inventory);
    return inventory.id;
  }

  async delete(inventoryId: number): Promise<void> {
    await this.inventoryRepository.delete(inventoryId);
  }

  async findById(id: number): Promise<Inventory | null> {
    return this.inventoryRepository.findOneBy({ id });
  }

  async findByProductAndDate(productId: number, dateOnly: string): Promise<Inventory | null> {
    return this.inventoryRepository.findOneBy({
      productId,
      expiryDate: Raw((alias) => `DATE(${alias}) = '${dateOnly}'`),
    });
  }

  async updateQuantity(inventoryId: number, quantity: number): Promise<void> {
    await this.inventoryRepository.update(inventoryId, { quantity });
  }

  async findByProductIdOrderByExpiryDate(productId: number): Promise<Inventory[]> {
    return this.inventoryRepository.find({
      where: { productId },
      order: { expiryDate: 'ASC' },
    });
  }
}
