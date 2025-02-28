import ColorTheme from "@/common/color.constant";
import React, { FC, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

interface ButtonCustomProps {
  title: string;
  color?: ColorTheme;
  textColor?: ColorTheme;
  fontSize?: number;
  bgFocus?: ColorTheme;
  onPress?: () => void;
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
  mx?: number;
  my?: number;
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
}) => {
  const [isFocus, setFocus] = useState<boolean>(false);
  return (
    <Pressable
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
