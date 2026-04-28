import { pool } from "../../../db.config.js";

// 미션 존재 확인
export const getMission = async (missionId: number) => {
  const [rows]: any = await pool.query(
    `SELECT * FROM mission WHERE id = ?`,
    [missionId]
  );
  return rows[0];
};

// 이미 도전했는지 확인
export const checkMission = async (userId: number, missionId: number) => {
  const [rows]: any = await pool.query(
    `SELECT * FROM user_mission WHERE user_id = ? AND mission_id = ?`,
    [userId, missionId]
  );
  return rows.length > 0;
};

// 미션 도전 추가
export const addMission = async (userId: number, missionId: number) => {
  const [result]: any = await pool.query(
    `INSERT INTO user_mission (user_id, mission_id) VALUES (?, ?)`,
    [userId, missionId]
  );
  return result.insertId;
};