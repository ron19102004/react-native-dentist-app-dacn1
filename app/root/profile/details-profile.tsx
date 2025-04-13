import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import ColorTheme from "@/common/color.constant";
import { Gender, Role, User } from "@/src/apis/model.d";
import { useAuth } from "@/src/contexts";
import ButtonCustom from "@/components/button";
import { useRouter } from "expo-router";

const DetailsProfile = () => {
  const { userCurrent: mockUser } = useAuth();
  const router = useRouter();
  if (!mockUser) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={ColorTheme.Primary} />
        <Text style={styles.loadingText}>Đang tải thông tin...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.title}>🧑‍💼 Thông tin cá nhân</Text> */}

      <View style={styles.card}>
        <Info label="👤 Họ và tên" value={mockUser.fullName} />
        <Info label="📧 Email" value={mockUser.email} />
        <Info label="📱 Số điện thoại" value={mockUser.phone} />
        <Info label="👨‍💻 Tên đăng nhập" value={mockUser.username} />
        <Info
          label="⚧️ Giới tính"
          value={mockUser.gender === "MALE" ? "Nam" : "Nữ"}
        />
        <Info
          label="✅ Trạng thái"
          value={mockUser.active ? "Đang hoạt động" : "Vô hiệu hóa"}
        />
        <Info
          label="🛡️ Vai trò"
          value={mockUser.role === "ADMIN" ? "Quản trị viên" : "Người dùng"}
        />
        <Info
          label="📅 Ngày tạo"
          value={new Date(mockUser.createdAt).toLocaleString()}
        />
        <Info
          label="🕒 Cập nhật lần cuối"
          value={new Date(mockUser.updatedAt).toLocaleString()}
        />
      </View>
      <ButtonCustom
        title="Chỉnh sửa"
        onPress={async () => {
          router.navigate("/root/profile/edit-profile");
        }}
        mt={15}
        mb={15}
      />
    </ScrollView>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
    <View style={styles.separator} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorTheme.WhiteF1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: ColorTheme.Primary,
    marginBottom: 25,
    textAlign: "center",
  },
  card: {
    backgroundColor: ColorTheme.White,
    borderRadius: 16,
    padding: 24,
    shadowColor: ColorTheme.Black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  infoRow: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: ColorTheme.BlackC,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: ColorTheme.Black,
  },
  separator: {
    height: 1,
    backgroundColor: ColorTheme.WhiteE,
    marginTop: 12,
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
});

export default DetailsProfile;
