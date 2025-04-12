import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import useExpertise from "@/src/hooks/useExpertise.hook";
import ColorTheme from "@/common/color.constant";
import { Expertise } from "@/src/apis/model";
import Toast from "react-native-toast-message";
import { FlashList } from "@shopify/flash-list";

const ExpertiseScreen = () => {
  const { getAllExpertise } = useExpertise();
  const [expertises, setExpertises] = useState<Expertise[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = async () => {
    try {
      await getAllExpertise(
        (data) => {
          setExpertises(data);
        },
        (err) => {
          Toast.show({
            type: "error",
            text1: "🚨 Lỗi",
            text2: err,
          });
        }
      );
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "🚨 Lỗi",
        text2: "Không thể tải danh sách chuyên môn",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }: { item: Expertise }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        router.navigate({
          pathname: "/root/patient/home/expertise/details/[details]",
          params: {
            details: item.slugify,
          },
        });
      }}
    >
      <Image source={{ uri: item.image }} style={styles.image} blurRadius={3}/>
      <View style={styles.overlay}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>
            📅 {new Date(item.createdAt).toLocaleDateString("vi-VN")}
          </Text>
          <Text style={styles.metaText}>🔗 {item.slugify}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={ColorTheme.Primary} />
        <Text style={{ marginTop: 10, fontSize: 16 }}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={expertises}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      />
    </View>
  );
};

export default ExpertiseScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e3a8a",
    padding: 16,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  desc: {
    fontSize: 14,
    color: "#4b5563",
    marginTop: 4,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 20,
    backgroundColor: "#fff",
    elevation: 0.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    shadowRadius: 6,
  },
  image: {
    width: "100%",
    height: 200,
    objectFit: "cover",
  },
  overlay: {
    padding: 12,
    backgroundColor: "#f9fafb",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaText: {
    fontSize: 13,
    color: "#6b7280",
  },
});
