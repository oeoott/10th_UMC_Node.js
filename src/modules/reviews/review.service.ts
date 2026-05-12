import { ReviewRepository } from "./review.repository";
import {
  GetUserReviewsResponseDto,
  ReviewResponseDto,
} from "./review.dto";

export class ReviewService {
  static async getUserReviews(
    userId: number,
    cursor?: number,
    take?: number
  ): Promise<GetUserReviewsResponseDto> {
    if (!Number.isInteger(userId) || userId <= 0) {
      throw new Error("Invalid userId: must be a positive integer");
    }

    const result = await ReviewRepository.getUserReviewsWithPagination({
      userId,
      cursor,
      take,
    });

    return result as GetUserReviewsResponseDto;
  }
}
