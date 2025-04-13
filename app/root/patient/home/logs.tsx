import React, { useCallback, useContext, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { NotificationContext } from "@/src/contexts/notification.context";
import { NotificationData } from "@/src/hooks/useNotification";
import { RefreshControl } from "react-native-gesture-handler";

const LogsScreen = () => {
  const { notificationData, loadNotification } =
    useContext(NotificationContext);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadNotification();
    setRefreshing(false);
  }, []);

  const renderItem = ({ item }: { item: NotificationData }) => (
    <View style={styles.item}>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.time}>{item.responseTime}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={notificationData}
        renderItem={renderItem}
        estimatedItemSize={80}
        keyExtractor={(item) => item.uuid}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  item: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    padding: 16,
  },
  message: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },
  time: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  separator: {
    height: 10,
  },
});

export default LogsScreen;
