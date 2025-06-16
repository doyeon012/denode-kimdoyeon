import { ProductStatusType } from 'src/enums/product.status.enum';

export interface CreateProductDto {
  name: string;
  price: number;
  description: string;
  userId: number;
  status: ProductStatusType;
}
