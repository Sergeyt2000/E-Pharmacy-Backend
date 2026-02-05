import { Router } from "express";
import {
  getCartController,
  updateOrderController,
  checkoutOrderController,
} from '../controllers/order.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticateUser } from '../middlewares/auth.js';

const router = Router();

router.get('/', authenticateUser, ctrlWrapper(getCartController));
router.put('/update', authenticateUser, ctrlWrapper(updateOrderController));
router.post(
  '/checkout',
  authenticateUser,
  ctrlWrapper(checkoutOrderController),
);

export default router;
