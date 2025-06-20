import { StockMovementType } from "@enums/stock.movement.type.enum";

export interface CreateStockHistoryDto {
  type: StockMovementType
  quantity: number;
  reason: string;
  productId: number;
  inventoryId: number;
}
