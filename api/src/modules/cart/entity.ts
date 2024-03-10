import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import UserEntity from '../user/entity';
import VariantEntity from '../variant/entity';

@Entity('cart')
export default class CartEntity {
  @PrimaryGeneratedColumn("uuid")
  cart_id: string;

  @Column()
  user_id: string

  @Column()
  variant_id: string

  @ManyToOne(() => UserEntity, (cart) => cart.cart)
  user: UserEntity

  @ManyToOne(() => VariantEntity, (variant) => variant.cart)
  variant: VariantEntity

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}