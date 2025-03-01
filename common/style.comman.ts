import { TextStyle } from "react-native";
import ColorTheme from "./color.constant";

export interface MarginStyle {
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
  mx?: number;
  my?: number;
}

export interface PaddingStyle {
  pt?: number;
  pb?: number;
  pr?: number;
  pl?: number;
  px?: number;
  py?: number;
}

interface BoxShadowProps {
  color?: ColorTheme;
  shadowRadius?: number;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  radius?: number;
  elevation?: number;
}
export const BoxShadow = ({
  color = ColorTheme.BlackC,
  shadowOffset = { width: 0, height: 4 },
  shadowOpacity = 0.3,
  radius = 10,
  elevation = 8,
}: BoxShadowProps) => {
  return {
    // 🔹 Box shadow cho iOS
    shadowColor: color,
    shadowOffset: shadowOffset, // Độ lệch bóng
    shadowOpacity: shadowOpacity, // Độ mờ bóng
    shadowRadius: radius, // Độ lớn bóng

    // 🔹 Box shadow cho Android
    elevation: elevation, // Giá trị càng lớn thì bóng càng rõ
  };
};
