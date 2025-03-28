import { Router } from "express";
import usersController from "../../controllers/users.controller.js"; // ✅ Verifica la ruta

const router = Router();

// 🚀 Rutas de usuarios
router.post("/", usersController.create);
router.get("/", usersController.getAll);
router.get("/:uid", usersController.getOne);
router.put("/:uid", usersController.update);
router.delete("/:uid", usersController.delete);

export default router;
