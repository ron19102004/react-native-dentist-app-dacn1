import ColorTheme from "@/common/color.constant";
import React, { useCallback, useContext } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Images from "@/assets/images";
import PagerView from "react-native-pager-view";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { UseScreen } from "@/src/hooks/useScreen";
import { ScreenContext } from "@/src/contexts/screen.context";
import { BoxShadow } from "@/common/style.comman";
import HomeTabNav from "@/components/home/nav-tab.home";
import { useFocusEffect } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import CategoryHome from "@/components/home/category.home";
import ServiceHot from "@/components/home/service-hot.home";

const HomeScreen = () => {
  const progress = useSharedValue<number>(0);
  const { width, isMobile } = useContext<UseScreen>(ScreenContext);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(ColorTheme.White);
      StatusBar.setBarStyle("dark-content"); // Hoặc "light-content" nếu cần
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: ColorTheme.WhiteE }}>
      <HomeTabNav />
      <ScrollView style={{ flex: 1 }}>
        <Carousel
          style={{
            backgroundColor: ColorTheme.WhiteE,
          }}
          autoPlay={true}
          autoPlayInterval={5000}
          data={[Images.QC1, Images.QC2, Images.QC3]}
          loop={true}
          pagingEnabled={true}
          snapEnabled={true}
          height={isMobile ? width / 1.5 : width / 2}
          width={width}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.94,
            parallaxScrollingOffset: 50,
          }}
          onProgressChange={progress}
          renderItem={(props) => (
            <Image
              source={props.item}
              style={{
                width: width,
                height: isMobile ? width / 1.5 : width / 2,
                borderRadius: 30,
                objectFit: "cover",
                ...BoxShadow({ color: ColorTheme.Black, radius: 30 }),
              }}
            />
          )}
        />
        <View
          style={{
            ...styles.section,
            paddingHorizontal: isMobile ? 10 : 20,
            marginHorizontal: isMobile ? 10 : 20,
          }}
        >
          <Text
            style={{
              ...styles.title,
              fontSize: isMobile ? 18 : 22,
            }}
          >
            Danh mục
          </Text>
          <CategoryHome />
        </View>
        <View
          style={{
            ...styles.section,
            paddingHorizontal: isMobile ? 10 : 20,
            marginHorizontal: isMobile ? 10 : 20,
          }}
        >
          <Text
            style={{
              ...styles.title,
              fontSize: isMobile ? 18 : 22,
            }}
          >
            Dịch vụ hot
          </Text>
          <ServiceHot />
        </View>
        <View style={{ marginBottom: 20 }} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    backgroundColor: ColorTheme.Third,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  title: {
    color: ColorTheme.Primary,
    fontWeight: "bold",
  },
});

export default HomeScreen;
