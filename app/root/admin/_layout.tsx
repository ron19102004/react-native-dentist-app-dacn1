import { Stack, Tabs } from "expo-router";
import React from "react";

const AdminLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name="(tab)" />
      <Stack.Screen name="system" />
      <Stack.Screen name="account" />
    </Stack>
  );
};

export default AdminLayout;
