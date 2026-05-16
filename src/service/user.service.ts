
import { userRepo } from "../repository/user.repository";
import { User } from "../entity/User";
import { ObjectId } from "mongodb";

export class UserService {

    async create(data: Partial<User>) {
        const user = userRepo.create(data);
        return await userRepo.save(user);
    }

    async findAll() {
        return userRepo.find();
    }

    async findById(id: string) {
        try {
            return await userRepo.findOneBy({ _id: new ObjectId(id) } as any);
        } catch (error) {
            return null;
        }
    }

    async update(id: string, data: Partial<User>) {
        return userRepo.update(id, data);
    }

    async delete(id: string) {
        return userRepo.delete(id);
    }
}
