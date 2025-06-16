import { Injectable } from '@nestjs/common';
import { ProductComponent } from '../component/product.component';
import { InventoryComponent } from '../component/inventory.component';
import { ProductCreateRequest } from '../dto/request/product.create.request';
import { CreateProductDto } from '../dto/request/create.product.dto';

@Injectable()
export class ProductService {
  constructor(
    private productComponent: ProductComponent,
    private inventoryComponent: InventoryComponent,
    private stockHistoryComponent: InventoryComponent,
  ) {}

  public async createProduct(request: ProductCreateRequest, requesterId: number): Promise<number> {
    
    const createProductDto: CreateProductDto = {
      ...request,
      userId: requesterId
    }
    
    return this.productComponent.create(createProductDto);
  }
}
