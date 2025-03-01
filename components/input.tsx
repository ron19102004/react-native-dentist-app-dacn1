import ColorTheme from "@/common/color.constant";
import React, { FC, HTMLAttributes, useState } from "react";
import {
  NativeSyntheticEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

interface TextInputCustomProps {
  label?: string;
  props?: TextInputProps;
  onChangeText?: ((text: string) => void) | undefined;
  onChange?:
    | ((e: NativeSyntheticEvent<TextInputChangeEventData>) => void)
    | undefined;
  error?: boolean;
  errorMsg?: string;
  icon:
    | "link"
    | "stepforward"
    | "stepbackward"
    | "forward"
    | "banckward"
    | "caretright"
    | "caretleft"
    | "caretdown"
    | "caretup"
    | "rightcircle"
    | "leftcircle"
    | "upcircle"
    | "downcircle"
    | "rightcircleo"
    | "leftcircleo"
    | "upcircleo"
    | "downcircleo"
    | "verticleleft"
    | "verticleright"
    | "back"
    | "retweet"
    | "shrink"
    | "arrowsalt"
    | "doubleright"
    | "doubleleft"
    | "arrowdown"
    | "arrowup"
    | "arrowright"
    | "arrowleft"
    | "down"
    | "up"
    | "right"
    | "left"
    | "minussquareo"
    | "minuscircle"
    | "minuscircleo"
    | "minus"
    | "pluscircleo"
    | "pluscircle"
    | "plus"
    | "infocirlce"
    | "infocirlceo"
    | "info"
    | "exclamation"
    | "exclamationcircle"
    | "exclamationcircleo"
    | "closecircle"
    | "closecircleo"
    | "checkcircle"
    | "checkcircleo"
    | "check"
    | "close"
    | "customerservice"
    | "creditcard"
    | "codesquareo"
    | "book"
    | "barschart"
    | "bars"
    | "question"
    | "questioncircle"
    | "questioncircleo"
    | "pause"
    | "pausecircle"
    | "pausecircleo"
    | "clockcircle"
    | "clockcircleo"
    | "swap"
    | "swapleft"
    | "swapright"
    | "plussquareo"
    | "frown"
    | "menufold"
    | "mail"
    | "areachart"
    | "linechart"
    | "home"
    | "laptop"
    | "star"
    | "staro"
    | "filter"
    | "meho"
    | "meh"
    | "shoppingcart"
    | "save"
    | "user"
    | "videocamera"
    | "totop"
    | "team"
    | "sharealt"
    | "setting"
    | "picture"
    | "phone"
    | "paperclip"
    | "notification"
    | "menuunfold"
    | "inbox"
    | "lock"
    | "qrcode"
    | "tags"
    | "tagso"
    | "cloudo"
    | "cloud"
    | "cloudupload"
    | "clouddownload"
    | "clouddownloado"
    | "clouduploado"
    | "enviroment"
    | "enviromento"
    | "eye"
    | "eyeo"
    | "camera"
    | "camerao"
    | "windows"
    | "export2"
    | "export"
    | "circledowno"
    | "circledown"
    | "hdd"
    | "ie"
    | "delete"
    | "enter"
    | "pushpino"
    | "pushpin"
    | "heart"
    | "hearto"
    | "smile-circle"
    | "smileo"
    | "frowno"
    | "calculator"
    | "chrome"
    | "github"
    | "iconfontdesktop"
    | "caretcircleoup"
    | "upload"
    | "download"
    | "piechart"
    | "lock1"
    | "unlock"
    | "windowso"
    | "dotchart"
    | "barchart"
    | "codesquare"
    | "plussquare"
    | "minussquare"
    | "closesquare"
    | "closesquareo"
    | "checksquare"
    | "checksquareo"
    | "fastbackward"
    | "fastforward"
    | "upsquare"
    | "downsquare"
    | "leftsquare"
    | "rightsquare"
    | "rightsquareo"
    | "leftsquareo"
    | "down-square-o"
    | "up-square-o"
    | "play"
    | "playcircleo"
    | "tag"
    | "tago"
    | "addfile"
    | "folder1"
    | "file1"
    | "switcher"
    | "addfolder"
    | "folderopen"
    | "search1"
    | "ellipsis1"
    | "calendar"
    | "filetext1"
    | "copy1"
    | "jpgfile1"
    | "pdffile1"
    | "exclefile1"
    | "pptfile1"
    | "unknowfile1"
    | "wordfile1"
    | "dingding"
    | "dingding-o"
    | "mobile1"
    | "tablet1"
    | "bells"
    | "disconnect"
    | "database"
    | "barcode"
    | "hourglass"
    | "key"
    | "flag"
    | "layout"
    | "printer"
    | "USB"
    | "skin"
    | "tool"
    | "car"
    | "addusergroup"
    | "carryout"
    | "deleteuser"
    | "deleteusergroup"
    | "man"
    | "isv"
    | "gift"
    | "idcard"
    | "medicinebox"
    | "redenvelopes"
    | "rest"
    | "Safety"
    | "wallet"
    | "woman"
    | "adduser"
    | "bank"
    | "Trophy"
    | "loading1"
    | "loading2"
    | "like2"
    | "dislike2"
    | "like1"
    | "dislike1"
    | "bulb1"
    | "rocket1"
    | "select1"
    | "apple1"
    | "apple-o"
    | "android1"
    | "android"
    | "aliwangwang-o1"
    | "aliwangwang"
    | "pay-circle1"
    | "pay-circle-o1"
    | "poweroff"
    | "trademark"
    | "find"
    | "copyright"
    | "sound"
    | "earth"
    | "wifi"
    | "sync"
    | "login"
    | "logout"
    | "reload1"
    | "message1"
    | "shake"
    | "API"
    | "appstore-o"
    | "appstore1"
    | "scan1"
    | "exception1"
    | "contacts"
    | "solution1"
    | "fork"
    | "edit"
    | "form"
    | "warning"
    | "table"
    | "profile"
    | "dashboard"
    | "indent-left"
    | "indent-right"
    | "menu-unfold"
    | "menu-fold"
    | "antdesign"
    | "alipay-square"
    | "codepen-circle"
    | "google"
    | "amazon"
    | "codepen"
    | "facebook-square"
    | "dropbox"
    | "googleplus"
    | "linkedin-square"
    | "medium-monogram"
    | "gitlab"
    | "medium-wordmark"
    | "QQ"
    | "skype"
    | "taobao-square"
    | "alipay-circle"
    | "youtube"
    | "wechat"
    | "twitter"
    | "weibo"
    | "HTML"
    | "taobao-circle"
    | "weibo-circle"
    | "weibo-square"
    | "CodeSandbox"
    | "aliyun"
    | "zhihu"
    | "behance"
    | "dribbble"
    | "dribbble-square"
    | "behance-square"
    | "file-markdown"
    | "instagram"
    | "yuque"
    | "slack"
    | "slack-square"
    | "anticon";
  isPassword?: boolean;
}
const TextInputCustom: FC<TextInputCustomProps> = ({
  props,
  label,
  onChangeText,
  error,
  errorMsg,
  icon,
  isPassword = false,
  onChange,
}) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [openPwd, setOpenPwd] = useState<boolean>(false);
  return (
    <View style={{ ...styles.ViewWrap }}>
      {label && (
        <Text
          style={{
            ...styles.Label,
            color: isFocus ? ColorTheme.Primary : ColorTheme.Black,
          }}
        >
          {label}
        </Text>
      )}
      <View style={{ position: "relative" }}>
        <AntDesign
          //@ts-ignore
          name={icon}
          style={{
            fontSize: 20,
            position: "absolute",
            top: 15,
            left: 10,
            color:
              error && error === true
                ? ColorTheme.Red
                : isFocus
                ? ColorTheme.Primary
                : ColorTheme.BlackB,
          }}
        />
        <View
          style={{
            position: "absolute",
            height: 22,
            width: 0.5,
            borderWidth: 0.5,
            borderColor:
              error && error === true
                ? ColorTheme.Red
                : isFocus
                ? ColorTheme.Primary
                : ColorTheme.BlackB,
            top: 15,
            left: 35,
          }}
        />
        <TextInput
          onChange={onChange}
          {...props}
          secureTextEntry={
            isPassword && isPassword === true && openPwd === false
          }
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChangeText={onChangeText}
          style={{
            ...styles.TextInput,
            borderColor:
              error && error === true
                ? ColorTheme.Red
                : isFocus
                ? ColorTheme.Primary
                : ColorTheme.BlackB,
            borderWidth: isFocus ? 1.5 : 1,
          }}
        />
        {isPassword === true &&
          (openPwd === true ? (
            <Pressable
              onPress={() => {
                setOpenPwd(false);
              }}
            >
              <AntDesign
                name="eye"
                style={{
                  fontSize: 20,
                  position: "absolute",
                  top: -35,
                  right: 10,
                  color:
                    error && error === true
                      ? ColorTheme.Red
                      : isFocus
                      ? ColorTheme.Primary
                      : ColorTheme.BlackB,
                }}
              />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                setOpenPwd(true);
              }}
            >
              <AntDesign
                name="eyeo"
                style={{
                  fontSize: 20,
                  position: "absolute",
                  top: -35,
                  right: 10,
                  color:
                    error && error === true
                      ? ColorTheme.Red
                      : isFocus
                      ? ColorTheme.Primary
                      : ColorTheme.BlackB,
                }}
              />
            </Pressable>
          ))}
      </View>
      {error && error === true && (
        <Text
          style={{
            ...styles.Label,
            color: ColorTheme.Red,
            fontSize: 10,
          }}
        >
          {errorMsg ?? "Error"}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ViewWrap: {
    paddingHorizontal: 15,
  },
  Label: {
    marginBottom: 4,
  },
  TextInput: {
    paddingLeft: 40,
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 15,
    borderRadius: 10,
  },
});

export default TextInputCustom;
