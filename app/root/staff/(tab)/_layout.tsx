import { Tabs } from "expo-router";
import React from "react";
import { screenOptionsCustom } from "../../(tab)/_layout";
import { useScreen } from "@/src/contexts";
import { View } from "react-native";
import ColorTheme from "@/common/color.constant";
import AdminTabs from "@/components/tabs/admin-bottom.tab";
import DentistTabs from "@/components/tabs/dentist-bottom.tab";
import StaffTabs from "@/components/tabs/staff-bottom.tab";

const TabStaffLayout = () => {
  const { isMobile } = useScreen();

  return (
    <Tabs
      screenOptions={screenOptionsCustom}
      tabBar={(props) => (
        <View
          style={{
            padding: 10,
            paddingHorizontal: 10,
            backgroundColor: ColorTheme.WhiteE,
          }}
        >
          <StaffTabs {...props} />
        </View>
      )}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Bộ điều khiển",
          headerShown: true,
        }}
      />
    </Tabs>
  );
};

export default TabStaffLayout;
