import { OrdersCollection } from '../db/models/order.js';
import { SessionCollection } from '../db/models/session.js';
import { UserCollection } from '../db/models/user.js';
import { ProductsCollection } from '../db/models/products.js';

export const getCart = async (sessionID) => {
  const session = await SessionCollection.findById(sessionID);
  console.log('session:', session);

  const userId = session ? session.userId : null;
  console.log('userId:', userId);
  const user = userId ? await UserCollection.findById(userId) : null;
console.log('user:', user);
  if (user) {
    return user.cart;
  }
  return [];
};

export const updateCart = async (sessionID, payload) => {
  const session = await SessionCollection.findById(sessionID);
  const userId = session ? session.userId : null;
  const user = userId ? await UserCollection.findById(userId) : null;

  const product = await ProductsCollection.findById(payload.product);
  const price = product.price;

  // const price = await ProductsCollection.findById(payload.product).then(
  //   (p) => p.price,
  // );
  const totalPrice = price * payload.quantity;
  const totalPayload = { ...payload, product: product.id, price: totalPrice };
  user.cart.push(totalPayload);
  await user.save();

  return {
    order: totalPayload,
    message: 'Order created successfully',
  };
};

export const checkoutOrder = async (sessionID, payload) => {
  const session = await SessionCollection.findById(sessionID);
  const userId = session ? session.userId : null;
  const user = userId ? await UserCollection.findById(userId) : null;

  const carts = user.cart;
  if (carts.length === 0) {
    throw new Error('Cart is empty');
  }

  const products = carts.map((card) => card.product.toString());
  const orderPrice = carts.reduce((sum, cart) => sum + cart.price, 0);
  // const productsToString = products.map((p) => `${p}`).join(", ");

  const order = await OrdersCollection.create({
    photo: 'User Avatar',
    name: user.name,
    address: payload.address,
    products: products,
    price: orderPrice,
    status: 'Pending',
    order_date: new Date(),
  });
  // user.orders.push(order._id);

  user.cart = [];
  await user.save();

  return {
    order: order,
    message: 'Checkout completed successfully',
  };
};
