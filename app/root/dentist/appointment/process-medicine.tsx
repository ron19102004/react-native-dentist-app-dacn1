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
import {
  DentalService,
  Medicine,
  MedicineUsed,
  translateMedicineUnitToVietnamese,
  TreatmentRecordService,
} from "@/src/apis/model.d";
import ButtonCustom from "@/components/button";
import BottomSheetCustom from "@/components/bottom-sheet";
import useDentalService from "@/src/hooks/useDentalService.hook";
import { FlashList } from "@shopify/flash-list";
import ListView from "@/components/list";
import {
  AddDentalServiceToAppointmentData,
  AddMedicineToAppointmentData,
} from "@/src/apis/appointment-dentist.api";
import { Modal, TextInput } from "react-native";
import Toast from "react-native-toast-message";
import useMedicine from "@/src/hooks/useMedicine.hook";

const ProcessMedicine = () => {
  const { searchMedicine } = useMedicine();
  const [medicinesUsed, setMedicineUsed] = useState<MedicineUsed[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { getMedicineUsed, addMedicineAppointment, removeMedicine } =
    useAppointmentDentist();
  const [appointmentId, setAppointmentId] = useState<number | null>(null); // Nếu tìm thấy dentalService tức appointmentId hợp lệ
  const appointmentIdRef = useRef<number | null>(null);
  const [medicinesSearched, setMedicinesSearched] = useState<Medicine[]>([]);

  //Model for select
  const [selectedMedicineList, setSelectedMedicineList] = useState<
    AddMedicineToAppointmentData[]
  >([]);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null
  );
  const [guide, setGuide] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const loadMedicineByName = useCallback(
    debounce(async (name: string) => {
      await searchMedicine(
        (data) => {
          setMedicinesSearched(data);
        },
        (err) => {},
        {
          medicineName: name,
        }
      );
    }, 500),
    []
  );
  const loadMedicineUsed = useCallback(
    debounce(async (id: number) => {
      setAppointmentId(null);
      appointmentIdRef.current = id;
      await getMedicineUsed(
        appointmentIdRef.current,
        (data) => {
          setMedicineUsed(data);
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
      `Bạn có chắc muốn xóa ${selectedIds.length} thuốc đã chọn?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            if (appointmentId) {
              await removeMedicine(
                appointmentId,
                selectedIds,
                async () => {
                  setSelectedIds([]);
                  Toast.show({
                    type: "success", // 'success' | 'error' | 'info'
                    text1: "Thành công",
                    text2: "Xóa thành công ",
                  });
                  loadMedicineUsed(appointmentId);
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

  const handleAddMedicine = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setGuide("");
    setModalVisible(true);
  };
  const handleAddToMedicineUsed = async () => {
    if (selectedMedicineList.length === 0) {
      Toast.show({
        type: "error", // 'success' | 'error' | 'info'
        text1: "Lỗi",
        text2: "Vui lòng chọn thuốc",
      });
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
    await addMedicineAppointment(
      appointmentId,
      selectedMedicineList,
      () => {
        setSelectedMedicineList([]);
        loadMedicineUsed(appointmentId);
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

  return (
    <SafeAreaView style={styles.container}>
      <TextInputCustom
        label="🔎 Nhập mã cuộc hẹn"
        keyboardTypeOptions="numeric"
        onChangeText={(text) => {
          const id = parseInt(text);
          if (!isNaN(id)) {
            loadMedicineUsed(id);
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
              Thêm thuốc ID#{selectedMedicine?.id}
            </Text>
            <TextInputCustom
              label="Nhập hướng dẫn..."
              value={guide}
              keyboardTypeOptions="default"
              onChangeText={setGuide}
              icon="text-fields"
            />
            <TextInputCustom
              label="Nhập số lượng..."
              value={quantity.toString()}
              keyboardTypeOptions="numeric"
              onChangeText={(text) => {
                const quantity = parseInt(text);
                if (!isNaN(quantity)) {
                  setQuantity(quantity);
                }
              }}
              icon="numbers"
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
                  if (selectedMedicine) {
                    const item: AddMedicineToAppointmentData = {
                      guide: guide,
                      id: selectedMedicine.id,
                      quantity: quantity,
                    };
                    setSelectedMedicineList((prev) => [...prev, item]);
                  }
                  setModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <FlashList
        data={medicinesUsed}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MedicineUsedShow item={item} toggleSelect={toggleSelect} />
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
                    title="➕ Thêm thuốc"
                    onPress={async () => ref.current?.present()}
                  />
                )}
                child={() => (
                  <View style={{ paddingHorizontal: 12, marginBottom: 50 }}>
                    <TextInputCustom
                      label="🔎 Nhập tên thuốc"
                      keyboardTypeOptions="default"
                      onChangeText={async (text) => {
                        loadMedicineByName(text);
                      }}
                      icon="text-fields"
                    />
                    <ListView
                      data={medicinesSearched}
                      render={(medicine) => (
                        <TouchableOpacity
                          onPress={() => handleAddMedicine(medicine)}
                          style={styles.medicineItem}
                        >
                          <Text style={styles.medicineText}>
                            💊 ID#{medicine.id} - {medicine.name}
                          </Text>
                        </TouchableOpacity>
                      )}
                    />
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
                  📝 Thuốc đã chọn:
                </Text>
                <ListView
                  data={selectedMedicineList}
                  render={(item, idx) => {
                    const matchedService = medicinesSearched.find(
                      (s) => s.id === item.id
                    );
                    return (
                      <View key={idx} style={styles.serviceCard}>
                        <Text style={styles.medicineName}>
                          🦷 {matchedService?.name || `ID#${item.id}`}
                        </Text>
                        <Text style={styles.medicineNote}>
                          📌 Hướng dẫn: {item.guide || "(Không có hướng dẫn)"}
                        </Text>
                        <Text style={styles.medicineNote}>
                          📌 Số lượng: {item.quantity}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
              {selectedMedicineList.length > 0 && (
                <ButtonCustom
                  title="Thêm thuốc"
                  color={ColorTheme.BlackC}
                  fontSize={12}
                  onPress={async () => {
                    await handleAddToMedicineUsed();
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
const MedicineUsedShow: FC<{
  item: MedicineUsed;
  toggleSelect(id: number): void;
}> = ({ item, toggleSelect }) => {
  const [selected, setSelected] = useState(false);
  return (
    <TouchableOpacity
      style={[styles.itemContainer, selected && styles.itemSelected]}
      onPress={() => {
        toggleSelect(item.medicine.id);
        setSelected(!selected);
      }}
    >
      <Text style={styles.itemTitle}>{item.medicine.name}</Text>
      <Text style={styles.itemSub}>
        💰 Giá: {item.pricePerUnit.toLocaleString()} /{" "}
        {translateMedicineUnitToVietnamese(item.unit)}
      </Text>
      {item.guide && (
        <Text style={styles.itemSub}>📝 Hướng dẫn: {item.guide}</Text>
      )}
      {item.quantity && (
        <Text style={styles.itemSub}>📌 Số lượng: {item.quantity}</Text>
      )}
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
  medicineItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  medicineText: {
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

  medicineName: {
    fontWeight: "600",
    fontSize: 15,
    color: "#333",
  },

  medicineNote: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    fontStyle: "italic",
  },
});

export default ProcessMedicine;
