import {
  Expertise,
  Role,
  WorkStatus,
  WorkStatusToViVN,
} from "@/src/apis/model.d";
import useExpertise from "@/src/hooks/useExpertise.hook";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, Pressable, View } from "react-native";
import Toast from "react-native-toast-message";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import ColorTheme from "@/common/color.constant";
import ButtonCustom from "@/components/button";
import TextInputCustom from "@/components/input";
import useAdmin from "@/src/hooks/useAdmin.hook";
import ListView from "@/components/list";
import Select from "@/components/select";
import Checkbox from "@/components/checkbox";
import { debounce } from "@/src/hooks/debounce";
import { AccountInfoRole } from "@/src/apis/admin.api";
import RenderUser from "@/components/admin/account/render-user-role";

const schema = yup.object().shape({
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  workStatus: yup.string().required("Trạng thái làm việc là bắt buộc"),
  expertiseId: yup.number().required("Chuyên ngành là bắt buộc"),
});

interface FormData {
  email: string;
  workStatus: WorkStatus | string;
  expertiseId: number;
}

const EditDentistAccount = () => {
  const { getAllExpertise } = useExpertise();
  const [expertises, setExpertises] = useState<Expertise[]>([]);
  const { updateAccDentist, getInfoUserHasRole } = useAdmin();
  const router = useRouter();
  const [accountDetails, setAccountDetails] = useState<AccountInfoRole | null>(
    null
  );
  const accountDetailsRef = useRef<AccountInfoRole | null>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const loadAdminInfo = useCallback(
    debounce(async (gmail: string) => {
      await getInfoUserHasRole(
        gmail,
        (data) => {
          if (data && data.role === Role.DENTIST) {
            accountDetailsRef.current = data;
            setAccountDetails(accountDetailsRef.current);
          }
        },
        (error) => {
          console.log(error);
          accountDetailsRef.current = null;
          setAccountDetails(null);
        }
      );
    }, 500),
    []
  );
  const init = async () => {
    await getAllExpertise(
      (data) => setExpertises(data),
      () => {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: "Không thể tải được chuyên ngành",
        });
      }
    );
  };

  const onSubmit = useCallback(async (data: FormData) => {
    if (accountDetailsRef.current === null) {
      Toast.show({
        type: "error",
        text1: "Thất bại",
        text2: "Vui lòng nhập đúng email",
      });
      return;
    }
    await updateAccDentist(
      data.email,
      {
        workStatus: data.workStatus as WorkStatus,
        expertiseId: data.expertiseId,
      },
      () => {
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: "Cập nhật tài khoản thành công",
        });
        router.back();
      },
      () => {
        Toast.show({
          type: "error",
          text1: "Thất bại",
          text2: "Không thể cập nhật",
        });
      }
    );
  }, []);

  useEffect(() => {}, [accountDetails]);
  useEffect(() => {
    init();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Đổi thông tin bác sĩ</Text>

      {/* Email */}
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
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
          );
        }}
      />

      {/* WorkStatus */}
      <Text style={styles.label}>Trạng thái làm việc</Text>
      <ListView
        data={Object.values(WorkStatus)}
        render={(status) => (
          <Controller
            key={status}
            name="workStatus"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Checkbox
                data={status}
                isSelected={(item) => value === item}
                onChange={(vl) => onChange(vl)}
                render={(item) => <Text>{WorkStatusToViVN(item)}</Text>}
              />
            )}
          />
        )}
      />
      {errors.workStatus && (
        <Text style={styles.errorText}>{errors.workStatus.message}</Text>
      )}

      {/* Expertise Select */}
      <Text style={styles.label}>Chuyên ngành</Text>
      <Controller
        name="expertiseId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            data={expertises}
            isSelected={(item) => value === item.id}
            onChange={(item) => onChange(item.id)}
            render={(item) => {
              return (
                <Text
                  style={{ color: ColorTheme.White }}
                >{`${item.id} - ${item.name}`}</Text>
              );
            }}
          />
        )}
      />
      {errors.expertiseId && (
        <Text style={styles.errorText}>{errors.expertiseId.message}</Text>
      )}
      {/* Submit */}
      <ButtonCustom title="Cập nhật" onPress={handleSubmit(onSubmit)} mt={20} />
      <RenderUser user={accountDetails} requireRole={Role.DENTIST} />
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
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 20,
    textAlign: "left",
    paddingHorizontal: 15,
  },
  label: {
    paddingHorizontal: 15,
    marginTop: 20,
    fontWeight: "bold",
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  radioBox: {
    height: 20,
    width: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: ColorTheme.Primary,
    marginRight: 10,
  },
  selectRow: {
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  expertiseItem: {
    backgroundColor: ColorTheme.Black,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  errorText: {
    color: "red",
    marginLeft: 20,
    marginTop: -10,
  },
});

export default EditDentistAccount;
