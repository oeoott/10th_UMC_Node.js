import { Router } from "express";
import { ReviewController } from "../modules/reviews/review.controller";
import { MissionController } from "../modules/missions/mission.controller";
import { UserMissionController } from "../modules/userMissions/userMission.controller";

const router = Router();

// Review routes
// GET /api/v1/users/:userId/reviews - 내가 작성한 리뷰 목록 조회
router.get("/users/:userId/reviews", ReviewController.getUserReviews);

// Mission routes
// GET /api/v1/stores/:storeId/missions - 특정 가게의 미션 목록 조회
router.get("/stores/:storeId/missions", MissionController.getStoreMissions);

// UserMission routes
// GET /api/v1/users/:userId/missions/ongoing - 내가 진행 중인 미션 목록 조회
router.get(
  "/users/:userId/missions/ongoing",
  UserMissionController.getOngoingUserMissions
);

// PATCH /api/v1/user-missions/:userMissionId/complete - 내가 진행 중인 미션을 진행 완료로 변경
router.patch(
  "/user-missions/:userMissionId/complete",
  UserMissionController.completeUserMission
);

export default router;
