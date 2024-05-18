import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ type: 'varchar', length: 50, comment: 'Nombre del usuario' })
  name: string;

  @Column({ type: 'varchar', length: 50, comment: 'Apellido del usuario' })
  lastName: string;

  @Column({
    type: 'varchar',
    unique: true,
    length: 100,
    comment: 'Correo electrónico del usuario',
  })
  email: string;

  @Column({
    type: 'integer',
    comment: 'Número de teléfono del usuario',
  })
  phone: number;

  @Column({ type: 'varchar', comment: 'Contraseña del usuario' })
  password: string;

  @Column({
    type: 'boolean',
    default: false,
    comment: 'Indica si el usuario ha verificado su cuenta',
  })
  verified: boolean;

  @Column({
    type: 'boolean',
    default: true,
    comment: 'Indica si el correo electrónico del usuario ha sido verificado',
  })
  verifiedEmail: boolean;

  @Column({
    type: 'enum',
    enum: ['super', 'admin', 'edit', 'visitant'],
    default: 'visitant',
    comment: 'Rol del usuario en el sistema',
  })
  roles: 'super' | 'admin' | 'edit' | 'visitant';

  @Column({
    type: 'text',
    nullable: true,
    comment: 'Direcciones asociadas al usuario',
  })
  addresses: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creación del registro',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de última actualización del registro',
  })
  updateAt: Date;
}
