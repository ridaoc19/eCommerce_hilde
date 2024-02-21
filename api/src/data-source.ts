import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserEntity } from "./modules/user/entity"
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
    entities: [UserEntity],
    migrations: [],
    subscribers: [],
})
