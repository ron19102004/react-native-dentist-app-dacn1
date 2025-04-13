import ColorTheme from "@/common/color.constant";
import HeaderLeft from "@/components/header-left";
import { Stack } from "expo-router";
import React from "react";

const PatientHomeLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen
        name="logs"
        options={{
          headerShown: true,
          title: "📄 Nhật ký hoạt động - 🔔 Thông báo",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: ColorTheme.Primary,
            fontWeight: "bold", // (tuỳ chọn)
            fontSize: 20, // (tuỳ chọn)
          },
          headerLeft: HeaderLeft,
        }}
      />
      <Stack.Screen name="expertise" />
      <Stack.Screen name="service" />
    </Stack>
  );
};

export default PatientHomeLayout;
