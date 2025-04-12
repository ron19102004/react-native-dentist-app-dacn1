import ColorTheme from "@/common/color.constant";
import { BoxShadow } from "@/common/style.comman";
import { DentalService } from "@/src/apis/model.d";
import { useScreen } from "@/src/contexts";
import useDentalService from "@/src/hooks/useDentalService.hook";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React, { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DentalServiceItem from "../patient/dental-service/dental-service-item";

const ServiceHot = () => {
  const { isMobile } = useScreen();
  const { getDentalServices } = useDentalService();
  const [dentalServices, setDentalServices] = useState<Array<DentalService>>(
    []
  );
  const [loading, setLoading] = useState(true);

  const init = async () => {
    setLoading(true);
    await getDentalServices(
      (data) => {
        setDentalServices(data);
      },
      (err) => {
        console.log(err);
      }
    );
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={ColorTheme.Primary} />
        <Text style={{ marginTop: 10, fontSize: 16 }}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <View>
      <FlashList
        data={dentalServices}
        renderItem={({ item }) => (
          <DentalServiceItem isMobile={isMobile} item={item} />
        )}
        numColumns={isMobile ? 2 : 3}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        estimatedItemSize={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
  },
});

export default ServiceHot;
