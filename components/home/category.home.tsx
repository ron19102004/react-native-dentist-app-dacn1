import Images from "@/assets/images";
import ColorTheme from "@/common/color.constant";
import { BoxShadow } from "@/common/style.comman";
import { useScreen } from "@/src/contexts";
import { UseScreen } from "@/src/hooks/useScreen";
import { Feather } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import React, { FC, useContext, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface Category {
  label: string;
  img: any;
  href: string;
}
const categories: Category[] = [
  { href: "", img: Images.Service, label: "Dịch vụ" },
  { href: "", img: Images.OnSale, label: "Ưu đãi" },
  { href: "", img: Images.Schedule, label: "Lịch hẹn" },
  { href: "", img: Images.Search, label: "Tra cứu" },
  { href: "", img: Images.File, label: "Hồ sơ" },
];

const CategoryHome = () => {
  const { isMobile } = useScreen();;
  return (
    <View>
      <FlashList
        data={categories}
        renderItem={({ item }) => <FlashItem isMobile={isMobile} item={item} />}
        numColumns={isMobile ? 3 : 5}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        estimatedItemSize={200}
      />
    </View>
  );
};
const FlashItem: FC<{ isMobile: boolean; item: Category }> = ({
  isMobile,
  item,
}) => {
  const [isPress, setIsPress] = useState<boolean>(false);
  return (
    <View
      style={{
        width: "100%",
        padding: 5,
        backgroundColor: "transparent",
      }}
    >
      <Pressable
        onPress={() => {}}
        onPressIn={() => setIsPress(true)}
        onPressOut={() => setIsPress(false)}
      >
        <View
          style={{
            backgroundColor: isPress
              ? ColorTheme.Secondary
              : ColorTheme.WhiteF1,
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            borderRadius: 10,
            ...BoxShadow({}),
          }}
        >
          <Image
            source={item.img}
            style={{
              width: isMobile ? 40 : 50,
              height: isMobile ? 40 : 50,
              objectFit: "cover",
            }}
          />
          <Text
            style={{
              fontSize: 15,
              color: isPress ? ColorTheme.White : ColorTheme.Black,
            }}
          >
            {item.label}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CategoryHome;
