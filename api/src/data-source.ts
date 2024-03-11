import "reflect-metadata"
import { DataSource } from "typeorm"
import '../dotenv'
import AdvertisingEntity from "./modules/advertising/entity"
import CategoryEntity from "./modules/category/entity"
import DepartmentEntity from "./modules/department/entity"
import FilesEntity from "./modules/developer/entity"
import NavigationEntity from "./modules/navigation/entity"
import ProductEntity from "./modules/product/entity"
import SubcategoryEntity from "./modules/subcategory/entity"
import UserEntity from "./modules/user/entity"
import VariantEntity from "./modules/variant/entity"
import CartEntity from "./modules/cart/entity"
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
        NavigationEntity,
        FilesEntity,
        CartEntity
    ],
    migrations: [],
    subscribers: [],
})
