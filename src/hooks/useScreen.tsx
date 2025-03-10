import { useContext, useEffect, useState } from "react";
import { Dimensions, PixelRatio, ScaledSize } from "react-native";
import { ScreenContext } from "../contexts/screen.context";

export interface UseScreen {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  apply: (mobile: () => void, tablet: () => void) => void;
}
const _useScreen = (): UseScreen => {
  const [screenSize, setScreenSize] = useState<ScaledSize>(
    Dimensions.get("window")
  );
  useEffect(() => {
    const updateSize = () => setScreenSize(Dimensions.get("window"));
    const subscription = Dimensions.addEventListener("change", updateSize);
    return () => subscription?.remove();
  }, []);
  const apply = (mobile: () => void, tablet: () => void) => {
    if (Math.min(screenSize.width, screenSize.height) < 600) {
      mobile();
      return;
    }
    tablet();
  };
  return {
    width: screenSize.width,
    height: screenSize.height,
    isMobile: Math.min(screenSize.width, screenSize.height) < 600,
    isTablet: Math.min(screenSize.width, screenSize.height) >= 600,
    apply: apply,
  };
};

export default _useScreen