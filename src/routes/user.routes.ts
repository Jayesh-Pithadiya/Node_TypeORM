
import { Router } from "express";
import { UserController } from "../controller/user.controller";

const router = Router();
const controller = new UserController();

router.post("/users", controller.create.bind(controller));
router.get("/users", controller.getAll.bind(controller));
router.get("/users/:id", controller.getById.bind(controller));
router.put("/users/:id", controller.update.bind(controller));
router.delete("/users/:id", controller.delete.bind(controller));

export default router;
