import ColorTheme from "@/common/color.constant";
import { GetAppointmentResponse } from "@/src/apis/appointment-user.api";
import useAppointmentUser from "@/src/hooks/useAppointmentUser.hook";
import { FlashList } from "@shopify/flash-list";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
  RefreshControl,
} from "react-native";
import { AppointmentStatus } from "@/src/apis/model.d";
import { useRouter } from "expo-router";
import ButtonCustom from "@/components/button";
import BottomSheet from "@gorhom/bottom-sheet";
import BottomSheetCustom from "@/components/bottom-sheet";
import TextInputCustom from "@/components/input";
import Toast from "react-native-toast-message";

const MyAppointmentScreen = () => {
  const router = useRouter();
  const { getAppointments, cancelAppointment } = useAppointmentUser();
  const [appointments, setAppointments] = useState<GetAppointmentResponse[]>(
    []
  );
  const [loadErrorMessage, setLoadErrorMessage] = useState<string | null>(null);
  const [pageCurrent, setPageCurrent] = useState<number>(1);
  const [refreshing, setRefreshing] = useState(false);
  const noteCancelRef = useRef<string | null>(null);
  const [today] = useState<Date>(new Date());

  const init = async (page: number) => {
    await getAppointments(
      {
        page,
        size: 10,
      },
      (data) => {
        setAppointments(data);
        setPageCurrent(page);
      },
      (err) => setLoadErrorMessage(err)
    );
  };
  const cancelAppointmentHandler = async (id: number) => {
    if (!noteCancelRef.current) {
      Toast.show({
        type: "error", // 'success' | 'error' | 'info'
        text1: "Lỗi",
        text2: "Yêu cầu lý do",
      });
      return;
    }
    await cancelAppointment(
      id,
      noteCancelRef.current,
      () => {
        Toast.show({
          type: "success", // 'success' | 'error' | 'info'
          text1: "Thông báo",
          text2: "Hủy thành công",
        });
        init(pageCurrent);
      },
      (err) => {
        Toast.show({
          type: "error", // 'success' | 'error' | 'info'
          text1: "Lỗi",
          text2: err,
        });
      }
    );
    noteCancelRef.current = null;
  };
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await init(pageCurrent);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    init(1);
  }, []);

  if (loadErrorMessage) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={ColorTheme.Primary} />
        <Text style={styles.loadingText}>{loadErrorMessage}</Text>
      </View>
    );
  }
  const AppointmentCard = ({ item }: { item: GetAppointmentResponse }) => {
    const statusColor = getStatusColor(item.appointmentStatus);
    const targetDate = new Date(item.date);

    return (
      <Pressable
        onPress={() => {
          if (
            item.appointmentStatus === AppointmentStatus.CONFIRMED ||
            item.appointmentStatus === AppointmentStatus.FINISHED
          ) {
            router.navigate({
              pathname: "/root/patient/appointment/details/[details]",
              params: {
                details: item.id,
              },
            });
          }
        }}
      >
        <View
          style={[
            styles.card,
            { borderLeftWidth: 5, borderLeftColor: statusColor.color },
          ]}
        >
          <View style={styles.headerCard}>
            <MaterialIcons
              name="medical-services"
              size={22}
              color={ColorTheme.Primary}
              style={styles.iconHeader}
            />
            <Text style={styles.title}>
              Lịch hẹn #{item.id}{" "}
              {targetDate < today ? "(Thời gian đã qua)" : ""}
            </Text>
          </View>

          <View style={styles.bodyCard}>
            <View style={styles.row}>
              <FontAwesome5
                name="user-md"
                size={16}
                color={ColorTheme.Primary}
              />
              <Text style={styles.text}>Bác sĩ: {item.dentist.fullName}</Text>
            </View>

            <View style={styles.row}>
              <MaterialIcons
                name="email"
                size={16}
                color={ColorTheme.Primary}
              />
              <Text style={styles.text}>Email: {item.dentist.email}</Text>
            </View>

            <View style={styles.row}>
              <MaterialIcons
                name="event"
                size={16}
                color={ColorTheme.Primary}
              />
              <Text style={styles.text}>
                Thời gian: {item.date.split("-").reverse().join("-")}
              </Text>
            </View>

            <View style={styles.row}>
              <MaterialIcons name="info" size={16} color={ColorTheme.Primary} />
              <Text style={styles.text}>
                Ghi chú: {item.notes || "Không có ghi chú"}
              </Text>
            </View>
          </View>

          <View>
            {item.appointmentStatus === AppointmentStatus.WAITING &&
              targetDate > today && (
                <View>
                  <BottomSheetCustom
                    button={(ref) => (
                      <ButtonCustom
                        onPress={async () => {
                          ref.current?.present();
                        }}
                        title="Hủy cuộc hẹn"
                        color={ColorTheme.WhiteE}
                        textColor={ColorTheme.Black}
                        fontSize={12}
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
                            Bạn có chắc xác nhận hủy cuộc hẹn {item.id} không?
                          </Text>
                          <View style={{ marginBottom: 10 }}>
                            <TextInputCustom
                              label="Lý do"
                              onChangeText={(text) => {
                                noteCancelRef.current = text;
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
                              textColor={ColorTheme.White}
                              fontSize={12}
                            />
                            <ButtonCustom
                              mt={10}
                              onPress={async () => {
                                await cancelAppointmentHandler(item.id);
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
              )}
            <View style={styles.statusContainer}>
              <Text style={[styles.status, { color: statusColor.color }]}>
                {statusText(item.appointmentStatus)}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlashList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={appointments}
        renderItem={({ item }) => <AppointmentCard item={item} />}
        estimatedItemSize={100}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        ListFooterComponent={
          <View style={styles.footerButtons}>
            {pageCurrent > 1 && (
              <TouchableOpacity
                onPress={() => init(pageCurrent - 1)}
                style={[styles.button, { backgroundColor: "#6c757d" }]}
              >
                <Text style={styles.buttonText}>← Quay lại</Text>
              </TouchableOpacity>
            )}
            {appointments.length === 10 && (
              <TouchableOpacity
                onPress={() => init(pageCurrent + 1)}
                style={[styles.button, { backgroundColor: ColorTheme.Primary }]}
              >
                <Text style={styles.buttonText}>Xem thêm →</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
};

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

const getStatusColor = (status: AppointmentStatus) => {
  switch (status) {
    case AppointmentStatus.WAITING:
      return { color: "#FFA500" };
    case AppointmentStatus.FINISHED:
    case AppointmentStatus.CONFIRMED:
      return { color: "#28a745" };
    case AppointmentStatus.CANCELLED:
      return { color: "#dc3545" };
    default:
      return { color: "#6c757d" };
  }
};

const styles = StyleSheet.create({
  Title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: ColorTheme.White,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 5,
  },
  headerCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingBottom: 6,
  },
  iconHeader: {
    marginRight: 8,
  },
  bodyCard: {
    paddingVertical: 6,
    gap: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: ColorTheme.Primary,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    fontSize: 15,
    color: ColorTheme.Black,
  },
  statusContainer: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default MyAppointmentScreen;
