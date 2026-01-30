import { Router } from "express";
import { customerReviewsController } from "../controllers/customerReviews.js";

const router = Router();
router.get('/', customerReviewsController);

export default router;
