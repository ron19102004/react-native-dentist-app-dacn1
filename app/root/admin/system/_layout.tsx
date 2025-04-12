import { Stack } from "expo-router";
import React from "react";

const AdminSystemLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen
        name="edit"
        options={{
          headerShown: true,
          title: "🧑‍💼 Chỉnh sửa thông tin hệ thống",
        }}
      />
    </Stack>
  );
};

export default AdminSystemLayout;
