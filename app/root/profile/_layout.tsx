import ColorTheme from "@/common/color.constant";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const ProfileLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen
        name="details-profile"
        options={{
          headerShown: true,
          title: "🧑‍💼 Thông tin cá nhân",
          headerTitleAlign: "left", // ✅ Căn giữa tiêu đề
          headerTitleStyle: {
            color: ColorTheme.Primary,
            fontWeight: "bold", // (tuỳ chọn)
            fontSize: 20, // (tuỳ chọn)
          },
        }}
      />
      <Stack.Screen
        name="edit-profile"
        options={{
          headerShown: true,
          title: "🧑‍💼 Chỉnh sửa thông tin cá nhân",
          headerTitleStyle: {
            color: ColorTheme.Primary,
            fontWeight: "bold", // (tuỳ chọn)
            fontSize: 20, // (tuỳ chọn)
          },
        }}
      />
      <Stack.Screen
        name="system-info"
        options={{
          headerShown: true,
          title: "🧰 Thông tin hệ thống",
          headerTitleAlign:"center",
          headerTitleStyle: {
            color: ColorTheme.Primary,
            fontWeight: "bold", // (tuỳ chọn)
            fontSize: 20, // (tuỳ chọn)
          },
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({});

export default ProfileLayout;
