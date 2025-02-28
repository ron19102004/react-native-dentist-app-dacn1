import ColorTheme from "@/common/color.constant";
import ButtonCustom from "@/components/button";
import TextInputCustom from "@/components/input";
import useScreen from "@/src/hooks/useScreen";
import React, { useEffect } from "react";
import { StyleSheet, Text, TextInputBase, View } from "react-native";
const LoginScreen = () => {
  const { isMobile, isTablet } = useScreen();
  useEffect(() => {}, [0]);
  return (
    <View style={styles.Main}>
      <View style={styles.Form}>
        <Text style={styles.Title}>Đăng nhập</Text>
        <TextInputCustom
          label="Tên đăng nhập"
          onChangeText={(value) => {}}
          icon="user"
        />
        <TextInputCustom
          label="Mật khẩu"
          onChangeText={(value) => {}}
          icon="lock"
          isPassword={true}
        />
        <ButtonCustom title='Đăng nhập' onPress={()=>{}} mt={15}/>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: ColorTheme.White,
  },
  Form:{
    marginBottom: 20
  },
  Title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: 15,
  },
});

export default LoginScreen;
