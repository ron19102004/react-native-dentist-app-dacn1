import ColorTheme from "@/common/color.constant";
import { AppointmentDentistResponse } from "@/src/apis/appointment-dentist.api";
import { AppointmentStatus, User } from "@/src/apis/model.d";
import { useAuth } from "@/src/contexts";
import useAppointmentDentist from "@/src/hooks/useAppointmentDentist.hook";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ActivityIndicator,
  Pressable,
} from "react-native";

export const translateStatus = (status: AppointmentStatus) => {
  switch (status) {
    case AppointmentStatus.CONFIRMED:
      return { label: "✅ Đã xác nhận", color: "#34D399" }; // xanh lá
    case AppointmentStatus.FINISHED:
      return { label: "✅ Đã hoàn thành", color: "#34D399" }; // xanh lá
    case AppointmentStatus.CANCELLED:
      return { label: "❌ Đã hủy", color: "#F87171" }; // đỏ
    case AppointmentStatus.WAITING:
      return { label: "⏳ Chờ xác nhận", color: "#FBBF24" }; // vàng
    default:
      return { label: "❔ Không xác định", color: "#9CA3AF" }; // xám
  }
};

const AppointmentToday = () => {
  const { userCurrent } = useAuth();
  const { getAppointmentsToday } = useAppointmentDentist();
  const [appointmentsToday, setAppointmentsToday] = useState<
    AppointmentDentistResponse[]
  >([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const init = async (user: User) => {
    await getAppointmentsToday(
      user.id,
      (data) => {
        setAppointmentsToday(data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (userCurrent) {
      await init(userCurrent);
    }
    setRefreshing(false);
  }, [userCurrent]);

  useEffect(() => {
    if (userCurrent) {
      init(userCurrent);
    }
  }, [userCurrent]);

  const renderItem = ({ item }: { item: AppointmentDentistResponse }) => {
    const status = translateStatus(item.appointmentStatus);
    return (
      <Pressable
        onPress={() => {
          router.navigate({
            pathname: "/root/dentist/appointment/details/[details]",
            params: {
              details: item.id,
            },
          });
        }}
      >
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.name}>
              #ID{"["}
              {item.id}
              {"]"} - {item.patientResponseDto.fullName}
            </Text>
            <View
              style={[styles.statusBadge, { backgroundColor: status.color }]}
            >
              <Text style={styles.statusText}>{status.label}</Text>
            </View>
          </View>
          <Text style={styles.info}>📞 {item.patientResponseDto.phone}</Text>
          <Text style={styles.info}>📧 {item.patientResponseDto.email}</Text>
          <Text style={styles.info}>🗓 Ngày hẹn: {item.date}</Text>
          {item.notes ? <Text style={styles.note}>📝 {item.notes}</Text> : null}
        </View>
      </Pressable>
    );
  };

  if (refreshing && appointmentsToday.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={ColorTheme.Primary} />
        <Text style={styles.loadingText}>Đang tải dữ liệu ...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {appointmentsToday.length > 0 && (
        <Text
          style={{
            paddingTop: 20,
            paddingHorizontal: 20,
            fontSize: 20,
            fontWeight: "bold",
            color: ColorTheme.Primary,
          }}
        >
          🗓️ Số lượng lịch hẹn hôm nay: {appointmentsToday.length} hồ sơ
        </Text>
      )}
      <FlashList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={appointmentsToday}
        renderItem={renderItem}
        estimatedItemSize={100}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              🗓 Không có lịch hẹn nào hôm nay
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  info: {
    fontSize: 14,
    marginBottom: 2,
    color: "#374151",
  },
  note: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#6B7280",
    marginTop: 4,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
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
  empty: {
    marginTop: 32,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#9CA3AF",
  },
});

export default AppointmentToday;
