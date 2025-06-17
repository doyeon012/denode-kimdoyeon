import { BaseEntity } from '@domain/common/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '@domain/product/entity/product.entity';
import { StockMovementEnum, StockMovementType } from '@enums/stock.movement.type.enum';

@Entity()
export class StockHistory extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'stock_history_id',
  })
  id: number;

  @Column({
    nullable: false,
    type: 'enum',
    enum: StockMovementEnum,
  })
  type: StockMovementType;

  @Column({
    nullable: false,
  })
  quantity: number;

  @Column({
    nullable: false,
  })
  reason: string;

  @Column({
    nullable: false,
    name: 'product_id',
  })
  productId: number;

  @ManyToOne(() => Product, (product) => product.stockHistory, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Promise<Product>;
}
