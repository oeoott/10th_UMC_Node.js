import { DuplicateUserEmailError } from "../../../common/errors/error";
import {
  UserSignUpRequest,
  UserSignUpResponse,
} from "../dtos/user.dto";

const registeredEmails = new Set<string>();

export const userSignUp = async (
  data: UserSignUpRequest,
): Promise<UserSignUpResponse> => {
  if (registeredEmails.has(data.email)) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", {
      email: data.email,
    });
  }

  registeredEmails.add(data.email);

  return {
    userId: registeredEmails.size,
    email: data.email,
    name: data.name,
    preferences: (data.preferences ?? []).map(String),
  };
};
