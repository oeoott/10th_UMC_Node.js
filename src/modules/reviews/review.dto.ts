export interface ReviewResponseDto {
  id: number;
  storeId: number;
  userId: number;
  content: string;
  store?: {
    id: number;
    name: string;
  };
}

export interface GetUserReviewsResponseDto {
  data: ReviewResponseDto[];
  pagination: {
    cursor: number | null;
  };
}
