import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StockHistory } from '../entity/stock.history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStockHistoryDto } from '../dto/request/create.stock.history.dto';
import { StockMovementType } from 'src/enums/stock.movement.type.enum';

@Injectable()
export class StockHistoryDao {
  constructor(@InjectRepository(StockHistory) private stockHistoryRepository: Repository<StockHistory>) {}

  async create(creacreateStockHistoryDto: CreateStockHistoryDto): Promise<number> {
    const stockHistory = this.stockHistoryRepository.create(creacreateStockHistoryDto);

    await this.stockHistoryRepository.save(stockHistory);
    return stockHistory.id;
  }

  async findByType(type: StockMovementType): Promise<StockHistory[]> {
    return this.stockHistoryRepository.find({ where: { type } });
  }

  async findAll(): Promise<StockHistory[]> {
    return this.stockHistoryRepository.find();
  }
}
