import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/User";

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: process.env.MONGO_URL,
    database: "typeorm_demo",
    entities: [User],
    synchronize: true,
    logging: true
});