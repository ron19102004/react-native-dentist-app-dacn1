import ApiError from "../errors/api.error";
import { User } from "./model";

export interface LoginRequestParam {
  username: string;
  password: string;
}
const login = async (param: LoginRequestParam): Promise<User | ApiError> => {
  return {
    name: "Trần Ngọc Anh Dũng",
    uid: 12345,
  };
};

export default {
  login,
};
