import ColorTheme from "@/common/color.constant";
import ButtonCustom from "@/components/button";
import TextInputCustom from "@/components/input";
import React, { useCallback, useContext, useEffect } from "react";
import {
  Image,
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Images from "@/assets/images";
import { Link, useFocusEffect, useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { ScreenContext } from "@/src/contexts/screen.context";
import { UseScreen } from "@/src/hooks/useScreen";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface LoginRequestParam {
  username: string;
  password: string;
}
const schema = yup.object().shape({
  username: yup.string().required("Tên tài khoản là bắt buộc"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .required("Mật khẩu là bắt buộc"),
});
const LoginScreen = () => {
  const router = useRouter();
  const { width, height, isTablet } = useContext<UseScreen>(ScreenContext);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginRequestParam>({ resolver: yupResolver(schema) });
  const submit = async (data: LoginRequestParam) => {
    console.log(data);
    router.replace("/root");
  };
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(ColorTheme.White);
      StatusBar.setBarStyle("dark-content"); // Hoặc "light-content" nếu cần
    }, [])
  );
  return (
    <View style={styles.Main}>
      <View style={styles.Form}>
        <Image
          source={Images.LovePikDentist}
          style={{
            width: width,
            height: height - 300,
            objectFit: "cover",
          }}
        />
        <View style={{ paddingHorizontal: isTablet ? 100 : 0 }}>
          <Text style={styles.Title}>Đăng nhập</Text>
          <Controller
            name="username"
            control={control}
            render={({ field: { onChange } }) => {
              return (
                <TextInputCustom
                  label="Tên đăng nhập"
                  onChangeText={onChange}
                  icon="user"
                  error={errors.username !== undefined}
                  errorMsg={errors.username?.message}
                />
              );
            }}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange } }) => {
              return (
                <TextInputCustom
                  label="Mật khẩu"
                  onChangeText={onChange}
                  icon="lock"
                  isPassword={true}
                  error={errors.password !== undefined}
                  errorMsg={errors.password?.message}
                />
              );
            }}
          />
          <ButtonCustom
            title="Đăng nhập"
            onPress={handleSubmit(submit)}
            mt={15}
            mb={15}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ marginRight: 5 }}>Bạn chưa có tài khoản?</Text>
            <Link
              href={"/auth/register"}
              style={{
                color: ColorTheme.Primary,
                fontWeight: "600",
              }}
            >
              Đăng ký ngay
            </Link>
          </View>
        </View>
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
  Form: {
    marginBottom: 20,
  },
  Title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: 15,
  },
});

export default LoginScreen;
