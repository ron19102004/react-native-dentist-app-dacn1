import ColorTheme from "@/common/color.constant";
import { BoxShadow } from "@/common/style.comman";
import { useAuth, useScreen } from "@/src/contexts";
import { UseScreen } from "@/src/hooks/useScreen";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HomeTabNav = () => {
  const { userCurrent } = useAuth();
  const { isMobile } = useScreen();
  const router = useRouter();
  const [paddingTop,setPaddingTop]= useState<number>(0)
  useEffect(()=>{
    if (Platform.OS === "ios") {
      setPaddingTop(50)
    }
  },[])
  return (
    <View
      style={{
        backgroundColor: ColorTheme.White,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 20,
        paddingTop: paddingTop
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
        <MaterialIcons
          name="circle-notifications"
          style={{
            color: ColorTheme.Primary,
            fontSize: 30,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeTabNav;
