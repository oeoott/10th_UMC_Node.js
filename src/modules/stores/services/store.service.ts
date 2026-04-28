import * as storeRepository from "../repositories/store.repository";

export const createReview = async (storeId: number, data: any) => {
  const store = await storeRepository.getStore(storeId);

  // 🔥 핵심 검증
  if (!store) {
    throw new Error("가게가 존재하지 않습니다.");
  }

  const reviewId = await storeRepository.addReview(storeId, data);

  return {
    reviewId,
    storeId,
    content: data.content,
    rating: data.rating,
  };
};