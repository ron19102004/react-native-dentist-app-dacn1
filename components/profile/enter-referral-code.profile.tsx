import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import ButtonCustom from '../button';
import TextInputCustom from '../input';

interface ReferralCodeParam {
  code: string;
}
const schema = yup.object().shape({
    code: yup
    .string()
    .min(8, "Mã giới thiệu phải có ít nhất 8 ký tự")
    .required("Mã giới thiệu là bắt buộc"),
});
const EnterReferralCode = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
      } = useForm<ReferralCodeParam>({ resolver: yupResolver(schema) });
      const submit = async (data: ReferralCodeParam) => {
        console.log(data);
      };
      return (
        <View>
          <Text style={styles.Title}>Mã giới thiệu</Text>
          <View>
            <Controller
              control={control}
              name="code"
              render={({ field: { onChange } }) => {
                return (
                  <TextInputCustom
                    icon="text-snippet"
                    label="Nhập mã giới thiệu"
                    onChangeText={onChange}
                    error={errors.code !== undefined}
                    errorMsg={errors.code?.message}
                  />
                );
              }}
            />
            <ButtonCustom title="Xác nhận" mt={10} onPress={handleSubmit(submit)} />
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
    Title: {
      fontWeight: "bold",
      fontSize: 20,
      paddingHorizontal: 15,
    },
  });
export default EnterReferralCode;
