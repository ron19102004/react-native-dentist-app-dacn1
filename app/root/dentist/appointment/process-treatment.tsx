import ColorTheme from "@/common/color.constant";
import ButtonCustom from "@/components/button";
import TextInputCustom from "@/components/input";
import {
  AppointmentDentistResponse,
  UpdateTreatmentRecordRequest,
} from "@/src/apis/appointment-dentist.api";
import useAppointmentDentist from "@/src/hooks/useAppointmentDentist.hook";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import Toast from "react-native-toast-message";
import { translateStatus } from "../(tab)/appointment-today";
import { useRouter } from "expo-router";
import { debounce } from "@/src/hooks/debounce";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native-gesture-handler";

const schema = yup.object().shape({
  treatment: yup.string().required("Treatment là bắt buộc"),
  diagnosis: yup.string().required("Diagnosis là bắt buộc"),
});

const ProcessTreatmentAppointment = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UpdateTreatmentRecordRequest>({
    resolver: yupResolver(schema),
  });
  const { getAppointmentDetails, updateTreatmentRecord } =
    useAppointmentDentist();
  const [appointment, setAppointment] =
    useState<null | AppointmentDentistResponse>(null);
  const appointmentRef = useRef<null | AppointmentDentistResponse>(null);
  const router = useRouter();

  const onSubmit = useCallback(async (data: UpdateTreatmentRecordRequest) => {
    if (appointmentRef.current) {
      await updateTreatmentRecord(
        appointmentRef.current.id,
        data,
        () => {
          Toast.show({
            type: "success", // 'success' | 'error' | 'info'
            text1: "Thông báo",
            text2: "Cập nhật thành công",
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
    } else {
      Toast.show({
        type: "error", // 'success' | 'error' | 'info'
        text1: "Lỗi",
        text2: "Không nhận thấy cuộc hẹn",
      });
    }
  }, []);
  const loadAppointment = useCallback(
    debounce(async (appointmentId: number) => {
      await getAppointmentDetails(
        appointmentId,
        (data) => {
          appointmentRef.current = data;
          setAppointment(data);
          if (data && data.treatmentRecord) {
            reset({
              diagnosis: data.treatmentRecord.diagnosis,
              treatment: data.treatmentRecord.treatment,
            });
          }
        },
        (err) => {
          Toast.show({
            type: "error",
            text1: "Lỗi",
            text2: err,
          });
        }
      );
    }, 500),
    []
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: ColorTheme.White }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ marginBottom: 20 }}>
          <TextInputCustom
            icon="numbers"
            label="Nhập mã hồ sơ"
            keyboardTypeOptions="numeric"
            onChangeText={(text) => {
              const value = parseInt(text);
              if (!isNaN(value)) {
                loadAppointment(value);
              }
            }}
          />
        </View>

        {appointment && (
          <Pressable
            onPress={() => {
              router.navigate({
                pathname: "/root/dentist/appointment/details/[details]",
                params: {
                  details: appointment.id,
                },
              });
            }}
          >
            <View style={styles.card}>
              <Text style={styles.name}>
                {appointment.patientResponseDto.fullName}
              </Text>
              <Text style={styles.info}>
                📞 {appointment.patientResponseDto.phone}
              </Text>
              <Text style={styles.info}>
                📧 {appointment.patientResponseDto.email}
              </Text>
              <Text style={styles.info}>🗓 Ngày hẹn: {appointment.date}</Text>
              <Text style={styles.info}>
                🩺 Trạng thái:{" "}
                <Text
                  style={{
                    color: translateStatus(appointment.appointmentStatus).color,
                  }}
                >
                  {translateStatus(appointment.appointmentStatus).label}
                </Text>
              </Text>
              {appointment.notes ? (
                <Text style={styles.info}>📝 Ghi chú: {appointment.notes}</Text>
              ) : null}
            </View>
          </Pressable>
        )}
        {appointment && (
          <View
            style={{
              marginTop: 20,
            }}
          >
            <Controller
              name="treatment"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Phương pháp điều trị"
                  onChangeText={onChange}
                  value={value}
                  multiline={true}
                  numberOfLines={12}
                  style={{
                    height: 200,
                    borderColor: "gray",
                    borderWidth: 1,
                    padding: 10,
                    marginBottom: 10,
                    textAlignVertical: "top", // để bắt đầu từ trên
                    borderRadius: 10,
                  }}
                />
              )}
            />
            <Controller
              name="diagnosis"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Chẩn đoán"
                  onChangeText={onChange}
                  value={value}
                  multiline={true}
                  numberOfLines={12}
                  style={{
                    height: 200,
                    borderColor: "gray",
                    borderWidth: 1,
                    padding: 10,
                    marginBottom: 10,
                    textAlignVertical: "top",
                    borderRadius: 10,
                  }}
                />
              )}
            />
            <ButtonCustom
              title="Cập nhật"
              onPress={handleSubmit(onSubmit)}
              mt={15}
              mb={15}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderLeftColor: ColorTheme.Primary,
    borderLeftWidth: 5,
    marginTop: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    marginBottom: 2,
  },
});

export default ProcessTreatmentAppointment;
