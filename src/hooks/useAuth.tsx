import { useEffect, useState } from "react";
import { Gender, Role, User } from "../apis/model.d";
import authApi, {
  UpdateUserRequest,
  UserLoginRequest,
  UserRegisterRequest,
} from "../apis/auth.api";
import useStorage from "./useStorage";
import { AxiosError } from "axios";

const ACCESS_TOKEN_KEY: string = "token";
export interface UseAuth {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  userCurrent: User | null;

  login(
    metadata: UserLoginRequest,
    success: () => void,
    errors: (error: string) => void
  ): Promise<void>;
  logout(): Promise<void>;
  register(
    metadata: UserRegisterRequest,
    success: () => void,
    errors: (error: string) => void
  ): Promise<void>;
  ifAuthFn<T>(
    fn: (token: string) => Promise<T>,
    errors?: (error: string) => void,
    retries?: number
  ): Promise<T | null>;
  updateInfo(
    metadata: UpdateUserRequest,
    success: () => void,
    errors: (err: string) => void
  ): Promise<void>;
}

const _useAuth = (): UseAuth => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userCurrent, setUserCurrent] = useState<User | null>(null);
  const {
    get: getStorage,
    remove: removeStorage,
    save: saveStorage,
  } = useStorage();

  const ifAuthFn = async <T,>(
    fn: (token: string) => Promise<T>,
    errors?: (error: string) => void,
    retries: number = 3
  ) => {
    try {
      if (isAuthenticated && token) {
        return await fn(token);
      } else {
        if (errors) errors("Require authentication");
      }
    } catch (error) {
      if (retries > 0) {
        console.log("retries: " + retries);
        return await ifAuthFn(fn, errors, retries - 1);
      }
      if (error instanceof AxiosError) {
        alert(error);
      }
    }
    return null;
  };

  const login = async (
    metadata: UserLoginRequest,
    success: () => void,
    errors: (error: string) => void
  ): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await authApi.userLogin(metadata);
      if (response.code !== 200) {
        setIsError(true);
        setErrorMessage(response.message);
        setIsLoading(false);
        errors(response.message);
        return;
      }
      const { accessToken, user } = response.data!;
      setToken(accessToken);
      setIsAuthenticated(true);
      setUserCurrent(user);
      success();
      await saveStorage(ACCESS_TOKEN_KEY, accessToken);
    } catch (error) {
      setIsError(true);
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          setErrorMessage("Mật khẩu không chính xác");
          errors("Mật khẩu không chính xác");
        } else {
          setErrorMessage("Login fail");
          errors("Login fail");
        }
      } else {
        setErrorMessage("Login fail");
        errors("Login fail");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async () => {
    setToken(null);
    setIsAuthenticated(false);
    setUserCurrent(null);
    await removeStorage(ACCESS_TOKEN_KEY);
  };
  const register = async (
    metadata: UserRegisterRequest,
    success: () => void,
    errors: (error: string) => void
  ): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await authApi.userRegister(metadata);
      console.log(response);
      if (response.code !== 200) {
        setIsError(true);
        setErrorMessage(response.message);
        setIsLoading(false);
        errors(response.message);
        return;
      }
      success();
    } catch (error) {
      setIsError(true);
      setErrorMessage("Failed to register");
      errors("Failed to register");
    } finally {
      setIsLoading(false);
    }
  };
  const initializeAuth = async () => {
    console.log("Auth initialized");
    try {
      setIsLoading(true);
      const token = await getStorage(ACCESS_TOKEN_KEY);
      if (token) {
        const getUserInfo = await authApi.getInfoUser(token);
        if (getUserInfo && getUserInfo.code === 200) {
          setIsAuthenticated(true);
          setToken(token);
          setUserCurrent(getUserInfo.data);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage("Failed to initialize authentication");
    } finally {
      setIsLoading(false);
    }
  };
  const updateInfo = async (
    metadata: UpdateUserRequest,
    success: () => void,
    errors: (err: string) => void
  ) => {
    await ifAuthFn<void>(
      async (token) => {
        const res = await authApi.updateInfo(metadata, token);
        if (res.code === 200) {
          initializeAuth();
          success();
          return;
        }
        errors(res.message);
      },
      (error) => {
        errors(error);
      }
    );
  };
  useEffect(() => {
    initializeAuth();
  }, []);
  return {
    token: token,
    isAuthenticated: isAuthenticated,
    isLoading: isLoading,
    isError: isError,
    errorMessage: errorMessage,
    userCurrent: userCurrent,
    login: login,
    logout: logout,
    register: register,
    ifAuthFn: ifAuthFn,
    updateInfo: updateInfo,
  };
};
export default _useAuth;
