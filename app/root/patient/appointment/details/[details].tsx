import ColorTheme from "@/common/color.constant";
import ListView from "@/components/list";
import { GetAppointmentDetails } from "@/src/apis/appointment-user.api";
import {
  AppointmentStatus,
  translateMedicineUnitToVietnamese,
} from "@/src/apis/model.d";
import useAppointmentUser from "@/src/hooks/useAppointmentUser.hook";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

const MyAppointmentDetails = () => {
  const { details } = useLocalSearchParams();
  const { getAppointmentItem } = useAppointmentUser();
  const [appointment, setAppointment] = useState<GetAppointmentDetails | null>(
    null
  );
  const [refreshing, setRefreshing] = useState(false);

  const init = async () => {
    await getAppointmentItem(
      parseInt(details.toString()),
      setAppointment,
      console.log
    );
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await init();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (details) init();
  }, []);

  const statusText = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.WAITING:
        return "⏳ Chờ xác nhận";
      case AppointmentStatus.CONFIRMED:
        return "✅ Đã xác nhận";
      case AppointmentStatus.CANCELLED:
        return "❌ Đã hủy";
      case AppointmentStatus.FINISHED:
        return "✅ Đã thành công";
      default:
        return "🔘 Không rõ";
    }
  };

  if (!appointment) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={ColorTheme.Primary} />
        <Text style={styles.loadingText}>Đang tải dữ liệu ...</Text>
      </View>
    );
  }

  const invoice = appointment.treatmentRecord?.invoice;
  const treatment = appointment.treatmentRecord;

  const cards = [
    {
      title: "🗓️ Thông tin cuộc hẹn",
      borderColor: appointment.date ? "green" : "#ccc",
      content: (
        <>
          <Text>Ngày hẹn: {appointment.date}</Text>
          <Text>Trạng thái: {statusText(appointment.appointmentStatus)}</Text>
          <Text>Bác sĩ: {appointment.dentist?.fullName}</Text>
          <Text>Ghi chú: {appointment.notes || "Không có ghi chú"}</Text>
        </>
      ),
    },
    {
      title: "🗂 Hồ sơ điều trị",
      borderColor: treatment ? "green" : "#ccc",
      content: treatment ? (
        <>
          <Text>Chẩn đoán: {treatment.diagnosis}</Text>
          <Text>Phác đồ điều trị: {treatment.treatment}</Text>
          <Text>
            Cập nhật lúc:{" "}
            {new Date(treatment.updatedAt).toLocaleString("vi-VN")}
          </Text>
        </>
      ) : (
        <Text>Chưa có hồ sơ điều trị</Text>
      ),
    },
    {
      title: "💊 Thuốc sử dụng",
      borderColor: treatment?.medicineUseds?.length ? "green" : "#ccc",
      content: treatment?.medicineUseds?.length ? (
        <ListView
          data={treatment.medicineUseds}
          render={(med, idx) => (
            <View key={idx} style={styles.subItem}>
              <Text>
                {med.name} ({translateMedicineUnitToVietnamese(med.unit)}) - SL:{" "}
                {med.quantity}
              </Text>
              <Text>Hướng dẫn: {med.guide}</Text>
              <Text>Giá mỗi đơn vị: $ {med.pricePerUnit}</Text>
            </View>
          )}
        />
      ) : (
        <Text>Chưa có thuốc được sử dụng</Text>
      ),
    },
    {
      title: "🧾 Dịch vụ điều trị",
      borderColor: treatment?.treatmentRecordServices?.length
        ? "green"
        : "#ccc",
      content: treatment?.treatmentRecordServices?.length ? (
        <ListView
          data={treatment.treatmentRecordServices}
          render={(srv, idx) => (
            <View key={idx} style={styles.subItem}>
              <Text>{srv.dentalService.name}</Text>
              <Text>Giá: $ {srv.priceCurrent}</Text>
              <Text>Ghi chú: {srv.note || "Không có"}</Text>
            </View>
          )}
        />
      ) : (
        <Text>Chưa có dịch vụ nào</Text>
      ),
    },
    {
      title: "💰 Hóa đơn",
      borderColor: invoice ? (invoice.paymentDate ? "green" : "red") : "#ccc",
      content: invoice ? (
        <>
          <Text>
            {invoice.paymentDate ? "🟢 Đã thanh toán" : "🔴 Chưa thanh toán"}
          </Text>
          <Text>
            Ngày thanh toán:{" "}
            {invoice.paymentDate
              ? new Date(invoice.paymentDate).toLocaleString("vi-VN")
              : "Chưa thanh toán"}
          </Text>
          <Text>Người thu: {invoice.collectorName || "N/A"}</Text>
          <Text>Phương thức: {invoice.paymentMethod || "N/A"}</Text>
          <Text>Tổng tiền: $ {invoice.totalPrice}</Text>
        </>
      ) : (
        <Text>Chưa có hóa đơn</Text>
      ),
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 24 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ListView
        data={cards}
        render={(card, idx) => (
          <Card key={idx} title={card.title} borderColor={card.borderColor}>
            {card.content}
          </Card>
        )}
      />
    </ScrollView>
  );
};

const Card = ({
  title,
  borderColor,
  children,
}: {
  title: string;
  borderColor: string;
  children: React.ReactNode;
}) => (
  <View style={[styles.card, { borderLeftColor: borderColor }]}>
    <Text style={styles.cardTitle}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorTheme.WhiteF1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorTheme.WhiteF1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: ColorTheme.Primary,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    borderLeftWidth: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: ColorTheme.Primary,
  },
  subItem: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
  },
});

export default MyAppointmentDetails;
