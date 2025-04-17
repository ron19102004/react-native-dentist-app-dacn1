import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const StaffAppointmentLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen
        name="confirm-invoice"
        options={{
          title: "✅ Xác nhận thanh toán",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="create-invoice"
        options={{
          title: "♨️ Tạo hóa đơn",
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default StaffAppointmentLayout;
