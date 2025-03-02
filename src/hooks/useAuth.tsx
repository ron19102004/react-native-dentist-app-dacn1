import { useEffect, useState } from "react";
import { User } from "../apis/model";
import { ToastAndroid } from "react-native";
import { LoginRequestParam } from "../apis/auth.api";

export interface UseAuth {
  isAuthenticated: boolean;
  userCurrent: User | null;
  login(param: LoginRequestParam): Promise<void>;
  logout(): Promise<void>;
}

const _useAuth = (): UseAuth => {
  const [_isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [_userCurrent, setUserService] = useState<User | null>(null);
  const _login = async (param: LoginRequestParam): Promise<void> => {
    setIsAuthenticated(true);
    setUserService({ name: param.username, uid: 12345 });
  };
  const _logout = async (): Promise<void> => {
    setIsAuthenticated(false);
    ToastAndroid.show("Đã đăng xuất", ToastAndroid.LONG);
  };

  const checkAuthentication = async (): Promise<void> => {
    // setIsAuthenticated(true);
    // setUserService({ name: "Trần Ngọc Anh Dũng", uid: 123435 });
  };
  useEffect(() => {
    checkAuthentication()
      .then()
      .catch((e) => {});
  }, [0]);
  return {
    isAuthenticated: _isAuthenticated,
    userCurrent: _userCurrent,
    login: _login,
    logout: _logout,
  };
};
export default _useAuth;
