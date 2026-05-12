import { prisma } from "../../db.config";

interface GetOngoingUserMissionsParams {
  userId: number;
  cursor?: number;
  take?: number;
}

interface CompleteUserMissionParams {
  userMissionId: number;
}

export class UserMissionRepository {
  static async getOngoingUserMissions({
    userId,
    cursor = 0,
    take = 5,
  }: GetOngoingUserMissionsParams) {
    const userMissions = await prisma.userMission.findMany({
      where: {
        userId: userId,
        status: "ONGOING",
      },
      include: {
        mission: {
          include: {
            store: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
      cursor: cursor > 0 ? { id: cursor } : undefined,
      skip: cursor > 0 ? 1 : 0,
      take: take,
    });

    return userMissions;
  }

  static async getOngoingUserMissionsWithPagination({
    userId,
    cursor = 0,
    take = 5,
  }: GetOngoingUserMissionsParams) {
    const userMissions = await this.getOngoingUserMissions({
      userId,
      cursor,
      take,
    });

    const nextCursor =
      userMissions.length === take
        ? userMissions[userMissions.length - 1].id
        : null;

    return {
      data: userMissions,
      pagination: {
        cursor: nextCursor,
      },
    };
  }

  static async getUserMissionById(userMissionId: number) {
    const userMission = await prisma.userMission.findFirst({
      where: {
        id: userMissionId,
      },
      include: {
        mission: {
          include: {
            store: true,
          },
        },
      },
    });

    return userMission;
  }

  static async completeUserMission({
    userMissionId,
  }: CompleteUserMissionParams) {
    const updatedUserMission = await prisma.userMission.update({
      where: {
        id: userMissionId,
      },
      data: {
        status: "COMPLETED",
      },
      include: {
        mission: {
          include: {
            store: true,
          },
        },
      },
    });

    return updatedUserMission;
  }
}
