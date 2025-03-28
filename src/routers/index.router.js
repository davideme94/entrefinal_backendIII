import { Router } from "express";
import productsManager from "../data/mongo/productsManager.js";
import cartsManager from "../data/mongo/cartsManager.js";
import usersManager from "../data/mongo/usersManager.js";


const router = Router();

router.get("/", (req, res) => {
    res.render("home", { title: "Home" });
});

router.get("/products", async (req, res) => {
    const products = await productsManager.getAll();
    res.render("products", { title: "Products", products });
});

router.get("/carts", async (req, res) => {
    const carts = await cartsManager.getAll();
    res.render("carts", { title: "Carts", carts });
});

router.get("/users", async (req, res) => {
    const users = await usersManager.getAll();
    res.render("users", { title: "Users", users });
});

// ✅ Exportación correcta para usar con `import`
export default router;
