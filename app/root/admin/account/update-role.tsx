import useAdmin from "@/src/hooks/useAdmin.hook";
import { useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { AccountInfoRole, RoleCanChange } from "@/src/apis/admin.api";
import { debounce } from "@/src/hooks/debounce";
import Toast from "react-native-toast-message";
import { ScrollView } from "react-native-gesture-handler";
import TextInputCustom from "@/components/input";
import ListView from "@/components/list";
import Checkbox from "@/components/checkbox";
import ColorTheme from "@/common/color.constant";
import ButtonCustom from "@/components/button";
import RenderUser from "@/components/admin/account/render-user-role";

// Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  role: yup.string().required("Vai trò là bắt buộc"),
});

interface FormData {
  email: string;
  role: RoleCanChange | string;
}

const UpdateRole = () => {
  const { updateRole, getInfoUserHasRole } = useAdmin();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [accountDetails, setAccountDetails] = useState<AccountInfoRole | null>(
    null
  );
  const accountDetailsRef = useRef<AccountInfoRole | null>(null);

  const loadAdminInfo = useCallback(
    debounce(async (gmail: string) => {
      await getInfoUserHasRole(
        gmail,
        (data) => {
          accountDetailsRef.current = data;
          setAccountDetails(data);
        },
        () => {
          accountDetailsRef.current = null;
          setAccountDetails(null);
        }
      );
    }, 500),
    []
  );

  const onSubmit = useCallback(async (data: FormData) => {
    if (!accountDetailsRef.current) {
      Toast.show({
        type: "error",
        text1: "Thất bại",
        text2: "Vui lòng nhập đúng email",
      });
      return;
    }

    await updateRole(
      {
        email: data.email,
        role: data.role as RoleCanChange,
      },
      () => {
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: "Cập nhật vai trò thành công",
        });
        router.back();
      },
      (err) => {
        Toast.show({
          type: "error",
          text1: "Thất bại",
          text2: err,
        });
      }
    );
  }, []);

  const translateRole = (role: RoleCanChange) => {
    switch (role) {
      case RoleCanChange.DENTIST:
        return "Bác sĩ";
      case RoleCanChange.STAFF:
        return "Nhân viên";
      default:
        return role;
    }
  };

  const renderCurrentRole = () => {
    if (!accountDetails) return null;

    const roles: string[] = [];
    if (accountDetails.dentist?.active) roles.push("Bác sĩ");
    if (accountDetails.staff?.active) roles.push("Nhân viên");

    if (roles.length === 0) return "Không có";
    return roles.join(", ");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Đổi vai trò tài khoản</Text>

      {/* Email input */}
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange } }) => (
          <TextInputCustom
            label="Email"
            keyboardTypeOptions="email-address"
            onChangeText={(text) => {
              loadAdminInfo(text);
              onChange(text);
            }}
            icon="mail"
            error={!!errors.email}
            errorMsg={errors.email?.message}
          />
        )}
      />

      {/* Role selection */}
      <Text style={styles.label}>Chọn vai trò</Text>
      <ListView
        data={Object.values(RoleCanChange)}
        render={(role) => (
          <Controller
            key={role}
            name="role"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Checkbox
                data={role}
                isSelected={(item) => value === item}
                onChange={(val) => onChange(val)}
                render={(item) => <Text>{translateRole(item)}</Text>}
              />
            )}
          />
        )}
      />
      {errors.role && (
        <Text style={styles.errorText}>{errors.role.message}</Text>
      )}

      {/* Submit button */}
      <ButtonCustom title="Cập nhật" onPress={handleSubmit(onSubmit)} mt={20} />

      {/* Current role display */}
      {accountDetails && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
            backgroundColor: ColorTheme.White,
            borderRadius: 10,
            elevation: 3,
            marginVertical: 10,
            marginHorizontal: 16,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Vai trò hiện tại: </Text>
          <Text style={{}}>{renderCurrentRole()}</Text>
        </View>
      )}
      {/* Render additional user info */}
      <RenderUser user={accountDetails} requireRole={null} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorTheme.White,
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 15,
    marginTop: 20,
  },
  errorText: {
    color: "red",
    marginLeft: 20,
    marginTop: 5,
  },
  currentRoleContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  currentRoleText: {
    fontSize: 16,
    color: "#333",
    marginTop: 5,
  },
});

export default UpdateRole;
