export interface UserSignUpRequest {
  email: string;
  name: string;
  gender?: string;
  birth?: string;
  address?: string;
  detailAddress?: string;
  phoneNumber?: string;
  preferences?: number[];
}

export interface UserSignUpResponse {
  userId: number;
  email: string;
  name: string;
  preferences: string[];
}
