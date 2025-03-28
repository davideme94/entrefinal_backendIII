import CartModel from "../../models/carts.model.js";

class CartsManager {
    // ✅ Eliminar un producto específico del carrito
    async removeProduct(cid, pid) {
        const cart = await CartModel.findById(cid);
        if (!cart) return null;

        cart.products = cart.products.filter(p => p.product.toString() !== pid);
        await cart.save();
        return cart;
    }

    // ✅ Actualizar todo el carrito con un nuevo arreglo de productos
    async updateCart(cid, products) {
        const cart = await CartModel.findById(cid);
        if (!cart) return null;

        cart.products = products;
        await cart.save();
        return cart;
    }

    // ✅ Actualizar solo la cantidad de un producto
    async updateProductQuantity(cid, pid, quantity) {
        const cart = await CartModel.findById(cid);
        if (!cart) return null;

        const productInCart = cart.products.find(p => p.product.toString() === pid);
        if (!productInCart) return null;

        productInCart.quantity = quantity;
        await cart.save();
        return cart;
    }

    // ✅ Eliminar todos los productos del carrito
    async clearCart(cid) {
        const cart = await CartModel.findById(cid);
        if (!cart) return null;

        cart.products = [];
        await cart.save();
        return cart;
    }

    // ✅ Obtener carrito con populate de productos
    async getCartWithProducts(cid) {
        return await CartModel.findById(cid).populate("products.product").lean();
    }

    // ✅ Obtener carrito por ID sin populate
    async getById(cid) {
        return await CartModel.findById(cid);
    }
}

export default new CartsManager();
