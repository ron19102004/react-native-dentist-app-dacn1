import React, { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { FontAwesome, Entypo, MaterialIcons } from "@expo/vector-icons";
import { Role, SystemInfoData } from "@/src/apis/model.d";
import ColorTheme from "@/common/color.constant";
import ButtonCustom from "@/components/button";
import { useRouter } from "expo-router";
import useAdmin from "@/src/hooks/admin.hook";
import { useAuth } from "@/src/contexts";

const InfoItem = ({ icon, label, value, onPress }: any) => (
  <TouchableOpacity
    style={styles.infoCard}
    onPress={onPress}
    activeOpacity={onPress ? 0.6 : 1}
  >
    <View style={styles.infoRow}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const SystemAdminScreen = () => {
  const router = useRouter();
  const [systemInfo, setSystemInfoCurrent] = useState<SystemInfoData | null>(
    null
  );
  const [refreshing, setRefreshing] = useState(false);

  const { getSystemInfo } = useAdmin();
  const { userCurrent } = useAuth();

  const init = async () => {
    try {
      setRefreshing(true);
      const data = await getSystemInfo();
      if (data.code === 200) {
        setSystemInfoCurrent(data.data);
      }
    } finally {
      setRefreshing(false);
    }
  };
  useEffect(() => {
    init();
  }, []);
  const onRefresh = useCallback(async () => {
    init();
  }, []);
  if (!systemInfo) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={ColorTheme.Primary} />
        <Text style={styles.loadingText}>Đang tải thông tin...</Text>
      </View>
    );
  }
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>{systemInfo.systemName}</Text>
        <Text style={styles.version}>Phiên bản {systemInfo.systemVersion}</Text>
        <Text style={styles.description}>{systemInfo.systemDescription}</Text>
      </View>

      <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
      <InfoItem
        icon={<FontAwesome name="user" size={22} color="#4A90E2" />}
        label="Tác giả"
        value={systemInfo.systemAuthor}
      />
      <InfoItem
        icon={<Entypo name="email" size={22} color="#4A90E2" />}
        label="Email"
        value={systemInfo.systemAuthorEmail}
        onPress={() =>
          Linking.openURL(`mailto:${systemInfo.systemAuthorEmail}`)
        }
      />
      <InfoItem
        icon={<FontAwesome name="phone" size={22} color="#4A90E2" />}
        label="Điện thoại"
        value={systemInfo.systemAuthorPhone}
        onPress={() => Linking.openURL(`tel:${systemInfo.systemAuthorPhone}`)}
      />
      <InfoItem
        icon={<Entypo name="link" size={22} color="#4A90E2" />}
        label="Website"
        value="smilecare.vn"
        onPress={() => Linking.openURL(systemInfo.systemAuthorWebsite)}
      />
      <InfoItem
        icon={<Entypo name="location-pin" size={22} color="#4A90E2" />}
        label="Địa chỉ"
        value={systemInfo.systemAddress}
        onPress={() => Linking.openURL(systemInfo.systemMapURL)}
      />

      <Text style={styles.sectionTitle}>Mạng xã hội</Text>
      <View style={styles.socials}>
        <TouchableOpacity
          onPress={() => Linking.openURL(systemInfo.systemFacebookURL)}
        >
          <FontAwesome
            name="facebook"
            size={30}
            color="#4267B2"
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL(systemInfo.systemTwitterURL)}
        >
          <FontAwesome
            name="twitter"
            size={30}
            color="#1DA1F2"
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL(systemInfo.systemInstagramURL)}
        >
          <FontAwesome
            name="instagram"
            size={30}
            color="#C13584"
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL(systemInfo.systemLinkedinURL)}
        >
          <FontAwesome
            name="linkedin"
            size={30}
            color="#0077B5"
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>
      {userCurrent && userCurrent.role === Role.ADMIN && (
        <ButtonCustom
          title="Chỉnh sửa"
          onPress={async () => {
            router.navigate("/root/admin/system/edit");
          }}
          mt={15}
          mb={15}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: ColorTheme.Primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorTheme.WhiteF1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: ColorTheme.WhiteE,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0A0A0A",
    marginBottom: 6,
  },
  version: {
    fontSize: 15,
    color: "#666",
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 16,
    color: "#0A0A0A",
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 32,
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  label: {
    fontSize: 13,
    color: "#888",
  },
  value: {
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
  },
  socials: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  socialIcon: {
    marginHorizontal: 12,
  },
});

export default SystemAdminScreen;
