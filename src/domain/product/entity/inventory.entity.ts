import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { BaseEntity } from 'src/domain/common/base.entity';
import { Users } from 'src/domain/user/entity/users.entity';

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
