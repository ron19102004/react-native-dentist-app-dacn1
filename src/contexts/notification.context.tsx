import { createContext, FC, useEffect } from "react";
import useNotification, {
  NotificationContextType,
} from "../hooks/useNotification";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
export const NotificationContext = createContext<NotificationContextType>({
  socket: null,
  showNotification: function (title: string, body: string): Promise<void> {
    throw new Error("Function not implemented.");
  },
  notificationData: [],
  loadNotification: function (): Promise<void> {
    throw new Error("Function not implemented.");
  }
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

interface NotificationProviderProps {
  children: React.ReactNode;
}
const NotificationProvider: FC<NotificationProviderProps> = ({ children }) => {
  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.HIGH,
          sound: "default",
        });
      }
      await Notifications.requestPermissionsAsync();
    };
    requestPermissions();
  }, []);
  return (
    <NotificationContext.Provider value={useNotification()}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
