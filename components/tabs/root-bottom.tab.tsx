import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { FC, HTMLAttributes } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import ColorTheme from "@/common/color.constant";
import { RootScreen } from "@/common/screen.constant";

const RootTabs: FC<BottomTabBarProps> = ({
  descriptors,
  state,
  navigation,
}) => {
  return (
    <View style={styles.Tabs}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const label = options.title ?? route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };
        return (
          <Pressable key={route.key} onPress={onPress}>
            <View style={{ ...styles.Tab }}>
              <TabIcon routeName={route.name} isFocused={isFocused} />
              <Text
                style={{
                  ...styles.TabLabel,
                  color: isFocused ? ColorTheme.Primary : ColorTheme.Black,
                  fontWeight: isFocused ? "bold" : "normal",
                }}
              >
                {label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};
const TabIcon: FC<{ routeName: string; isFocused: boolean }> = ({
  routeName,
  isFocused,
}) => {
  const style: StyleProp<TextStyle> = {
    ...styles.TabIcon,
    color: isFocused ? ColorTheme.Primary : ColorTheme.Black,
    fontWeight: isFocused ? "bold" : "normal",
  };
  switch (routeName) {
    case RootScreen.Home: {
      return <AntDesign name="home" style={style} />;
    }
    case RootScreen.Profile: {
      return <AntDesign name="user" style={style} />;
    }
    case RootScreen.Booking: {
      return <Feather name="calendar" style={style} />;
    }
    default: {
      throw new Error(routeName + " not found");
    }
  }
};
const styles = StyleSheet.create({
  Tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: ColorTheme.White,
    paddingVertical: 10,
    borderRadius: 10,
  },
  Tab: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  TabLabel: {
    fontSize: 10,
  },
  TabIcon: {
    fontSize: 22,
  },
});

export default RootTabs;
