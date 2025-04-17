import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import TextInputCustom from "@/components/input";
import ColorTheme from "@/common/color.constant";
import useStaff from "@/src/hooks/useStaff.hook";
import Toast from "react-native-toast-message";
import ButtonCustom from "@/components/button";
import { useRouter } from "expo-router";
import { PaymentMethod, toPaymentMethodViVN } from "@/src/apis/model.d";
import ListView from "@/components/list";
import Checkbox from "@/components/checkbox";

const ConfirmInvoice = () => {
  const { confirmInvoiceAppointment } = useStaff();
  const [appointmentId, setAppointmentId] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.CASH
  );
  const router = useRouter();
  const confirm = useCallback(async (id: number) => {
    if (id === 0) {
      Toast.show({
        type: "error", // 'success' | 'error' | 'info'
        text1: "Lỗi",
        text2: "Vui lòng nhập mã hồ sơ",
      });
      return;
    }
    await confirmInvoiceAppointment(
      id,
      paymentMethod,
      () => {
        Toast.show({
          type: "success", // 'success' | 'error' | 'info'
          text1: "Thông báo",
          text2: "Thanh toán thành công",
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
  }, []);
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
                setAppointmentId(value);
              }
            }}
          />
          <Text style={{ paddingHorizontal: 14, marginVertical: 10 }}>
            ♨️ Phương thức thanh toán
          </Text>
          <ListView
            data={Object.values(PaymentMethod)}
            render={(method) => (
              <Checkbox
                data={method}
                isSelected={(item) => paymentMethod === item}
                onChange={(item) => setPaymentMethod(item)}
                render={(item) => <Text>{toPaymentMethodViVN(item)}</Text>}
              />
            )}
          />
          <ButtonCustom
            mt={10}
            title="Tạo"
            onPress={async () => confirm(appointmentId)}
          />
        </View>
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

export default ConfirmInvoice;
