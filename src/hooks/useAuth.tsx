import { useEffect, useState } from "react";
import { Gender, Role, User } from "../apis/model.d";
import authApi, {
  UserLoginRequest,
  UserRegisterRequest,
} from "../apis/auth.api";
import useStorage from "./useStorage";

const ACCESS_TOKEN_KEY: string = "token";
export interface UseAuth {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  userCurrent: User | null;

  login(metadata: UserLoginRequest): Promise<void>;
  logout(): Promise<void>;
  register(metadata: UserRegisterRequest): Promise<void>;
  ifAuthFn<T>(
    fn: (token: string) => Promise<T>,
    errors?: (error: string) => void
  ): Promise<T | null>;
}

const _useAuth = (): UseAuth => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userCurrent, setUserCurrent] = useState<User | null>(null);
  const { get:getStorage, remove:removeStorage, save: saveStorage } = useStorage();

  const ifAuthFn = async <T,>(
    fn: (token: string) => Promise<T>,
    errors?: (error: string) => void
  ) => {
    try {
      if (isAuthenticated && token) {
        return await fn(token);
      } else {
        if (errors) errors("Require authentication");
      }
    } catch (error) {
      if (errors) errors("Request error");
    }
    return null;
  };
  const login = async (metadata: UserLoginRequest): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await authApi.userLogin(metadata);
      console.log(response);
      (response)
      if (response.code !== 200) {
        setIsError(true);
        setErrorMessage(response.message);
        setIsLoading(false);
        return;
      }
      const { accessToken, user } = response.data!;
      setToken(accessToken);
      setIsAuthenticated(true);
      setUserCurrent(user);
      await saveStorage(ACCESS_TOKEN_KEY, accessToken);
    } catch (error) {
      setIsError(true);
      setErrorMessage("Failed to login");
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async () => {
    setToken(null);
    setIsAuthenticated(false);
    setUserCurrent(null);
    await removeStorage(ACCESS_TOKEN_KEY)
  };
  const register = async (metadata: UserRegisterRequest): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await authApi.userRegister(metadata);
      console.log(response);
      if (response.code !== 200) {
        setIsError(true);
        setErrorMessage(response.message);
        setIsLoading(false);
        return;
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage("Failed to register");
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
        if(getUserInfo &&getUserInfo.code === 200){
          setIsAuthenticated(true);
          setToken(token)
          setUserCurrent(getUserInfo.data)
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
  };
};
export default _useAuth;
