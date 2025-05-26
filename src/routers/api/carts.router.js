import { Router } from "express";

// 🔄 RUTA CORREGIDA
import cartsManager from "../../daos/mongo/cartsManager.js";

import { passportCall } from "../../utils/passport.js";
import { purchaseCart } from "../../controllers/purchase.controller.js";

const router = Router();

// ✅ DELETE api/carts/:cid/products/:pid - Eliminar producto específico
router.delete("/:cid/products/:pid", async (req, res, next) => {
  try {
    const result = await cartsManager.removeProduct(req.params.cid, req.params.pid);
    if (!result) return res.status(404).json({ error: "Cart or Product not found" });
    res.json({ message: "Product removed from cart", cart: result });
  } catch (error) {
    next(error);
  }
});

// ✅ PUT api/carts/:cid - Actualizar todo el carrito
router.put("/:cid", async (req, res, next) => {
  try {
    const result = await cartsManager.updateCart(req.params.cid, req.body.products);
    if (!result) return res.status(404).json({ error: "Cart not found" });
    res.json({ message: "Cart updated", cart: result });
  } catch (error) {
    next(error);
  }
});

// ✅ PUT api/carts/:cid/products/:pid - Actualizar cantidad de un producto
router.put("/:cid/products/:pid", async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const result = await cartsManager.updateProductQuantity(req.params.cid, req.params.pid, quantity);
    if (!result) return res.status(404).json({ error: "Cart or Product not found" });
    res.json({ message: "Product quantity updated", cart: result });
  } catch (error) {
    next(error);
  }
});

// ✅ DELETE api/carts/:cid - Vaciar carrito
router.delete("/:cid", async (req, res, next) => {
  try {
    const result = await cartsManager.clearCart(req.params.cid);
    if (!result) return res.status(404).json({ error: "Cart not found" });
    res.json({ message: "Cart cleared", cart: result });
  } catch (error) {
    next(error);
  }
});

// ✅ GET api/carts/:cid - Obtener carrito con productos populados
router.get("/:cid", async (req, res, next) => {
  try {
    const cart = await cartsManager.getCartWithProducts(req.params.cid);
    if (!cart) return res.status(404).json({ error: "Cart not found" });
    res.render("cart", { title: "Your Cart", cart });
  } catch (error) {
    next(error);
  }
});

// ✅ NUEVA RUTA - FINALIZAR COMPRA Y GENERAR TICKET
router.post("/:cid/purchase", passportCall('jwt'), purchaseCart);

export default router;
