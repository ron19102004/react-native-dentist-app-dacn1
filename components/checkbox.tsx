import ColorTheme from "@/common/color.constant";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface CheckboxProps<T> {
  onChange(data: T): void;
  data: T;
  isSelected(data: T): boolean;
  render(data: T): React.ReactNode;
}
const Checkbox = <T,>({
  onChange,
  data,
  isSelected,
  render,
}: CheckboxProps<T>) => {
  return (
    <Pressable onPress={() => onChange(data)} style={styles.radioRow}>
      <View
        style={[
          styles.radioBox,
          isSelected(data) && { backgroundColor: ColorTheme.Primary },
        ]}
      />
      {render(data)}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  radioBox: {
    height: 20,
    width: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: ColorTheme.Primary,
    marginRight: 10,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});

export default Checkbox;
