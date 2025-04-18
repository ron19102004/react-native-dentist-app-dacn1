import ColorTheme from "@/common/color.constant";
import { AccountInfoRole } from "@/src/apis/admin.api";
import { Role } from "@/src/apis/model.d";
import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

const RenderUser: FC<{
  user: AccountInfoRole | null;
  requireRole: Role | null;
}> = ({ user, requireRole }) => {
  if (requireRole) {
    if (requireRole === Role.DENTIST) {
      if (user?.role === Role.STAFF) {
        return (
          <View style={stylesRender.container}>
            <Text style={stylesRender.errorText}>
              Gmail không thuộc về bác sĩ
            </Text>
          </View>
        );
      }
    }
    if (requireRole === Role.STAFF) {
      if (user?.role === Role.DENTIST) {
        return (
          <View style={stylesRender.container}>
            <Text style={stylesRender.errorText}>
              Gmail không thuộc về nhân viên
            </Text>
          </View>
        );
      }
    }
  }
  return (
    <View style={stylesRender.container}>
      <InfoRow
        icon={<Feather name="user" size={18} color={ColorTheme.Primary} />}
        label="Họ tên"
        value={user?.fullName || "Không có"}
      />
      <InfoRow
        icon={<Feather name="at-sign" size={18} color={ColorTheme.Primary} />}
        label="Tên đăng nhập"
        value={user?.username || "Không có"}
      />
      {requireRole === Role.DENTIST && (
        <>
          <InfoRow
            icon={
              <FontAwesome5
                name="briefcase-medical"
                size={18}
                color={ColorTheme.Primary}
              />
            }
            label="Trạng thái làm việc"
            value={user?.dentist?.workStatus || "Chưa có"}
          />
          <InfoRow
            icon={
              <Feather
                name="activity"
                size={18}
                color={user?.dentist?.active ? "green" : "red"}
              />
            }
            label="Trạng thái hoạt động"
            value={user?.dentist?.active ? "Đang hoạt động" : "Không hoạt động"}
            valueColor={user?.dentist?.active ? "green" : "red"}
          />
          <InfoRow
            icon={
              <MaterialIcons
                name="update"
                size={18}
                color={ColorTheme.Primary}
              />
            }
            label="Cập nhật lần cuối"
            value={user?.dentist?.updatedAt || "Không rõ"}
          />
        </>
      )}
      {requireRole === Role.STAFF && (
        <>
          <InfoRow
            icon={
              <FontAwesome5
                name="briefcase-medical"
                size={18}
                color={ColorTheme.Primary}
              />
            }
            label="Trạng thái làm việc"
            value={user?.staff?.workStatus || "Chưa có"}
          />
          <InfoRow
            icon={
              <Feather
                name="activity"
                size={18}
                color={user?.staff?.active ? "green" : "red"}
              />
            }
            label="Trạng thái hoạt động"
            value={user?.staff?.active ? "Đang hoạt động" : "Không hoạt động"}
            valueColor={user?.staff?.active ? "green" : "red"}
          />
          <InfoRow
            icon={
              <MaterialIcons
                name="update"
                size={18}
                color={ColorTheme.Primary}
              />
            }
            label="Cập nhật lần cuối"
            value={user?.staff?.updatedAt || "Không rõ"}
          />
        </>
      )}
    </View>
  );
};

const InfoRow: FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  valueColor?: string;
}> = ({ icon, label, value, valueColor }) => (
  <View style={stylesRender.row}>
    <View style={stylesRender.icon}>{icon}</View>
    <View style={stylesRender.textGroup}>
      <Text style={stylesRender.label}>{label}</Text>
      <Text style={[stylesRender.value, valueColor && { color: valueColor }]}>
        {value}
      </Text>
    </View>
  </View>
);
const stylesRender = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: ColorTheme.White,
    borderRadius: 10,
    elevation: 3,
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    width: 30,
    alignItems: "center",
  },
  textGroup: {
    flex: 1,
    marginLeft: 8,
  },
  label: {
    fontWeight: "bold",
    color: ColorTheme.Black,
    fontSize: 14,
  },
  value: {
    fontSize: 16,
    color: ColorTheme.Black,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
  },
});

export default RenderUser;
