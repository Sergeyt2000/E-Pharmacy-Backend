import { Router } from 'express';
import authRouter from './authRouter.js';
import nearestStoresRouter from './nearestStoresRouter.js';
import productsRouter from './productsRouter.js';

const router = Router();

router.use('/user', authRouter);

router.use('/stores/nearest', nearestStoresRouter);
router.use('/stores/customer-reviews', nearestStoresRouter);
router.use('/stores', nearestStoresRouter);

router.use('/products', productsRouter);

export default router;
