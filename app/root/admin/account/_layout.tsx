import { Stack } from "expo-router";
import React from "react";

const AdminAccountLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="lock-acc"
        options={{
          title: "Khóa tài khoản",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="unlock-acc"
        options={{
          title: "Mở khóa tài khoản",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="edit-admin"
        options={{
          title: "Chỉnh thông tin bác sĩ",
          headerShown: true,
        }}
      />
       <Stack.Screen
        name="edit-staff"
        options={{
          title: "Chỉnh thông tin nhân viên",
          headerShown: true,
        }}
      />
       <Stack.Screen
        name="update-role"
        options={{
          title: "Cập nhật vai trò tài khoản",
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default AdminAccountLayout;
