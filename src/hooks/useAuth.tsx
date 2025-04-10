import { useEffect, useState } from "react";
import { Gender, Role, User } from "../apis/model.d";
import authApi, {
  UserLoginRequest,
  UserRegisterRequest,
} from "../apis/auth.api";
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
}

const _useAuth = (): UseAuth => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userCurrent, setUserCurrent] = useState<User | null>(null);

  const login = async (metadata: UserLoginRequest): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await authApi.userLogin(metadata);
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
      // Cookies.set("token", accessToken);
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
    // Cookies.remove("token");
  };
  const register = async (metadata: UserRegisterRequest): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await authApi.userRegister(metadata);
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
    try {
      setIsLoading(true);
      const token = undefined;
      if (token) {
        setToken(token);
        setIsAuthenticated(true);
      } else {
        const tokenF =
          "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkdW5nMjkiLCJleHAiOjE3NDU1NzgyMTAsImlhdCI6MTc0NDI4MjIxMCwianRpIjoiNDU3ODA2ODgtMThlYy00MTM4LWE3NzUtZDI1NGUwZDU3NWJhIn0.Qhy_vyoZA52s8-617N4d8qJSSocUonrojJKCeunY7wBH6RujTKVdlLJgR6Dvn1-Lh_OWWSSXxzGeoT0qnzrf-8Hu27BxiKA7vdm4aC3h1088eWHopTFhgWxqRBpd3Ezgb-mh3bcCd9O9heiTRTIlQLeddy2lLOAVJXg5N_A4RDjPuDzQL6PC9rPWvXvVzj-PJ0QgiC-AzF2u12FeyPHyQlpwA-EicwoVlZRrD_0T1TO9AEQB5BBF61M_T-BT9ETZRUHXRf_EVnrWk99n3I0FzZlYQGZb1bgWNR0UJvLbWvrokCAWCH2msiYxXKSKeePJyNc4JD7rb015gqUJ08jANg";
        setToken(tokenF);
        setIsAuthenticated(true);
        // Cookies.set("token", tokenF);
      }
      const user: User = {
        id: 0,
        fullName: "TEST",
        email: "TEST",
        phone: "TEST",
        username: "TEST",
        gender: Gender.MALE,
        active: false,
        role: Role.ADMIN,
        otpcode: "TEST",
        otpexpiredAt: "TEST",
        createdAt: "TEST",
        updatedAt: "TEST",
      };
      setUserCurrent(user);
    } catch (error) {
      setIsError(true);
      setErrorMessage("Failed to initialize authentication");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      initializeAuth();
      console.log("Auth initialized");
    }, 2000);
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
  };
};
export default _useAuth;
