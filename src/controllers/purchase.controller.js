import purchaseService from "../services/purchase.service.js";

export const purchaseCart = async (req, res, next) => {
  try {
    const cartId = req.params.cid;
    const userEmail = req.user.email;

    const result = await purchaseService.finalizePurchase(cartId, userEmail);

    res.status(200).json({
      message: "Compra procesada",
      totalAmount: result.totalAmount,
      productosNoProcesados: result.notProcessed
    });
  } catch (error) {
    next(error);
  }
};
