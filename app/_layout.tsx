import ColorTheme from "@/common/color.constant";
import ScreenProvider from "@/src/contexts/screen.context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const AppLayout = () => {
  return (
    <ScreenProvider>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "ios_from_right",
              }}
            >
              <Stack.Screen name="index" />
              <Stack.Screen name="root" />
              <Stack.Screen name="auth" />
            </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ScreenProvider>
  );
};

export default AppLayout;
