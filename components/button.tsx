import ColorTheme from "@/common/color.constant";
import { MarginStyle } from "@/common/style.comman";
import React, { FC, useState } from "react";
import { Button, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

interface ButtonCustomProps extends MarginStyle {
  title: string;
  color?: ColorTheme | string;
  textColor?: ColorTheme;
  fontSize?: number;
  bgFocus?: ColorTheme;
  onPress?: () => Promise<void>;
  disabled?: boolean;
  style?:StyleProp<ViewStyle>,
  flex?: number
}
const ButtonCustom: FC<ButtonCustomProps> = ({
  title,
  color = ColorTheme.Primary,
  textColor = ColorTheme.White,
  fontSize = 15,
  bgFocus = ColorTheme.Secondary,
  onPress,
  mb,
  ml,
  mr,
  mt,
  mx,
  my,
  disabled,
  style,
  flex
}) => {
  const [isFocus, setFocus] = useState<boolean>(false);
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      onTouchStart={() => setFocus(true)}
      onTouchEnd={() => setFocus(false)}
      style={{
        ...styles.Pressable,
        backgroundColor: isFocus ? bgFocus : color,
        marginBottom: mb,
        marginLeft: ml,
        marginVertical: my,
        marginHorizontal: mx ?? 15,
        marginRight: mr,
        marginTop: mt,
        flex: flex
      }}
    >
      <Text style={{ ...styles.Title, color: textColor, fontSize: fontSize }}>
        {title.toUpperCase()}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  Pressable: {
    paddingVertical: 15,
    borderRadius: 10,
  },
  Title: {
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ButtonCustom;
