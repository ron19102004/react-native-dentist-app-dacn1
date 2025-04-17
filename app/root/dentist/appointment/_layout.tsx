import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const DentistAppointmentLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen
        name="process-status"
        options={{
          title: "✅ Xử lý trạng thái hồ sơ",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="process-service"
        options={{
          title: "♨️ Xử lý dịch vụ hồ sơ",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="process-medicine"
        options={{
          title: "♨️ Xử lý thuốc hồ sơ",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="process-treatment"
        options={{
          title: "♨️ Xử lý hồ sơ điều trị",
          headerShown: true,
        }}
      />
       <Stack.Screen
        name="details/[details]"
        options={{
          title: "🗓️ Chi tiết hồ sơ",
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default DentistAppointmentLayout;
