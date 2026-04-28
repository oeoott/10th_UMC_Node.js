import { pool } from "../../../db.config.js";

export const getStore = async (storeId: number) => {
  const [rows]: any = await pool.query(
    `SELECT * FROM store WHERE id = ?`,
    [storeId]
  );

  return rows[0];
};

export const addReview = async (storeId: number, data: any) => {
  const [result]: any = await pool.query(
    `INSERT INTO review (store_id, content, rating) VALUES (?, ?, ?)`,
    [storeId, data.content, data.rating]
  );

  return result.insertId;
};