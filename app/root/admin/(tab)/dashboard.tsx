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

interface ToolModel {
  icon: string;
  label: string;
  href: string;
}

const tools: ToolModel[] = [
  {
    href: "/root/admin/account/lock-acc",
    icon: "lock",
    label: "Khóa tài khoản",
  },
  {
    href: "/root/admin/account/unlock-acc",
    icon: "unlock",
    label: "Mở khóa tài khoản",
  },
  {
    href: "/root/admin/account/edit-staff",
    icon: "edit",
    label: "Chỉnh thông tin nhân viên",
  },
  {
    href: "/root/admin/account/edit-admin",
    icon: "edit",
    label: "Chỉnh thông tin bác sĩ",
  },
];

const DashboardAdminScreen = () => {
  const { isMobile } = useScreen();
  const router = useRouter();

  const renderToolItem = ({ item }: { item: ToolModel }) => (
    <TouchableOpacity
      style={styles.card}
      //@ts-ignore
      onPress={() => router.navigate(item.href)}
    >
      <Feather name={item.icon as any} size={28} color="#4A90E2" />
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🔧 Công cụ quản trị</Text>
      <FlashList
        contentContainerStyle={{}}
        data={tools}
        renderItem={renderToolItem}
        numColumns={isMobile ? 2 : 4}
        estimatedItemSize={100}
        ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
      />
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

export default DashboardAdminScreen;
