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
import { BoxShadow } from "@/common/style.comman";
import HomeTabNav from "@/components/home/nav-tab.home";
import { useFocusEffect } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import CategoryHome from "@/components/home/category.home";
import ServiceHot from "@/components/home/service-hot.home";
import StatusBarCustom from "@/components/status-bar";
import { useScreen } from "@/src/contexts";

const HomeScreen = () => {
  const progress = useSharedValue<number>(0);
  const { width, isMobile } = useScreen();

  return (
    <View style={{ flex: 1, backgroundColor: ColorTheme.WhiteE }}>
      <StatusBarCustom bg={ColorTheme.White} style="dark-content" />
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
            parallaxScrollingScale: 0.9,
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
        {/* Danh mục */}
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
        {/* Dịch vụ hot */}
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
            Dịch vụ
          </Text>
          <ServiceHot />
        </View>
        <View style={{ marginBottom: 5 }} />
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
    backgroundColor: ColorTheme.White,
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
