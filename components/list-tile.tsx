import ColorTheme from "@/common/color.constant";
import { MarginStyle, PaddingStyle } from "@/common/style.comman";
import React, { FC, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface ListTileProps extends PaddingStyle, MarginStyle {
  tileStyle?: ViewStyle;
  leading?: (textColor: ColorTheme) => React.ReactNode;
  suffix?: (textColor: ColorTheme) => React.ReactNode;
  center?: (textColor: ColorTheme) => React.ReactNode;
  radius?: number;
  onPress?: () => Promise<void>;
  bgPressIn?: ColorTheme;
  bgPressOut?: ColorTheme;
  textColorIn?: ColorTheme;
  textColorOut?: ColorTheme;
}
const ListTile: FC<ListTileProps> = ({
  tileStyle = {},
  leading,
  suffix,
  px,
  py,
  mx,
  mt = 10,
  radius = 10,
  center,
  onPress,
  bgPressIn = ColorTheme.Secondary,
  bgPressOut = ColorTheme.WhiteF1,
  textColorIn = ColorTheme.White,
  textColorOut = ColorTheme.Black,
}) => {
  const [bgTile, setBgTile] = useState<ColorTheme>(bgPressOut);
  const [textColor, setTextColor] = useState<ColorTheme>(textColorOut);
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        setBgTile(bgPressIn);
        setTextColor(textColorIn);
      }}
      onPressOut={() => {
        setBgTile(bgPressOut);
        setTextColor(textColorOut);
      }}
    >
      <View
        style={{
          paddingVertical: py ?? 10,
          paddingHorizontal: px ?? 10,
          marginHorizontal: mx ?? 10,
          marginTop: mt,
          borderRadius: radius,
          backgroundColor: bgTile,
          ...styles.Main,
          ...tileStyle,
        }}
      >
        {leading && (
          <View style={{ ...styles.Leading }}>{leading(textColor)}</View>
        )}
        <View style={{ flex: 1 }}>{center && center(textColor)}</View>
        {suffix && (
          <View style={{ ...styles.Suffix }}>{suffix(textColor)}</View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  Main: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Leading: {
    padding: 10,
  },
  Suffix: {
    padding: 10,
  },
});

export default ListTile;
