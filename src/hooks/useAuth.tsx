import { useEffect, useState } from "react";
import { Gender, Role, User } from "../apis/model.d";
import authApi, {
  SocialAuthType,
  UpdateUserRequest,
  UserLoginRequest,
  UserRegisterRequest,
} from "../apis/auth.api";
import useStorage from "./useStorage";
import { AxiosError } from "axios";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import ReactNativeBiometrics from "react-native-biometrics";
import Toast from "react-native-toast-message";
import { BackHandler, Platform } from "react-native";

const FRINGER_PRINT_REQUIRE: string = "fringerprint_status";
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
  oauth2Callback(
    token: string,
    type: SocialAuthType,
    success: () => void,
    errors: (error: string) => void
  ): Promise<void>;
  fingerprintAuth(
    success: () => void,
    errors: (error: string) => void
  ): Promise<void>;
  updateFingerprintAuthStatus(status: boolean): Promise<void>;
  statusFringerprint: boolean;
}

const _useAuth = (): UseAuth => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [statusFringerprint, setStatusFringerprint] = useState<boolean>(false);
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
      if (error instanceof AxiosError) {
        if (retries > 0) {
          console.log("retries: " + retries);
          return await ifAuthFn(fn, errors, retries - 1);
        }
      }
    }
    return null;
  };
  const oauth2Callback = async (
    token: string,
    type: SocialAuthType,
    success: () => void,
    errors: (error: string) => void
  ) => {
    try {
      setIsLoading(true);
      const response = await authApi.oauth2Callback(token, type);
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
    await updateFingerprintAuthStatus(false);
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
  const checkLoggedInGoogle = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    if (!currentUser) {
      setIsError(true);
      setErrorMessage("Failed to initialize authentication");
      setIsLoading(false);
      return;
    }
    await oauth2Callback(
      currentUser?.idToken || "",
      SocialAuthType.GOOGLE,
      () => {
        setIsLoading(false);
      },
      (err) => {
        setIsError(true);
        setErrorMessage(err);
        setIsLoading(false);
      }
    );
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
          loadInitializer();
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

  const loadInitializer = async () => {
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
        await checkLoggedInGoogle();
      }
    } catch (error) {
      await checkLoggedInGoogle();
    } finally {
      setIsLoading(false);
    }
  };
  const fingerprintAuth = async (
    success: () => void,
    errors: (error: string) => void
  ) => {
    const rnBiometrics = new ReactNativeBiometrics();
    const { available, biometryType } = await rnBiometrics.isSensorAvailable();
    if (!available) {
      Toast.show({
        type: "error", // 'success' | 'error' | 'info'
        text1: "Lỗi",
        text2: "Thiết bị không hỗ trợ vân tay hoặc đã tắt",
      });
      return;
    }
    const { success: rnBiometricsSuccess } = await rnBiometrics.simplePrompt({
      promptMessage: "Xác thực bằng vân tay",
    });
    if (rnBiometricsSuccess) {
      success();
    } else {
      errors("Xác thực thất bại");
    }
  };
  const updateFingerprintAuthStatus = async (status: boolean) => {
    try {
      setStatusFringerprint(status);
      if (status) await saveStorage(FRINGER_PRINT_REQUIRE, "1");
      else await saveStorage(FRINGER_PRINT_REQUIRE, "0");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const initializeAuth = async () => {
      console.log("Auth initialized");
      try {
        const fringerprintStatus = await getStorage(FRINGER_PRINT_REQUIRE);
        const stt = fringerprintStatus === "1";
        setStatusFringerprint(stt);

        if (stt) {
          setTimeout(() => {
            fingerprintAuth(
              async () => {
                await loadInitializer();
              },
              (err) => {
                if (Platform.OS === "android") {
                  BackHandler.exitApp();
                }
              }
            );
          }, 800);
        } else {
          await updateFingerprintAuthStatus(false);
          await loadInitializer();
        }
      } catch (error) {
        console.log(error);
      }
    };

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
    oauth2Callback: oauth2Callback,
    fingerprintAuth: fingerprintAuth,
    updateFingerprintAuthStatus: updateFingerprintAuthStatus,
    statusFringerprint: statusFringerprint,
  };
};
export default _useAuth;
