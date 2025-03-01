import { Link, useFocusEffect, useRouter } from "expo-router";
import React, { Fragment, useCallback, useContext, useEffect } from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import Images from "@/assets/images";
import { UseScreen } from "@/src/hooks/useScreen";
import { ScreenContext } from "@/src/contexts/screen.context";
import ColorTheme from "@/common/color.constant";
const StartScreen = () => {
  const { width, height, isTablet } = useContext<UseScreen>(ScreenContext);
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.replace("/auth/login");
    }, 3000);
  }, [0]);
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(ColorTheme.White);
      StatusBar.setBarStyle("dark-content"); // Hoặc "light-content" nếu cần
    }, [])
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ColorTheme.White,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar hidden={true} />
      <Image
        source={Images.ToothLogo}
        style={{
          width: width,
          height: height - 400,
          objectFit: "cover",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default StartScreen;
