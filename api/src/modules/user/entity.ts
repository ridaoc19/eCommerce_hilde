import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import CartEntity from '../cart/entity';
import ProductEntity from '../product/entity';

@Entity('users')
export default class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ select: false })
  password: string;

  @Column()
  verified: boolean;

  @Column({ default: true })
  verifiedEmail: boolean;

  @Column({ default: 'visitant' })
  roles: "super" | "admin" | "edit" | "visitant";

  @Column({ nullable: true })
  addresses: string;

  @ManyToMany(() => ProductEntity, product => product.favorites)
  @JoinTable({
    name: 'favorites',
    joinColumn: {
      name: 'user',
      referencedColumnName: 'user_id'
    },
    inverseJoinColumn: {
      name: 'product',
      referencedColumnName: 'product_id'
    }
  })
  favorite: ProductEntity[];

  @ManyToMany(() => CartEntity, cart => cart.user)
  cart: CartEntity[];

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}

