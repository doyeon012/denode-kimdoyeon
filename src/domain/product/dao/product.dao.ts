import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from '@domain/product/entity/product.entity';
import { CreateProductDto } from '@domain/product/dto/request/create.product.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductDao {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}

  async create(createProductDto: CreateProductDto): Promise<number> {
    const product = this.productRepository.create(createProductDto);

    await this.productRepository.save(product);
    return product.id;
  }

  async findByName(name: string): Promise<Product | null> {
    return this.productRepository.findOneBy({ name });
  }

  async findById(id: number): Promise<Product | null> {
    return this.productRepository.findOneBy({ id });
  }

  async update(product: Product): Promise<void> {
    await this.productRepository.save(product);
  }
}
