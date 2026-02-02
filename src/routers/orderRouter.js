import { Router } from "express";
import { orderController } from "../controllers/order.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticateUser } from '../middlewares/auth.js';

const router = Router();

router.get('/', authenticateUser, ctrlWrapper(orderController));

export default router;
