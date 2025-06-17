import { ApiProperty } from "@nestjs/swagger";
import { StockHistoryItemResponse } from "./stock.history.response";

export class StockHistoryListResponse {
  @ApiProperty({ type: [StockHistoryItemResponse] })
  items: StockHistoryItemResponse[];
}