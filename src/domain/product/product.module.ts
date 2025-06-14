import { Module } from '@nestjs/common';
import { Product } from './entity/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entity/inventory.entity';
import { StockHistory } from './entity/stock.history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Inventory, StockHistory])],
  providers: [],
})
export class ProductModule {}
