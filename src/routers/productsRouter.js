import { Router } from 'express';
import {
  productsController,
  productsByIdController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(productsController));

router.get('/:productId', ctrlWrapper(productsByIdController));

export default router;
