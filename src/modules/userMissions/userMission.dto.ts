export interface UserMissionResponseDto {
  id: number;
  userId: number;
  missionId: number;
  status: string;
  mission?: {
    id: number;
    storeId: number;
    store?: {
      id: number;
      name: string;
    };
  };
}

export interface GetOngoingUserMissionsResponseDto {
  data: UserMissionResponseDto[];
  pagination: {
    cursor: number | null;
  };
}

export interface CompleteUserMissionResponseDto {
  id: number;
  userId: number;
  missionId: number;
  status: string;
  mission?: {
    id: number;
    storeId: number;
    store?: {
      id: number;
      name: string;
    };
  };
}
