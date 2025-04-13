import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const DentistLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name="(tab)" />
      <Stack.Screen name="appointment" />
    </Stack>
  );
};

export default DentistLayout;
