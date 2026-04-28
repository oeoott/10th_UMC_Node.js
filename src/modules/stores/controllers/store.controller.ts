import { Request, Response } from "express";
import * as storeService from "../services/store.service";
import { AddStoreRequest } from "../dtos/store.dto";

// export 붙어야 함
export const handleAddStore = async (req: Request, res: Response) => {
  const result = await storeService.createStore(
    req.body as AddStoreRequest
  );

  res.json({
    result,
  });
};

export const handleAddReview = async (req: Request, res: Response) => {
  const storeId = Number(req.params.storeId);

  const result = await storeService.createReview(
    storeId,
    req.body
  );

  res.json({
    result,
  });
};