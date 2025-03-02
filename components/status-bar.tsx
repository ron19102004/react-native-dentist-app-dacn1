import ColorTheme from "@/common/color.constant";
import { useFocusEffect } from "expo-router";
import React, { FC, Fragment, useCallback } from "react";
import { StatusBar } from "react-native";

interface StatusBarCustomProps{
    bg: ColorTheme,
    style:'dark-content'|'light-content'
}
const StatusBarCustom:FC<StatusBarCustomProps> = ({bg,style}) => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(bg);
      StatusBar.setBarStyle(style);
    }, [])
  );
  return <Fragment />;
};

export default StatusBarCustom;
