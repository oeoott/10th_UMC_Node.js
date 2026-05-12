import { Request, Response, NextFunction } from "express";
import { MissionService } from "./mission.service";

export class MissionController {
  static async getStoreMissions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const storeId = parseInt(req.params.storeId, 10);
      const cursor = req.query.cursor
        ? parseInt(req.query.cursor as string, 10)
        : 0;
      const take = req.query.take ? parseInt(req.query.take as string, 10) : 5;

      if (isNaN(storeId) || storeId <= 0) {
        return res.status(400).json({
          status: 400,
          message: "Invalid storeId: must be a positive integer",
        });
      }

      const result = await MissionService.getStoreMissions(
        storeId,
        cursor,
        take
      );
      return res.status(200).json({
        status: 200,
        message: "Successfully retrieved store missions",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
