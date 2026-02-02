import { model, Schema } from "mongoose";

const orderSchema = new Schema({
    photo: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    products: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
    order_date: { type: Date, required: true },
}, { timestamps: true });

export const OrdersCollection = model('orders', orderSchema);
