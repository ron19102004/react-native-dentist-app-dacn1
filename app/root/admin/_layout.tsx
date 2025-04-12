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
    </Stack>
  );
};

export default AdminLayout;
