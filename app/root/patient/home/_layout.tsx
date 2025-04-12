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
      <Stack.Screen name="logs" />
      <Stack.Screen name="expertise" />
      <Stack.Screen name="service" />
    </Stack>
  );
};

export default PatientHomeLayout;
