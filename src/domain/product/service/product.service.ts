import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductComponent } from '@domain/product/component/product.component';
import { InventoryComponent } from '@domain/product/component/inventory.component';
import { ProductCreateRequest } from '@domain/product/dto/request/product.create.request';
import { CreateProductDto } from '@domain/product/dto/request/create.product.dto';
import { InventoryInboundRequest } from '@domain/product/dto/request/inventory.inbound.request';
import { ErrorMessageType } from '@enums/error.message.enum';
import { InventoryOutboundRequest } from '@domain/product/dto/request/inventory.outbound.request';
import { StockHistoryComponent } from '@domain/product/component/stock.history.component';
import { Transactional } from 'typeorm-transactional';
import { InventoryQueryRequest } from '@domain/product/dto/request/inventory.query.request';
import { InventoryListResponse } from '@domain/product/dto/response/inventory.list.response';
import { Inventory } from '@domain/product/entity/inventory.entity';
import { StockHistoryListResponse } from '@domain/product/dto/response/stock.history.list.response';
import { StockHistory } from '@domain/product/entity/stock.history.entity';
import { StockMovementType } from '@enums/stock.movement.type.enum';
import { ProductUpdateRequest } from '@domain/product/dto/request/product.update.request';
import { Product } from '@domain/product/entity/product.entity';
import { ProductStatusType } from '@enums/product.status.enum';
import { InventoryInboundResponse } from '@domain/product/dto/response/inventory.inbound.response';

@Injectable()
export class ProductService {
  constructor(
    private productComponent: ProductComponent,
    private inventoryComponent: InventoryComponent,
    private stockHistoryComponent: StockHistoryComponent,
  ) {}

  public async createProduct(request: ProductCreateRequest, requesterId: number): Promise<number> {
    const product = await this.productComponent.findByName(request.name);
    if (product) {
      throw new BadRequestException(ErrorMessageType.PRODUCT_ALREADY_EXISTS);
    }

    const createProductDto: CreateProductDto = {
      ...request,
      userId: requesterId,
    };

    return await this.productComponent.create(createProductDto);
  }

  public async updateProduct(request: ProductUpdateRequest): Promise<void> {
    const product: Product | null = await this.productComponent.findById(request.productId);

    if (!product) {
      throw new BadRequestException(ErrorMessageType.NOT_FOUND_PRODUCT);
    }

    const name: string = request.name || product.name;
    const price: number = request.price || product.price;
    const description: string = request.description || product.description;
    const status: ProductStatusType = request.status || product.status;

    product.updateBasicInfo({
      name,
      price,
      description,
      status,
    });
    await this.productComponent.update(product);
  }

  @Transactional()
  public async inboundInventory(
    request: InventoryInboundRequest,
    requesterId: number,
  ): Promise<InventoryInboundResponse> {
    const dateOnly = request.expiryDate.toISOString().split('T')[0];
    const existingInventory = await this.inventoryComponent.findByProductAndDate(request.productId, dateOnly);

    let inventoryId: number;
    if (existingInventory) {
      await this.inventoryComponent.updateQuantity(existingInventory.id, existingInventory.quantity + request.quantity);
      inventoryId = existingInventory.id;
    } else {
      inventoryId = await this.inventoryComponent.create({
        ...request,
        userId: requesterId,
      });
    }

    await this.stockHistoryComponent.create({
      type: 'IN',
      inventoryId: inventoryId,
      quantity: request.quantity,
      reason: request.reason,
      productId: request.productId,
    });
    return { inventoryId };
  }

  @Transactional()
  public async outboundInventory(request: InventoryOutboundRequest): Promise<void> {
    const inventories = await this.inventoryComponent.findByProductIdOrderByExpiryDate(request.productId);

    const totalQuantity = inventories.reduce((sum, inv) => sum + inv.quantity, 0);
    if (totalQuantity < request.quantity) {
      throw new BadRequestException(ErrorMessageType.INSUFFICIENT_STOCK);
    }

    let remainingQuantity = request.quantity;

    for (const inventory of inventories) {
      if (remainingQuantity <= 0) {
        break;
      }

      if (inventory.quantity <= remainingQuantity) {
        await this.stockHistoryComponent.create({
          type: 'OUT',
          inventoryId: inventory.id,
          quantity: inventory.quantity,
          reason: request.reason,
          productId: request.productId,
        });

        remainingQuantity -= inventory.quantity;
        await this.inventoryComponent.delete(inventory.id);
      } else {
        await this.stockHistoryComponent.create({
          type: 'OUT',
          inventoryId: inventory.id,
          quantity: remainingQuantity,
          reason: request.reason,
          productId: request.productId,
        });

        await this.inventoryComponent.updateQuantity(inventory.id, inventory.quantity - remainingQuantity);
        remainingQuantity = 0;
      }
    }
  }

  public async getInventories(query: InventoryQueryRequest): Promise<InventoryListResponse> {
    let inventories: Inventory[] = [];

    if (query.productId) {
      inventories = await this.inventoryComponent.findByProductId(query.productId);
    } else {
      inventories = await this.inventoryComponent.findAll();
    }

    if (query.sort === 'LATEST') {
      inventories.sort((a, b) => b.expiryDate.getTime() - a.expiryDate.getTime());
    } else {
      inventories.sort((a, b) => a.expiryDate.getTime() - b.expiryDate.getTime());
    }

    const startIndex = (query.page - 1) * query.limit;
    const endIndex = startIndex + query.limit;
    const paginatedInventories = inventories.slice(startIndex, endIndex);

    return {
      items: paginatedInventories,
    };
  }

  public async getStockHistory(type?: StockMovementType): Promise<StockHistoryListResponse> {
    let stockHistories: StockHistory[] = [];

    if (type === 'IN') {
      stockHistories = await this.stockHistoryComponent.findByType('IN');
    } else if (type === 'OUT') {
      stockHistories = await this.stockHistoryComponent.findByType('OUT');
    } else {
      stockHistories = await this.stockHistoryComponent.findAll();
    }

    return {
      items: stockHistories,
    };
  }
}
