import ColorTheme from "@/common/color.constant";
import { BoxShadow } from "@/common/style.comman";
import DentalServiceItem from "@/components/patient/dental-service/dental-service-item";
import { DentalService } from "@/src/apis/model.d";
import { useScreen } from "@/src/contexts";
import useDentalService from "@/src/hooks/useDentalService.hook";
import { FlashList } from "@shopify/flash-list";
import React, { FC, useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

const AllServiceScreen = () => {
  const { isMobile } = useScreen();
  const { getDentalServices } = useDentalService();
  const [dentalServices, setDentalServices] = useState<Array<DentalService>>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState<number>(1);

  const { width } = useWindowDimensions();
  const numColumns = isMobile ? 2 : 3;
  const itemSpacing = 10;
  const itemWidth = (width - itemSpacing * (numColumns + 1)) / numColumns;

  const loadData = async (pageNum: number) => {
    setLoading(true);
    await getDentalServices(
      (data) => setDentalServices(data),
      (err) => console.log(err),
      pageNum
    );
    setLoading(false);
  };

  useEffect(() => {
    loadData(page);
  }, [page]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData(page);
    setRefreshing(false);
  }, [page]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={ColorTheme.Primary} />
        <Text style={{ marginTop: 10, fontSize: 16 }}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <FlashList
        data={dentalServices}
        renderItem={({ item }) => (
          <View style={{ width: itemWidth, margin: itemSpacing / 2 }}>
            <DentalServiceItem item={item} isMobile={isMobile} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        estimatedItemSize={200}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          padding: itemSpacing,
          paddingBottom: 80,
        }}
      />

      <View style={styles.paginationContainer}>
        {page > 1 && (
          <Pressable
            style={styles.button}
            onPress={() => setPage((prev) => prev - 1)}
          >
            <Text style={styles.buttonText}>⬅ Quay lại</Text>
          </Pressable>
        )}
        {dentalServices.length === 10 && (
          <Pressable
            style={styles.button}
            onPress={() => setPage((prev) => prev + 1)}
          >
            <Text style={styles.buttonText}>Xem thêm ➡</Text>
          </Pressable>
        )}
      </View>
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
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
  },
  button: {
    backgroundColor: ColorTheme.Primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
});

export default AllServiceScreen;
