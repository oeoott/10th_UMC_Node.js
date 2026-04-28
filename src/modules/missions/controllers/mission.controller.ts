import { Request, Response } from "express";
import * as missionService from "../services/mission.service";

export const handleChallengeMission = async (req: Request, res: Response) => {
  const missionId = Number(req.params.missionId);
  const userId = 1; // 임시

  const result = await missionService.challengeMission(userId, missionId);

  res.json({
    result,
  });
};