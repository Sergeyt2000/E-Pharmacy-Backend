import { OrdersCollection } from '../db/models/order.js';

export const getCart = async () => {
  const orders = await OrdersCollection.find();
  return orders;
};
