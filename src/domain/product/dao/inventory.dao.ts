import { Injectable } from '@nestjs/common';
import { Inventory } from '@domain/product/entity/inventory.entity';
import { Raw, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInventoryDto } from '@domain/product/dto/request/create.invetory.dto';

@Injectable()
export class InventoryDao {
  constructor(@InjectRepository(Inventory) private inventoryRepository: Repository<Inventory>) {}

  async create(createInventoryDto: CreateInventoryDto): Promise<number> {
    const inventory = this.inventoryRepository.create(createInventoryDto);

    await this.inventoryRepository.save(inventory);
    return inventory.id;
  }

  async findById(id: number): Promise<Inventory | null> {
    return this.inventoryRepository.findOneBy({ id });
  }

  async findByProductAndDate(productId: number, dateOnly: string): Promise<Inventory | null> {
    return this.inventoryRepository.findOne({
      where: {
        productId,
        expiryDate: Raw((alias) => `DATE(${alias}) = '${dateOnly}'`),
      },
      lock: { mode: 'pessimistic_write' },
    });
  }

  async updateQuantity(id: number, quantity: number): Promise<void> {
    await this.inventoryRepository.update(id, { quantity });
  }

  async findByProductIdOrderByExpiryDate(productId: number): Promise<Inventory[]> {
    return this.inventoryRepository.find({
      where: { productId },
      order: { expiryDate: 'ASC' },
      lock: { mode: 'pessimistic_write' },
    });
  }

  async findByProductId(productId: number): Promise<Inventory[]> {
    return this.inventoryRepository.find({ where: { productId } });
  }

  async findAll(): Promise<Inventory[]> {
    return this.inventoryRepository.find();
  }
}
