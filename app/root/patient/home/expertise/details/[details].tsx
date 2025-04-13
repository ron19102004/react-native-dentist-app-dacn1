import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import WebView from "react-native-webview";
import useExpertise from "@/src/hooks/useExpertise.hook";
import ColorTheme from "@/common/color.constant";
import Toast from "react-native-toast-message";
import { Expertise } from "@/src/apis/model";
import WebViewCustom from "@/components/webview-custom";

const DetailsExpertiseScreen: React.FC = () => {
  const { getDetailsBySlug } = useExpertise();
  const { details } = useLocalSearchParams();
  const [expertise, setExpertise] = useState<Expertise | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter()
  const init = async (slug: string) => {
    setRefreshing(true);
    await getDetailsBySlug(
      slug,
      (data) => {
        setExpertise(data);
      },
      (err) => {
        Toast.show({
          type: "error",
          text1: "♨️ Chuyên môn",
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
  if (!expertise) {
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
      {/* Hình ảnh lớn */}
      <Image
        source={{ uri: expertise.image }}
        style={styles.image}
        blurRadius={1}
      />
      {/* Thẻ thông tin */}
      <View style={styles.card}>
        <InfoRow icon="hashtag" label="Tiêu đề" value={expertise.name} />
        <InfoRow icon="link" label="Slug" value={expertise.slugify} />
        {/* WebView để hiển thị HTML */}
        <WebViewCustom src={expertise.description} />
        <InfoRow
          icon="calendar"
          label="Ngày tạo"
          value={new Date(expertise.createdAt).toLocaleString()}
        />
        <InfoRow
          icon="refresh"
          label="Cập nhật"
          value={new Date(expertise.updatedAt).toLocaleString()}
        />
      </View>

      {/* Nút hành động */}
      <TouchableOpacity style={styles.button} onPress={()=>{
        router.navigate("/root/patient/appointment/booking")
      }}>
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

export default DetailsExpertiseScreen;

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
  image: {
    width: "100%",
    height: 250,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    objectFit: "cover",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginVertical: 16,
    textAlign: "center",
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
