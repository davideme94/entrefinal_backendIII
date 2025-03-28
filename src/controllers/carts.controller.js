import cartsManager from "../data/mongo/cartsManager.js";

class CartsController {
    // ✅ Eliminar un producto específico del carrito
    async removeProduct(req, res, next) {
        try {
            const { cid, pid } = req.params;
            const updatedCart = await cartsManager.removeProduct(cid, pid);
            if (!updatedCart) return res.status(404).json({ error: "Cart or product not found" });
            res.status(200).json({ message: "Product removed successfully", updatedCart });
        } catch (error) {
            next(error);
        }
    }

    // ✅ Actualizar todos los productos del carrito
    async updateCart(req, res, next) {
        try {
            const { cid } = req.params;
            const { products } = req.body;
            if (!Array.isArray(products)) return res.status(400).json({ error: "Products must be an array" });

            const updatedCart = await cartsManager.updateCart(cid, products);
            if (!updatedCart) return res.status(404).json({ error: "Cart not found" });

            res.status(200).json({ message: "Cart updated successfully", updatedCart });
        } catch (error) {
            next(error);
        }
    }

    // ✅ Actualizar cantidad de un producto específico en el carrito
    async updateProductQuantity(req, res, next) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            if (!quantity || isNaN(quantity)) return res.status(400).json({ error: "Quantity must be a number" });

            const updatedCart = await cartsManager.updateProductQuantity(cid, pid, Number(quantity));
            if (!updatedCart) return res.status(404).json({ error: "Cart or product not found" });

            res.status(200).json({ message: "Product quantity updated successfully", updatedCart });
        } catch (error) {
            next(error);
        }
    }

    // ✅ Eliminar todos los productos del carrito
    async clearCart(req, res, next) {
        try {
            const { cid } = req.params;
            const updatedCart = await cartsManager.clearCart(cid);
            if (!updatedCart) return res.status(404).json({ error: "Cart not found" });

            res.status(200).json({ message: "Cart cleared successfully", updatedCart });
        } catch (error) {
            next(error);
        }
    }

    // ✅ Obtener carrito por ID con los productos usando `populate()`
    async getCartWithProducts(req, res, next) {
        try {
            const { cid } = req.params;
            const cart = await cartsManager.getCartWithProducts(cid);
            if (!cart) return res.status(404).json({ error: "Cart not found" });

            res.status(200).json(cart);
        } catch (error) {
            next(error);
        }
    }
}

export default new CartsController();
