import ColorTheme from "@/common/color.constant";
import React, { FC, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import WebView from "react-native-webview";
interface WebViewCustomProps {
  src: string;
}
const WebViewCustom: FC<WebViewCustomProps> = ({ src }) => {
  const [height, setHeight] = useState(1); // Khởi tạo chiều cao WebView
  const onMessage = (event: any) => {
    const { contentHeight } = JSON.parse(event.nativeEvent.data); // Nhận chiều cao từ WebView
    setHeight(contentHeight); // Cập nhật chiều cao
  };
  return (
    <WebView
      originWhitelist={["*"]}
      source={{
        html: `
        <html>
            <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                .prose img {
                width: 100%;
                height: auto;
                border-radius: 0.5rem;
                }
                .prose iframe {
                width: 100%;
                aspect-ratio: 16 / 9;
                border-radius: 0.5rem;
                }
            </style>
            </head>
            <body>
            <div class="prose">${src}</div>
            </body>
        </html>
        `,
      }}
      style={{ width: "100%", height: height, flex: 1 }}
      injectedJavaScript={`
            const metaTag = document.createElement('meta');
            metaTag.name = "viewport";
            metaTag.content = "width=device-width, initial-scale=1.0";
            document.head.appendChild(metaTag);(function() {
            const contentHeight = document.documentElement.scrollHeight; 
            // Tính chiều cao nội dung
            window.ReactNativeWebView.postMessage(JSON.stringify({ contentHeight })); // Gửi chiều cao
        })();`}
      onMessage={onMessage}
    />
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorTheme.WhiteF1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: ColorTheme.Primary,
  },
});
export default WebViewCustom;
