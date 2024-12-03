import * as Notifications from "expo-notifications";

import { Stack } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

if (Platform.OS === "android") {
  Notifications.setNotificationChannelAsync("default-channel", {
    description: "Default channel",
    importance: Notifications.AndroidImportance.HIGH,
    name: "Default channel",
  });
}

async function allowsNotificationsAsync() {
  const settings = await Notifications.getPermissionsAsync();
  return (
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
}

export default function RootLayout() {
  useEffect(() => {
    allowsNotificationsAsync().then((allowsNotifications) => {
      if (!allowsNotifications) {
        Notifications.requestPermissionsAsync();
      }
    });
  });

  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    console.log("Last notification response", lastNotificationResponse);
  }, [lastNotificationResponse]);

  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Notification response received", response);
      }
    );

    return () => {
      sub.remove();
    };
  }, []);

  return <Stack />;
}
