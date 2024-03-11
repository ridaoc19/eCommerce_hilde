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

  @Column()
  quantity: number;

  @ManyToOne(() => UserEntity, (cart) => cart.cart)
  // @JoinColumn({ name: 'user' })
  user: UserEntity

  @ManyToOne(() => VariantEntity, (variant) => variant.cart)
  // @JoinColumn({ name: 'variant' })
  variant: VariantEntity

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}