import { prisma } from "../../db.config";

interface GetUserReviewsParams {
  userId: number;
  cursor?: number;
  take?: number;
}

export class ReviewRepository {
  static async getUserReviews({
    userId,
    cursor = 0,
    take = 5,
  }: GetUserReviewsParams) {
    const reviews = await prisma.review.findMany({
      where: {
        userId: userId,
      },
      include: {
        store: true,
      },
      orderBy: {
        id: "asc",
      },
      cursor: cursor > 0 ? { id: cursor } : undefined,
      skip: cursor > 0 ? 1 : 0,
      take: take,
    });

    return reviews;
  }

  static async getUserReviewsWithPagination({
    userId,
    cursor = 0,
    take = 5,
  }: GetUserReviewsParams) {
    const reviews = await this.getUserReviews({
      userId,
      cursor,
      take,
    });

    const nextCursor =
      reviews.length === take ? reviews[reviews.length - 1].id : null;

    return {
      data: reviews,
      pagination: {
        cursor: nextCursor,
      },
    };
  }
}
