import { Router } from 'express';
import { storesController } from '../controllers/stores.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(storesController));
export default router;
