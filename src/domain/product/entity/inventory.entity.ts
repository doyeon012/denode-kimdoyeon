import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '@domain/product/entity/product.entity';
import { BaseEntity } from '@domain/common/base.entity';
import { Users } from '@domain/user/entity/users.entity';
import { StockHistory } from '@domain/product/entity/stock.history.entity';

@Entity()
export class Inventory extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'inventory_id',
  })
  id: number;

  @Column({
    nullable: false,
  })
  quantity: number;

  @Column({
    nullable: false,
  })
  expiryDate: Date;

  @Column({
    nullable: false,
    name: 'product_id',
  })
  productId: number;

  @Column({
    nullable: false,
    name: 'users_id',
  })
  userId: number;

  @OneToMany(() => StockHistory, (stockHistory) => stockHistory.inventory)
  stockHistory: Promise<StockHistory[]>;

  @ManyToOne(() => Product, (product) => product.inventory, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Promise<Product>;

  @ManyToOne(() => Users, (user) => user.inventory, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'users_id' })
  user: Promise<Users>;
}
