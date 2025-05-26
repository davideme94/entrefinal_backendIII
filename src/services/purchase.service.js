import cartsManager from "../daos/mongo/cartsManager.js";
import productsManager from "../daos/mongo/productsManager.js";
import ticketsManager from "../daos/mongo/ticketsManager.js";

class PurchaseService {
  async finalizePurchase(cartId, purchaserEmail) {
    const cart = await cartsManager.getById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    const productsToBuy = cart.products;
    const notProcessed = [];
    let totalAmount = 0;

    for (const item of productsToBuy) {
      const product = await productsManager.getById(item.product._id);

      if (product && product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await productsManager.update(product._id, product);
        totalAmount += product.price * item.quantity;
      } else {
        notProcessed.push(item.product._id);
      }
    }

    if (totalAmount > 0) {
      await ticketsManager.create({
        amount: totalAmount,
        purchaser: purchaserEmail
      });
    }

    // Filtrar productos no comprados para mantenerlos en el carrito
    const newCartProducts = cart.products.filter(p => notProcessed.includes(p.product._id.toString()));
    await cartsManager.update(cartId, { products: newCartProducts });

    return {
      totalAmount,
      notProcessed
    };
  }
}

export default new PurchaseService();
