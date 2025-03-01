import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TextInputCustom from "../input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import ButtonCustom from "../button";

interface ChangePasswordParam {
  passwordOld: string;
  passwordNew: string;
}
const schema = yup.object().shape({
  passwordOld: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .required("Mật khẩu là bắt buộc"),
  passwordNew: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .required("Mật khẩu là bắt buộc"),
});
const ChangePassword = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ChangePasswordParam>({ resolver: yupResolver(schema) });
  const submit = async (data: ChangePasswordParam) => {
    console.log(data);
  };
  return (
    <View>
      <Text style={styles.Title}>Đổi mật khẩu</Text>
      <View>
        <Controller
          control={control}
          name="passwordOld"
          render={({ field: { onChange } }) => {
            return (
              <TextInputCustom
                icon="lock"
                label="Mật khẩu cũ"
                onChangeText={onChange}
                isPassword={true}
                error={errors.passwordOld !== undefined}
                errorMsg={errors.passwordOld?.message}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="passwordNew"
          render={({ field: { onChange } }) => {
            return (
              <TextInputCustom
                icon="lock"
                label="Mật khẩu mới"
                onChangeText={onChange}
                isPassword={true}
                error={errors.passwordNew !== undefined}
                errorMsg={errors.passwordNew?.message}
              />
            );
          }}
        />
        <ButtonCustom title="Xác nhận" mt={10} onPress={handleSubmit(submit)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Title: {
    fontWeight: "bold",
    fontSize: 20,
    paddingHorizontal: 15,
  },
});

export default ChangePassword;
