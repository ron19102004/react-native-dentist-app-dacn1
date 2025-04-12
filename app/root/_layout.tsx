import ColorTheme from "@/common/color.constant";
import ScreenProvider from "@/src/contexts/screen.context";
import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <ScreenProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "ios_from_right",
          animationDuration: 2000
        }}
      >
        <Stack.Screen name="(tab)" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="patient" />
        <Stack.Screen name="admin" />
      </Stack>
    </ScreenProvider>
  );
};

export default RootLayout;
