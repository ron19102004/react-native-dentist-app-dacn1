import TextInputCustom from "@/components/input";
import { useScreen } from "@/src/contexts";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ColorTheme from "@/common/color.constant";
import ButtonCustom from "@/components/button";
import StatusBarCustom from "@/components/status-bar";
import useAdmin from "@/src/hooks/useAdmin.hook";
import Toast from "react-native-toast-message";
const schema = yup.object().shape({
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
});
interface FormData {
  email: string;
}
const LockAccount = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const { lockAccount } = useAdmin();
  const onSubmit = useCallback(async (data: FormData) => {
    await lockAccount(
      data.email,
      () => {
        Toast.show({
          type: "success", // 'success' | 'error' | 'info'
          text1: "Thông báo",
          text2: "Khóa thành công",
        });
        router.back();
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
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Khóa tài khoản</Text>
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
      <ButtonCustom title="Khóa" onPress={handleSubmit(onSubmit)} mt={20} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorTheme.White,
    paddingTop: 20
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
export default LockAccount;
