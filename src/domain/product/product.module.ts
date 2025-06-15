import { Module } from '@nestjs/common';
import { Product } from './entity/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entity/inventory.entity';
import { StockHistory } from './entity/stock.history.entity';
import { ProductComponent } from './component/product.component';
import { ProductDao } from './dao/product.dao';
import { InventoryComponent } from './component/inventory.component';
import { StockHistoryComponent } from './component/stock.history.component';
import { InventoryDao } from './dao/inventory.dao';
import { StockHistoryDao } from './dao/stock.history.dao';
import { ProductService } from './service/product.service';
import { ProductController } from './controller/product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Inventory, StockHistory])],
  controllers: [ProductController],
  providers: [ProductComponent, ProductDao, InventoryComponent, InventoryDao, StockHistoryComponent, StockHistoryDao, ProductService],
  exports: [ProductComponent, InventoryComponent, StockHistoryComponent],
})
export class ProductModule {}
