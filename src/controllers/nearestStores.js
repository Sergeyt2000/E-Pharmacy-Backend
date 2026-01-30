import { getNearestStores } from '../services/nearestStores.js';

export const nearestStoresController = async (req, res) => {
    const nearestStores = await getNearestStores();
    res.status(200).json({
    data: nearestStores,
  });
};
