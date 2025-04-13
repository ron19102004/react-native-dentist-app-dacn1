import ColorTheme from "@/common/color.constant";
import React, { FC, HTMLAttributes, useState } from "react";
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

interface TextInputCustomProps extends IconMetarialName {
  label?: string;
  props?: TextInputProps;
  onChangeText?: ((text: string) => void) | undefined;
  onChange?:
    | ((e: NativeSyntheticEvent<TextInputChangeEventData>) => void)
    | undefined;
  error?: boolean;
  errorMsg?: string;
  isPassword?: boolean;
  keyboardTypeOptions?: KeyboardTypeOptions;
  value?: string;
}
const TextInputCustom: FC<TextInputCustomProps> = ({
  props,
  label,
  onChangeText,
  error,
  errorMsg,
  icon,
  isPassword = false,
  onChange,
  keyboardTypeOptions = "default",
  value,
}) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [openPwd, setOpenPwd] = useState<boolean>(false);
  return (
    <View style={{ ...styles.ViewWrap }}>
      {label && (
        <Text
          style={{
            ...styles.Label,
            color: isFocus ? ColorTheme.Primary : ColorTheme.Black,
          }}
        >
          {label}
        </Text>
      )}
      <View style={{ position: "relative" }}>
        <MaterialIcons
          name={icon}
          style={{
            fontSize: 20,
            position: "absolute",
            top: 15,
            left: 10,
            color:
              error && error === true
                ? ColorTheme.Red
                : isFocus
                ? ColorTheme.Primary
                : ColorTheme.BlackB,
          }}
        />
        {/* <AntDesign
          //@ts-ignore
          name={"API"}
          style={{
            fontSize: 20,
            position: "absolute",
            top: 15,
            left: 10,
            color:
              error && error === true
                ? ColorTheme.Red
                : isFocus
                ? ColorTheme.Primary
                : ColorTheme.BlackB,
          }}
        /> */}
        <View
          style={{
            position: "absolute",
            height: 22,
            width: 0.5,
            borderWidth: 0.5,
            borderColor:
              error && error === true
                ? ColorTheme.Red
                : isFocus
                ? ColorTheme.Primary
                : ColorTheme.BlackB,
            top: 15,
            left: 35,
          }}
        />
        <TextInput
          value={value}
          keyboardType={keyboardTypeOptions}
          numberOfLines={1}
          onChange={onChange}
          {...props}
          secureTextEntry={
            isPassword && isPassword === true && openPwd === false
          }
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChangeText={onChangeText}
          style={{
            ...styles.TextInput,
            borderColor:
              error && error === true
                ? ColorTheme.Red
                : isFocus
                ? ColorTheme.Primary
                : ColorTheme.BlackB,
            borderWidth: isFocus ? 1.5 : 1,
          }}
        />
        {isPassword === true &&
          (openPwd === true ? (
            <Pressable
              onPress={() => {
                setOpenPwd(false);
              }}
            >
              <Feather
                name="eye"
                style={{
                  fontSize: 20,
                  position: "absolute",
                  top: -35,
                  right: 10,
                  color:
                    error && error === true
                      ? ColorTheme.Red
                      : isFocus
                      ? ColorTheme.Primary
                      : ColorTheme.BlackB,
                }}
              />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                setOpenPwd(true);
              }}
            >
              <Feather
                name="eye-off"
                style={{
                  fontSize: 20,
                  position: "absolute",
                  top: -35,
                  right: 10,
                  color:
                    error && error === true
                      ? ColorTheme.Red
                      : isFocus
                      ? ColorTheme.Primary
                      : ColorTheme.BlackB,
                }}
              />
            </Pressable>
          ))}
      </View>
      {error && error === true && (
        <Text
          style={{
            ...styles.Label,
            color: ColorTheme.Red,
            fontSize: 10,
          }}
        >
          {errorMsg ?? "Error"}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ViewWrap: {
    paddingHorizontal: 15,
  },
  Label: {
    marginBottom: 4,
  },
  TextInput: {
    paddingLeft: 40,
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 15,
    borderRadius: 10,
  },
});

export default TextInputCustom;
