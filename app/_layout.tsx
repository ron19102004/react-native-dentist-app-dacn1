import ColorTheme from "@/common/color.constant";
import ScreenProvider from "@/src/contexts/screen.context";
import { Stack } from "expo-router";
import React from "react";

const AppLayout = () => {
  return (
    <ScreenProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="root" />
        <Stack.Screen name="auth" />
      </Stack>
    </ScreenProvider>
  );
};

export default AppLayout;
