import { Injectable } from '@nestjs/common';
import { ProductDao } from '../dao/product.dao';
import { CreateProductDto } from '../dto/request/create.product.dto';
import { Product } from '../entity/product.entity';

@Injectable()
export class ProductComponent {
  constructor(private productDao: ProductDao) {}

  public async create(createProductDto: CreateProductDto): Promise<number> {
    return this.productDao.create(createProductDto);
  }

  public async findByName(name: string): Promise<Product | null> {
    return this.productDao.findByName(name);
  }
}

