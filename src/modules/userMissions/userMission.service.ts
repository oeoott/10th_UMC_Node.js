import { UserMissionRepository } from "./userMission.repository";
import {
  GetOngoingUserMissionsResponseDto,
  CompleteUserMissionResponseDto,
} from "./userMission.dto";

export class UserMissionService {
  static async getOngoingUserMissions(
    userId: number,
    cursor?: number,
    take?: number
  ): Promise<GetOngoingUserMissionsResponseDto> {
    if (!Number.isInteger(userId) || userId <= 0) {
      throw new Error("Invalid userId: must be a positive integer");
    }

    const result =
      await UserMissionRepository.getOngoingUserMissionsWithPagination({
        userId,
        cursor,
        take,
      });

    return result as GetOngoingUserMissionsResponseDto;
  }

  static async completeUserMission(
    userMissionId: number
  ): Promise<CompleteUserMissionResponseDto> {
    if (!Number.isInteger(userMissionId) || userMissionId <= 0) {
      throw new Error(
        "Invalid userMissionId: must be a positive integer"
      );
    }

    // Check if user mission exists
    const existingUserMission =
      await UserMissionRepository.getUserMissionById(userMissionId);

    if (!existingUserMission) {
      throw new Error("User mission not found");
    }

    // Check if already completed
    if (existingUserMission.status === "COMPLETED") {
      throw new Error("Mission is already completed");
    }

    const result =
      await UserMissionRepository.completeUserMission({
        userMissionId,
      });

    return result as CompleteUserMissionResponseDto;
  }
}
