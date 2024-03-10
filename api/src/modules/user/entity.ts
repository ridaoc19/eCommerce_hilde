import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import CartEntity from '../cart/entity';
import ProductEntity from '../product/entity';

@Entity('users')
export default class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  verified: boolean;

  @Column({ default: true })
  verifiedEmail: boolean;

  @Column({ default: 'visitant' })
  roles: "super" | "admin" | "edit" | "visitant";

  @Column({ nullable: true })
  addresses: string;

  @ManyToMany(() => ProductEntity, product => product.usersInFavorites)
  @JoinTable()
  favorite: ProductEntity[];

  @ManyToMany(() => CartEntity, cart => cart.user_id)
  @JoinTable()
  cart: CartEntity[];

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}

