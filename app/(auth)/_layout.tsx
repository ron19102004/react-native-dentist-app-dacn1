import ColorTheme from "@/common/color.constant";
import { AuthScreen } from "@/common/screen.constant";
import { Stack } from "expo-router";
import React, { Fragment } from "react";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={AuthScreen.Login}
    >
      <Stack.Screen name={AuthScreen.Login} />
      <Stack.Screen name={AuthScreen.Register} />
    </Stack>
  );
};
export default AuthLayout;
