import ColorTheme from "@/common/color.constant";
import { BoxShadow } from "@/common/style.comman";
import { Service } from "@/src/apis/model";
import { useScreen } from "@/src/contexts";
import { UseScreen } from "@/src/hooks/useScreen";
import { FlashList } from "@shopify/flash-list";
import React, { FC, useContext, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const services: Service[] = [
  {
    name: "Tẩy trắng răng",
    img: "https://nhakhoanhantam.com/stmresource/files/nieng-rang/nieng-rang-va-nhung-dieu-can-biet.jpg",
    url: "https://nhakhoanhantam.com/stmresource/files/nieng-rang/nieng-rang-va-nhung-dieu-can-biet.jpg",
  },
  {
    name: "Niềng răng chỉnh nha",
    img: "https://nhakhoanhantam.com/stmresource/files/nieng-rang/nieng-rang-va-nhung-dieu-can-biet.jpg",
    url: "https://nhakhoanhantam.com/stmresource/files/nieng-rang/nieng-rang-va-nhung-dieu-can-biet.jpg",
  },
  {
    name: "Cấy ghép Implant",
    img: "https://nhakhoanhantam.com/stmresource/files/nieng-rang/nieng-rang-va-nhung-dieu-can-biet.jpg",
    url: "https://nhakhoanhantam.com/stmresource/files/nieng-rang/nieng-rang-va-nhung-dieu-can-biet.jpg",
  },
  {
    name: "Trám răng thẩm mỹ",
    img: "https://nhakhoanhantam.com/stmresource/files/nieng-rang/nieng-rang-va-nhung-dieu-can-biet.jpg",
    url: "https://nhakhoanhantam.com/stmresource/files/nieng-rang/nieng-rang-va-nhung-dieu-can-biet.jpg",
  },
  {
    name: "Nhổ răng khôn",
    img: "https://nhakhoanhantam.com/stmresource/files/nieng-rang/nieng-rang-va-nhung-dieu-can-biet.jpg",
    url: "https://nhakhoanhantam.com/stmresource/files/nieng-rang/nieng-rang-va-nhung-dieu-can-biet.jpg",
  },
];
const ServiceHot = () => {
  const { isMobile } = useScreen();;
  return (
    <View>
      <FlashList
        data={services}
        renderItem={({ item }) => <FlashItem isMobile={isMobile} item={item} />}
        numColumns={isMobile ? 2 : 3}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        estimatedItemSize={200}
      />
    </View>
  );
};
const FlashItem: FC<{ isMobile: boolean; item: Service }> = ({
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
              ? ColorTheme.WhiteE
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
            src={item.img}
            style={{
              width: "100%",
              height: isMobile ? 150 : 200,
              objectFit: "cover",
              borderRadius: 10,
            }}
          />
          <View
            style={{
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color:  ColorTheme.Black,
              }}
            >
              {item.name}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ServiceHot;
