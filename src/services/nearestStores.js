import {
  NearestStoresCollection,
  StoresCollection,
} from '../db/models/nearestStores.js';

export const getNearestStores = async () => {
  const nearestStores = await NearestStoresCollection.find({});
  return nearestStores;
};

export const getStores = async () => {
  const stores = await StoresCollection.find({});
  return stores;
};
