import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const ProfileLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name="details-profile" />
    </Stack>
  );
};

const styles = StyleSheet.create({});

export default ProfileLayout;
