import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: string;

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

  @Column()
  verifiedEmail: boolean;

  @Column()
  roles: "super" | "admin" | "edit" | "visitant";

  @Column()
  addresses: string;

  @DeleteDateColumn()
  deletedAt: Date;
}

