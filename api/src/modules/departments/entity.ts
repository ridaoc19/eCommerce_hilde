import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from '../categories/entity';
import { NavigationEntity } from '../navigation/entity';

@Entity('department')
export class DepartmentEntity {
  @PrimaryGeneratedColumn("uuid")
  department_id: string;

  @Column({ type: 'varchar' })
  department: string;

  @OneToMany(() => CategoryEntity, category => category.department, { cascade: ['soft-remove', 'recover'] })
  categories: CategoryEntity[];

  @OneToMany(() => NavigationEntity, navigation => navigation.department, { cascade: ['soft-remove', 'recover', 'insert', 'update'] })
  navigations: NavigationEntity[];

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}

// import { Entity, Column, PrimaryGeneratedColumn, Index, OneToMany } from "typeorm";
// import { Exclude, Expose } from "class-transformer";
// import { IsNotEmpty, IsEmail, MinLength, MaxLength, Min, Max, IsNumber, IsString } from "class-validator";

// @Entity()
// export class User extends BaseEntity {

//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   @IsNotEmpty()
//   @IsEmail()
//   @Index({ unique: true })
//   email: string;

//   @Exclude()
//   @Column()
//   passwordHash: string;

//   @Column()
//   @IsNotEmpty()
//   @IsString()
//   firstName: string;

//   @Column()
//   @IsNotEmpty()
//   @IsString()
//   lastName: string;

//   @Column({ type: 'integer', default: Gender.NotSpecified })
//   @IsNumber()
//   @Min(1)
//   @Max(3)
//   gender: Gender;


//   @Expose()
//   get admin() {
//     return this.role == Role.Admin;
//   }

//   @Expose()
//   get stylist() {
//     return this.role == Role.Stylist;
//   }
// }


// import {validate } from "class-validator";
// import {plainToClass} from "class-transformer";
// // ... more code

// server.post('/hello', function create(req, res, next) {
//    let bodyJSON = parseBodyTheWayYouWant(req.body);
//    let post = plainToClass(bodyJSON);
//    validate(post)
//    return next();
// });