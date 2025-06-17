import { Injectable } from '@nestjs/common';
import { StockHistoryDao } from '../dao/stock.history.dao';
import { CreateStockHistoryDto } from '../dto/request/create.stock.history.dto';
import { StockHistory } from '../entity/stock.history.entity';
import { StockMovementType } from 'src/enums/stock.movement.type.enum';

@Injectable()
export class StockHistoryComponent {
  constructor(private stockHistoryDao: StockHistoryDao) {}

  public async create(createStockHistoryDto: CreateStockHistoryDto): Promise<number> {
    return this.stockHistoryDao.create(createStockHistoryDto);
  }

  public async findByType(type: StockMovementType): Promise<StockHistory[]> {
    return this.stockHistoryDao.findByType(type);
  }

  public async findAll(): Promise<StockHistory[]> {
    return this.stockHistoryDao.findAll();
  }
}
