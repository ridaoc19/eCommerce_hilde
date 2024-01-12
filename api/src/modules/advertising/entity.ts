import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('advertising')
export class AdvertisingEntity {
  @PrimaryGeneratedColumn('uuid')
  advertising_id: string;

  @Column()
  page: string;

  @Column()
  location: string;

  @Column()
  title: string;

  @Column()
  redirect: string;

  @Column()
  text: string;

  @Column()
  image_desktop: string;

  @Column()
  image_tablet: string;

  @Column()
  image_phone: string;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}


// @Entity('advertising')
// export class AdvertisingEntity {
//   @PrimaryGeneratedColumn('uuid')
//   advertising_id: string;

//   @Column({ type: 'jsonb', nullable: true, default: () => "'[]'::jsonb" })
//   home: Array<{ id: string; location: string; title: string; link: string; text: string; image: string }> = [];

//   @Column({ type: 'jsonb', nullable: true, default: () => "'[]'::jsonb" })
//   product_list: Array<{ id: string; location: string; title: string; link: string; text: string; image: string }> = [];

//   @Column({ type: 'jsonb', nullable: true, default: () => "'[]'::jsonb" })
//   product_detail: Array<{ id: string; location: string; title: string; link: string; text: string; image: string }> = [];

//   @Column({ type: 'jsonb', nullable: true, default: () => "'[]'::jsonb" })
//   checkout: Array<{ id: string; location: string; title: string; link: string; text: string; image: string }> = [];

//   @DeleteDateColumn({ select: false })
//   deletedAt: Date;

//   @BeforeUpdate()
//   generateUUIDsOnUpdate() {
//     this.home = this.updateArrayWithUUIDs(this.home);
//     this.product_list = this.updateArrayWithUUIDs(this.product_list);
//     this.product_detail = this.updateArrayWithUUIDs(this.product_detail);
//     this.checkout = this.updateArrayWithUUIDs(this.checkout);
//   }

//   @BeforeInsert()
//   generateUUIDsOnInsert() {
//     this.home = this.updateArrayWithUUIDs(this.home);
//     this.product_list = this.updateArrayWithUUIDs(this.product_list);
//     this.product_detail = this.updateArrayWithUUIDs(this.product_detail);
//     this.checkout = this.updateArrayWithUUIDs(this.checkout);
//   }

//   private updateArrayWithUUIDs(array: Array<{ id: string; location: string; title: string; link: string; text: string; image: string }>): Array<{ id: string; location: string; title: string; link: string; text: string; image: string }> {
//     return array.map(item => ({
//       ...item,
//       id: item.id || uuidv4(), // Usar el UUID existente o generar uno nuevo si no existe
//     }));
//   }
// }

