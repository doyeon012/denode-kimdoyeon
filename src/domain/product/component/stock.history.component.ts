import { Injectable } from '@nestjs/common';
import { StockHistoryDao } from '../dao/stock.history.dao';
import { CreateStockHistoryDto } from '../dto/request/create.stock.history.dto';

@Injectable()
export class StockHistoryComponent {
  constructor(private stockHistoryDao: StockHistoryDao) {}

  public async create(createStockHistoryDto: CreateStockHistoryDto): Promise<number> { 
    return this.stockHistoryDao.create(createStockHistoryDto);
  }
}
