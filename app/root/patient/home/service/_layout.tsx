import ColorTheme from "@/common/color.constant";
import HeaderLeft from "@/components/header-left";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const ServicePatientLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen
        name="all"
        options={{
          headerShown: true,
          title: "♨️ Danh sách dịch vụ",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: ColorTheme.Primary,
            fontWeight: "bold", // (tuỳ chọn)
            fontSize: 20, // (tuỳ chọn)
          },
          headerLeft: HeaderLeft,
        }}
      />
      <Stack.Screen
        name="details/[details]"
        options={{
          headerShown: true,
          title: "♨️ Dịch vụ",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: ColorTheme.Primary,
            fontWeight: "bold", // (tuỳ chọn)
            fontSize: 20, // (tuỳ chọn)
          },
          headerLeft: HeaderLeft,
        }}
      />
    </Stack>
  );
};

export default ServicePatientLayout;
