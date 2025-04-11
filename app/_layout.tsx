import AuthProvider from "@/src/contexts/auth.context";
import NotificationProvider, {
  NotificationContext,
} from "@/src/contexts/notification.context";
import ScreenProvider from "@/src/contexts/screen.context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const AppLayout = () => {
  return (
    <ScreenProvider>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <AuthProvider>
            <NotificationProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                  animation: "ios_from_right",
                }}
              >
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="index" />
                <Stack.Screen name="root" />
                <Stack.Screen name="browser/[url]" />
              </Stack>
            </NotificationProvider>
          </AuthProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ScreenProvider>
  );
};

export default AppLayout;
