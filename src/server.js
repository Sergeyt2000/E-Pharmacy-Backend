import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllProducts, getProductById } from './services/products.js';
import apiRouter from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import { authenticateUser } from './middlewares/auth.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(cookieParser());

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use(apiRouter);

  app.get('/products', authenticateUser, async (req, res) => {
    const products = await getAllProducts();

    res.status(200).json({
      data: products,
    });
  });

  app.get('/products/:productId', async (req, res, next) => {
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
  });

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
