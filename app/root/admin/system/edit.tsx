import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SystemInfoData } from "@/src/apis/model.d";
import TextInputCustom from "@/components/input";
import ButtonCustom from "@/components/button";
import useAdmin from "@/src/hooks/useAdmin.hook";
import ColorTheme from "@/common/color.constant";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
const schema = yup.object().shape({
  systemName: yup.string().required("Tên hệ thống là bắt buộc"),
  systemVersion: yup.string().required("Phiên bản là bắt buộc"),
  systemAuthor: yup.string().required("Tác giả là bắt buộc"),
  systemAuthorEmail: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email là bắt buộc"),
  systemAuthorPhone: yup
    .string()
    .matches(/^(\+84|84|0)[3|5|7|8|9]\d{8}$/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại là bắt buộc"),
  systemAddress: yup.string().required("Địa chỉ là bắt buộc"),
  systemAuthorWebsite: yup.string().url("URL không hợp lệ").required(),
});
type DataForm = Omit<
  SystemInfoData,
  | "systemFacebookURL"
  | "systemTwitterURL"
  | "systemInstagramURL"
  | "systemLinkedinURL"
  | "systemMapURL"
  | "systemDescription"
>;
const SystemAdminEditScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<DataForm>({
    resolver: yupResolver(schema),
  });
  const [systemInfoCurrent, setSystemInfoCurrent] =
    useState<SystemInfoData | null>(null);
  const { getSystemInfo, updateSystemInfo } = useAdmin();
  const router = useRouter();
  const init = async () => {
    const data = await getSystemInfo();
    if (data.code === 200) {
      const systemData = data.data;
      setSystemInfoCurrent(systemData);
      reset({
        systemAddress: systemData?.systemAddress,
        systemAuthor: systemData?.systemAuthor,
        systemAuthorEmail: systemData?.systemAuthorEmail,
        systemAuthorPhone: systemData?.systemAuthorPhone,
        systemAuthorWebsite: systemData?.systemAuthorWebsite,
        systemName: systemData?.systemName,
        systemVersion: systemData?.systemVersion,
      });
    }
  };
  useEffect(() => {
    init();
  }, []);
  const onSubmit = async (data: DataForm) => {
    await updateSystemInfo(
      {
        ...data,
        systemFacebookURL: systemInfoCurrent?.systemFacebookURL ?? "",
        systemInstagramURL: systemInfoCurrent?.systemInstagramURL ?? "",
        systemLinkedinURL: systemInfoCurrent?.systemLinkedinURL ?? "",
        systemMapURL: systemInfoCurrent?.systemMapURL ?? "",
        systemTwitterURL: systemInfoCurrent?.systemTwitterURL ?? "",
        systemDescription: systemInfoCurrent?.systemDescription ?? "",
      },
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
  };
  if (!systemInfoCurrent) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={ColorTheme.Primary} />
        <Text style={styles.loadingText}>Đang tải thông tin...</Text>
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.title}>Chỉnh sửa thông tin hệ thống</Text> */}

      <Controller
        name="systemName"
        control={control}
        render={({ field: { onChange } }) => (
          <TextInputCustom
            value={getValues("systemName")}
            label="Tên hệ thống"
            onChangeText={onChange}
            icon="text-rotation-none"
            error={!!errors.systemName}
            errorMsg={errors.systemName?.message}
          />
        )}
      />

      <Controller
        name="systemVersion"
        control={control}
        render={({ field: { onChange } }) => (
          <TextInputCustom
            value={getValues("systemVersion")}
            label="Phiên bản"
            onChangeText={onChange}
            icon="dataset"
            error={!!errors.systemVersion}
            errorMsg={errors.systemVersion?.message}
          />
        )}
      />

      <Controller
        name="systemAuthor"
        control={control}
        render={({ field: { onChange } }) => (
          <TextInputCustom
            value={getValues("systemAuthor")}
            label="Tác giả"
            onChangeText={onChange}
            icon="person"
            error={!!errors.systemAuthor}
            errorMsg={errors.systemAuthor?.message}
          />
        )}
      />

      <Controller
        name="systemAuthorEmail"
        control={control}
        render={({ field: { onChange } }) => (
          <TextInputCustom
            value={getValues("systemAuthorEmail")}
            label="Email"
            onChangeText={onChange}
            icon="mail"
            error={!!errors.systemAuthorEmail}
            errorMsg={errors.systemAuthorEmail?.message}
          />
        )}
      />

      <Controller
        name="systemAuthorPhone"
        control={control}
        render={({ field: { onChange } }) => (
          <TextInputCustom
            value={getValues("systemAuthorPhone")}
            label="Điện thoại"
            onChangeText={onChange}
            icon="phone"
            error={!!errors.systemAuthorPhone}
            errorMsg={errors.systemAuthorPhone?.message}
          />
        )}
      />

      <Controller
        name="systemAddress"
        control={control}
        render={({ field: { onChange } }) => (
          <TextInputCustom
            value={getValues("systemAddress")}
            label="Địa chỉ"
            onChangeText={onChange}
            icon="map"
            error={!!errors.systemAddress}
            errorMsg={errors.systemAddress?.message}
          />
        )}
      />

      <Controller
        name="systemAuthorWebsite"
        control={control}
        render={({ field: { onChange } }) => (
          <TextInputCustom
            value={getValues("systemAuthorWebsite")}
            label="Website"
            onChangeText={onChange}
            icon="link"
            error={!!errors.systemAuthorWebsite}
            errorMsg={errors.systemAuthorWebsite?.message}
          />
        )}
      />

      <ButtonCustom
        title="Cập nhật thông tin"
        onPress={handleSubmit(onSubmit)}
        mt={20}
        mb={10}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: ColorTheme.Primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorTheme.WhiteF1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#F4F6F8",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0A0A0A",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SystemAdminEditScreen;
