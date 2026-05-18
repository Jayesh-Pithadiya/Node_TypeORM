
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";

export const userRepo = AppDataSource.getRepository(User);
