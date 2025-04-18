import { createContext, FC, ReactNode, useContext } from "react";
import _useScreen, { UseScreen } from "../hooks/useScreen";

export const ScreenContext = createContext<UseScreen>({
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

 