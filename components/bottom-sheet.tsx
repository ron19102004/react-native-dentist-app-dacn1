import React, { FC, Fragment, useCallback, useRef } from "react";
import { ViewStyle } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import ColorTheme from "@/common/color.constant";
import { BoxShadow } from "@/common/style.comman";

interface BottomSheetCustomProps {
  bottomSheetViewStyle?: ViewStyle;
  bottomSheetModalStyle?: ViewStyle;
  button: (
    bottomSheetModalRef: React.RefObject<BottomSheetModal>
  ) => React.ReactNode;
  child: (
    bottomSheetModalRef: React.RefObject<BottomSheetModal>
  ) => React.ReactNode;
}
const BottomSheetCustom: FC<BottomSheetCustomProps> = ({
  bottomSheetViewStyle = {},
  button,
  child,
  bottomSheetModalStyle = {},
}) => {
  const modalRef = useRef<BottomSheetModal>(null);
  const handleSheetChanges = useCallback(
    (index: number) => {
      console.log("handleSheetChanges", index);
    },
    [0]
  );
  return (
    <Fragment>
      {button(modalRef)}
      <BottomSheetModal
        ref={modalRef}
        onChange={handleSheetChanges}
        style={{ ...bottomSheetModalStyle, ...BoxShadow({}) }}
      >
        <BottomSheetView style={bottomSheetViewStyle}>
          {child(modalRef)}
        </BottomSheetView>
      </BottomSheetModal>
    </Fragment>
  );
};

export default BottomSheetCustom;
