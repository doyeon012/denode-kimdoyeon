import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ProductService } from '../service/product.service';
import { ProductCreateRequest } from '../dto/request/product.create.request';
import AuthGuard from 'src/middleware/auth/auth.guard';
import { ErrorMessageType } from 'src/enums/error.message.enum';

@ApiTags('product')
@Controller('product')
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
  async createProduct(@Body() request: ProductCreateRequest): Promise<number> {
    return this.productService.createProduct(request);
  }
}
