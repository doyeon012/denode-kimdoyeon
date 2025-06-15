import { Injectable } from '@nestjs/common';
import { ProductDao } from '../dao/product.dao';
import { CreateProductDto } from '../dto/request/create.product.dto';

@Injectable()
export class ProductComponent {
  constructor(private productDao: ProductDao) {}

  public async create(createProductDto: CreateProductDto): Promise<number> {
    return this.productDao.create(createProductDto);
  }
}
