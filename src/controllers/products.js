import { getAllProducts, getProductById } from '../services/products.js';

export const productsController = async (req, res) => {
  const filters = req.query;
  console.log('params:', filters);
  const products = await getAllProducts(filters);


  res.status(200).json({
    data: products,
  });
};

export const productsByIdController = async (req, res, next) => {
  const { productId } = req.params;
  const product = await getProductById(productId);

  if (!product) {
    res.status(404).json({
      message: 'Product not found',
    });
    return;
  }

  res.status(200).json({
    data: product,
  });
};
