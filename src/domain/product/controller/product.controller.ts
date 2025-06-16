import { Body, Controller, Delete, Post, Query } from '@nestjs/common';
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
import { ProductService } from '../service/product.service';
import { ProductCreateRequest } from '../dto/request/product.create.request';
import AuthGuard from 'src/middleware/auth/auth.guard';
import { ErrorMessageType } from 'src/enums/error.message.enum';
import { AuthUser, Token } from 'src/decorator/toekn.decorator';
import { InventoryInboundRequest } from '../dto/request/inventory.inbound.request';
import { InventoryOutboundRequest } from '../dto/request/inventory.outbound.request';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('product/create')
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
  async createInventory(@Body() request: InventoryInboundRequest, @Token() user: AuthUser): Promise<void> {
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
  async deleteInventory(@Body() request: InventoryOutboundRequest, @Token() user: AuthUser): Promise<void> {
    await this.productService.outboundInventory(request, user.id);
  }
}
