
import { Request, Response } from "express";
import { UserService } from "../service/user.service";

const service = new UserService();

export class UserController {

    async create(req: Request, res: Response) {
        const result = await service.create(req.body);
        res.json(result);
    }

    async getAll(req: Request, res: Response) {
        const result = await service.findAll();
        res.json(result);
    }

    async getById(req: Request, res: Response) {
        const result = await service.findById(req.params.id);
        res.json(result);
    }

    async update(req: Request, res: Response) {
        const result = await service.update(req.params.id, req.body);
        res.json(result);
    }

    async delete(req: Request, res: Response) {
        const result = await service.delete(req.params.id);
        res.json(result);
    }
}
