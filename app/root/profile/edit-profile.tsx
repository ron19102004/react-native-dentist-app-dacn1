import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ColorTheme from "@/common/color.constant";
import { UpdateUserRequest } from "@/src/apis/auth.api";
import TextInputCustom from "@/components/input";
import ButtonCustom from "@/components/button";
import { useAuth } from "@/src/contexts";
import { textToGender } from "@/src/apis/model.d";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

const schema = yup.object().shape({
  fullName: yup.string().required("Họ và tên là bắt buộc"),
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Số điện thoại phải có 10 chữ số")
    .required("Số điện thoại là bắt buộc"),
});

type FormData = Omit<UpdateUserRequest, "gender">;

const EditDetailsProfile = () => {
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [genderError, setGenderError] = useState<string | null>(null);
  const [genderText, setGenderText] = useState<string>("");
  const { updateInfo, userCurrent } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (userCurrent) {
      reset({
        email: userCurrent.email,
        fullName: userCurrent.fullName,
        phone: userCurrent.phone,
      });
      setGenderText(userCurrent.gender)
    }
  }, [userCurrent]);
  const handleUpdateProfile = useCallback(
    async (data: FormData) => {
      if (!["male", "female"].includes(genderText.toLowerCase())) {
        setGenderError("Giới tính phải là 'male' hoặc 'female'");
        return;
      }
      setGenderError(null);
      await updateInfo(
        { ...data, gender: textToGender(genderText) },
        () => {
          Toast.show({
            type: "success",
            text1: "🧑‍💼 Cập nhật thông tin",
            text2: "Thành công",
          });
          router.back();
        },
        (err) => {
          Toast.show({
            type: "error",
            text1: "🧑‍💼 Cập nhật thông tin",
            text2: err,
          });
        }
      );
    },
    [genderText]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: ColorTheme.WhiteF1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* <Text style={styles.title}>🧑‍💼 Chỉnh sửa thông tin cá nhân</Text> */}

          <View style={styles.form}>
            <Controller
              name="fullName"
              control={control}
              render={({ field: { onChange } }) => (
                <TextInputCustom
                  value={getValues("fullName")}
                  label="Họ và tên"
                  onChangeText={onChange}
                  icon="user"
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
                  value={getValues("email")}
                  keyboardTypeOptions="email-address"
                  onChangeText={onChange}
                  icon="mail"
                  error={!!errors.email}
                  errorMsg={errors.email?.message}
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field: { onChange } }) => (
                <TextInputCustom
                  value={getValues("phone")}
                  label="Số điện thoại"
                  keyboardTypeOptions="phone-pad"
                  onChangeText={onChange}
                  icon="phone"
                  error={!!errors.phone}
                  errorMsg={errors.phone?.message}
                />
              )}
            />

            <TextInputCustom
              value={genderText}
              label="Giới tính (Male/Female)"
              onChangeText={(text) => setGenderText(text)}
              icon="idcard"
              error={genderError !== null}
              errorMsg={genderError || ""}
            />

            <ButtonCustom
              title="Cập nhật thông tin"
              onPress={handleSubmit(handleUpdateProfile)}
              mt={20}
              mb={10}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: ColorTheme.WhiteF1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: ColorTheme.Primary,
    marginBottom: 24,
    textAlign: "center",
  },
  form: {
    backgroundColor: ColorTheme.White,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
});

export default EditDetailsProfile;
