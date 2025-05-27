import { Router } from "express";
import productsManager from "../daos/mongo/productsManager.js";
import cartsManager from "../daos/mongo/cartsManager.js";
import usersManager from "../daos/mongo/usersManager.js";
import mocksRouter from "./api/mocks.router.js"; // ✅ AÑADIDO

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

router.get("/login", (req, res) => {
  res.render("login", { title: "Iniciar sesión" });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Registro" });
});

// ✅ NUEVO: endpoint para mocking
router.use("/api/mocks", mocksRouter);

export default router;
