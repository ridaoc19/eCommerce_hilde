import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
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

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}

