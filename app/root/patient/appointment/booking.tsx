import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Toast from "react-native-toast-message";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Select from "@/components/select";
import ButtonCustom from "@/components/button";
import ColorTheme from "@/common/color.constant";
import useAppointmentUser from "@/src/hooks/useAppointmentUser.hook";
import useDentist from "@/src/hooks/useDentist.hook";
import { DentistResponse } from "@/src/apis/model.d";
import { useRouter } from "expo-router";

const Booking = () => {
  const [dentistPageCurrent, setDentistPageCurrent] = useState<number>(1);
  const [dentists, setDentists] = useState<DentistResponse[]>([]);
  const [dentistSelected, setDentistSelected] =
    useState<DentistResponse | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [notes, setNotes] = useState<string>("");

  const { createAppointment } = useAppointmentUser();
  const { getDentists } = useDentist();
  const router = useRouter();

  const init = async () => {
    await getDentists(
      (data) => {
        setDentists(data);
      },
      () => {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: "Không thể tải danh sách bác sĩ",
        });
      },
      dentistPageCurrent,
      10
    );
  };

  const handleConfirmDate = (date: Date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const handleBooking = async () => {
    if (!dentistSelected || !selectedDate) {
      Toast.show({
        type: "error",
        text1: "Thiếu thông tin",
        text2: "Vui lòng chọn bác sĩ và ngày hẹn",
      });
      return;
    }

    const payload = {
      dentistId: dentistSelected.id,
      time: selectedDate.toISOString(),
      notes: notes || "Không có ghi chú",
    };

    await createAppointment(
      payload,
      () => {
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: "Đặt lịch thành công!",
        });
        router.back();
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

  useEffect(() => {
    init();
  }, [dentistPageCurrent]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>👨‍⚕️ Bác sĩ</Text>
        <View>
          <Select
            data={dentists}
            isSelected={(item) => dentistSelected?.email === item.email}
            onChange={(item) => setDentistSelected(item)}
            render={(item) => (
              <Text style={styles.selectText}>
                {item.fullName} - {item.email}
              </Text>
            )}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          {dentistPageCurrent > 1 ? (
            <View style={{ flex: 1 }}>
              <ButtonCustom
                color={ColorTheme.WhiteE}
                textColor={ColorTheme.Black}
                fontSize={10}
                title="⬅️ Quay lại"
                onPress={async () =>
                  setDentistPageCurrent((prev) => Math.max(1, prev - 1))
                }
              />
            </View>
          ) : null}

          {dentists.length === 10 && (
            <View style={{ flex: 1 }}>
              <ButtonCustom
                color={ColorTheme.WhiteE}
                textColor={ColorTheme.Black}
                fontSize={10}
                title="➕ Xem thêm"
                onPress={async () => setDentistPageCurrent((prev) => prev + 1)}
              />
            </View>
          )}
        </View>

        <Text style={styles.label}>📆 Ngày hẹn</Text>
        <ButtonCustom
          color={ColorTheme.WhiteE}
          fontSize={12}
          textColor={ColorTheme.Black}
          title={selectedDate ? selectedDate.toLocaleDateString() : "Chọn ngày"}
          onPress={async () => setShowDatePicker(true)}
          mt={10}
        />

        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={() => setShowDatePicker(false)}
          minimumDate={new Date()}
        />

        <Text style={styles.label}>📝 Ghi chú</Text>
        <TextInput
          placeholder="Nhập ghi chú cho lịch hẹn (nếu có)"
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
          style={styles.noteInput}
          textAlignVertical="top"
        />

        <ButtonCustom
          title="✅ Xác nhận đặt lịch"
          onPress={handleBooking}
          mt={30}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: ColorTheme.White,
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: ColorTheme.Primary,
    marginBottom: 24,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 8,
    color: ColorTheme.Black,
  },
  selectText: {
    color: ColorTheme.White,
    fontSize: 16,
  },
  noteInput: {
    borderColor: ColorTheme.Third,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    minHeight: 80,
  },
});

export default Booking;
