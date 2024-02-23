import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserEntity } from "./modules/user/entity"
import AdvertisingEntity from "./modules/advertising/entity"
import DepartmentEntity from "./modules/department/entity"
import CategoryEntity from "./modules/category/entity"
import SubcategoryEntity from "./modules/subcategory/entity"
import ProductEntity from "./modules/product/entity"
import VariantEntity from "./modules/variant/entity"
import NavigationEntity from "./modules/navigation/entity"
// import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_host,
    port: process.env.DB_port ? parseInt(process.env.DB_port) : 5432,
    username: process.env.DB_username,
    password: process.env.DB_password,
    database: process.env.DB_database,
    synchronize: true,
    logging: false,
    entities: [
        UserEntity,
        AdvertisingEntity,
        DepartmentEntity,
        CategoryEntity,
        SubcategoryEntity,
        ProductEntity,
        VariantEntity,
        NavigationEntity
    ],
    migrations: [],
    subscribers: [],
})
