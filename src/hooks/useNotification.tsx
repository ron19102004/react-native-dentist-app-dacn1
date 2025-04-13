import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import * as Notifications from "expo-notifications";
import { API_HOST_NAME } from "../constants/api.constant";

export interface NotificationContextType {
  socket: WebSocket | null;
  showNotification: (title: string, body: string) => Promise<void>;
}
const useNotification = (): NotificationContextType => {
  const socket = useRef<WebSocket | null>(null);

  const { isAuthenticated, token, isLoading } = useContext(AuthContext);

  const showNotification = async (title: string, body: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        sound: "default",
      },
      trigger: null, // Hiện ngay
    });
  };
  useEffect(() => {
    const connectSocket = async () => {
      if (!isLoading && isAuthenticated && token && token.length > 0) {
        socket.current = new WebSocket(
          `ws://${API_HOST_NAME}/notification?token=${token}&userAgent=mobile`
        );
        socket.current.onopen = () => {
          console.log("🔵 Notification Connected");
        };
        socket.current.onmessage = async (event) => {
          const data = JSON.parse(event.data);
          console.log(data);
          
          if (data && data.message) {
            await showNotification("🔔 Thông báo mới", data.message);
          }
        };
        socket.current.onclose = () =>
          console.log("🔴 Notification Disconnected");
      }
    };
    connectSocket();
  }, [isAuthenticated]);

  return {
    socket: socket.current,
    showNotification: showNotification,
  };
};
export default useNotification;
