import { Request, Response, NextFunction } from "express";
import { UserMissionService } from "./userMission.service";

export class UserMissionController {
  static async getOngoingUserMissions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = parseInt(req.params.userId, 10);
      const cursor = req.query.cursor
        ? parseInt(req.query.cursor as string, 10)
        : 0;
      const take = req.query.take ? parseInt(req.query.take as string, 10) : 5;

      if (isNaN(userId) || userId <= 0) {
        return res.status(400).json({
          status: 400,
          message: "Invalid userId: must be a positive integer",
        });
      }

      const result = await UserMissionService.getOngoingUserMissions(
        userId,
        cursor,
        take
      );
      return res.status(200).json({
        status: 200,
        message: "Successfully retrieved ongoing user missions",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async completeUserMission(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userMissionId = parseInt(req.params.userMissionId, 10);

      if (isNaN(userMissionId) || userMissionId <= 0) {
        return res.status(400).json({
          status: 400,
          message: "Invalid userMissionId: must be a positive integer",
        });
      }

      const result = await UserMissionService.completeUserMission(
        userMissionId
      );

      return res.status(200).json({
        status: 200,
        message: "Mission completed successfully",
        data: result,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "User mission not found") {
          return res.status(404).json({
            status: 404,
            message: "User mission not found",
          });
        }
        if (error.message === "Mission is already completed") {
          return res.status(400).json({
            status: 400,
            message: "Mission is already completed",
          });
        }
      }
      next(error);
    }
  }
}
