import { Router } from "express";
import productsController from "../../controllers/products.controller.js";
import productsManager from "../../data/mongo/productsManager.js";

const router = Router();

// 🔹 VISTA HTML paginada
router.get("/", productsController.getAll);

// 🔹 API JSON con filtros
router.get("/json", async (req, res, next) => {
  try {
    const result = await productsManager.getAllRaw(req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// 🔹 VISTA Real-Time Products
router.get("/real", async (req, res, next) => {
  try {
    const data = await productsManager.getAll({}, { page: 1, limit: 1000, lean: true });
    res.render("realTimeProducts", {
      title: "Real-Time Products",
      products: data.docs || []
    });
  } catch (error) {
    next(error);
  }
});



// 🔹 CRUD
router.get("/:pid", productsController.getOne);
router.post("/", productsController.create);
router.put("/:pid", productsController.update);
router.delete("/:pid", productsController.delete);

export default router;
