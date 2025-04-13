import ColorTheme from "@/common/color.constant";
import ButtonCustom from "@/components/button";
import TextInputCustom from "@/components/input";
import React, { useCallback, useContext, useEffect } from "react";
import {
  ActivityIndicator,
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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import StatusBarCustom from "@/components/status-bar";
import { useAuth, useScreen } from "@/src/contexts";
import { UserLoginRequest } from "@/src/apis/auth.api";
import Toast from "react-native-toast-message";

const schema = yup.object().shape({
  username: yup.string().required("Tên tài khoản là bắt buộc"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .required("Mật khẩu là bắt buộc"),
});
const LoginScreen = () => {
  const router = useRouter();
  const { width, height, isTablet } = useScreen();
  const { login, isAuthenticated, isLoading } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserLoginRequest>({ resolver: yupResolver(schema) });
  const submit = useCallback(async (data: UserLoginRequest) => {
    await login(
      data,
      () => {
        Toast.show({
          type: "success", // 'success' | 'error' | 'info'
          text1: "Thông báo",
          text2: "Đăng nhập thành công",
        });
      },
      (err) => {
        Toast.show({
          type: "error", // 'success' | 'error' | 'info'
          text1: "Lỗi",
          text2: err,
        });
      }
    );
  }, []);
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.navigate("/root");
    }
  }, [isAuthenticated, isLoading]);
  return (
    <View style={styles.Main}>
      <StatusBarCustom bg={ColorTheme.White} style="dark-content" />
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
                  icon="person"
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
            title={isLoading ? "Đang sử lý..." : "Đăng nhập"}
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
              href={"/register"}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorTheme.WhiteF1,
  },
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
