import { Stack } from "expo-router";
import React from "react";

const PatientLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen name="resume" />
    </Stack>
  );
};

export default PatientLayout;
