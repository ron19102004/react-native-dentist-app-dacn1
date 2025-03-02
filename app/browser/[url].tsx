import { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  ToastAndroid,
  Text,
} from "react-native";
import { WebView } from "react-native-webview";
import { useLocalSearchParams, useRouter } from "expo-router";
import ColorTheme from "@/common/color.constant";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useScreen } from "@/src/contexts";
import useStack from "@/src/hooks/useStack";
import BottomSheetCustom from "@/components/bottom-sheet";
import { BoxShadow } from "@/common/style.comman";
import { ScrollView } from "react-native-gesture-handler";
import StatusBarCustom from "@/components/status-bar";
import { FlashList } from "@shopify/flash-list";
import ListTile from "@/components/list-tile";
import ListView from "@/components/list";
import { debounce } from "@/src/hooks/debounce";

const BrowserScreen = () => {
  const router = useRouter();
  const { width, isMobile } = useScreen();
  const { url } = useLocalSearchParams();
  const [urlCurrent, setUrlCurrent] = useState<string>(url.toString());
  const [urlInput, setUrlInput] = useState<string>(url.toString());

  const { push, pop, isEmpty, stack } = useStack<string>();
  // Hàm chuẩn hóa URL
  const formatUrl = (inputUrl: string): string => {
    const urlPattern = /^(https?:\/\/)/;
    if (!urlPattern.test(inputUrl)) {
      return `https://${inputUrl}`;
    }
    return inputUrl;
  };

  const back = () => {
    if (isEmpty()) {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/root");
      }
      return;
    }
    const urlPop = pop();
    if (urlPop) {
      setUrlCurrent(urlPop);
      setUrlInput(urlPop);
    }
  };
  const lastUrl = useRef<string>(url.toString());
  const enterUrl = (_urlInput: string) => {
    push(urlCurrent);
    const urlNew = formatUrl(_urlInput);
    lastUrl.current = urlNew;
    setUrlCurrent(urlNew);
    setUrlInput(urlNew);
  };
  //   Update URL
  const updateUrl = useCallback(
    debounce((newUrl: string) => {
      if (lastUrl.current !== newUrl) {
        push(lastUrl.current);
        lastUrl.current = newUrl;
        setUrlInput(newUrl);
        setUrlCurrent(newUrl);
      }
    }, 500),
    []
  );
  useEffect(() => {}, [urlCurrent]);
  return (
    <View style={styles.container}>
      <StatusBarCustom bg={ColorTheme.White} style="dark-content" />
      {/* WebView hiển thị URL */}
      <View style={{ flex: 1 }}>
        {urlCurrent ? (
          <WebView
            originWhitelist={["*"]}
            style={{ flex: 1 }}
            source={{ uri: urlCurrent }}
            startInLoadingState={true}
            renderLoading={() => (
              <ActivityIndicator size="large" color={ColorTheme.Primary} />
            )}
            onNavigationStateChange={(nav) => {
              updateUrl(nav.url);
            }}
          />
        ) : (
          <ActivityIndicator size="large" color={ColorTheme.Primary} />
        )}
      </View>

      {/* Thanh nhập URL */}
      <View
        style={{
          paddingHorizontal: isMobile ? 10 : 100,
          paddingVertical: 5,
          backgroundColor: ColorTheme.White,
        }}
      >
        <View
          style={{
            ...styles.inputContainer,
            backgroundColor: ColorTheme.WhiteE,
          }}
        >
          <AntDesign name="back" style={styles.backIcon} onPress={back} />
          <AntDesign
            name="home"
            style={styles.backIcon}
            onPress={() => {
              router.replace("/root");
            }}
          />
          <TextInput
            value={urlInput}
            onChangeText={setUrlInput}
            style={styles.textInput}
            keyboardType="url"
            returnKeyType="done"
            numberOfLines={1}
            onSubmitEditing={() => {
              enterUrl(urlInput);
            }}
          />
          <BottomSheetCustom
            bottomSheetModalStyle={{
              marginHorizontal: isMobile ? 10 : 50,
            }}
            bottomSheetViewStyle={{
              paddingVertical: 10,
              paddingHorizontal: 10,
              paddingBottom: 30,
            }}
            button={(ref) => (
              <Feather
                name="list"
                style={styles.backIcon}
                onPress={() => {
                  ref.current?.present();
                }}
              />
            )}
            child={(ref) => {
              return (
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 20,
                      paddingHorizontal: 15,
                    }}
                  >
                    Lịch sử trình duyệt
                  </Text>
                  <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    style={{
                      height: width,
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        height: "100%",
                      }}
                    >
                      <FlashList
                        keyExtractor={(item, index) => index.toString()}
                        estimatedItemSize={200}
                        numColumns={1}
                        data={[...stack].reverse()}
                        renderItem={(item) => {
                          console.log(item);
                          return (
                            <ListTile
                              onPress={async () => {
                                enterUrl(item.item);
                                ref.current?.close();
                              }}
                              leading={(color) => (
                                <Feather
                                  name="rotate-ccw"
                                  style={{ color: color }}
                                />
                              )}
                              suffix={(color) => (
                                <AntDesign
                                  name="right"
                                  style={{ color: color }}
                                />
                              )}
                              center={(color) => (
                                <View>
                                  <Text
                                    numberOfLines={2}
                                    ellipsizeMode="tail"
                                    style={{ color: color }}
                                  >
                                    {item.item}
                                  </Text>
                                </View>
                              )}
                            />
                          );
                        }}
                      />
                    </View>
                  </ScrollView>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
  },
  backIcon: {
    fontSize: 25,
    paddingHorizontal: 5,
  },
  textInput: {
    backgroundColor: ColorTheme.White,
    flex: 1,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 0.5,
    borderColor: ColorTheme.BlackC,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    paddingHorizontal: 15,
  },
});

export default BrowserScreen;
