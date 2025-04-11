import { createContext, FC, ReactNode, useContext, useEffect } from "react";
import _useAuth, { UseAuth } from "../hooks/useAuth";
import { useRouter } from "expo-router";
import { UserLoginRequest, UserRegisterRequest } from "../apis/auth.api";

export const AuthContext = createContext<UseAuth>({
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  errorMessage: null,
  userCurrent: null,
  login: function (metadata: UserLoginRequest): Promise<void> {
    throw new Error("Function not implemented.");
  },
  logout: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  register: function (metadata: UserRegisterRequest): Promise<void> {
    throw new Error("Function not implemented.");
  },
  ifAuthFn: function <T>(fn: (token: string) => Promise<T>, errors?: (error: string) => void): Promise<T | null> {
    throw new Error("Function not implemented.");
  }
});

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const value = _useAuth();
  const router = useRouter();

  const checkAuthentication = async (): Promise<void> => {
    if (!value.isLoading) {
      if (!value.isAuthenticated) {
        router.replace("/login");
      } else {
        router.replace("/root");
      }
    }
    // router.replace(`/browser/${encodeURIComponent('https://github.com/ron19102004/react-native-dentist-app-dacn1')}`);
  };
  useEffect(() => {
    checkAuthentication();
  }, [value.isAuthenticated]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
