import { Injectable } from '@nestjs/common';
import { StockHistoryDao } from '../dao/stock.history.dao';

@Injectable()
export class StockHistoryComponent {
  constructor(private stockHistoryDao: StockHistoryDao) {}
}
