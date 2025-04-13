import ColorTheme from "@/common/color.constant";
import { BoxShadow } from "@/common/style.comman";
import { useAuth, useScreen } from "@/src/contexts";
import { UseScreen } from "@/src/hooks/useScreen";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HomeTabNav = () => {
  const { userCurrent } = useAuth();
  const { isMobile } = useScreen();
  const router = useRouter();
  return (
    <View
      style={{
        backgroundColor: ColorTheme.White,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}
    >
      <View style={{}}>
        <Text
          style={{
            fontSize: isMobile ? 20 : 30,
            fontWeight: "bold",
            color: ColorTheme.Primary,
          }}
        >
          Xin chào {userCurrent?.fullName}
        </Text>
        <Text style={{ color: ColorTheme.Black, fontStyle: "italic" }}>
          Điểm tích lũy: 10 điểm
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          router.navigate("/root/patient/home/logs");
        }}
      >
        <AntDesign
          name="notification"
          style={{
            color: ColorTheme.Black,
            fontSize: 20,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeTabNav;
