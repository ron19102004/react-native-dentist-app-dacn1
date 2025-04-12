import ColorTheme from "@/common/color.constant";
import { BoxShadow } from "@/common/style.comman";
import { DentalService } from "@/src/apis/model";
import { useRouter } from "expo-router";
import { FC, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const DentalServiceItem: FC<{ isMobile: boolean; item: DentalService }> = ({
  isMobile,
  item,
}) => {
  const [isPress, setIsPress] = useState<boolean>(false);
  const router = useRouter();

  const discountPercentage = Math.round(
    ((item.priceOrigin - item.priceCurrent) / item.priceOrigin) * 100
  );

  return (
    <View style={{ width: "100%", padding: 5 }}>
      <Pressable
        onPress={() => {
          router.navigate({
            pathname: "/root/patient/home/service/details/[details]",
            params: { details: item.slugify },
          });
        }}
        onPressIn={() => setIsPress(true)}
        onPressOut={() => setIsPress(false)}
      >
        <View
          style={{
            backgroundColor: isPress ? ColorTheme.WhiteE : ColorTheme.White,
            width: "100%",
            padding: 12,
            borderRadius: 12,
            ...BoxShadow({ color: ColorTheme.BlackB }),
          }}
        >
          <View style={styles.overlay}>
            <View>
              <Text style={{...styles.name}} numberOfLines={1}>{item.name}</Text>
              <View style={styles.metaColumn}>
                <Text style={styles.metaText}>
                  📅 {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                </Text>
                <Text style={{ ...styles.metaText }} numberOfLines={1}>
                  🔗 {item.slugify}
                </Text>
              </View>
            </View>

            <View>
              {item.priceOrigin > item.priceCurrent ? (
                <Text style={styles.discountNote}>
                  Đang giảm giá {discountPercentage}% 🔥
                </Text>
              ) : (
                <Text style={styles.discountNote}></Text>
              )}
              <View style={styles.priceContainer}>
                <Text style={styles.priceOrigin}>
                $ {item.priceOrigin.toLocaleString("vi-VN")}
                </Text>
                <Text style={styles.priceCurrent}>
                  💰 $ {item.priceCurrent.toLocaleString("vi-VN")} 
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
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
  overlay: {
    paddingVertical: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 8,
  },
  metaColumn: {
    flexDirection: "column",
    marginBottom: 8,
  },
  metaText: {
    fontSize: 13,
    color: "#6b7280",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },
  priceOrigin: {
    fontSize: 12,
    color: "#9ca3af",
    textDecorationLine: "line-through",
  },
  priceCurrent: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ef4444",
    backgroundColor: "#fee2e2",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountNote: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "500",
    color: "#16a34a",
  },
});
export default DentalServiceItem;
