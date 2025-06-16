import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductComponent } from '../component/product.component';
import { InventoryComponent } from '../component/inventory.component';
import { ProductCreateRequest } from '../dto/request/product.create.request';
import { CreateProductDto } from '../dto/request/create.product.dto';
import { InventoryInboundRequest } from '../dto/request/inventory.inbound.request';
import { ErrorMessageType } from 'src/enums/error.message.enum';
import { InventoryOutboundRequest } from '../dto/request/inventory.outbound.request';
import { StockHistoryComponent } from '../component/stock.history.component';
import { Transactional } from 'typeorm-transactional';

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

  @Transactional()
  public async inboundInventory(request: InventoryInboundRequest, requesterId: number): Promise<void> {
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
  }

  @Transactional()
  public async outboundInventory(request: InventoryOutboundRequest, requesterId: number): Promise<void> {
    const inventories = await this.inventoryComponent.findByProductIdOrderByExpiryDate(request.productId);

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
}
