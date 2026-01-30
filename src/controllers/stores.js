import { getStores } from '../services/nearestStores.js';

export const storesController = async (req, res) => {
  const stores = await getStores();
  res.status(200).json({
    data: stores,
  });
};
