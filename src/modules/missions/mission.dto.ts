export interface MissionResponseDto {
  id: number;
  storeId: number;
  store?: {
    id: number;
    name: string;
  };
}

export interface GetStoreMissionsResponseDto {
  data: MissionResponseDto[];
  pagination: {
    cursor: number | null;
  };
}
