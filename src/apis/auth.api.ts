import { authApi } from "../constants/api.constant";
import { ApiResponse, Gender, User } from "./model";
import axios from "axios";

//Register
export interface UserRegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  username: string;
  gender: Gender;
}
const userRegister = async (
  metadata: UserRegisterRequest
): Promise<ApiResponse<User>> => {
  const response = await axios.post<ApiResponse<User>>(
    authApi("register"),
    metadata,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
};
//Login - Omit trong typescript
// export type UserLoginRequest = Omit<
//   UserRegisterRequest,
//   "fullName" | "phone" | "gender" | "email"
// >;
export interface UserLoginRequest{
  username: string;
  password: string;
}
export interface UserLoginResponse {
  user: User;
  accessToken: string;
}
const userLogin = async (
  metadata: UserLoginRequest
): Promise<ApiResponse<UserLoginResponse>> => {
  const response = await axios.post<ApiResponse<UserLoginResponse>>(
    authApi("register"),
    metadata,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
};
export default {
  userRegister,
  userLogin,
};
