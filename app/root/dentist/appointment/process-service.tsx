import React, {
  FC,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import TextInputCustom from "@/components/input";
import ColorTheme from "@/common/color.constant";
import { debounce } from "@/src/hooks/debounce";
import useAppointmentDentist from "@/src/hooks/useAppointmentDentist.hook";
import { DentalService, TreatmentRecordService } from "@/src/apis/model.d";
import ButtonCustom from "@/components/button";
import BottomSheetCustom from "@/components/bottom-sheet";
import useDentalService from "@/src/hooks/useDentalService.hook";
import { FlashList } from "@shopify/flash-list";
import ListView from "@/components/list";
import { AddDentalServiceToAppointmentData } from "@/src/apis/appointment-dentist.api";
import { Modal, TextInput } from "react-native";
import Toast from "react-native-toast-message";

const ProcessService = () => {
  const [pageDentalServiceCurrent, setPageDentalServiceCurrent] =
    useState<number>(1);
  const { getDentalServices } = useDentalService();
  const [services, setServices] = useState<TreatmentRecordService[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const {
    getTreatmentRecordServices,
    addDentalServiceAppointment,
    removeSerivce,
  } = useAppointmentDentist();
  const [appointmentId, setAppointmentId] = useState<number | null>(null); // Nếu tìm thấy dentalService tức appointmentId hợp lệ
  const appointmentIdRef = useRef<number | null>(null);
  const [dentalService, setDentalService] = useState<DentalService[]>([]);

  //Model for select service
  const [selectedServiceList, setSelectedServiceList] = useState<
    AddDentalServiceToAppointmentData[]
  >([]);
  const [selectedService, setSelectedService] = useState<DentalService | null>(
    null
  );
  const [note, setNote] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const loadDentalService = useCallback(async (page: number) => {
    await getDentalServices(
      (data) => setDentalService(data),
      (err) => console.error(err),
      page
    );
  }, []);

  const loadTreatmentRecordService = useCallback(
    debounce(async (id: number) => {
      setAppointmentId(null);
      appointmentIdRef.current = id;
      await getTreatmentRecordServices(
        appointmentIdRef.current,
        (data) => {
          setServices(data);
          setSelectedIds([]);
          setAppointmentId(appointmentIdRef.current);
        },
        (err) => {
          Toast.show({
            type: "error", // 'success' | 'error' | 'info'
            text1: "Lỗi",
            text2: err,
          });
        }
      );
    }, 500),
    []
  );

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    Alert.alert(
      "Xác nhận",
      `Bạn có chắc muốn xóa ${selectedIds.length} dịch vụ đã chọn?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            if (appointmentId) {
              await removeSerivce(
                appointmentId,
                selectedIds,
                async () => {
                  setSelectedIds([]);
                  Toast.show({
                    type: "success", // 'success' | 'error' | 'info'
                    text1: "Thành công",
                    text2: "Xóa thành công ",
                  });
                  await loadTreatmentRecordService(appointmentId);
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
          },
        },
      ]
    );
  };

  const handleAddService = (service: DentalService) => {
    setSelectedService(service);
    setNote("");
    setModalVisible(true);
  };
  const handleAddDentalService = async () => {
    if (selectedServiceList.length === 0) {
      return;
    }
    if (!appointmentId) {
      Toast.show({
        type: "error", // 'success' | 'error' | 'info'
        text1: "Lỗi",
        text2: "Vui lòng nhập mã cuộc hẹn hợp lệ",
      });
      return;
    }
    await addDentalServiceAppointment(
      appointmentId,
      selectedServiceList,
      () => {
        setSelectedServiceList([]);
        loadTreatmentRecordService(appointmentId);
        Toast.show({
          type: "success", // 'success' | 'error' | 'info'
          text1: "Thành công",
          text2: "Thêm thành công ",
        });
      },
      (err) => {
        Toast.show({
          type: "error", // 'success' | 'error' | 'info'
          text1: "Lỗi",
          text2: err,
        });
      }
    );
  };

  useEffect(() => {
    loadDentalService(pageDentalServiceCurrent);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TextInputCustom
        label="🔎 Nhập mã cuộc hẹn"
        keyboardTypeOptions="numeric"
        onChangeText={(text) => {
          const id = parseInt(text);
          if (!isNaN(id)) {
            loadTreatmentRecordService(id);
          }
        }}
        icon="numbers"
      />

      <View style={{ height: 14 }} />

      {/* Model for add service  */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Thêm dịch vụ ID#{selectedService?.id}
            </Text>
            <TextInput
              placeholder="Nhập ghi chú..."
              value={note}
              onChangeText={setNote}
              style={styles.textInput}
            />
            <View style={{ flexDirection: "row", marginTop: 16 }}>
              <ButtonCustom
                flex={1}
                title="Hủy"
                color="#ccc"
                onPress={async () => setModalVisible(false)}
              />
              <View style={{ width: 10 }} />
              <ButtonCustom
                flex={1}
                title="Thêm"
                onPress={async () => {
                  if (selectedService) {
                    const item: AddDentalServiceToAppointmentData = {
                      id: selectedService.id,
                      note,
                    };
                    setSelectedServiceList((prev) => [...prev, item]);
                  }
                  setModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <FlashList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <DentistServiceShow item={item} toggleSelect={toggleSelect} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không có dữ liệu.</Text>
        }
        ListFooterComponent={
          selectedIds.length > 0 ? (
            <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
              <Text style={styles.deleteText}>🗑 Xóa các mục đã chọn</Text>
            </TouchableOpacity>
          ) : (
            <Fragment>
              <BottomSheetCustom
                bottomSheetViewStyle={{ paddingTop: 10 }}
                button={(ref) => (
                  <ButtonCustom
                    title="➕ Thêm dịch vụ"
                    onPress={async () => ref.current?.present()}
                  />
                )}
                child={() => (
                  <View style={{ paddingHorizontal: 12, marginBottom: 50 }}>
                    <ListView
                      data={dentalService}
                      render={(service) => (
                        <TouchableOpacity
                          onPress={() => handleAddService(service)}
                          style={styles.serviceItem}
                        >
                          <Text style={styles.serviceText}>
                            🦷 ID#{service.id} - {service.name}
                          </Text>
                        </TouchableOpacity>
                      )}
                    />
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                      {pageDentalServiceCurrent > 1 && (
                        <ButtonCustom
                          title="Quay lại"
                          color={ColorTheme.BlackC}
                          fontSize={12}
                          onPress={async () => {
                            const newValue = pageDentalServiceCurrent - 1;
                            setPageDentalServiceCurrent(newValue);
                            await loadDentalService(newValue);
                          }}
                          flex={1}
                        />
                      )}
                      {dentalService.length === 10 && (
                        <ButtonCustom
                          title="Xem thêm"
                          color={ColorTheme.BlackC}
                          fontSize={12}
                          onPress={async () => {
                            const newValue = pageDentalServiceCurrent + 1;
                            setPageDentalServiceCurrent(newValue);
                            await loadDentalService(newValue);
                          }}
                          flex={1}
                        />
                      )}
                    </View>
                  </View>
                )}
                bottomSheetModalStyle={{
                  marginHorizontal: 10,
                }}
              />
              <View style={{ marginTop: 20, marginHorizontal: 14 }}>
                <Text
                  style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8 }}
                >
                  📝 Dịch vụ đã chọn:
                </Text>
                <ListView
                  data={selectedServiceList}
                  render={(item, idx) => {
                    const matchedService = dentalService.find(
                      (s) => s.id === item.id
                    );
                    return (
                      <View key={idx} style={styles.serviceCard}>
                        <Text style={styles.serviceName}>
                          🦷 {matchedService?.name || `ID#${item.id}`}
                        </Text>
                        <Text style={styles.serviceNote}>
                          📌 Ghi chú: {item.note || "(Không có ghi chú)"}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
              {selectedServiceList.length > 0 && (
                <ButtonCustom
                  title="Thêm dịch vụ"
                  color={ColorTheme.BlackC}
                  fontSize={12}
                  onPress={async () => {
                    await handleAddDentalService();
                  }}
                />
              )}
            </Fragment>
          )
        }
      />
    </SafeAreaView>
  );
};
const DentistServiceShow: FC<{
  item: TreatmentRecordService;
  toggleSelect(id: number): void;
}> = ({ item, toggleSelect }) => {
  const [selected, setSelected] = useState(false);
  return (
    <TouchableOpacity
      style={[styles.itemContainer, selected && styles.itemSelected]}
      onPress={() => {
        toggleSelect(item.dentalService.id);
        setSelected(!selected);
      }}
    >
      <Text style={styles.itemTitle}>{item.dentalService.name}</Text>
      <Text style={styles.itemSub}>
        💰 Giá: {item.priceCurrent.toLocaleString()} VNĐ
      </Text>
      {item.note && <Text style={styles.itemSub}>📝 Ghi chú: {item.note}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorTheme.WhiteE,
    flex: 1,
    padding: 16,
  },
  deleteBtn: {
    backgroundColor: "#e53935",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 16,
    marginHorizontal: 14,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    marginHorizontal: 14,
    borderLeftWidth: 5,
    borderLeftColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 0.1,
  },
  itemSelected: {
    backgroundColor: "#e3f2fd",
    borderLeftColor: "red",
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#212121",
  },
  itemSub: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 30,
    fontSize: 16,
  },
  serviceItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  serviceText: {
    fontSize: 15,
    color: "#333",
    padding: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "85%",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    fontSize: 16,
  },
  serviceCard: {
    backgroundColor: "#f0f8ff", // nhẹ nhàng, sáng
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#4f9deb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Android shadow
  },

  serviceName: {
    fontWeight: "600",
    fontSize: 15,
    color: "#333",
  },

  serviceNote: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    fontStyle: "italic",
  },
});

export default ProcessService;
