import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";

import ColorTheme from "@/common/color.constant";
import { AppointmentDentistResponse } from "@/src/apis/appointment-dentist.api";
import useAppointmentDentist from "@/src/hooks/useAppointmentDentist.hook";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

const AppointmentDetails = () => {
  const { details } = useLocalSearchParams();
  const [appointment, setAppointment] =
    useState<null | AppointmentDentistResponse>(null);
  const { getAppointmentDetails } = useAppointmentDentist();

  useEffect(() => {
    const init = async () => {
      if (details) {
        await getAppointmentDetails(
          parseInt(details.toString()),
          setAppointment,
          (err) => {
            Toast.show({
              type: "error",
              text1: "Lỗi",
              text2: err,
            });
          }
        );
      }
    };
    init();
  }, []);

  const getBorderColor = () => {
    const invoice = appointment?.treatmentRecord?.invoice;
    if (!invoice) return "#aaa"; // xám
    if (invoice.paymentDate) return "green"; // xanh
    return "red"; // đỏ
  };

  if (!appointment) {
    return (
      <View style={[styles.card, { borderLeftColor: "#ccc" }]}>
        <Text style={styles.empty}>📭 Chưa có thông tin lịch hẹn</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[styles.card, { borderLeftColor: getBorderColor() }]}>
          <Text style={styles.title}>
            <Feather name="user" size={18} />{" "}
            {appointment.patientResponseDto.fullName}
          </Text>

          <Text style={styles.text}>
            <Feather name="calendar" size={16} /> Ngày hẹn:{" "}
            <Text style={styles.highlight}>{appointment.date}</Text>
          </Text>
          <Text style={styles.text}>
            <Feather name="phone" size={16} />{" "}
            {appointment.patientResponseDto.phone}
          </Text>
          <Text style={styles.text}>
            <Feather name="mail" size={16} />{" "}
            {appointment.patientResponseDto.email}
          </Text>
          <Text style={styles.text}>
            <Feather name="clipboard" size={16} /> Ghi chú: {appointment.notes}
          </Text>

          {appointment.treatmentRecord && (
            <>
              <View style={styles.divider} />
              <Text style={styles.subTitle}>
                <MaterialIcons
                  name="medical-services"
                  size={18}
                  color={ColorTheme.Primary}
                />
                Điều trị
              </Text>
              <Text style={styles.text}>
                🦷 Phương pháp điều trị: {appointment.treatmentRecord.treatment}
              </Text>
              <Text style={styles.text}>
                📋 Chẩn đoán: {appointment.treatmentRecord.diagnosis}
              </Text>

              {/* Dịch vụ */}
              {appointment.treatmentRecord.treatmentRecordServices &&
                appointment.treatmentRecord.treatmentRecordServices?.length >
                  0 && (
                  <>
                    <Text style={styles.subTitle}>
                      <MaterialIcons name="construction" size={16} /> Dịch vụ
                    </Text>
                    {appointment.treatmentRecord.treatmentRecordServices.map(
                      (s) => (
                        <View key={s.id} style={styles.serviceBox}>
                          <Text style={styles.text}>
                            🔧 {s.dentalService.name} -{" "}
                            <Text style={styles.highlight}>
                            $ {s.priceCurrent.toLocaleString()}
                            </Text>
                          </Text>
                          <Text
                            style={[
                              styles.text,
                              { fontStyle: "italic", marginLeft: 6 },
                            ]}
                          >
                            📝 {s.note}
                          </Text>
                        </View>
                      )
                    )}
                  </>
                )}

              {/* Thuốc */}
              {appointment.treatmentRecord.medicineUseds &&
                appointment.treatmentRecord.medicineUseds?.length > 0 && (
                  <>
                    <Text style={styles.subTitle}>
                      <MaterialIcons name="medication" size={18} /> Thuốc sử
                      dụng
                    </Text>
                    {appointment.treatmentRecord.medicineUseds.map((m) => (
                      <View key={m.id} style={styles.medicineBox}>
                        <Text style={styles.text}>
                          💊 {m.name} ({m.quantity} {m.unit}) -{" "}
                          <Text style={styles.highlight}>
                          $ {m.pricePerUnit.toLocaleString()}
                          </Text>
                        </Text>
                        <Text
                          style={[
                            styles.text,
                            { fontStyle: "italic", marginLeft: 6 },
                          ]}
                        >
                          📖 Cách dùng: {m.guide}
                        </Text>
                      </View>
                    ))}
                  </>
                )}

              {/* Hóa đơn */}
              {appointment.treatmentRecord.invoice ? (
                <>
                  <Text style={styles.subTitle}>
                    <Feather name="file-text" size={18} /> Hóa đơn
                  </Text>
                  <Text style={styles.text}>
                    💰 Tổng tiền:{" "}
                    <Text style={styles.highlight}>
                    $ {appointment.treatmentRecord.invoice.totalPrice.toLocaleString()}
                    </Text>
                  </Text>
                  <Text style={styles.text}>
                    👩‍⚕️ Thu ngân:{" "}
                    {appointment.treatmentRecord.invoice.collectorName}
                  </Text>
                  <Text style={styles.text}>
                    📅 Ngày thanh toán:{" "}
                    {appointment.treatmentRecord.invoice.paymentDate ? (
                      <Text style={styles.highlight}>
                        {new Date(
                          appointment.treatmentRecord.invoice.paymentDate
                        ).toLocaleString("vi-VN")}
                      </Text>
                    ) : (
                      <Text style={{ color: "red" }}>Chưa thanh toán</Text>
                    )}
                  </Text>
                </>
              ) : (
                <Text style={[styles.text, { color: "#999", marginTop: 10 }]}>
                  🚫 Chưa có hóa đơn
                </Text>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderLeftWidth: 5,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 6,
    color: ColorTheme.Primary,
  },
  subTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 14,
    marginBottom: 6,
    color: ColorTheme.Primary,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 12,
  },
  highlight: {
    color: ColorTheme.Primary,
    fontWeight: "600",
  },
  empty: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#777",
    fontSize: 15,
  },
  serviceBox: {
    backgroundColor: "#f9f9f9",
    padding: 8,
    borderRadius: 8,
    marginTop: 6,
  },
  medicineBox: {
    backgroundColor: "#f1f8ff",
    padding: 8,
    borderRadius: 8,
    marginTop: 6,
  },
});

export default AppointmentDetails;
