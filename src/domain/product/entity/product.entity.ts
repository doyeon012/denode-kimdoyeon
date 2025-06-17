import { BaseEntity } from '@domain/common/base.entity';
import { Users } from '@domain/user/entity/users.entity';
import { ProductStatusEnum, ProductStatusType } from '@enums/product.status.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Inventory } from '@domain/product/entity/inventory.entity';
import { StockHistory } from '@domain/product/entity/stock.history.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'product_id',
  })
  id: number;

  @Column({
    nullable: false,
    length: 255,
  })
  name: string;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 0,
  })
  price: number;

  @Column({
    nullable: false,
    length: 500,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: ProductStatusEnum,
    default: ProductStatusEnum.valid,
    nullable: false,
  })
  status: ProductStatusType;

  @Column({
    nullable: false,
    name: 'users_id',
  })
  userId: number;

  @OneToMany(() => Inventory, (inventory) => inventory.product)
  inventory: Promise<Inventory[]>;

  @OneToMany(() => StockHistory, (stockHistory) => stockHistory.product)
  stockHistory: Promise<StockHistory[]>;

  @ManyToOne(() => Users, (user) => user.products, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'users_id' })
  user: Promise<Users>;
}
