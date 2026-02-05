import { getCart, updateCart, checkoutOrder } from '../services/order.js';

export const getCartController = async (req, res) => {
  const cart = await getCart(req.cookies.sessionId);
  if (cart.length === 0) {
    return res.status(200).json({
      data: [],
      message: 'Cart is empty',
    });
  }

  res.status(200).json({
    data: cart,
  });
};

export const updateOrderController = async (req, res) => {
  const payload = req.body;
  const order = await updateCart(req.cookies.sessionId, payload);

  res.status(200).json({
    data: order,
  });
};

export const checkoutOrderController = async (req, res) => {
  const payload = req.body;
  const order = await checkoutOrder(req.cookies.sessionId, payload);

  res.status(200).json({
    data: order,
  });
};
