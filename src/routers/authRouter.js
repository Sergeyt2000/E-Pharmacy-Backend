import { Router } from 'express';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshTokenController,
  getUserInfoController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerSchema, loginSchema } from '../validation/auth.validation.js';
import { authenticateUser } from '../middlewares/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerSchema),
  ctrlWrapper(registerUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post(
  '/login',
  validateBody(loginSchema),
  ctrlWrapper(loginUserController),
);

router.post('/refresh', ctrlWrapper(refreshTokenController));

router.get('/user-info',authenticateUser, ctrlWrapper(getUserInfoController));

export default router;
