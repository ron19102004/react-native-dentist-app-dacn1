import ColorTheme from "@/common/color.constant";
import BottomSheetCustom from "@/components/bottom-sheet";
import ListTile from "@/components/list-tile";
import ChangePassword from "@/components/profile/change-password.profile";
import ContactSupport from "@/components/profile/contact.profile.";
import EnterReferralCode from "@/components/profile/enter-referral-code.profile";
import ProfileTile from "@/components/profile/profile-tile.profile";
import { UseScreen } from "@/src/hooks/useScreen";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { Fragment, useCallback, useContext, useEffect } from "react";
import * as Clipboard from "expo-clipboard";

import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  ToastAndroid,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import StatusBarCustom from "@/components/status-bar";
import { useAuth, useScreen } from "@/src/contexts";
import { Role } from "@/src/apis/model.d";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Toast from "react-native-toast-message";

const ProfileScreen = () => {
  const { isMobile } = useScreen();
  const router = useRouter();
  const {
    logout,
    userCurrent,
    statusFringerprint,
    updateFingerprintAuthStatus,
    fingerprintAuth,
  } = useAuth();
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      await logout();
    } catch (error) {
      Toast.show({
        text1: "Lỗi",
        text2: "Lỗi đăng xuất",
        type: "error",
      });
    }
  };
  return (
    <Fragment>
      <StatusBarCustom bg={ColorTheme.Primary} style="light-content" />
      <View
        style={{
          backgroundColor: ColorTheme.WhiteE,
          flex: 1,
          position: "relative",
        }}
      >
        {/* Thông tin tài khoản */}
        <ProfileTile
          onPress={(user) => {
            router.navigate("/root/profile/details-profile");
          }}
        />
        <ScrollView>
          {/* Thông tin hồ sơ */}
          <ListTile
            onPress={async () => {
              router.navigate("/root/profile/details-profile");
            }}
            mx={isMobile ? 15 : 30}
            center={(color) => (
              <Text style={{ ...styles.TileCenterStyle, color: color }}>
                Thông tin hồ sơ
              </Text>
            )}
            leading={(color) => (
              <Feather
                name="file"
                style={{ ...styles.TileIcon, color: color }}
              />
            )}
            suffix={(color) => (
              <MaterialIcons
                name="arrow-right"
                style={{ ...styles.TileIcon, color: color }}
              />
            )}
          />
          {/* Đổi mật khẩu */}
          <BottomSheetCustom
            bottomSheetModalStyle={{
              marginHorizontal: isMobile ? 10 : 50,
            }}
            bottomSheetViewStyle={{
              paddingVertical: 10,
              paddingHorizontal: 10,
              paddingBottom: 30,
            }}
            button={(ref) => (
              <ListTile
                mx={isMobile ? 15 : 30}
                onPress={async () => {
                  ref.current?.present();
                }}
                center={(color) => (
                  <Text style={{ ...styles.TileCenterStyle, color: color }}>
                    Đổi mật khẩu
                  </Text>
                )}
                leading={(color) => (
                  <Feather
                    name="lock"
                    style={{ ...styles.TileIcon, color: color }}
                  />
                )}
                suffix={(color) => (
                  <MaterialIcons
                    name="arrow-right"
                    style={{ ...styles.TileIcon, color: color }}
                  />
                )}
              />
            )}
            child={() => <ChangePassword />}
          />
          {/* Chuyển sang giao diện admin  */}
          {userCurrent && userCurrent.role === Role.ADMIN && (
            <ListTile
              onPress={async () => {
                router.navigate("/root/admin/dashboard");
              }}
              mx={isMobile ? 15 : 30}
              center={(color) => (
                <Text style={{ ...styles.TileCenterStyle, color: color }}>
                  Bộ điều khiển - ADMIN
                </Text>
              )}
              leading={(color) => (
                <Feather
                  name="package"
                  style={{ ...styles.TileIcon, color: color }}
                />
              )}
              suffix={(color) => (
                <MaterialIcons
                  name="arrow-right"
                  style={{ ...styles.TileIcon, color: color }}
                />
              )}
            />
          )}
          {/* Chuyển sang giao diện admin  */}
          {userCurrent && userCurrent.role === Role.DENTIST && (
            <ListTile
              onPress={async () => {
                router.navigate("/root/dentist/dashboard");
              }}
              mx={isMobile ? 15 : 30}
              center={(color) => (
                <Text style={{ ...styles.TileCenterStyle, color: color }}>
                  Bộ điều khiển - DENTIST
                </Text>
              )}
              leading={(color) => (
                <Feather
                  name="package"
                  style={{ ...styles.TileIcon, color: color }}
                />
              )}
              suffix={(color) => (
                <MaterialIcons
                  name="arrow-right"
                  style={{ ...styles.TileIcon, color: color }}
                />
              )}
            />
          )}
          {/* Chuyển sang giao diện staff  */}
          {userCurrent && userCurrent.role === Role.STAFF && (
            <ListTile
              onPress={async () => {
                router.navigate("/root/staff/dashboard");
              }}
              mx={isMobile ? 15 : 30}
              center={(color) => (
                <Text style={{ ...styles.TileCenterStyle, color: color }}>
                  Bộ điều khiển - STAFF
                </Text>
              )}
              leading={(color) => (
                <Feather
                  name="package"
                  style={{ ...styles.TileIcon, color: color }}
                />
              )}
              suffix={(color) => (
                <MaterialIcons
                  name="arrow-right"
                  style={{ ...styles.TileIcon, color: color }}
                />
              )}
            />
          )}
          {/* Sao chép mã giới thiệu */}
          <ListTile
            onPress={async () => {
              await Clipboard.setStringAsync("0392477615  ");
              ToastAndroid.show(
                "Đã sao chép mã giới thiệu!",
                ToastAndroid.CENTER
              );
            }}
            mx={isMobile ? 15 : 30}
            center={(color) => (
              <Text style={{ ...styles.TileCenterStyle, color: color }}>
                Sao chép mã giới thiệu
              </Text>
            )}
            leading={(color) => (
              <Feather
                name="codepen"
                style={{ ...styles.TileIcon, color: color }}
              />
            )}
            suffix={(color) => (
              <MaterialIcons
                name="arrow-right"
                style={{ ...styles.TileIcon, color: color }}
              />
            )}
          />
          {/* Nhập mã giới thiệu */}
          <BottomSheetCustom
            bottomSheetModalStyle={{
              marginHorizontal: isMobile ? 10 : 50,
            }}
            bottomSheetViewStyle={{
              paddingVertical: 10,
              paddingHorizontal: 10,
              paddingBottom: 30,
            }}
            button={(ref) => (
              <ListTile
                mx={isMobile ? 15 : 30}
                onPress={async () => {
                  ref.current?.present();
                }}
                center={(color) => (
                  <Text style={{ ...styles.TileCenterStyle, color: color }}>
                    Nhập mã giới thiệu
                  </Text>
                )}
                leading={(color) => (
                  <MaterialIcons
                    name="confirmation-number"
                    style={{ ...styles.TileIcon, color: color }}
                  />
                )}
                suffix={(color) => (
                  <MaterialIcons
                    name="arrow-right"
                    style={{ ...styles.TileIcon, color: color }}
                  />
                )}
              />
            )}
            child={() => <EnterReferralCode />}
          />
          {/* Trình duyệt */}
          <ListTile
            mx={isMobile ? 15 : 30}
            center={(color) => (
              <Text style={{ ...styles.TileCenterStyle, color: color }}>
                Trình duyệt
              </Text>
            )}
            leading={(color) => (
              <Feather
                name="globe"
                style={{ ...styles.TileIcon, color: color }}
              />
            )}
            suffix={(color) => (
              <MaterialIcons
                name="arrow-right"
                style={{ ...styles.TileIcon, color: color }}
              />
            )}
            onPress={async () => {
              router.navigate(
                `/browser/${encodeURIComponent("https://www.google.com/")}`
              );
            }}
          />
          {/* Thông tin hệ thống */}
          <ListTile
            mx={isMobile ? 15 : 30}
            center={(color) => (
              <Text style={{ ...styles.TileCenterStyle, color: color }}>
                Thông tin hệ thống
              </Text>
            )}
            leading={(color) => (
              <Feather
                name="info"
                style={{ ...styles.TileIcon, color: color }}
              />
            )}
            suffix={(color) => (
              <MaterialIcons
                name="arrow-right"
                style={{ ...styles.TileIcon, color: color }}
              />
            )}
            onPress={async () => {
              router.navigate("/root/profile/system-info");
            }}
          />
          {/* Sử dụng vân tay  */}
          <ListTile
            mx={isMobile ? 15 : 30}
            center={(color) => (
              <Text style={{ ...styles.TileCenterStyle, color: color }}>
                Xác thực vân tay :{" "}
                {statusFringerprint ? "Đang bật" : "Đang tắt"}
              </Text>
            )}
            leading={(color) => (
              <MaterialIcons
                name="fingerprint"
                style={{ ...styles.TileIcon, color: color }}
              />
            )}
            suffix={(color) => (
              <MaterialIcons
                name="arrow-right"
                style={{ ...styles.TileIcon, color: color }}
              />
            )}
            onPress={async () => {
              await fingerprintAuth(
                async () => {
                  await updateFingerprintAuthStatus(!statusFringerprint);
                },
                (err) => {
                  Toast.show({
                    type: "error", // 'success' | 'error' | 'info'
                    text1: "Lỗi",
                    text2: err,
                  });
                }
              );
            }}
          />
          {/* Đăng xuất */}
          <ListTile
            mx={isMobile ? 15 : 30}
            center={(color) => (
              <Text style={{ ...styles.TileCenterStyle, color: color }}>
                Đăng xuất
              </Text>
            )}
            leading={(color) => (
              <Feather
                name="log-out"
                style={{ ...styles.TileIcon, color: color }}
              />
            )}
            suffix={(color) => (
              <MaterialIcons
                name="arrow-right"
                style={{ ...styles.TileIcon, color: color }}
              />
            )}
            onPress={signOut}
          />
        </ScrollView>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  TileCenterStyle: {
    fontSize: 16,
    fontWeight: "500",
  },
  TileIcon: {
    fontSize: 16,
  },
});

export default ProfileScreen;
