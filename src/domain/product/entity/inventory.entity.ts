import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { BaseEntity } from 'src/domain/common/base.entity';

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

  @ManyToOne(() => Product, (product) => product.inventory, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Promise<Product>;
}
