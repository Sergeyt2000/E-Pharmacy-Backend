import { model, Schema } from 'mongoose';

const productsSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    photo: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    suppliers: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ProductsCollection = model('products', productsSchema);

