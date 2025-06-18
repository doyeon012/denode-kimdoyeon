import { Injectable } from '@nestjs/common';
import { ProductDao } from '@domain/product/dao/product.dao';
import { CreateProductDto } from '@domain/product/dto/request/create.product.dto';
import { Product } from '@domain/product/entity/product.entity';

@Injectable()
export class ProductComponent {
  constructor(private productDao: ProductDao) {}

  public async create(createProductDto: CreateProductDto): Promise<number> {
    return this.productDao.create(createProductDto);
  }

  public async findByName(name: string): Promise<Product | null> {
    return this.productDao.findByName(name);
  }

  public async findById(id: number): Promise<Product | null> {
    return this.productDao.findById(id);
  }

  public async update(product: Product): Promise<void> {
    await this.productDao.update(product);
  }
}
