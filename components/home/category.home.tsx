import ColorTheme from "@/common/color.constant";
import { BoxShadow } from "@/common/style.comman";
import { useScreen } from "@/src/contexts";
import { useRouter } from "expo-router";
import React, { FC, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feather, MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";

interface Category {
  label: string;
  href: string;
  icon: JSX.Element;
}

const categories: Category[] = [
  {
    href: "/root/patient/home/service/all",
    label: "Dịch vụ",
    icon: <Feather name="briefcase" size={26} color={ColorTheme.Primary} />,
  },
  {
    href: "",
    label: "Ưu đãi",
    icon: <MaterialIcons name="local-offer" size={26} color={ColorTheme.Primary} />,
  },
  {
    href: "/root/patient/appointment/booking",
    label: "Đăt lịch hẹn",
    icon: <Ionicons name="calendar-outline" size={26} color={ColorTheme.Primary} />,
  },
  {
    href: "",
    label: "Tra cứu",
    icon: <Feather name="search" size={26} color={ColorTheme.Primary} />,
  },
  {
    href: "/root/my-appointment",
    label: "Hồ sơ",
    icon: <Ionicons name="document-text-outline" size={26} color={ColorTheme.Primary} />,
  },
  {
    href: "/root/patient/home/expertise/all",
    label: "Chuyên môn",
    icon: <FontAwesome5 name="stethoscope" size={24} color={ColorTheme.Primary} />,
  },
];

const CategoryHome = () => {
  const { isMobile } = useScreen();

  return (
    <View style={styles.container}>
      <FlashList
        data={categories}
        renderItem={({ item }) => <CategoryItem item={item} isMobile={isMobile} />}
        numColumns={isMobile ? 3 : 4}
        estimatedItemSize={100}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
};

const CategoryItem: FC<{ item: Category; isMobile: boolean }> = ({ item, isMobile }) => {
  const [isPressed, setIsPressed] = useState(false);
  const router = useRouter();

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      //@ts-ignore
      onPress={() => router.push(item.href)}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: pressed ? ColorTheme.Secondary : ColorTheme.White,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
      ]}
    >
      <View style={styles.icon}>{item.icon}</View>
      <Text style={[styles.label, { color: isPressed ? ColorTheme.White : "#333" }]}>
        {item.label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 12,
    margin: 6,
    ...BoxShadow({ color: ColorTheme.BlackB }),
  },
  icon: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default CategoryHome;
