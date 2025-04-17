import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useScreen } from "@/src/contexts";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";

interface ToolModel {
  icon: string;
  label: string;
  href: string;
}

const tools: ToolModel[] = [
  {
    href: "/root/staff/appointment/create-invoice",
    icon: "credit-card",
    label: "Tạo hóa đơn",
  },
  {
    href: "/root/staff/appointment/confirm-invoice",
    icon: "check-circle",
    label: "Xác nhận thanh toán",
  },
];

const DashboardStaffScreen = () => {
  const { isMobile } = useScreen();
  const router = useRouter();

  const renderToolItem = ({ item }: { item: ToolModel }) => (
    <TouchableOpacity
      style={styles.card}
      //@ts-ignore
      onPress={() => router.navigate(item.href)}
    >
      {/* item.icon as any */}
      <Feather name={item.icon as any} size={28} color="#4A90E2" />
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>🔧 Công cụ quản lý</Text>
        <FlashList
          contentContainerStyle={{}}
          data={tools}
          renderItem={renderToolItem}
          numColumns={isMobile ? 1 : 2}
          estimatedItemSize={100}
          ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  grid: {
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
    elevation: 1,
  },
  label: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
});

export default DashboardStaffScreen;
