import { googleCredi } from "@/src/constants/google.constant";
import AuthProvider from "@/src/contexts/auth.context";
import NotificationProvider, {
  NotificationContext,
} from "@/src/contexts/notification.context";
import ScreenProvider from "@/src/contexts/screen.context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Stack } from "expo-router";
import React, { Fragment, useEffect } from "react";
import { Platform, UIManager } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastProps,
} from "react-native-toast-message";

// Cho phép animation mượt trên Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}
const AppLayout = () => {
  useEffect(() => {
    // Cấu hình Google Sign-In khi component được mount
    GoogleSignin.configure({
      webClientId: googleCredi.webClientId, // Lấy từ Google Cloud Console (Web)
      iosClientId: googleCredi.iosClientId, // Lấy từ Google Cloud Console (iOS)
      scopes: googleCredi.scopes,
    });
  }, []);
  return (
    <Fragment>
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
      <Toast autoHide config={toastConfig} />
    </Fragment>
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
      text2NumberOfLines={50}
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
      text2NumberOfLines={50}
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
      text2NumberOfLines={50}
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
      text2NumberOfLines={50}
    />
  ),
};

export default AppLayout;
