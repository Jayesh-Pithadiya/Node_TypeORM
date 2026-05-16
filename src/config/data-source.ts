import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/User";

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: "mongodb+srv://jayeshpithadiya385_db_user:EsnyiIz5VxIOPv21@cluster0.dkferfg.mongodb.net/Type_Orm",
    database: "typeorm_demo",
    entities: [User],
    synchronize: true,
    logging: true
});