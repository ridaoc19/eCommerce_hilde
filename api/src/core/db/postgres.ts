import "reflect-metadata";
import { DataSource } from 'typeorm';
import AdvertisingEntity from "../../modules/advertising/entity";
import CategoryEntity from "../../modules/categories/entity";
import DepartmentEntity from "../../modules/departments/entity";
import NavigationEntity from "../../modules/navigation/entity";
import ProductEntity from "../../modules/products/entity";
import SubcategoryEntity from "../../modules/subcategories/entity";
import { UserEntity } from "../../modules/user/entity";
import VariantEntity from "../../modules/variants/entity";


export const AppDataSource = new DataSource({
  type: process.env.DB_type as 'postgres' || 'postgres',
  host: process.env.DB_host,
  port: process.env.DB_port ? parseInt(process.env.DB_port) : 5432,
  username: process.env.DB_username,
  password: process.env.DB_password,
  database: process.env.DB_database,
  synchronize: true,
  logging: false,
  entities: [
    DepartmentEntity,
    CategoryEntity,
    SubcategoryEntity,
    ProductEntity,
    VariantEntity,
    UserEntity,
    NavigationEntity,
    AdvertisingEntity,
  ],
  migrations: [],
  subscribers: [],
});
