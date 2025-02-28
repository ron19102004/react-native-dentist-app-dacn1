import RootTabs from "@/components/tabs/root.tab";
import { RootScreen } from "@/common/screen.constant";
import { Tabs } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <Tabs
      tabBar={(props) => <RootTabs {...props} />}
    >
      <Tabs.Screen
        name={RootScreen.Home}
        options={{
          title: "Trang chủ",
        }}
      />
      <Tabs.Screen
        name={RootScreen.Profile}
        options={{
          title: "Trang cá nhân",
        }}
      />
    </Tabs>
  );
};

export default RootLayout;
