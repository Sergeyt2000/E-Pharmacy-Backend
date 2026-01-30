import { getCustomerReviews } from '../services/customerReviews.js';

export const customerReviewsController = async (req, res) => {
  const reviews = await getCustomerReviews();
  res.status(200).json({
    data: reviews,
  });
};
