import { createContext, FC, ReactNode } from "react";
import { _useScreen, IUseScreen } from "../hooks/useScreen";

export const ScreenContext = createContext<IUseScreen>({
  width: 0,
  height: 0,
  isMobile: true,
  isTablet: false,
  apply: function (mobile: () => void, tablet: () => void): void {
    throw new Error("Function not implemented.");
  }
});

const ScreenProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ScreenContext.Provider value={_useScreen()}>
      {children}
    </ScreenContext.Provider>
  );
};

export default ScreenProvider;
