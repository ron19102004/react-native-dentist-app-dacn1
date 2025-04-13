import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import ColorTheme from "@/common/color.constant";
import { DentalService } from "@/src/apis/model";
import WebViewCustom from "@/components/webview-custom";
import useDentalService from "@/src/hooks/useDentalService.hook";

const DetailsServiceScreen: React.FC = () => {
  const { getDentalServiceBySlug } = useDentalService();
  const { details } = useLocalSearchParams();
  const [service, setService] = useState<DentalService | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const init = async (slug: string) => {
    setRefreshing(true);
    await getDentalServiceBySlug(
      slug,
      (data) => {
        setService(data);
      },
      (err) => {
        Toast.show({
          type: "error",
          text1: "♨️ Dịch vụ",
          text2: err,
        });
      }
    );
    setRefreshing(false);
  };

  const onRefresh = useCallback(async () => {
    if (details) {
      init(details.toString());
    }
  }, []);

  useEffect(() => {
    if (details) {
      init(details.toString());
    }
  }, [details]);

  if (!service) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={ColorTheme.Primary} />
        <Text style={styles.loadingText}>Đang tải thông tin...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.card}>
        <InfoRow icon="hashtag" label="Tiêu đề" value={service.name} />
        <InfoRow icon="link" label="Slug" value={service.slugify} />

        {/* Hiển thị giá */}
        <View style={styles.priceBox}>
          <Text style={styles.priceLabel}>Giá gốc:</Text>
          <Text style={styles.priceOrigin}>
            $ {service.priceOrigin.toLocaleString("vi-VN")}
          </Text>
        </View>
        <View style={styles.priceBox}>
          <Text style={styles.priceLabel}>Giá hiện tại:</Text>
          <Text style={styles.priceCurrent}>
            $ {service.priceCurrent.toLocaleString("vi-VN")}
          </Text>
        </View>
        {service.discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{service.discount}%</Text>
          </View>
        )}

        {/* Mô tả HTML */}
        <WebViewCustom src={service.description} />

        <InfoRow
          icon="calendar"
          label="Ngày tạo"
          value={new Date(service.createdAt).toLocaleString()}
        />
        <InfoRow
          icon="refresh"
          label="Cập nhật"
          value={new Date(service.updatedAt).toLocaleString()}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.navigate("/root/patient/appointment/booking");
        }}
      >
        <FontAwesome name="calendar-check-o" size={20} color="#fff" />
        <Text style={styles.buttonText}>Đặt lịch khám</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => (
  <View style={styles.row}>
    <FontAwesome
      //@ts-ignore
      name={icon}
      size={18}
      color="#555"
      style={{ marginRight: 8 }}
    />
    <Text style={styles.label}>
      {label}: <Text style={styles.value}>{value}</Text>
    </Text>
  </View>
);

export default DetailsServiceScreen;

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 0.1,
    marginTop: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  value: {
    fontWeight: "normal",
    color: "#374151",
  },
  priceBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  priceOrigin: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "#9ca3af",
  },
  priceCurrent: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#dc2626",
  },
  discountBadge: {
    backgroundColor: "#dc2626",
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
    borderRadius: 6,
    marginTop: 6,
  },
  discountText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#2563eb",
    margin: 24,
    padding: 14,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    shadowColor: "#2563eb",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 1,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
