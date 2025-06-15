import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';
import { CreateProductDto } from '../dto/request/create.product.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductDao {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}

  async create(createProductDto: CreateProductDto): Promise<number> {
    const product = this.productRepository.create(createProductDto);

    await this.productRepository.save(product);
    return product.id;
  }
}
