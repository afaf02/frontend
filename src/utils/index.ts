import { Review } from "../types/review";
import { User } from "../types/user";

export const formatReviewRows = (reviews: Review[]) => {
  return reviews.map((review) => ({
    teacher: review.teacher,
    feedback: review.feedback,
    rating: review.rating,
  }));
};

export const formatUserRows = (users: User[]) => {
  return users.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
  }));
};
