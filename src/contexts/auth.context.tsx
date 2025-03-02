import { createContext, FC, ReactNode, useContext, useEffect } from "react";
import _useAuth, { UseAuth } from "../hooks/useAuth";
import { useRouter } from "expo-router";

export const AuthContext = createContext<UseAuth>({
  isAuthenticated: false,
  userCurrent: null,
  login: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  logout: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
});

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const value = _useAuth();
  const router = useRouter();

  const checkAuthentication = async (): Promise<void> => {
    if (!value.isAuthenticated) {
      router.replace("/auth/login");
    } else {
      router.replace("/root");
    }
    // router.replace(`/browser/${encodeURIComponent('https://github.com/ron19102004/react-native-dentist-app-dacn1')}`);
  };
  useEffect(() => {
    checkAuthentication().then();
  }, [value.isAuthenticated]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
