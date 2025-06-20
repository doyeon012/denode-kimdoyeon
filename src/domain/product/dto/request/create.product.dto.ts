import { ProductStatusType } from '@enums/product.status.enum';

export interface CreateProductDto {
  name: string;
  price: number;
  description: string;
  status: ProductStatusType;
  userId: number;
}
