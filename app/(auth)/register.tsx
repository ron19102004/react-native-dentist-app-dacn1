import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ColorTheme from "@/common/color.constant";
import TextInputCustom from "@/components/input";
import ButtonCustom from "@/components/button";
import { Link, useRouter } from "expo-router";
import { SocialAuthType, UserRegisterRequest } from "@/src/apis/auth.api";
import StatusBarCustom from "@/components/status-bar";
import { useAuth, useScreen } from "@/src/contexts";
import { Gender, textToGender } from "@/src/apis/model.d";
import Toast from "react-native-toast-message";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const schema = yup.object().shape({
  fullName: yup.string().required("Họ và tên là bắt buộc"),
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  username: yup.string().required("Tên tài khoản là bắt buộc"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .required("Mật khẩu là bắt buộc"),
  phone: yup.string().required("Số điện thoại là bắt buộc"),
});

type FormData = Omit<UserRegisterRequest, "gender">;
const RegisterScreen = () => {
  const router = useRouter();
  const { width, isTablet } = useScreen();
  const {
    register: registerUser,
    isAuthenticated,
    isLoading,
    oauth2Callback,
  } = useAuth();
  const [genderError, setGenderError] = useState<string | null>(null);
  const [genderText, setGenderText] = useState<string>("");
  const genderRef = useRef<string | null>(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(async (data: FormData) => {
    if (!genderRef.current) {
      setGenderError("Giới tính là cần thiết");
      return;
    }
    if (!["male", "female"].includes(genderRef?.current.toLowerCase())) {
      setGenderError("Giới tính phải là male hoặc female");
      return;
    }

    await registerUser(
      {
        ...data,
        gender: textToGender(genderRef.current),
      },
      () => {
        Toast.show({
          type: "success", // 'success' | 'error' | 'info'
          text1: "Thông báo",
          text2: "Đăng ký thành công",
        });
        router.replace("/login");
      },
      (err) => {
        Toast.show({
          type: "error", // 'success' | 'error' | 'info'
          text1: "Lỗi",
          text2: err,
        });
      }
    );
    setGenderText("");
    setGenderError(null);
  }, []);

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.replace("/root");
    }
  }, [isAuthenticated, isLoading]);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices(); // Kiểm tra xem Google Play
      const info = await GoogleSignin.signIn();
      await oauth2Callback(
        info.data?.idToken || "",
        SocialAuthType.GOOGLE,
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
    } catch (err) {
      Toast.show({
        type: "error", // 'success' | 'error' | 'info'
        text1: "Lỗi",
        text2: "Lỗi xác thực bằng google",
      });
    }
  };
  return (
    <ScrollView style={styles.container}>
      <StatusBarCustom bg={ColorTheme.White} style="dark-content" />
      <View style={[styles.form, { paddingHorizontal: isTablet ? 100 : 20 }]}>
        <Text style={styles.title}>Đăng ký</Text>

        <Controller
          name="fullName"
          control={control}
          render={({ field: { onChange } }) => (
            <TextInputCustom
              label="Họ và tên"
              onChangeText={onChange}
              icon="person"
              error={!!errors.fullName}
              errorMsg={errors.fullName?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field: { onChange } }) => (
            <TextInputCustom
              label="Email"
              keyboardTypeOptions="email-address"
              onChangeText={onChange}
              icon="mail"
              error={!!errors.email}
              errorMsg={errors.email?.message}
            />
          )}
        />

        <Controller
          name="username"
          control={control}
          render={({ field: { onChange } }) => (
            <TextInputCustom
              label="Tên đăng nhập"
              onChangeText={onChange}
              icon="person"
              error={!!errors.username}
              errorMsg={errors.username?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange } }) => (
            <TextInputCustom
              label="Mật khẩu"
              onChangeText={onChange}
              icon="lock"
              isPassword
              error={!!errors.password}
              errorMsg={errors.password?.message}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field: { onChange } }) => (
            <TextInputCustom
              label="Số điện thoại"
              onChangeText={onChange}
              icon="phone"
              keyboardTypeOptions="phone-pad"
              error={!!errors.phone}
              errorMsg={errors.phone?.message}
            />
          )}
        />

        <TextInputCustom
          label="Giới tính (Male/Female)"
          onChangeText={(text) => {
            setGenderText(text);
            genderRef.current = text;
          }}
          icon="carpenter"
          error={genderError !== null}
          errorMsg={genderError ? genderError : "Lỗi giới tính"}
        />
        <ButtonCustom
          title="Đăng ký"
          onPress={handleSubmit(onSubmit)}
          mt={20}
        />
        <ButtonCustom
          mt={20}
          color={ColorTheme.Red}
          title="Đăng ký với Google"
          onPress={async () => {
            await signIn();
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ marginRight: 5 }}>Bạn đã có tài khoản?</Text>
          <Link
            href={"/login"}
            style={{
              color: ColorTheme.Primary,
              fontWeight: "600",
            }}
          >
            Đăng nhập ngay
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorTheme.White,
  },
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 20,
    textAlign: "left",
    paddingHorizontal: 15,
  },
});

export default RegisterScreen;
