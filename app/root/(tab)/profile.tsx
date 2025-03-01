import ColorTheme from "@/common/color.constant";
import BottomSheetCustom from "@/components/bottom-sheet";
import ListTile from "@/components/list-tile";
import ChangePassword from "@/components/profile/change-password.profile";
import ContactSupport from "@/components/profile/contact.profile.";
import EnterReferralCode from "@/components/profile/enter-referral-code.profile";
import ProfileTile from "@/components/profile/profile-tile.profile";
import { ScreenContext } from "@/src/contexts/screen.context";
import { UseScreen } from "@/src/hooks/useScreen";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { Fragment, useCallback, useContext } from "react";
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

const ProfileScreen = () => {
  const { isMobile } = useContext<UseScreen>(ScreenContext);
  const router = useRouter();

  const logout = async () => {
    router.replace("/");
    ToastAndroid.show("Đã đăng xuất", ToastAndroid.LONG);
  };
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(ColorTheme.Primary);
      StatusBar.setBarStyle("light-content"); // Hoặc "light-content" nếu cần
    }, [])
  );
  return (
    <Fragment>
      <View
        style={{
          backgroundColor: ColorTheme.WhiteE,
          flex: 1,
          position: "relative",
        }}
      >
        <View
          style={{
            position: "absolute",
            width: "100%",
            bottom: 0,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 10,
            }}
          >
            Dentist App - Lastest 2025/03/02
          </Text>
        </View>
        {/* Thông tin tài khoản */}
        <ProfileTile
          user={{ name: "Trần Ngọc Anh Dũng", uid: 12345 }}
          onPress={(user) => {
            router.navigate("/root/profile/details-profile");
          }}
        />
        <ScrollView>
          {/* Thông tin hồ sơ */}
          <ListTile
            mx={isMobile ? 15 : 30}
            center={(color) => (
              <Text style={{ ...styles.TileCenterStyle, color: color }}>
                Thông tin hồ sơ
              </Text>
            )}
            leading={(color) => (
              <AntDesign
                name="filetext1"
                style={{ ...styles.TileIcon, color: color }}
              />
            )}
            suffix={(color) => (
              <AntDesign
                name="right"
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
                  <AntDesign
                    name="lock1"
                    style={{ ...styles.TileIcon, color: color }}
                  />
                )}
                suffix={(color) => (
                  <AntDesign
                    name="right"
                    style={{ ...styles.TileIcon, color: color }}
                  />
                )}
              />
            )}
            child={() => <ChangePassword />}
          />
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
              <AntDesign
                name="codepen"
                style={{ ...styles.TileIcon, color: color }}
              />
            )}
            suffix={(color) => (
              <AntDesign
                name="right"
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
                  <AntDesign
                    name="right"
                    style={{ ...styles.TileIcon, color: color }}
                  />
                )}
              />
            )}
            child={() => <EnterReferralCode />}
          />
          {/* Liên hệ tổng đài */}
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
                    Liên hệ tổng đài
                  </Text>
                )}
                leading={(color) => (
                  <AntDesign
                    name="phone"
                    style={{ ...styles.TileIcon, color: color }}
                  />
                )}
                suffix={(color) => (
                  <AntDesign
                    name="right"
                    style={{ ...styles.TileIcon, color: color }}
                  />
                )}
              />
            )}
            child={() => <ContactSupport />}
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
              <AntDesign
                name="logout"
                style={{ ...styles.TileIcon, color: color }}
              />
            )}
            suffix={(color) => (
              <AntDesign
                name="right"
                style={{ ...styles.TileIcon, color: color }}
              />
            )}
            onPress={logout}
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
