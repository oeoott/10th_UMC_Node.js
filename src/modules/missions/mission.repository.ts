import { prisma } from "../../db.config";

interface GetStoreMissionsParams {
  storeId: number;
  cursor?: number;
  take?: number;
}

export class MissionRepository {
  static async getStoreMissions({
    storeId,
    cursor = 0,
    take = 5,
  }: GetStoreMissionsParams) {
    const missions = await prisma.mission.findMany({
      where: {
        storeId: storeId,
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

    return missions;
  }

  static async getStoreMissionsWithPagination({
    storeId,
    cursor = 0,
    take = 5,
  }: GetStoreMissionsParams) {
    const missions = await this.getStoreMissions({
      storeId,
      cursor,
      take,
    });

    const nextCursor =
      missions.length === take ? missions[missions.length - 1].id : null;

    return {
      data: missions,
      pagination: {
        cursor: nextCursor,
      },
    };
  }
}
