import ColorTheme from "@/common/color.constant";
import ButtonCustom from "@/components/button";
import TextInputCustom from "@/components/input";
import { AppointmentDentistResponse } from "@/src/apis/appointment-dentist.api";
import useAppointmentDentist from "@/src/hooks/useAppointmentDentist.hook";
import React, { useEffect, useState } from "react";
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
import { AppointmentStatus } from "@/src/apis/model.d";
import { useRouter } from "expo-router";
import BottomSheetCustom from "@/components/bottom-sheet";

const ConfirmAppointment = () => {
  const { getAppointmentDetails, confirmAppointment, cancelAppointment } =
    useAppointmentDentist();
  const [appointmentId, setAppointmentId] = useState<number | null>(null);
  const [appointment, setAppointment] =
    useState<null | AppointmentDentistResponse>(null);
  const [noteCancel, setNoteCancel] = useState<string | null>(null);
  const router = useRouter();
  const confirmHandler = async () => {
    if (appointment) {
      await confirmAppointment(
        appointment.id,
        () => {
          Toast.show({
            type: "success", // 'success' | 'error' | 'info'
            text1: "Thông báo",
            text2: "Xác nhận thành công",
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
    }
  };
  const cancelAppointmentHandler = async () => {
    if (!noteCancel) {
      Toast.show({
        type: "error", // 'success' | 'error' | 'info'
        text1: "Lỗi",
        text2: "Yêu cầu lý do",
      });
      return;
    }
    if (appointment) {
      await cancelAppointment(
        appointment.id,
        noteCancel,
        () => {
          Toast.show({
            type: "success", // 'success' | 'error' | 'info'
            text1: "Thông báo",
            text2: "Từ chối thành công",
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
    }
    setNoteCancel(null);
  };
  const loadAppointment = async (appointmentId: number) => {
    await getAppointmentDetails(
      appointmentId,
      (data) => {
        setAppointment(data);
      },
      (err) => {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: err,
        });
      }
    );
  };

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
              setAppointmentId(isNaN(value) ? null : value);
            }}
          />
          <ButtonCustom
            title="Tìm kiếm"
            mt={10}
            onPress={async () => {
              if (appointmentId) {
                await loadAppointment(appointmentId);
              } else {
                Toast.show({
                  type: "error",
                  text1: "Lỗi",
                  text2: "Vui lòng không để trống mã hồ sơ",
                });
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
        {appointment &&
        appointment.appointmentStatus === AppointmentStatus.WAITING ? (
          <>
            <ButtonCustom
              onPress={async () => {
                await confirmHandler();
              }}
              mt={20}
              title="Xác nhận"
              color="#008001"
              bgFocus={ColorTheme.BlackB}
            />
            <View>
              <BottomSheetCustom
                button={(ref) => (
                  <ButtonCustom
                    mt={20}
                    onPress={async () => {
                      ref.current?.present();
                    }}
                    title="Hủy cuộc hẹn"
                    color={ColorTheme.Red}
                    textColor={ColorTheme.White}
                  />
                )}
                bottomSheetModalStyle={{
                  margin: 10,
                }}
                bottomSheetViewStyle={{
                  paddingHorizontal: 30,
                  paddingBottom: 30,
                }}
                child={(ref) => {
                  return (
                    <View style={{ padding: 16 }}>
                      <Text
                        style={{
                          fontSize: 20,
                          textAlign: "center",
                          marginBottom: 16,
                          fontWeight: "bold",
                        }}
                      >
                        Bạn có chắc xác nhận hủy cuộc hẹn {appointment.id}{" "}
                        không?
                      </Text>
                      <View style={{ marginBottom: 10 }}>
                        <TextInputCustom
                          label="Lý do"
                          onChangeText={(text) => {
                            setNoteCancel(text);
                          }}
                          icon="text-fields"
                        />
                      </View>
                      <View style={{}}>
                        <ButtonCustom
                          onPress={async () => {
                            ref.current?.close();
                          }}
                          title="Hủy"
                          color={ColorTheme.Red}
                          bgFocus={ColorTheme.BlackB}
                          textColor={ColorTheme.White}
                          fontSize={12}
                        />
                        <ButtonCustom
                          mt={10}
                          onPress={async () => {
                            await cancelAppointmentHandler();
                          }}
                          title="Xác nhận"
                          fontSize={12}
                        />
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </>
        ) : null}
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

export default ConfirmAppointment;
