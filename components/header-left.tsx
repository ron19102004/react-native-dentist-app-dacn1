import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const HeaderLeft = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.back();
      }}
    >
      <Feather name="arrow-left" size={23} />
    </TouchableOpacity>
  );
};

export default HeaderLeft;
