import { BaseEntity } from 'src/domain/common/base.entity';
import { Product } from 'src/domain/product/entity/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'user_id',
  })
  id: number;

  @Column({
    nullable: false,
    name: 'login_id',
  })
  loginId: string;

  @Column({
    nullable: false,
    length: 255,
  })
  password: string;

  @Column({
    nullable: false,
    length: 50,
  })
  name: string;

  @Column({
    nullable: false,
    length: 50,
  })
  nickname: string;

  @Column({
    nullable: false,
  })
  age: number;

  @OneToMany(() => Product, (product) => product.user)
  products: Promise<Product[]>;
}
