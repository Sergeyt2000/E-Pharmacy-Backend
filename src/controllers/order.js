import { getCart } from '../services/order.js';

export const orderController = async (req, res) => {
  const orders = await getCart();

  res.status(200).json({
    data: orders,
  });
};
