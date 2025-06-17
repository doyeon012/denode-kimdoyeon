import { ApiProperty } from "@nestjs/swagger";
import { StockHistoryItemResponse } from "@domain/product/dto/response/stock.history.response";

export class StockHistoryListResponse {
  @ApiProperty({ type: [StockHistoryItemResponse] })
  items: StockHistoryItemResponse[];
}