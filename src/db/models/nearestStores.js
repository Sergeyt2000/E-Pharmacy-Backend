import { model, Schema } from 'mongoose';

const nearestStoresSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const NearestStoresCollection = model(
  'nearest_pharmacies',
  nearestStoresSchema,
);

export const StoresCollection = model('pharmacies', nearestStoresSchema);
