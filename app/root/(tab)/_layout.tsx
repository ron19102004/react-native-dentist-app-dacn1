import RootTabs from "@/components/tabs/root-bottom.tab";
import { RootScreen } from "@/common/screen.constant";
import { Tabs } from "expo-router";
import React, { useContext } from "react";
import { StatusBar, View } from "react-native";
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
  return (
    <Tabs
      screenOptions={screenOptionsCustom}
      tabBar={(props) => (
        <View
          style={{
            padding: 10,
            paddingHorizontal: isMobile ? 10 : 150,
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
        name={RootScreen.Booking}
        options={{
          title: "Đặt hẹn",
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
