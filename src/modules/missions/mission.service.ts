import { MissionRepository } from "./mission.repository";
import { GetStoreMissionsResponseDto } from "./mission.dto";

export class MissionService {
  static async getStoreMissions(
    storeId: number,
    cursor?: number,
    take?: number
  ): Promise<GetStoreMissionsResponseDto> {
    if (!Number.isInteger(storeId) || storeId <= 0) {
      throw new Error("Invalid storeId: must be a positive integer");
    }

    const result = await MissionRepository.getStoreMissionsWithPagination({
      storeId,
      cursor,
      take,
    });

    return result as GetStoreMissionsResponseDto;
  }
}
