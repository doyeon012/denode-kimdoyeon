import { Module } from '@nestjs/common';
import { Product } from '@domain/product/entity/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from '@domain/product/entity/inventory.entity';
import { StockHistory } from '@domain/product/entity/stock.history.entity';
import { ProductComponent } from '@domain/product/component/product.component';
import { ProductDao } from '@domain/product/dao/product.dao';
import { InventoryComponent } from '@domain/product/component/inventory.component';
import { StockHistoryComponent } from '@domain/product/component/stock.history.component';
import { InventoryDao } from '@domain/product/dao/inventory.dao';
import { StockHistoryDao } from '@domain/product/dao/stock.history.dao';
import { ProductService } from '@domain/product/service/product.service';
import { ProductController } from '@domain/product/controller/product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Inventory, StockHistory])],
  controllers: [ProductController],
  providers: [ProductComponent, ProductDao, InventoryComponent, InventoryDao, StockHistoryComponent, StockHistoryDao, ProductService],
  exports: [ProductComponent, InventoryComponent, StockHistoryComponent],
})
export class ProductModule {}
