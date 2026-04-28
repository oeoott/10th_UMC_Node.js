import * as missionRepository from "../repositories/mission.repository";

export const challengeMission = async (userId: number, missionId: number) => {
  // 1. 미션 존재 확인
  const mission = await missionRepository.getMission(missionId);
  if (!mission) {
    throw new Error("존재하지 않는 미션입니다.");
  }

  // 2. 중복 체크
  const already = await missionRepository.checkMission(userId, missionId);
  if (already) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  // 3. 저장
  const id = await missionRepository.addMission(userId, missionId);

  return {
    userMissionId: id,
    userId,
    missionId,
  };
};