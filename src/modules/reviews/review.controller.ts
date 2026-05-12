import { Request, Response, NextFunction } from "express";
import { ReviewService } from "./review.service";

export class ReviewController {
  static async getUserReviews(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = parseInt(req.params.userId, 10);
      const cursor = req.query.cursor ? parseInt(req.query.cursor as string, 10) : 0;
      const take = req.query.take ? parseInt(req.query.take as string, 10) : 5;

      if (isNaN(userId) || userId <= 0) {
        return res.status(400).json({
          status: 400,
          message: "Invalid userId: must be a positive integer",
        });
      }

      const result = await ReviewService.getUserReviews(userId, cursor, take);
      return res.status(200).json({
        status: 200,
        message: "Successfully retrieved user reviews",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
