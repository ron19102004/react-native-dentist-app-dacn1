import { Tabs } from "expo-router";
import React from "react";
import { screenOptionsCustom } from "../../(tab)/_layout";
import { useScreen } from "@/src/contexts";
import { View } from "react-native";
import ColorTheme from "@/common/color.constant";
import AdminTabs from "@/components/tabs/admin-bottom.tab";

const TabAdminLayout = () => {
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
          <AdminTabs {...props} />
        </View>
      )}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Trang chủ",
        }}
      />
      <Tabs.Screen
        name="system"
        options={{
          title: "Hệ thống",
        }}
      />
    </Tabs>
  );
};

export default TabAdminLayout;
