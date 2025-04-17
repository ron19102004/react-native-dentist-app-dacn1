import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import * as Notifications from "expo-notifications";
import { API_HOST_NAME, WS_POINT } from "../constants/api.constant";
import Toast from "react-native-toast-message";
import activityLogApi from "../apis/activity-log.api";

export interface NotificationData {
  message: string;
  responseTime: string;
  uuid: string;
}
export interface NotificationContextType {
  socket: WebSocket | null;
  showNotification: (title: string, body: string) => Promise<void>;
  notificationData: Array<NotificationData>;
  loadNotification(): Promise<void>;
}
const useNotification = (): NotificationContextType => {
  const socket = useRef<WebSocket | null>(null);
  const { isAuthenticated, token, isLoading, ifAuthFn } =
    useContext(AuthContext);
  const [notificationData, setNotificationData] = useState<
    Array<NotificationData>
  >([]);

  const loadNotification = async () => {
    await ifAuthFn(
      async (token) => {
        const res = await activityLogApi.getActivityLogs(token);
        if (res.code === 200) {
          if(res.data){
            setNotificationData([])
            res.data.forEach((item) => {
              const dataItem: NotificationData = {
                message: item.content,
                responseTime: new Date(item.time).toLocaleString("vi-VN"),
                uuid: item.id.toString(),
              };
              setNotificationData((props) => [dataItem, ...props]);
            });
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
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
  const connectSocket = async () => {
    if (!isLoading && isAuthenticated && token && token.length > 0) {
      socket.current = new WebSocket(
        `${WS_POINT}/notification?token=${token}&userAgent=mobile`
      );
      socket.current.onopen = () => {
        console.log("🔵 Notification Connected");
      };
      socket.current.onmessage = async (event) => {
        const data = JSON.parse(event.data) as NotificationData;
        if (data && data.message) {
          //set notification
          setNotificationData((props) => [data, ...props]);
          await showNotification("🔔 Thông báo mới", data.message);
          Toast.show({
            type: "info", // 'success' | 'error' | 'info'
            text1: "Thông báo",
            text2: data.message,
          });
        }
      };
      socket.current.onclose = () =>
        console.log("🔴 Notification Disconnected");
    }
  };
  useEffect(() => {
    loadNotification();
    connectSocket();
  }, [isAuthenticated]);

  return {
    socket: socket.current,
    showNotification: showNotification,
    notificationData: notificationData,
    loadNotification: loadNotification,
  };
};
export default useNotification;
