import AuthProvider from "@/src/contexts/auth.context";
import NotificationProvider, {
  NotificationContext,
} from "@/src/contexts/notification.context";
import ScreenProvider from "@/src/contexts/screen.context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastProps,
} from "react-native-toast-message";

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
              <Toast autoHide config={toastConfig} />
            </NotificationProvider>
          </AuthProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ScreenProvider>
  );
};

export const toastConfig = {
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#4CAF50", minHeight: 80 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontWeight: "bold", fontSize: 16 }}
      text2Style={{
        flexWrap: "wrap",
        fontSize: 14,
        color: "#333",
      }}
      text2NumberOfLines={10}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "#F44336", minHeight: 80 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontWeight: "bold", fontSize: 16 }}
      text2Style={{
        flexWrap: "wrap",
        fontSize: 14,
        color: "#333",
      }}
      text2NumberOfLines={10}
    />
  ),
  info: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#2196F3", minHeight: 80 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontWeight: "bold", fontSize: 16 }}
      text2Style={{
        flexWrap: "wrap",
        fontSize: 14,
        color: "#333",
      }}
      text2NumberOfLines={10}
    />
  ),
  default: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#607D8B", minHeight: 80 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontWeight: "bold", fontSize: 16 }}
      text2Style={{
        flexWrap: "wrap",
        fontSize: 14,
        color: "#333",
      }}
      text2NumberOfLines={10}
    />
  ),
};

export default AppLayout;
