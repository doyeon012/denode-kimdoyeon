import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ProductService } from '@domain/product/service/product.service';
import { ProductCreateRequest } from '@domain/product/dto/request/product.create.request';
import AuthGuard from '@middleware/auth/auth.guard';
import { ErrorMessageType } from '@enums/error.message.enum';
import { AuthUser, Token } from '@decorator/toekn.decorator';
import { InventoryInboundRequest } from '@domain/product/dto/request/inventory.inbound.request';
import { InventoryOutboundRequest } from '@domain/product/dto/request/inventory.outbound.request';
import { InventoryQueryRequest } from '@domain/product/dto/request/inventory.query.request';
import { OrderingOptionEnum } from '@enums/ordering.option.enum';
import { InventoryListResponse } from '@domain/product/dto/response/inventory.list.response';
import { StockHistoryListResponse } from '@domain/product/dto/response/stock.history.list.response';
import { StockMovementEnum, StockMovementType } from '@enums/stock.movement.type.enum';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('create')
  @ApiBearerAuth(AuthGuard.ACCESS_TOKEN_HEADER)
  @ApiOkResponse({ description: 'Product created successfully' })
  @ApiUnauthorizedResponse({ description: ErrorMessageType.UNAUTHORIZED })
  @ApiConsumes('application/json')
  @ApiBody({
    type: ProductCreateRequest,
    description: 'Product creation information',
  })
  async createProduct(@Body() request: ProductCreateRequest, @Token() user: AuthUser): Promise<number> {
    return this.productService.createProduct(request, user.id);
  }

  @Post('inventory/inbound')
  @ApiBearerAuth(AuthGuard.ACCESS_TOKEN_HEADER)
  @ApiOkResponse({ description: 'Inventory inbound successfully' })
  @ApiUnauthorizedResponse({ description: ErrorMessageType.UNAUTHORIZED })
  @ApiBadRequestResponse({ description: ErrorMessageType.NOT_FOUND_INVENTORY })
  @ApiConsumes('application/json')
  @ApiBody({
    type: InventoryInboundRequest,
    description: 'Inventory inbound information',
  })
  async inboundInventory(@Body() request: InventoryInboundRequest, @Token() user: AuthUser): Promise<void> {
    await this.productService.inboundInventory(request, user.id);
  }

  @Post('inventory/outbound')
  @ApiBearerAuth(AuthGuard.ACCESS_TOKEN_HEADER)
  @ApiOkResponse({ description: 'Inventory outbound successfully' })
  @ApiUnauthorizedResponse({ description: ErrorMessageType.UNAUTHORIZED })
  @ApiBadRequestResponse({ description: ErrorMessageType.NOT_FOUND_INVENTORY })
  @ApiConsumes('application/json')
  @ApiBody({
    type: InventoryOutboundRequest,
    description: 'Inventory outbound information',
  })
  async outboundInventory(@Body() request: InventoryOutboundRequest, @Token() user: AuthUser): Promise<void> {
    await this.productService.outboundInventory(request, user.id);
  }

  @Get('inventory')
  @ApiBearerAuth(AuthGuard.ACCESS_TOKEN_HEADER)
  @ApiOkResponse({
    description: 'Inventory retrieved successfully',
    type: InventoryListResponse,
  })
  @ApiBadRequestResponse({ description: ErrorMessageType.NOT_FOUND_INVENTORY })
  @ApiQuery({ name: 'productId', type: Number, required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'sort', enum: OrderingOptionEnum, required: false })
  async getInventories(@Query() query: InventoryQueryRequest): Promise<InventoryListResponse> {
    return this.productService.getInventories(query);
  }

  @Get('stockhistory')
  @ApiBearerAuth(AuthGuard.ACCESS_TOKEN_HEADER)
  @ApiOkResponse({
    description: 'Stock history retrieved successfully',
    type: StockHistoryListResponse,
  })
  @ApiQuery({ name: 'type', enum: StockMovementEnum, required: false })
  @ApiBadRequestResponse({ description: ErrorMessageType.NOT_FOUND_STOCK_HISTORY })
  async getStockHistory(@Query('type') type?: StockMovementType): Promise<StockHistoryListResponse> {
    return this.productService.getStockHistory(type);
  }
}
