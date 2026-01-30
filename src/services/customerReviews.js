import { ReviewsCollection } from '../db/models/reviews.js';

export const getCustomerReviews = async () => {
  const reviews = await ReviewsCollection.find();
  return reviews;
};
