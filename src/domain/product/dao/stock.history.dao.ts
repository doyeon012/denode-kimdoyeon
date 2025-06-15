import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StockHistory } from '../entity/stock.history.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StockHistoryDao {
  constructor(@InjectRepository(StockHistory) private stockHistoryRepository: Repository<StockHistory>) {}
}
