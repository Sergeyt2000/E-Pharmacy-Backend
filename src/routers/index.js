import { Router } from 'express';
import authRouter from './authRouter.js';
import nearestStoresRouter from './nearestStoresRouter.js';
import productsRouter from './productsRouter.js';
import customerReviewsRouter from './customerReviewsRouter.js';
import storesRouter from './StoresRouter.js';

const router = Router();

router.use('/user', authRouter);

router.use('/stores/nearest', nearestStoresRouter);
router.use('/customer-reviews', customerReviewsRouter);
router.use('/stores', storesRouter);

router.use('/products', productsRouter);

export default router;
