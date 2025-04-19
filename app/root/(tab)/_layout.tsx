import RootTabs from "@/components/tabs/root-bottom.tab";
import { RootScreen } from "@/common/screen.constant";
import { Tabs, useNavigation } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Keyboard, StatusBar, View } from "react-native";
import ColorTheme from "@/common/color.constant";
import { useScreen } from "@/src/contexts";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
export const screenOptionsCustom: BottomTabNavigationOptions = {
  headerShown: false,
  headerStyle: {
    shadowOpacity: 0, // Xóa bóng trên iOS
    elevation: 0, // Xóa bóng trên Android
    borderBottomWidth: 0, // Xóa viền dưới header,
  },
  tabBarStyle: {
    borderTopWidth: 0, // Xóa viền trên tab bar
    elevation: 0, // Xóa bóng trên Android
    shadowOpacity: 0, // Xóa bóng trên iOS
  },
  headerTitleStyle: {
    fontSize: 25,
    fontWeight: "bold",
    color: ColorTheme.Primary,
  },
};
const TabLayout = () => {
  const { isMobile } = useScreen();
  const [hideTabar, setHideTabar] = useState<boolean>(false);
  const navigation = useNavigation();

  // Ẩn tab bar khi bàn phím bật
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setHideTabar(true)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setHideTabar(false)
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [navigation]);
  return (
    <Tabs
      screenOptions={{ ...screenOptionsCustom }}
      tabBar={(props) => (
        <View
          style={{
            display: hideTabar ? "none" : "flex",
            padding: 10,
            paddingHorizontal: 10,
            backgroundColor: ColorTheme.WhiteE,
          }}
        >
          <RootTabs {...props} />
        </View>
      )}
    >
      <Tabs.Screen
        name={RootScreen.Home}
        options={{
          title: "Trang chủ",
        }}
      />
      <Tabs.Screen
        name={RootScreen.MyAppointment}
        options={{
          title: "Lịch hẹn của tôi",
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name={RootScreen.ChatBot}
        options={{
          title: "Chat bot",
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name={RootScreen.Profile}
        options={{
          title: "Cá nhân",
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
