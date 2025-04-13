import ColorTheme from "@/common/color.constant";
import HeaderLeft from "@/components/header-left";
import { Stack } from "expo-router";
import React from "react";

const AppointmentPatientLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen
        name="booking"
        options={{
          headerShown: true,
          title: "📅 Đặt hẹn",
          headerTitleAlign:"center",
          headerTitleStyle: {
            color: ColorTheme.Primary,
            fontWeight: "bold", // (tuỳ chọn)
            fontSize: 20, // (tuỳ chọn)
          },
          headerLeft: HeaderLeft
        }}
      />
       <Stack.Screen
        name="details/[details]"
        options={{
          headerShown: true,
          title: "📅 Chi tiết lịch hẹn",
          headerTitleAlign:"center",
          headerTitleStyle: {
            color: ColorTheme.Primary,
            fontWeight: "bold", // (tuỳ chọn)
            fontSize: 20, // (tuỳ chọn)
          },
          headerLeft: HeaderLeft
        }}
      />
    </Stack>
  );
};

export default AppointmentPatientLayout;
