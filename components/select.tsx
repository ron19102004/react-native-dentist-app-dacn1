import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import ListView from "./list";
import ColorTheme from "@/common/color.constant";
interface SelectProps<T> {
  data: T[];
  onChange(item: T): void;
  isSelected(item:T): boolean;
  render(item: T, i?: number): React.ReactNode;
  horizontal?: boolean;
}
const Select = <T,>({
  data,
  onChange,
  isSelected,
  render,
  horizontal = true,
}: SelectProps<T>) => {
  return (
    <ScrollView horizontal={horizontal} style={styles.selectRow}>
      <ListView
        data={data}
        render={(t: T, i) => (
          <Pressable
            key={i}
            onPress={() => onChange(t)}
            style={[
              styles.item,
              isSelected(t) && { backgroundColor: ColorTheme.Primary },
            ]}
          >
            {render(t, i)}
          </Pressable>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  selectRow: {
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  item: {
    backgroundColor: ColorTheme.Black,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
  },
});

export default Select;
